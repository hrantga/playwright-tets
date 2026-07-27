// Deliberately flaky; candidate should stabilize.
import { test, expect } from '@playwright/test'

test('intentionally failing expectation', async ({ page }) => {
  await page.goto('https://www.google.com/')
  // Wrong expectation on purpose to trigger a failure and generate trace on retry
  //await console.log("url:.. "+page.url())
  await expect(page).toHaveURL("https://www.google.com/")
})
