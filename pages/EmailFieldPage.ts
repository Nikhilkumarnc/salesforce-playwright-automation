import { Page, Locator } from "@playwright/test";

import users from "../test-data/users.json";
const user = users.userNik;

export class EmailFieldPage {
  readonly page: Page;

  readonly emailField: Locator;
  readonly nextBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.nextBtn = page.getByRole("button", { name: "Next" });
  }

  async enterEmail(): Promise<void> {
    await this.emailField.fill(user);
  }

  async clickNextBtn() {
    await this.nextBtn.click();
  }
}
