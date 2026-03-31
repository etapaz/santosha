/* =============================================
   js/components.js — Header & Footer injectés
   ============================================= */

const NAV_LINKS = [
  { href: 'horaires.html', label: "Horaires" },
  { href: 'tarifs.html', label: "Tarifs" },
  { href: 'professeurs.html', label: "Professeurs" },
  { href: 'formation.html', label: "Formations" },
  { href: 'retraites.html', label: "Retraites" },
  { href: 'location-salles.html', label: "Location" },
  { href: 'contact.html', label: "Contact" },
];

const ALL_LINKS = [
  { href: 'index.html', label: "Accueil" },
  { href: 'horaires.html', label: "Horaires" },
  { href: 'tarifs.html', label: "Tarifs" },
  { href: 'pilates.html', label: "Pilates" },
  { href: 'professeurs.html', label: "Professeurs" },
  { href: 'formation.html', label: "Formations" },
  { href: 'retraites.html', label: "Retraites" },
  { href: 'location-salles.html', label: "Location" },
  { href: 'seance.html', label: "Séances" },
  { href: 'pensee.html', label: "Pensées" },
  { href: 'contact.html', label: "Contact" },
];

/**
 * Détecte si on est dans un sous-dossier (ex: profs/)
 * et retourne le préfixe relatif vers la racine du site.
 * Fonctionne pour les URLs de type file:// et http://.
 */
function getRootPrefix() {
  const path = window.location.pathname;
  if (path.includes('/profs/') || path.includes('/seances/')) {
    return '../';
  }
  return '';
}

function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function injectHeader() {
  const current = getCurrentPage();
  const prefix = getRootPrefix();

  const navItems = NAV_LINKS.map(link => `
    <li><a href="${prefix}${link.href}" class="${current === link.href ? 'active' : ''}">${link.label}</a></li>
  `).join('');

  const mobileItems = ALL_LINKS.map(link => `
    <li><a href="${prefix}${link.href}" class="${current === link.href ? 'active' : ''}">${link.label}</a></li>
  `).join('');

  const headerHTML = `
    <div id="promo-banner" class="promo-banner">
      <div class="promo-banner-inner">
        <img src="${prefix}img/retraite-italie-villa.avif" alt="Yoga en Italie" class="promo-banner-img">
        <span>Prochaine retraite : <strong>Yoga en Ombrie (Italie)</strong> — Du 19 au 25 septembre 2026. <a href="${prefix}retraites.html">Découvrir le programme →</a></span>
      </div>
    </div>
    <header id="site-header">
      <div class="header-inner">
        <a href="${prefix}index.html" class="logo">
          <img src="${prefix}img/santosha-logo.png" alt="Logo Santosha" class="logo-img">
          Santosha
        </a>
        <nav>
          <ul>${navItems}</ul>
        </nav>
        <button class="burger" id="burger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu">
      <ul>${mobileItems}</ul>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // Burger toggle
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      setTimeout(() => { mobileMenu.style.display = 'none'; }, 300);
    } else {
      mobileMenu.style.display = 'block';
      requestAnimationFrame(() => mobileMenu.classList.add('open'));
    }
  });

  // Scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 20);
  });
}

function injectFooter() {
  const prefix = getRootPrefix();

  const footerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-logo">
              <img src="${prefix}img/santosha-logo.png" alt="Logo Santosha">
              Santosha
            </div>
            <p class="footer-desc">
              Centres de yoga à Bruxelles et Jodoigne.<br>
              Un espace de bien-être, de découverte et de transformation.
            </p>
          </div>

          <div class="footer-section">
            <h4>Nos centres</h4>
            <address>
              <strong>Jodoigne — Brabant Wallon</strong><br>
              39 chaussée de Wavre<br>
              1370 Jodoigne<br>
              Tél. : 0470 391 432 ou 0495 366 172<br>
              <a href="mailto:yoga@santosha.be">yoga@santosha.be</a>
            </address>
            <br>
            <address>
              <strong>Bruxelles — Schaerbeek</strong><br>
              151 Avenue Ernest Cambier<br>
              1030 Schaerbeek (Rd-Pt Meiser)<br>
              Tél. : 0495 366 172<br>
              <a href="mailto:yoga@santosha.be">yoga@santosha.be</a>
            </address>
          </div>

          <div class="footer-section">
            <h4>Navigation</h4>
            <nav class="footer-nav">
              ${ALL_LINKS.map(link => `<a href="${prefix}${link.href}">${link.label}</a>`).join('')}
            </nav>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} Centre de Yoga Santosha — Bruxelles &amp; Jodoigne, Belgique</p>
        </div>
      </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="back-to-top" aria-label="Retour en haut">
      ↑
    </button>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Page transition
function initPageTransition() {
  const wrapper = document.querySelector('.page-wrapper');
  if (!wrapper) return;

  // Fade in on load
  requestAnimationFrame(() => {
    wrapper.classList.add('visible');
  });

  // Fade out on link click (internal pages only)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;

    e.preventDefault();
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'translateY(-10px)';
    wrapper.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

    setTimeout(() => {
      window.location.href = href;
    }, 350);
  });

  // Handle browser back button (BFCache)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'translateY(0)';
      wrapper.style.transition = 'none'; // Avoid animating back in

      // small delay to restore the transition property for future clicks
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrapper.style.transition = '';
        });
      });
    }
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Init everything
document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  initPageTransition();
  initBackToTop();
});
