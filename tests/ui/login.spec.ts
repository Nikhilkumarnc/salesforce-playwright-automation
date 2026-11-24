import { test, expect } from "../../fixtures/login.fixture";

test("@smoke Verify authenticated user", async ({
  authenticatedPage,
  pages,
  page,
}) => {
  await pages.dashboardPage.isHomePageContainerLoaded();
  await expect(page.getByRole("img", { name: "My Account" })).toBeVisible();
});
