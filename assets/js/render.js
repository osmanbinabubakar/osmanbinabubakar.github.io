'use strict';

/**
 * Asynchronous content hydration engine.
 * Consumes local JSON data stores and safely renders UI components.
 */

document.addEventListener('DOMContentLoaded', () => {
  hydrateProfile();
  hydrateServices();
  hydratePortfolio();
  hydrateIndustries();
});

/**
 * Encodes special characters to mitigate Cross-Site Scripting (XSS).
 * @param {string} input - Untrusted string to sanitize.
 * @returns {string} Sanitized string.
 */
function sanitize(input) {
  if (typeof input !== 'string') return '';
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return input.replace(/[&<>"']/g, (char) => entityMap[char]);
}

/**
 * Retrieves and validates local JSON resources.
 * @param {string} endpoint - Path to resource.
 * @returns {Promise<any|null>} Parsed payload or null on network/syntax failure.
 */
async function fetchResource(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Resource retrieval failure: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Data fetching error [${endpoint}]:`, error);
    return null;
  }
}

/**
 * Hydrates founder biography and skill matrix components.
 */
async function hydrateProfile() {
  const container = document.getElementById('founderBentoContent');
  if (!container) return;

  const payload = await fetchResource('data/profile.json');
  if (!payload || !payload.founder) return;

  const { initials, name, role, statement, stack } = payload.founder;
  const stackChips = Array.isArray(stack)
    ? stack.map((tech) => `<span class="chip">${sanitize(tech)}</span>`).join('')
    : '';

  container.innerHTML = `
    <div>
      <div class="avatar-badge-box">${sanitize(initials)}</div>
      <h3 style="font-size: 1.35rem; font-weight: 800;">${sanitize(name)}</h3>
      <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent);">
        ${sanitize(role)}
      </p>
    </div>
    <div>
      <span class="bento-badge">Engineering Perspective</span>
      <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 1.25rem;">
        "${sanitize(statement)}"
      </p>
      <div class="tech-chips">${stackChips}</div>
    </div>
  `;
}

/**
 * Hydrates the asymmetrical Bento Grid for core capabilities.
 */
async function hydrateServices() {
  const container = document.getElementById('bentoServicesContainer');
  if (!container) return;

  const services = await fetchResource('data/services.json');
  if (!Array.isArray(services)) return;

  container.innerHTML = services.map((service) => {
    const chipsHtml = Array.isArray(service.chips)
      ? service.chips.map((chip) => `<span class="chip">${sanitize(chip)}</span>`).join('')
      : '';

    const spanClass = [4, 6, 8, 12].includes(service.span)
      ? `bento-col-${service.span}`
      : 'bento-col-6';

    return `
      <div class="spotlight-card ${spanClass}">
        <div class="card-content">
          <span class="bento-badge">${sanitize(service.moduleNumber)} • ${sanitize(service.category)}</span>
          <h3 class="bento-title">${sanitize(service.title)}</h3>
          <p class="bento-desc">${sanitize(service.description)}</p>
          <div class="tech-chips">${chipsHtml}</div>
        </div>
      </div>
    `;
  }).join('');

  if (typeof initCursorTracker === 'function') {
    initCursorTracker();
  }
}

/**
 * Hydrates technical case studies and architectural implementations.
 */
async function hydratePortfolio() {
  const container = document.getElementById('portfolioContainer');
  if (!container) return;

  const portfolio = await fetchResource('data/portfolio.json');
  if (!Array.isArray(portfolio)) return;

  container.innerHTML = portfolio.map((item) => {
    const tagsHtml = Array.isArray(item.tags)
      ? item.tags.map((tag) => `<span class="chip">${sanitize(tag)}</span>`).join('')
      : '';

    return `
      <div class="spotlight-card bento-col-6">
        <div class="card-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="bento-badge" style="margin-bottom: 0;">${sanitize(item.category)}</span>
            <span style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--text-faint);">${sanitize(item.status)}</span>
          </div>
          <h3 class="bento-title" style="font-size: 1.25rem;">${sanitize(item.title)}</h3>
          <p class="bento-desc">${sanitize(item.description)}</p>
          <div class="tech-chips">${tagsHtml}</div>
        </div>
      </div>
    `;
  }).join('');

  if (typeof initCursorTracker === 'function') {
    initCursorTracker();
  }
}

/**
 * Hydrates supported commercial domains and operational models.
 */
async function hydrateIndustries() {
  const container = document.getElementById('industriesContainer');
  if (!container) return;

  const industries = await fetchResource('data/industries.json');
  if (!Array.isArray(industries)) return;

  container.innerHTML = industries.map((item) => `
    <div class="industry-card">
      <h4>${sanitize(item.title)}</h4>
      <p>${sanitize(item.description)}</p>
    </div>
  `).join('');
}
