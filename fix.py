import glob
import re

files = glob.glob('c:/VK224/Hackathons/RAZORPAY/frontend/src/app/(dashboard)/**/page.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strip out all lines that contain "import React" or "framer-motion" at the beginning of the file
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        if 'import React' in line or 'framer-motion' in line or '{ useState' in line:
            # We skip these to rebuild them cleanly
            continue
        new_lines.append(line)
        
    # Rebuild the standard imports
    standard_imports = "import React, { useState, useEffect } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\n"
    
    # Find the first line that is not "use client";
    content_without_old_imports = '\n'.join(new_lines)
    
    if content_without_old_imports.startswith('"use client";'):
        final_content = '"use client";\n' + standard_imports + content_without_old_imports[13:].lstrip()
    else:
        final_content = standard_imports + content_without_old_imports.lstrip()

    with open(file, 'w', encoding='utf-8') as f:
        f.write(final_content)

print('Fixed syntax errors')
