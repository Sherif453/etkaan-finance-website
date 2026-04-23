import { z } from "zod";
import { routing, type Locale } from "@/i18n/routing";
import {
  governorateIds,
  isValidServiceCategory,
  isValidServiceDetail,
  serviceIds,
  serviceRequiresDetails,
  type GovernorateId,
  type ServiceId
} from "@/lib/options";
import { normalizeEgyptianMobile } from "@/lib/phone";

const localeIds = ["ar", "en"] as const;

export type LeadValidationMessages = {
  nameRequired: string;
  phoneRequired: string;
  phoneInvalid: string;
  governorateRequired: string;
  serviceRequired: string;
  serviceCategoryRequired: string;
  serviceDetailRequired: string;
};

const optionalUtm = z
  .string()
  .trim()
  .max(120)
  .optional()
  .transform((value) => value || "");

export function createLeadSchema(messages: LeadValidationMessages) {
  return z
    .object({
      locale: z.enum(localeIds).default(routing.defaultLocale),
      sourcePage: z.string().trim().max(200).default(""),
      name: z
        .string()
        .trim()
        .min(1, messages.nameRequired)
        .max(120),
      phone: z
        .string()
        .trim()
        .min(1, messages.phoneRequired)
        .transform((value, ctx) => {
          const normalized = normalizeEgyptianMobile(value);

          if (!normalized) {
            ctx.addIssue({
              code: "custom",
              message: messages.phoneInvalid
            });
            return z.NEVER;
          }

          return normalized;
        }),
      governorate: z
        .string()
        .trim()
        .min(1, messages.governorateRequired)
        .refine(
          (value): value is GovernorateId =>
            governorateIds.includes(value as GovernorateId),
          messages.governorateRequired
        ),
      service: z
        .string()
        .trim()
        .min(1, messages.serviceRequired)
        .refine(
          (value): value is ServiceId => serviceIds.includes(value as ServiceId),
          messages.serviceRequired
        ),
      serviceCategory: z.string().trim().max(120).default(""),
      serviceDetail: z.string().trim().max(160).default(""),
      utm_source: optionalUtm,
      utm_medium: optionalUtm,
      utm_campaign: optionalUtm
    })
    .superRefine((value, ctx) => {
      if (!serviceRequiresDetails(value.service)) {
        return;
      }

      if (!isValidServiceCategory(value.service, value.serviceCategory)) {
        ctx.addIssue({
          code: "custom",
          message: messages.serviceCategoryRequired,
          path: ["serviceCategory"]
        });
        return;
      }

      if (
        !isValidServiceDetail(
          value.service,
          value.serviceCategory,
          value.serviceDetail
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: messages.serviceDetailRequired,
          path: ["serviceDetail"]
        });
      }
    });
}

export const validationMessages: Record<Locale, LeadValidationMessages> = {
  ar: {
    nameRequired: "يرجى إدخال الاسم",
    phoneRequired: "يرجى إدخال رقم الهاتف",
    phoneInvalid: "يرجى إدخال رقم موبايل مصري صحيح",
    governorateRequired: "يرجى اختيار المحافظة",
    serviceRequired: "يرجى اختيار الخدمة المطلوبة",
    serviceCategoryRequired: "يرجى اختيار نوع الخدمة",
    serviceDetailRequired: "يرجى اختيار التفاصيل المطلوبة"
  },
  en: {
    nameRequired: "Please enter your name",
    phoneRequired: "Please enter your phone number",
    phoneInvalid: "Please enter a valid Egyptian mobile number",
    governorateRequired: "Please select your governorate",
    serviceRequired: "Please select the required service",
    serviceCategoryRequired: "Please select a service category",
    serviceDetailRequired: "Please select the requested detail"
  }
};

export type LeadInput = z.input<ReturnType<typeof createLeadSchema>>;
export type LeadData = z.output<ReturnType<typeof createLeadSchema>>;
