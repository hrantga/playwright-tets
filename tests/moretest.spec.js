import { test, expect } from '@playwright/test'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()


  expect(page.getByText('Go to Posts')).toHaveText('Go to Posts')
  await page.getByText('Go to Posts').click()

  await expect(page).toHaveURL(/posts/)

  await expect(page.locator('h1')).toHaveText('Posts')

  await expect(page.getByRole('table',{})).toBeVisible()
  
  // validtion of the filters 

 // await page.locator('[placeholder="Filter by title"]').toBeVisible()
  await page.locator('[placeholder="Filter by title"]').fill('facere')
  await expect(page.locator('[role="table"]')).toContainText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')

// Moving into the user page 

 await page.goto('/users')

 await expect(page.getByText('Sort A→Z')).toBeVisible()

 await expect(page.getByRole('table')).toBeVisible()

 const names = ['Leanne Graham', 'Ervin Howell']

 await expect(page.getByText('Leanne Graham')).toContainText('Leanne Graham')

 await expect(page.getByText('Ervin Howell')).toContainText('Ervin Howell')

 await page.getByText('Sort A→Z').click()

 

})