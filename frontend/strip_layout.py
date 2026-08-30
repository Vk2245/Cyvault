import os
import re
import glob

files = glob.glob(r'c:\VK224\Hackathons\RAZORPAY\frontend\src\app\(dashboard)\**\*.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract imports
    imports = []
    for line in content.split('\n'):
        if line.startswith('import ') or line.startswith("'use client'") or line.startswith('"use client"'):
            imports.append(line)
            
    # Extract function signature
    match_func = re.search(r'export default function [A-Za-z0-9_]+\(\)\s*{', content)
    if not match_func:
        print(f"Failed to find func in {file}")
        continue
    func_sig = match_func.group(0)

    # Extract main content (handling nested tags isn't strictly possible with simple regex, 
    # but since </main> is only at the very end of our stitch files, greedy match to the LAST </main> works)
    # Wait, .*? is non-greedy, so it matches the FIRST </main>. Is there another </main> inside? Unlikely.
    # To be safe, match up to the LAST </main> by removing '?'
    match_main = re.search(r'<main[^>]*>(.*)</main>', content, flags=re.DOTALL | re.IGNORECASE)
    if not match_main:
        print(f"Failed to find main in {file}")
        continue
    main_content = match_main.group(1)

    new_content = "\n".join(imports) + "\n\n" + func_sig + """
  return (
    <main className="flex-1 flex flex-col h-full relative w-full">
""" + main_content + """
    </main>
  );
}
"""
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Stripped old sidebars and wrappers!")
