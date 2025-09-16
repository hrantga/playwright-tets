// dashboard.js
import { expect } from '@playwright/test';

/**
 * Validates that the user is redirected to the dashboard
 * and the welcome heading is visible.
 * @param {import('@playwright/test').Page} page - Playwright page instance
 */
export async function verifyDashboard(page) {
    // Assert URL contains /dashboard
    await expect(page).toHaveURL(/\/dashboard$/);

    // Assert welcome heading is visible
    await expect(
        page.getByRole('heading', { name: 'Welcome, Demo User!' })
    ).toBeVisible();
}
