export default class UsersPage {
  constructor(page) {
    this.page = page
    this.usersTableHeader = page.locator("//h1[text()='Users']/following-sibling::table//th[text()='Username']")
    this.sortAZButton = page.locator("//button[text()='Sort A→Z']")
    this.drawerTitle = page.locator("(//aside//strong)[1]")
    this.closeDrawerButton = page.locator("button[aria-label='Close drawer']")
  }

  getViewButton(index = 0) {
    return this.page.locator(`(//button[text()='View'])[${index + 1}]`)
  }

  getNameBeforeView(index = 0) {
    return this.page.locator(`(//button[text()='View'])[${index + 1}]/../preceding-sibling::td[2]`)
  }

  async openUserDrawer(index = 0) {
    const name = await this.getNameBeforeView(index).textContent()
    await this.getViewButton(index).click()
    return name
  }

  async getNamesInOrder() {
    const cells = this.page.locator("//tr/td[1]")
    const count = await cells.count()
    const names = []
    for (let i = 0; i < count; i++) {
      names.push((await cells.nth(i).textContent()).trim())
    }
    return names
  }
}
