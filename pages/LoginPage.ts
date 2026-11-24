import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginBtn = page
      .getByRole("link", {
        name: "Login to Trailhead",
        exact: true,
      })
      .last();
  }

  async clickLoginToTrailhead(): Promise<void> {
    await this.loginBtn.click();
  }
}
