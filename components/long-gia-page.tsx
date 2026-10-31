"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ArrowUpRight, Leaf, MapPin, PackageCheck, ShieldCheck, Truck } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const productMeta = [
  { image: "/images/thanh-long-ruot-do.png", tone: "bg-[#f2d8df]" },
  { image: "/images/thanh-long-vo-vang.png", tone: "bg-[#f1e2bf]" },
  { image: "/images/thanh-long-ruot-trang.png", tone: "bg-[#dfe5cd]" },
  { image: "/images/dua-kim-cuong-transparent.png", tone: "bg-[#dfe5cd]" },
  { image: "/images/dua-nhan-nut-transparent.png", tone: "bg-[#f1e2bf]" },
  { image: "/images/buoi-da-xanh-transparent.png", tone: "bg-[#e6ebd5]" },
]

const articles = [
  { title: "Thanh long ruột đỏ Hưng Thịnh Phát: Hành trình nâng tầm trái ngọt miền Tây", href: "https://vnbusiness.vn/thanh-long-ruot-do-hung-thinh-phat-hanh-trinh-nang-tam-trai-ngot-mien-tay.html" },
  { title: "Mở rộng thị trường cho trái thanh long", href: "https://baodongthap.vn/mo-rong-thi-truong-cho-trai-thanh-long-a100286.html" },
  { title: "Nhân tố HTX góp phần giúp giảm nhanh tỷ lệ hộ nghèo ở Chợ Gạo", href: "https://vnbusiness.vn/nhan-to-htx-gop-phan-giup-giam-nhanh-ty-le-ho-ngheo-o-cho-gao.html" },
]

