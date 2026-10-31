import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LongGiaNhaToiPage } from "@/components/long-gia-nha-toi-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("longGiaTitle"),
    description: t("longGiaDesc"),
  };
}

export default function Page() {
  return <LongGiaNhaToiPage />;
}
