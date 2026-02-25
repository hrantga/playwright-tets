import { test, expect } from '@playwright/test'


test('users list can sort A→Z', async ({ page }) => {

    //  if(! await page.locator("//button[text()='Logout']").isVisible()){
    //         LoginPage= new LoginPage(page);
    //         await LoginPage.loginapp();
    //     }
           await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await page.waitForLoadState("domcontentloaded")
  await expect(page).toHaveURL(/\/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()


        await page.locator("a[href*='users']").nth(0).click();
        await page.waitForLoadState("domcontentloaded");

         //Validate the users are loading or not
    await expect(page.locator("//h1[text()='Users']/following-sibling::table//th[text()='Username']")).toBeVisible()

    //validate view
    const name = await page.locator("(//button[text()='View'])[1]/../preceding-sibling::td[2]").textContent();
    await page.locator("(//button[text()='View'])[1]").click();
    await expect(page.locator("(//aside//strong)[1]")).toHaveText(name);
    await page.locator("button[aria-label='Close drawer']").click();


    //Validate the sort
    await page.locator("//button[text()='Sort A→Z']").click();
    let objects = page.locator("//tr/td[1]");
    let oldtext="";
    for(let object in objects){
      let temp=object.textContent
      //comparator operations 
    }
    
 
})
