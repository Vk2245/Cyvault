import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import logging
import os
from config import settings
import asyncio
from datetime import datetime

logger = logging.getLogger(__name__)

# Basic Cyberpunk/Dark-mode HTML Template for CyVault
# Using inline styles for background to prevent Gmail from stripping it
HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{
            background-color: #0a0a0a;
            color: #ffffff;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }}
        .container {{
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #0a0a0a;
        }}
        .header {{
            text-align: center;
            padding: 30px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }}
        .badge {{
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 10px;
        }}
        .badge-alert {{
            background-color: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }}
        .badge-success {{
            background-color: rgba(34, 197, 94, 0.1);
            color: #22c55e;
            border: 1px solid rgba(34, 197, 94, 0.2);
        }}
        .badge-info {{
            background-color: rgba(139, 92, 246, 0.1);
            color: #8b5cf6;
            border: 1px solid rgba(139, 92, 246, 0.2);
        }}
        .content {{
            padding: 30px 0;
        }}
        .title {{
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #ffffff;
        }}
        .message {{
            color: #94a3b8;
            font-size: 15px;
            margin-bottom: 25px;
        }}
        .details-box {{
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 25px;
        }}
        .detail-row {{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
            padding-bottom: 10px;
        }}
        .detail-row:last-child {{
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }}
        .detail-label {{
            color: #64748b;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        .detail-value {{
            color: #ffffff;
            font-weight: 500;
            font-family: monospace;
        }}
        .button-container {{
            text-align: center;
            margin: 30px 0;
        }}
        .button {{
            background-color: #8b5cf6;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            display: inline-block;
            transition: opacity 0.2s;
        }}
        .footer {{
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #64748b;
            font-size: 12px;
        }}
        .security-note {{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.02);
            padding: 8px 16px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            margin-top: 15px;
        }}
    </style>
</head>
<body style="background-color: #0a0a0a; color: #ffffff; margin: 0; padding: 0; font-family: sans-serif;">
    <div class="container" style="background-color: #0a0a0a; color: #ffffff;">
        <div class="header">
            <!-- Attached Logo -->
            <img src="cid:cyvault_logo" alt="CyVault" style="height: 160px; display: block; margin: 0 auto; margin-bottom: 15px;">
            <div class="badge {badge_class}">{event_type_label}</div>
        </div>
        
        <div class="content">
            <div class="title" style="color: #ffffff;">{title}</div>
            <div class="message" style="color: #94a3b8;">{message}</div>
            
            {details_html}
            
            <div class="button-container">
                <a href="{dashboard_url}" class="button">View in Dashboard</a>
            </div>
        </div>
        
        <div class="footer">
            <div style="color: #64748b;">Automated Notification from CyVault Agentic Revenue Engine</div>
            <div style="color: #64748b;">Sent at {timestamp}</div>
            
            <div class="security-note" style="color: #64748b;">
                <span style="margin-right: 6px;">🔒</span> 
                This alert was generated securely using read-only ledger analysis.
            </div>
        </div>
    </div>
</body>
</html>
"""

def generate_details_html(details_dict: dict) -> str:
    """Helper to convert a dictionary into HTML rows"""
    if not details_dict:
        return ""
    
    html = '<div class="details-box" style="background-color: #111; padding: 15px; border-radius: 8px;">'
    for key, value in details_dict.items():
        html += f"""
        <div class="detail-row" style="padding-bottom: 8px; margin-bottom: 8px; border-bottom: 1px solid #333;">
            <span class="detail-label" style="color: #888; font-size: 12px; text-transform: uppercase;">{key}</span>
            <span class="detail-value" style="color: #fff; float: right; font-weight: bold;">{value}</span>
        </div>
        """
    html += '</div>'
    return html

def _send_email_sync(recipient: str, subject: str, event_type: str, title: str, message: str, details: dict = None):
    """
    Synchronous function to actually send the email via smtplib.
    Will be run in a thread pool via asyncio to avoid blocking the API.
    """
    smtp_user = settings.SMTP_EMAIL
    smtp_pass = settings.SMTP_APP_PASSWORD

    if not smtp_user or not smtp_pass:
        logger.error("SMTP credentials missing. Email not sent.")
        # Fallback to console print if credentials are missing
        print(f"----- EMAIL MOCK -----\nTo: {recipient}\nSubject: {subject}\nTitle: {title}\nMessage: {message}\n----------------------")
        return False

    # Use related multipart so the inline image is treated as part of the html
    msg = MIMEMultipart('related')
    msg['Subject'] = f"[CyVault] {subject}"
    msg['From'] = f"CyVault Alerts <{smtp_user}>"
    msg['To'] = recipient

    # Determine badge styling based on event
    badge_class = "badge-info"
    if event_type.lower() in ['alert', 'violation', 'fraud', 'failed']:
        badge_class = "badge-alert"
    elif event_type.lower() in ['success', 'recovered', 'resolved']:
        badge_class = "badge-success"

    # Format HTML
    details_html = generate_details_html(details or {})
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")
    
    html_content = HTML_TEMPLATE.format(
        badge_class=badge_class,
        event_type_label=event_type.upper(),
        title=title,
        message=message,
        details_html=details_html,
        dashboard_url=settings.FRONTEND_URL,
        timestamp=timestamp
    )

    # We need an alternative part for plain text and HTML
    msg_alt = MIMEMultipart('alternative')
    msg.attach(msg_alt)

    part1 = MIMEText(f"{title}\n{message}\n\nPlease check your CyVault dashboard.", 'plain')
    part2 = MIMEText(html_content, 'html')

    msg_alt.attach(part1)
    msg_alt.attach(part2)

    # Attach Logo Image
    logo_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'LOGO', 'cyvault_transparent.png')
    if os.path.exists(logo_path):
        with open(logo_path, 'rb') as f:
            logo_img = MIMEImage(f.read())
            logo_img.add_header('Content-ID', '<cyvault_logo>')
            logo_img.add_header('Content-Disposition', 'inline', filename='cyvault_transparent.png')
            msg.attach(logo_img)
    else:
        logger.warning(f"Logo not found at {logo_path}")

    try:
        # Use TLS
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, recipient, msg.as_string())
        server.quit()
        logger.info(f"Successfully sent email alert to {recipient} - {subject}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {recipient}: {str(e)}")
        return False

async def send_merchant_alert(recipient: str, subject: str, event_type: str, title: str, message: str, details: dict = None):
    """
    Async wrapper to send emails without blocking the main event loop in FastAPI.
    """
    loop = asyncio.get_event_loop()
    # Run the synchronous smtplib code in an executor thread
    success = await loop.run_in_executor(
        None, 
        _send_email_sync, 
        recipient, subject, event_type, title, message, details
    )
    return success

# For quick testing
if __name__ == "__main__":
    import asyncio
    
    async def test():
        success = await send_merchant_alert(
            recipient=settings.SMTP_EMAIL,  # Send to self for test
            subject="Action Required: Fraudulent Refund Detected",
            event_type="alert",
            title="Policy Violation Prevented",
            message="Our AI engine successfully intercepted a refund attempt that violated your strict 30-day return policy.",
            details={
                "Transaction ID": "pay_Oxb8MvKqJ",
                "Customer": "alex@example.com",
                "Amount": "₹2,499.00",
                "Reason": "Refund requested 45 days after purchase"
            }
        )
        print(f"Test Email Sent: {success}")
        
    asyncio.run(test())
