const { expect , page} = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.posts = page.getByRole('link', { name: 'Go to Posts' });
        this.filterInput = page.getByText('Filter by title')
        this.filValue = page.getByRole('cell', { name: 'sunt aut facere repellat' });
        this.exports = page.getByRole('button', { name: 'Export CSV' });
        this.view = page.getByRole('button', { name: 'View' });
        this.close = page.getByRole('button', { name: 'Close drawer' });
        this.user = page.getByRole('link', { name: 'Users' });
        this.sort = page.getByRole('button', { name: 'Sort A→Z' });
        this.sortValue = page.getByRole('cell', { name: 'Ervin Howell' })

    }

    async navigate() {
        await this.page.goto('/login');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async goToPosts() {
        await this.posts.click();
    }

    async filterPosts(title) {
        await expect(this.filterInput).toBeVisible();
        await this.filterInput.fill(title);
        await expect(this.filValue).toBeVisible();
    }

    async exportCSV() {
        await this.exports.click();
    }

    async viewPost() {
        await this.view.click();
        await expect(this.close).toBeVisible();
    }

    async closeDrawer() {
        await this.close.click();
        await expect(this.exports).not.toBeVisible();
    }

    async goToUsers() {
        await this.user.click();
    }

    async sortUsers() {
        await this.sort.click();
        await expect(this.sortValue).toBeVisible();
    }


}

module.exports = { LoginPage };