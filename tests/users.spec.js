import { test, expect } from '@playwright/test'


test('users list can sort A→Z', async ({ page }) => {

await test.step("Login to portal", async() => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
  });

  await test.step("Navigate to post tab and validate search functionality", async() => {
    const user = [];

    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await expect(page).toHaveURL(/users/);
    await page.getByText("Sort A→Z").click();
    // addding assertions





  });

 
})
