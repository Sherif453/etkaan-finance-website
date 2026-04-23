# Etkaan Commercial Website

A bilingual commercial website for an Egyptian accounting and advisory business,
designed to turn visitors into qualified leads and move them directly into
WhatsApp follow-up.

This project highlights product-focused frontend engineering, Arabic/English
internationalization, conversion-oriented UX, and a secure backend workflow that
connects website inquiries to a real business pipeline.

## Project Snapshot

- Commercial lead-generation website for a real business use case
- Full Arabic and English experience with correct RTL/LTR behavior
- Conversion-first flow built around a shared lead modal
- Server-side lead validation and Google Sheets storage
- WhatsApp handoff after submission to support fast sales follow-up
- Mobile-first UI with a clean, trustworthy visual system

## Business Goal

The website is intentionally focused on one core outcome: capture qualified
interest, collect essential lead data, and hand the conversation off to WhatsApp
for direct business follow-up.

Instead of acting like a generic brochure site, it enforces a clear funnel:

1. The visitor lands on the Arabic or English experience.
2. Any main CTA opens the same inquiry modal.
3. The visitor submits name, phone number, governorate, and service details.
4. The lead is validated and stored server-side.
5. The visitor is pushed into WhatsApp with a prefilled message.

That keeps the user journey simple, measurable, and aligned with how the
business actually closes leads.

## Strong Technical Points

- Next.js 16 App Router architecture for a modern production-grade frontend
- TypeScript across the codebase for stronger correctness and maintainability
- `next-intl` for full locale routing, translated metadata, and Arabic-first UX
- React Hook Form plus Zod for shared client/server validation
- Server-only Google Sheets integration for lightweight operational lead storage
- Graceful failure handling with WhatsApp fallback if Sheets storage fails
- Egyptian mobile number normalization before persistence
- UTM capture for campaign attribution and lead source tracking

## How The Project Meets Business Requirements

- Solves a real commercial problem instead of being a UI-only demo
- Supports a region-specific market with proper bilingual implementation
- Connects frontend experience, backend validation, and business operations in
  one product
- Enforces business constraints clearly, including no public pricing and a
  single CTA funnel
- Balances product clarity, conversion design, and pragmatic engineering choices

## Key Features

- Arabic default locale at `/ar`
- Complete English locale at `/en`
- Shared CTA modal across the site
- Localized validation and messaging
- Google Sheets lead capture through `/api/leads`
- Prefilled WhatsApp message generation after successful submission
- Consistent contact flow across Home, Services, About, Contact, and Privacy
  Policy pages

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS v4
- `next-intl`
- React Hook Form
- Zod
- Google Sheets API

## Architecture Highlights

- `src/app/[locale]` contains the localized pages and layout
- `messages/ar.json` and `messages/en.json` contain translated copy and metadata
- `src/app/api/leads/route.ts` handles server-side lead intake
- `src/lib/validation.ts` contains shared business validation rules
- `src/lib/google-sheets.ts` keeps credentials and Sheets writes on the server
  only
- `project.md` serves as the business and implementation source of truth

## Notes

- Arabic is the default language
- Pricing is intentionally excluded from the site experience
- The implementation is built around real business workflow rather than generic
  marketing-site patterns
