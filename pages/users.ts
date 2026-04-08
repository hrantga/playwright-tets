import { test, expect, Page } from '@playwright/test'

export class UsersPage {
    constructor(public page: Page) { }

    async goto() {
        await this.page.goto('/users')
    }

    async sorting() {
        await this.page.getByRole('button', { name: 'Sort A→Z' }).click();
        await this.page.locator("//td[text() = 'qui est esse']").isVisible();
    }

}