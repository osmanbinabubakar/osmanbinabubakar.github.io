/**
 * AZ IT HUB — 2026 Micro-Interactions
 * Spotlight Cursor Tracking, Mobile Drawer, and Dynamic Bindings.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSpotlightTracking();
  initMobileDrawer();
  initDynamicYear();
});

/* Aceternity-style Mouse Spotlight Tracker */
function initSpotlightTracking() {
  const cards = document.querySelectorAll('.spotlight-card');
  
  window.addEventListener('mousemove', (e) => {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* Responsive Mobile Navigation Drawer */
function initMobileDrawer() {
  const trigger = document.getElementById('menuTrigger');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!trigger || !overlay) return;

  const toggleDrawer = (isOpen) => {
    overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  trigger.addEventListener('click', () => toggleDrawer(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });
}

/* Dynamic Copyright Year */
function initDynamicYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
