// nav.js — shared navigation, injected into every page
// To add a new page: add an entry to the `pages` array below.
const pages = [
  { href: 'index.html',      label: 'Home' },
  { href: 'retirement.html', label: 'Retirement Savings' },
  { href: 'mortgage.html',   label: 'Mortgage' },
  { href: 'auto-loan.html',  label: 'Auto Loan' },
  { href: 'budget.html',     label: 'Budget' },
];

(function () {
  const current = location.pathname.split('/').pop() || 'index.html';

  const nav = document.createElement('nav');
  nav.id = 'site-nav';

  // ── Brand ──
  const brand = document.createElement('a');
  brand.href = 'index.html';
  brand.className = 'nav-brand';
  brand.textContent = 'Finance Tools';
  nav.appendChild(brand);

  // ── Nav links ──
  const ul = document.createElement('ul');
  ul.className = 'nav-links';
  pages.forEach(p => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = p.href;
    a.textContent = p.label;
    if ((current === p.href) || (current === '' && p.href === 'index.html')) {
      a.classList.add('active');
    }
    // Close menu when a link is tapped on mobile
    a.addEventListener('click', () => {
      ul.classList.remove('open');
      toggle.classList.remove('open');
    });
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);

  // ── Hamburger toggle (mobile only, hidden via CSS on desktop) ──
  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.id = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Toggle menu');
  toggle.setAttribute('aria-expanded', 'false');
  for (let i = 0; i < 3; i++) {
    const span = document.createElement('span');
    toggle.appendChild(span);
  }
  toggle.addEventListener('click', () => {
    const isOpen = ul.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  // Insert toggle between brand and ul (CSS uses order/flex to position it)
  nav.insertBefore(toggle, ul);

  // ── Auth area ──
  const authArea = document.createElement('div');
  authArea.className = 'nav-auth';
  authArea.style.cssText = 'display:flex;align-items:center;gap:10px;flex-shrink:0;';

  const userInfo = document.createElement('span');
  userInfo.id = 'nav-user-info';
  userInfo.style.cssText = 'font-size:13px;color:var(--text-2);display:none;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';

  const authBtn = document.createElement('button');
  authBtn.id = 'nav-auth-btn';
  authBtn.textContent = 'Sign in';
  authBtn.style.cssText = 'height:32px;padding:0 14px;background:var(--accent);color:#fff;border:none;border-radius:var(--radius);font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:opacity 0.15s;';
  authBtn.onmouseover = () => authBtn.style.opacity = '0.85';
  authBtn.onmouseout  = () => authBtn.style.opacity = '1';

  authArea.appendChild(userInfo);
  authArea.appendChild(authBtn);
  nav.appendChild(authArea);

  // Close menu if user clicks outside the nav
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      ul.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.body.insertBefore(nav, document.body.firstChild);
})();
