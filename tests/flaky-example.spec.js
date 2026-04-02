import { test, expect } from '@playwright/test'

test.describe("Test the dashboard after logging in", () => {

  test('Login and Verify Dashboard', async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('Username').fill('demo')
    await page.getByLabel('Password').fill('pass123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL(/\/dashboard/)
  })

});
