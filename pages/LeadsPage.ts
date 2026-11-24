import { type Page, type Locator } from "@playwright/test";

export class LeadsPage {
  private readonly page: Page;
  readonly rows: Locator;
  readonly checkboxes: Locator;
  readonly table: Locator;
  readonly contacts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator("div table tbody tr");
    this.checkboxes = page.locator(".slds-checkbox_faux");
    this.table = page.locator("tbody");
    this.contacts = page.locator('th[data-label="Name"] a');
  }

  async selectLead(leadName: string): Promise<void> {
    await this.table.hover();
    await this.contacts.filter({ hasText: leadName }).scrollIntoViewIfNeeded();
    const contactLink = this.contacts.filter({ hasText: leadName });
    await contactLink.click();
  }
}
