# Amigo website

## Deploy target

Cloudflare Pages

## Build settings

Cloudflare Pages settings:

* Framework preset: None
* Build command: npm run build
* Build output directory: public
* Production branch: main

## Static HTML build

This project uses a small Node.js build step to keep the deployed site as complete static HTML while avoiding duplicated header and footer markup.

* Edit shared headers and footers only in `src/components/`.
* Edit page templates only in `src/pages/`.
* Run `npm run build` before preview or deploy.
* `public/*.html`, `public/en/*.html`, `public/uk/*.html`, and blog article HTML files are generated output.
* Do not manually edit generated header or footer markup inside `public/` HTML files.
* The private review pages (`/review`, `/en/review`, `/uk/review`) intentionally remain `noindex`.

## Site structure

The live static site is served from generated files in `public/`.

Primary Polish source page templates live at the root of `src/pages/`:

* `/`
* `src/pages/about.html`
* `src/pages/portfolio.html`
* `src/pages/services.html`
* `src/pages/reviews.html`
* `src/pages/blog.html`
* `src/pages/contact.html`

Ukrainian and English source versions live in `src/pages/uk/` and `src/pages/en/`.

Cloudflare Pages serves `.html` files through clean URLs such as `/about`, `/services`, `/uk/about`, and `/en/about`. Do not add `_redirects` rules that rewrite `/about` to `/about.html`; that can create a self-redirect loop with Cloudflare's pretty URL handling.

## Contact form

The contact form sends JSON POST requests to:

`/api/contact`

The backend is implemented as a Cloudflare Pages Function:

`functions/api/contact.js`

Email delivery uses the Resend API directly through `fetch`; there is no Resend SDK or npm dependency.

## Required Cloudflare Pages Environment Variables

Add these in Cloudflare Pages -> Project -> Settings -> Environment variables.

* `RESEND_API_KEY`
* `CONTACT_EMAIL`
* `FROM_EMAIL`
* `ALLOWED_ORIGINS`
* `TURNSTILE_SECRET_KEY`

Suggested values:

* `RESEND_API_KEY`: `re_xxxxxxxxxxxxxxxxx` as a Secret.
* `CONTACT_EMAIL`: email address that should receive form submissions, for example `your@email.com`.
* `FROM_EMAIL`: sender from a verified Resend domain, for example `Amigo <noreply@amigostudio.pl>`.
* `ALLOWED_ORIGINS`: `https://amigostudio.pl,https://www.amigostudio.pl,https://REPLACE_WITH_PROJECT.pages.dev`.
* `TURNSTILE_SECRET_KEY`: secret key from Cloudflare Turnstile as a Secret.

## Turnstile setup

In Cloudflare Dashboard -> Turnstile -> Add widget:

* Widget name: `Amigo contact form`
* Domains: `amigostudio.pl`, `www.amigostudio.pl`, `REPLACE_WITH_PROJECT.pages.dev`

After creating the widget:

1. Add the public Site Key to every contact form source page if the key changes: `src/pages/index.html`, `src/pages/contact.html`, `src/pages/uk/index.html`, `src/pages/uk/contact.html`, `src/pages/en/index.html`, and `src/pages/en/contact.html`, then run `npm run build`.
2. Add the Secret Key to Cloudflare Pages Environment Variables as `TURNSTILE_SECRET_KEY`.

Server-side Turnstile verification is implemented in `functions/api/contact.js` through:

`https://challenges.cloudflare.com/turnstile/v0/siteverify`

## Resend setup

1. Create a Resend account or open the existing one.
2. Add and verify `amigostudio.pl` or a sending subdomain such as `send.amigostudio.pl`.
3. Add the DNS records from Resend in Cloudflare DNS.
4. Wait until the domain status is Verified.
5. Create a Resend API key.
6. Add the API key to Cloudflare Pages Environment Variables as `RESEND_API_KEY`.
7. Set `FROM_EMAIL` to an address from the verified domain, for example `Amigo <noreply@amigostudio.pl>`.

Do not use a sender from an unverified domain.

## Manual setup

1. Create and verify domain in Resend.
2. Create Resend API key.
3. Create Turnstile widget in Cloudflare.
4. Add Turnstile Site Key to the six pages that contain the form.
5. Add Turnstile Secret Key to Cloudflare Pages Environment Variables.
6. Add all required environment variables in Cloudflare Pages.
7. Deploy to Cloudflare Pages.
8. Test the form on pages.dev before switching the production domain.
9. After successful test, connect `amigostudio.pl` and `www.amigostudio.pl` as Custom Domains.

## Security notes

* Do not commit API keys.
* Do not commit `.env` files with real values.
* Do not expose Resend API key in frontend code.
* Do not expose Turnstile Secret Key in frontend code.
* Keep only the public Turnstile Site Key in HTML.
