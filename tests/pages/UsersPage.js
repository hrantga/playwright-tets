import { BasePage } from './BasePage.js';

export class UsersPageLocators {
  static pageHeading = 'h1:has-text("Users")';
  static sortButton = 'button:has-text("Sort A→Z")';
  static usersTable = 'table[role="table"]';
  static tableRows = 'tbody tr';
}

export class UsersPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = UsersPageLocators;
  }

  async goto() {
    await super.goto('/users');
  }

  async clickSortAZ() {
    await this.page.locator(this.locators.sortButton).click();
  }

  getUserRows() {
    return this.page.locator(this.locators.tableRows);
  }

  async isPageLoaded() {
    return await this.page.locator(this.locators.pageHeading).isVisible();
  }

  async clickViewButton(index = 0) {
    const viewButtons = this.page.getByRole('button', { name: 'View' });
    await viewButtons.nth(index).click();
  }

  getViewButtons() {
    return this.page.getByRole('button', { name: 'View' });
  }

  getSortButton() {
    return this.page.locator(this.locators.sortButton);
  }

  getUsersTable() {
    return this.page.locator(this.locators.usersTable);
  }

  getTableHeaders() {
    return this.page.locator('th');
  }

  getUserNameElement(name) {
    return this.page.getByText(name);
  }
}

