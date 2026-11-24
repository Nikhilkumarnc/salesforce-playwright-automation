import { expect, Locator, Page } from "@playwright/test";

export class PlaygroundPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly cancelButton: Locator;
  readonly createButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
      exact: true,
    });
    this.createButton = page.getByRole("button", {
      name: "Create",
      exact: true,
    });
    this.closeButton = page.getByRole("button", { name: /close/i });
  }

  async enterPlaygroundName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async clickCreate(): Promise<void> {
    await expect(this.createButton).toBeEnabled();
    await this.createButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async closeDialog(): Promise<void> {
    await this.closeButton.click();
  }
}
