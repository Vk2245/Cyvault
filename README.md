<p align="center">
  <img src="LOGO/cyvault_transparent.png" alt="Cyvault Logo" width="280"/>
</p>

<h1 align="center">C Y V A U L T</h1>

<p align="center">
  <strong>Autonomous AI-Driven Revenue Protection & Recovery Infrastructure for Digital Payments</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge" alt="License"/>
</p>

<p align="center">
  <em>Businesses lose ~15% of revenue to failed payments and ~2% to chargeback fraud every year.<br/>
  Cyvault plugs those leaks autonomously — recovering lost carts, blocking fraud rings, and reconciling ledgers in real-time.</em>
</p>

---

> **⚠️ Proprietary Software**
> This repository and all its contents are proprietary and confidential. Unauthorized copying, distribution, or use of this software is strictly prohibited. All rights reserved © 2026.

---

## Table of Contents

- [The Problem](#the-problem)
- [What is Cyvault?](#what-is-cyvault)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Core Modules Deep Dive](#core-modules-deep-dive)
- [Application Screens](#application-screens)
- [AI & Intelligence Layer](#ai--intelligence-layer)
- [Security Architecture](#security-architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [License](#license)

---

## The Problem

Modern digital payment ecosystems suffer from three critical, interconnected revenue leaks that traditional tools treat in isolation:

| Revenue Leak | Impact | Current Solutions |
|---|---|---|
| **Cart Abandonment** | 15-25% of all initiated payments fail silently | Batch email retargeting (24-48hr delay) |
| **Chargeback Fraud** | 1-2% of revenue lost to fraudulent disputes | Manual review teams (expensive, slow) |
| **Reconciliation Drift** | Hidden discrepancies between gateway and ledger | Monthly CSV exports and manual matching |

**The core issue:** These aren't three separate problems. They are symptoms of the same systemic gap — the absence of a real-time, intelligent layer between the payment gateway and the merchant's business logic.

---

## What is Cyvault?

**Cyvault** (Cyber + Vault) is an **autonomous, agentic AI infrastructure** that sits as a middleware layer on top of payment gateways (starting with Razorpay). It intercepts payment events in real-time via webhooks and autonomously:

1.  **Detects & Blocks** fraud rings using graph theory before they can checkout.
2.  **Negotiates & Recovers** failed payments by dynamically offering discounts to customers via SMS/Email, governed by strict merchant-defined policies.
3.  **Reconciles & Audits** every action taken into a transparent, queryable ledger.

It replaces the need for separate fraud detection tools, retargeting platforms, and reconciliation software with a single, unified AI agent.

---

## Key Features

### Revenue Leak Decoder (Entity Graph)
Uses **NetworkX graph theory** to map relationships between customers, device fingerprints, IPs, and payment instruments. Detects multi-account fraud rings by identifying shared device fingerprints across seemingly independent accounts.

### Autonomous Recovery Agent
When a payment fails (cart abandonment), Cyvault's AI agent automatically:
- Evaluates the customer's risk profile.
- Calculates an optimal discount within merchant-defined policy limits.
- Sends an out-of-band SMS/Email with a personalized recovery link.
- Iteratively negotiates (up to N retries) until recovery or limit exhaustion.

### Governed Action Ledger
Every autonomous action is logged as an **ActionReceipt** — an immutable audit trail containing the decision (ALLOWED/BLOCKED), the policy that governed it, and a plain-English narrative explaining *why*. Merchants have full transparency and control.

### Natural Language Policy Engine
Merchants type fraud rules in plain English (e.g., *"Block all transactions over ₹10,000 from new accounts"*). The AI compiles it into executable logic and deploys it instantly. No code required.

### Insights Co-Pilot (RAG-Powered)
A conversational AI bot that answers complex business questions by querying the merchant's own database in real-time. Ask *"Why did revenue drop yesterday?"* and get instant, data-backed answers with charts.

### Fallback Recovery Configurator
A merchant-facing UI to set rigid boundaries for automated negotiations: **Starting Discount (%)**, **Maximum Discount (%)**, and **Maximum Retries**. The AI operates strictly within these limits.

### Finance AI (Auto-Reconciliation)
Automatically matches incoming Razorpay webhook events against the internal ledger, flagging discrepancies and ensuring financial integrity without manual CSV exports.

---

## System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Customer Touchpoints"
        C1["Customer Browser/App"]
        C2["SMS / Email Links"]
    end

    subgraph "Payment Gateway"
        RZP["Razorpay API"]
        WH["Webhooks"]
    end

    subgraph "Cyvault Backend - FastAPI"
        direction TB
        WEB["Webhook Handler"]
        SIM["Simulator Engine"]
        REC["Recovery Orchestrator"]
        POL["Policy Enforcer"]
        EGB["Entity Graph Builder"]
        FIN["Finance Matcher"]
        NE["Notification Engine"]
        LLM["LLM Provider Router"]
        ARL["Action Receipt Logger"]
        SDG["Synthetic Data Generator"]
    end

    subgraph "Data Layer"
        DB[("PostgreSQL via Supabase")]
        CACHE["Upstash Redis"]
    end

    subgraph "AI Providers"
        G["LLM Provider A"]
        GR["LLM Provider B - Fallback"]
    end

    subgraph "Cyvault Frontend - Next.js 14"
        DASH["Merchant Dashboard"]
        SIMU["Storefront Simulator"]
        CHAT["Insights Co-Pilot"]
    end

    C1 --> RZP
    RZP --> WH --> WEB
    WEB --> REC
    REC --> POL
    REC --> EGB
    REC --> NE
    REC --> FIN
    REC --> ARL
    POL --> DB
    EGB --> DB
    NE --> C2
    C2 --> C1
    ARL --> DB
    FIN --> DB
    LLM --> G
    LLM --> GR
    CHAT --> LLM
    SIM --> REC
    SDG --> DB
    DASH --> DB
    SIMU --> SIM
    REC --> LLM
    CACHE -.-> REC
```

### Request Flow: Cart Abandonment Recovery

```mermaid
sequenceDiagram
    participant Customer
    participant Razorpay
    participant Cyvault as Cyvault Backend
    participant AI as LLM Router
    participant Policy as Policy Enforcer
    participant Graph as Entity Graph
    participant DB as Database
    participant SMS as Notification Engine

    Customer->>Razorpay: Initiates Payment
    Razorpay->>Cyvault: Webhook: payment.failed
    Cyvault->>Graph: Check fraud risk via device fingerprint
    Graph->>DB: Query connected accounts
    DB-->>Graph: Return graph data
    Graph-->>Cyvault: Risk Score: 0.2 - Safe
    Cyvault->>Policy: Fetch active policies
    Policy->>DB: Query merchant policies
    DB-->>Policy: Return: max_discount=15%, max_retries=3
    Policy-->>Cyvault: Policy limits loaded
    Cyvault->>AI: Calculate optimal discount for retry=1
    AI-->>Cyvault: Recommend: 5% discount
    Cyvault->>DB: Log ActionReceipt as ALLOWED - Discount offered
    Cyvault->>SMS: Send recovery SMS with discount link
    SMS-->>Customer: Complete your purchase with 5% off!
    Customer->>Cyvault: Clicks link and retries payment
    Cyvault->>DB: Log: Payment recovered
    Cyvault->>DB: Update reconciliation ledger
```

### Request Flow: Fraud Ring Detection

```mermaid
sequenceDiagram
    participant Attacker as Bad Actor
    participant Cyvault as Cyvault Backend
    participant Graph as Entity Graph via NetworkX
    participant DB as Database
    participant Merchant as Merchant Dashboard

    Attacker->>Cyvault: Transaction from Account A with Device fp_XYZ
    Cyvault->>Graph: Analyze device fingerprint fp_XYZ
    Graph->>DB: Find all accounts with fp_XYZ
    DB-->>Graph: Found: Account A, B, C - 3 accounts
    Graph->>Graph: Threshold exceeded - more than 2 accounts
    Graph->>Graph: Calculate failure rate across cluster
    Graph-->>Cyvault: FRAUD RING DETECTED with risk 0.95
    Cyvault->>DB: Block all 3 accounts
    Cyvault->>DB: Log ActionReceipt as BLOCKED - Fraud ring
    Cyvault-->>Attacker: Transaction Denied
    Cyvault->>Merchant: Alert: Fraud ring neutralized
```

---

## Real-World Razorpay Integration

Cyvault is 100% compatible with real Razorpay environments. By securely intercepting Razorpay Webhooks (like `payment.failed`), Cyvault's AI can trigger autonomous recovery loops without any manual intervention from the merchant. 

The screenshots below demonstrate Cyvault seamlessly intercepting a failed payment from a live Razorpay checkout page and instantly generating an Action Receipt:

<div style="display: flex; gap: 10px;">
  <img src="docs/assets/razorpay_checkout.png" alt="Razorpay Checkout" width="49%">
  <img src="docs/assets/cyvault_webhook_alert.png" alt="Cyvault Alerts" width="49%">
</div>

---

## Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **Python 3.11+** | Core runtime |
| **FastAPI 0.111** | Async REST API framework with automatic OpenAPI docs |
| **SQLAlchemy 2.0** | ORM for database modeling and queries |
| **Alembic 1.13** | Database migration management |
| **NetworkX 3.3** | Graph theory library for fraud ring detection |
| **Pydantic v2** | Data validation and settings management |
| **Uvicorn** | ASGI server for production deployment |

### Frontend

| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe frontend development |
| **Framer Motion** | Physics-based animations for the Entity Graph |
| **Lucide React** | Premium icon system |
| **next-themes** | Dark/Light mode with system preference detection |
| **Tailwind CSS** | Utility-first styling with custom design tokens |

### Infrastructure and Services

| Technology | Purpose |
|---|---|
| **PostgreSQL (Supabase)** | Primary relational database |
| **Upstash Redis** | Edge-compatible caching and rate limiting |
| **Render** | Backend deployment with auto-scaling |
| **Vercel** | Frontend deployment on edge network |

### AI and Intelligence

| Technology | Purpose |
|---|---|
| **LLM Provider A** | Primary AI for policy compilation, chat, narrative generation |
| **LLM Provider B** | Fallback for speed and rate-limit resilience |
| **Deterministic Templates** | Final fallback when all AI providers are unavailable |

### Security

| Technology | Purpose |
|---|---|
| **AES-256-GCM (Fernet)** | Encrypts all merchant API keys at rest |
| **HMAC-SHA256** | Webhook signature verification |
| **Environment Isolation** | All secrets loaded via `.env`, never hardcoded |

---

## Database Schema

```mermaid
erDiagram
    MERCHANTS ||--o{ CUSTOMERS : has
    MERCHANTS ||--o{ ORDERS : receives
    MERCHANTS ||--o{ SETTLEMENTS : collects
    MERCHANTS ||--o{ POLICY_RULES : defines
    MERCHANTS ||--o{ ACTION_RECEIPTS : audits
    CUSTOMERS ||--o{ ORDERS : places
    ORDERS ||--o{ TRANSACTIONS : contains
    POLICY_RULES ||--o{ ACTION_RECEIPTS : governs

    MERCHANTS {
        string id PK
        string name
        string company_name
        string industry
        string email UK
        string password_hash
        string encrypted_razorpay_key
        string encrypted_razorpay_secret
        string encrypted_webhook_secret
        datetime created_at
    }

    CUSTOMERS {
        string id PK
        string merchant_id FK
        string phone
        string email
        string device_fingerprint
        boolean is_blocked
        datetime created_at
    }

    ORDERS {
        string id PK
        string merchant_id FK
        string customer_id FK
        integer amount_paise
        string currency
        string status
        datetime created_at
    }

    TRANSACTIONS {
        string id PK
        string order_id FK
        integer amount_paise
        string status
        string method
        string error_code
        text error_description
        float risk_score
        datetime created_at
    }

    SETTLEMENTS {
        string id PK
        string merchant_id FK
        integer amount_paise
        integer fees_paise
        integer tax_paise
        string utr
        string status
        datetime created_at
    }

    POLICY_RULES {
        string id PK
        string merchant_id FK
        string name
        text description
        string rule_type
        json parameters
        boolean is_active
        datetime created_at
    }

    ACTION_RECEIPTS {
        string id PK
        string merchant_id FK
        string action_type
        string entity_id
        string policy_id FK
        string decision
        text narrative
        datetime created_at
    }
```

---

## Core Modules Deep Dive

### Backend Module Map

```
backend/
├── app.py                    # Main FastAPI application and all API routes
├── config.py                 # Pydantic Settings (env loader)
├── database_schema.py        # SQLAlchemy ORM models (7 tables)
├── utils.py                  # AES encryption/decryption helpers
│
├── recovery_orchestrator.py  # Core recovery logic and discount calculation
├── policy_enforcer.py        # Validates actions against merchant policies
├── entity_graph_builder.py   # NetworkX fraud ring detection
├── finance_matcher.py        # Webhook-to-ledger reconciliation
├── notification_engine.py    # SMS/Email dispatch via SMTP
├── webhook_handler.py        # Razorpay webhook intake and verification
├── action_receipt_logger.py  # Immutable audit trail writer
├── llm_provider_router.py    # Multi-provider AI with 3-layer fallback
└── synthetic_data_generator.py  # Generates realistic test data
```

### Module Interaction Map

```mermaid
graph LR
    subgraph "Entry Points"
        A["app.py - API Routes"]
    end

    subgraph "Core Intelligence"
        B["recovery_orchestrator.py"]
        C["policy_enforcer.py"]
        D["entity_graph_builder.py"]
    end

    subgraph "IO Layer"
        E["notification_engine.py"]
        F["webhook_handler.py"]
        G["finance_matcher.py"]
    end

    subgraph "Support"
        H["llm_provider_router.py"]
        I["action_receipt_logger.py"]
        J["synthetic_data_generator.py"]
    end

    subgraph "Foundation"
        K["config.py"]
        L["database_schema.py"]
        M["utils.py"]
    end

    A --> B
    A --> F
    A --> J
    B --> C
    B --> D
    B --> E
    B --> H
    B --> I
    B --> G
    C --> L
    D --> L
    F --> B
    H --> K
    I --> L
    L --> K
    L --> M
```

---

## Application Screens

The dashboard is a split-screen Command Center with 11 dedicated modules:

| # | Tab | Purpose |
|---|---|---|
| 1 | **Dashboard** | Real-time KPI overview: Revenue at Risk, Revenue Recovered, Active Customers |
| 2 | **Alerts** | AI-generated threat notifications with severity levels |
| 3 | **Entity Graph** | Interactive NetworkX-powered fraud ring visualization with orbital layout |
| 4 | **Users** | Customer identity matrix with risk scores and device fingerprints |
| 5 | **Policies** | Natural language policy compiler + Fallback Recovery Configurator |
| 6 | **Action Feed** | Chronological, immutable log of every AI decision with narratives |
| 7 | **Leakage Radar** | Real-time payment funnel scanner identifying drop-off points |
| 8 | **Reconciliation** | Auto-matched settlements with webhook-to-ledger integrity checks |
| 9 | **Insights Bot** | Conversational AI co-pilot querying your own database |
| 10 | **Test Demo Mode** | Split-screen storefront simulator with Single + Multi-user stress testing |
| 11 | **Settings** | API key management, webhook configuration, account preferences |

---

## AI and Intelligence Layer

### LLM Provider Router: 3-Layer Fallback Architecture

Cyvault's AI never goes down. The `llm_provider_router.py` implements a cascading fallback:

```
┌─────────────────────────────────────────┐
│  Layer 1: Primary LLM Provider          │
│  ├─ Used for: Policy compilation,       │
│  │   narrative generation, chat         │
│  ├─ Latency: ~200ms                     │
│  └─ If fails: cascade to Layer 2       │
├─────────────────────────────────────────┤
│  Layer 2: Fallback LLM Provider         │
│  ├─ Used for: Same tasks, lower cost    │
│  ├─ Latency: ~150ms                     │
│  └─ If fails: cascade to Layer 3       │
├─────────────────────────────────────────┤
│  Layer 3: Deterministic Templates       │
│  ├─ Used for: Guaranteed responses      │
│  ├─ Latency: less than 1ms             │
│  └─ Core money-moving logic preserved   │
└─────────────────────────────────────────┘
```

### Entity Graph Intelligence

The fraud detection engine uses **graph theory** (NetworkX) with the following algorithm:

1. **Node Creation**: Each customer is a node. Each device fingerprint is an edge connector.
2. **Cluster Detection**: If `connected_accounts > threshold (2)`, a fraud ring is flagged.
3. **Risk Scoring**: Combines cluster size, transaction failure rate, and velocity metrics into a `0.0 - 1.0` risk score.
4. **Action**: Scores above `0.85` trigger automatic account blocking and merchant alerting.

---

## Security Architecture

```mermaid
graph TD
    subgraph "Data at Rest"
        A["Merchant API Keys"] --> B["AES-256-GCM Encryption"]
        B --> C["Encrypted in PostgreSQL"]
    end

    subgraph "Data in Transit"
        D["Razorpay Webhooks"] --> E["HMAC-SHA256 Verification"]
        E --> F["Verified: Process"]
        E --> G["Tampered: Reject"]
    end

    subgraph "Secrets Management"
        H[".env File"] --> I["Pydantic Settings Validator"]
        I --> J["Runtime Config Object"]
    end

    subgraph "Access Control"
        K["Merchant Auth"] --> L["Session-based isolation"]
        L --> M["Data partitioned by merchant_id"]
    end
```

| Layer | Implementation |
|---|---|
| **Encryption at Rest** | All merchant API keys are encrypted using AES-256-GCM (Fernet) before storage |
| **Webhook Integrity** | Every incoming Razorpay webhook is verified with HMAC-SHA256 signature matching |
| **Environment Isolation** | All secrets managed via `.env` files, validated by Pydantic at startup |
| **Multi-tenant Isolation** | Every database query is scoped to `merchant_id` for no cross-tenant data leakage |
| **Duplicate Request Protection** | State-tracking fraud checks prevent double-spend on refunds and settlements |

---

## Getting Started

### Prerequisites

- **Python** 3.11+
- **Node.js** 18+
- **PostgreSQL** database (or Supabase account)
- API keys for LLM providers

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cyvault
```

### 2. Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Start the server
uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:8000

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# App Config
ENVIRONMENT=development
DEBUG=True
PORT=8000
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# Security
MASTER_ENCRYPTION_KEY=your-32-byte-encryption-key
JWT_SECRET=your-jwt-secret

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret

# AI Providers
GEMINI_API_KEY=your-gemini-key
GROQ_API_KEY=your-groq-key

# Cache
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Notifications
SMTP_EMAIL=your-email@gmail.com
SMTP_APP_PASSWORD=your-app-password
```

---

## API Reference

### Core Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/merchants/{id}` | Fetch merchant profile and KPIs |
| `GET` | `/api/merchants/{id}/customers` | List all customers with risk profiles |
| `GET` | `/api/merchants/{id}/orders` | List all orders with statuses |
| `GET` | `/api/merchants/{id}/transactions` | List transactions with failure analysis |
| `GET` | `/api/merchants/{id}/settlements` | List settlements with UTR tracking |
| `GET` | `/api/merchants/{id}/receipts` | Fetch immutable action audit trail |
| `GET` | `/api/merchants/{id}/graph` | Get Entity Graph data with nodes and edges |
| `POST` | `/api/merchants/{id}/policies/compile` | Compile natural language to executable rule |
| `POST` | `/api/merchants/{id}/policies/activate` | Deploy a compiled policy |
| `GET` | `/api/merchants/{id}/policies` | List all active policies |
| `POST` | `/api/simulate` | Trigger simulated payment events |
| `POST` | `/api/chat` | Query the Insights Co-Pilot |
| `POST` | `/api/connect` | Register or authenticate a merchant |


---

<p align="center">
  <img src="LOGO/LOGO_no_caption.png" alt="Cyvault" width="80"/>
  <br/>
  <strong>Cyvault</strong> — Your Cyber Vault for Revenue Protection
  <br/>
  <em>Intelligent Security. Autonomous Recovery.</em>
</p>
