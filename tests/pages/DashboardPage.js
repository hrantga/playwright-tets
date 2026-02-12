import { test, expect } from '@playwright/test'
export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.usersLink = page.getByText('Users');
        this.postsLink = page.getByText('Posts');
        this.loginButton = page.getByRole('button', { name: 'Logout' });
    }
    async clickOnUsersLink() {
        await this.usersLink.click();
    }
    async clickOnPostsLink() {
        await this.postsLink.click();
    }
    async logout() {
        await this.loginButton.click();
    }
}

