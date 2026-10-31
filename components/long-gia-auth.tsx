"use client"

import Image from "next/image"
import { FormEvent, useEffect, useState } from "react"
import { ArrowRight, LockKeyhole, LogOut, Phone, UserRound } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const LONG_GIA_AUTH_KEY = "long-gia-demo-user"
export const LONG_GIA_POINTS_KEY = "long-gia-demo-points"

export type LongGiaUser = {
  name: string
  phone: string
}

export function readLongGiaUser(): LongGiaUser | null {
  if (typeof window === "undefined") return null

  try {
    const value = window.localStorage.getItem(LONG_GIA_AUTH_KEY)
    return value ? JSON.parse(value) as LongGiaUser : null
  } catch {
    return null
  }
}

function pointsStorageKey(user: LongGiaUser) {
  return `${LONG_GIA_POINTS_KEY}:${encodeURIComponent(user.phone.trim())}`
}

export function readLongGiaPoints(user: LongGiaUser | null) {
  if (!user || typeof window === "undefined") return 0

  try {
    const value = Number(window.localStorage.getItem(pointsStorageKey(user)) ?? 0)
    return Number.isFinite(value) && value >= 0 ? value : 0
  } catch {
    return 0
  }
}

export function addLongGiaPoints(user: LongGiaUser | null, points: number) {
  if (!user || typeof window === "undefined" || !Number.isFinite(points) || points <= 0) {
    return readLongGiaPoints(user)
  }

  const total = readLongGiaPoints(user) + points
  window.localStorage.setItem(pointsStorageKey(user), String(total))
  return total
}

function saveLongGiaUser(user: LongGiaUser) {
  window.localStorage.setItem(LONG_GIA_AUTH_KEY, JSON.stringify(user))
}

function readSafeReturnTo() {
  const returnTo = new URLSearchParams(window.location.search).get("returnTo")
  return returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : null
}

export function clearLongGiaUser() {
  window.localStorage.removeItem(LONG_GIA_AUTH_KEY)
}

