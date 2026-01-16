import { expect } from '@playwright/test'
class genericPageMethods {

    async loginWithDetails(page, userName, password, userDetail) {
        try {
            await page.goto('/login')
            await page.getByLabel('Username').fill(userName)
            await page.getByLabel('Password').fill(password)
            await page.getByRole('button', { name: 'Login' }).click()
            expect(page).toHaveURL(/\/dashboard$/)
            expect(page.getByRole('heading', { name: `Welcome, ${userDetail} User!` })).toBeVisible()
            console.log("login completed")

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

export { genericPageMethods };

