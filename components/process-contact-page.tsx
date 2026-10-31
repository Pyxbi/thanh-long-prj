"use client"

import Image from "next/image"
import { useState } from "react"
import { Check, MapPin, Phone, RotateCcw, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"

const stepImages = [
  "/images/process-intake-collage.jpg",
  "/images/process-washing.jpg",
  "/images/process-drying-collage.jpg",
  "/images/process-packaging.jpg",
  "/images/process-carton-collage.jpg",
  "/images/process-cold-collage.jpg",
]

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#403b35]">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-[#6e8644]/20 bg-[#fffaf3] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#8a8b7c] focus:border-[#ba466d] focus:ring-2 focus:ring-[#ba466d]/10"
      />
    </label>
  )
}

export function ProcessContactPage() {
  const t = useTranslations("ProcessContact")
  const tCommon = useTranslations("Common")
  const [sent, setSent] = useState(false)

  const stats = (t.raw("stats") as string[]) || []
  const rawSteps = (t.raw("steps") as Array<{ number: string; title: string; text: string; bullets?: string[]; alt: string }>) || []
  const steps = rawSteps.map((s, idx) => ({
    ...s,
    image: stepImages[idx] || "/images/process-packaging.jpg",
  }))
  const commitments = (t.raw("commitments") as string[]) || []

  return (
    <main className="min-h-screen bg-[#f0e8dd] text-[#2d3026]">
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-40 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-8 lg:pt-48">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-[#ba466d]">{t("processBadge")}</p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[.98] tracking-[-.045em] text-[#822944] sm:text-7xl">
            {t("processTitle")} <em className="font-normal text-[#6e8644]">{t("processTitleEm")}</em> {t("processTitleSuffix")}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#626751]">{t("processDesc")}</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#626751]">{t("processSubDesc")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#quy-trinh" className="rounded-full bg-[#ba466d] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#822944]">
              {t("viewProcessCta")}
            </a>
            <a href="#lien-he" className="rounded-full border border-[#ba466d]/30 bg-white/40 px-6 py-3.5 text-sm font-semibold text-[#822944]">
              {tCommon("partnerContact")}
            </a>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[28px] bg-[#b0bc78]/25 p-3 shadow-2xl shadow-[#822944]/10">
          <Image src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=1200&q=85" alt="Thanh long tươi trong quy trình sản xuất" width={1200} height={900} className="aspect-[4/3] rounded-[20px] object-cover" priority />
          <div className="absolute bottom-7 left-7 rounded-2xl bg-[#fffaf3]/90 px-5 py-4 shadow-lg backdrop-blur">
            <p className="font-serif text-3xl text-[#ba466d]">{t("processStepCardTitle")}</p>
            <p className="text-xs text-[#626751]">{t("processStepCardDesc")}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#6e8644]/15 bg-[#fffaf3]/45">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-8 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat} className="border-[#6e8644]/15 px-4 py-3 text-center text-sm font-semibold text-[#6e8644] first:border-l-0 lg:border-l">
              {stat}
            </div>
          ))}
        </div>
      </section>

      <section id="quy-trinh" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-[#ba466d]">{t("stepsBadge")}</p>
          <h2 className="font-serif text-4xl leading-tight tracking-[-.035em] text-[#822944] sm:text-6xl">{t("stepsTitle")}</h2>
          <p className="mt-5 leading-7 text-[#626751]">{t("stepsDesc")}</p>
        </div>
        <div className="mt-16 flex flex-col gap-16">
          {steps.map((step, index) => (
            <article key={step.number} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className={index % 2 ? "lg:order-2" : ""}>
                <div className="overflow-hidden rounded-[26px] border border-white/70 bg-[#fffaf3] p-2 shadow-xl shadow-[#822944]/5">
                  <Image src={step.image} alt={step.alt} width={1200} height={800} className="aspect-[4/3] rounded-[20px] object-cover transition duration-500 hover:scale-105" />
                </div>
              </div>
              <div className={index % 2 ? "lg:order-1" : ""}>
                <p className="font-serif text-6xl leading-none text-[#b0bc78]">{step.number}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[.2em] text-[#ba466d]">{t("stepLabel")} {index + 1}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-[#822944]">{step.title}</h3>
                <p className="mt-4 leading-7 text-[#626751]">{step.text}</p>
                {step.bullets && (
                  <ul className="mt-5 flex flex-col gap-2 text-sm text-[#626751]">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <Check className="mt-0.5 shrink-0 text-[#6e8644]" size={16} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#6e8644] px-5 py-20 text-[#fffaf3] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#e8cda8]">{t("commitBadge")}</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl">{t("commitTitle")}</h2>
          <p className="mt-6 max-w-2xl leading-7 text-[#f0e8dd]/85">{t("commitDesc")}</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item) => (
              <div key={item} className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm font-semibold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lien-he" className="scroll-mt-28 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-[#ba466d]">{t("contactBadge")}</p>
          <h2 className="font-serif text-4xl leading-tight tracking-[-.035em] text-[#822944] sm:text-6xl">{t("contactTitle")}</h2>
          <p className="mt-5 leading-7 text-[#626751]">{t("contactDesc")}</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[26px] bg-[#fffaf3] p-7 shadow-xl shadow-[#822944]/5">
            <h3 className="font-serif text-3xl text-[#822944]">{t("contactInfoTitle")}</h3>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-6 text-[#626751]">
              <p><strong className="text-[#2d3026]">Hợp Tác Xã Nông Nghiệp Sạch Hưng Thịnh Phát</strong></p>
              <p className="flex gap-3"><MapPin className="mt-1 shrink-0 text-[#ba466d]" size={18} />Thửa 154, Ấp Long Thạnh, Xã Tân Thuận Bình, Tỉnh Tiền Giang</p>
              <p><strong>{t("taxCodeLabel")}</strong> 1201647060</p>
              <p className="flex gap-3"><Phone className="mt-1 shrink-0 text-[#ba466d]" size={18} />0919 831 055 (Mr. Quý)</p>
              <p><strong>{t("websiteLabel")}</strong> www.hungthinhphat.com</p>
            </div>
            <div className="mt-7 flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-[#6e8644]/35 bg-[#b0bc78]/15 text-center text-sm text-[#6e8644]">
              <div>
                <MapPin className="mx-auto mb-3" size={28} />
                <p className="font-semibold">{t("mapTitle")}</p>
                <a href="https://maps.app.goo.gl/uYApBSyFySCK19u6A" target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs underline">
                  {t("mapLink")}
                </a>
              </div>
            </div>
          </div>
          <form className="rounded-[26px] bg-[#fffaf3] p-7 shadow-xl shadow-[#822944]/5" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
            <h3 className="font-serif text-3xl text-[#822944]">{t("formTitle")}</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label={t("formName")} placeholder={t("formNamePlaceholder")} />
              <Field label={t("formEmail")} type="email" placeholder={t("formEmailPlaceholder")} />
              <Field label={t("formPhone")} placeholder={t("formPhonePlaceholder")} />
              <Field label={t("formOrg")} placeholder={t("formOrgPlaceholder")} />
            </div>
            <div className="mt-4"><Field label={t("formSubject")} placeholder={t("formSubjectPlaceholder")} /></div>
            <label className="mt-4 flex flex-col gap-2 text-sm font-medium text-[#403b35]">
              <span>{t("formContent")}</span>
              <textarea rows={4} placeholder={t("formContentPlaceholder")} className="resize-none rounded-xl border border-[#6e8644]/20 bg-[#fffaf3] px-4 py-3.5 text-sm outline-none placeholder:text-[#8a8b7c] focus:border-[#ba466d]" />
            </label>
            <div className="mt-4"><Field label={t("formCaptcha")} placeholder={t("formCaptchaPlaceholder")} /></div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="rounded-full bg-[#ba466d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#822944]">
                <Send className="mr-2 inline" size={15} />{t("formSubmit")}
              </button>
              <button type="reset" onClick={() => setSent(false)} className="rounded-full border border-[#822944]/20 px-6 py-3 text-sm font-semibold text-[#822944]">
                <RotateCcw className="mr-2 inline" size={15} />{t("formReset")}
              </button>
            </div>
            {sent && <p className="mt-4 text-sm font-medium text-[#6e8644]">{t("formSuccess")}</p>}
          </form>
        </div>
      </section>

      <section className="bg-[#822944] px-5 py-16 text-center text-[#fffaf3] lg:px-8">
        <h2 className="font-serif text-4xl sm:text-5xl">{t("ctaBannerTitle")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#f0e8dd]/80">{t("ctaBannerDesc")}</p>
        <div className="mt-7 flex justify-center gap-3">
          <a href="#lien-he" className="rounded-full bg-[#e8cda8] px-6 py-3 text-sm font-semibold text-[#822944]">
            {tCommon("contactNow")}
          </a>
          <a href="tel:0919831055" className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold">
            {tCommon("phone")}
          </a>
        </div>
      </section>
      <Footer />
    </main>
  )
}
