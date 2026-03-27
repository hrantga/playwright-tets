import { test, expect } from '@playwright/test'

test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Username').fill('demo')
  await page.getByLabel('Password').fill('pass123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/posts/)
  await expect(page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()

})

//additional testcases of valdiation

test('mock loagin api and validate success flow', async({page})=>{
  await page.route('**/api/loginn', async route =>{
    const request = route.request();
    const body = JSON.parse(request.postData());

    if(body.username === 'demo' && body.password === 'pass123'){
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({"token": 'mock-tocken-123', user : {
          name: 'Demo User'
        }}
      });
      
    }else{
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({error: "Invalid Credentials"  })
    });
  }
  });

  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.getByText('Welcome, Demo User !')).toBeVisible();
})
