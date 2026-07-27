import { test, expect } from '@playwright/test'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  //await console.log("url:.. "+page.url())
  await expect(page).toHaveURL("http://localhost:5173/dashboard")
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()

  //validate filter button in Go to posts
await page.getByText('Go to Posts').click()
await expect(page.getByPlaceholder('Filter by title')).toBeVisible()

await page.getByPlaceholder('Filter by title').fill('sunt')

await expect(page.getByText('View')).toBeVisible().click
await expect(page.getByLabel('Close')).toBeVisible().click()


//Download the file
const downloadPromise = page.waitForEvent('download')
await page.getByLabel('Export CSV').click() 
const download = await downloadPromise
await download.saveAs('downloads/${download.suggestedFilename()}')

})


