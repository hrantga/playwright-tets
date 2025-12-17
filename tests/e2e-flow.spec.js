import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { PostsPage } from './pages/PostsPage.js';
import { UsersPage } from './pages/UsersPage.js';
import { TestData } from './test-data/testData.js';
import { clearAuth } from './helpers/authHelper.js';

// End-to-end flow test - validates complete user journey
// Individual validations are tested in comprehensive files, this focuses on flow
test('complete user flow: login → dashboard → posts → users', async ({ page }) => {
  // Ensure clean state
  await clearAuth(page);
  
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const postsPage = new PostsPage(page);
  const usersPage = new UsersPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login(TestData.credentials.valid.username, TestData.credentials.valid.password);
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.dashboard}$`), { timeout: 5000 });
  await expect(dashboardPage.getWelcomeText()).toBeVisible();

  // 2. Navigate to Posts from dashboard
  await dashboardPage.clickPostsLink();
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.posts}$`));
  await expect(postsPage.isPageLoaded()).resolves.toBe(true);

  // 3. Filter posts
  await postsPage.filterByTitle(TestData.testContent.filterValues.facere);
  await page.waitForTimeout(300); // Wait for filter to apply
  const table = postsPage.getPostsTable();
  await expect(table).toContainText(TestData.testContent.expectedPostTitle);

  // 4. Navigate to Users
  await usersPage.goto();
  await expect(page).toHaveURL(new RegExp(`${TestData.routes.users}$`));
  await expect(usersPage.isPageLoaded()).resolves.toBe(true);

  // 5. Verify users and sort
  await expect(usersPage.getUserNameElement(TestData.testContent.userNames.leanneGraham)).toBeVisible();
  await expect(usersPage.getUserNameElement(TestData.testContent.userNames.ervinHowell)).toBeVisible();
  await usersPage.clickSortAZ();
  await page.waitForTimeout(300); // Wait for sort to apply
});

