// Deliberately flaky; candidate should stabilize.
import { test, expect } from '@playwright/test'
import envData from '../testData/env.json' assert { type: 'json' };


test('intentionally failing expectation', async ({ page }) => {
  await page.goto(envData.url)
  // Wrong expectation on purpose to trigger a failure and generate trace on retry
  const dashBoard = page.getByRole('link', { name: 'Dashboard' });
  const posts = page.getByRole('link', { name: 'Posts' });
  const users = page.getByRole('link', { name: 'Users' });
  await expect(dashBoard).toBeVisible();
  await expect(posts).toBeVisible();
  await expect(users).toBeVisible();
  await expect(dashBoard).toHaveText('Dashboard');
  await expect(posts).toHaveText('Posts');
   await expect(users).toHaveText('Users');
})
