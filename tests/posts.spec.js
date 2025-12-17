import { test, expect } from '@playwright/test';
import { PostsPage } from './pages/PostsPage.js';
import { TestData } from './test-data/testData.js';
import { authenticate, clearAuth } from './helpers/authHelper.js';

test.describe('Posts Page - Positive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('posts page loads successfully', async ({ page }) => {
    const postsPage = new PostsPage(page);

    await postsPage.goto();
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.posts}$`));
    await expect(postsPage.isPageLoaded()).resolves.toBe(true);
    
    // Validate posts are loaded by checking table has rows
    const rows = postsPage.getTableRows();
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('posts table displays correctly', async ({ page }) => {
    const postsPage = new PostsPage(page);

    await postsPage.goto();
    
    const table = postsPage.getPostsTable();
    await expect(table).toBeVisible();
    
    await expect(await postsPage.getTableHeader('ID')).toBeVisible();
    await expect(await postsPage.getTableHeader('Title')).toBeVisible();
    await expect(await postsPage.getTableHeader('Actions')).toBeVisible();
    
    const rows = postsPage.getTableRows();
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    await expect(rows.first()).toBeVisible();
    
    // Validate table data structure
    const firstRow = rows.first();
    const idCell = firstRow.locator('td').first();
    const titleCell = firstRow.locator('td').nth(1);
    await expect(idCell).toBeVisible();
    await expect(titleCell).toBeVisible();
  });

  test('filter posts by title - positive case', async ({ page }) => {
    const postsPage = new PostsPage(page);

    await postsPage.goto();
    await postsPage.filterByTitle(TestData.testContent.filterText);
    await page.waitForTimeout(300); // Wait for filter to apply
    
    const filteredRows = postsPage.getFilteredRows(TestData.testContent.filterText);
    await expect(filteredRows.first()).toBeVisible();
  });

  test('filter posts with specific values shows correct results', async ({ page }) => {
    const postsPage = new PostsPage(page);
    
    await postsPage.goto();
    
    // Test filter with 'qui' - should show exactly 2 results
    await postsPage.filterByTitle(TestData.testContent.filterValues.qui);
    const quiRows = postsPage.getTableRows();
    expect(await quiRows.count()).toBe(2);
    
    // Test filter with 'facere' - should show expected post
    await postsPage.filterByTitle(TestData.testContent.filterValues.facere);
    const table = postsPage.getPostsTable();
    await expect(table).toContainText(TestData.testContent.expectedPostTitle);
    
    // Test filter with 'sunt' - should show matching results
    await postsPage.filterByTitle(TestData.testContent.filterValues.sunt);
    const suntRows = postsPage.getTableRows();
    expect(await suntRows.count()).toBeGreaterThan(0);
  });

  test('clear filter shows all posts', async ({ page }) => {
    const postsPage = new PostsPage(page);

    await postsPage.goto();
    
    // Get initial count
    const initialRows = postsPage.getTableRows();
    const initialCount = await initialRows.count();
    
    // Apply filter
    await postsPage.filterByTitle(TestData.testContent.filterText);
    await page.waitForTimeout(300); // Wait for filter to apply
    const filteredRows = postsPage.getFilteredRows(TestData.testContent.filterText);
    const filteredCount = await filteredRows.count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
    
    // Clear filter
    await postsPage.filterByTitle('');
    await page.waitForTimeout(300); // Wait for filter to apply
    const allRows = postsPage.getTableRows();
    const allCount = await allRows.count();
    
    expect(allCount).toBe(initialCount);
  });

  test('view button opens post drawer', async ({ page }) => {
    const postsPage = new PostsPage(page);

    await postsPage.goto();
    
    const rows = postsPage.getTableRows();
    await expect(rows.first()).toBeVisible();
    
    // Click first view button
    const viewButtons = postsPage.getViewButtons();
    await expect(viewButtons.first()).toBeVisible();
    await viewButtons.first().click();
    
    // Verify drawer is visible - check for drawer content (use first() to avoid strict mode violation)
    await expect(page.locator('text=/Post #/').first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Posts Page - Negative Tests', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('filter with non-existent text shows no results', async ({ page }) => {
    const postsPage = new PostsPage(page);

    await postsPage.goto();
    await postsPage.filterByTitle(TestData.testContent.nonExistentText);
    await page.waitForTimeout(300); // Wait for filter to apply
    
    const rows = postsPage.getTableRows();
    const rowCount = await rows.count();
    expect(rowCount).toBe(0);
  });

  test('filter with empty string shows all posts', async ({ page }) => {
    const postsPage = new PostsPage(page);

    await postsPage.goto();
    
    // Apply a filter first
    await postsPage.filterByTitle(TestData.testContent.filterText);
    await page.waitForTimeout(300);
    
    // Clear filter
    await postsPage.filterByTitle('');
    await page.waitForTimeout(300);
    
    const rows = postsPage.getTableRows();
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });
});

test.describe('Posts Page - Access Control', () => {
  test('posts page redirects to login when not authenticated', async ({ page }) => {
    await clearAuth(page);
    
    await page.goto(TestData.routes.posts);
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
  });
});
