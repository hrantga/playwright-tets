import { test, expect } from '@playwright/test'
import {LoginPage} from '../pages/login.page.ts'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  const login= new LoginPage(page)
  await login.goto()
  await login.login('demo','pass123')
  await expect(page).toHaveURL(/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
})
