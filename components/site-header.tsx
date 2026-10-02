"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react"

const aboutLinks = [
  { label: "Câu chuyện thương hiệu", href: "/ve-chung-toi#cau-chuyen" },
  { label: "Tầm nhìn & Sứ mệnh", href: "/ve-chung-toi#tam-nhin" },
  { label: "Năng lực & Chứng nhận", href: "/#nang-luc" },
]

const productLinks = [
  { label: "Thanh long ruột đỏ", href: "/san-pham#product-1" },
  { label: "Thanh long ruột trắng", href: "/san-pham#product-0" },
  { label: "Thanh long vỏ vàng", href: "/san-pham#product-2" },
  { label: "Dừa kim cương", href: "/san-pham#product-3" },
  { label: "Dừa nhấn nút", href: "/san-pham#product-4" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  return <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 lg:px-8">
    <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between rounded-[20px] border border-white/70 bg-[#fffaf3]/80 px-5 shadow-xl shadow-[#3f3150]/10 backdrop-blur-xl lg:px-7">
      <a href="/" className="flex items-center gap-2" aria-label="Long Gia và Hưng Thịnh Phát trang chủ"><img src="/images/long-gia-logo.png" alt="Long Gia" className="h-14 w-14 rounded-full object-cover mix-blend-multiply" /><span className="h-12 w-[54px] overflow-hidden"><img src="/images/hung-thinh-phat-logo.png" alt="Hưng Thịnh Phát" className="h-[57px] w-[54px] max-w-none mix-blend-multiply" /></span><span className="hidden text-[17px] font-black tracking-[-0.07em] text-[#08a968] sm:block">HưngThịnhPhát</span></a>
      <nav aria-label="Điều hướng chính" className="hidden items-center gap-4 text-[13px] font-medium text-[#626751] lg:flex">
        <a className={active("/") ? "text-[#822944]" : "transition hover:text-[#822944]"} href="/">Trang chủ</a>
        <NavDropdown label="Về chúng tôi" href="/ve-chung-toi" items={aboutLinks} active={active("/ve-chung-toi")} />
        <NavDropdown label="Sản phẩm" href="/san-pham" items={productLinks} active={active("/san-pham")} />
        <a className={active("/long-gia-nha-toi") ? "text-[#822944]" : "transition hover:text-[#822944]"} href="/long-gia-nha-toi">Vùng trồng & Nhà xưởng</a>
        <a className="transition hover:text-[#822944]" href="/#tin-tuc">Tin tức & Báo chí</a>
        <a href="/quy-trinh-lien-he#lien-he" className="rounded-full bg-[#ba466d] px-5 py-3 font-semibold text-white transition hover:bg-[#822944]">Liên hệ <ArrowUpRight className="ml-1 inline" size={14} /></a>
      </nav>
      <button className="rounded-full p-2 transition hover:bg-[#f0e8dd] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba466d] lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav aria-label="Điều hướng di động" className="mx-4 rounded-b-[20px] border border-t-0 border-white/70 bg-[#fffaf3] px-6 py-5 shadow-xl lg:hidden"><div className="flex flex-col gap-4 text-sm"><MobileLink href="/" close={() => setOpen(false)}>Trang chủ</MobileLink><MobileGroup label="Về chúng tôi" href="/ve-chung-toi" items={aboutLinks} close={() => setOpen(false)} /><MobileGroup label="Sản phẩm" href="/san-pham" items={productLinks} close={() => setOpen(false)} /><MobileLink href="/long-gia-nha-toi" close={() => setOpen(false)}>Vùng trồng & Nhà xưởng</MobileLink><MobileLink href="/#tin-tuc" close={() => setOpen(false)}>Tin tức & Báo chí</MobileLink><a className="font-semibold text-[#ba466d] transition hover:text-[#822944] focus-visible:outline-none focus-visible:underline" href="/quy-trinh-lien-he#lien-he" onClick={() => setOpen(false)}>Liên hệ</a></div></nav>}
  </header>
}

function NavDropdown({ label, href, items, active }: { label: string; href: string; items: { label: string; href: string }[]; active: boolean }) { return <div className="group relative"><a href={href} className={`inline-flex items-center gap-1 py-5 transition hover:text-[#822944] ${active ? "text-[#822944]" : ""}`}>{label}<ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" /></a><div className="pointer-events-none invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"><div className="overflow-hidden rounded-2xl border border-[#e3d7ca] bg-[#fffaf3]/95 p-2 shadow-2xl backdrop-blur-xl">{items.map((item) => <a key={item.href} href={item.href} className="block rounded-xl px-4 py-3 text-sm transition hover:bg-[#f0e8dd] hover:text-[#822944]">{item.label}</a>)}</div></div></div> }
function MobileLink({ href, close, children }: { href: string; close: () => void; children: React.ReactNode }) { return <a className="transition hover:text-[#822944] focus-visible:outline-none focus-visible:underline" href={href} onClick={close}>{children}</a> }
function MobileGroup({ label, href, items, close }: { label: string; href: string; items: { label: string; href: string }[]; close: () => void }) { return <div><a className="font-semibold text-[#822944] transition hover:text-[#ba466d] focus-visible:outline-none focus-visible:underline" href={href} onClick={close}>{label}</a><div className="mt-3 grid gap-2 border-l border-[#d8cdbc] pl-4 text-xs text-[#626751]">{items.map((item) => <a key={item.href} className="transition hover:text-[#822944] focus-visible:outline-none focus-visible:underline" href={item.href} onClick={close}>{item.label}</a>)}</div></div> }
