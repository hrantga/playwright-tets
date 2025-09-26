import { test, expect } from '@playwright/test'

async function login(page) {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/dashboard$/)
}

test('users list can sort A→Z by clicking Users', async ({ page }) => {
  await login(page)
  //await page.getByRole('link', { name: 'Users', exact: true }).click()
  await page.click("//a[text()='Users']")
  await expect(page).toHaveURL(/\/users$/)
  // Ensure rows loaded (wait until there are more than 1 row)
  await expect.poll(async () => await page.getByRole('row').count()).toBeGreaterThan(1)
  // Ensure the sort button is visible before clicking
  await expect(page.getByRole('button', { name: 'Sort A→Z' })).toBeVisible()
  await page.getByRole('button', { name: 'Sort A→Z' }).click()

  // Capture first row name and verify alphabetically earliest among visible rows
  const names = await page
    .getByRole('row')
    .locator('td:nth-child(1)')
    .allTextContents()

  expect(names.length).toBeGreaterThan(0)
  const sorted = [...names].sort((a, b) => a.localeCompare(b))
  expect(names[0]).toBe(sorted[0])
})

test('users list by clicking Go To Users can sort A→Z', async ({ page }) => {
  await login(page)
  //await page.getByRole('link', { name: 'Users', exact: true }).click()
  await page.click("//a[text()='Go to Users']")
  await expect(page).toHaveURL(/\/users$/)
  // Ensure rows loaded (wait until there are more than 1 row)
  await expect.poll(async () => await page.getByRole('row').count()).toBeGreaterThan(1)
  // Ensure the sort button is visible before clicking
  await expect(page.getByRole('button', { name: 'Sort A→Z' })).toBeVisible()
  await page.getByRole('button', { name: 'Sort A→Z' }).click()

  // Capture first row name and verify alphabetically earliest among visible rows
  const names = await page
    .getByRole('row')
    .locator('td:nth-child(1)')
    .allTextContents()

  expect(names.length).toBeGreaterThan(0)
  const sorted = [...names].sort((a, b) => a.localeCompare(b))
  expect(names[0]).toBe(sorted[0])
})


test('users list with two times sort click', async ({ page }) => {
  await login(page)
  await page.click("//a[text()='Users']")
  await expect(page).toHaveURL(/\/users$/)
  // Ensure rows loaded (wait until there are more than 1 row)
  await expect.poll(async () => await page.getByRole('row').count()).toBeGreaterThan(1)
  // Ensure the sort button is visible before clicking
  await expect(page.getByRole('button', { name: 'Sort A→Z' })).toBeVisible()
  await page.getByRole('button', { name: 'Sort A→Z' }).click()
  await page.getByRole('button', { name: 'Sort A→Z' }).click()

  // Capture first row name and verify alphabetically earliest among visible rows
  const names = await page
    .getByRole('row')
    .locator('td:last-child')
    .allTextContents()

  expect(names.length).toBeGreaterThan(0)
  const sorted = [...names].sort((a, b) => a.localeCompare(b))
  expect(names[0]).toBe(sorted[0])
})

test('filter users, click view , validate data', async ({ page, context }) => {
  await login(page)
  await page.click("//a[text()='Users']")
  await expect(page).toHaveURL(/\/users$/)

  await page.click("//tr[1]/td/button[text()='View']")

 const emaillOcator = await page.locator("//div/h1[text()='Users']/parent::div/child::aside/descendant::p[1]")
 const comanylOcator = await page.locator("//div/h1[text()='Users']/parent::div/child::aside/descendant::p[2]")
 await expect(emaillOcator).toBeVisible()
 await expect(comanylOcator).toBeVisible()
 
})
