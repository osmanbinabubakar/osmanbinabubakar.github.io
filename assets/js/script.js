'use strict';

/**
 * Global UI interaction controller.
 * Handles viewport cursor tracking, mobile navigation state, and document metadata.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorTracker();
  initMobileNavigation();
  initDocumentMetadata();
});

/**
 * Calculates pointer coordinates relative to card boundaries
 * and updates CSS variables for hardware-accelerated radial masking.
 */
function initCursorTracker() {
  const cards = document.querySelectorAll('.spotlight-card');
  if (!cards.length) return;

  window.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    cards.forEach((card) => {
      const bounds = card.getBoundingClientRect();
      const x = clientX - bounds.left;
      const y = clientY - bounds.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }, { passive: true });
}

/**
 * Manages modal drawer state and keyboard navigation traps for mobile viewports.
 */
function initMobileNavigation() {
  const trigger = document.getElementById('menuTrigger');
  const overlay = document.getElementById('mobileOverlay');
  const closeButton = document.getElementById('mobileClose');
  const links = document.querySelectorAll('.mobile-link');

  if (!trigger || !overlay) return;

  const setDrawerState = (isOpen) => {
    overlay.classList.toggle('open', isOpen);
    overlay.setAttribute('aria-hidden', String(!isOpen));
    trigger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  trigger.addEventListener('click', () => setDrawerState(true));

  if (closeButton) {
    closeButton.addEventListener('click', () => setDrawerState(false));
  }

  links.forEach((link) => {
    link.addEventListener('click', () => setDrawerState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      setDrawerState(false);
    }
  });
}

/**
 * Synchronizes temporal footer attributes with client execution environment.
 */
function initDocumentMetadata() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}