export function LongGiaPage() {
  const tHome = useTranslations("Home")
  const tCommon = useTranslations("Common")
  const [scrollProgress, setScrollProgress] = useState(0)

  const carouselItems = (tHome.raw("carouselProducts") as Array<{ name: string; copy: string }>).map((item, idx) => ({
    ...item,
    ...productMeta[idx],
  }))

  useEffect(() => {
    let frame = 0
    let current = 0
    let target = 0

    const update = () => {
      current += (target - current) * 0.12
      setScrollProgress(current)
      if (Math.abs(target - current) > 0.001) frame = requestAnimationFrame(update)
    }

    const handleScroll = () => {
      target = Math.min(window.scrollY / 520, 1)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const heroScale = 1 - scrollProgress * 0.12
  const heroRadius = scrollProgress * 28

  return (
    <div className="min-h-screen overflow-hidden bg-[#f0e8dd] text-[#2d3026]">
      <SiteHeader />

      <main id="trang-chu">
        <section
          data-testid="homepage-hero"
          className="relative isolate flex min-h-[540px] w-full items-start justify-center overflow-hidden px-5 pt-36 sm:min-h-[860px] lg:min-h-[1010px] lg:px-14 lg:pt-48"
          style={{
            transform: `scale(${heroScale})`,
            transformOrigin: "top center",
            borderRadius: `0 0 ${heroRadius}px ${heroRadius}px`,
            transition: "border-radius 80ms linear",
          }}
        >
          <div className="absolute inset-0 -z-20 bg-[#fffaf3]" />
          <img data-testid="homepage-hero-image" src="/images/thanh-vi-xu-tien-banner.png" alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover object-center transition-transform duration-75 sm:object-center" style={{ transform: `scale(${1 + scrollProgress * 0.08})` }} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/5 via-transparent to-[#5b1730]/25" />
          <div className="absolute inset-x-0 bottom-[-18px] z-10 whitespace-nowrap text-center font-serif text-[clamp(7rem,21vw,24rem)] font-semibold leading-[0.72] tracking-[-0.075em] text-[#fffaf3]/90">LONG GIA</div>
          <img src="/images/long-gia-mascot.png" alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-1%] right-[-0.5%] z-20 hidden h-auto w-[clamp(18rem,28vw,30rem)] select-none sm:block" />
        </section>

        <section id="ve-chung-toi" className="bg-[#fffaf3] py-24 lg:py-32"><div className="relative w-full overflow-hidden border-y border-[#ba466d]/15 bg-[#f0e8dd] text-[#2d3026] shadow-2xl shadow-[#822944]/10 lg:min-h-[650px]"><img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1800&q=85" alt="Vùng trồng nông sản sạch Hưng Thịnh Phát" className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-multiply transition duration-700 hover:scale-105" /><div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,250,243,.98)_0%,rgba(240,232,221,.94)_55%,rgba(246,224,232,.88)_100%)]" /><div className="relative mx-auto grid min-h-[650px] max-w-[1500px] grid-flow-dense items-center gap-12 px-7 py-16 lg:grid-cols-12 lg:gap-16 lg:px-20 lg:py-24"><div className="lg:col-span-7"><p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ba466d]"><span className="grid size-8 place-items-center rounded-full border border-current/30">01</span><span>{tHome("overviewTag")}</span></p><h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] text-[#822944] sm:text-5xl lg:text-6xl">{tHome("heroHeadline")}<br /><em className="font-normal text-[#6e8644]">{tHome("heroHeadlineEm")}</em></h2><p className="mt-8 max-w-3xl text-sm leading-7 text-[#4f5145] sm:text-base sm:leading-8">{tHome("overviewDesc")}</p><Link href="/ve-chung-toi#cau-chuyen" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#822944] px-7 py-4 text-xs font-extrabold uppercase tracking-[0.08em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#ba466d] hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ba466d]">{tHome("viewAbout")} <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={16} /></Link></div><div className="grid grid-flow-dense gap-4 sm:grid-cols-2 lg:col-span-5"><InfoCard title={tHome("cardUnitName")} text={tHome("companyName")} icon={<Leaf />} /><InfoCard title={tHome("cardAddress")} text={tHome("companyAddress")} icon={<MapPin />} /><InfoCard title={tHome("cardProducts")} text={tHome("mainProducts")} icon={<PackageCheck />} /><InfoCard title={tHome("cardFounded")} text={tHome("foundedYear")} icon={<span className="font-serif text-xl">21</span>} /></div></div></div></section>

        <section id="san-pham" className="py-24 pl-[max(1.25rem,calc((100vw-80rem)/2))] lg:py-32"><Carousel opts={{ align: "start", dragFree: true, loop: true }} className="w-full max-w-none"><div className="flex flex-col justify-between gap-6 pr-[max(1.25rem,calc((100vw-80rem)/2))] sm:flex-row sm:items-end"><div><p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ba466d]"><span className="grid size-8 place-items-center rounded-full border border-current/30">02</span><span>{tHome("curatedTag")}</span></p><h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-[#822944] sm:text-5xl">{tHome("curatedTitle")}<br /><em className="font-normal text-[#6e8644]">{tHome("curatedTitleEm")}</em></h2></div><div className="flex gap-2"><CarouselPrevious aria-label="Sản phẩm trước" className="static size-11 translate-y-0 border-[#d4c7b8] bg-transparent text-[#822944] transition hover:bg-white" /><CarouselNext aria-label="Sản phẩm tiếp theo" className="static size-11 translate-y-0 border-[#822944] bg-[#822944] text-white transition hover:bg-[#ba466d]" /></div></div><p className="mt-6 max-w-xl pr-5 text-[#626751]">{tHome("curatedDesc")}</p><CarouselContent className="mt-12 cursor-grab active:cursor-grabbing">{carouselItems.map((item, index) => <CarouselItem key={item.name} className="basis-[88%] sm:basis-[48%] lg:basis-[32%]"><article className="group flex h-full min-h-[590px] flex-col overflow-hidden rounded-[28px] bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"><div className={`h-80 shrink-0 overflow-hidden lg:h-[370px] ${item.tone}`}><img src={item.image} alt={item.name} draggable={false} className={`h-full w-full select-none object-cover mix-blend-multiply transition duration-700 group-hover:scale-105 ${index < 3 ? "object-[center_68%]" : ""}`} /></div><div className="flex flex-1 flex-col p-6"><div className="mb-4 flex items-start justify-between gap-4"><h3 className="font-serif text-2xl text-[#822944]">{item.name}</h3><span className="rounded-full bg-[#f0e8dd] px-2 py-1 text-xs text-[#ba466d]">0{index + 1}</span></div><p className="text-sm leading-6 text-[#626751]">{item.copy}</p><Link href="/quy-trinh-lien-he#lien-he" className="group/link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#ba466d] transition hover:text-[#822944] focus-visible:outline-none focus-visible:underline">{tCommon("viewDetails")} <ArrowUpRight className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" size={15} /></Link></div></article></CarouselItem>)}</CarouselContent></Carousel></section>

        <section id="nang-luc" className="relative isolate overflow-hidden bg-[#334a29] px-5 py-24 text-[#fffaf3] lg:px-8 lg:py-32"><img src="/images/nang-luc-bg.jpg" alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover blur-[2px]" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(37,58,29,.9)_0%,rgba(68,92,48,.78)_52%,rgba(70,35,45,.84)_100%)]" /><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e8cda8]"><span className="grid size-8 place-items-center rounded-full border border-current/30">03</span><span>{tHome("capacityTag")}</span></p><h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">{tHome("capacityTitle")}<br /><em className="font-normal text-[#e8cda8]">{tHome("capacityTitleEm")}</em></h2><p className="mt-7 max-w-md leading-7 text-[#e9eed9]/80">{tHome("capacityDesc")}</p></div><div className="grid gap-4 sm:grid-cols-2"><Pillar icon={<ShieldCheck />} title={tHome("pillarProducts")} text={tHome("pillarProductsDesc")} /><Pillar icon={<MapPin />} title={tHome("pillarFacility")} text={tHome("pillarFacilityDesc")} /><Pillar icon={<Truck />} title={tHome("pillarPrice")} text={tHome("pillarPriceDesc")} /><Pillar icon={<PackageCheck />} title={tHome("pillarPackaging")} text={tHome("pillarPackagingDesc")} /></div></div></div></section>

        <section className="bg-[#fffaf3] px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2"><div className="relative min-h-[430px] overflow-hidden rounded-[32px]"><img src="/images/nha-xuong-so-che.png" alt="Nhà xưởng sơ chế" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute bottom-5 left-5 rounded-2xl bg-[#fffaf3]/90 p-5 backdrop-blur"><p className="font-serif text-3xl text-[#822944]">{tHome("factoryArea")}</p><p className="text-xs text-[#626751]">{tHome("factoryLabel")}</p></div></div><div className="relative min-h-[430px] overflow-hidden rounded-[32px]"><img src="/images/dong-goi-nong-san.png" alt="Đóng gói nông sản xuất khẩu" className="absolute inset-0 h-full w-full object-cover" /></div></div></section>

        <section id="tin-tuc" className="px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ba466d]"><span className="grid size-8 place-items-center rounded-full border border-current/30">04</span><span>{tHome("newsTag")}</span></p><div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><h2 className="max-w-xl font-serif text-4xl leading-tight text-[#822944] sm:text-5xl">{tHome("newsTitle")}<br /><em className="font-normal text-[#6e8644]">{tHome("newsTitleEm")}</em></h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{articles.map((article, index) => <article key={article.href} className="group border-t border-[#cfc3b5] pt-5"><p className="text-xs font-semibold text-[#ba466d]">0{index + 1} / 09.2024</p><h3 className="mt-5 font-serif text-2xl leading-snug text-[#822944] transition group-hover:text-[#ba466d]">{article.title}</h3><p className="mt-4 text-sm leading-6 text-[#626751]">{tHome("newsSubtitle")}</p><a href={article.href} target="_blank" rel="noreferrer" className="group/link mt-5 inline-flex text-sm font-bold text-[#2d3026] transition hover:text-[#ba466d] focus-visible:outline-none focus-visible:underline">{tCommon("readMore")} <ArrowUpRight className="ml-2 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" size={15} /></a></article>)}</div></div></section>

        <section id="lien-he" className="bg-[#ba466d] px-5 py-24 text-center text-white lg:px-8 lg:py-28"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f5d9df]">{tHome("connectTag")}</p><h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">{tHome("connectTitle")}<br /><em className="font-normal text-[#f7dfbd]">{tHome("connectTitleEm")}</em></h2><p className="mx-auto mt-6 max-w-lg leading-7 text-white/75">{tHome("connectDesc")}</p><a href="mailto:trungquy077@gmail.com" className="mt-8 inline-flex rounded-full bg-[#fffaf3] px-8 py-4 text-sm font-bold text-[#822944] transition hover:-translate-y-0.5 hover:bg-[#e8cda8] hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{tCommon("partnerContact")}</a></section>
      </main>

      <Footer />
    </div>
  )
}

function InfoCard({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) { return <div className="group min-h-44 rounded-3xl border border-[#822944]/10 bg-[#fffaf3]/75 p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:bg-white"><div className="flex items-center justify-between text-[#ba466d]"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6e8644]">{title}</p><span>{icon}</span></div><p className="mt-6 font-serif text-xl leading-snug text-[#822944]">{text}</p></div> }
function Pillar({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/15"><div className="text-[#e8cda8]">{icon}</div><h3 className="mt-6 font-serif text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></div> }
