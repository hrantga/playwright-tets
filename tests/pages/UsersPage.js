import { test, expect } from '@playwright/test'
export class UsersPage {
    constructor(page) {
        this.page = page;
        this.sortButton = page.getByRole('button', { name: 'Sort A→Z' });
        this.viewButton = page.getByRole('button', { name: 'View' }).first();
        this.closeButton = page.getByRole('button', { name: 'Close' });


    }
    async clickOnSortButton() {
        await this.sortButton.click();
    }
    async clickOnFirstViewButton() {
        await this.viewButton.click();
    }

    async clickOnCloseButton() {
        await this.closeButton.click();
    }
    async validateFirstUserDetails() {
        const firstrow = this.page.getByRole('row').nth(1);
        expect(firstrow.getByRole('cell').nth(0).toHaveText('Ervin Howell'));
        expect(firstrow.getByRole('cell').nth(1).toHaveText('Antonette'));

    }

}

