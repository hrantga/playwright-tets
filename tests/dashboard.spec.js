import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { PostsPage } from './pages/PostsPage.js';
import { UsersPage } from './pages/UsersPage.js';
import { TestData } from './test-data/testData.js';
import { authenticate, clearAuth } from './helpers/authHelper.js';

test('dashboard shows welcome message and navigation links', async ({ page }) => {
  await authenticate(page);
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.goto();
  
  await expect(dashboardPage.getWelcomeText()).toBeVisible();
  await expect(dashboardPage.getPostsLink()).toBeVisible();
  await expect(dashboardPage.getUsersLink()).toBeVisible();
  const logoutButton = page.locator(dashboardPage.locators.logoutButton);
  await expect(logoutButton).toBeVisible();
});

test('clicking dashboard link in header stays on dashboard', async ({ page }) => {
  await authenticate(page);
  const dashboardPage = new DashboardPage(page);
  
  await dashboardPage.goto();
  
  // Click dashboard link in header
  await dashboardPage.getDashboardLink().click();
  
  // Should still be on dashboard
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.dashboard}$`));
  await expect(dashboardPage.getWelcomeText()).toBeVisible();
});

test('dashboard logout redirects to login', async ({ page }) => {
  await authenticate(page);
  const dashboardPage = new DashboardPage(page);
  const loginPage = new LoginPage(page);

  await dashboardPage.goto();
  await dashboardPage.logout();
  
  // Wait for navigation after logout
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`), { timeout: 5000 });
  await expect(loginPage.getLoginForm()).toBeVisible();
});

test('dashboard navigation links work', async ({ page }) => {
  await authenticate(page);
  const dashboardPage = new DashboardPage(page);
  const postsPage = new PostsPage(page);
  const usersPage = new UsersPage(page);

  await dashboardPage.goto();
  
  await dashboardPage.clickPostsLink();
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.posts}$`));
  await expect(postsPage.isPageLoaded()).resolves.toBe(true);
  
  await dashboardPage.goto();
  await dashboardPage.clickUsersLink();
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.users}$`));
  await expect(usersPage.isPageLoaded()).resolves.toBe(true);
});

test('protected routes redirect to login when not authenticated', async ({ page }) => {
  await clearAuth(page);
  
  await page.goto(TestData.routes.dashboard);
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
  
  await page.goto(TestData.routes.posts);
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
  
  await page.goto(TestData.routes.users);
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
});

