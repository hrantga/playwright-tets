import { test, expect } from '@playwright/test'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
})

test.describe('Login negative scenarios', ()=>{
   
   test('shows error on invalid username or password', async({page})=>{
     
     await page.goto('/login')
     await page.getByLabel('Username').fill('wronguser')
     await page.getByLabel('Password').fill('wrongpass')
     await page.getByRole('button', { name: 'Login' }).click()

     await expect(page.getByText('Invalid credentials')).toBeVisible();
     await expect(page).toHaveURL(/\/login/);

   });

   test('shows validation error when password is empty', async({page}) =>{

     await page.goto('/login')
     await page.getByLabel('Username').fill('demo')
     await page.getByLabel('Password').fill('')
     await page.getByRole('button', { name: 'Login' }).click()

     await expect(page.getByText('Invalid credentials')).toBeVisible();
   });

   test('handles special characters in username and passwprd', async({page}) =>{
     
    await page.goto('/login')
     await page.getByLabel('Username').fill('!@#$%^&')
     await page.getByLabel('Password').fill('!@#$%%)')
     await page.getByRole('button', { name: 'Login' }).click()

     await expect(page.getByText('Invalid credentials')).toBeVisible();
   });

   test('does not allow login with excessively long inputs', async({page}) =>{
     await page.goto('/login')
     await page.getByLabel('Username').fill('wqruwifwfppfeccdscdccdczc')
     await page.getByLabel('Password').fill('yuegiakjcacnlacnalcnaca')
     await page.getByRole('button', { name: 'Login' }).click()

     await expect(page.getByText('Invalid credentials')).toBeVisible();
   });

   test('login fails with correct username and wrong password', async({page}) =>{
     await page.goto('/login')
     await page.getByLabel('Username').fill('demo')
     await page.getByLabel('Password').fill('123')
     await page.getByRole('button', { name: 'Login' }).click()

     await expect(page.getByText('Invalid credentials')).toBeVisible();
     await expect(page).toHaveURL(/\/login/);
   });

   test('login fails with wrong username and correct password', async({page})=>{
     await page.goto('/login')
     await page.getByLabel('Username').fill('demo4242')
     await page.getByLabel('Password').fill('pass123')
     await page.getByRole('button', { name: 'Login' }).click()

     await expect(page.getByText('Invalid credentials')).toBeVisible();
     await expect(page).toHaveURL(/\/login/);
   });

     test('login fails with blank username and password', async({page})=>{
     await page.goto('/login')
     await page.getByLabel('Username').fill(' ')
     await page.getByLabel('Password').fill(' ')
     await page.getByRole('button', { name: 'Login' }).click()

     await expect(page.getByText('Invalid credentials')).toBeVisible();
     await expect(page).toHaveURL(/\/login/);
   });

})
