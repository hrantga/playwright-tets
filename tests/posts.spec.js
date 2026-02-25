import { test, expect } from './fixtures.js'
import PostsPage from '../pages/PostsPage.js'

test.describe('Posts', () => {
  test('filter posts, verify, and export CSV', async ({ authenticatedPage, dashboardPage }) => {
    const postsPage = new PostsPage(authenticatedPage)

    await dashboardPage.navigateToPosts()

    await expect(postsPage.postsTableHeader).toBeVisible()

    const title = await postsPage.openPostDrawer(0)
    await expect(postsPage.drawerTitleContent).toContainText(title)
    await postsPage.closeDrawerButton.click()

    await postsPage.exportCsvButton.click()

    await postsPage.filterInput.pressSequentially('quasi')
    await expect(postsPage.page.locator("//tr/td[2]/self::td[contains(text(),'quasi')]").first()).toBeVisible()
    await expect(postsPage.page.locator("//tr/td[2]/self::td[not(contains(text(),'quasi'))]")).toHaveCount(0)

    await postsPage.exportCsvButton.click()
  })
})
