import { test, expect } from '@playwright/test';
import { UsersPage } from './pages/UsersPage.js';
import { TestData } from './test-data/testData.js';
import { authenticate, clearAuth } from './helpers/authHelper.js';

test.describe('Users Page - Positive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test('users page loads successfully', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.goto();
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.users}$`));
    await expect(usersPage.isPageLoaded()).resolves.toBe(true);
    
    // Validate users are loaded by checking table has rows
    const userRows = usersPage.getUserRows();
    const rowCount = await userRows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('users table displays correctly', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.goto();
    
    const table = usersPage.getUsersTable();
    await expect(table).toBeVisible();
    
    const headers = usersPage.getTableHeaders();
    await expect(headers.filter({ hasText: 'Name' }).first()).toBeVisible();
    await expect(headers.filter({ hasText: 'Username' }).first()).toBeVisible();
    await expect(headers.filter({ hasText: 'Actions' }).first()).toBeVisible();
    
    const userRows = usersPage.getUserRows();
    const rowCount = await userRows.count();
    expect(rowCount).toBeGreaterThan(0);
    await expect(userRows.first()).toBeVisible();
    
    // Validate table data - check specific users exist
    await expect(usersPage.getUserNameElement(TestData.testContent.userNames.leanneGraham)).toBeVisible();
    await expect(usersPage.getUserNameElement(TestData.testContent.userNames.ervinHowell)).toBeVisible();
  });

  test('sort A→Z button is clickable', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.goto();
    
    const sortButton = usersPage.getSortButton();
    await expect(sortButton).toBeEnabled();
    await expect(sortButton).toBeVisible();
  });

  test('users list can sort A→Z', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.goto();
    
    const userRows = usersPage.getUserRows();
    const firstUserBefore = await userRows.first().locator('td').first().textContent();
    
    // Verify initial state - Leanne Graham should be first (not sorted)
    expect(firstUserBefore).toContain(TestData.testContent.userNames.leanneGraham);
    
    await usersPage.clickSortAZ();
    // Wait for UI to update after sorting
    await page.waitForTimeout(300);
    
    // Get all user names after sorting
    const rowCount = await userRows.count();
    const userNamesAfter = [];
    for (let i = 0; i < rowCount; i++) {
      const name = await userRows.nth(i).locator('td').first().textContent();
      userNamesAfter.push(name?.trim() || '');
    }
    
    // Verify sorting worked
    const firstUserAfter = userNamesAfter[0];
    
    // First user should have changed (Ervin comes before Leanne alphabetically)
    expect(firstUserAfter).not.toBe(firstUserBefore?.trim());
    expect(firstUserAfter).toContain(TestData.testContent.userNames.ervinHowell);
    
    // Verify the list is actually sorted alphabetically
    const sortedNames = [...userNamesAfter].sort((a, b) => a.localeCompare(b));
    expect(userNamesAfter).toEqual(sortedNames);
  });

  test('view button opens user drawer', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.goto();
    
    const userRows = usersPage.getUserRows();
    await expect(userRows.first()).toBeVisible();
    
    // Click first view button
    const viewButtons = usersPage.getViewButtons();
    await expect(viewButtons.first()).toBeVisible();
    await viewButtons.first().click();
    
    // Verify drawer is visible - check for user details (use first() to avoid strict mode violation)
    await expect(page.locator('text=/Email:/').first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Users Page - Access Control', () => {
  test('users page redirects to login when not authenticated', async ({ page }) => {
    await clearAuth(page);
    
    await page.goto(TestData.routes.users);
    await expect(page).toHaveURL(new RegExp(`${TestData.routes.login}$`));
  });
});

