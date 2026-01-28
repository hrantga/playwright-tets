import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('users list can sort A→Z', async ({ page }) => {

    // validate login successful
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('demo', 'pass123');
    await expect(page).toHaveTitle('Vite + React')

    // navigate to users page and validate sorting
    await loginPage.goToUsers();
    await loginPage.sortUsers();
 
})
