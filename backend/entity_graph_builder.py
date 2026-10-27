"""
FILE: entity_graph_builder.py
PURPOSE: Uses NetworkX graph theory to map multi-hop relationships between customers, device fingerprints, and phones to detect fraud rings.
USED BY: recovery_orchestrator.py, webhook_handler.py, app.py
USES: database_schema.py
"""

# ──────────────────────────────────────────────
# IMPORTS
# ──────────────────────────────────────────────
# STEP 1: Python built-in libraries
from typing import Any, Dict, List

# STEP 2: Third-party libraries
import networkx as nx
from sqlalchemy.orm import Session

# STEP 3: Our own project files
from backend.database_schema import Customer, Order, Transaction

# ──────────────────────────────────────────────
# CONSTANTS
# ──────────────────────────────────────────────
MAX_CONNECTED_ACCOUNTS_THRESHOLD = 2
HIGH_RISK_SCORE = 0.85


# ──────────────────────────────────────────────
# MAIN FUNCTIONS
# ──────────────────────────────────────────────

def _build_networkx_identity_graph(customers: List[Customer]) -> nx.Graph:
    """
    Constructs an undirected NetworkX identity graph from a merchant's customer list.

    What it does:
        - Adds a node for each customer ('cust:<id>')
        - Adds a node for each device fingerprint ('dev:<fp>') and links the customer
        - Adds a node for each normalized phone ('phone:<num>') to catch multi-hop rings

    Args:
        customers: List of Customer ORM records for the merchant

    Returns:
        nx.Graph: Populated NetworkX identity graph
    """
    identity_graph = nx.Graph()

    for customer_record in customers:
        cust_node_id = f"cust:{customer_record.id}"
        identity_graph.add_node(
            cust_node_id,
            node_type="customer",
            customer_id=customer_record.id,
            email=customer_record.email,
            is_blocked=bool(customer_record.is_blocked),
        )

        if customer_record.device_fingerprint:
            dev_node_id = f"dev:{customer_record.device_fingerprint}"
            identity_graph.add_node(
                dev_node_id,
                node_type="device",
                fingerprint=customer_record.device_fingerprint,
            )
            identity_graph.add_edge(cust_node_id, dev_node_id, relation="used_device")

        if customer_record.phone:
            clean_phone = customer_record.phone.strip().replace(" ", "").replace("-", "")
            if len(clean_phone) >= 8:
                phone_node_id = f"phone:{clean_phone}"
                identity_graph.add_node(
                    phone_node_id,
                    node_type="phone",
                    phone=clean_phone,
                )
                identity_graph.add_edge(cust_node_id, phone_node_id, relation="shared_phone")

    return identity_graph


