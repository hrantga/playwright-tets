import { test, expect } from '@playwright/test'
import { genericPageMethods } from "./helper/genericPageMethods";

test('filter posts, verify, and export CSV', async ({ page, context }) => {

  let generic = new genericPageMethods(page);
  await generic.loginWithDetails('demo', 'pass123', 'Demo');

  await page.getByRole('link', { name: 'Go to Posts' }).click()
  await expect(page).toHaveURL(/\/posts$/)

  await page.getByPlaceholder('Filter by title').fill('qui')
  const rowWithQui = page.getByRole('row').filter({ hasText: /\bqui\b/i })
  await expect(rowWithQui.first()).toBeVisible()

  const [download] = await Promise.all([
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
