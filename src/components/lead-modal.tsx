"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import {
  getServiceCategoryLabel,
  getServiceDetailGroups,
  getServiceDetailLabel,
  governorates,
  services,
  type GovernorateId,
  type ServiceId
} from "@/lib/options";
import {
  createLeadSchema,
  type LeadData,
  type LeadInput
} from "@/lib/validation";
import { createWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/routing";

type LeadModalPrefill = {
  service?: ServiceId;
  serviceCategory?: string;
  serviceDetail?: string;
};

type LeadModalContextValue = {
  openLeadModal: (prefill?: LeadModalPrefill) => void;
};

type SubmitState =
  | { status: "idle" }
  | { status: "success"; whatsappUrl: string }
  | { status: "error"; whatsappUrl: string };

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const context = useContext(LeadModalContext);

  if (!context) {
    throw new Error("useLeadModal must be used inside LeadModalProvider");
  }

  return context;
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialPrefill, setInitialPrefill] = useState<LeadModalPrefill | undefined>();
  const [modalKey, setModalKey] = useState(0);

  const openLeadModal = useCallback((prefill?: LeadModalPrefill) => {
    setInitialPrefill(prefill);
    setModalKey((currentKey) => currentKey + 1);
    setIsOpen(true);
  }, []);

  return (
    <LeadModalContext.Provider value={{ openLeadModal }}>
      {children}
      <Suspense fallback={null}>
        <LeadModal
          key={modalKey}
          initialPrefill={initialPrefill}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </Suspense>
    </LeadModalContext.Provider>
  );
}

