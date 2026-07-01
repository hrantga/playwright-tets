import { test, expect } from '@playwright/test'
import  {login} from '..tests/login'

test('filter posts, verify, and export CSV', async ({ page, context }) => {
  
})

test.describe('Mini Blog Admin Dashboard and Posts Tests', ()=>{

    test('Dashboard page UI and navigation', async ({page})=>{
     await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()

      await expect(page.locator('h1')).toHaveText(/Welcome, Demo User!/);

      await expect(page.locator('nav>> text = Dashboard')).toBeVisible();
      await expect(page.locator('nav >> text = Posts')).toBeVisible();
      await expect(page.locator('nav >> test=Users')).toBeVisible();

      const logoutButton = page.locator('button',{hasText: 'Logout'});
      await expect(logoutButton).toBeVisible();
     



    });
})
