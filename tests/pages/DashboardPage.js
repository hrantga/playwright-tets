import { BasePage } from './BasePage.js';

export class DashboardPageLocators {
  static welcomeHeading = 'h1';
  static postsLink = 'a[href="/posts"]';
  static usersLink = 'a[href="/users"]';
  static logoutButton = 'button:has-text("Logout")';
}

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = DashboardPageLocators;
  }

  async goto() {
    await super.goto('/dashboard');
  }

  getWelcomeText() {
    return this.page.getByRole('heading', { name: 'Welcome, Demo User!' });
  }

  async clickPostsLink() {
    await this.page.getByText('Go to Posts').click();
  }

  async clickUsersLink() {
    await this.page.getByText('Go to Users').click();
  }

  async logout() {
    await this.page.locator(this.locators.logoutButton).click();
  }

  getPostsLink() {
    return this.page.getByText('Go to Posts');
  }

  getUsersLink() {
    return this.page.getByText('Go to Users');
  }

  getDashboardLink() {
    return this.page.getByRole('link', { name: 'Dashboard' });
  }

  getPostsHeaderLink() {
    // Header links are in the nav element within header, scope to header to avoid dashboard links
    return this.page.locator('header nav').getByRole('link', { name: 'Posts' });
  }

  getUsersHeaderLink() {
    // Header links are in the nav element within header, scope to header to avoid dashboard links
    return this.page.locator('header nav').getByRole('link', { name: 'Users' });
  }
}

