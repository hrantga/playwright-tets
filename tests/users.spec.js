import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.js'
import {Dashboard} from '../pages/dashboard.js'

// async function login(page) {
//   await page.goto('/login')
//   await page.getByLabel('Username').fill('demo')
//   await page.getByLabel('Password').fill('pass123')
//   await page.getByRole('button', { name: 'Login' }).click()
//   await expect(page).toHaveURL(/\/dashboard$/)
// }

test('users list can sort A→Z', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const dashboard = new Dashboard(page)
  await loginPage.goto()
  await loginPage.login('demo', 'pass123')
  await dashboard.clickOnUsersButton();
  // await login(page)
  // await login(page)
  // await page.getByRole('link', { name: 'Users', exact: true }).click()
  // await expect(page).toHaveURL(/\/users$/)
  // Ensure rows loaded (wait until there are more than 1 row)
  await expect.poll(async () => await page.getByRole('row').count()).toBeGreaterThan(1)
  // Ensure the sort button is visible before clicking
  await expect(page.getByRole('button', { name: 'Sort A→Z' })).toBeVisible()
  await page.getByRole('button', { name: 'Sort A→Z' }).click()

  // Capture first row name and verify alphabetically earliest among visible rows
  const names = await page
    .getByRole('row')
    .locator('td:nth-child(1)')
    .allTextContents()

  expect(names.length).toBeGreaterThan(0)
  const sorted = [...names].sort((a, b) => a.localeCompare(b))
  expect(names[0]).toBe(sorted[0])
})
