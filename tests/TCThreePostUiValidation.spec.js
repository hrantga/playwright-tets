import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('demo');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('pass123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Posts', exact: true }).click();
  await expect(page.getByRole('strong')).toContainText('Mini Blog Admin');
  await expect(page.getByRole('heading')).toContainText('Posts');
  await page.getByRole('textbox', { name: 'Filter by title' }).click();
  await page.getByRole('textbox', { name: 'Filter by title' }).fill('sunt');
  await page.getByRole('textbox', { name: 'Filter by title' }).press('Enter');
  await expect(page.locator('tbody')).toContainText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
  await page.getByRole('cell', { name: '1' }).click();
  await expect(page.locator('tbody')).toContainText('1');
});