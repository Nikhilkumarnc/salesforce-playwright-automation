import { type Page, type Locator } from "@playwright/test";

export class LeadAccountPage {
  readonly convertButton: Locator;

  constructor(page: Page) {
    this.convertButton = page.getByRole("button", {
      name: "Convert",
      exact: true,
    });
  }

  async clickConvertButton(): Promise<void> {
    await this.convertButton.click();
  }
}
