import { test, expect } from '@playwright/test'


test.describe('users list can sort A→Z', async () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/login')
        await page.getByLabel('Username').fill('demo')
        await page.getByLabel('Password').fill('pass123')
        await page.getByRole('button', { name: 'Login' }).click()
    })
    
    test('users test', async({page})=>{
        
        await page.locator("a[href='/users']").first().click()
        await expect(page.url()).toContain('users')
        
        await page.getByRole('button', {name:'View'}).first().click()
        
        await expect(await page.getByRole('button',{name:'Close'})).toBeVisible()
        
        await page.getByRole('button',{name:'Close'}).click()
        
        await page.getByRole('button', {name:'Sort A→Z'}).click()
        const firstname = await page.locator("tbody tr td").first().textContent()
        await expect(firstname).toBe("Ervin Howell")
        
    })
    
})
