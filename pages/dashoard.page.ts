import { expect, Page } from '@playwright/test';
 import constants from '../helper/constants.json' assert { type: 'json' };

export default class DashboardPage {

    constructor(private page: Page) {
        this.page = page;
    }

    private elements = {

        welcomeText: () => this.page.getByText('Welcome, Demo User!'),
        dashboardLink: () => this.page.getByRole('link', { name: 'Dashboard' }),
        goToPostsLink: () => this.page.getByRole('link', { name: 'Go to Posts' }),
        goToUsersLink: () => this.page.getByRole('link', { name: 'Go to Users' }),
        logoutButton: () => this.page.getByRole('button', { name: 'Logout' }),
        postsLink: () => this.page.getByRole('link', { name: 'Posts' }),
        usersLink: () => this.page.getByRole('link', { name: 'Users' })
    }

    async verifyWelcomeText(){
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.elements.welcomeText()).toHaveText(constants.dashboard.welcomeText)
    }

     async verifygoToPostsLink(){       
        await expect(this.elements.dashboardLink()).toBeVisible();
    }
 async verifyGoToPostsLink(){       
        await expect(this.elements.goToPostsLink()).toBeVisible();
    }
async verifyGoToUsersLink(){       
        await expect(this.elements.goToUsersLink()).toBeVisible();
    }

    async verifyLogoutButton(){       
        await expect(this.elements.logoutButton()).toBeVisible();
    }
}