/**
 * AZ IT HUB — Client Script
 * Zero dependencies, pure vanilla JS.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initDynamicYear();
  initContactGenerators();
});

/* Mobile Menu Toggle */
function initMobileNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('is-active');
  });

  // Close when clicking outside
  document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Dynamic Copyright Year */
function initDynamicYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* Contact Redirect Helpers (Zero Backend Required) */
function initContactGenerators() {
  const contactForms = document.querySelectorAll('[data-direct-contact]');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailField = form.querySelector('input[type="email"]');
      const msgField = form.querySelector('textarea');
      const email = emailField ? encodeURIComponent(emailField.value) : '';
      const message = msgField ? encodeURIComponent(msgField.value) : 'Hello AZ IT HUB, I would like to discuss a project.';
      
      // Default to Osman / AZ IT HUB designated email placeholder
      const destinationEmail = 'contact@azithub.placeholder'; // Replace with confirmed mailbox
      window.location.href = `mailto:${destinationEmail}?subject=AZ IT HUB Project Inquiry&body=${message}%0A%0AClient Email: ${email}`;
    });
  });
}