export function LongGiaAuthPage({ mode, onAuthenticated }: { mode: "login" | "register"; onAuthenticated?: (user: LongGiaUser) => void }) {
  const t = useTranslations("Auth")
  const isRegister = mode === "register"
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState("")
  const [returnTo, setReturnTo] = useState<string | null>(null)

  useEffect(() => {
    setReturnTo(readSafeReturnTo())
  }, [])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!phone.trim()) {
      setError(t("errPhone"))
      return
    }

    if (isRegister && (!name.trim() || password.length < 6)) {
      setError(t("errRegister"))
      return
    }

    if (!isRegister && otp !== "123456") {
      setError(t("errOtp"))
      return
    }

    const user = { name: isRegister ? name.trim() : "Thành viên Long Gia", phone: phone.trim() }
    saveLongGiaUser(user)

    if (onAuthenticated) {
      onAuthenticated(user)
    } else {
      window.location.href = returnTo ?? readSafeReturnTo() ?? "/long-gia-nha-toi"
    }
  }

  const authSwitchHref = `${isRegister ? "/long-gia-nha-toi" : "/long-gia-nha-toi/dang-ky"}${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`

  return (
    <div className="min-h-screen bg-[#f0e8dd] text-[#2d3026]">
      <SiteHeader />
      <main className="relative isolate flex min-h-[calc(100svh-1rem)] items-center overflow-hidden px-5 pb-20 pt-32 lg:px-8 lg:pt-36">
        <Image src="/images/long-gia-pillar.jpg" alt="Vùng trồng thanh long Long Gia" fill priority className="absolute inset-0 -z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(240,232,221,.94)_0%,rgba(240,232,221,.84)_45%,rgba(240,232,221,.42)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#f0e8dd]/80 via-transparent to-[#fffaf3]/45" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[.95fr_1.05fr]">
          <div className="hidden max-w-xl pl-3 lg:block">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-[#ba466d]">{t("sideTag")}</p>
            <h1 className="mt-5 max-w-lg font-serif text-6xl leading-[.95] tracking-[-.05em] text-[#822944] xl:text-8xl">
              {t("sideTitle")}<br /><em className="font-normal text-[#6e8644]">{t("sideTitleEm")}</em>
            </h1>
            <p className="mt-7 max-w-md text-base leading-8 text-[#626751]">{t("sideDesc")}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-[#6e8644]">
              <span className="rounded-full bg-[#fffaf3]/80 px-4 py-2 shadow-sm">{t("badgeTransparent")}</span>
              <span className="rounded-full bg-[#fffaf3]/80 px-4 py-2 shadow-sm">{t("badgeConnected")}</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[32px] border border-white/80 bg-[#fffaf3]/95 p-6 shadow-[0_25px_80px_rgba(63,49,80,.18)] backdrop-blur-xl sm:p-9 lg:ml-auto lg:p-12">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#f7e7ea] px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em] text-[#ba466d]">
                  <UserRound size={14} /> {t("chipAccount")}
                </p>
                <h2 className="mt-6 font-serif text-5xl leading-none text-[#822944]">{isRegister ? t("titleRegister") : t("titleLogin")}</h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-[#626751]">{isRegister ? t("descRegister") : t("descLogin")}</p>
              </div>
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#e4e8ce] text-[#6e8644]"><LockKeyhole size={22} /></div>
            </div>

            <form className="mt-8 space-y-4" onSubmit={submit}>
              {isRegister && (
                <label className="block text-sm font-semibold text-[#626751]">
                  {t("nameLabel")}
                  <input value={name} onChange={event => setName(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#d7cabb] bg-white px-4 outline-none transition focus:border-[#ba466d] focus:ring-2 focus:ring-[#ba466d]/15" placeholder={t("namePlaceholder")} />
                </label>
              )}
              <label className="block text-sm font-semibold text-[#626751]">
                {t("phoneLabel")}
                <div className="relative mt-2">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ba466d]" size={17} />
                  <input value={phone} onChange={event => setPhone(event.target.value)} className="h-12 w-full rounded-xl border border-[#d7cabb] bg-white pl-11 pr-4 outline-none transition focus:border-[#ba466d] focus:ring-2 focus:ring-[#ba466d]/15" placeholder={t("phonePlaceholder")} />
                </div>
              </label>
              {isRegister ? (
                <>
                  <label className="block text-sm font-semibold text-[#626751]">
                    {t("emailLabel")} <span className="font-normal text-[#9b9085]">{t("emailOptional")}</span>
                    <input type="email" value={email} onChange={event => setEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#d7cabb] bg-white px-4 outline-none transition focus:border-[#ba466d] focus:ring-2 focus:ring-[#ba466d]/15" placeholder={t("emailPlaceholder")} />
                  </label>
                  <label className="block text-sm font-semibold text-[#626751]">
                    {t("passwordLabel")}
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#d7cabb] bg-white px-4 outline-none transition focus:border-[#ba466d] focus:ring-2 focus:ring-[#ba466d]/15" placeholder={t("passwordPlaceholder")} />
                  </label>
                </>
              ) : (
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <label className="block text-sm font-semibold text-[#626751]">
                    {t("otpLabel")}
                    <input value={otp} onChange={event => setOtp(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#d7cabb] bg-white px-4 outline-none transition focus:border-[#ba466d] focus:ring-2 focus:ring-[#ba466d]/15" placeholder={t("otpPlaceholder")} />
                  </label>
                  <button type="button" onClick={() => setOtpSent(true)} className="self-end rounded-xl border border-[#6e8644]/40 px-4 py-3 text-xs font-bold text-[#6e8644] transition hover:border-[#6e8644] hover:bg-[#e4e8ce] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e8644]">
                    {otpSent ? t("btnOtpSent") : t("btnGetOtp")}
                  </button>
                </div>
              )}
              {error && <p role="alert" className="rounded-xl bg-[#f7e7ea] px-4 py-3 text-sm text-[#822944]">{error}</p>}
              {!isRegister && otpSent && <p className="text-xs text-[#6e8644]">{t("demoOtpHint")}</p>}
              <Button type="submit" className="h-13 w-full rounded-full bg-[#ba466d] text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#822944] hover:shadow-lg">
                {isRegister ? t("btnRegister") : t("btnLogin")}<ArrowRight size={18} />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[#626751]">
              {isRegister ? t("hasAccount") : t("noAccount")}{" "}
              <Link href={authSwitchHref} className="font-bold text-[#ba466d] underline-offset-4 transition hover:text-[#822944] hover:underline">
                {isRegister ? t("linkLogin") : t("linkRegister")}
              </Link>
            </p>
            <p className="mt-6 border-t border-[#ded3c6] pt-5 text-center text-xs leading-5 text-[#9b9085]">
              {t("protoDisclaimer")}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function LongGiaAccountChip({ user, onLogout }: { user: LongGiaUser; onLogout: () => void }) {
  const t = useTranslations("Auth")
  const initial = user.name.trim().charAt(0).toUpperCase() || "L"

  return (
    <div className="fixed right-5 top-24 z-40 sm:right-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" aria-label={`Mở menu tài khoản ${user.name}`} data-testid="account-menu-trigger" className="grid size-11 place-items-center rounded-full border border-white/90 bg-[#fffaf3]/95 p-1 shadow-lg shadow-[#3f3150]/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba466d] focus-visible:ring-offset-2">
            <span className="grid size-8 place-items-center rounded-full bg-[#ba466d] text-sm font-bold text-white">{initial}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8} className="w-56 rounded-2xl border-[#ded3c6] bg-[#fffaf3] p-2 text-[#626751] shadow-xl">
          <DropdownMenuLabel className="px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6e8644]">{t("chipAccount")}</p>
            <p className="mt-1 truncate text-sm font-bold text-[#822944]">{user.name}</p>
            <p className="mt-0.5 text-xs font-normal text-[#9b9085]">{user.phone}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#ded3c6]" />
          <DropdownMenuItem onSelect={onLogout} className="rounded-xl px-3 py-2.5 text-sm text-[#822944] focus:bg-[#f7e7ea] focus:text-[#822944]">
            <LogOut size={15} /> {t("chipLogout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
