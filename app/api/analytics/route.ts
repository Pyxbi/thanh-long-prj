import { NextResponse } from "next/server"

import { getAnalytics, isAnalyticsRange, parseAnalyticsRange } from "@/lib/analytics"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const value = new URL(request.url).searchParams.get("range")

  if (value !== null && !isAnalyticsRange(value)) {
    return NextResponse.json({ error: "Khoảng thời gian không hợp lệ." }, { status: 400 })
  }

  try {
    const analytics = await getAnalytics(parseAnalyticsRange(value))

    return NextResponse.json(analytics, {
      headers: {
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return NextResponse.json({ error: "Không thể tải dữ liệu analytics." }, { status: 500 })
  }
}
