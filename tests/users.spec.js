import { test, expect } from '@playwright/test'

async function login(page) {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
}

test('users list can sort A→Z', async ({ page }) => {
  await login(page)
  await page.getByRole('link', { name: 'Users', exact: true }).click()
  await expect(page).toHaveURL(/\/users$/)
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

test('Check Go to Users button', async ({ page }) => {
  await login(page)
  await page.getByRole('link', { name: 'Go to Users', exact: true }).click()
  await expect(page).toHaveURL(/\/users$/)
})

test('Test Click on View Button in User', async ({ page, context }) => {
  await login(page)
  await page.getByRole('link', { name: 'Go to Users', exact: true }).click()
  await expect(page).toHaveURL(/\/users$/)
  await page.getByRole("button",{name: "view"}).first().click()
  await page.getByRole("button",{name: "close"}).click()
  await expect(page).toHaveURL(/\/users$/)
})

test('Check Go to Dashboard from users page', async ({ page, context }) => {
  await login(page)
  await page.getByRole('link', { name: 'Go to Users', exact: true }).click()
  await expect(page).toHaveURL(/\/users$/)
  await page.getByRole('link', { name: 'Dashboard', exact: true }).click()
  await expect(page).toHaveURL(/\/dashboard$/)

})

