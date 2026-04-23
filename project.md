# Etkaan Website Source of Truth

This file is the implementation source of truth for the Etkaan website. Check this file before changing copy, flow, routing, API behavior, or deployment configuration.

## Business

- Brand: Etkaan / إتقان
- Domain: etkaan.com
- Market: Egypt
- Primary phone / WhatsApp: 01022566857
- WhatsApp click-to-chat number: 201022566857
- Address: 368 العصافره بحري، شارع ملك حفني، مكتب رقم 1، الدور الأول، الإسكندرية
- Contact email placeholder: info@etkaan.com unless `NEXT_PUBLIC_CONTACT_EMAIL` is configured
- Social links: Facebook and LinkedIn are provided through public environment variables
- Service and sales contact CTAs must lead to WhatsApp or the shared lead form. External profile links and email links may open their own external services.

## Product Goal

The website is a simple mobile-first lead generation site. Its only conversion goal is:

1. Visitor clicks a CTA.
2. A fast shared modal opens.
3. Visitor submits name, phone, governorate, and service.
4. Lead is saved to Google Sheets through a server-only API.
5. Visitor is pushed to WhatsApp with a prefilled message.

Do not show any service prices anywhere on the site. Pricing is handled manually after contact.

## Required User Flow

- All marketing CTAs open the shared lead modal.
- The floating WhatsApp button is always visible and opens WhatsApp directly.
- Phone/WhatsApp contact displays open WhatsApp. Email may use a normal `mailto:` link. Facebook and LinkedIn may open their external profiles.
- The floating WhatsApp button uses this Arabic prefilled message:
  - بعد التحية،
  - برجاء التكرم بالتواصل معي بخصوص الاستفادة من خدماتكم في (تأسيس شركة / استشارة محاسبية / خدمات ضريبية).
  - وشكرًا مقدمًا.
- The form always starts with these visitor-facing fields:
  - Name
  - Phone number
  - Governorate
  - Service needed
- Taxes, Accounting/Financial Advisory, and Sales Growth each add scoped service-specific category/detail dropdowns after the main service is selected.
- After a successful save, show the localized success state and open WhatsApp with a prefilled message.
- If Google Sheets saving fails, show a friendly localized error and keep a manual WhatsApp fallback button visible.

## Required CTA Cost Note

Show this near CTA areas:

- Arabic: التكلفة تختلف حسب نوع وحجم النشاط
- English: Cost varies depending on the type and size of the business.

## Languages and Routing

- Arabic is the default language.
- Locale detection is disabled so root visits always default to Arabic instead of browser language.
- English is a complete switch, not a partial translation.
- Locale routes are `/ar` and `/en`.
- Root requests should resolve to Arabic by default through next-intl routing.
- Arabic renders RTL; English renders LTR.
- All visible copy, validation messages, metadata, buttons, footer text, and success states are translated in `messages/ar.json` and `messages/en.json`.
- Lead form governorates are limited to Alexandria, Cairo, Giza, and Beheira.
- Lead form top-level services are Taxes, Company Formation, Accounting/Financial Reporting/Financial Advisory, and Sales & Business Growth Solutions.
- Service-specific detail options must appear only after their matching top-level service is selected.

## Pages

Only these pages are allowed:

- Home
- Services
- About
- Contact
- Privacy Policy

No blog, CMS, authentication, or extra pages.

## Current Home Page Order

1. Intro sentence and subtitle:
   - Arabic intro: خدمات محاسبية وضريبية في مصر
   - English intro: Accounting and tax services in Egypt
   - Arabic subtitle: نساعدك في الالتزام الضريبي، تأسيس شركتك، وإدارة حساباتك المالية بدون تعقيد.
   - English subtitle: We help you stay tax compliant, establish your company, and manage your finances without complexity.
2. Service cards immediately after the intro. Do not show the old "Core services / الخدمات الأساسية" heading on the home page.
3. Why Etkaan.
4. Final CTA.
5. Problem / solution, organized as the final content section.

Do not show the old trust badge blocks ("Response within one hour" / "Your data is safe") on the home page.
Do not show the sales-specific "Why Us", results, process, or trial/consultation sections on the home page.

## Current Services

