import { test as base, expect } from "../fixtures/login.fixture";

import { createPageObjects } from "../fixtures/pageObjects.fixture";

import type { PageObjects } from "../fixtures/pageObjects.fixture";

import type { Page } from "@playwright/test";

type PlaygroundSetupFixture = {
  salesforce: {
    salesforcePage: Page;
    salesforcePages: PageObjects;
  };
};

export const test = base.extend<PlaygroundSetupFixture>({
  salesforce: async ({ page, pages, authenticatedPage }, use) => {
    await pages.dashboardPage.isHomePageContainerLoaded();

    await pages.dashboardPage.hoverOnProfile();

    await pages.dashboardPage.clickHandsOnOrgs();

    const playgroundCard = page
      .locator(".org-card")
      .filter({ hasText: "Playwright CRM Automation 11" });

    await expect(playgroundCard).toHaveCount(1);

    const [salesforcePage] = await Promise.all([
      page.waitForEvent("popup"),
      playgroundCard.getByRole("link", { name: "Launch", exact: true }).click(),
    ]);

    await salesforcePage.waitForLoadState("domcontentloaded");

    const salesforcePages = createPageObjects(salesforcePage);

    await salesforcePages.playgroundHomePage.clickAppLauncher();

    await salesforcePages.playgroundHomePage.searchAndSelectApp("Sales");

    await use({
      salesforcePage,
      salesforcePages,
    });
  },
});

export { expect };
