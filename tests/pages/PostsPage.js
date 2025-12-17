import { BasePage } from './BasePage.js';

export class PostsPageLocators {
  static pageHeading = 'h1:has-text("Posts")';
  static filterInput = 'input[placeholder="Filter by title"]';
  static exportButton = 'button:has-text("Export CSV")';
  static postsTable = 'table[role="table"]';
  static tableRows = 'tbody tr';
}

export class PostsPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = PostsPageLocators;
  }

  async goto() {
    await super.goto('/posts');
  }

  async filterByTitle(title) {
    await this.page.getByPlaceholder('Filter by title').fill(title);
  }

  async clickExportCSV() {
    return await this.page.getByRole('button', { name: 'Export CSV' }).click();
  }

  getFilteredRows(text) {
    return this.page.getByRole('row').filter({ hasText: new RegExp(`\\b${text}\\b`, 'i') });
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

  getPostsTable() {
    return this.page.locator(this.locators.postsTable);
  }

  getTableRows() {
    return this.page.locator(this.locators.tableRows);
  }

  getExportButton() {
    return this.page.getByRole('button', { name: 'Export CSV' });
  }

  async getTableHeader(headerText) {
    return this.page.locator(`th:has-text("${headerText}")`);
  }
}

