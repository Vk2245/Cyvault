import os
import re

directories = [
    'alerts', 'chatbot', 'feed', 'graph', 'policies', 'radar', 'reconciliation', 'recovery', 'users'
]

import_motion = "import { motion } from 'framer-motion';"

empty_state_template = """<div className="flex-1 flex flex-col items-center justify-center p-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center p-12 max-w-lg glass-panel rounded-2xl w-full"
            >
              <div className="relative w-24 h-24 mb-6">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-primary/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-on-surface">{TITLE_PLACEHOLDER} Empty</h3>
              <p className="text-on-surface-variant">{DESC_PLACEHOLDER}</p>
            </motion.div>
          </div>"""

def process_file(filepath, title, desc):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if import_motion not in content:
        content = content.replace("import React", f"import React\\n{import_motion}")
        content = content.replace("import { useState", f"{import_motion}\\nimport {{ useState")

    # Custom replacement logic based on known files
    if 'feed' in filepath:
        content = re.sub(r'<div className="flex flex-col items-center justify-center h-64.*?</p>\s*</div>', empty_state_template.replace('{TITLE_PLACEHOLDER}', 'Action Feed').replace('{DESC_PLACEHOLDER}', desc), content, flags=re.DOTALL)
    elif 'alerts' in filepath:
        content = re.sub(r'<div className="flex flex-col items-center justify-center h-64.*?</p>\s*</div>', empty_state_template.replace('{TITLE_PLACEHOLDER}', 'Live AI Alerts').replace('{DESC_PLACEHOLDER}', desc), content, flags=re.DOTALL)
    elif 'recovery' in filepath:
        content = re.sub(r'<div className="glass-panel rounded-2xl p-12 text-center.*?</p>\s*</div>', empty_state_template.replace('{TITLE_PLACEHOLDER}', 'Recovery Engine').replace('{DESC_PLACEHOLDER}', desc), content, flags=re.DOTALL)
    elif 'users' in filepath:
        content = re.sub(r'<div className="glass-panel rounded-xl p-12 text-center.*?</p>\s*</div>', empty_state_template.replace('{TITLE_PLACEHOLDER}', 'User Directory').replace('{DESC_PLACEHOLDER}', desc), content, flags=re.DOTALL)
    elif 'reconciliation' in filepath:
        content = re.sub(r'<div className="glass-panel rounded-xl p-12 text-center.*?</p>\s*</div>', empty_state_template.replace('{TITLE_PLACEHOLDER}', 'Reconciliation').replace('{DESC_PLACEHOLDER}', desc), content, flags=re.DOTALL)
    elif 'policies' in filepath:
        content = re.sub(r'<div className="glass-panel rounded-xl p-12 text-center.*?</p>\s*</div>', empty_state_template.replace('{TITLE_PLACEHOLDER}', 'Security Policies').replace('{DESC_PLACEHOLDER}', desc), content, flags=re.DOTALL)
    elif 'radar' in filepath:
        content = re.sub(r'<div className="glass-panel rounded-xl p-12 text-center.*?</p>\s*</div>', empty_state_template.replace('{TITLE_PLACEHOLDER}', 'Leakage Radar').replace('{DESC_PLACEHOLDER}', desc), content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

base_path = 'c:/VK224/Hackathons/RAZORPAY/frontend/src/app/(dashboard)'

process_file(f'{base_path}/feed/page.tsx', 'Action Feed', 'No automated actions have been taken by Cyvault AI yet. Try running a scenario in the Simulator to generate some actions.')
process_file(f'{base_path}/alerts/page.tsx', 'Live AI Alerts', 'Alerts will appear here when our AI agents take actions (like offering discounts or blocking fraud) on your behalf.')
process_file(f'{base_path}/recovery/page.tsx', 'Recovery Engine', 'Your dashboard is empty. Run the simulator to generate test traffic, or wait for real transactions to be processed by Cyvault AI.')
process_file(f'{base_path}/users/page.tsx', 'User Directory', 'No users found. Run the simulator to generate test traffic, or wait for real transactions.')
process_file(f'{base_path}/reconciliation/page.tsx', 'Reconciliation', 'No settlement data available. Run the simulator to generate test traffic.')
process_file(f'{base_path}/policies/page.tsx', 'Security Policies', 'No active policies. Create a new policy to start protecting your transactions.')
process_file(f'{base_path}/radar/page.tsx', 'Leakage Radar', 'No anomalies detected. Run the simulator to generate test traffic.')

print('Done patching empty states')
