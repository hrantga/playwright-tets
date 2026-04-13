import { test, expect } from '@playwright/test'

test('filter posts, verify, and export CSV', async ({ page, context }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByRole('link', {name: 'Go to Posts'}).click()
  await page.getByPlaceholder('Filter by title').fill('qui est esse')
  const downloadCsv=page.waitForEvent('download')
  await page.getByRole('button', {name:'Export CSV'}).click()
  const downloadFile=await downloadCsv
  expect(downloadFile.suggestedFilename()).toContain('posts.csv')
})
