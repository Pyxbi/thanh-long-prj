import type { Metadata } from "next"

import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export const metadata: Metadata = {
  title: "Analytics Long Gia — Dashboard",
  description: "Bảng theo dõi truy cập nội bộ cho website Long Gia.",
}

export default function DashboardPage() {
  return <AnalyticsDashboard />
}
