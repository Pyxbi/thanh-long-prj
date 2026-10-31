import type { Metadata } from "next"
import { AboutPage } from "@/components/about-page"

export const metadata: Metadata = {
  title: "Về chúng tôi — Long Gia",
  description: "Câu chuyện, tầm nhìn và hành trình phát triển của Hưng Thịnh Phát.",
}

export default function Page() {
  return <AboutPage />
}
