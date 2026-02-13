import { test, expect } from '@playwright/test'

test.describe('filter posts, verify, and export CSV', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login')
        await page.getByLabel('Username').fill('demo')
        await page.getByLabel('Password').fill('pass123')
        await page.getByRole('button', { name: 'Login' }).click()
    })
    
    test('post test', async({page})=>{
        
        await page.locator("a[href='/posts']").first().click()
        await expect(page.url()).toContain('posts')
        
        await page.getByRole('button', {name:'View'}).first().click()
        
        await expect(await page.getByRole('button',{name:'Close'})).toBeVisible()
        
        await page.getByRole('button',{name:'Close'}).click()
        
        await page.getByPlaceholder('Filter by title').fill('ui est esse')
        
        const rowscount = await page.locator("tbody tr").count()
        
        await expect(rowscount).toBe(1)
        
        await page.getByRole('button', {name:'Export CSV'}).click()
    })
})
