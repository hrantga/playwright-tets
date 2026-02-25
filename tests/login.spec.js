import { test, expect } from '@playwright/test'
import LoginPage from '../pages/LoginPage.js'

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
    const loginPage = new LoginPage(page)

    if (await loginPage.isLoggedIn()) {
      await loginPage.logout()
      await page.waitForLoadState('domcontentloaded')
    }

    await loginPage.login()
    await expect(page).toHaveURL(/\/dashboard/)
    await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
  })
})