function LeadModal({
  initialPrefill,
  isOpen,
  onClose
}: {
  initialPrefill?: LeadModalPrefill;
  isOpen: boolean;
  onClose: () => void;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("leadForm");
  const common = useTranslations("common");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const schema = useMemo(
    () =>
      createLeadSchema({
        nameRequired: t("validation.nameRequired"),
        phoneRequired: t("validation.phoneRequired"),
        phoneInvalid: t("validation.phoneInvalid"),
        governorateRequired: t("validation.governorateRequired"),
        serviceRequired: t("validation.serviceRequired"),
        serviceCategoryRequired: t("validation.serviceCategoryRequired"),
        serviceDetailRequired: t("validation.serviceDetailRequired")
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm<LeadInput, unknown, LeadData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
      defaultValues: {
        locale,
        sourcePage: "",
        name: "",
        phone: "",
        governorate: "",
        service: initialPrefill?.service || "",
        serviceCategory: initialPrefill?.serviceCategory || "",
        serviceDetail: initialPrefill?.serviceDetail || "",
        utm_source: "",
        utm_medium: "",
        utm_campaign: ""
      }
  });

  const watchedGovernorate = useWatch({
    control,
    name: "governorate"
  }) as GovernorateId;
  const watchedService = (useWatch({ control, name: "service" }) ||
    "") as ServiceId | "";
  const watchedServiceCategory =
    useWatch({ control, name: "serviceCategory" }) || "";
  const watchedServiceDetail = useWatch({ control, name: "serviceDetail" }) || "";
  const watchedName =
    useWatch({
      control,
      name: "name"
    }) || "";
  const serviceDetailGroups = getServiceDetailGroups(watchedService);
  const firstServiceDetailGroupId = serviceDetailGroups[0]?.id || "";
  const selectedServiceGroup = serviceDetailGroups.find(
    (group) => group.id === watchedServiceCategory
  );
  const selectedServiceLabel =
    services.find((item) => item.id === watchedService)?.[locale] || "";
  const fallbackService = selectedServiceLabel
    ? [
        selectedServiceLabel,
        watchedServiceCategory
          ? getServiceCategoryLabel(watchedService, watchedServiceCategory, locale)
          : "",
        watchedServiceDetail
          ? getServiceDetailLabel(
              watchedService,
              watchedServiceCategory,
              watchedServiceDetail,
              locale
            )
          : ""
      ]
        .filter(Boolean)
        .join(" - ")
    : "";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setValue("locale", locale);
    setValue("sourcePage", pathname || "");
    setValue("utm_source", searchParams.get("utm_source") || "");
    setValue("utm_medium", searchParams.get("utm_medium") || "");
    setValue("utm_campaign", searchParams.get("utm_campaign") || "");

    window.setTimeout(() => firstInputRef.current?.focus(), 0);
  }, [isOpen, locale, pathname, searchParams, setValue]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const hasValidCategory = serviceDetailGroups.some(
      (group) => group.id === watchedServiceCategory
    );

    if (hasValidCategory) {
      return;
    }

    setValue("serviceCategory", firstServiceDetailGroupId);
    setValue("serviceDetail", "");
  }, [
    firstServiceDetailGroupId,
    isOpen,
    serviceDetailGroups,
    setValue,
    watchedServiceCategory
  ]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const hasValidDetail = selectedServiceGroup?.options.some(
      (option) => option.id === watchedServiceDetail
    );

    if (hasValidDetail) {
      return;
    }

    setValue("serviceDetail", "");
  }, [isOpen, selectedServiceGroup, setValue, watchedServiceDetail]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const fallbackMessage = createWhatsAppMessage({
    locale,
    name: watchedName,
    governorate:
      governorates.find((item) => item.id === watchedGovernorate)?.[locale] ||
      "",
    service: fallbackService
  });
  const fallbackUrl = createWhatsAppUrl(fallbackMessage);

  async function onSubmit(data: LeadData) {
    setSubmitState({ status: "idle" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const payload = (await response.json()) as {
        ok: boolean;
        whatsappUrl?: string;
      };

      if (!response.ok || !payload.ok || !payload.whatsappUrl) {
        setSubmitState({
          status: "error",
          whatsappUrl: payload.whatsappUrl || fallbackUrl
        });
        return;
      }

      setSubmitState({ status: "success", whatsappUrl: payload.whatsappUrl });
      reset({
        locale,
        sourcePage: pathname || "",
        name: "",
        phone: "",
        governorate: "",
        service: "",
        serviceCategory: "",
        serviceDetail: "",
        utm_source: searchParams.get("utm_source") || "",
        utm_medium: searchParams.get("utm_medium") || "",
        utm_campaign: searchParams.get("utm_campaign") || ""
      });

      window.setTimeout(() => {
        const opened = window.open(payload.whatsappUrl, "_blank", "noopener,noreferrer");

        if (!opened) {
          window.location.href = payload.whatsappUrl as string;
        }
      }, 650);
    } catch {
      setSubmitState({ status: "error", whatsappUrl: fallbackUrl });
    }
  }

  const nameRegistration = register("name");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/45 px-3 py-3 sm:items-center sm:px-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="max-h-[92vh] w-full overflow-y-auto rounded-[8px] bg-[var(--surface)] p-5 shadow-2xl sm:mx-auto sm:max-w-[520px] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="lead-modal-title" className="text-2xl font-bold">
              {t("title")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {t("description")}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[var(--border)] text-xl"
            onClick={onClose}
            aria-label={common("close")}
          >
            ×
          </button>
        </div>

        {submitState.status === "success" ? (
          <div className="mt-6 rounded-[8px] border border-green-200 bg-green-50 p-4 text-[var(--success)]">
            <p className="leading-7">{t("success")}</p>
            <a
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--primary-dark)]"
              href={submitState.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("whatsappNow")}
            </a>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-sm text-[var(--muted)]">{t("requiredNotice")}</p>

            <Field
              label={t("name")}
              error={errors.name?.message}
              htmlFor="lead-name"
            >
              <input
                id="lead-name"
                autoComplete="name"
                className="h-12 w-full rounded-[8px] border border-[var(--border)] bg-white px-3 text-[var(--text)]"
                {...nameRegistration}
                ref={(element) => {
                  nameRegistration.ref(element);
                  firstInputRef.current = element;
                }}
              />
            </Field>

            <Field
              label={t("phone")}
              error={errors.phone?.message}
              htmlFor="lead-phone"
            >
              <input
                id="lead-phone"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                className="h-12 w-full rounded-[8px] border border-[var(--border)] bg-white px-3 text-[var(--text)]"
                {...register("phone")}
              />
            </Field>

            <Field
              label={t("governorate")}
              error={errors.governorate?.message}
              htmlFor="lead-governorate"
            >
              <select
                id="lead-governorate"
                className="h-12 w-full rounded-[8px] border border-[var(--border)] bg-white px-3 text-[var(--text)]"
                {...register("governorate")}
              >
                <option value="">{t("selectGovernorate")}</option>
                {governorates.map((governorate) => (
                  <option key={governorate.id} value={governorate.id}>
                    {governorate[locale]}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label={t("service")}
              error={errors.service?.message}
              htmlFor="lead-service"
            >
              <select
                id="lead-service"
                className="h-12 w-full rounded-[8px] border border-[var(--border)] bg-white px-3 text-[var(--text)]"
                {...register("service")}
              >
                <option value="">{t("selectService")}</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service[locale]}
                  </option>
                ))}
              </select>
            </Field>

            {serviceDetailGroups.length ? (
              <Field
                label={t("serviceCategory")}
                error={errors.serviceCategory?.message}
                htmlFor="lead-service-category"
              >
                <select
                  id="lead-service-category"
                  className="h-12 w-full rounded-[8px] border border-[var(--border)] bg-white px-3 text-[var(--text)]"
                  {...register("serviceCategory")}
                >
                  <option value="">{t("selectServiceCategory")}</option>
                  {serviceDetailGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group[locale]}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}

            {selectedServiceGroup ? (
              <Field
                label={t("serviceDetail")}
                error={errors.serviceDetail?.message}
                htmlFor="lead-service-detail"
              >
                <select
                  id="lead-service-detail"
                  className="h-12 w-full rounded-[8px] border border-[var(--border)] bg-white px-3 text-[var(--text)]"
                  {...register("serviceDetail")}
                >
                  <option value="">{t("selectServiceDetail")}</option>
                  {selectedServiceGroup.options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option[locale]}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}

            {submitState.status === "error" ? (
              <div className="rounded-[8px] border border-red-200 bg-red-50 p-4 text-sm text-[var(--error)]">
                <p>{t("error")}</p>
                <a
                  className="mt-3 inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--primary)] px-4 py-2 font-bold text-white"
                  href={submitState.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("whatsappNow")}
                </a>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[8px] bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--primary-dark)] disabled:opacity-60"
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-bold">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm text-[var(--error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
