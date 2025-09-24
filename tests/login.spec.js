import { test, expect } from '@playwright/test'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  const userName =  page.getByLabel('userName');
  const password =  page.getByLabel('Password')
  const login =     page.getByRole('button', { name: 'Login' })
  expect (login).toBeVisible();
  expect(userName).toBeVisible();
  expect(password).toBeVisible();
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
})
