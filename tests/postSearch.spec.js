import { test, expect } from '@playwright/test'

test('Search Post functionality', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()

const postLink = "//a[normalize-space(text())='Posts']";
await page.locator(postLink).click();

const firstRecord ="//td[text()='1']/following-sibling::td";
//const secondRecord = "//td[text()='2']/following-sibling::td"

let firstRecordText = await page.locator("//td[normalize-space(text())='sunt aut facere repellat provident occaecati excepturi optio reprehenderit']").innerText();
let secondRecordText = await page.locator("//td[normalize-space(text())='qui est esse']").innerText();

console.log(firstRecordText);
console.log(secondRecordText);

await page.locator("input[placeholder='Filter by title']").fill(secondRecordText);


expect(page.locator("//tbody/tr/td[2]")).textContent("qui est esse");



})
