import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LongGiaAuthPage } from "@/components/long-gia-auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("registerTitle"),
    description: t("registerDesc"),
  };
}

export default function LongGiaRegisterPage() {
  return <LongGiaAuthPage mode="register" />;
}
