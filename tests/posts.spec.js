import { test, expect } from '@playwright/test'

test('Validate the UI options in posts', async ({ page, context }) => {
   
    await expect(page.getByPlaceholder('Filter by title')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  
})

//check UI options in posts
   await page.getByRole('link', { name: 'Go to Posts' }).click();
   await expect(page.getByPlaceholder('Filter by title')).toBeVisible();
   await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();

  //filtering the value
  await (page.getByPlaceholder('Filter by title')).fill('sunt')
  const filterList = (await page.$$('table[role="table"] tbody tr')).length;
  expect(filterList).not.toBe(3)

  //export CSV
  await page.getByRole('button', { name: 'Export CSV' }).click();
  await page.waitForEvent('download');


  //view option for each ID iteration
  const viewAll = await page.$$('table[role="table"] tbody tr button');
  const close = page.getByRole('button', { name: 'Close' })
  viewAll.forEach(async function (value){
    value.click();
    expect(close).toBeVisible();
    await page.waitForSelector(close)
    await close.click()
  })


