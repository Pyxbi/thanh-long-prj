import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"

async function loadPage(path = "") {
  const response = await fetch(`${process.env.HOME_URL ?? "http://127.0.0.1:3002"}${path}`)
  assert.equal(response.status, 200)
  return response.text()
}

async function loadJson(path) {
  const response = await fetch(`${process.env.HOME_URL ?? "http://127.0.0.1:3002"}${path}`)
  return { response, body: await response.json() }
}

test("homepage exposes the requested brand navigation and overview CTA", async () => {
  const html = await loadPage()
  assert.match(html, /Câu chuyện thương hiệu/)
  assert.match(html, /Thanh long ruột đỏ/)
  assert.match(html, /Dừa Kim Cương/)
  assert.match(html, /Dừa nhấn nút/)
  assert.match(html, /Bưởi Da Xanh/)
  assert.match(html, /\/images\/long-gia-logo\.png/)
  assert.match(html, /\/images\/thanh-vi-xu-tien-banner\.png/)
  assert.match(html, /href="\/ve-chung-toi#cau-chuyen"/)
  assert.doesNotMatch(html, /01 — Tổng quan thương hiệu|02 — Tuyển chọn từ vùng trồng|03 — Năng lực vận hành|04 — Tin tức & báo chí/)
  assert.doesNotMatch(html, /<h1[^>]*>Nâng tầm trái ngọt/)
})

test("homepage exposes the approved contact, social, product, and press links", async () => {
  const html = await loadPage()

  assert.doesNotMatch(html, />115 <span/i)
  assert.match(html, />Liên hệ hợp tác</)
  assert.doesNotMatch(html, />Nhận báo giá sỉ</)
  assert.doesNotMatch(html, />Liên hệ tư vấn</)
  assert.match(html, /Dừa kim cương/)
  assert.match(html, /Dừa nhấn nút/)
  assert.match(html, /https:\/\/www\.tiktok\.com\/@thanh\.long\.long\.g/)
  assert.match(html, /\/images\/long-gia-mascot\.png/)
  assert.doesNotMatch(html, /Instagram/)
  assert.match(html, /https:\/\/www\.facebook\.com\/profile\.php\?id=61593802211142/)
  assert.match(html, /https:\/\/zalo\.me\/0919831055/)
  assert.match(html, /https:\/\/vnbusiness\.vn\/thanh-long-ruot-do-hung-thinh-phat-hanh-trinh-nang-tam-trai-ngot-mien-tay\.html/)
  assert.match(html, /https:\/\/baodongthap\.vn\/mo-rong-thi-truong-cho-trai-thanh-long-a100286\.html/)
  assert.match(html, /https:\/\/vnbusiness\.vn\/nhan-to-htx-gop-phan-giup-giam-nhanh-ty-le-ho-ngheo-o-cho-gao\.html/)
})

test("homepage uses the supplied dragon fruit images", async () => {
  const html = await loadPage()

  assert.match(html, /\/images\/thanh-long-ruot-do\.png/)
  assert.match(html, /\/images\/thanh-long-vo-vang\.png/)
  assert.match(html, /\/images\/thanh-long-ruot-trang\.png/)
})

test("homepage hero uses a mobile-safe background frame", async () => {
  const html = await loadPage()
  const hero = html.match(/<section[^>]*data-testid="homepage-hero"[\s\S]*?<\/section>/)?.[0]

  assert.ok(hero, "homepage hero is missing")
  assert.match(hero, /min-h-\[540px\]/)
  assert.match(hero, /object-center/)
})

test("homepage uses the supplied coconut and pomelo images and descriptions", async () => {
  const html = await loadPage()

  assert.match(html, /\/images\/dua-kim-cuong-transparent\.png/)
  assert.match(html, /\/images\/dua-nhan-nut-transparent\.png/)
  assert.match(html, /\/images\/buoi-da-xanh-transparent\.png/)
  assert.match(html, /Giàu nước và khoáng chất/)
  assert.match(html, /Giàu vitamin và chất chống oxy hóa/)
  assert.match(html, /Giàu vitamin C và chất xơ/)
})

