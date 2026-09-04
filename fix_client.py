import glob

files = glob.glob('c:/VK224/Hackathons/RAZORPAY/frontend/src/app/(dashboard)/**/page.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove all variations of use client
    content = content.replace('"use client";\n', '')
    content = content.replace("'use client';\n", '')
    content = content.replace('"use client"\n', '')
    content = content.replace("'use client'\n", '')
    
    # Prepend it once exactly at the top
    final_content = '"use client";\n' + content.lstrip()

    with open(file, 'w', encoding='utf-8') as f:
        f.write(final_content)

print('Fixed use client')
