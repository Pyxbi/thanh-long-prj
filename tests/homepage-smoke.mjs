import assert from "node:assert/strict"
import { test } from "node:test"

async function loadPage(path = "") {
  const response = await fetch(`${process.env.HOME_URL ?? "http://127.0.0.1:3002"}${path}`)
  assert.equal(response.status, 200)
  return response.text()
}

test("homepage exposes the requested brand navigation and overview CTA", async () => {
  const html = await loadPage()
  assert.match(html, /Câu chuyện thương hiệu/)
  assert.match(html, /Thanh long ruột đỏ/)
  assert.match(html, /Dừa Kim Cương/)
  assert.match(html, /Dừa nhấn nút/)
  assert.match(html, /Bưởi da xanh/)
  assert.match(html, /\/images\/long-gia-logo\.png/)
  assert.match(html, /\/images\/thanh-vi-xu-tien-banner\.png/)
  assert.match(html, /href="\/ve-chung-toi#cau-chuyen"/)
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

test("operations section uses the supplied orchard background", async () => {
  const html = await loadPage()

  assert.match(html, /\/images\/nang-luc-bg\.jpg/)
})

test("operations gallery uses the supplied factory and packing images", async () => {
  const html = await loadPage()

  assert.match(html, /\/images\/nha-xuong-so-che\.png/)
  assert.match(html, /\/images\/dong-goi-nong-san\.png/)
})

test("about page shows the supplied letter image", async () => {
  const html = await loadPage("/ve-chung-toi")

  assert.match(html, /\/images\/thu-ngo\.png/)
})

test("growing journey uses the supplied field photos", async () => {
  const html = await loadPage("/long-gia-nha-toi")

  assert.match(html, /\/images\/long-gia-pillar\.jpg/)
  assert.match(html, /\/images\/stage-01-lighting\.jpg/)
  assert.match(html, /\/images\/stage-02-pruning\.jpg/)
  assert.ok(html.match(/\/images\/stage-02-pruning\.jpg/g)?.length >= 2)
  assert.ok(html.match(/\/images\/stage-03-04\.jpg/g)?.length >= 2)
})

test("garden cards use the supplied alternating cultivation photos", async () => {
  const html = await loadPage("/long-gia-nha-toi")

  assert.ok(html.match(/\/images\/garden-fruit-closeup\.jpg/g)?.length >= 3)
  assert.ok(html.match(/\/images\/garden-fruit-cluster\.jpg/g)?.length >= 3)
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
    assert.match(html, /Hợp tác xã Nông nghiệp sạch Hưng Thịnh Phát/)
  }
})

test("unfinished demo pages redirect to the homepage", async () => {
  for (const path of ["/san-pham", "/quy-trinh-lien-he"]) {
    const response = await fetch(`${process.env.HOME_URL ?? "http://127.0.0.1:3002"}${path}`)
    assert.equal(response.redirected, true, `${path} should redirect`)
    assert.equal(new URL(response.url).pathname, "/")
  }
})
