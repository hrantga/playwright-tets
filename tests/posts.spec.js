import { test, expect } from '@playwright/test'

test('filter posts, verify, and export CSV', async ({ page, context }) => {

    await page.goto('/login')
    await page.getByLabel('Username').fill('demo')
    await page.getByLabel('Password').fill('pass123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL("http://localhost:5173/dashboard")
    await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible();

    await page.getByRole('link', { name: 'Posts' }).nth(0).click();
    await expect(page).toHaveURL("http://localhost:5173/posts");

    await page.getByRole('textbox', { name: 'Filter by title' }).fill('sunt');
    
    const searchresult = await page.getByRole("cell", { name: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit" });
    expect(searchresult).toBeVisible();
    await expect(searchresult).toHaveText("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");


    const download = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Export CSV' }).click()
    ]);

})
