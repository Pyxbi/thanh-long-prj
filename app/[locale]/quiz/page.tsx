import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { QuizClient } from "./quiz-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("quizTitle"),
    description: t("quizDesc"),
    openGraph: {
      title: t("quizTitle"),
      description: t("quizDesc"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default function QuizPage() {
  return <QuizClient />;
}
