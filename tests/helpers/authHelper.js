import { TestData } from '../test-data/testData.js';

export async function authenticate(page) {
  await page.goto(TestData.routes.root);
  await page.evaluate((token) => {
    localStorage.setItem('auth_token', token);
  }, TestData.tokens.authToken);
}

export async function clearAuth(page) {
  await page.goto(TestData.routes.root);
  await page.evaluate(() => {
    localStorage.removeItem('auth_token');
  });
}

