"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (target: "vi" | "en") => {
    if (target === locale) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${hash}`, { locale: target });
  };

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center rounded-full border border-[#e3d7ca] bg-[#fffaf3]/90 p-0.5 text-xs font-semibold shadow-xs backdrop-blur"
    >
      <button
        type="button"
        onClick={() => handleSwitch("vi")}
        className={`cursor-pointer rounded-full px-2.5 py-1 transition-all ${
          locale === "vi"
            ? "bg-[#ba466d] text-white shadow-xs"
            : "text-[#626751] hover:text-[#822944]"
        }`}
        aria-pressed={locale === "vi"}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("en")}
        className={`cursor-pointer rounded-full px-2.5 py-1 transition-all ${
          locale === "en"
            ? "bg-[#ba466d] text-white shadow-xs"
            : "text-[#626751] hover:text-[#822944]"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
