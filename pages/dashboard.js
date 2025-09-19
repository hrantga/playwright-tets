import { expect } from '@playwright/test';

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.welcomeHeading = page.getByRole('heading', { name: 'Welcome, Demo User!' });
        this.postsBtn = page.getByRole('link', { name: 'Posts', exact: true })
        this.usersBtn = page.getByRole('link', { name: 'Users', exact: true })
        
        this.logOutBtn = page.getByRole('button', { name: 'Logout' })
    }

    async clickOnPostsButton() {
        await this.postsBtn.click()
        await expect(this.page).toHaveURL(/\/posts$/)
    }
    async clickOnUsersButton() {
        await this.usersBtn.click()
        await expect(this.page).toHaveURL(/\/users$/)
    }
    async clickLogOut() {
        await this.logOutBtn.click()
    }
    async isWelcomeHeadingVisible() {
        return await this.welcomeHeading.isVisible();
    }
}

export { DashboardPage as Dashboard };