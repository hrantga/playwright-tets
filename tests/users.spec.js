import { test, expect } from '@playwright/test'


test('users list can sort A→Z', async ({ page }) => {
 await page.goto('/users')
    await page.getByRole('button', { name: 'Sort A→Z' }).click()
    await page.getByText('Ervin Howell', { exact: true });
    await page.getByRole('button', { name: 'View' }).click()
    
    expect(page.getByText('Email:  Shanna@melissa.tv')).toBeVisible()
    
})
