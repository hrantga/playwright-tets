import { test, expect } from '@playwright/test'

test('should display correct ui elements', async({page})=>{
    await expect(page.getByRole('heading', {name :'Users'})).toBeVisible();
    await expect(page.getByRole('link', {name :'Posts'})).toBeVisible();
    await expect(page.getByRole('button', {name :'Sort A-Z'})).toBeVisible();

    //Similarily we can do other attributes
})

test("Order Validation", async ({page})=>{
    await page.getByRole('button', {name : 'Sort A-Z'}).click();
    const name = await page.locator('table tr td:first-child').allTextContents();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);

})

test('table validation', async({page})=>{
    //validating the table data with the bhenchmark
    const expectdata = [
        {name : 'Leanne Graham', username: 'Bret'},
        {name : 'Ervin Howell', username: 'Antoneette'}
    ]

    const rows = page.locator('table tr');
    await expect(page).toHaveCountGreaterThan(1);
    await expect(page.getByRole('button', {name: 'View'}).first()).toBeVisible();

    const rowCount = await rows.count();
    const tableData = [];
     

    for(let i=0; i<rowCount; i++){
        const name = await rows.nth(i).locator('td').nth(0).innerText();
        const username = await rows.nth(i).locator('td').nth(1).innerText();
        tableData.push({name, username});
    }
 
    expect(tableData).toEqual(expectdata);


})

test('View Visibility Validation', async({page})=>{
    const rows = page.locator('table tr');
    await expect(page).toHaveCountGreaterThan(1);

    await page.getByRole('button', {name:'View'}).first().click();
    await expect(page.getByText('Email:')).toBeVisible();
    await expect(page.getByText('Company:')).toBeVisible();
    await expect(page.getByRole('button:', {name :'Close'})).toBeVisible();


})