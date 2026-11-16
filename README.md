# Lighthouse Lab Website

## Open the website
You can open `html/index.html` directly in Chrome or run it with VS Code Live Server.

The navbar and footer are embedded directly in every page. They do not use JavaScript `fetch()`, so they do not require a local server just to appear.

## Tailwind CSS build (optional)
The project includes a local Tailwind CLI build command. It does not use the Tailwind CDN.

1. Install dependencies: `npm install`
2. Build utilities: `npm run build:tailwind`

The command creates `css/tailwind.generated.css`. The input intentionally includes Tailwind utilities only (no preflight reset), to avoid unexpectedly changing the existing custom design. The current pages continue to use their existing local stylesheets.

## Pages
- `html/index.html`
- `html/service.html`
- `html/pricing.html`
- `html/projects.html`
- `html/about.html`

## Shared files
- `html/nav.html` and `html/footer.html` are the master copies. If you edit either one, copy the updated markup into each page.
- `css/style.css` contains shared navbar, footer, cursor, and global responsive styles.
- Each page has its own stylesheet in `css/`.
- `js/main.js` handles the shared active navigation state, cursor, and footer year.
