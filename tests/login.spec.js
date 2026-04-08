import { test, expect } from '@playwright/test'
import { LoginPage } from "../pages/login.ts"

test('login test user - positive case', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('demo', 'pass123')
  await expect(page).toHaveURL(/\/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
})

test('login test user - negative case 1', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('demo12', 'pass123')
  await loginPage.assertLoginErrorMessage();
})

test('login test user - negative case 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(' ', ' ')
  await loginPage.assertLoginErrorMessage();
})
