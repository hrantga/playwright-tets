export default class PostsPage {
  constructor(page) {
    this.page = page
    this.postsTableHeader = page.locator("//h1[text()='Posts']/following-sibling::table//th[text()='Title']")
    this.filterInput = page.locator("input[placeholder='Filter by title']")
    this.exportCsvButton = page.locator("//button[text()='Export CSV']")
    this.closeDrawerButton = page.locator("button[aria-label='Close drawer']")
    this.drawerTitleContent = page.locator("//aside//p[./strong[text()='Title:']]")
  }

  getViewButton(index = 0) {
    return this.page.locator(`(//button[text()='View'])[${index + 1}]`)
  }

  getTitleBeforeView(index = 0) {
    return this.page.locator(`(//button[text()='View'])[${index + 1}]/../preceding-sibling::td[1]`)
  }

  async openPostDrawer(index = 0) {
    const title = await this.getTitleBeforeView(index).textContent()
    await this.getViewButton(index).click()
    return title
  }
}
