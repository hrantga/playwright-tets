import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test('filter posts, verify, and export CSV', async ({ page, context }) => {

    // validate login successful
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('demo', 'pass123');
    await expect(page).toHaveTitle('Vite + React')

    // navigate to posts page and validate filtering
    await loginPage.goToPosts();
    await loginPage.filterPosts('sunt aut facere repellat');

    // export CSV and validate download
    const [ download ] = await Promise.all([
        context.waitForEvent('download'),
        loginPage.exportCSV()
    ]);
    const path = await download.path();
    expect(path).not.toBeNull();

    // view a post and validate view pop up
    await loginPage.viewPost(); 
    await loginPage.closeDrawer();
  
})
