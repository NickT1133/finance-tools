// nav.js — shared navigation, injected into every page
// To add a new page: add an entry to the `pages` array below.

const pages = [
  { href: 'index.html',     label: 'Home' },
  { href: '403b.html',      label: '403(b) Savings' },
  { href: 'mortgage.html',  label: 'Mortgage' },
  { href: 'auto-loan.html', label: 'Auto Loan' },
  { href: 'budget.html',    label: 'Budget' },
];

(function () {
  const current = location.pathname.split('/').pop() || 'index.html';

  const nav = document.createElement('nav');
  nav.id = 'site-nav';

  const brand = document.createElement('a');
  brand.href = 'index.html';
  brand.className = 'nav-brand';
  brand.textContent = 'Finance Tools';
  nav.appendChild(brand);

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
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);

  // ── auth area ──
  const authArea = document.createElement('div');
  authArea.style.cssText = 'display:flex;align-items:center;gap:10px;margin-left:auto;flex-shrink:0;';

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

  document.body.insertBefore(nav, document.body.firstChild);
})();
