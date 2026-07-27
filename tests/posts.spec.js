import { test, expect } from '@playwright/test'

test('filter posts, verify, and export CSV', async ({ page, context }) => {
    await page.goto("http://localhost:5173/posts");
    await expect(page.locator("//*[text()='Mini Blog Admin']")).toBeVisible();

  
})
