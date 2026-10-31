import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProcessContactPage } from "@/components/process-contact-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("processContactTitle"),
    description: t("processContactDesc"),
  };
}

export default function ProcessContactRoute() {
  return <ProcessContactPage />;
}
