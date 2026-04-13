import { test, expect } from '@playwright/test'


test('users list can sort A→Z', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByRole('link', {name: 'Go to Users'}).click()
  await page.getByRole('button', {name: 'Sort A→Z'}).click()
  const nameCells=page.getByRole('table')
  const names=await nameCells.allTextContents()
  const sortedOrder=[...names].sort((a,b)=>a.localeCompare(b))
  expect(names).toEqual(sortedOrder)
})
