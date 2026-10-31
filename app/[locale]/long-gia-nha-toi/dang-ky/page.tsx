import type { Metadata } from "next"
import { LongGiaAuthPage } from "@/components/long-gia-auth"

export const metadata: Metadata = {
  title: "Đăng ký Long Gia Nhà Tôi | Long Gia",
  description: "Tạo tài khoản để bắt đầu hành trình nhận nuôi và theo dõi trụ thanh long.",
}

export default function LongGiaRegisterPage() {
  return <LongGiaAuthPage mode="register" />
}
