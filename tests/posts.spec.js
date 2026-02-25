import { test, expect } from '@playwright/test'
//import {LoginPage} from './pages/LoginPage'


test('filter posts, verify, and export CSV', async ({ page, context }) => {

    // if(! await page.locator("//button[text()='Logout']").isVisible()){
    //     LoginPage= new LoginPage(page);
    //     await LoginPage.loginapp();
    // }
       await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await page.waitForLoadState("domcontentloaded")
  await expect(page).toHaveURL(/\/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()


    await page.locator("a[href*='posts']").nth(0).click();
    await page.waitForLoadState("domcontentloaded");


    //Validate the posts are loading or not
    await expect(page.locator("//h1[text()='Posts']/following-sibling::table//th[text()='Title']")).toBeVisible();

    //validate view
    const title = await page.locator("(//button[text()='View'])[1]/../preceding-sibling::td[1]").textContent();
    await page.locator("(//button[text()='View'])[1]").click();
    //await expect(page.locator("//aside//p[./strong[text()='Title:']]")).toHaveText(title);
    await page.locator("button[aria-label='Close drawer']").click();

        
    //Export without Filter
     await page.locator("//button[text()='Export CSV']").click();
     //await page.waitForEvent("download")
    

    //Filter the records
    await page.locator("input[placeholder='Filter by title']").pressSequentially("quasi");
    //only valid filtered records should display
    expect(page.locator("//tr/td[2]/self::td[contains(text(),'quasi')]")).toBeVisible();
    // unfilter records should not visible
    expect(page.locator("//tr/td[2]/self::td[not(contains(text(),'quasi'))]")).not.toBeVisible();



    //Export with filter
     await page.locator("//button[text()='Export CSV']").click();
     //await page.waitForEvent("download")



    
  
})
