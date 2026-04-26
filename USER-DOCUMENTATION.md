# Etkaan Website Manager Guide

This guide explains how the website works for non-technical managers.

## Website Purpose

The website has one main goal: collect qualified leads and move visitors into WhatsApp contact.

Visitors can browse five pages:

- Home
- Services
- About
- Contact
- Privacy Policy

There are no prices on the website. The service cost is discussed manually after the visitor submits the form or contacts Etkaan on WhatsApp.

## Languages

The website supports:

- Arabic at `/ar`
- English at `/en`

Arabic is the default language. The language switch appears in the header and switches the full website, not only part of the page.

## Lead Form

All main call-to-action buttons open the same form. The form asks for only:

- Name
- Phone number
- Governorate
- Service needed

After submission:

1. The website checks that the data is valid.
2. The lead is saved to Google Sheets.
3. The visitor sees a success message.
4. WhatsApp opens with a prepared message that includes their name, governorate, and selected service.

If Google Sheets is temporarily unavailable, the visitor still sees a WhatsApp button so they can contact Etkaan manually.

## Where Leads Go

Leads are stored in the configured Google Sheet. Each row contains:

```text
timestamp, locale, sourcePage, name, phone, governorate, service, whatsappMessage, utm_source, utm_medium, utm_campaign
```

UTM fields help track campaigns if visitors arrive from ads or marketing links.

## WhatsApp Button

A floating WhatsApp button appears on every page. It uses:

```text
201022566857
```

This button opens WhatsApp directly.

## Updating Business Information

Ask the developer or site admin to update these environment variables:

- Email: `NEXT_PUBLIC_CONTACT_EMAIL`
- Google Maps link: `NEXT_PUBLIC_GOOGLE_MAPS_URL`
- Facebook: `NEXT_PUBLIC_FACEBOOK_URL`
- LinkedIn: `NEXT_PUBLIC_LINKEDIN_URL`
- YouTube: `NEXT_PUBLIC_YOUTUBE_URL`
- WhatsApp number: `NEXT_PUBLIC_WHATSAPP_NUMBER`

The current email placeholder is:

```text
info@etkaan.com
```

## Updating Text

Website text is stored in two files:

- Arabic: `messages/ar.json`
- English: `messages/en.json`

Any text update should be made in both languages to keep the switch complete.

## Important Rules

- Do not add prices to any page.
- Do not add extra sales CTAs that bypass the lead form or WhatsApp. Email and Facebook/LinkedIn may open their own external services.
- Do not add extra pages unless the website strategy changes.
- Do not add a blog, CMS, login, or account area.
- Keep the form short.
- Keep WhatsApp as the final contact destination.
- Keep Arabic and English content fully aligned.

## Monthly Check

Review these items once a month:

- Form submissions are reaching Google Sheets.
- WhatsApp opens correctly from the form and floating button.
- The phone number is correct.
- Social links are correct.
- Google Maps link opens the correct office location.
- Both Arabic and English pages load properly.
