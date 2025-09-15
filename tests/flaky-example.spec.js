// Deliberately flaky; candidate should stabilize.
import { test, expect } from '@playwright/test'

test('intentionally failing expectation', async ({ page }) => {
  await page.goto('/')
    console.log(await page.url());

  // Wrong expectation on purpose to trigger a failure and generate trace on retry
  await expect(page).toHaveURL(/\/login$/)
    console.log(await page.url());

})
