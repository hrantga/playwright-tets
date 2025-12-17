import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { TestData } from './test-data/testData.js';
import { clearAuth, authenticate } from './helpers/authHelper.js';

test.describe('Login - Positive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();

    const form = loginPage.getLoginForm();
    await expect(form).toBeVisible();
    
    const usernameInput = loginPage.getUsernameInput();
    const passwordInput = loginPage.getPasswordInput();
    
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');

    await loginPage.login(
      TestData.credentials.valid.username,
      TestData.credentials.valid.password
    );
    
    // Wait for navigation to complete
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.dashboard}$`), { timeout: 5000 });
    await expect(dashboardPage.getWelcomeText()).toBeVisible();
  });
});

test.describe('Login - Negative Tests', () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      TestData.credentials.invalid.username,
      TestData.credentials.invalid.password
    );
    
    // Wait for error to appear
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
    await expect(loginPage.getErrorElement()).toBeVisible({ timeout: 3000 });
    await expect(loginPage.isErrorVisible()).resolves.toBe(true);
    
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(TestData.messages.loginError);
    
    const errorElement = loginPage.getErrorElement();
    await expect(errorElement).toBeVisible();
  });

  test('login with empty username shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      TestData.credentials.empty.username,
      TestData.credentials.valid.password
    );
    
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
    await expect(loginPage.isErrorVisible()).resolves.toBe(true);
  });

  test('login with empty password shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      TestData.credentials.valid.username,
      TestData.credentials.empty.password
    );
    
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
    await expect(loginPage.isErrorVisible()).resolves.toBe(true);
  });

  test('login with empty credentials shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      TestData.credentials.empty.username,
      TestData.credentials.empty.password
    );
    
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
    await expect(loginPage.isErrorVisible()).resolves.toBe(true);
  });

  test('login with wrong username but correct password shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      TestData.credentials.invalid.username,
      TestData.credentials.valid.password
    );
    
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
    await expect(loginPage.isErrorVisible()).resolves.toBe(true);
  });

  test('login with correct username but wrong password shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      TestData.credentials.valid.username,
      TestData.credentials.invalid.password
    );
    
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
    await expect(loginPage.isErrorVisible()).resolves.toBe(true);
  });
});

test.describe('Login - Access Control', () => {
  test('login page redirects to dashboard if already authenticated', async ({ page }) => {
    await authenticate(page);
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.dashboard}$`));
  });
});
