# Kasa & Kin — website

Static HTML site, no build step. Upload the whole folder to the GitHub repo and serve with GitHub Pages.

## Files
- `index.html` — homepage (The home of ube)
- `about.html`, `ube.html`, `restaurant.html`, `bakery.html`, `grab-and-go.html`, `menus.html`, `kasa-klub.html`, `contact.html`
- `css/style.css` — all styles (brand colours at the top: ube #3F2160, ivory #FBF6EE, marigold #E89A2C)
- `js/main.js` — mobile nav toggle + current-page highlight
- `images/` — photos (each as 800/1600px WebP + 1600px JPG fallback), logo, favicon, og-ube.jpg
- `video/` — muted 12s loops (540px, H.264) + poster stills; they only play while on screen

## Before launch
1. **Photos** — done, except Kasa Klub artist photos (5 placeholders on `kasa-klub.html`). To swap any photo, change the `kk-NN` filenames inside its `<picture>`.
2. **Prices** — search for `[PRICE]`.
3. **Booking links** — search for `https://www.sevenrooms.com` and replace with the real SevenRooms/Toast URL. Same for Uber Eats.
4. **Kasa Klub** — `[DATE]`, `[ARTIST]`, `[MONTH]` placeholders on `kasa-klub.html`.
5. **Hours** — the old site listed two different sets; the footer set is used here. Confirm, and update the JSON-LD in `index.html`/`contact.html` if they change.
6. **Forms** — the contact and Klub sign-up forms don't submit anywhere yet. Point them at Formspree / Google Sheets / whatever the client uses.
7. A larger/SVG logo would look sharper on retina screens (current file is 189px wide).
8. Facebook link in the footer is a placeholder.
