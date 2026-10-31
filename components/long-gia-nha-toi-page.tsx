"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, Check, Sprout } from "lucide-react"
import { useTranslations } from "next-intl"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { clearLongGiaUser, LongGiaAccountChip, readLongGiaUser, type LongGiaUser } from "@/components/long-gia-auth"

const stageImages = [
  "/images/stage-01-lighting.jpg",
  "/images/stage-02-pruning.jpg",
  "/images/stage-02-pruning.jpg",
  "/images/stage-03-04.jpg",
]

const postHarvestImages = [
  "/images/post-harvest-picking.jpg",
  "/images/post-harvest-packing.jpg",
  "/images/post-harvest-delivery.jpg",
]

export function LongGiaNhaToiPage() {
  const t = useTranslations("LongGiaNhaToi")
  const [stage, setStage] = useState(0)
  const [adoptOpen, setAdoptOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState<LongGiaUser | null>(null)

  const rawStages = (t.raw("stages") as Array<{ no: string; title: string; time: string; short: string; detail: string }>) || []
  const stages = rawStages.map((st, idx) => ({
    ...st,
    image: stageImages[idx] || "/images/stage-01-lighting.jpg",
  }))

  const rawPostHarvest = (t.raw("postHarvestCards") as Array<{ title: string; text: string }>) || []
  const postHarvest = rawPostHarvest.map((ph, idx) => ({
    ...ph,
    image: postHarvestImages[idx] || "/images/post-harvest-picking.jpg",
  }))

  const fruitOptions = (t.raw("fruitOptions") as string[]) || ["Thanh Long Ruột Đỏ HTP", "Thanh Long Ruột Trắng", "Thanh Long Vỏ Vàng"]
  const durationOptions = (t.raw("durationOptions") as string[]) || ["3 tháng", "6 tháng", "12 tháng"]

  const active = stages[stage] || stages[0]

  const pillars = Array.from({ length: 8 }, (_, i) => ({
    id: `LG-${String(27 + i).padStart(3, "0")}`,
    owner: i % 3 === 0 ? "Nguyễn Văn An" : i % 3 === 1 ? t("statusGrowing") : t("statusAvailable"),
    status: i % 3 === 2 ? "available" : "growing",
    stage: stages[i % (stages.length || 1)]?.title || "",
  }))

  useEffect(() => {
    setUser(readLongGiaUser())
  }, [])

  return (
    <div className="min-h-screen bg-[#f0e8dd] text-[#2d3026]">
      <SiteHeader />
      {user && <LongGiaAccountChip user={user} onLogout={() => { clearLongGiaUser(); setUser(null) }} />}
      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-40 lg:grid-cols-[1fr_.85fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-48">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#ba466d]">{t("heroBadge")}</p>
            <h1 className="mt-5 max-w-3xl font-serif text-6xl leading-[.92] tracking-[-.06em] text-[#822944] sm:text-8xl">
              {t("heroTitle")}<br /><em className="font-normal text-[#6e8644]">{t("heroTitleEm")}</em>
            </h1>
            <h2 className="mt-8 max-w-xl font-serif text-2xl leading-tight text-[#2d3026]">{t("heroSubtitle")}</h2>
            <p className="mt-5 max-w-xl leading-7 text-[#626751]">{t("heroDesc")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setAdoptOpen(true)}
                className="rounded-full bg-[#ba466d] px-6 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#822944] hover:shadow-lg active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba466d] focus-visible:ring-offset-2"
              >
                {t("adoptCta")} <ArrowRight className="ml-2 inline" size={16} />
              </button>
              <a
                className="rounded-full border border-[#ba466d]/35 px-6 py-3.5 font-semibold text-[#822944] transition duration-300 hover:-translate-y-0.5 hover:border-[#ba466d] hover:bg-[#ba466d] hover:text-white hover:shadow-lg active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba466d] focus-visible:ring-offset-2"
                href="#hanh-trinh"
              >
                {t("viewJourneyCta")}
              </a>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-[#d5c8b9] pt-6">
              <div>
                <p className="font-serif text-3xl text-[#ba466d]">150ha</p>
                <p className="mt-1 text-xs text-[#626751]">{t("statOrchards")}</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-[#ba466d]">100%</p>
                <p className="mt-1 text-xs text-[#626751]">{t("statTransparency")}</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-[#ba466d]">48h</p>
                <p className="mt-1 text-xs text-[#626751]">{t("statSpeed")}</p>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[.78] overflow-hidden rounded-[38px] bg-[#6e8644] shadow-2xl">
              <Image src="/images/long-gia-pillar.jpg" alt="Trụ thanh long tại vùng trồng" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d3026]/65 to-transparent" />
              <p className="absolute bottom-7 left-7 text-sm text-white/75">{t("heroTitle")} {t("heroTitleEm")}</p>
            </div>
            <div className="absolute -bottom-7 -left-5 rounded-2xl border border-white/80 bg-[#fffaf3]/95 p-5 shadow-xl backdrop-blur">
              <p className="font-serif text-lg text-[#822944]">{t("pillarBadge")}</p>
              <p className="mt-2 text-xs text-[#626751]">{t("pillarCode")} <b>LG-HTP-027</b></p>
              <p className="mt-1 text-xs text-[#626751]">{t("statusLabel")} <b className="text-[#6e8644]">{t("statusGrowing")}</b></p>
              <p className="mt-1 text-xs text-[#626751]">{t("lastUpdate")} 20/07/2026</p>
            </div>
          </div>
        </section>

        <section id="hanh-trinh" className="bg-[#fffaf3] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{t("diaryBadge")}</p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl leading-tight text-[#822944]">
              {t("diaryTitle")}<br /><em className="font-normal text-[#6e8644]">{t("diaryTitleEm")}</em>
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-[#626751]">{t("diaryDesc")}</p>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stages.map((item, i) => (
                <button
                  key={item.no}
                  onClick={() => setStage(i)}
                  className={`overflow-hidden rounded-3xl border text-left transition hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba466d] focus-visible:ring-offset-2 ${
                    stage === i ? "border-[#ba466d] bg-[#f7e7ea] shadow-lg" : "border-[#ded3c6] bg-white"
                  }`}
                >
                  <div className="relative h-44">
                    <Image src={item.image} alt="" fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold text-[#ba466d]">{t("currentStage").toUpperCase()} {item.no}</p>
                    <h3 className="mt-3 font-serif text-xl text-[#822944]">{item.title}</h3>
                    <p className="mt-2 text-xs text-[#6e8644]">{item.time}</p>
                    <p className="mt-3 text-sm leading-6 text-[#626751]">{item.short}</p>
                  </div>
                </button>
              ))}
            </div>
            {active && (
              <div className="mt-6 grid overflow-hidden rounded-3xl bg-[#f0e8dd] lg:grid-cols-[.8fr_1.2fr]">
                <div className="relative min-h-[280px]">
                  <Image src={active.image} alt="" fill className="object-cover" />
                </div>
                <div className="p-8 lg:p-12">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{t("currentStage")} · {active.no}</p>
                  <h3 className="mt-4 font-serif text-4xl text-[#822944]">{active.title}</h3>
                  <p className="mt-3 font-semibold text-[#6e8644]">{active.time}</p>
                  <p className="mt-5 max-w-xl leading-7 text-[#626751]">{active.detail}</p>
                  <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ba466d] px-4 py-2 text-xs font-semibold text-white">
                    <Check size={14} /> {t("updating")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{t("mapBadge")}</p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl leading-tight text-[#822944]">
              {t("mapTitle")}<br /><em className="font-normal text-[#6e8644]">{t("mapTitleEm")}</em>
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-[#626751]">{t("mapDesc")}</p>
            <div className="mt-10 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#ba466d] px-4 py-2 text-xs font-semibold text-white">{t("filterAll")}</span>
              <span className="rounded-full border border-[#d7cabb] px-4 py-2 text-xs">{t("filterAdopted")}</span>
              <span className="rounded-full border border-[#d7cabb] px-4 py-2 text-xs">{t("filterAvailable")}</span>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, i) => (
                <article
                  key={pillar.id}
                  className="group flex min-h-[420px] flex-col rounded-3xl border border-[#ded3c6] bg-[#fffaf3] p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#ba466d]/50 hover:shadow-[0_20px_55px_rgba(186,70,109,.22)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#f7e7ea] px-3 py-1 text-xs font-bold text-[#ba466d]">{pillar.id}</span>
                    <span className={`text-xs font-semibold ${pillar.status === "available" ? "text-[#ba466d]" : "text-[#6e8644]"}`}>
                      {pillar.status === "available" ? t("statusVacant") : t("statusGrowing")}
                    </span>
                  </div>
                  <div className="relative my-7 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-[#e4e8ce] text-[#6e8644]">
                    {pillar.status === "available" ? (
                      <Sprout size={38} />
                    ) : (
                      <Image
                        src={i % 2 === 0 ? "/images/garden-fruit-closeup.jpg" : "/images/garden-fruit-cluster.jpg"}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105 group-hover:saturate-125"
                      />
                    )}
                  </div>
                  <p className="font-serif text-lg text-[#822944]">{t("pillarBadge")}</p>
                  <p className="mt-2 text-xs text-[#626751]">{pillar.owner}</p>
                  <p className="mt-4 border-t border-[#ded3c6] pt-4 text-xs text-[#626751]">
                    {t("currentStage")}: <b>{pillar.stage}</b>
                  </p>
                  {pillar.status === "available" && (
                    <button
                      onClick={() => setAdoptOpen(true)}
                      className="mt-auto w-full rounded-full bg-[#ba466d] py-2.5 text-xs font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#822944] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba466d] focus-visible:ring-offset-2"
                    >
                      {t("adoptCta")}
                    </button>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#6e8644] px-5 py-24 text-[#fffaf3] lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#e8cda8]">{t("postHarvestBadge")}</p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl leading-tight">
              {t("postHarvestTitle")}<br /><em className="font-normal text-[#e8cda8]">{t("postHarvestTitleEm")}</em>
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/75">{t("postHarvestDesc")}</p>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {postHarvest.map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-3xl bg-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/75">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 text-base font-semibold">
                <span>{t("harvestOrderTitle")}</span>
                <span className="text-[#e8cda8]">{t("harvestOrderFlow")}</span>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/20">
                <div className="relative h-full w-3/4 rounded-full bg-[#e8cda8]">
                  <span className="absolute right-0 top-1/2 size-4 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,.9)] animate-pulse motion-reduce:animate-none" />
                  <span className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-white/70 animate-pulse motion-reduce:animate-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="dang-ky" className="bg-[#fffaf3] px-5 py-28 text-center lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{t("startTodayBadge")}</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-5xl leading-tight text-[#822944]">
            {t("startTodayTitle")}<br /><em className="font-normal text-[#6e8644]">{t("startTodayTitleEm")}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-7 text-[#626751]">{t("startTodayDesc")}</p>
          <button
            onClick={() => setAdoptOpen(true)}
            className="mt-8 rounded-full bg-[#ba466d] px-7 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#822944] hover:shadow-lg active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba466d] focus-visible:ring-offset-2"
          >
            {t("adoptCta")}
          </button>
        </section>
      </main>
      <Footer />
      <Dialog open={adoptOpen} onOpenChange={setAdoptOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-[#ded3c6] bg-[#fffaf3] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl text-[#822944]">
              {success ? t("dialogSuccessTitle") : t("dialogTitle")}
            </DialogTitle>
            <DialogDescription>
              {success ? t("dialogSuccessDesc") : t("dialogDesc")}
            </DialogDescription>
          </DialogHeader>
          {success ? (
            <div className="rounded-2xl bg-[#e4e8ce] p-6 text-center text-[#6e8644]">
              <Check className="mx-auto" />
              <p className="mt-3 font-semibold">{t("dialogSuccessDesc")}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <label className="text-sm font-semibold">
                {t("formName")}
                <input className="mt-2 w-full rounded-xl border border-[#d7cabb] bg-white px-4 py-3" placeholder={t("formNamePlaceholder")} />
              </label>
              <label className="text-sm font-semibold">
                {t("formPhone")}
                <input className="mt-2 w-full rounded-xl border border-[#d7cabb] bg-white px-4 py-3" placeholder={t("formPhonePlaceholder")} />
              </label>
              <label className="text-sm font-semibold">
                {t("fruitType")}
                <select className="mt-2 w-full rounded-xl border border-[#d7cabb] bg-white px-4 py-3">
                  {fruitOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold">
                {t("pillarCount")}
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 5, 10].map((n) => (
                    <button
                      type="button"
                      key={n}
                      className="rounded-xl border border-[#d7cabb] py-3 text-sm transition hover:border-[#ba466d] hover:bg-[#f7e7ea] hover:text-[#822944] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba466d]"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </label>
              <label className="text-sm font-semibold">
                {t("duration")}
                <select className="mt-2 w-full rounded-xl border border-[#d7cabb] bg-white px-4 py-3">
                  {durationOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <DialogFooter>
            {!success && (
              <Button onClick={() => setSuccess(true)} className="rounded-full bg-[#ba466d] hover:bg-[#822944]">
                {t("confirmPayment")}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
