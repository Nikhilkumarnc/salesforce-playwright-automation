import { type Page, type Locator, expect } from "@playwright/test";

export class ContactDetailsPage {
  private readonly page: Page;
  readonly moreLogCallActions: Locator;
  readonly addCallToToDoList: Locator;
  readonly moreOptionsDropdown: Locator;
  readonly moreOptionsMenus: Locator;
  readonly opportunitiesSection: Locator;
  readonly opportunitiesNewBtn: Locator;
  readonly opportunityNameTextBox: Locator;
  readonly opportunityAmountTextBox: Locator;
  readonly opportunityStageDropdown: Locator;
  readonly opportunityAccountName: Locator;

  readonly dueDateButton: Locator;
  readonly monthBar: Locator;
  readonly currentMonthTitle: Locator;
  readonly nextMonthArrow: Locator;
  readonly previousMonthArrow: Locator;
  readonly selectYear: Locator;
  readonly daysBody: Locator;
  readonly opportunitySaveBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.moreLogCallActions = page.getByTitle("More Log a Call Actions");

    this.addCallToToDoList = page.locator("a").filter({
      hasText: "Add Call to To Do List",
    });

    this.moreOptionsDropdown = page.getByRole("button", {
      name: "Show more actions - Call",
      exact: true,
    });
    this.moreOptionsMenus = page.locator('role="menu"');

    this.opportunitiesSection = page
      .locator("lst-list-view-manager-header")
      .filter({ has: page.getByRole("link", { name: "Opportunities" }) });

    this.opportunitiesNewBtn = this.opportunitiesSection.getByRole("button", {
      name: "New",
    });

    this.opportunityNameTextBox = page.getByRole("textbox", {
      name: "Opportunity Name",
    });

    this.opportunityAmountTextBox = page.getByRole("spinbutton", {
      name: "Amount",
    });

    this.dueDateButton = page.getByRole("button", {
      name: "Select a date for Close Date",
    });

    this.monthBar = page.locator(".slds-datepicker__filter_month");

    this.currentMonthTitle = page.locator('[id^="month-title"]');

    this.previousMonthArrow = page.getByRole("button", {
      name: "Previous Month",
    });

    this.nextMonthArrow = page.getByRole("button", { name: "Next Month" });

    this.selectYear = page.getByLabel("Pick a Year");

    this.daysBody = page.locator("tbody:visible");

    this.opportunityStageDropdown = page.getByRole("combobox", {
      name: "Stage",
    });

    this.opportunityAccountName = page.getByRole("combobox", {
      name: "Account Name",
    });

    this.opportunitySaveBtn = page.getByRole("button", {
      name: "Save",
      exact: true,
    });
  }

  async openMoreLogCallActions(): Promise<void> {
    await this.moreLogCallActions.click();
  }

  async clickAddCallToToDoList(): Promise<void> {
    await this.addCallToToDoList.click();
  }

  async completeTask(taskStatusValue: string) {
    await this.moreOptionsDropdown.click();

    await this.page
      .getByRole("menuitem", {
        name: taskStatusValue,
        exact: true,
      })
      .first()
      .click();

    await expect(
      this.page.getByRole("heading", { name: "Change Status" }),
    ).toBeVisible();

    await this.page.getByRole("combobox", { name: "Completed" }).click();

    await this.page.locator("li", { hasText: "Completed" }).click();

    await this.page.getByRole("combobox", { name: "Status Completed" }).click();
  }

  async clickOpportunitiesNewBtn() {
    await this.opportunitiesNewBtn.click();
  }

  async enterOpportunityName(opportunityName: string) {
    await this.opportunityNameTextBox.fill(opportunityName);
  }

  async verifyOpportunityAccountName(opportunityAccountName: string) {
    await expect(this.opportunityAccountName).toHaveValue(
      opportunityAccountName,
    );
  }

  async enterOpportunityAmount(opprtunityAmount: string) {
    await this.opportunityAmountTextBox.fill(opprtunityAmount);
  }

  async selectOpportunityDate(year: string, month: string, day: string) {
    await this.dueDateButton.click();
    await this.selectYear.click();
    await this.selectYear.selectOption(year);
    await this.monthBar.click();
    for (let i = 1; i <= 12; i++) {
      const currentMonth = (await this.currentMonthTitle.textContent())?.trim();
      const currentMonthInNumber =
        new Date(`${currentMonth} 1, 2000`).getMonth() + 1;
      const targetMonthInNumber = new Date(`${month} 1, 2000`).getMonth() + 1;
      if (currentMonthInNumber === targetMonthInNumber) {
        break;
      }
      if (currentMonthInNumber < targetMonthInNumber) {
        await this.nextMonthArrow.click();
      } else {
        await this.previousMonthArrow.click();
      }
    }

    const monthInNumberWithPadStart = String(
      new Date(`${month} 1, 2000`).getMonth() + 1,
    ).padStart(2, "0");

    const formattedDate = `${year}-${monthInNumberWithPadStart}-${day.padStart(2, "0")}`;

    const targetDate = this.page.locator(
      `td[role="gridcell"][data-value="${formattedDate}"]:not(.slds-day_adjacent-month)`,
    );
    await targetDate.click();
  }
  async selectOpportunityStage() {
    await this.opportunityStageDropdown.click();
    await this.page.getByText("Closed Won").click();
  }

  async saveOpportunity() {
    await this.opportunitySaveBtn.click();
  }
}
