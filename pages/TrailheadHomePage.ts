import { Page, Locator, expect } from "@playwright/test";

export class TrailheadHomePage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly headerLoginLink: Locator;
  readonly signUpButton: Locator;
  readonly loginButton: Locator;
  readonly mainHeading: Locator;
  readonly loginToTrailHeadLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByRole("searchbox", {
      name: "Search Trailhead",
    });

    this.headerLoginLink = page
      .getByRole("link", { name: "Login", exact: true })
      .first();

    this.mainHeading = page.getByRole("heading", {
      name: "Build Salesforce and AI Skills",
    });

    this.signUpButton = page
      .getByRole("link", {
        name: "Sign Up",
        exact: true,
      })
      .last();

    this.loginButton = page.getByRole("link", {
      name: "Login: Build Salesforce and",
    });

    this.loginToTrailHeadLink = page.getByRole("link", {
      name: "Login to Trailhead",
    });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto("/", {
      waitUntil: "commit",
    });

    await expect(
      this.page.getByRole("link", {
        name: "Trailhead",
        exact: true,
      }),
    ).toBeVisible();
  }

  async verifyHomePageHeading(): Promise<void> {
    await expect(this.mainHeading).toBeVisible();
  }

  async clickLoginToTrailhead(): Promise<void> {
    await this.loginToTrailHeadLink.click();
  }

  async searchTopic(topic: string): Promise<void> {
    await this.searchInput.fill(topic);
    await this.searchInput.press("Enter");
  }

  async clickHeaderLogin(): Promise<void> {
    await this.headerLoginLink.click();
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async clickSignUp(): Promise<void> {
    await this.signUpButton.click();
  }
}
