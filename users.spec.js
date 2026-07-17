import { test, expect } from "@playwright/test";

test("users list can sort A→Z", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill("demo");
  await page.getByLabel("Password").fill("pass123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(
    page.getByRole("heading", { name: "Welcome, Demo User!" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  const postButton = await page.getByText("Go to Users");
  await expect(postButton).toBeVisible();
  await postButton.click();
  await expect(page).toHaveURL(/\/users/);
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

  // Validate 1st td in the table is "Leanne Graham"
  const firstUser = await page.locator("td").first();
  await expect(firstUser).toContainText("Leanne Graham");

  // Sort users A→Z
  const sortButton = await page.getByRole("button", { name: "Sort A→Z" });
  await expect(sortButton).toBeVisible();
  await sortButton.click();

  // Validate 1st td in the table is "Ervin Howell"
  const newFirstUser = await page.locator("td").first();
  await expect(newFirstUser).toContainText("Ervin Howell");
});
