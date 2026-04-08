import { test } from '@playwright/test'
import { PostPage } from "../pages/posts.ts"
import { LoginPage } from "../pages/login.ts"

test('filter posts, verify, export CSV and view window - Positive case', async ({ page, context }) => {
    const postPage = new PostPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('demo', 'pass123')
    await postPage.goto();
    await postPage.filterAndVerify();
    await postPage.clickOnExportCsv();
    await postPage.clickOnViewButtonAndVerify();
})

test('wrong filter input will not show data', async ({ page, context }) => {
    const postPage = new PostPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('demo', 'pass123')
    await postPage.goto();
    await postPage.assertWrongFilterDataNotShown();
})

test('view button is not visible if wrong filter input', async ({ page, context }) => {
    const postPage = new PostPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('demo', 'pass123')
    await postPage.goto();
    await postPage.assertWrongFilterDataNotShown();
    await postPage.assertViewButtonNotVisible();
})
