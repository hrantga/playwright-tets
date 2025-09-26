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
  //await page.getByRole('link', { name: 'Posts' }).click()
  await page.click("//a[text()='Posts']")
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

test('filter posts by clicking Go to posts, verify, and export CSV', async ({ page, context }) => {
  await login(page)
  //await page.getByRole('link', { name: 'Posts' }).click()
  await page.click("//a[text()='Go to Posts']")
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

test('filter posts with not exist data, verify, and export CSV', async ({ page, context }) => {
  await login(page)
  await page.click("//a[text()='Posts']")
  await expect(page).toHaveURL(/\/posts$/)

  await page.getByPlaceholder('Filter by title').fill('abc')
  const rowWithQui = page.getByRole('row').filter({ hasText: /\babc\b/i })
  await expect(rowWithQui.first()).not.toBeVisible()

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

test('filter posts, click view , and validate data', async ({ page, context }) => {
  await login(page)
  await page.click("//a[text()='Posts']")
  await expect(page).toHaveURL(/\/posts$/)

  await page.click("//tr[1]/td/button[text()='View']")

 const titlelOcator = await page.locator("//div/h1[text()='Posts']/parent::div/child::aside/descendant::p[1]")
 const bodylOcator = await page.locator("//div/h1[text()='Posts']/parent::div/child::aside/descendant::p[2]")
 const userIdlOcator = await page.locator("//div/h1[text()='Posts']/parent::div/child::aside/descendant::p[2]")
 await expect(titlelOcator).toBeVisible()
 await expect(bodylOcator).toBeVisible()
 await expect(userIdlOcator).toBeVisible()
 
})
