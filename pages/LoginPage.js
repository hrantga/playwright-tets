export default class LoginPage {
  constructor(page) {
    this.page = page
    this.usernameInput = page.getByLabel('Username')
    this.passwordInput = page.getByLabel('Password')
    this.loginButton = page.getByRole('button', { name: 'Login' })
  }

  async goto() {
    await this.page.goto('/login')
  }

  async login(username = 'demo', password = 'pass123') {
    await this.goto()
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async logout() {
    await this.page.locator("//button[text()='Logout']").click()
  }

  async isLoggedIn() {
    return this.page.locator("//button[text()='Logout']").isVisible()
  }
}
