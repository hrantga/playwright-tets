import { test, expect } from '@playwright/test'
import { log } from 'node:console';

test.describe("Test the dashboard after logging in", () => {

  test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Username').fill('demo')
    await page.getByLabel('Password').fill('pass123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
  })

});
