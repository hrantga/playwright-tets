export default class DashboardPage {
  constructor(page) {
    this.page = page
    this.usersLink = page.locator("a[href*='users']").first()
    this.postsLink = page.locator("a[href*='posts']").first()
  }

  async navigateToUsers() {
    await this.usersLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async navigateToPosts() {
    await this.postsLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }
}
