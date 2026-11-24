import { Page, Locator, expect } from "@playwright/test";

export class PlaygroundHomePage {
  readonly page: Page;
  readonly appLauncherMenu: Locator;
  readonly searchAppsAndItems: Locator;
  readonly appsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appLauncherMenu = page.getByTitle("App Launcher");

    this.searchAppsAndItems = page.getByRole("combobox", {
      name: "Search apps and items...",
    });

    this.appsList = page.getByRole("option");
  }

  async clickAppLauncher(): Promise<void> {
    await this.appLauncherMenu.click();
  }

  async searchAndSelectApp(app: string): Promise<void> {
    await expect(this.searchAppsAndItems).toBeVisible();
    await this.searchAppsAndItems.fill(app);

    const appLocator = this.appsList.filter({
      hasText: new RegExp(`^${app}$`, "i"),
    });

    await expect(appLocator).toBeVisible();
    await appLocator.click();
  }
}
