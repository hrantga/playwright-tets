import { test } from '@playwright/test'
import { LoginPage } from "../pages/login.ts"
import { UsersPage } from "../pages/users.ts"

test('users list can sort A→Z', async ({ page }) => {
    const usersPage = new UsersPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('demo', 'pass123')
    await usersPage.goto();
    await usersPage.sorting();
})
