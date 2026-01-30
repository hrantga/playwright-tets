import { Page } from '@playwright/test'

export default class LoginPage{

    constructor(private page: Page){
        this.page = page;
    }

   private elements={
    usernameInput: ()  => this.page.getByRole('textbox', {name: 'username'}),
    passwordInput: () => this.page.getByRole('textbox', {name: 'password'}),
    loginButton: () => this.page.getByRole('button', { name: 'Login' }),    
   }

   async loginToMiniBlog(userName: string, password: string){
    await this.elements.usernameInput().fill(userName);
    await this.elements.passwordInput().fill(password);
    await this.elements.loginButton().click();
   }
   
}