"use client"

import { useEffect, useMemo, useState } from "react"
import { BarChart3, Eye, RefreshCw, Users } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { AnalyticsRange, AnalyticsResponse } from "@/lib/analytics"

const numberFormat = new Intl.NumberFormat("vi-VN")
const rangeLabels: Record<AnalyticsRange, string> = {
  "7d": "7 ngày qua",
  "30d": "30 ngày qua",
  "90d": "90 ngày qua",
}

type RankedRow = {
  label: string
  visitors: number
  pageviews: number
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState<AnalyticsRange>("30d")
  const [refreshKey, setRefreshKey] = useState(0)
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadAnalytics() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/analytics?range=${range}`, {
          signal: controller.signal,
          cache: "no-store",
        })
        const body = await response.json() as AnalyticsResponse & { error?: string }

        if (!response.ok) throw new Error(body.error || "Không thể tải dữ liệu analytics.")

        setData(body)
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") return
        setError(fetchError instanceof Error ? fetchError.message : "Không thể tải dữ liệu analytics.")
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadAnalytics()

    return () => controller.abort()
  }, [range, refreshKey])

  const lastUpdated = useMemo(() => {
    if (!data?.generatedAt) return ""

    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(data.generatedAt))
  }, [data?.generatedAt])

  return (
    <div className="min-h-screen bg-soft-ivory text-foreground">
      <SiteHeader />

      <main data-testid="analytics-dashboard" className="pt-28">
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-8 border-b border-deep-rose/15 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-dragon-berry">Long Gia · Nội bộ</p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-deep-rose sm:text-6xl">
                Bảng theo dõi truy cập
              </h1>
              <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
                Nhìn nhanh nhịp ghé thăm của đội ngũ và đối tác trên website Long Gia.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="grid gap-2">
                <label htmlFor="analytics-range" className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Khoảng thời gian
                </label>
                <Select value={range} onValueChange={(value) => setRange(value as AnalyticsRange)}>
                  <SelectTrigger id="analytics-range" className="h-11 w-full min-w-44 rounded-full border-deep-rose/20 bg-white/70 px-4 sm:w-48">
                    <SelectValue aria-label={rangeLabels[range]} />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(rangeLabels) as Array<[AnalyticsRange, string]>).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-full border-deep-rose/20 bg-white/70 px-5 text-deep-rose hover:bg-white"
                onClick={() => setRefreshKey((current) => current + 1)}
                disabled={loading}
              >
                <RefreshCw className={loading ? "animate-spin" : ""} aria-hidden="true" />
                Tải lại
              </Button>
            </div>
          </div>

          <p aria-live="polite" className="min-h-6 py-3 text-xs text-muted-foreground">
            {loading ? "Đang cập nhật dữ liệu…" : error ? error : lastUpdated ? `Cập nhật lúc ${lastUpdated}` : ""}
          </p>

          {loading && !data ? <LoadingState /> : error ? <ErrorState onRetry={() => setRefreshKey((current) => current + 1)} /> : data?.configured === false ? <SetupState /> : data ? <AnalyticsContent data={data} /> : null}
        </section>
      </main>

      <Footer />
    </div>
  )
}

function LoadingState() {
  return (
    <div className="grid gap-5" aria-label="Đang tải dữ liệu analytics">
      <div className="grid gap-5 md:grid-cols-2">
        <MetricSkeleton />
        <MetricSkeleton />
      </div>
      <Card className="border-deep-rose/10 bg-white/75 shadow-card">
        <CardHeader><Skeleton className="h-5 w-48" /><Skeleton className="h-4 w-64" /></CardHeader>
        <CardContent><Skeleton className="h-72 w-full" /></CardContent>
      </Card>
      <div className="grid gap-5 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => <Card key={index} className="border-deep-rose/10 bg-white/75 shadow-card"><CardHeader><Skeleton className="h-5 w-36" /></CardHeader><CardContent className="grid gap-4">{Array.from({ length: 4 }, (_, row) => <Skeleton key={row} className="h-8 w-full" />)}</CardContent></Card>)}
      </div>
    </div>
  )
}

function MetricSkeleton() {
  return <Card className="border-deep-rose/10 bg-white/75 shadow-card"><CardContent className="flex items-center gap-4 pt-6"><Skeleton className="size-12 rounded-2xl" /><div className="grid gap-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-9 w-24" /></div></CardContent></Card>
}

function SetupState() {
  return (
    <Card className="border-deep-rose/15 bg-white/80 shadow-card">
      <CardContent className="grid gap-6 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-dragon-berry">Cần kết nối Vercel</p>
          <h2 className="mt-3 font-serif text-3xl text-deep-rose">Chưa có dữ liệu analytics để hiển thị</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Thêm các biến môi trường bên dưới vào Vercel Project Settings, bật Web Analytics rồi deploy lại prototype.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm font-mono text-deep-rose">
            {(["VERCEL_TOKEN", "VERCEL_PROJECT_ID", "VERCEL_TEAM_ID"] as const).map((name) => <code key={name} className="rounded-full bg-soft-ivory px-3 py-2">{name}</code>)}
          </div>
        </div>
        <a className="inline-flex h-11 items-center justify-center rounded-full bg-dragon-berry px-5 text-sm font-semibold text-white transition hover:bg-deep-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dragon-berry focus-visible:ring-offset-2" href="https://vercel.com/docs/analytics/quickstart" target="_blank" rel="noreferrer">
          Hướng dẫn bật Analytics
        </a>
      </CardContent>
    </Card>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="border-dragon-berry/25 bg-white/80 shadow-card">
      <CardContent className="flex flex-col items-start gap-4 py-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-dragon-berry">Kết nối chưa sẵn sàng</p>
        <h2 className="font-serif text-3xl text-deep-rose">Không thể tải dữ liệu analytics.</h2>
        <p className="max-w-xl leading-7 text-muted-foreground">Kiểm tra lại cấu hình Vercel hoặc thử tải lại sau ít phút.</p>
        <Button type="button" onClick={onRetry} className="rounded-full bg-dragon-berry px-5 hover:bg-deep-rose">Tải lại</Button>
      </CardContent>
    </Card>
  )
}

function AnalyticsContent({ data }: { data: AnalyticsResponse }) {
  const hasSummary = data.summary.visitors !== null || data.summary.pageviews !== null
  const hasBreakdowns = data.trend.length > 0 || data.topRoutes.length > 0 || data.topCountries.length > 0 || data.topDevices.length > 0

  if (!hasSummary && !hasBreakdowns) {
    return <EmptyState />
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <MetricCard icon={<Users aria-hidden="true" />} label="Tổng người truy cập" value={data.summary.visitors} tone="berry" />
        <MetricCard icon={<Eye aria-hidden="true" />} label="Lượt xem trang" value={data.summary.pageviews} tone="green" />
      </div>

      <TrendCard data={data} />

      <div className="grid gap-5 lg:grid-cols-3">
        <RankedCard title="Route phổ biến" rows={data.topRoutes.map((row) => ({ label: row.route, visitors: row.visitors, pageviews: row.pageviews }))} />
        <RankedCard title="Nguồn quốc gia" rows={data.topCountries} />
        <RankedCard title="Thiết bị" rows={data.topDevices} />
      </div>

    </div>
  )
}

function EmptyState() {
  return (
    <Card className="border-deep-rose/10 bg-white/80 shadow-card">
      <CardContent className="flex min-h-64 flex-col items-center justify-center py-10 text-center">
        <BarChart3 className="size-9 text-forest-green" aria-hidden="true" />
        <h2 className="mt-4 font-serif text-3xl text-deep-rose">Chưa có dữ liệu trong khoảng thời gian này</h2>
        <p className="mt-3 max-w-md leading-7 text-muted-foreground">Thử chọn một khoảng thời gian dài hơn hoặc kiểm tra lại việc bật Web Analytics.</p>
      </CardContent>
    </Card>
  )
}

function MetricCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number | null; tone: "berry" | "green" }) {
  return (
    <Card className="border-deep-rose/10 bg-white/80 shadow-card">
      <CardContent className="flex items-center gap-4 pt-6">
        <span className={`grid size-12 place-items-center rounded-2xl ${tone === "berry" ? "bg-dragon-berry/10 text-dragon-berry" : "bg-forest-green/15 text-forest-green"}`}>{icon}</span>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-serif text-4xl tracking-tight text-deep-rose">{value === null ? "—" : numberFormat.format(value)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TrendCard({ data }: { data: AnalyticsResponse }) {
  return (
    <Card className="border-deep-rose/10 bg-white/80 shadow-card">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-deep-rose">Nhịp truy cập theo ngày</CardTitle>
        <p className="text-sm text-muted-foreground">Người truy cập và lượt xem trang trong {rangeLabels[data.range].toLowerCase()}.</p>
      </CardHeader>
      <CardContent>
        {data.trend.length === 0 ? <p className="flex h-72 items-center justify-center text-sm text-muted-foreground">Chưa có dữ liệu trong khoảng thời gian này</p> : <ChartContainer config={{ visitors: { label: "Người truy cập", color: "var(--color-dragon-berry)" }, pageviews: { label: "Lượt xem trang", color: "var(--color-forest-green)" } }} className="h-72 w-full !aspect-auto">
          <AreaChart data={data.trend} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="analytics-visitors" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-dragon-berry)" stopOpacity={0.3} /><stop offset="100%" stopColor="var(--color-dragon-berry)" stopOpacity={0} /></linearGradient>
              <linearGradient id="analytics-pageviews" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-forest-green)" stopOpacity={0.22} /><stop offset="100%" stopColor="var(--color-forest-green)" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="4 4" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} minTickGap={24} tickFormatter={formatShortDate} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => numberFormat.format(Number(value))} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(value) => formatLongDate(String(value))} />} />
            <Area type="monotone" dataKey="pageviews" stroke="var(--color-forest-green)" fill="url(#analytics-pageviews)" strokeWidth={2} />
            <Area type="monotone" dataKey="visitors" stroke="var(--color-dragon-berry)" fill="url(#analytics-visitors)" strokeWidth={2} />
          </AreaChart>
        </ChartContainer>}
      </CardContent>
    </Card>
  )
}

function RankedCard({ title, rows }: { title: string; rows: RankedRow[] }) {
  const maxVisitors = Math.max(1, ...rows.map((row) => row.visitors))

  return (
    <Card className="border-deep-rose/10 bg-white/80 shadow-card">
      <CardHeader><CardTitle className="font-serif text-2xl text-deep-rose">{title}</CardTitle></CardHeader>
      <CardContent>
        {rows.length === 0 ? <p className="py-3 text-sm text-muted-foreground">Chưa có dữ liệu trong khoảng thời gian này</p> : <ol className="grid gap-4">
          {rows.map((row, index) => <li key={`${row.label}-${index}`} className="grid gap-2">
            <div className="flex items-baseline justify-between gap-4 text-sm"><span className="min-w-0 truncate text-foreground"><span className="mr-2 text-xs font-bold text-dragon-berry">{String(index + 1).padStart(2, "0")}</span>{row.label}</span><span className="shrink-0 font-semibold tabular-nums text-deep-rose">{numberFormat.format(row.visitors)}</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-soft-ivory" aria-hidden="true"><div className="h-full rounded-full bg-forest-green transition-all" style={{ width: `${Math.max(4, (row.visitors / maxVisitors) * 100)}%` }} /></div>
            <p className="text-xs text-muted-foreground">{numberFormat.format(row.pageviews)} lượt xem trang</p>
          </li>)}
        </ol>}
      </CardContent>
    </Card>
  )
}

function formatShortDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit" }).format(date)
}

function formatLongDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(date)
}
