"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"

const farmImage = "/images/about-farm.jpg"
const letterImage = "/images/about-letter-orchard.jpg"

const milestoneImages: Record<string, string> = {
  "2021": "/images/milestone-2021.jpg",
  "2023": "/images/milestone-2023.jpg",
  "2025": "/images/milestone-2025.jpg",
}

const valueTones: Array<"pink" | "green" | "gold"> = ["pink", "green", "gold"]

export function AboutPage() {
  const t = useTranslations("About")
  const tCommon = useTranslations("Common")

  const letterParagraphs = (t.raw("letterParagraphs") as string[]) || []
  const missions = (t.raw("missions") as string[]) || []
  const valueCards = (t.raw("valueCards") as Array<{ title: string; items: string[] }>) || []
  const milestones = ((t.raw("milestones") as Array<{ year: string; title: string; text?: string; items?: string[] }>) || []).map(m => ({
    ...m,
    image: milestoneImages[m.year],
  }))

  return (
    <div className="min-h-screen bg-[#f0e8dd] text-[#2d3026]">
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-40 lg:grid-cols-[1fr_.85fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-48">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#ba466d]">{t("badge")}</p>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[.96] tracking-[-.04em] text-[#822944] sm:text-7xl">
              {t("heroTitle")}<br /><em className="font-normal text-[#6e8644]">{t("heroTitleEm")}</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#626751]">{t("heroDesc")}</p>
          </div>
          <ImageSlot src={farmImage} alt="Vùng trồng nông nghiệp Tiền Giang" className="aspect-[4/5] rotate-2" />
        </section>

        <section id="cau-chuyen" className="bg-[#fffaf3] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{t("storyBadge")}</p>
              <h2 className="mt-5 font-serif text-5xl text-[#822944]">{t("letterTitle")}</h2>
              <blockquote className="mt-8 border-l-4 border-[#ba466d] pl-5 font-serif text-2xl leading-snug text-[#6e8644]">{t("letterQuote")}</blockquote>
              <div className="mt-7 space-y-5 text-sm leading-7 text-[#626751]">
                {letterParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
            <ImageSlot src={letterImage} alt="Vùng trồng thanh long Hưng Thịnh Phát" className="aspect-[4/5]" />
          </div>
        </section>

        <section id="tam-nhin" className="px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{t("visionBadge")}</p>
            <h2 className="mt-5 font-serif text-5xl text-[#822944]">{t("visionMissionTitle")}</h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <article className="rounded-[30px] bg-[#6e8644] p-8 text-[#fffaf3] lg:p-12">
                <p className="text-sm font-bold tracking-[.2em] text-[#e8cda8]">01</p>
                <h3 className="mt-12 font-serif text-4xl">{t("visionLabel")}</h3>
                <p className="mt-6 max-w-xl text-sm leading-7 text-white/75">{t("visionDesc")}</p>
              </article>
              <article className="rounded-[30px] bg-[#822944] p-8 text-[#fffaf3] lg:p-12">
                <p className="text-sm font-bold tracking-[.2em] text-[#e8cda8]">02</p>
                <h3 className="mt-12 font-serif text-4xl">{t("missionLabel")}</h3>
                <p className="mt-5 text-sm text-white/75">{t("missionDesc")}</p>
                <ol className="mt-7 grid gap-3">
                  {missions.map((item, index) => (
                    <li key={item} className="flex gap-3 border-t border-white/15 pt-3 text-sm leading-6 text-white/80">
                      <span className="font-serif text-[#e8cda8]">0{index + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#fffaf3] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{t("valuesBadge")}</p>
            <h2 className="mt-5 max-w-2xl font-serif text-5xl text-[#822944]">{t("valuesTitle")}</h2>
            <p className="mt-5 max-w-xl text-[#626751]">{t("valuesDesc")}</p>
            <div className="mt-8 flex items-end justify-between md:hidden">
              <Image src="/images/value-mascot-red.png" alt="Mascot thanh long đỏ Long Gia" width={150} height={175} className="-ml-5 w-32 -rotate-6 mix-blend-multiply" />
              <Image src="/images/value-mascot-white.png" alt="Mascot thanh long trắng Long Gia" width={150} height={175} className="-mr-5 w-32 rotate-6 mix-blend-multiply" />
            </div>
            <div className="relative mt-4 md:mt-12 lg:px-12">
              <Image src="/images/value-mascot-red.png" alt="Mascot thanh long đỏ Long Gia" width={210} height={245} className="pointer-events-none absolute -bottom-12 -left-14 z-20 hidden w-36 -rotate-6 mix-blend-multiply md:block lg:-bottom-16 lg:-left-24 lg:w-52" />
              <Image src="/images/value-mascot-white.png" alt="Mascot thanh long trắng Long Gia" width={210} height={245} className="pointer-events-none absolute -bottom-12 -right-14 z-20 hidden w-36 rotate-6 mix-blend-multiply md:block lg:-bottom-16 lg:-right-24 lg:w-52" />
              <div className="relative z-10 grid gap-4 md:grid-cols-3">
                {valueCards.map((card, i) => (
                  <ValueCard key={card.title} tone={valueTones[i] || "pink"} title={card.title} items={card.items} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="hanh-trinh" className="px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{t("journeyBadge")}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-tight text-[#822944]">
              {t("journeyTitle")}<br /><em className="font-normal text-[#6e8644]">{t("journeyTitleEm")}</em>
            </h2>
            <p className="mt-5 max-w-xl text-[#626751]">{t("journeyDesc")}</p>
            <div className="relative mt-16 before:absolute before:bottom-0 before:left-[18px] before:top-0 before:w-px before:bg-[#d5c8ba] md:before:left-1/2">
              {milestones.map((item, index) => (
                <article key={item.year} className="relative grid gap-6 pb-14 pl-12 last:pb-0 md:grid-cols-2 md:gap-14 md:pl-0">
                  <span className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-full bg-[#ba466d] font-serif text-sm text-white md:left-1/2 md:-translate-x-1/2">{item.year.slice(2)}</span>
                  <div className={`${index % 2 ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
                    <p className="font-serif text-3xl text-[#ba466d]">{item.year}</p>
                    <h3 className="mt-2 font-serif text-2xl text-[#822944]">{item.title}</h3>
                    {item.text && <p className="mt-3 text-sm leading-7 text-[#626751]">{item.text}</p>}
                    {item.items && (
                      <ul className="mt-3 space-y-2 text-sm leading-7 text-[#626751]">
                        {item.items.map(detail => (
                          <li key={detail} className="flex gap-2 before:mt-[11px] before:size-1.5 before:shrink-0 before:rounded-full before:bg-[#ba466d]">{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {item.image && <ImageSlot src={item.image} alt={item.title} className="aspect-[16/8] md:col-span-1" />}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="lien-he" className="mx-5 mb-20 overflow-hidden rounded-[32px] bg-[#6e8644] px-6 py-20 text-center text-[#fffaf3] lg:mx-auto lg:max-w-7xl lg:px-20">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#e8cda8]">{t("partnerBadge")}</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">
            {t("partnerTitle")}<br /><em className="font-normal text-[#e8cda8]">{t("partnerTitleEm")}</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-white/75">{t("partnerDesc")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:trungquy077@gmail.com" className="rounded-full bg-[#fffaf3] px-7 py-3.5 text-sm font-bold text-[#822944] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e8cda8] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{tCommon("partnerContact")} <ArrowUpRight className="ml-1 inline" size={16} /></a>
            <a href="tel:0919831055" className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{tCommon("phone")}</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ImageSlot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) { return <div className={`relative overflow-hidden rounded-[30px] bg-[#d9d2c6] ${className}`}><Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-105" />{/* TODO: Replace with real Long Gia image */}</div> }
function ValueCard({ title, items, tone }: { title: string; items: string[]; tone: "pink" | "green" | "gold" }) { const colors = { pink: "bg-[#f2d8df] text-[#822944]", green: "bg-[#dfe5cd] text-[#40512b]", gold: "bg-[#f1e2bf] text-[#785b2f]" }; return <article className={`min-h-[300px] rounded-[28px] p-7 ${colors[tone]} transition duration-500 hover:-translate-y-2 hover:shadow-xl`}><h3 className="font-serif text-2xl">{title}</h3><ul className="mt-5 grid gap-3 text-sm leading-6">{items.map(item => <li key={item} className="border-t border-current/15 pt-3">{item}</li>)}</ul></article> }
