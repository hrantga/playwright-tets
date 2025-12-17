// Root route redirect test - validates authentication redirect behavior
import { test, expect } from '@playwright/test';
import { authenticate, clearAuth } from './helpers/authHelper.js';
import { TestData } from './test-data/testData.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { LoginPage } from './pages/LoginPage.js';

test.describe('Root Route - Authentication Redirects', () => {
  test('root route redirects to dashboard when authenticated', async ({ page }) => {
    await authenticate(page);
    await page.goto(TestData.routes.root);
    
    // Wait for redirect to complete
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.dashboard}$`), { timeout: 5000 });
    
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.getWelcomeText()).toBeVisible();
  });

  test('root route redirects to login when not authenticated', async ({ page }) => {
    await clearAuth(page);
    await page.goto(TestData.routes.root);
    
    // Wait for redirect to complete
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`), { timeout: 5000 });
    
    const loginPage = new LoginPage(page);
    await expect(loginPage.getLoginForm()).toBeVisible();
  });
});