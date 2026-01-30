import { test, expect } from '@playwright/test'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
})

test('invalid login shows error message', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('wronguser')
  await page.getByLabel('Password').fill('wrongpass')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page.getByText('Invalid credentials')).toBeVisible()
})