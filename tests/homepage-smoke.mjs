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
  assert.match(html, /Dừa Nắp Bật/)
  assert.match(html, /Bưởi da xanh/)
  assert.match(html, /\/images\/long-gia-logo\.png/)
  assert.match(html, /\/images\/thanh-vi-xu-tien-banner\.png/)
  assert.match(html, /href="\/ve-chung-toi#cau-chuyen"/)
  assert.doesNotMatch(html, /<h1[^>]*>Nâng tầm trái ngọt/)
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
