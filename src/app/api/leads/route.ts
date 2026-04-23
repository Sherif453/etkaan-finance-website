import { NextResponse } from "next/server";
import { appendLeadRow } from "@/lib/google-sheets";
import {
  getServiceCategoryLabel,
  getServiceDetailLabel,
  getGovernorateLabel,
  getServiceLabel,
  type GovernorateId,
  type ServiceId
} from "@/lib/options";
import { createLeadSchema, validationMessages } from "@/lib/validation";
import { createWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const requestedLocale =
    typeof body === "object" &&
    body !== null &&
    "locale" in body &&
    body.locale === "en"
      ? "en"
      : "ar";

  const schema = createLeadSchema(validationMessages[requestedLocale]);
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_error",
        issues: result.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const lead = result.data;
  const governorate = getGovernorateLabel(
    lead.governorate as GovernorateId,
    lead.locale
  );
  const service = getServiceLabel(lead.service as ServiceId, lead.locale);
  const serviceWithDetails =
    lead.serviceCategory && lead.serviceDetail
      ? [
          service,
          getServiceCategoryLabel(
            lead.service,
            lead.serviceCategory,
            lead.locale
          ),
          getServiceDetailLabel(
            lead.service,
            lead.serviceCategory,
            lead.serviceDetail,
            lead.locale
          )
        ].join(" - ")
      : service;
  const whatsappMessage = createWhatsAppMessage({
    locale: lead.locale,
    name: lead.name,
    governorate,
    service: serviceWithDetails
  });
  const whatsappUrl = createWhatsAppUrl(whatsappMessage);

  try {
    await appendLeadRow([
      new Date().toISOString(),
      lead.locale,
      lead.sourcePage,
      lead.name,
      lead.phone,
      governorate,
      serviceWithDetails,
      whatsappMessage,
      lead.utm_source,
      lead.utm_medium,
      lead.utm_campaign
    ]);
  } catch (error) {
    console.error("Failed to append lead to Google Sheets", error);

    return NextResponse.json(
      {
        ok: false,
        error: "sheets_append_failed",
        whatsappUrl,
        whatsappMessage
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    whatsappUrl,
    whatsappMessage
  });
}
