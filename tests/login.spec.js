import { test, expect } from '@playwright/test'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await page.locator('xpath=//input[@name="username"]').fill('demo');
  await page.locator('xpath=//input[@name="password"]').fill('pass123');
  await page.locator('xpath=//button[contains(text(),"Login")]').click();
  const header=page.locator('xpath=//div[@id="root"]//h1[contains(text(),"Welcome, Demo User!")]');
  await expect(header).toBeVisible({timeout: 15000});
})

test('invalid creds show error message', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
   await page.locator('xpath=//input[@name="username"]').fill('test');
  await page.locator('xpath=//input[@name="password"]').fill('test');
  await page.locator('xpath=//button[contains(text(),"Login")]').click();
  const ermessage=page.locator('xpath=//form[@aria-label="Login form"]//div[@role="alert"]');
  await expect(ermessage).toBeVisible({timeout: 15000});
  await expect(ermessage).toHaveText('Invalid credentials');
})

test('navigate to the posts and export the posts', async ({ page }) => {
  const title='Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderit';

  await page.goto('http://localhost:5173/login');
  await page.locator('xpath=//input[@name="username"]').fill('demo');
  await page.locator('xpath=//input[@name="password"]').fill('pass123');
  await page.locator('xpath=//button[contains(text(),"Login")]').click();
  const posts=page.locator('xpath=//a[contains(text(),"Go to Posts")]');
  await expect.soft(posts).toBeVisible();
  await posts.click();
  const viewuser=page.locator('xpath=//table//td[contains(text(),"provide")]/following-sibling::td/button');
  await expect(viewuser).toBeVisible({timeout: 15000});
  await viewuser.click();
  const sidePanelClosebutton=page.locator('xpath=//button[@aria-label="Close drawer"]');
  await expect.soft(sidePanelClosebutton).toBeVisible({timeout: 15000});
  const sidepanelTitle=page.locator('xpath=(//div//p)[1]');
  await expect.soft(sidepanelTitle.textContent()).toHaveText(title);
  await sidePanelClosebutton.click();
  await page.locator('xpath=//label/input').fill('sunt aut');
  await page.locator('xpath=//button[contains(text(),"Export CSV")]').click();

})

