import { test, expect } from '@playwright/test'

test('verify the Posts when redirected from Dashboard', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
    await page.goto('/login')  
    loginPage.loginToMiniBlog("demo", "pass123");
    
})

test('verify the Posts when redirected from Go To Posts', async ({ page, context }) => {
  
})

test('verify the Posts UI elements', async ({ page, context }) => {
  
})