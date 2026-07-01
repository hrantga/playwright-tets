// Deliberately flaky; candidate should stabilize.
import { test, expect } from '@playwright/test'

test('intentionally failing expectation', async ({ page }) => {
  await page.goto('/')
  // Wrong expectation on purpose to trigger a failure and generate trace on retry
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL(/\/dashboard$/)
})
