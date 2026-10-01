import { Facebook, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#822944] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl">Long Gia</p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">Hợp tác xã Nông nghiệp sạch Hưng Thịnh Phát</p>
          <p className="mt-5 max-w-sm text-xs leading-6 text-white/55">Thửa 154, Ấp Long Thạnh, Xã Tân Thuận Bình, Huyện Chợ Gạo, Tiền Giang<br />Hotline: 0919 831 055<br />hoptacxanongnghiepsachhungthinhphat@gmail.com</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8cda8]">Liên kết hệ thống</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/65"><a href="/">Trang chủ</a><a href="/ve-chung-toi">Về chúng tôi</a><a href="/san-pham">Sản phẩm</a><a href="/long-gia-nha-toi">Vùng trồng & Nhà xưởng</a><a href="/#tin-tuc">Tin tức & Báo chí</a></div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8cda8]">Kênh kết nối</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-white/70">
            <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://www.facebook.com/profile.php?id=61593802211142&utm_source=gemini" target="_blank" rel="noreferrer"><Facebook size={17} />Fanpage HTX Nông Nghiệp Sạch Hưng Thịnh Phát</a>
            <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://www.tiktok.com/@thanh.long.long.g" target="_blank" rel="noreferrer">TikTok</a>
            <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://zalo.me/0919831055" target="_blank" rel="noreferrer"><MessageCircle size={17} />Zalo Báo giá / Hotline 0919 831 055</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/15 pt-5 text-xs text-white/45">© 2024 Long Gia · Hưng Thịnh Phát. Nâng tầm trái ngọt xứ Tiền.</div>
    </footer>
  )
}
