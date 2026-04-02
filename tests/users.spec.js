import { test, expect } from '@playwright/test'


test('users list can sort A→Z', async ({ page }) => {
 
    await page.goto('/')
    await page.getByLabel('Username').fill('demo')
    await page.getByLabel('Password').fill('pass123')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('link', { name: 'Users', exact: true }).click()
    await page.getByRole('button', {name: 'Sort A→Z'}).click();
})
