import {Page} from '@playwright/test'


export default class LoginPage{

    constructor(private page:Page){}

    async loginapp(){
  await this.page.goto('/login')
  await this.page.getByLabel('Username').fill('demo')
  await this.page.getByLabel('Password').fill('pass123')
  await this.page.getByRole('button', { name: 'Login' }).click()
  await this.page.waitForLoadState("domcontentloaded")
    }

    
}