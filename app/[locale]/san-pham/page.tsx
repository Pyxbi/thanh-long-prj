import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductPage from "@/components/product-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("productsTitle"),
    description: t("productsDesc"),
  };
}

export default function ProductRoute() {
  return <ProductPage />;
}
