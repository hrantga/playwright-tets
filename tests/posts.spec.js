import { test, expect } from '@playwright/test'
// import {login} from './Page/LoginPage.js'
// import { Login } from '../src/Page/LoginPage.js'

test('filter posts, verify, and export CSV', async ({ page, context }) => {
  loginPageGoToPost(page)
  
})

async function loginPageGoToPost(page) 
{
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByRole('link', {name: 'Go to Posts'}).click();
  console.log(page.getByTitle());

}