import { test, expect, Page } from '@playwright/test'

export class LoginPage {
    constructor(public page: Page) { }

    async goto() {
        await this.page.goto('/login')
    }

    async login(username: string, password: string) {
        await this.page.getByLabel('Username').fill(username)
        await this.page.getByLabel('Password').fill(password)
        await this.page.getByRole('button', { name: 'Login' }).click()
    }

    async assertLoginErrorMessage() {
        await this.page.locator('body', { hasText: 'Invalid credentials' }).isVisible();
    }
}