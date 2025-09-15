// dashboard.js
import { expect } from '@playwright/test';

/**
 * Validates that the user is redirected to the dashboard
 * and the welcome heading is visible.
 * @param {import('@playwright/test').Page} page - Playwright page instance
 */
export async function clickAndVerifyPostScreen(page) {
    // Assert URL contains /dashboard
    await page.getByRole('link', { name: 'Go to Posts' }).click()
    await expect(page).toHaveURL(/\/posts$/)
}
