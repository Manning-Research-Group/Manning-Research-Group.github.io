# ManningGroup site (static rebuild)

Plain HTML/CSS/JS, no build step. Ready for GitHub Pages.

## Publish on GitHub Pages
1. Create a new GitHub repo (e.g. `manning-group-site`).
2. Push the contents of this folder to the repo's default branch.
3. In the repo settings, go to **Pages** and set the source to the default branch, root folder.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.
   - If you want it at a custom domain (e.g. keep using something under syr.edu, or a new domain), add a `CNAME` file with that domain and configure DNS — ask if you want help with this step.

## Structure
- `index.html`, `research.html`, `people.html`, `publications.html`, `cv.html`, `teaching.html`, `manual.html`, `software.html`
- `assets/css/style.css` — all styling
- `assets/js/site.js` — injects the shared header/nav/footer on every page (edit the `links` array here to change the nav)
- `assets/img/` — logo and banner are placeholders, see below

## Known gaps to fill in
- **Logo & banner images**: `assets/img/logo.svg` and `assets/img/banner.svg` are placeholders. Replace them with the real files from the WordPress site (right-click → save image on the live site, or export from WordPress media library) and update the `src` references in `site.js` (logo) and `index.html` (banner). Any format (png/jpg/svg) works.
- **Group photos** on the People page: the original page embeds actual photos for each year; only captions were recoverable via text extraction. Add `<img>` tags once you have the files.
- **Manning Research Group Manual**: only the "Core values" section was retrievable; the full manual likely has more (lab practices, authorship, onboarding). Paste the rest in and it can be added.
- **Individual Development Plans page**: referenced in the WordPress menu structure but not fetched — send the content if you want it included.
- **Research sub-pages**: some individual project pages (e.g. specific to jammed solids, cell sorting) may have longer write-ups beyond what's summarized on the main Research page. The current `research.html` reflects the Research page content as-is; let me know if you want separate detail pages per topic.
- **News/blog**: the original site has a WordPress blog feed of group news; this wasn't ported since it's more suited to a blog-hosting approach, but a simple `news.html` with a manual list can be added if wanted.
