# WEBARRAYS – Next.js App

Next.js app for WEBARRAYS software agency (website solutions, Pakistan).

## What’s included

- **No Tailwind** – Custom CSS: `styles/ahsan.css`, `styles/style.css`, `styles/media_queries.css`
- **Custom fonts** – `public/fonts/` (Bebas Neue Pro, Cirka) with absolute paths; Google Fonts in layout
- **Bootstrap 5.3**, **AOS**, **GSAP**, **SplitText**
- **Contact form** – Sends email via Resend (works on Vercel serverless)
- **SEO** – Meta title/description/keywords, Open Graph, Twitter, JSON-LD (Organization, WebSite)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel (free)

1. Push the repo to GitHub and import the project in [Vercel](https://vercel.com).
2. Add **Environment Variables** in Vercel (Settings → Environment Variables):

   | Name              | Value                    | Notes                          |
   |-------------------|--------------------------|--------------------------------|
   | `RESEND_API_KEY`  | `re_xxxx...`             | From [resend.com/api-keys](https://resend.com/api-keys) (free tier) |
   | `CONTACT_EMAIL`   | `your@email.com`        | Where contact form submissions are sent |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` | Optional; for SEO canonical URL |

3. Redeploy. The Contact Us form will send emails to `CONTACT_EMAIL` via Resend.

Without `RESEND_API_KEY` and `CONTACT_EMAIL`, the form will show a friendly error asking the user to email you directly.

## Build for production

```bash
npm run build
npm start
```

## Project structure

- `app/layout.js` – Layout, fonts, SEO metadata, JSON-LD
- `app/page.jsx` – Home page
- `app/api/contact/route.js` – POST handler; sends email via Resend
- `components/ContactForm.jsx` – Client form that POSTs to `/api/contact`
- `components/Animations.jsx` – AOS + GSAP
- `public/fonts/fonts.css` – Custom @font-face with `/fonts/...` paths
- `styles/` – ahsan, style, media_queries
- `.env.example` – Copy to `.env.local` and set `RESEND_API_KEY`, `CONTACT_EMAIL` for local testing
