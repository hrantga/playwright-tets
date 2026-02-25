import { test, expect } from './fixtures.js'
import UsersPage from '../pages/UsersPage.js'

test.describe('Users', () => {
  test('users list can sort A→Z', async ({ authenticatedPage, dashboardPage }) => {
    const usersPage = new UsersPage(authenticatedPage)

    await dashboardPage.navigateToUsers()

    await expect(usersPage.usersTableHeader).toBeVisible()

    const name = await usersPage.openUserDrawer(0)
    await expect(usersPage.drawerTitle).toHaveText(name)
    await usersPage.closeDrawerButton.click()

    await usersPage.sortAZButton.click()
    const names = await usersPage.getNamesInOrder()

    for (let i = 1; i < names.length; i++) {
      expect(names[i].localeCompare(names[i - 1]) >= 0).toBeTruthy()
    }
  })
})
