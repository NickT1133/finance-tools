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
    a.href = p.wip ? '#' : p.href;
    a.textContent = p.label;
    if ((current === p.href) || (current === '' && p.href === 'index.html')) {
      a.classList.add('active');
    }
    if (p.wip) {
      a.style.opacity = '0.4';
      a.style.cursor = 'default';
      a.title = 'Coming soon';
    }
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  document.body.insertBefore(nav, document.body.firstChild);
})();
