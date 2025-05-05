
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import './index.css'
import { initSentry } from './lib/sentry'

// Initialize Sentry
initSentry()

// Additional code to hide any help icons that might appear
document.addEventListener('DOMContentLoaded', function() {
  // Hide any potential help/question mark icons
  const hideFloatingIcons = () => {
    const selectors = [
      '.gpt-eng-icon', '#gpt-eng-icon', '[class*="gpt"]', '[id*="gpt"]',
      '[class*="question"]', '[id*="question"]', '[class*="help"]', '[id*="help"]',
      '[class*="floating"]', '[id*="floating"]', '[class*="fab"]', '[id*="fab"]'
    ];
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        }
      });
    });
  };
  
  // Run immediately and at intervals
  hideFloatingIcons();
  setInterval(hideFloatingIcons, 500);
});

createRoot(document.getElementById("root")!).render(<App />);
