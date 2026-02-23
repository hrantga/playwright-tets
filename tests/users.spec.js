import { test, expect } from '@playwright/test'


test('users list can sort A→Z', async ({ page }) => {
    
//users functionallity - validate the colum name
await page.getByRole('link', { name: 'Go to Users' }).click();
const userColumn = await page.$$('table[role="table"] thead tr th');
expect(userColumn[0].textContent()).toEqual('Name');
expect(userColumn[1].textContent()).toEqual('Username');
expect(userColumn[2].textContent()).toEqual('Actions');

//check sorting 
await page.getByRole('button', { name: 'Sort A→Z' }).click();
const nameList = page.$$('table[role="table"] tbody tr td:nth-child(1)').textContent();
console.log("the anme list is"+nameList)
 
})
