"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, Facebook, Instagram, Leaf, MapPin, Menu, PackageCheck, ShieldCheck, Truck, X } from "lucide-react"

const products = [
  { name: "Thanh long ruột đỏ", copy: "Giàu chất chống oxy hóa, vị ngọt đậm đà, màu sắc mọng rực rỡ.", image: "https://images.unsplash.com/photo-1582281298055-e25b84a2a3b6?auto=format&fit=crop&w=900&q=85", tone: "bg-[#f2d8df]" },
  { name: "Thanh long vỏ vàng", copy: "Giàu chất xơ, vị ngọt thơm đặc trưng, hỗ trợ tiêu hóa.", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=85", tone: "bg-[#f1e2bf]" },
  { name: "Thanh long ruột trắng", copy: "Giàu chất xơ và vitamin, vị thanh nhẹ, hậu chua dịu.", image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=85", tone: "bg-[#dfe5cd]" },
]

const articles = [
  "Thanh long ruột đỏ Hưng Thịnh Phát: Hành trình nâng tầm trái ngọt miền Tây",
  "Mở rộng thị trường cho trái thanh long",
  "Nhân tố HTX góp phần giúp giảm nhanh tỷ lệ hộ nghèo ở Chợ Gạo",
]

export function LongGiaPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [product, setProduct] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    let current = 0
    let target = 0

    const update = () => {
      current += (target - current) * 0.12
      setScrollProgress(current)
      if (Math.abs(target - current) > 0.001) frame = requestAnimationFrame(update)
    }

    const handleScroll = () => {
      target = Math.min(window.scrollY / 520, 1)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const heroScale = 1 - scrollProgress * 0.12
  const heroRadius = scrollProgress * 28
  const next = () => setProduct((value) => (value + 1) % products.length)
  const previous = () => setProduct((value) => (value - 1 + products.length) % products.length)

  return (
    <div className="min-h-screen overflow-hidden bg-[#f0e8dd] text-[#2d3026]">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 lg:px-8">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between rounded-[20px] border border-white/70 bg-[#fffaf3]/80 px-5 shadow-xl shadow-[#3f3150]/10 backdrop-blur-xl lg:px-7">
          <a href="#trang-chu" className="flex items-center gap-3" aria-label="Long Gia trang chủ">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ba466d] text-white shadow-lg shadow-[#ba466d]/20"><Leaf size={21} /></div>
            <div className="leading-none"><p className="font-serif text-2xl font-semibold tracking-tight text-[#822944]">long gia</p><p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6e8644]">fresh from the delta</p></div>
          </a>
          <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#626751] lg:flex">
            <a className="text-[#822944]" href="#trang-chu">Trang chủ</a><a href="/ve-chung-toi">Về chúng tôi</a><a href="/san-pham">Sản phẩm</a><a href="/long-gia-nha-toi">Long Gia Nhà Tôi</a><a href="/quy-trinh-lien-he">Quy trình & Liên hệ</a><a href="#nang-luc">Vùng trồng & Nhà xưởng</a><a href="#tin-tuc">Tin tức</a>
            <a href="/quy-trinh-lien-he#lien-he" className="rounded-full bg-[#ba466d] px-5 py-3 font-semibold text-white transition hover:bg-[#822944]">Liên hệ <ArrowUpRight className="ml-1 inline" size={14} /></a>
          </nav>
          <button className="rounded-full p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Đóng menu" : "Mở menu"}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="border-t border-[#d8cdbc] bg-[#f0e8dd] px-6 py-5 lg:hidden"><div className="flex flex-col gap-4 text-sm"><a href="#trang-chu" onClick={() => setMenuOpen(false)}>Trang chủ</a><a href="/ve-chung-toi" onClick={() => setMenuOpen(false)}>Về chúng tôi</a><a href="/san-pham" onClick={() => setMenuOpen(false)}>Sản phẩm</a><a href="/long-gia-nha-toi" onClick={() => setMenuOpen(false)}>Long Gia Nhà Tôi</a><a href="/quy-trinh-lien-he" onClick={() => setMenuOpen(false)}>Quy trình & Liên hệ</a><a href="#nang-luc" onClick={() => setMenuOpen(false)}>Vùng trồng & Nhà xưởng</a><a href="#tin-tuc" onClick={() => setMenuOpen(false)}>Tin tức</a><a className="font-semibold text-[#ba466d]" href="/quy-trinh-lien-he#lien-he" onClick={() => setMenuOpen(false)}>Liên hệ</a></div></nav>}
      </header>

      <main id="trang-chu">
        <section
          className="relative isolate mx-auto flex min-h-[1010px] max-w-[1500px] items-start justify-center overflow-hidden px-5 pt-40 lg:px-14 lg:pt-48"
          style={{
            transform: `scale(${heroScale})`,
            transformOrigin: "top center",
            borderRadius: `0 0 ${heroRadius}px ${heroRadius}px`,
            transition: "border-radius 80ms linear",
          }}
        >
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#cfd0df_0%,#eadde0_33%,#ffd6bd_56%,#a9d6df_57%,#9ec8d0_100%)]" />
          <img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=90" alt="" aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[64%] w-full object-cover object-bottom opacity-95 transition-transform duration-75" style={{ transform: `scale(${1 + scrollProgress * 0.08})` }} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/10 via-transparent to-[#5b3c36]/25" />
          <div className="relative z-10 max-w-5xl text-center"><p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#822944]">Hương vị từ miền đất lành</p><h1 className="font-serif text-[clamp(3.8rem,8vw,8.5rem)] leading-[0.86] tracking-[-0.065em] text-[#171316]">Nâng tầm trái ngọt<br /><em className="font-normal text-[#822944]">xứ Tiền</em></h1><p className="mx-auto mt-7 max-w-md text-sm leading-6 text-[#403b35]">Thanh long sạch, tươi ngon và đầy tự hào Việt Nam — từ vùng trồng địa phương đến thị trường toàn cầu.</p></div>
          <div className="absolute inset-x-0 bottom-[-10px] z-10 whitespace-nowrap text-center font-sans text-[clamp(8rem,23vw,27rem)] font-black leading-[0.72] tracking-[-0.1em] text-white/90">LONG GIA</div>
          <div className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 rounded-full border border-white/70 bg-[#fffaf3]/85 px-5 py-3 text-center shadow-xl backdrop-blur sm:block"><p className="text-2xl font-serif text-[#ba466d]">115 <span className="text-sm">ha</span></p><p className="text-[10px] uppercase tracking-[0.14em] text-[#626751]">vùng trồng liên kết</p></div>
        </section>

        <section id="ve-chung-toi" className="bg-[#fffaf3] px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ba466d]">01 — Tổng quan thương hiệu</p><h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight text-[#822944] sm:text-5xl">Một hành trình<br /><em className="font-normal text-[#6e8644]">từ niềm tin</em></h2><p className="mt-7 max-w-lg leading-7 text-[#626751]">Đồng hành cùng người nông dân chăm sóc từng gốc thanh long trên 115 ha vùng trồng đạt chuẩn GLOBALG.A.P., Hưng Thịnh Phát hướng đến cung cấp nông sản sạch, ổn định và sẵn sàng cho thị trường nội đ���a lẫn quốc tế.</p><a href="#lien-he" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#ba466d]">Xem chi tiết về Hưng Thịnh Phát <ArrowUpRight size={16} /></a></div><div className="grid gap-3 sm:grid-cols-2"><InfoCard title="Tên đơn vị" text="Hợp tác xã Nông nghiệp sạch Hưng Thịnh Phát" icon={<Leaf />} /><InfoCard title="Địa chỉ trụ sở" text="Huyện Chợ Gạo, Tỉnh Tiền Giang, Việt Nam" icon={<MapPin />} /><InfoCard title="Sản phẩm chính" text="Thanh long, dừa tươi & nông sản nhiệt đới" icon={<PackageCheck />} /><InfoCard title="Năm thành lập" text="2021" icon={<span className="font-serif text-2xl">21</span>} /></div></div></section>

        <section id="san-pham" className="px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ba466d]">02 — Tuyển chọn từ vùng trồng</p><h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-[#822944] sm:text-5xl">Nông sản tươi<br /><em className="font-normal text-[#6e8644]">chuẩn sạch</em></h2></div><div className="flex gap-2"><button onClick={previous} className="rounded-full border border-[#d4c7b8] p-3 transition hover:bg-white" aria-label="Sản phẩm trước"><ChevronLeft size={19} /></button><button onClick={next} className="rounded-full bg-[#822944] p-3 text-white transition hover:bg-[#ba466d]" aria-label="Sản phẩm tiếp theo"><ChevronRight size={19} /></button></div></div><p className="mt-6 max-w-xl text-[#626751]">Thanh long tươi ngon được tuyển chọn kỹ lưỡng, đáp ứng các tiêu chí khắt khe về an toàn thực phẩm và kiểm dịch quốc tế.</p><div className="mt-12 grid gap-5 md:grid-cols-3">{products.map((item, index) => <article key={item.name} className={`group overflow-hidden rounded-[28px] ${index === product ? "ring-2 ring-[#ba466d]" : ""} bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl`}><div className={`h-64 overflow-hidden ${item.tone}`}><img src={item.image} alt={item.name} className="h-full w-full object-cover mix-blend-multiply transition duration-700 group-hover:scale-105" /></div><div className="p-6"><div className="mb-4 flex items-start justify-between"><h3 className="font-serif text-2xl text-[#822944]">{item.name}</h3><span className="rounded-full bg-[#f0e8dd] px-2 py-1 text-xs text-[#ba466d]">0{index + 1}</span></div><p className="text-sm leading-6 text-[#626751]">{item.copy}</p><a href="#lien-he" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#ba466d]">Xem chi tiết <ArrowUpRight size={15} /></a></div></article>)}</div></div></section>

        <section id="nang-luc" className="bg-[#6e8644] px-5 py-24 text-[#fffaf3] lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8cda8]">03 — Năng lực vận hành</p><h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Vì sao đối tác<br /><em className="font-normal text-[#e8cda8]">tin tưởng HTP?</em></h2><p className="mt-7 max-w-md leading-7 text-[#e9eed9]/80">Từ vùng trồng đến nhà xưởng sơ chế chuẩn HACCP, chúng tôi tạo nên một chuỗi cung ứng khép kín và đáng tin cậy.</p></div><div className="grid gap-4 sm:grid-cols-2"><Pillar icon={<ShieldCheck />} title="Sản phẩm" text="GLOBALG.A.P., VietGAP, OCOP 4 sao và Mai An Tiêm 2024." /><Pillar icon={<MapPin />} title="Vùng trồng & xưởng" text="115 ha vùng trồng liên kết cùng nhà xưởng 2.500 m²." /><Pillar icon={<Truck />} title="Giá cả" text="Cung ứng trực tiếp, tối ưu cho đơn hàng sỉ và xuất khẩu." /><Pillar icon={<PackageCheck />} title="Đóng gói & ODM" text="HACCP Codex 2020, nhận gia công theo yêu cầu." /></div></div></div></section>

        <section className="bg-[#fffaf3] px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2"><div className="relative min-h-[430px] overflow-hidden rounded-[32px]"><img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=85" alt="Nông dân chăm sóc vùng trồng" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute bottom-5 left-5 rounded-2xl bg-[#fffaf3]/90 p-5 backdrop-blur"><p className="font-serif text-3xl text-[#822944]">2.500 m²</p><p className="text-xs text-[#626751]">nhà xưởng sơ chế</p></div></div><div className="relative min-h-[430px] overflow-hidden rounded-[32px]"><img src="https://images.unsplash.com/photo-1586528116493-da8b5f1b4b1f?auto=format&fit=crop&w=1000&q=85" alt="Đóng gói nông sản xuất khẩu" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[#822944]/90 p-5 text-white backdrop-blur"><p className="font-serif text-3xl">Từ gốc đến tay</p><p className="text-xs text-white/70">Đóng gói đạt chuẩn xuất khẩu · Kho lạnh công suất lớn</p></div></div></div></section>

        <section id="tin-tuc" className="px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ba466d]">04 — Tin tức & báo chí</p><div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><h2 className="max-w-xl font-serif text-4xl leading-tight text-[#822944] sm:text-5xl">Câu chuyện về<br /><em className="font-normal text-[#6e8644]">trái ngọt Việt Nam</em></h2><a href="#lien-he" className="text-sm font-bold text-[#ba466d]">Xem tất cả bài viết <ArrowUpRight className="ml-1 inline" size={15} /></a></div><div className="mt-12 grid gap-5 md:grid-cols-3">{articles.map((title, index) => <article key={title} className="group border-t border-[#cfc3b5] pt-5"><p className="text-xs font-semibold text-[#ba466d]">0{index + 1} / 09.2024</p><h3 className="mt-5 font-serif text-2xl leading-snug text-[#822944] transition group-hover:text-[#ba466d]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#626751]">Cập nhật hành trình phát triển và những dấu ấn mới của HTX Hưng Thịnh Phát.</p><a href="#lien-he" className="mt-5 inline-flex text-sm font-bold text-[#2d3026]">Xem thêm <ArrowUpRight className="ml-2" size={15} /></a></article>)}</div></div></section>

        <section id="lien-he" className="bg-[#ba466d] px-5 py-24 text-center text-white lg:px-8 lg:py-28"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f5d9df]">Kết nối cùng Long Gia</p><h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">Phát triển nguồn cung<br /><em className="font-normal text-[#f7dfbd]">chất lượng cao</em></h2><p className="mx-auto mt-6 max-w-lg leading-7 text-white/75">Hãy để chúng tôi đồng hành cùng bạn trên hành trình đưa nông sản Việt vươn xa.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="mailto:hoptacxanongnghiepsachhungthinhphat@gmail.com" className="rounded-full bg-[#fffaf3] px-7 py-3.5 text-sm font-bold text-[#822944] transition hover:bg-[#e8cda8]">Nhận báo giá sỉ</a><a href="tel:0919831055" className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">Liên hệ tư vấn</a></div></section>
      </main>

      <footer className="bg-[#822944] px-5 py-16 text-white lg:px-8"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.5fr_1fr_1fr]"><div><p className="font-serif text-3xl">long gia</p><p className="mt-5 max-w-sm text-sm leading-6 text-white/65">Hợp tác xã Nông nghiệp sạch Hưng Thịnh Phát</p><p className="mt-5 max-w-sm text-xs leading-6 text-white/55">Thửa 154, Ấp Long Thạnh, Xã Tân Thuận Bình, Huyện Chợ Gạo, Tiền Giang<br />Hotline: 0919 831 055<br />hoptacxanongnghiepsachhungthinhphat@gmail.com</p></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8cda8]">Liên kết hệ thống</p><div className="mt-5 flex flex-col gap-3 text-sm text-white/65"><a href="#trang-chu">Trang chủ</a><a href="#ve-chung-toi">Về chúng tôi</a><a href="#san-pham">Sản phẩm</a><a href="#nang-luc">Chứng nhận & Năng lực</a><a href="#tin-tuc">Tin tức & Truyền thông</a></div></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8cda8]">Kênh kết nối</p><div className="mt-5 flex gap-3"><a className="rounded-full border border-white/20 p-3" href="#lien-he" aria-label="Facebook"><Facebook size={17} /></a><a className="rounded-full border border-white/20 p-3" href="#lien-he" aria-label="Instagram"><Instagram size={17} /></a><a className="rounded-full border border-white/20 px-4 py-3 text-xs font-bold" href="#lien-he">Zalo</a></div></div></div><div className="mx-auto mt-12 max-w-7xl border-t border-white/15 pt-5 text-xs text-white/45">© 2024 Long Gia · Hưng Thịnh Phát. Nâng tầm trái ngọt xứ Tiền.</div></footer>
    </div>
  )
}

function InfoCard({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) { return <div className="rounded-2xl border border-[#ded3c6] bg-[#f0e8dd]/45 p-5"><div className="flex items-center justify-between text-[#ba466d]"><p className="text-[10px] font-bold uppercase tracking-[0.16em]">{title}</p><span>{icon}</span></div><p className="mt-5 font-serif text-lg leading-snug text-[#822944]">{text}</p></div> }
function Pillar({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/15"><div className="text-[#e8cda8]">{icon}</div><h3 className="mt-6 font-serif text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></div> }

