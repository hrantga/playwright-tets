import { test, expect } from '@playwright/test'
import { LoginPage}  from '../tests/pages/LoginPage';

test.only('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('demo', 'pass123');
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible();
})