test("operations section uses the supplied orchard background", async () => {
  const html = await loadPage()

  assert.match(html, /\/images\/nang-luc-bg\.jpg/)
})

test("operations gallery uses the supplied factory and packing images", async () => {
  const html = await loadPage()

  assert.match(html, /\/images\/nha-xuong-so-che\.png/)
  assert.match(html, /\/images\/dong-goi-nong-san\.png/)
})

test("about page shows the supplied history images and detailed milestones", async () => {
  const html = await loadPage("/ve-chung-toi")

  assert.match(html, /\/images\/about-letter-orchard\.jpg/)
  assert.match(html, /\/images\/milestone-2021\.jpg/)
  assert.match(html, /\/images\/milestone-2023\.jpg/)
  assert.match(html, /\/images\/milestone-2025\.jpg/)
  assert.match(html, /1201647060/)
  assert.match(html, /052\/2022\/NNPTNT-TG/)
  assert.match(html, /203 tỷ đồng\/năm/)
  assert.match(html, /gần 115 ha/)
  assert.match(html, /thiết bị đông lạnh nông sản/)
})

test("about page decorates the values section with both supplied mascots", async () => {
  const html = await loadPage("/ve-chung-toi")

  assert.match(html, /\/images\/value-mascot-red\.png/)
  assert.match(html, /\/images\/value-mascot-white\.png/)
})

test("Long Gia Nhà Tôi is publicly viewable without an auth gate", async () => {
  const html = await loadPage("/long-gia-nha-toi")

  assert.match(html, /\/images\/long-gia-pillar\.jpg/)
  assert.match(html, /Bản Đồ Trụ Thanh Long/)
  assert.match(html, /Đăng Ký Nhận Nuôi/)
  assert.doesNotMatch(html, /Prototype đăng nhập/)
})

test("every page uses the shared Long Gia navigation and footer", async () => {
  for (const path of ["/", "/ve-chung-toi", "/san-pham", "/quy-trinh-lien-he", "/long-gia-nha-toi"]) {
    const html = await loadPage(path)
    const nav = html.match(/<nav aria-label="Điều hướng chính"[\s\S]*?<\/nav>/)?.[0]
    assert.ok(nav, `${path} is missing the shared navigation`)
    assert.match(nav, /href="\/long-gia-nha-toi"[^>]*>Vùng trồng &amp; Nhà xưởng/)
    assert.match(nav, /Tin tức &amp; Báo chí/)
    assert.doesNotMatch(nav, />Long Gia Nhà Tôi</)
    assert.doesNotMatch(nav, />Quy trình &amp; Liên hệ</)
    assert.match(html, /\/images\/hung-thinh-phat-logo\.png/)
    assert.match(html, /HưngThịnhPhát/)
    assert.match(html, /trungquy077@gmail\.com/)
    assert.doesNotMatch(html, /hoptacxanongnghiepsachhungthinhphat@gmail\.com/)
    assert.match(html, /Hợp tác xã Nông nghiệp sạch Hưng Thịnh Phát/)
  }
})

test("all public routes render their own page", async () => {
  const pages = [
    ["/san-pham", "Sản phẩm Long Gia"],
    ["/quy-trinh-lien-he", "Quy trình sơ chế"],
    ["/quiz", "Bí Kíp Sống Trọn Ngày"],
    ["/long-gia-nha-toi/dang-ky", "Tạo tài khoản Long Gia"],
  ]

  for (const [path, heading] of pages) {
    const html = await loadPage(path)
    assert.match(html, new RegExp(heading))
  }
})

test("analytics dashboard is available without being added to public navigation", async () => {
  const html = await loadPage("/dashboard")
  const nav = html.match(/<nav aria-label="Điều hướng chính"[\s\S]*?<\/nav>/)?.[0]

  assert.match(html, /data-testid="analytics-dashboard"/)
  assert.match(html, /Bảng theo dõi truy cập/)
  assert.doesNotMatch(html, /được tổng hợp bởi Vercel Web Analytics/)
  assert.ok(nav, "dashboard is missing the shared navigation")
  assert.doesNotMatch(nav, /\/dashboard/)
})

