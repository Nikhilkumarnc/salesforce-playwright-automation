import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;

  readonly container: Locator;
  readonly profileIcon: Locator;
  readonly handsOnOrgs: Locator;

  constructor(page: Page) {
    this.page = page;

    this.container = page.getByRole("link", { name: "Trailhead", exact: true });
    this.profileIcon = page.locator(".profile-icon");
    this.handsOnOrgs = page.getByRole("link", { name: "Hands-On Orgs" });
  }
  async isHomePageContainerLoaded(): Promise<void> {
    await expect(this.container).toBeVisible();
  }

  async hoverOnProfile(): Promise<void> {
    await this.profileIcon.hover();
  }

  async clickHandsOnOrgs(): Promise<void> {
    await this.handsOnOrgs.click();
  }
}
