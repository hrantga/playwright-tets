import { test, expect } from '@playwright/test'

// Ensure clean state
async function login(page) {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
}

test('filter posts, verify, and export CSV', async ({ page, context }) => {
  await login(page)
  await page.getByRole('link', { name: 'Posts', exact: true }).click()
  await expect(page).toHaveURL(/\/posts$/)

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

test('Check Go to Posts button click', async ({ page, context }) => {
  await login(page)
  await page.getByRole('link', { name: 'Go to Posts', exact: true }).click()
  await expect(page).toHaveURL(/\/posts$/)

})

test('Test Click on View Button in Post', async ({ page, context }) => {
  await login(page)
  await page.getByRole('link', { name: 'Go to Posts', exact: true }).click()
  await expect(page).toHaveURL(/\/posts$/)
  await page.getByRole("button",{name: "view"}).first().click()
  await expect(page.getByText('Post #1')).toBeVisible()
  await page.getByRole("button",{name: "close"}).click()
  await expect(page).toHaveURL(/\/posts$/)
})

test('Check Go to Dashboard from post page', async ({ page, context }) => {
  await login(page)
  await page.getByRole('link', { name: 'Go to Posts', exact: true }).click()
  await expect(page).toHaveURL(/\/posts$/)
  await page.getByRole('link', { name: 'Dashboard', exact: true }).click()
  await expect(page).toHaveURL(/\/dashboard$/)

})

test('filter posts with invalid data', async ({ page, context }) => {
  await login(page)
  await page.getByRole('link', { name: 'Posts', exact: true }).click()
  await expect(page).toHaveURL(/\/posts$/)

  await page.getByPlaceholder('Filter by title').fill('test')
  const visibleRows = page.getByRole('row').filter({ hasText: /./ })
  await expect(visibleRows).toHaveCount(1)
})
