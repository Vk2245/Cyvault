import os, re
from pathlib import Path

icon_map = {
    'search': 'Search',
    'filter_list': 'Filter',
    'person': 'User',
    'phone_iphone': 'Smartphone',
    'credit_card': 'CreditCard',
    'laptop_mac': 'Laptop',
    'warning': 'TriangleAlert',
    'router': 'Router',
    'close': 'X',
    'location_on': 'MapPin',
    'block': 'Ban',
    'security': 'Shield',
    'key': 'Key',
    'lock': 'Lock',
    'sync': 'RefreshCw',
    'webhook': 'Webhook',
    'content_copy': 'Copy',
    'smart_toy': 'Bot',
    'visibility': 'Eye',
    'vpn_key': 'Key',
    'arrow_forward': 'ArrowRight',
    'arrow_upward': 'ArrowUp',
    'account_circle': 'User'
}

def migrate_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    used_lucide = set()
    
    def replacer(match):
        full_match = match.group(0)
        
        icon_name = ''
        data_match = re.search(r'data-icon="([^"]+)"', full_match)
        if data_match:
            icon_name = data_match.group(1).strip()
        else:
            inner_text = re.search(r'>([^<]+)</span>', full_match)
            if inner_text:
                icon_name = inner_text.group(1).strip()
        
        if not icon_name or icon_name not in icon_map:
            print(f"Skipping unknown icon: {icon_name} in {filepath}")
            return full_match
            
        lucide_name = icon_map[icon_name]
        used_lucide.add(lucide_name)
        
        class_match = re.search(r'className="([^"]+)"', full_match)
        classes = class_match.group(1) if class_match else ''
        classes = classes.replace('material-symbols-outlined', '').strip()
        
        if classes:
            return f'<{lucide_name} className="{classes}" size={{20}} />'
        return f'<{lucide_name} size={{20}} />'

    new_content = re.sub(r'<span[^>]*material-symbols-outlined[^>]*>.*?</span>', replacer, content, flags=re.DOTALL)
    
    if used_lucide and new_content != content:
        import_stmt = f"import {{ {', '.join(used_lucide)} }} from 'lucide-react';\n"
        new_content = re.sub(r'(import React[^;]*;\n)', r'\1' + import_stmt, new_content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Migrated {filepath}')

base_dir = Path('c:/VK224/Hackathons/RAZORPAY/frontend/src/app')
for root, _, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.tsx') and file != 'page.tsx' and 'recovery' not in root and 'reconciliation' not in root and 'radar' not in root:
            migrate_file(os.path.join(root, file))
