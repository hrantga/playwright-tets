import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('demo');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('pass123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Users', exact: true }).click();
  await expect(page.getByRole('heading')).toContainText('Users');
  await page.getByRole('button', { name: 'Sort A→Z' }).click();
  await expect(page.locator('tbody')).toContainText('Ervin Howell');
});
