import { test, expect} from '@playwright/test'

test('Validate user details View Button with details', async({page})=>{
    await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()


  const postLink = "//a[normalize-space(text())='Users']";
await page.locator(postLink).click();


  const userName =await page.locator("(//div[@id='root']//td)[1]");
let userNameText =  await userName.innerText();
  //console.log(userNameText);

  await page.locator("(//div[@id='root']//button)[2]").click();
  await expect(page.locator("(//div[@id='root']//strong)[2]")).toHaveText(userNameText);
  await page.locator("//button[normalize-space(text())='Close']").click();

  //await expect(page.locator("//button[normalize-space(text())='Close'])")).not.



});