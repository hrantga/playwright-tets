import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login'
import {Dashboard} from '../pages/dashboard'

// // Ensure clean state
// async function login(page) {
//   // await page.goto('/login')
//   // await page.getByLabel('Username').fill('demo')
//   // await page.getByLabel('Password').fill('pass123')
//   // await page.getByRole('button', { name: 'Login' }).click()
//   // await expect(page).toHaveURL(/\/dashboard$/)
// }

test('filter posts, verify, and export CSV', async ({ page, context }) => {
  const loginPage = new LoginPage(page)
  const dashboard = new Dashboard(page)
  await loginPage.goto()
  await loginPage.login('demo', 'pass123')
  await dashboard.clickOnPostsButton();
  // await login(page)
  //await page.getByRole('link', { name: 'Posts' }).click() //check name 
  // await expect(page).toHaveURL(/\/posts$/)

  await page.getByPlaceholder('Filter by title').fill('qui')
  const rowWithQui = page.getByRole('row').filter({ hasText: /\bqui\b/i })
  await expect(rowWithQui.first()).toBeVisible()

  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export CSV' }).click(),
  ])
  const path = await download.path()
  expect(path).toBeTruthy()
  const content = await download.createReadStream()
  // Node 18 stream to text
  const chunks = []
  for await (const chunk of content) chunks.push(chunk)
  const csv = Buffer.concat(chunks).toString('utf-8')
  expect(csv.split('\n')[0].trim()).toContain('id,title,body,userId')
})
