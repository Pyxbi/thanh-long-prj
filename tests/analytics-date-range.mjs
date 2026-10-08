import assert from "node:assert/strict"
import { test } from "node:test"

const { getAnalyticsDateRange } = await import("../lib/analytics.ts")

test("analytics range includes the current UTC calendar day", () => {
  const range = getAnalyticsDateRange("7d", new Date("2026-10-08T12:40:00.000Z"))

  assert.deepEqual(range, {
    since: "2026-10-02T00:00:00.000Z",
    until: "2026-10-08T23:59:59.999Z",
  })
})

test("analytics count range ends at the next UTC day boundary", () => {
  const range = getAnalyticsDateRange("7d", new Date("2026-10-08T12:40:00.000Z"), "count")

  assert.equal(range.until, "2026-10-09T00:00:00.000Z")
})
