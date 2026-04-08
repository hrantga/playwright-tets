import { test, expect, Page } from '@playwright/test'

export class PostPage {
    constructor(public page: Page) { }

    async goto() {
        await this.page.goto('/posts')
    }

    async filterAndVerify() {
        await this.page.getByPlaceholder('Filter by title').fill("qui est esse")
        await this.page.locator("//td[text() = 'qui est esse']").isVisible();
    }

    async clickOnExportCsv() {
        await this.page.getByRole('button', { name: 'Export CSV' }).click();
    }

    async clickOnViewButtonAndVerify() {
        await this.page.getByRole('button', { name: 'View' }).click();
        await this.page.locator("//div//strong[contains(text(), 'Post')]").isVisible();
    }

    async assertWrongFilterDataNotShown() {
        await this.page.getByPlaceholder('Filter by title').fill("shagun sharma")
        await this.page.locator("//table[@role='table']").isHidden();
    }

    async assertViewButtonNotVisible() {
        await this.page.getByRole('button', { name: 'View' }).isHidden();
    }
}