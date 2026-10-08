export type AnalyticsRange = "7d" | "30d" | "90d"

export type AnalyticsResponse = {
  range: AnalyticsRange
  configured: boolean
  generatedAt: string
  summary: {
    visitors: number | null
    pageviews: number | null
  }
  trend: Array<{
    date: string
    visitors: number
    pageviews: number
  }>
  topRoutes: Array<{
    route: string
    visitors: number
    pageviews: number
  }>
  topCountries: Array<{
    label: string
    visitors: number
    pageviews: number
  }>
  topDevices: Array<{
    label: string
    visitors: number
    pageviews: number
  }>
  error?: string
}

type VercelCountResponse = {
  data?: {
    visitors?: unknown
    pageviews?: unknown
  }
}

type VercelAggregateRow = {
  timestamp?: unknown
  route?: unknown
  country?: unknown
  deviceType?: unknown
  visitors?: unknown
  pageviews?: unknown
}

type VercelAggregateResponse = {
  data?: VercelAggregateRow[]
}

const VERCEL_ANALYTICS_API = "https://api.vercel.com/v1/query/web-analytics/visits"
const UNKNOWN_LABEL = "Không xác định"
type AnalyticsQuery = "count" | "aggregate"

export function isAnalyticsRange(value: string | null): value is AnalyticsRange {
  return value === "7d" || value === "30d" || value === "90d"
}

export function parseAnalyticsRange(value: string | null): AnalyticsRange {
  return isAnalyticsRange(value) ? value : "30d"
}

function emptyAnalytics(range: AnalyticsRange, configured: boolean): AnalyticsResponse {
  return {
    range,
    configured,
    generatedAt: new Date().toISOString(),
    summary: {
      visitors: null,
      pageviews: null,
    },
    trend: [],
    topRoutes: [],
    topCountries: [],
    topDevices: [],
  }
}

function metric(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0
}

function summaryMetric(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : null
}

function label(value: unknown): string {
  return typeof value === "string" && value.trim() ? value : UNKNOWN_LABEL
}

function dateLabel(value: unknown): string {
  if (typeof value !== "string") return UNKNOWN_LABEL

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? UNKNOWN_LABEL : date.toISOString().slice(0, 10)
}

export function getAnalyticsDateRange(range: AnalyticsRange, now = new Date(), query: AnalyticsQuery = "aggregate") {
  const days = Number.parseInt(range, 10)
  const until = new Date(now)
  if (query === "count") {
    until.setUTCDate(until.getUTCDate() + 1)
    until.setUTCHours(0, 0, 0, 0)
  } else {
    until.setUTCHours(23, 59, 59, 999)
  }

  const since = new Date(now)
  since.setUTCDate(since.getUTCDate() - days + 1)
  since.setUTCHours(0, 0, 0, 0)

  return {
    since: since.toISOString(),
    until: until.toISOString(),
  }
}

function queryParams(range: AnalyticsRange, by?: string, limit?: number, query: AnalyticsQuery = "aggregate") {
  const params = new URLSearchParams({
    projectId: process.env.VERCEL_PROJECT_ID ?? "",
    ...getAnalyticsDateRange(range, new Date(), query),
  })

  if (process.env.VERCEL_TEAM_ID) params.set("teamId", process.env.VERCEL_TEAM_ID)
  if (by) params.set("by", by)
  if (limit) params.set("limit", String(limit))

  return params
}

async function vercelRequest<T>(path: string, range: AnalyticsRange, by?: string, limit?: number): Promise<T> {
  const query = path === "count" ? "count" : "aggregate"
  const response = await fetch(`${VERCEL_ANALYTICS_API}/${path}?${queryParams(range, by, limit, query)}`, {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) throw new Error("Vercel Analytics request failed.")

  return response.json() as Promise<T>
}

function sortByVisitors<T extends { visitors: number; pageviews: number }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => b.visitors - a.visitors || b.pageviews - a.pageviews)
}

export async function getAnalytics(range: AnalyticsRange): Promise<AnalyticsResponse> {
  const configured = Boolean(process.env.VERCEL_TOKEN && process.env.VERCEL_PROJECT_ID)
  const empty = emptyAnalytics(range, configured)

  if (!configured) return empty

  const [count, trend, routes, countries, devices] = await Promise.all([
    vercelRequest<VercelCountResponse>("count", range),
    vercelRequest<VercelAggregateResponse>("aggregate", range, "day", 90),
    vercelRequest<VercelAggregateResponse>("aggregate", range, "route", 8),
    vercelRequest<VercelAggregateResponse>("aggregate", range, "country", 8),
    vercelRequest<VercelAggregateResponse>("aggregate", range, "deviceType", 8),
  ])

  return {
    ...empty,
    summary: {
      visitors: summaryMetric(count.data?.visitors),
      pageviews: summaryMetric(count.data?.pageviews),
    },
    trend: (trend.data ?? [])
      .map((row) => ({
        date: dateLabel(row.timestamp),
        visitors: metric(row.visitors),
        pageviews: metric(row.pageviews),
      }))
      .sort((a, b) => a.date.localeCompare(b.date)),
    topRoutes: sortByVisitors(
      (routes.data ?? []).map((row) => ({
        route: label(row.route),
        visitors: metric(row.visitors),
        pageviews: metric(row.pageviews),
      })),
    ),
    topCountries: sortByVisitors(
      (countries.data ?? []).map((row) => ({
        label: label(row.country),
        visitors: metric(row.visitors),
        pageviews: metric(row.pageviews),
      })),
    ),
    topDevices: sortByVisitors(
      (devices.data ?? []).map((row) => ({
        label: label(row.deviceType),
        visitors: metric(row.visitors),
        pageviews: metric(row.pageviews),
      })),
    ),
  }
}
