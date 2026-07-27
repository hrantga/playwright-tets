import { test, expect } from '@playwright/test'


test('users list can sort A→Z', async ({ page }) => {
 
    await page.goto('/users');
    
    // const firstBefore=page.locator('tbody tr').first().textContent();
    // console.log("result--->",await firstBefore)
    await page.getByRole('button',{name:'Sort A-Z'}).click();
   // await page.locator("div[id='root'] div main div div button").click();
    await expect(page.locator('tbody tr').first().locator('td').first()).toHaveText("Ervin Howell")
    await expect(page.locator('tbody tr').nth(1).locator('td').first()).toHaveText("Leanne Graham");
    
})
