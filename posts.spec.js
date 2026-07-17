import { test, expect } from "@playwright/test";

test("filter posts, verify, and export CSV", async ({ page, context }) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill("demo");
  await page.getByLabel("Password").fill("pass123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(
    page.getByRole("heading", { name: "Welcome, Demo User!" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  const postButton = await page.getByText("Go to Posts");
  await expect(postButton).toBeVisible();
  await postButton.click();
  await expect(page).toHaveURL(/\/posts/);
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();

  // Filter post
  const filterInput = await page.getByPlaceholder("Filter by title");
  expect(filterInput).toBeVisible();
  expect(page.getByText("qui est esse")).toBeVisible();
  await filterInput.fill("sunt aut facere");

  expect(page.getByText("qui est esse")).not.toBeVisible();
  expect(page.getByText("sunt aut facere")).toBeVisible();

  // Export CSV
  const exportButton = await page.getByRole("button", { name: "Export CSV" });
  await expect(exportButton).toBeVisible();
  await exportButton.click();
});
