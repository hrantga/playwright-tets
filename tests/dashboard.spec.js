import { test, expect } from '@playwright/test'
// import constants from '../helper/constants.json' assert { type: 'json' };
import LoginPage from '../pages/login.page';
import DashboardPage from '../pages/dashoard.page';



test.only('Verify the Dashboard UI elements', async ({ page }) => {
 const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await page.goto('/login')  
  loginPage.loginToMiniBlog("demo", "pass123");
  dashboardPage.verifyWelcomeText();
  //dashboardPage.verifyGoToPostsLink();
  dashboardPage.verifyGoToUsersLink();
  dashboardPage.verifyLogoutButton();  
})
