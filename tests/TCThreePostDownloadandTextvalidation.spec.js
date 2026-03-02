import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('demo');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('pass123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Posts', exact: true }).click();
  await page.getByRole('textbox', { name: 'Filter by title' }).click();
  await page.getByRole('textbox', { name: 'Filter by title' }).fill('sunt');
  await page.getByRole('textbox', { name: 'Filter by title' }).press('Enter');
  await page.getByRole('button', { name: 'View' }).click();
  await expect(page.getByLabel('Post #')).toContainText('Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderitBody: quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architectoUser ID: 1');
  await expect(page.getByLabel('Post #')).toContainText('Post #1');
  await page.getByRole('button', { name: 'Close drawer' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export CSV' }).click();
  const download = await downloadPromise;
});