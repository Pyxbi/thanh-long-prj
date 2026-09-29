import type { Metadata } from "next"
import { LongGiaNhaToiPage } from "@/components/long-gia-nha-toi-page"

export const metadata: Metadata = {
  title: "Long Gia Nhà Tôi | Long Gia",
  description: "Nhận nuôi một trụ thanh long và theo dõi cả một hành trình.",
}

export default function Page() {
  return <LongGiaNhaToiPage />
}
