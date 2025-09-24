import { test, expect } from '@playwright/test'

// Ensure clean state
async function login(page) {
  await page.goto('http://localhost:5173/')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
}

test('filter posts, verify, and export CSV', async ({ page, context }) => {
  await login(page)
  await page.getByRole('link', { name: 'Posts', exact: true } ).click()
  await expect(page).toHaveURL(/\/posts$/)

  await page.getByPlaceholder('Filter by title').fill('qui')
  const rowWithQui = page.getByRole('row').filter({ hasText: /\bqui\b/i })
  await expect(rowWithQui.first()).toBeVisible()

  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export CSV' }).click(),
  ])
  const localFilePath = './downloads/' + "users.csv"
  const path = await download.saveAs(localFilePath);
  //expect(path).toBeTruthy()
  const content = await download.createReadStream()
  // Node 18 stream to text
  const chunks = []
  for await (const chunk of content) chunks.push(chunk)
  const csv = Buffer.concat(chunks).toString('utf-8')
  await expect(csv.split('\n')[0].trim()).toContain('id,title,body,userId')
  const view = page.getByRole('row', { name: 'qui est esse View' }).getByRole('button')
  await expect(view).toBeVisible();
  await view.click();
  const closeButton = page.getByRole('button', { name: 'Close drawer' });
  await expect(closeButton).toBeVisible();
  await closeButton.click();
})
