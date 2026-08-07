import { test, expect } from '@playwright/test'


test('users list can sort A→Z', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Username').fill('demo')
    await page.getByLabel('Password').fill('pass123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL("http://localhost:5173/dashboard")

    await page.getByRole('link', { name: 'Users' }).nth(0).click()
    await expect(page).toHaveURL("http://localhost:5173/users");

    await page.getByRole('button', { name: 'Sort A→Z' }).click();
    

    const firstname = await page.locator('table td').first().textContent()
    await page.waitForTimeout(1000); 
    console.log("First user cell text:", firstname);

    expect(firstname).toBe("Ervin Howell");

   
 
})
