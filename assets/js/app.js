/**
 * app.js — Portfolio Renderer
 * Fetches /_data/portfolio.json and populates all sections.
 * To update content: edit _data/portfolio.json (or use the /admin CMS panel).
 */

// ─────────────────────────────────────────────────────────────────────────────
// MAIN INIT
// ─────────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Initialise AOS animations
  AOS.init({ duration: 700, once: true, offset: 80 });

  // Load data then render
  try {
    const res  = await fetch('/_data/portfolio.json');
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error('Failed to load portfolio data:', err);
  }

  // Hide loader
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) { loader.style.opacity = '0'; setTimeout(() => loader.remove(), 500); }
  }, 600);

  // Set up misc UI
  initNavScroll();
  initHamburger();
  initBackToTop();
  document.getElementById('footer-year').textContent =
    `© ${new Date().getFullYear()} Nima Dorji Moktan`;
});

// ─────────────────────────────────────────────────────────────────────────────
// RENDER — main function, calls each section renderer
// ─────────────────────────────────────────────────────────────────────────────
function render(data) {
  renderHero(data.personal);
  renderAbout(data.personal);
  renderSkills(data.skills);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderLinks(data.personal);
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function renderHero(p) {
  setText('hero-greeting', p.greeting || 'Hi, my name is');
  setText('hero-name',     p.name     || '');
  setText('hero-tagline',  p.tagline  || '');

  // Typed.js roles animation
  if (p.roles && p.roles.length) {
    new Typed('#typed-roles', {
      strings:       p.roles,
      typeSpeed:     50,
      backSpeed:     30,
      backDelay:     1800,
      loop:          true,
      smartBackspace: true,
    });
  }

  // Resume buttons
  if (p.resumeFile) {
    ['hero-resume-btn', 'nav-resume-btn', 'mobile-resume-btn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = p.resumeFile;
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────
function renderAbout(p) {
  setText('about-summary',  p.summary || '');
  setText('profile-name',   p.name    || '');

  // Contact mini-list
  const list = document.getElementById('about-contact-list');
  if (!list) return;
  const items = [
    { icon: 'fa-envelope',    href: `mailto:${p.email}`,  label: p.email },
    { icon: 'fa-phone',       href: `tel:${p.phone}`,     label: p.phone },
    { icon: 'fa-map-marker-alt', href: '#',               label: p.location },
    { icon: 'fa-linkedin',    href: p.linkedin,           label: 'LinkedIn Profile', external: true },
  ].filter(i => i.label);

  list.innerHTML = items.map(item => `
    <a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener"' : ''}
       class="flex items-center gap-3 text-slate hover:text-mint transition-colors group">
      <div class="w-8 h-8 rounded-full bg-navy-ll flex items-center justify-center
                  group-hover:bg-mint group-hover:text-navy transition-all flex-shrink-0">
        <i class="fas ${item.icon} text-xs"></i>
      </div>
      <span class="text-sm truncate">${escHtml(item.label)}</span>
    </a>
  `).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────────────────
function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container || !skills) return;

  const categoryIcons = {
    'Networking':            'fa-network-wired',
    'Cybersecurity':         'fa-shield-halved',
    'Systems & IT':          'fa-server',
    'Teaching & Leadership': 'fa-chalkboard-teacher',
  };

  container.innerHTML = Object.entries(skills).map(([category, tags], i) => `
    <div class="bg-navy rounded-xl p-6 border border-navy-ll card-hover"
         data-aos="fade-up" data-aos-delay="${i * 80}">
      <div class="flex items-center gap-3 mb-5">
        <div class="w-9 h-9 rounded-lg bg-mint text-navy flex items-center justify-center flex-shrink-0">
          <i class="fas ${categoryIcons[category] || 'fa-code'} text-sm"></i>
        </div>
        <h3 class="text-white font-semibold text-sm">${escHtml(category)}</h3>
      </div>
      <div class="flex flex-wrap gap-2">
        ${tags.map(tag => `<span class="skill-tag">${escHtml(tag)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────
function renderExperience(jobs) {
  const container = document.getElementById('experience-container');
  if (!container || !jobs) return;

  container.innerHTML = jobs.map((job, i) => `
    <div class="flex gap-6" data-aos="fade-up" data-aos-delay="${i * 60}">
      <!-- Timeline line + dot -->
      <div class="hidden sm:flex flex-col items-center">
        <div class="timeline-dot mt-1"></div>
        ${i < jobs.length - 1 ? '<div class="flex-1 w-px bg-navy-ll mt-2"></div>' : ''}
      </div>

      <!-- Card -->
      <div class="flex-1 bg-navy-l border border-navy-ll rounded-xl p-6 mb-2 card-hover">
        <!-- Header -->
        <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 class="text-white font-semibold text-lg leading-snug">${escHtml(job.title)}</h3>
            <p class="text-mint font-mono text-sm mt-0.5">${escHtml(job.company)}</p>
          </div>
          <span class="font-mono text-xs text-slate bg-navy px-3 py-1 rounded-full border border-navy-ll whitespace-nowrap">
            ${escHtml(job.period)}
          </span>
        </div>

        <!-- Overview -->
        <p class="text-slate text-sm leading-relaxed mb-4">${escHtml(job.overview)}</p>

        <!-- Accordion toggle -->
        <button onclick="toggleJobDetails(this)" aria-expanded="false"
                class="text-mint font-mono text-xs hover:underline flex items-center gap-1 mb-3">
          <span class="toggle-label">Show details</span>
          <i class="fas fa-chevron-down text-xs transition-transform duration-200"></i>
        </button>

        <!-- Details (hidden by default) -->
        <div class="job-details hidden space-y-4">
          <div>
            <p class="text-xs font-mono text-slate uppercase tracking-wider mb-2">Key Responsibilities</p>
            <ul class="space-y-1.5">
              ${(job.responsibilities || []).map(r => `
                <li class="flex gap-2 text-sm text-slate">
                  <span class="text-mint flex-shrink-0 mt-0.5">▸</span>
                  <span>${escHtml(r)}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          ${job.achievements && job.achievements.length ? `
          <div>
            <p class="text-xs font-mono text-slate uppercase tracking-wider mb-2">Achievements</p>
            <ul class="space-y-1.5">
              ${job.achievements.map(a => `
                <li class="flex gap-2 text-sm text-offwhite">
                  <span class="text-mint flex-shrink-0 mt-0.5">★</span>
                  <span>${escHtml(a)}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// Toggle accordion for job details
function toggleJobDetails(btn) {
  const details = btn.nextElementSibling;
  const icon    = btn.querySelector('i');
  const label   = btn.querySelector('.toggle-label');
  const expanded = btn.getAttribute('aria-expanded') === 'true';

  details.classList.toggle('hidden', expanded);
  icon.style.transform = expanded ? '' : 'rotate(180deg)';
  label.textContent    = expanded ? 'Show details' : 'Hide details';
  btn.setAttribute('aria-expanded', String(!expanded));
}

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────────────────────────────
function renderEducation(education) {
  const container = document.getElementById('education-container');
  if (!container || !education) return;

  const icons = ['fa-graduation-cap', 'fa-graduation-cap', 'fa-book', 'fa-laptop'];

  container.innerHTML = education.map((edu, i) => `
    <div class="bg-navy rounded-xl p-6 border border-navy-ll card-hover flex gap-4"
         data-aos="fade-up" data-aos-delay="${i * 80}">
      <div class="w-12 h-12 rounded-xl bg-mint text-navy flex items-center justify-center flex-shrink-0 mt-0.5">
        <i class="fas ${icons[i] || 'fa-graduation-cap'} text-base"></i>
      </div>
      <div class="flex-1">
        <h3 class="text-white font-semibold text-base leading-snug">${escHtml(edu.degree)}</h3>
        <p class="text-mint font-mono text-sm mt-1">${escHtml(edu.institution)}</p>
        <div class="flex items-center gap-3 mt-2">
          <span class="text-slate text-xs flex items-center gap-1">
            <i class="fas fa-map-marker-alt text-xs opacity-60"></i> ${escHtml(edu.location)}
          </span>
          <span class="text-xs text-slate opacity-40">•</span>
          <span class="font-mono text-xs text-slate">${escHtml(edu.year)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// LINKS (LinkedIn, etc. across the page)
// ─────────────────────────────────────────────────────────────────────────────
function renderLinks(p) {
  if (!p.linkedin) return;
  ['sidebar-linkedin', 'contact-linkedin', 'footer-linkedin'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = p.linkedin;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV — scroll behaviour
// ─────────────────────────────────────────────────────────────────────────────
function initNavScroll() {
  const navbar   = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 80;
    navbar.style.background    = scrolled ? 'rgba(10,25,47,0.95)'  : 'transparent';
    navbar.style.backdropFilter = scrolled ? 'blur(10px)'          : 'none';
    navbar.style.boxShadow      = scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none';

    // Back-to-top
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none');
      }
    }

    // Active nav highlighting
    highlightActiveNav();
  });
}

function highlightActiveNav() {
  const sections = ['about','skills','experience','education','contact'];
  const scrollY  = window.scrollY + 120;

  sections.forEach(id => {
    const section = document.getElementById(id);
    const link    = document.querySelector(`a[href="#${id}"]`);
    if (!section || !link) return;

    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      link.classList.add('nav-active');
    } else {
      link.classList.remove('nav-active');
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// HAMBURGER (mobile)
// ─────────────────────────────────────────────────────────────────────────────
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('ham-icon');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const open = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', open);
    icon.className = open ? 'fas fa-bars' : 'fas fa-times';
  });
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('ham-icon');
  if (menu) menu.classList.add('hidden');
  if (icon) icon.className = 'fas fa-bars';
}

// ─────────────────────────────────────────────────────────────────────────────
// BACK-TO-TOP (button click handled inline, visibility here)
// ─────────────────────────────────────────────────────────────────────────────
function initBackToTop() {
  // visibility handled inside initNavScroll
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM (Netlify handles submission; this is just UX)
// ─────────────────────────────────────────────────────────────────────────────
function handleFormSubmit(e) {
  // On Netlify, the form submits normally (no JS needed).
  // This function shows a thank-you message after submission.
  // For local testing, we prevent default and show success immediately.
  const isNetlify = window.location.hostname !== 'localhost' &&
                    window.location.hostname !== '127.0.0.1';
  if (!isNetlify) {
    e.preventDefault();
    document.querySelector('form[name="contact"]').classList.add('hidden');
    document.getElementById('form-success').classList.remove('hidden');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
