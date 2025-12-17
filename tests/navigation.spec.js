import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage.js';
import { PostsPage } from './pages/PostsPage.js';
import { UsersPage } from './pages/UsersPage.js';
import { TestData } from './test-data/testData.js';
import { authenticate } from './helpers/authHelper.js';

test.describe('Navigation - Header Links', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('header navigation links are visible on all pages', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const postsPage = new PostsPage(page);
    const usersPage = new UsersPage(page);

    // Check dashboard page
    await dashboardPage.goto();
    await expect(dashboardPage.getDashboardLink()).toBeVisible();
    await expect(dashboardPage.getPostsHeaderLink()).toBeVisible();
    await expect(dashboardPage.getUsersHeaderLink()).toBeVisible();

    // Check posts page
    await postsPage.goto();
    await expect(dashboardPage.getDashboardLink()).toBeVisible();
    await expect(dashboardPage.getPostsHeaderLink()).toBeVisible();
    await expect(dashboardPage.getUsersHeaderLink()).toBeVisible();

    // Check users page
    await usersPage.goto();
    await expect(dashboardPage.getDashboardLink()).toBeVisible();
    await expect(dashboardPage.getPostsHeaderLink()).toBeVisible();
    await expect(dashboardPage.getUsersHeaderLink()).toBeVisible();
  });

  test('header navigation works from posts page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const postsPage = new PostsPage(page);
    const usersPage = new UsersPage(page);

    await postsPage.goto();
    
    // Navigate to dashboard
    await dashboardPage.getDashboardLink().click();
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.dashboard}$`));
    
    // Navigate to users
    await dashboardPage.getUsersHeaderLink().click();
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.users}$`));
    
    // Navigate back to posts
    await dashboardPage.getPostsHeaderLink().click();
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.posts}$`));
    await expect(postsPage.isPageLoaded()).resolves.toBe(true);
  });

  test('header navigation works from users page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const postsPage = new PostsPage(page);
    const usersPage = new UsersPage(page);

    await usersPage.goto();
    
    // Navigate to dashboard
    await dashboardPage.getDashboardLink().click();
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.dashboard}$`));
    
    // Navigate to posts
    await dashboardPage.getPostsHeaderLink().click();
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.posts}$`));
    
    // Navigate back to users
    await dashboardPage.getUsersHeaderLink().click();
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.users}$`));
    await expect(usersPage.isPageLoaded()).resolves.toBe(true);
  });
});

test.describe('Navigation - 404 Handling', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('invalid route shows not found message', async ({ page }) => {
    await page.goto('/invalid-route-12345');
    await expect(page.locator('text=/Not Found/i')).toBeVisible({ timeout: 5000 });
  });
});

