import { type Page, type Locator } from "@playwright/test";

export class ConvertLeadFormPage {
  readonly page: Page;
  readonly convertButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.convertButton = page.locator(
      "span[class='targetingSpan slds-var-m-left_x-small runtime_sales_leadConvertModalFooter'] button[type='button']",
    );
  }

  async clickConvertButton(): Promise<void> {
    await this.convertButton.click();
  }
}
