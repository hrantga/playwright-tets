class genericPageMethods {

    constructor(page) {
        this.page = page;
    }
    

    async loginWithDetails() {
        console.log("Am here before login")

    // try {
       await this.page.goto('/login')
       await this.page.getByLabel('Username').fill('demo')
       await this.page.getByLabel('Password').fill('pass123')
       await this.page.getByRole('button', { name: 'Login' }).click()
       expect(this.page).toHaveURL(/\/dashboard$/)
       expect(this.page.getByRole('heading', { name: 'Welcome, Demo User!' })).toBeVisible()
               console.log("login completed")

    // } catch (error) {
    //     console.error('Error fetching data:', error);
    // }
    }
}

export { genericPageMethods };

