/**
 * AZ IT HUB — Headless JSON Rendering Engine
 * Fetches decoupled content from /data/ and renders UI dynamically.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
  renderServices();
  renderPortfolio();
  renderIndustries();
});

/* Helper: Generic JSON Fetcher */
async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[AZ-ENGINE] Could not load ${path}:`, err);
    return null;
  }
}

/* 1. Render Profile and Founder Data */
async function renderProfile() {
  const data = await fetchJSON('data/profile.json');
  if (!data) return;

  // Founder Card in Bento
  const founderCard = document.getElementById('founderBentoContent');
  if (founderCard) {
    founderCard.innerHTML = `
      <div>
        <div class="avatar-badge-box">${data.founder.initials}</div>
        <h3 style="font-size: 1.35rem; font-weight: 800;">${data.founder.name}</h3>
        <p style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent);">
          ${data.founder.role}
        </p>
      </div>
      <div>
        <span class="bento-badge">Engineering Perspective</span>
        <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 1.25rem;">
          "${data.founder.statement}"
        </p>
        <div class="tech-chips">
          ${data.founder.stack.map(tech => `<span class="chip">${tech}</span>`).join('')}
        </div>
      </div>
    `;
  }
}

/* 2. Render Bento Services Grid */
async function renderServices() {
  const services = await fetchJSON('data/services.json');
  const container = document.getElementById('bentoServicesContainer');
  if (!services || !container) return;

  container.innerHTML = services.map(service => `
    <div class="spotlight-card bento-col-${service.span}">
      <div class="card-content">
        <span class="bento-badge">${service.moduleNumber} • ${service.category}</span>
        <h3 class="bento-title">${service.title}</h3>
        <p class="bento-desc">${service.description}</p>
        <div class="tech-chips">
          ${service.chips.map(chip => `<span class="chip">${chip}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // Re-sync spotlight event listeners on new cards
  if (typeof initSpotlightTracking === 'function') {
    initSpotlightTracking();
  }
}

/* 3. Render Portfolio Showcase */
async function renderPortfolio() {
  const portfolio = await fetchJSON('data/portfolio.json');
  const container = document.getElementById('portfolioContainer');
  if (!portfolio || !container) return;

  container.innerHTML = portfolio.map(item => `
    <div class="spotlight-card">
      <div class="card-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span class="bento-badge" style="margin-bottom: 0;">${item.category}</span>
          <span style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--text-faint);">${item.status}</span>
        </div>
        <h3 class="bento-title" style="font-size: 1.25rem;">${item.title}</h3>
        <p class="bento-desc">${item.description}</p>
        <div class="tech-chips">
          ${item.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  if (typeof initSpotlightTracking === 'function') {
    initSpotlightTracking();
  }
}

/* 4. Render Industries */
async function renderIndustries() {
  const industries = await fetchJSON('data/industries.json');
  const container = document.getElementById('industriesContainer');
  if (!industries || !container) return;

  container.innerHTML = industries.map(ind => `
    <div class="industry-card">
      <h4>${ind.title}</h4>
      <p>${ind.description}</p>
    </div>
  `).join('');
}
