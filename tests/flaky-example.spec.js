// Deliberately flaky; candidate should stabilize.
import { test, expect } from '@playwright/test'

test('intentionally failing expectation', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  // Wrong expectation on purpose to trigger a failure and generate trace on retry
  await expect(page).toHaveURL("http://localhost:5173/login")
})
