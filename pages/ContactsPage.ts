import { type Page, type Locator, expect } from "@playwright/test";

export class ContactsPage {
  private readonly page: Page;
  readonly contactRowHeader: Locator;
  readonly contacts: Locator;
  readonly table: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactRowHeader = page.getByRole("rowheader");
    this.contacts = page.locator('th[data-label="Name"] a');
    this.table = page.locator("tbody");
  }

  async selectContact(contactName: string): Promise<void> {
    await this.table.hover();
    await this.contacts
      .filter({ hasText: contactName })
      .scrollIntoViewIfNeeded();
    const contactLink = this.contacts.filter({ hasText: contactName });
    await contactLink.click();
  }
}
