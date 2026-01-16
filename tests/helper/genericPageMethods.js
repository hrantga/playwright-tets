import { expect } from '@playwright/test'
class genericPageMethods {

    constructor(page) {
        this.page = page;
    }

    async loginWithDetails(userName, password, userDetail) {
        try {
            await this.page.goto('/login')
            await this.page.getByLabel('Username').fill(userName)
            await this.page.getByLabel('Password').fill(password)
            await this.page.getByRole('button', { name: 'Login' }).click()
            expect(this.page).toHaveURL(/\/dashboard$/)
            expect(this.page.getByRole('heading', { name: `Welcome, ${userDetail} User!`})).toBeVisible()
            console.log("login completed")

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

export { genericPageMethods };