def detect_fraud_ring(db: Session, merchant_id: str, customer_id: str) -> Dict[str, Any]:
    """
    Analyzes NetworkX connected components to detect if a customer belongs to a fraud ring.

    What it does:
        - Builds the merchant's NetworkX identity graph across customers, devices, and phones
        - Extracts the connected component containing customer_id via nx.node_connected_component
        - Counts connected customer accounts and computes transaction failure rate across the component
        - Returns a deterministic risk score (0.0 to 1.0) and fraud ring verdict

    Args:
        db: Active SQLAlchemy database session
        merchant_id: Unique ID of the merchant
        customer_id: Unique ID of the customer being evaluated

    Returns:
        Dict[str, Any]: Contains is_fraud_ring (bool), risk_score (float), connected_accounts (int), and cluster_customers (list)
    """
    all_merchant_customers = db.query(Customer).filter(
        Customer.merchant_id == merchant_id
    ).all()

    target_node = f"cust:{customer_id}"
    identity_graph = _build_networkx_identity_graph(all_merchant_customers)

    if target_node not in identity_graph:
        return {
            "is_fraud_ring": False,
            "risk_score": 0.1,
            "connected_accounts": 1,
            "cluster_customers": [customer_id],
        }

    component_nodes = nx.node_connected_component(identity_graph, target_node)
    connected_customer_ids = []
    for node_name in component_nodes:
        node_data = identity_graph.nodes[node_name]
        if node_data.get("node_type") == "customer":
            connected_customer_ids.append(node_data["customer_id"])

    connected_count = len(connected_customer_ids)
    if connected_count <= 1:
        target_customer = next((c for c in all_merchant_customers if c.id == customer_id), None)
        if target_customer and target_customer.is_blocked:
            return {
                "is_fraud_ring": True,
                "risk_score": 0.95,
                "connected_accounts": 1,
                "cluster_customers": [customer_id],
            }
        return {
            "is_fraud_ring": False,
            "risk_score": 0.1,
            "connected_accounts": 1,
            "cluster_customers": [customer_id],
        }

    orders = db.query(Order).filter(
        Order.merchant_id == merchant_id,
        Order.customer_id.in_(connected_customer_ids),
    ).all()
    order_ids = [order_item.id for order_item in orders]

    transactions = []
    if order_ids:
        transactions = db.query(Transaction).filter(
            Transaction.order_id.in_(order_ids)
        ).all()

    total_tx = len(transactions)
    failed_tx = 0
    for tx_item in transactions:
        if tx_item.status == "failed" or tx_item.normalized_status == "FAILED":
            failed_tx += 1

    # Also check failed orders if transactions were not recorded separately
    failed_orders_count = sum(1 for o in orders if o.status == "attempted" or o.normalized_status == "FAILED")
    if total_tx > 0:
        failure_rate = failed_tx / total_tx
    elif len(orders) > 0:
        failure_rate = failed_orders_count / len(orders)
    else:
        failure_rate = 0.0

    # Base risk for sharing identity attributes across multiple accounts
    risk_score = 0.50

    if failure_rate >= 0.5:
        risk_score += 0.30
    elif failure_rate > 0.0:
        risk_score += 0.15

    if connected_count > MAX_CONNECTED_ACCOUNTS_THRESHOLD:
        risk_score += 0.20

    # Check if any account in the cluster is already blocked
    any_blocked = any(
        c.is_blocked for c in all_merchant_customers if c.id in connected_customer_ids
    )
    if any_blocked:
        risk_score = max(risk_score, 0.95)

    risk_score = min(1.0, round(risk_score, 2))
    is_fraud = risk_score >= HIGH_RISK_SCORE

    print(
        f"[Risk AI] Analyzed Customer {customer_id} via NetworkX. "
        f"Cluster Size: {connected_count}, Failure Rate: {failure_rate * 100:.1f}%, Score: {risk_score}"
    )

    return {
        "is_fraud_ring": is_fraud,
        "risk_score": risk_score,
        "connected_accounts": connected_count,
        "cluster_customers": sorted(connected_customer_ids),
    }


def build_merchant_graph_payload(db: Session, merchant_id: str) -> Dict[str, List[Dict[str, Any]]]:
    """
    Builds the JSON-serializable node and edge list for the frontend Entity Graph viewer using NetworkX.

    What it does:
        - Queries all customers for the merchant
        - Constructs the NetworkX graph and Annotates each device with connected degree and risk level
        - Returns {'nodes': [...], 'edges': [...]} compatible with the frontend orbital graph

    Args:
        db: Active SQLAlchemy database session
        merchant_id: Unique ID of the merchant

    Returns:
        Dict[str, List[Dict[str, Any]]]: Nodes and edges dictionary
    """
    customers = db.query(Customer).filter(Customer.merchant_id == merchant_id).all()
    if not customers:
        return {"nodes": [], "edges": []}

    identity_graph = _build_networkx_identity_graph(customers)
    nodes = []
    edges = []
    added_devices = set()

    for customer_record in customers:
        cust_node = f"cust:{customer_record.id}"
        component_size = 1
        if cust_node in identity_graph:
            component = nx.node_connected_component(identity_graph, cust_node)
            component_size = sum(
                1 for n in component if identity_graph.nodes[n].get("node_type") == "customer"
            )

        nodes.append({
            "id": customer_record.id,
            "label": customer_record.email or customer_record.id,
            "type": "customer",
            "group": 1,
            "is_blocked": bool(customer_record.is_blocked),
            "cluster_size": component_size,
        })

        if customer_record.device_fingerprint:
            dev_id = f"dev_{customer_record.device_fingerprint}"
            dev_nx_id = f"dev:{customer_record.device_fingerprint}"
            device_degree = identity_graph.degree[dev_nx_id] if dev_nx_id in identity_graph else 1

            if dev_id not in added_devices:
                nodes.append({
                    "id": dev_id,
                    "label": customer_record.device_fingerprint,
                    "type": "device",
                    "group": 2,
                    "connected_customers": device_degree,
                })
                added_devices.add(dev_id)

            edges.append({
                "source": customer_record.id,
                "target": dev_id,
            })

    return {"nodes": nodes, "edges": edges}

