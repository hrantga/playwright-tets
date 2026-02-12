import { test, expect } from '@playwright/test'
import { DashboardPage}  from '../tests/pages/DashboardPage';
import { UsersPage}  from '../tests/pages/UsersPage';

test.only('users list can sort A→Z', async ({ page }) => {
    test.setTimeout(60000);
    const dashboardPage = new DashboardPage(page);
    const usersPage = new UsersPage(page);
    await dashboardPage.clickOnUsersLink();
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
    await usersPage.clickOnSortButton();
    await usersPage.validateFirstUserDetails();
    await usersPage.clickOnFirstViewButton();
    await usersPage.clickOnCloseButton();
 
})
