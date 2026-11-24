import { Page, Locator, expect } from "@playwright/test";

export class SalesHomePage {
  readonly page: Page;

  readonly appLauncher: Locator;
  readonly globalSearch: Locator;
  readonly homeTab: Locator;
  readonly opportunitiesTab: Locator;
  readonly leadsTab: Locator;
  readonly leadsDropdown: Locator;
  readonly tasksTab: Locator;
  readonly filesTab: Locator;
  readonly accountsTab: Locator;
  readonly contactsTab: Locator;
  readonly campaignsTab: Locator;
  readonly dashboardsTab: Locator;
  readonly moreMenu: Locator;
  readonly sellerHomeHeading: Locator;
  readonly viewOpportunitiesButton: Locator;
  readonly viewAccountsButton: Locator;
  readonly viewContactsButton: Locator;
  readonly NewLead: Locator;

  constructor(page: Page) {
    this.page = page;

    this.appLauncher = page.getByRole("button", { name: "App Launcher" });

    this.globalSearch = page.getByRole("searchbox", { name: "Search" });

    this.homeTab = page.getByRole("link", { name: "Home", exact: true });

    this.opportunitiesTab = page.getByRole("link", {
      name: "Opportunities",
      exact: true,
    });

    this.leadsTab = page.getByTitle("Leads");

    this.leadsDropdown = page.getByRole("button", { name: "Leads List" });

    this.NewLead = page.getByRole("menuitem", { name: "New Lead" });

    this.tasksTab = page.getByRole("link", { name: "Tasks", exact: true });

    this.filesTab = page.getByRole("link", { name: "Files", exact: true });

    this.accountsTab = page.getByRole("link", {
      name: "Accounts",
      exact: true,
    });

    this.contactsTab = page.getByRole("link", {
      name: "Contacts",
      exact: true,
    });

    this.campaignsTab = page.getByRole("link", {
      name: "Campaigns",
      exact: true,
    });

    this.dashboardsTab = page.getByRole("link", {
      name: "Dashboards",
      exact: true,
    });

    this.moreMenu = page.getByText("More", { exact: true });

    this.sellerHomeHeading = page.getByRole("heading", {
      name: "Seller Home",
      exact: true,
    });

    this.viewOpportunitiesButton = page.getByRole("button", {
      name: "View Opportunities",
      exact: true,
    });

    this.viewAccountsButton = page.getByRole("button", {
      name: "View Accounts",
      exact: true,
    });

    this.viewContactsButton = page.getByRole("button", {
      name: "View Contacts",
      exact: true,
    });
  }

  async verifySalesHomePageLoaded(): Promise<void> {
    await expect(this.sellerHomeHeading).toBeVisible();
  }

  async clickLeadsTab(): Promise<void> {
    await this.leadsTab.click();
  }

  async clickLeadsDropdown(): Promise<void> {
    await this.leadsDropdown.click();
  }

  async clickNewLead(): Promise<void> {
    await this.NewLead.click();
  }

  async clickOpportunitiesTab(): Promise<void> {
    await this.opportunitiesTab.click();
  }

  async clickAccountsTab(): Promise<void> {
    await this.accountsTab.click();
  }

  async clickContactsTab(): Promise<void> {
    await expect(this.contactsTab).toBeVisible();

    await this.contactsTab.click();

    await expect(
      this.page.getByRole("heading", { name: "My Contacts" }),
    ).toBeVisible({ timeout: 15000 });
  }

  async clickViewOpportunities(): Promise<void> {
    await this.viewOpportunitiesButton.click();
  }

  async clickViewAccounts(): Promise<void> {
    await this.viewAccountsButton.click();
  }

  async clickViewContacts(): Promise<void> {
    await this.viewContactsButton.click();
  }
}
