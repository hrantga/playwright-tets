import { test, expect } from '@playwright/test'
import { login } from './pages/login.js'
import { verifyDashboard } from './pages/dashboard.js';
import { credentials } from './testData.js';

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
    await login(page, credentials.validUser.username, credentials.validUser.password);
    await verifyDashboard(page);
})
