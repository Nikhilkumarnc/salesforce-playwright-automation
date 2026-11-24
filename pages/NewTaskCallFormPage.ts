import { type Page, type Locator } from "@playwright/test";

export class NewTaskCallFormPage {
  private readonly page: Page;
  readonly subjectCombobox: Locator;
  readonly dueDateButton: Locator;
  readonly saveButton: Locator;
  readonly nextMonthArrow: Locator;
  readonly previousMonthArrow: Locator;
  readonly selectYear: Locator;
  readonly monthBar: Locator;
  readonly currentMonthTitle: Locator;
  readonly daysBody: Locator;
  readonly relatedToLabel: Locator;
  readonly relatedToDropdown: Locator;
  readonly taskStatusDropdown: Locator;
  readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.subjectCombobox = page.getByRole("combobox", {
      name: "Subject",
    });

    this.saveButton = page.getByRole("button", {
      name: "Save",
      exact: true,
    });

    this.dueDateButton = page.getByRole("button", {
      name: "Select a date for Due Date",
    });

    this.monthBar = page.locator(".slds-datepicker__filter_month");

    this.currentMonthTitle = page.locator('[id^="month-title"]');

    this.previousMonthArrow = page.getByRole("button", {
      name: "Previous Month",
    });

    this.nextMonthArrow = page.getByRole("button", { name: "Next Month" });

    this.selectYear = page.getByLabel("Pick a Year");

    this.daysBody = page.locator("tbody:visible");

    this.relatedToLabel = page
      .locator("label")
      .filter({ hasText: /^Related To$/ });

    this.relatedToDropdown = page
      .locator("label")
      .filter({ hasText: /^Related To$/ })
      .locator("xpath=following-sibling::div")
      .locator('input[role="combobox"]');

    this.taskStatusDropdown = page.locator("a[role='combobox']");

    this.saveBtn = page.getByRole("button", { name: "Save" });
  }

  async selectSubject(sub: string): Promise<void> {
    await this.subjectCombobox.fill(sub);
  }

  async selectTaskDate(
    year: string,
    month: string,
    day: string,
  ): Promise<void> {
    await this.dueDateButton.click();
    await this.selectYear.click();
    await this.selectYear.selectOption(year);
    await this.monthBar.click();
    for (let i = 1; i <= 12; i++) {
      const currentMonth = (await this.currentMonthTitle.textContent())?.trim();
      console.log("currentMonth: ", currentMonth);
      const currentMonthNumber =
        new Date(`${currentMonth} 1, 2000`).getMonth() + 1;
      console.log("currentMonthNumber: ", currentMonthNumber);

      const targetMonthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;
      console.log("targetMonth: ", month);
      console.log("targetMonthNumber: ", targetMonthNumber);

      if (currentMonthNumber === targetMonthNumber) {
        break;
      }
      if (currentMonthNumber < targetMonthNumber) {
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

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async selectRelatedTo(relatedTo: string): Promise<void> {
    await this.relatedToDropdown.click();
    await this.page.getByRole("option", { name: relatedTo }).click();
  }

  async selectTaskStatus(taskStatus: string): Promise<void> {
    await this.taskStatusDropdown.click();
    await this.page.getByRole("option", { name: taskStatus }).click();
  }

  async clickSave(): Promise<void> {
    await this.saveBtn.click();
  }
}
