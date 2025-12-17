import { BasePage } from './BasePage.js';

export class LoginPageLocators {
  static usernameInput = 'input[name="username"]';
  static passwordInput = 'input[name="password"]';
  static loginButton = 'button[type="submit"]';
  static errorMessage = '[role="alert"]';
  static loginForm = '[aria-label="Login form"]';
}

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = LoginPageLocators;
  }

  async goto() {
    await super.goto('/login');
  }

  async fillUsername(username) {
    await this.page.getByLabel('Username').fill(username);
  }

  async fillPassword(password) {
    await this.page.getByLabel('Password').fill(password);
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage() {
    return await this.page.locator(this.locators.errorMessage).textContent();
  }

  async isErrorVisible() {
    return await this.page.locator(this.locators.errorMessage).isVisible();
  }

  getLoginForm() {
    return this.page.locator(this.locators.loginForm);
  }

  getUsernameInput() {
    return this.page.getByLabel('Username');
  }

  getPasswordInput() {
    return this.page.getByLabel('Password');
  }

  getErrorElement() {
    return this.page.locator(this.locators.errorMessage);
  }
}

