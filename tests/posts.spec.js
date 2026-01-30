import { test, expect} from '@playwright/test'

test('filter posts, verify, and export CSV', async ({ page, context }) => {
  await page.goto('/posts')
  await page.getByLabel('Filter by title').fill('qui est')
  const firstPost = page.getByText('qui est esse')
  await expect(firstPost).toBeVisible()
  await page.getByRole('button', { name: 'Export CSV' }).click()
  const [download] = await Promise.all([
    context.waitForEvent('download'),
    page.getByRole('button', { name: 'Export CSV' }).click()
  ])
    const path = await download.path()
    const content = await download.readAsText()
    expect(content).toContain('qui est esse')
})
