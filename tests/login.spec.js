import { test, expect } from '@playwright/test';
import { genericPageMethods } from "./helper/genericPageMethods";


test('happy path login redirects to dashboard and shows welcome text', async ({ page }) => {
  let generic = new genericPageMethods(page);
  await generic.loginWithDetails('demo', 'pass123', 'Demo');
})