test("analytics API rejects invalid ranges without contacting the provider", async () => {
  const invalid = await loadJson("/api/analytics?range=bad")

  assert.equal(invalid.response.status, 400)
  assert.equal(invalid.body.error, "Khoảng thời gian không hợp lệ.")
})

test("analytics API exposes a deterministic setup state when Vercel is not configured", async () => {
  const setup = await loadJson("/api/analytics?range=7d")

  assert.equal(setup.response.status, 200)
  assert.equal(setup.body.configured, false)
  assert.equal(setup.body.range, "7d")
})

test("quiz CTA stays in the quiz flow instead of routing to the farm page", async () => {
  const html = await loadPage("/quiz")

  assert.match(html, /<button[^>]*>Làm Trắc Nghiệm Ngay/)
  assert.doesNotMatch(html, /href="\/long-gia-nha-toi"[^>]*>Làm Trắc Nghiệm Ngay/)
})

test("Long Gia Nhà Tôi keeps its public content available when signed out", async () => {
  const html = await loadPage("/long-gia-nha-toi")

  assert.match(html, /Nhận Nuôi Một Trụ Thanh Long/)
  assert.doesNotMatch(html, /Bạn chưa đăng nhập\?|Đăng nhập/)
  assert.match(html, /Vùng trồng &amp; Nhà xưởng/)
})

test("Long Gia Nhà Tôi exposes a registration page", async () => {
  const html = await loadPage("/long-gia-nha-toi/dang-ky")

  assert.match(html, /Tạo tài khoản Long Gia/)
  assert.match(html, /Họ và tên/)
  assert.match(html, /Số điện thoại \/ Zalo/)
})

test("quiz landing uses the illustrated orchard background and red mascot", async () => {
  const html = await loadPage("/quiz")

  assert.match(html, /\/images\/quiz-hero-bg\.png/)
  assert.match(html, /\/images\/mascot-red-transparent\.png/)
  assert.match(html, /Bí Kíp Sống Trọn Ngày/)
  assert.match(html, /min-h-\[100dvh\]/)
})

test("quiz landing closes the hero flush with the footer", async () => {
  const html = await loadPage("/quiz")
  const main = html.match(/<main[^>]*data-testid="quiz-main"[^>]*>/)?.[0]

  assert.ok(main, "quiz main is missing")
  assert.match(main, /pb-0/)
  assert.doesNotMatch(main, /pb-12|pb-20/)
})

test("quiz does not render color dots or selection icons", async () => {
  const html = await loadPage("/quiz")
  const source = await readFile(new URL("../app/quiz/quiz-client.tsx", import.meta.url), "utf8")

  assert.doesNotMatch(html, /h-3 w-3 rounded-full/)
  assert.doesNotMatch(source, /accent\[c\]\.dot/)
  assert.doesNotMatch(source, /<Check/)
})

test("quiz rewards accumulate for the signed-in account", async () => {
  const quizSource = await readFile(new URL("../app/quiz/quiz-client.tsx", import.meta.url), "utf8")
  const authSource = await readFile(new URL("../components/long-gia-auth.tsx", import.meta.url), "utf8")

  assert.match(authSource, /LONG_GIA_POINTS_KEY/)
  assert.match(authSource, /addLongGiaPoints/)
  assert.match(quizSource, /addLongGiaPoints/)
  assert.doesNotMatch(quizSource, /MOCK_PREV_POINTS/)
})

test("product page uses homepage product imagery", async () => {
  const html = await loadPage("/san-pham")

  assert.match(html, /\/images\/product-red-htp-transparent\.png/)
  assert.match(html, /\/images\/thanh-long-vo-vang\.png/)
  assert.match(html, /\/images\/thanh-long-ruot-trang\.png/)
  assert.match(html, /\/images\/dua-kim-cuong-transparent\.png/)
  assert.match(html, /\/images\/dua-nhan-nut-transparent\.png/)
  assert.match(html, /\/images\/buoi-da-xanh-transparent\.png/)
  assert.match(html, /Bưởi Da Xanh/)
})
