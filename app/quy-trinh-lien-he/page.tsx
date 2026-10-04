import type { Metadata } from "next"
import { ProcessContactPage } from "@/components/process-contact-page"

export const metadata: Metadata = {
  title: "Quy trình & Liên hệ — Long Gia",
  description: "Quy trình sơ chế, đóng gói và thông tin liên hệ hợp tác của Hưng Thịnh Phát.",
}

export default function ProcessContactRoute() {
  return <ProcessContactPage />
}
