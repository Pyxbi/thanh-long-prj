# Long Gia Analytics Dashboard

## Intent

Add a prototype-only internal route at `/dashboard` so the team can see how many people access the Long Gia website without opening the Vercel project dashboard. The route is intentionally unlisted and does not add a full authentication system; this is an internal prototype handoff, not a production admin surface.

## Source of truth

Vercel Web Analytics remains the source of truth. The project already renders `@vercel/analytics/next` from `app/layout.tsx`, so page views and visitors are collected after Web Analytics is enabled for the Vercel project and a deployment is made.

The dashboard reads the Vercel Web Analytics API from a server-side Next.js route. It must never expose `VERCEL_TOKEN` to browser code.

Required Vercel environment variables:

- `VERCEL_TOKEN`
- `VERCEL_PROJECT_ID`
- `VERCEL_TEAM_ID` for team-owned projects

When these variables are missing, the dashboard shows a clear setup state instead of inventing traffic numbers.

## Data contract

`GET /api/analytics?range=7d|30d|90d` returns a normalized response independent of Vercel's raw response shape:

```ts
type AnalyticsResponse = {
  range: "7d" | "30d" | "90d"
  configured: boolean
  generatedAt: string
  summary: {
    visitors: number | null
    pageviews: number | null
  }
  trend: Array<{ date: string; visitors: number; pageviews: number }>
  topRoutes: Array<{ route: string; visitors: number; pageviews: number }>
  topCountries: Array<{ label: string; visitors: number; pageviews: number }>
  topDevices: Array<{ label: string; visitors: number; pageviews: number }>
  error?: string
}
```

The server adapter calls `visits/count` for the selected-range summary and `visits/aggregate` grouped by `day`, `route`, `country`, and `deviceType` for the breakdowns. It uses the same `projectId`, optional `teamId`, and selected date range for each request. Vercel's API returns `pageviews` and `visitors` for the summary and aggregate rows.

## UI design

Reading this as: an internal analytics page for the Long Gia team, with a calm agricultural editorial language, leaning toward warm ivory surfaces, Dragon Berry emphasis, Forest Green supporting data, and restrained chart geometry.

The page uses the existing `SiteHeader` and brand palette, but keeps the public navigation unchanged. The dashboard itself contains:

1. A compact page heading with the current range selector and refresh action.
2. Two primary metrics: `Người truy cập` and `Lượt xem trang`.
3. A lightweight daily trend chart using existing chart primitives where practical.
4. Three readable breakdown sections: `Route phổ biến`, `Nguồn quốc gia`, and `Thiết bị`.
5. A footer note explaining that visitor counts are anonymized Vercel Web Analytics metrics.

Responsive behavior: metrics stack on mobile, the trend remains horizontally readable, and breakdown lists become single-column.

## States

- Loading: skeleton blocks for summary and chart/list regions.
- Config missing: explain the three Vercel environment variables and show a link to Vercel Analytics setup; no fake numbers.
- API error: show a compact retry action and the error state without breaking the public site.
- Empty data: show `Chưa có dữ liệu trong khoảng thời gian này`.

## Scope exclusions

- No database or custom event tracking in this pass.
- No visitor identity, cookies, session replay, or personal information.
- No production-grade authentication or team role management.
- No public navigation link to `/dashboard`.

## Verification

- Build must pass.
- Existing homepage smoke tests must pass.
- Add route/API smoke coverage for configured and missing-configuration states where the current test seam allows it.
- Confirm the Vercel token appears only in server-side code and environment variables.
