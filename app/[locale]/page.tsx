import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LongGiaPage } from "@/components/long-gia-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("homeTitle"),
    description: t("homeDesc"),
  };
}

export default function Home() {
  return <LongGiaPage />;
}
