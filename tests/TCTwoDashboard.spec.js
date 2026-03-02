import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('demo');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('pass123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.getByRole('navigation')).toContainText('Dashboard');
  await page.getByRole('heading', { name: 'Welcome, Demo User!' }).click();
  await expect(page.getByRole('heading')).toContainText('Welcome, Demo User!');
  await expect(page.getByRole('strong')).toContainText('Mini Blog Admin');
});