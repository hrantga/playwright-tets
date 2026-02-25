import { test, expect } from '@playwright/test'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {

  if(await page.locator("//button[text()='Logout']").isVisible())
       page.locator("//button[text()='Logout']").click();

  // Intention is if new changes effected the login functionality, i need to check either user capable login, so added logout script to check this.
  
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await page.waitForLoadState("domcontentloaded")
  await expect(page).toHaveURL(/\/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
})
