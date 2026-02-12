import { test, expect } from '@playwright/test'
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('demo');
        this.passwordInput = page.getByPlaceholder('pass123');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
    async goto() {
        await this.page.goto('http://localhost:5173/login');
    }
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

