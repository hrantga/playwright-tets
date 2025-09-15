// loginHelper.js
// Reusable login function using ES6 export

import {expect} from "@playwright/test";

/**
 * Logs in a user using the given credentials.
 * @param {import('@playwright/test').Page} page - Playwright page instance
 * @param {string} username - The username to login
 * @param {string} password - The password to login
 */
export async function login(page, username, password) {
    // Navigate to login page
    await page.goto('/login');

    //Validate login url
    await expect(page).toHaveURL(/\/login$/)

    // Fill in credentials
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill(password);

    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
}
