import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://trailhead.salesforce.com/login");

  await page.getByRole("link", { name: "Login to Trailhead" }).click();
  await page
    .getByRole("textbox", { name: "Business email" })
    .fill("nikhilkumar.temp@gmail.com");
  await page.getByRole("button", { name: "Next" }).click();
  await page.pause();
  await page.context().storageState({ path: "state.json" });
});