- Taxes / الضرائب
  - Include a native dropdown/details area with:
    - إعداد وتقديم الإقرارات الضريبية
    - ضريبة القيمة المضافة
    - الفحص الضريبي والتمثيل أمام الجهات
    - التخطيط الضريبي
    - فض المنازعات واللجان
- Company Formation / تأسيس الشركات
- Accounting, financial reporting, and financial advisory / المحاسبة والتقارير والاستشارات المالية
  - In the inquiry modal, show two extra dropdowns after this main service is selected:
    - Category:
      - Audit and assurance / المراجعة والتدقيق
      - Accounting and bookkeeping / المحاسبة وإمساك الدفاتر
      - Financial and management advisory / الاستشارات المالية والإدارية
    - Detail:
      - For Audit and assurance:
        - مراجعة القوائم المالية
        - إصدار تقارير مراقب الحسابات
        - المراجعة الداخلية وتقييم الرقابة
        - تحليل المخاطر المالية
        - فحص الغش والتحقيقات
      - For Accounting and bookkeeping:
        - تسجيل القيود اليومية
        - إعداد القوائم المالية
        - إعداد ميزان المراجعة
        - التقارير المالية الدورية
        - إدارة الحسابات المدينة والدائنة
      - For Financial and management advisory:
        - دراسات الجدوى
        - التحليل المالي
        - إعادة الهيكلة المالية
        - تسعير الخدمات والمنتجات
        - تحسين الأداء وتقليل التكاليف
- Sales & Business Growth Solutions / خدمات رجال الاعمال
  - This appears as the fourth service card at the top of the home page.
  - Its inquiry button opens the shared lead modal with this main service selected.
  - The modal then shows service-specific dropdowns for only the six sales-growth options:
    - Strategic Outreach / التواصل الاستراتيجي مع العملاء
    - Qualified Appointment Setting / حجز المواعيد المؤهلة
    - CRM Management / إدارة علاقات العملاء (CRM)
    - Lead Qualification / تأهيل العملاء (Lead Qualification)
    - Customer Support / دعم العملاء
    - Smart Follow-ups / المتابعة الذكية

Rules for the shared lead modal:

- The main service dropdown always contains the four top-level services only.
- Taxes, Accounting/Financial Advisory, and Sales Growth each show scoped category/detail dropdowns.
- Company Formation does not show extra dropdowns.
- Do not mix detail options between services.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- next-intl
- React Hook Form
- Zod
- Next.js Route Handler at `/api/leads`
- Google Sheets API server-side lead storage
- Vercel deployment target

## Security Rules

- Google credentials are server-only and must never be exposed to the client.
- Only variables prefixed with `NEXT_PUBLIC_` may be used client-side.
- Validate all incoming lead requests on the server with Zod.
- Normalize Egyptian mobile numbers before storage.
- Return generic user-facing API errors; log detailed server errors only on the server.
- Do not silently fail if Sheets append fails.
- Do not add a database.
- Do not add unnecessary third-party scripts, trackers, heavy UI kits, sliders, video backgrounds, or Framer Motion.

## Lead Storage

Append one row per lead to Google Sheets with this header order:

```text
timestamp, locale, sourcePage, name, phone, governorate, service, whatsappMessage, utm_source, utm_medium, utm_campaign
```

## Environment Variables

Required:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SHEETS_SHEET_NAME`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=201022566857`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GOOGLE_MAPS_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`

## Visual Direction

- Minimal, clean, professional, trustworthy.
- Mobile-first layout.
- Calm palette that works for a broad customer base:
  - Warm neutral background
  - Charcoal text
  - Deep teal CTA
  - Muted warm accent
- Clear hierarchy and strong CTA focus.
- Cards use 8px radius or less.
- Use simple inline SVG icons.
- No fake stock images. Use Next.js Image only if a real office/team image is provided later.

## Official Documentation Basis

Implementation follows official documentation for:

- Next.js App Router, Route Handlers, Metadata API, next/font, favicon handling, and Vercel deployment
- next-intl App Router locale routing with `proxy.ts`
- Tailwind CSS v4 PostCSS setup
- React Hook Form form state
- Zod validation
- Google Sheets API `spreadsheets.values.append` with service account credentials
- WhatsApp `wa.me` click-to-chat links
