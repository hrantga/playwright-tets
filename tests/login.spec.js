import { test, expect } from '@playwright/test';
import { genericPageMethods } from "./helper/genericPageMethods";
let generic = new genericPageMethods();


test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  await generic.loginWithDetails(page, 'demo', 'pass123', 'Demo');
})
