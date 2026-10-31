"use client"

import { Facebook, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="bg-[#822944] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl">{t("brand")}</p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">{t("coopName")}</p>
          <p className="mt-5 max-w-sm text-xs leading-6 text-white/55">
            {t("address")}<br />
            Hotline: {t("hotline")}<br />
            <a href={`mailto:${t("email")}`} className="transition hover:text-white">{t("email")}</a>
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8cda8]">{t("systemLinksTitle")}</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
            <Link className="transition hover:text-white" href="/">Trang chủ</Link>
            <Link className="transition hover:text-white" href="/ve-chung-toi">Về chúng tôi</Link>
            <Link className="transition hover:text-white" href="/san-pham">Sản phẩm</Link>
            <Link className="transition hover:text-white" href="/long-gia-nha-toi">Vùng trồng & Nhà xưởng</Link>
            <Link className="transition hover:text-white" href="/#tin-tuc">Tin tức & Báo chí</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8cda8]">{t("connectChannelsTitle")}</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-white/70">
            <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://www.facebook.com/profile.php?id=61593802211142&utm_source=gemini" target="_blank" rel="noreferrer"><Facebook size={17} />{t("fanpage")}</a>
            <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://www.tiktok.com/@thanh.long.long.g" target="_blank" rel="noreferrer">{t("tiktok")}</a>
            <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://zalo.me/0919831055" target="_blank" rel="noreferrer"><MessageCircle size={17} />{t("zalo")}</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/15 pt-5 text-xs text-white/45">{t("copyright")}</div>
    </footer>
  )
}
