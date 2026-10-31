"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"

export function SiteHeader() {
  const t = useTranslations("Nav")
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const contactHref = "/quy-trinh-lien-he#lien-he"

  const aboutLinks = [
    { label: t("brandStory"), href: "/ve-chung-toi#cau-chuyen" },
    { label: t("visionMission"), href: "/ve-chung-toi#tam-nhin" },
    { label: t("capacityCert"), href: "/#nang-luc" },
  ]

  const productLinks = [
    { label: t("redDragonFruit"), href: "/san-pham#product-1" },
    { label: t("whiteDragonFruit"), href: "/san-pham#product-0" },
    { label: t("yellowDragonFruit"), href: "/san-pham#product-2" },
    { label: t("diamondCoconut"), href: "/san-pham#product-3" },
    { label: t("easyOpenCoconut"), href: "/san-pham#product-4" },
  ]

  const scrollToContact = () => {
    document.getElementById("lien-he")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    if (pathname !== "/quy-trinh-lien-he" || window.location.hash !== "#lien-he") return

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToContact)
    })
    const fallback = window.setTimeout(scrollToContact, 180)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(fallback)
    }
  }, [pathname])

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false)

    if (pathname !== "/quy-trinh-lien-he") return

    event.preventDefault()
    window.history.replaceState(null, "", contactHref)
    scrollToContact()
  }

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  return <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 lg:px-8">
    <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between rounded-[20px] border border-white/70 bg-[#fffaf3]/80 px-5 shadow-xl shadow-[#3f3150]/10 backdrop-blur-xl lg:px-7">
      <Link href="/" className="flex items-center gap-2" aria-label="Long Gia và Hưng Thịnh Phát trang chủ"><img src="/images/long-gia-logo.png" alt="Long Gia" className="h-14 w-14 rounded-full object-cover mix-blend-multiply" /><span className="h-12 w-[54px] overflow-hidden"><img src="/images/hung-thinh-phat-logo.png" alt="Hưng Thịnh Phát" className="h-[57px] w-[54px] max-w-none mix-blend-multiply" /></span><span className="hidden text-[17px] font-black tracking-[-0.07em] text-[#08a968] sm:block">HưngThịnhPhát</span></Link>
      <nav aria-label="Điều hướng chính" className="hidden items-center gap-4 text-[13px] font-medium text-[#626751] lg:flex">
        <Link className={active("/") ? "text-[#822944]" : "transition hover:text-[#822944]"} href="/">{t("home")}</Link>
        <NavDropdown label={t("about")} href="/ve-chung-toi" items={aboutLinks} active={active("/ve-chung-toi")} />
        <NavDropdown label={t("products")} href="/san-pham" items={productLinks} active={active("/san-pham")} />
        <Link className={active("/long-gia-nha-toi") ? "text-[#822944]" : "transition hover:text-[#822944]"} href="/long-gia-nha-toi">{t("orchardFactory")}</Link>
        <Link className={active("/quiz") ? "text-[#822944]" : "transition hover:text-[#822944]"} href="/quiz">{t("quiz")}</Link>
        <Link className="transition hover:text-[#822944]" href="/#tin-tuc">{t("news")}</Link>
        <LanguageSwitcher />
        <Link href={contactHref} onClick={handleContactClick} className="rounded-full bg-[#ba466d] px-5 py-3 font-semibold text-white transition hover:bg-[#822944]">{t("contact")} <ArrowUpRight className="ml-1 inline" size={14} /></Link>
      </nav>
      <div className="flex items-center gap-2 lg:hidden">
        <LanguageSwitcher />
        <button className="rounded-full p-2 transition hover:bg-[#f0e8dd] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba466d]" onClick={() => setOpen(!open)} aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    {open && <nav aria-label="Điều hướng di động" className="mx-4 rounded-b-[20px] border border-t-0 border-white/70 bg-[#fffaf3] px-6 py-5 shadow-xl lg:hidden"><div className="flex flex-col gap-4 text-sm"><MobileLink href="/" close={() => setOpen(false)}>{t("home")}</MobileLink><MobileGroup label={t("about")} href="/ve-chung-toi" items={aboutLinks} close={() => setOpen(false)} /><MobileGroup label={t("products")} href="/san-pham" items={productLinks} close={() => setOpen(false)} /><MobileLink href="/long-gia-nha-toi" close={() => setOpen(false)}>{t("orchardFactory")}</MobileLink><MobileLink href="/quiz" close={() => setOpen(false)}>{t("quiz")}</MobileLink><MobileLink href="/#tin-tuc" close={() => setOpen(false)}>{t("news")}</MobileLink><Link className="font-semibold text-[#ba466d] transition hover:text-[#822944] focus-visible:outline-none focus-visible:underline" href={contactHref} onClick={handleContactClick}>{t("contact")}</Link></div></nav>}
  </header>
}

function NavDropdown({ label, href, items, active }: { label: string; href: string; items: { label: string; href: string }[]; active: boolean }) { return <div className="group relative"><Link href={href} className={`inline-flex items-center gap-1 py-5 transition hover:text-[#822944] ${active ? "text-[#822944]" : ""}`}>{label}<ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" /></Link><div className="pointer-events-none invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"><div className="overflow-hidden rounded-2xl border border-[#e3d7ca] bg-[#fffaf3]/95 p-2 shadow-2xl backdrop-blur-xl">{items.map((item) => <Link key={item.href} href={item.href} className="block rounded-xl px-4 py-3 text-sm transition hover:bg-[#f0e8dd] hover:text-[#822944]">{item.label}</Link>)}</div></div></div> }
function MobileLink({ href, close, children }: { href: string; close: () => void; children: React.ReactNode }) { return <Link className="transition hover:text-[#822944] focus-visible:outline-none focus-visible:underline" href={href} onClick={close}>{children}</Link> }
function MobileGroup({ label, href, items, close }: { label: string; href: string; items: { label: string; href: string }[]; close: () => void }) { return <div><Link className="font-semibold text-[#822944] transition hover:text-[#ba466d] focus-visible:outline-none focus-visible:underline" href={href} onClick={close}>{label}</Link><div className="mt-3 grid gap-2 border-l border-[#d8cdbc] pl-4 text-xs text-[#626751]">{items.map((item) => <Link key={item.href} className="transition hover:text-[#822944] focus-visible:outline-none focus-visible:underline" href={item.href} onClick={close}>{item.label}</Link>)}</div></div> }
