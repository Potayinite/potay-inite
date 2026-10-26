# Pòtay Inite website

A trilingual (English / Français / Kreyòl) website for Pòtay Inite, built with Jekyll and hosted free on GitHub Pages.
Everything on the site — page text, photos, quotes, partner logos, events, blog posts and footer details —
is edited at **potayinite.org/admin** with Decap CMS. No code needed.

English is the main version (potayinite.org/), French is at /fr/ and Kreyòl at /ht/.
Anything left empty in French or Kreyòl shows the English text, so nothing on the site is ever blank.

---

## 1. Put the site on GitHub

1. Create a new **public** repository on GitHub, e.g. `potay-inite`.
2. Upload everything in this folder to it (drag and drop on github.com works, or `git push`).
3. Repository → **Settings → Pages → Build and deployment**: Source *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.
4. After a minute the site appears at `https://YOUR_USERNAME.github.io/potay-inite/`.
   Links look broken at that temporary address because the site is set up for potayinite.org — step 2 fixes that.

## 2. Connect potayinite.org (Porkbun)

1. GitHub: **Settings → Pages → Custom domain** → `potayinite.org` → Save (GitHub adds a `CNAME` file — keep it).
2. Porkbun: **Domain Management → Details → DNS Records**. Look at what's there first and leave any **MX** records (email) alone.
   - Four **A** records, host blank: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record, host `www`, answer `YOUR_USERNAME.github.io` (Porkbun's *Quick DNS Config → Github* button can add this one)
   - Delete any old A/CNAME records for the bare domain or `www` that point elsewhere (e.g. to Wix).
3. Once DNS has updated (minutes to 48 hours), tick **Enforce HTTPS** in GitHub Pages settings.

## 3. Turn on sign-in for /admin

Decap signs people in with a GitHub account. GitHub Pages can't do that step alone, so it uses a small free helper on Cloudflare. One-time setup:

1. Deploy **sveltia-cms-auth** (works with Decap): https://github.com/sveltia/sveltia-cms-auth — use its *Deploy to Cloudflare* button (free Cloudflare account). Note the address, e.g. `https://sveltia-cms-auth.yourname.workers.dev`.
2. GitHub → your profile **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: `https://potayinite.org`
   - Authorization callback URL: `<helper address>/callback`
   - Create, then **Generate a new client secret**.
3. Cloudflare → the Worker → **Settings → Variables and Secrets**:
   `GITHUB_CLIENT_ID` = Client ID, `GITHUB_CLIENT_SECRET` = the secret (as a Secret), `ALLOWED_DOMAINS` = `potayinite.org`. Deploy.
4. In this repo, edit **`admin/config.yml`** (top of the file):
   - `repo:` → `YOUR_USERNAME/potay-inite`
   - `base_url:` → your helper address
5. Each staff editor makes a free GitHub account; add them under the repo's **Settings → Collaborators**. After accepting the invite they go to `potayinite.org/admin` → *Login with GitHub*.

## 4. What staff can edit in /admin

| Menu | What's in it |
|---|---|
| **Blog** | Articles. Write the English version, then switch to FR / HT at the top (or use *Fill in from another locale*) to translate. A post with no French/Kreyòl text simply isn't listed on that language's blog. |
| **Events** | Each event has a card on the Events page and its own page (*More info*). Set the date, time, place, card photo, details, and an optional **Buy Tickets / RSVP / Register** button with its link. When the date passes, the event moves to **Past events** by itself — then add a **photo gallery** and a **YouTube or Vimeo video** link, and its page becomes the recap (click any photo to view it large). Photos and video are added in English and show in every language; untranslated events show in English. |
| **Pages → Home page** | Every home section: headline, logo, intro, button, portrait, badge, landscape background, pillars, the 4 pathway cards and photos, quotes, partner logos, join section. |
| **Pages → About / Events / Blog / Contact / Donate** | Titles, intros, photos and page text. |
| **Site settings** | Footer text, phone, email, address, social links, donation link and form addresses. |

Every *Publish* in /admin saves to GitHub; the live site updates about a minute later.
Layout changes (moving sections around, new kinds of sections) are done in the code, not in /admin.

## 5. Before launch — things to fill in or replace

- **Photos and logos**: the current images were cut from a screen recording of the Wix site, so they're lower quality. Replace them with the original files — in /admin, or by replacing the files in `assets/images/` (same names).
- **Forms**: create free forms at https://formspree.io (one each for *Join*, *Contact* and *Newsletter*, or reuse one) and paste their addresses in /admin → Site settings.
- **Donations**: put a PayPal / Stripe Payment Link in Site settings → *Outside donation page*, or leave it empty to send people to the site's Donate page.
- **Phone number**: `+1 (555) 382-9483` came from the Wix site and looks like a sample number.
- **About and Donate pages** have bracketed placeholders to replace.
- **Translations**: the French and Kreyòl were translated from the English and should be checked by a native speaker.
- Delete the sample blog post ("Welcome…") and sample event.

## 6. Menu labels and colors (code)

- Menu items, button words and form labels in each language: `_data/i18n.yml`
- Colors and fonts: top of `assets/css/main.css`

## Preview on your computer (optional)
Needs Ruby: `bundle install`, then `bundle exec jekyll serve`, then open http://localhost:4000.

## How it's organized
```
_config.yml            site settings, languages, address rules
_data/home.yml         home page content (en / fr / ht)       ← edited in /admin
_data/pages/*.yml      About, Events, Blog, Contact, Donate    ← edited in /admin
_data/settings.yml     footer, contact, links, form addresses  ← edited in /admin
_data/i18n.yml         menu labels and small interface words
_posts/en|fr|ht/       blog posts                               ← edited in /admin
_events/en|fr|ht/      events                                   ← edited in /admin
_layouts/, _includes/  page templates
admin/                 Decap CMS (index.html + config.yml)
assets/                css, js, images, uploads
index.md, fr/, ht/     one small file per page that only sets its address
```
