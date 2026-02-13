import { test, expect } from '@playwright/test'

test.describe('login',()=>{

  test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
  })

  test('invalid creds',async ({page})=>{
    await page.goto('/login')
    await page.getByLabel('Username').fill('demo1')
    await page.getByLabel('Password').fill('pass123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).not.toHaveURL(/\/dashboard/)
    await expect(await page.locator("[role=alert]").textContent()).toBe('Invalid credentials')
  })
})
