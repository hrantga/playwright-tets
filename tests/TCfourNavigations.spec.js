import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('demo');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('pass123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Go to Posts' }).click();
  await page.goto('http://localhost:5173/dashboard');
  await page.getByRole('link', { name: 'Go to Users' }).click();
   await page.goto('http://localhost:5173/dashboard');
  await page.getByRole('link', { name: 'Dashboard' }).click();
   await page.goto('http://localhost:5173/dashboard');
  await page.getByRole('link', { name: 'Posts', exact: true }).click();
   await page.goto('http://localhost:5173/dashboard');
  await page.getByRole('link', { name: 'Users', exact: true }).click();
   await page.goto('http://localhost:5173/dashboard');
  await expect(page.getByRole('strong')).toContainText('Mini Blog Admin');
  await page.getByRole('link', { name: 'Posts', exact: true }).click();
  
});