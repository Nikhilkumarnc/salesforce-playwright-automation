import { expect, Locator, Page } from "@playwright/test";

export class HandsOnOrgsPage {
  readonly page: Page;
  readonly createplaygroundButton: Locator;
  readonly connectOrgButton: Locator;
  readonly playgroundOrganizationId: Locator;
  readonly playgroundName: Locator;
  readonly renameButton: Locator;
  readonly disconnectButton: Locator;
  readonly launchButton: Locator;
  readonly organizationsCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createplaygroundButton = page.getByRole("button", {
      name: "Create Playground",
      exact: true,
    });

    this.organizationsCard = page.locator(".org-card");

    this.connectOrgButton = page.getByRole("button", {
      name: "Connect Org",
      exact: true,
    });

    this.playgroundOrganizationId = page.locator(
      "//dt[text()='Organization ID']/following-sibling::dd[1]",
    );

    this.playgroundName = page.locator("[id^=org-heading]");

    this.renameButton = page.getByRole("button", {
      name: "Rename",
      exact: true,
    });

    this.disconnectButton = page.getByRole("button", {
      name: "Disconnect",
      exact: true,
    });

    this.launchButton = page.getByRole("button", {
      name: "Launch",
      exact: true,
    });
  }

  async clickCreateplayground(): Promise<void> {
    await expect(this.createplaygroundButton).toBeVisible();
    await this.createplaygroundButton.click();
  }

  async getplaygroundOrgId(orgName: string): Promise<void> {
    const organizationCard = this.organizationsCard.filter({
      hasText: orgName,
    });
    const organizationId = (
      await organizationCard
        .locator(this.playgroundOrganizationId)
        .textContent()
    )?.trim();
    await expect(
      organizationCard.locator(this.playgroundOrganizationId),
    ).toBeVisible();
    console.log("playground orgId: ", organizationId);
  }

  async clickConnectOrg(orgName: string): Promise<void> {
    const organizationCard = this.organizationsCard.filter({
      hasText: orgName,
    });
    await organizationCard.locator(this.launchButton).click();
  }

  async clickRename(): Promise<void> {
    await this.renameButton.click();
  }

  async clickDisconnect(): Promise<void> {
    await this.disconnectButton.click();
  }

  async clickLaunch(): Promise<void> {
    await this.launchButton.click();
  }
}
