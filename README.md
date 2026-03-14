# Finance Tools

A personal collection of client-side financial calculators. No backend, no accounts, no ads — just open the files in a browser or host them as a static site.

## Tools

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Dashboard with links to all tools |
| 403(b) Savings | `403b.html` | Retirement balance projector with employer match, monthly contributions, salary growth, and inflation adjustment |
| Mortgage | `mortgage.html` | Payment calculator with amortization schedule, biweekly and extra payment comparisons |
| Auto Loan | `auto-loan.html` | Loan payoff with depreciation curve, underwater tracking, and total cost of ownership |
| Monthly Budget | `budget.html` | Toggleable spending categories across 6 groups, with live surplus/deficit status and doughnut chart |

## Usage

Clone or download the repo and open `index.html` in any browser — no build step, no dependencies to install.

```bash
git clone https://github.com/yourusername/finance-tools.git
cd finance-tools
open index.html   # macOS
# or just double-click index.html on Windows/Linux
```

## Hosting on GitHub Pages

1. Push all files to a GitHub repository
2. Go to **Settings → Pages**
3. Under *Source*, select **Deploy from branch → main**
4. Your site will be live at `https://yourusername.github.io/finance-tools`

## File Structure

```
finance-tools/
├── index.html        # Homepage
├── 403b.html         # Retirement calculator
├── mortgage.html     # Mortgage calculator
├── auto-loan.html    # Auto loan calculator
├── budget.html       # Monthly budget tracker
├── style.css         # Shared design system and styles
├── nav.js            # Shared navigation bar (injected into every page)
└── README.md
```

## Adding a New Calculator

1. Create a new `.html` file — copy any existing page as a starting point
2. Link `style.css` and `nav.js` in the `<head>` / before `</body>`
3. Add an entry to the `pages` array in `nav.js` — it will appear in the nav on every page automatically

## Tech

- Vanilla HTML, CSS, and JavaScript — no frameworks
- [Chart.js](https://www.chartjs.org/) via CDN for charts
- [DM Sans / DM Serif Display / DM Mono](https://fonts.google.com/) via Google Fonts
- Fully static — can be served from any host (GitHub Pages, Netlify, Vercel, S3, etc.)
