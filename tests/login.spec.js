import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.js'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('demo', 'pass123')
  // await page.goto('/login')
  // await page.getByLabel('Username').fill('demo')
  // await page.getByLabel('Password').fill('pass123')
  // await page.getByRole('button', { name: 'Login' }).click()
  // await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
})
