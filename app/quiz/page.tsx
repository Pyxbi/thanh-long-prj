import { Metadata } from "next";
import { QuizClient } from "./quiz-client";

export const metadata: Metadata = {
  title: "Bí Kíp Sống Trọn Ngày — Trắc nghiệm Long Gia",
  description: "5 câu hỏi nhanh để hiểu hơn về bản thân và nhận ngay 100 điểm thưởng tích lũy cùng Long Gia.",
  openGraph: {
    title: "Bí Kíp Sống Trọn Ngày — Trắc nghiệm Long Gia",
    description: "Bạn là Long Đỏ, Long Trắng hay Long Vàng? Làm trắc nghiệm và nhận 100 điểm thưởng.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function QuizPage() {
  return <QuizClient />;
}
