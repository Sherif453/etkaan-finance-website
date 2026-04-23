import type { Locale } from "@/i18n/routing";

export const governorates = [
  { id: "alexandria", ar: "الإسكندرية", en: "Alexandria" },
  { id: "cairo", ar: "القاهرة", en: "Cairo" },
  { id: "giza", ar: "الجيزة", en: "Giza" },
  { id: "beheira", ar: "البحيرة", en: "Beheira" }
] as const;

export const services = [
  { id: "taxes", ar: "الضرائب", en: "Taxes" },
  { id: "company_formation", ar: "تأسيس الشركات", en: "Company Formation" },
  {
    id: "other_services",
    ar: "المحاسبة والتقارير والاستشارات المالية",
    en: "Accounting, financial reporting, and financial advisory"
  },
  {
    id: "sales_growth",
    ar: "خدمات رجال الاعمال",
    en: "Sales & Business Growth Solutions"
  }
] as const;

export type GovernorateId = (typeof governorates)[number]["id"];
export type ServiceId = (typeof services)[number]["id"];

export const governorateIds = governorates.map((item) => item.id) as [
  GovernorateId,
  ...GovernorateId[]
];

export const serviceIds = services.map((item) => item.id) as [
  ServiceId,
  ...ServiceId[]
];

export function getGovernorateLabel(id: GovernorateId, locale: Locale) {
  return governorates.find((item) => item.id === id)?.[locale] || id;
}

export function getServiceLabel(id: ServiceId, locale: Locale) {
  return services.find((item) => item.id === id)?.[locale] || id;
}

export const serviceDetailGroups = {
  taxes: [
    {
      id: "tax_services",
      ar: "الخدمات الضريبية",
      en: "Tax services",
      options: [
        {
          id: "tax_returns",
          ar: "إعداد وتقديم الإقرارات الضريبية",
          en: "Preparing and filing tax returns"
        },
        { id: "vat", ar: "ضريبة القيمة المضافة", en: "Value-added tax" },
        {
          id: "tax_audits",
          ar: "الفحص الضريبي والتمثيل أمام الجهات",
          en: "Tax audits and representation before authorities"
        },
        { id: "tax_planning", ar: "التخطيط الضريبي", en: "Tax planning" },
        {
          id: "tax_disputes",
          ar: "فض المنازعات واللجان",
          en: "Dispute resolution and tax committees"
        }
      ]
    }
  ],
  other_services: [
    {
      id: "audit",
      ar: "المراجعة والتدقيق",
      en: "Audit and assurance",
      options: [
        {
          id: "financial_statements_review",
          ar: "مراجعة القوائم المالية",
          en: "Financial statement review"
        },
        {
          id: "auditor_reports",
          ar: "إصدار تقارير مراقب الحسابات",
          en: "Auditor reports"
        },
        {
          id: "internal_audit",
          ar: "المراجعة الداخلية وتقييم الرقابة",
          en: "Internal audit and control assessment"
        },
        {
          id: "financial_risk_analysis",
          ar: "تحليل المخاطر المالية",
          en: "Financial risk analysis"
        },
        {
          id: "fraud_examination",
          ar: "فحص الغش والتحقيقات",
          en: "Fraud examination and investigations"
        }
      ]
    },
    {
      id: "bookkeeping",
      ar: "المحاسبة وإمساك الدفاتر",
      en: "Accounting and bookkeeping",
      options: [
        {
          id: "daily_entries",
          ar: "تسجيل القيود اليومية",
          en: "Daily journal entries"
        },
        {
          id: "financial_statements",
          ar: "إعداد القوائم المالية",
          en: "Financial statement preparation"
        },
        {
          id: "trial_balance",
          ar: "إعداد ميزان المراجعة",
          en: "Trial balance preparation"
        },
        {
          id: "periodic_reporting",
          ar: "التقارير المالية الدورية",
          en: "Periodic financial reporting"
        },
        {
          id: "receivables_payables",
          ar: "إدارة الحسابات المدينة والدائنة",
          en: "Accounts receivable and payable management"
        }
      ]
    },
    {
      id: "financial_advisory",
      ar: "الاستشارات المالية والإدارية",
      en: "Financial and management advisory",
      options: [
        { id: "feasibility_studies", ar: "دراسات الجدوى", en: "Feasibility studies" },
        { id: "financial_analysis", ar: "التحليل المالي", en: "Financial analysis" },
        {
          id: "financial_restructuring",
          ar: "إعادة الهيكلة المالية",
          en: "Financial restructuring"
        },
        {
          id: "pricing",
          ar: "تسعير الخدمات والمنتجات",
          en: "Service and product pricing"
        },
        {
          id: "performance_improvement",
          ar: "تحسين الأداء وتقليل التكاليف",
          en: "Performance improvement and cost reduction"
        }
      ]
    }
  ],
  sales_growth: [
    {
      id: "sales_growth_solutions",
      ar: "خدمات رجال الاعمال",
      en: "Sales and business growth solutions",
      options: [
        {
          id: "strategic_outreach",
          ar: "التواصل الاستراتيجي مع العملاء",
          en: "Strategic Outreach"
        },
        {
          id: "appointment_setting",
          ar: "حجز المواعيد المؤهلة",
          en: "Qualified Appointment Setting"
        },
        {
          id: "crm_management",
          ar: "إدارة علاقات العملاء (CRM)",
          en: "CRM Management"
        },
        {
          id: "lead_qualification",
          ar: "تأهيل العملاء (Lead Qualification)",
          en: "Lead Qualification"
        },
        { id: "customer_support", ar: "دعم العملاء", en: "Customer Support" },
        { id: "smart_followups", ar: "المتابعة الذكية", en: "Smart Follow-ups" }
      ]
    }
  ]
} as const;

type ServiceWithDetails = keyof typeof serviceDetailGroups;

export function getServiceDetailGroups(serviceId: string) {
  if (serviceId in serviceDetailGroups) {
    return serviceDetailGroups[serviceId as ServiceWithDetails];
  }

  return [];
}

export function serviceRequiresDetails(serviceId: string) {
  return getServiceDetailGroups(serviceId).length > 0;
}

export function getServiceCategoryLabel(
  serviceId: string,
  categoryId: string,
  locale: Locale
) {
  return (
    getServiceDetailGroups(serviceId).find((group) => group.id === categoryId)?.[
      locale
    ] || categoryId
  );
}

export function getServiceDetailLabel(
  serviceId: string,
  categoryId: string,
  detailId: string,
  locale: Locale
) {
  return (
    getServiceDetailGroups(serviceId)
      .find((group) => group.id === categoryId)
      ?.options.find((option) => option.id === detailId)?.[locale] || detailId
  );
}

export function isValidServiceCategory(serviceId: string, categoryId: string) {
  return getServiceDetailGroups(serviceId).some((group) => group.id === categoryId);
}

export function isValidServiceDetail(
  serviceId: string,
  categoryId: string,
  detailId: string
) {
  return getServiceDetailGroups(serviceId)
    .find((group) => group.id === categoryId)
    ?.options.some((option) => option.id === detailId) || false;
}
