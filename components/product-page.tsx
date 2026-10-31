"use client"

import { useState } from "react"
import { ArrowUpRight, Box, Leaf, MapPin, Ship, Weight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const productMeta = [
  { image: "/images/product-red-htp-transparent.png", accent: "#ba466d", categoryIdx: 1 },
  { image: "/images/thanh-long-ruot-trang.png", accent: "#6e8644", categoryIdx: 2 },
  { image: "/images/thanh-long-vo-vang.png", accent: "#b58a3d", categoryIdx: 3 },
  { image: "/images/dua-kim-cuong-transparent.png", accent: "#6e8644", categoryIdx: 4 },
  { image: "/images/dua-nhan-nut-transparent.png", accent: "#ba466d", categoryIdx: 4 },
  { image: "/images/buoi-da-xanh-transparent.png", accent: "#6e8644", categoryIdx: 5 },
]

export function ProductPage() {
  const t = useTranslations("Products")
  const tCommon = useTranslations("Common")
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0)
  const [quoteProduct, setQuoteProduct] = useState("")
  const [open, setOpen] = useState(false)

  const categories = (t.raw("categories") as string[]) || []
  const rawProducts = (t.raw("productsList") as Array<{ name: string; category: string; descriptor: string; note: string }>) || []
  const products = rawProducts.map((p, idx) => ({
    ...p,
    ...productMeta[idx],
  }))

  const rawSpecsCards = (t.raw("specsCards") as Array<{ title: string; products: string; origin: string; weight: string; pack: string; delivery: string }>) || []
  const specsLabels = (t.raw("specsLabels") as { origin: string; weight: string; pack: string; delivery: string }) || {
    origin: "Xuất xứ",
    weight: "Trọng lượng",
    pack: "Đóng gói",
    delivery: "Giao hàng",
  }

  const rawDetails = (t.raw("detailsList") as Array<{ type: string; name: string; copy: string; season: string; feature: string }>) || []
  const details = rawDetails.map((d, idx) => ({
    ...d,
    image: productMeta[idx]?.image || "",
  }))

  const visible = selectedCategoryIdx === 0
    ? products
    : products.filter((item) => item.categoryIdx === selectedCategoryIdx)

  const quote = (name = "") => {
    setQuoteProduct(name)
    setOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#f0e8dd] text-[#2d3026]">
      <SiteHeader />

      <main className="pt-28">
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.24em] text-[#ba466d]">{t("badge")}</p>
            <h1 className="mt-6 max-w-2xl font-serif text-6xl leading-[.9] tracking-[-.05em] text-[#822944] sm:text-7xl">
              {t("heroTitle")}<br /><em className="font-normal text-[#6e8644]">{t("heroTitleEm")}</em>
            </h1>
            <p className="mt-7 max-w-xl leading-7 text-[#626751]">{t("heroDesc")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#bo-suu-tap" className="rounded-full bg-[#ba466d] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#822944]">
                {t("exploreCta")} <ArrowUpRight className="ml-2 inline" />
              </a>
              <button onClick={() => quote()} className="rounded-full border border-[#ba466d]/40 px-6 py-3.5 text-sm font-bold text-[#822944]">
                {tCommon("requestQuote")}
              </button>
            </div>
          </div>
          <div className="relative min-h-[480px] overflow-hidden rounded-[38px] bg-[#b0bc78] shadow-2xl">
            <img src="/images/product-origin-tien-giang.png" alt="Hộp trái cây Long Gia từ vùng đất Tiền Giang" className="absolute inset-0 size-full object-cover transition duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2e3825]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-serif text-3xl">{t("originBannerTitle")}</p>
              <p className="mt-1 text-sm text-white/75">{t("originBannerSubtitle")}</p>
            </div>
          </div>
        </section>

        <section id="bo-suu-tap" className="bg-[#fffaf3] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#ba466d]">{t("categoriesBadge")}</p>
            <h2 className="mt-4 font-serif text-5xl text-[#822944]">{t("categoriesTitle")}</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((item, idx) => (
                <button
                  key={item}
                  onClick={() => setSelectedCategoryIdx(idx)}
                  className={`rounded-full border px-4 py-2.5 text-sm transition ${
                    selectedCategoryIdx === idx
                      ? "border-[#822944] bg-[#822944] text-white"
                      : "border-[#d9cbbd] text-[#626751] hover:border-[#ba466d] hover:text-[#822944]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((item, index) => {
                const originalIndex = products.findIndex((p) => p.name === item.name)
                return (
                  <article key={item.name} className={`group overflow-hidden rounded-[28px] border border-[#e0d5c9] bg-[#f0e8dd]/45 transition hover:-translate-y-2 hover:shadow-xl ${index === 0 ? "lg:col-span-2" : ""}`}>
                    <div className={`${index === 0 ? "h-[360px]" : "h-72"} overflow-hidden`}>
                      <img src={item.image} alt={item.name} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[.16em]" style={{ color: item.accent }}>{item.note}</p>
                          <h3 className="mt-3 font-serif text-2xl text-[#822944]">{item.name}</h3>
                        </div>
                        <span className="rounded-full bg-white px-2 py-1 text-xs text-[#ba466d]">0{originalIndex + 1}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#626751]">{item.descriptor}</p>
                      <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold">
                        <a href={`#product-${originalIndex}`} className="text-[#ba466d]">{tCommon("viewDetails")} <ArrowUpRight className="ml-1 inline" /></a>
                        <button onClick={() => quote(item.name)} className="text-[#822944]">{tCommon("requestQuote")}</button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#ba466d]">{t("specsBadge")}</p>
            <h2 className="mt-4 font-serif text-5xl text-[#822944]">{t("specsTitle")}</h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {rawSpecsCards.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-[#d9cbbd] bg-[#fffaf3] p-7 lg:p-9">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-3xl text-[#822944]">{item.title}</h3>
                    <Leaf className="text-[#6e8644]" />
                  </div>
                  <p className="mt-3 text-sm text-[#626751]">{item.products}</p>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    {[
                      [MapPin, specsLabels.origin, item.origin],
                      [Weight, specsLabels.weight, item.weight],
                      [Box, specsLabels.pack, item.pack],
                      [Ship, specsLabels.delivery, item.delivery],
                    ].map(([Icon, label, text]) => (
                      <div key={label as string} className="flex gap-3">
                        <span className="mt-1 text-[#ba466d]"><Icon /></span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-[#626751]">{label as string}</p>
                          <p className="mt-1 text-sm leading-5 text-[#2d3026]">{text as string}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf3] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#ba466d]">{t("detailsBadge")}</p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl leading-tight text-[#822944]">
              {t("detailsTitle")}<br /><em className="font-normal text-[#6e8644]">{t("detailsTitleEm")}</em>
            </h2>
            <div className="mt-16 flex flex-col gap-24">
              {details.map((item, index) => (
                <article id={`product-${index}`} key={item.name} className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div className={`overflow-hidden rounded-[34px] ${index % 2 ? "lg:order-2" : ""}`}>
                    <img src={item.image} alt={item.name} className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-[1.02]" />
                  </div>
                  <div className={index % 2 ? "lg:order-1" : ""}>
                    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{item.type}</p>
                    <h3 className="mt-5 font-serif text-4xl text-[#822944]">{item.name}</h3>
                    <p className="mt-6 leading-7 text-[#626751]">{item.copy}</p>
                    <div className="mt-7 grid gap-4 border-y border-[#d9cbbd] py-5 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#6e8644]">{t("seasonLabel")}</p>
                        <p className="mt-2 text-sm text-[#626751]">{item.season}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#6e8644]">{t("featureLabel")}</p>
                        <p className="mt-2 text-sm text-[#626751]">{item.feature}</p>
                      </div>
                    </div>
                    <button onClick={() => quote(item.name)} className="mt-7 rounded-full bg-[#ba466d] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#822944]">
                      {tCommon("requestQuote")} <ArrowUpRight className="ml-1 inline" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="bao-gia" className="bg-[#6e8644] px-5 py-24 text-[#fffaf3] lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#e8cda8]">{t("quoteSectionBadge")}</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
              {t("quoteSectionTitle")}<br /><em className="font-normal text-[#e8cda8]">{t("quoteSectionTitleEm")}</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-7 text-white/75">{t("quoteSectionDesc")}</p>
            <button onClick={() => quote()} className="mt-8 rounded-full bg-[#fffaf3] px-7 py-3.5 text-sm font-bold text-[#822944] transition hover:bg-[#e8cda8]">
              {tCommon("requestQuote")}
            </button>
            <p className="mt-5 text-sm text-white/70">{t("quoteSectionCall")}</p>
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-[#d9cbbd] bg-[#fffaf3] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl text-[#822944]">{t("quoteDialogTitle")}</DialogTitle>
            <DialogDescription className="text-[#626751]">{t("quoteDialogDesc")}</DialogDescription>
          </DialogHeader>
          {quoteProduct && (
            <div className="rounded-xl bg-[#f0e8dd] px-4 py-3 text-sm text-[#822944]">
              {t("interestedProduct")} <strong>{quoteProduct}</strong>
            </div>
          )}
          <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); setOpen(false) }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input required placeholder={t("formName")} />
              <Input required type="email" placeholder={t("formEmail")} />
              <Input placeholder={t("formPhone")} />
              <Input placeholder={t("formOrg")} />
            </div>
            <Input placeholder={t("formSubject")} />
            <Textarea placeholder={t("formContent")} rows={5} />
            <Input placeholder={t("formCaptcha")} />
            <div className="flex flex-wrap justify-end gap-3">
              <Button type="reset" variant="outline" className="border-[#d9cbbd] text-[#822944]">{tCommon("reset")}</Button>
              <Button type="submit" className="bg-[#ba466d] hover:bg-[#822944]">{t("submitQuote")}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductPage
