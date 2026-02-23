import { test, expect } from '@playwright/test'

test('happy path login redirects to dashboard and shows welcome text @test', async ({ page }) => {

  let title;

  await test.step("Login to portal", async() => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
  });

  await test.step("Navigate to post tab and validate search functionality", async() => {
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await expect(page).toHaveURL(/posts/);
    await page.getByLabel("Filter by title").fill("sunt");
    await expect(page.locator("table tbody tr")).toHaveCount(1);
    title = await page.locator("table tbody tr").nth(0).locator("td").nth(1).innerText();
    expect(title).toBeTruthy();
  });

  await test.step("Donwload and save csv file", async() => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByText("Export CSV").click();
    const download = await downloadPromise;
    await download.saveAs("test.csv");
  });

  await test.step("Validate the post title in view tab", async() => {
    await page.locator("table tbody tr button").click();
    await expect(page.locator("aside")).toBeVisible();
    await expect(page.locator("aside div p").nth(0)).toContainText(title);
  });

})
