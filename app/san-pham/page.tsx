import type { Metadata } from "next"
import ProductPage from "@/components/product-page"

export const metadata: Metadata = {
  title: "Sản phẩm — Long Gia",
  description: "Danh mục nông sản sạch và sản phẩm xuất khẩu của Hưng Thịnh Phát.",
}

export default function ProductRoute() {
  return <ProductPage />
}
