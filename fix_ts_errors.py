import os
import re
import glob

files = glob.glob(r'c:\VK224\Hackathons\RAZORPAY\frontend\src\app\**\*.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix rows="1" to rows={1}
    content = re.sub(r'rows="([0-9]+)"', r'rows={\1}', content)
    
    # Fix SVG elements and properties
    content = content.replace('lineargradient', 'linearGradient')
    content = content.replace('viewbox=', 'viewBox=')
    
    # Fix empty event handlers
    content = content.replace('onSubmit=""', '')
    content = content.replace('onClick=""', '')
    content = content.replace('onSubmit="return false"', '')
    content = content.replace('onSubmit="return false;"', '')
    content = content.replace('onsubmit=""', '')
    content = content.replace('onclick=""', '')
    
    # Fix boolean attributes that might be set to string
    content = re.sub(r'\breadonly="[^"]*"', 'readOnly', content, flags=re.IGNORECASE)
    content = re.sub(r'\breadonly\b(?!=")(?!=)', 'readOnly', content, flags=re.IGNORECASE)
    
    content = re.sub(r'\brequired="[^"]*"', 'required', content, flags=re.IGNORECASE)
    content = re.sub(r'\bdisabled="[^"]*"', 'disabled', content, flags=re.IGNORECASE)

    # Let's also check for tabindex -> tabIndex
    content = re.sub(r'\btabindex=', 'tabIndex=', content, flags=re.IGNORECASE)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("TypeScript JSX errors fixed!")
