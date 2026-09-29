import type { Metadata } from "next"
import ProductPage from "@/components/product-page"

export const metadata: Metadata = {
  title: "Sản phẩm — Long Gia",
  description: "Thanh long và dừa Tiền Giang chuẩn sạch, sẵn sàng cho phân phối và xuất khẩu.",
}

export default function ProductRoute() {
  return <ProductPage />
}
