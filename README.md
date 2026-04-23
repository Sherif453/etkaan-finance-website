# Etkaan Bilingual Lead Generation Website

Production-ready mobile-first website for Etkaan accounting and advisory services in Egypt.

The source of truth for requirements and business rules is [project.md](./project.md). Read it before making product, copy, form, API, or deployment changes.

## Architecture Summary

- Next.js App Router with locale routes at `/ar` and `/en`.
- Arabic is the default locale through `next-intl` routing and `src/proxy.ts`.
- Tailwind CSS v4 is configured through `@tailwindcss/postcss`.
- All visible copy and metadata live in `messages/ar.json` and `messages/en.json`.
- One shared lead modal is provided by `LeadModalProvider`.
- React Hook Form manages form state and Zod validates on the client and server.
- `/api/leads` validates, normalizes Egyptian mobile numbers, appends to Google Sheets, and returns a WhatsApp URL.
- Google credentials are used only on the server in `src/lib/google-sheets.ts`.

## Local Setup

This project uses `pnpm` through Corepack. Node.js `20.20.0` or newer is recommended.

1. Enable Corepack if needed:

```bash
corepack enable
```

2. Install dependencies:

```bash
pnpm install
```

3. Create your local env file:

```bash
cp .env.example .env.local
```

4. Fill in the required environment variables in `.env.local`.

5. Run the development server:

```bash
pnpm dev
```

6. Open:

```text
http://localhost:3000/ar
http://localhost:3000/en
```

## Environment Variables

Use [ENVIRONMENT-GUIDE.md](./ENVIRONMENT-GUIDE.md) for the full step-by-step guide covering every key, how to produce Google credentials, where each value goes locally, and what to put in Vercel.

## Google Sheets Setup

1. In Google Cloud Console, create or select a project.
2. Enable the Google Sheets API.
3. Create a service account.
4. Create a JSON key for the service account.
5. Copy `client_email` to `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
6. Copy `private_key` to `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`.
7. Create a Google Sheet for leads.
8. Share the Sheet with the service account email using Editor access.
9. Copy the spreadsheet ID from the Sheet URL:

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

10. Set `GOOGLE_SHEETS_SPREADSHEET_ID` to that ID.
11. Create a tab named `Leads` or set `GOOGLE_SHEETS_SHEET_NAME` to your chosen tab name.

## Required Spreadsheet Header Row

Add this exact header row in row 1:

```text
timestamp, locale, sourcePage, name, phone, governorate, service, whatsappMessage, utm_source, utm_medium, utm_campaign
```

## Vercel Deployment

1. Push the project to a Git repository.
2. Import the repository in Vercel as a Next.js project.
3. Add all variables from `.env.example` in Vercel Project Settings. Follow [ENVIRONMENT-GUIDE.md](./ENVIRONMENT-GUIDE.md).
4. Make sure `NEXT_PUBLIC_SITE_URL` is set to `https://etkaan.com` after the production domain is attached.
5. Deploy.
6. Test `/ar`, `/en`, and the lead form in production.

## Content and Config Updates

- Phone and default WhatsApp number: `src/lib/site.ts` and `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- Email: `NEXT_PUBLIC_CONTACT_EMAIL`.
- Google Maps link: `NEXT_PUBLIC_GOOGLE_MAPS_URL`.
- Social links: `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_LINKEDIN_URL`.
- Service and sales contact CTAs go to the lead form or WhatsApp. Email uses `mailto:`, and Facebook/LinkedIn open their external profiles.
- Arabic and English page copy: `messages/ar.json` and `messages/en.json`.
- Business rules and no-price constraint: `project.md`.

## QA Checklist

- `/` redirects or negotiates to Arabic.
- `/ar` renders Arabic RTL.
- `/en` renders English LTR.
- Header language switch keeps users on the matching page.
- Home, Services, About, Contact, and Privacy Policy exist in both languages.
- No prices are visible anywhere on the website.
- Every marketing CTA opens the same lead modal.
- Floating WhatsApp button is visible on all pages.
- Form labels, validation errors, success states, and buttons are localized.
- Egyptian mobile numbers are accepted in local and international formats and normalized before storage.
- Successful submit appends one row to Google Sheets.
- Successful submit shows success state and opens WhatsApp with encoded prefilled text.
- Sheets/API failure shows a friendly error and keeps the WhatsApp fallback visible.
- Social, maps, email, and WhatsApp links use configured environment values.
- `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass before deployment.

## Verified Commands

These commands were run successfully:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Local production smoke test confirmed:

- `/` returns a `307` redirect to `/ar`.
- `/ar` renders `lang="ar"` and `dir="rtl"`.
- `/en` renders `lang="en"` and `dir="ltr"`.
