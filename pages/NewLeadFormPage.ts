import { Page, Locator, expect } from "@playwright/test";

export class NewLeadFormPage {
  readonly page: Page;

  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly companyField: Locator;
  readonly leadStatusDropdown: Locator;
  readonly leadInformationHeader: Locator;

  readonly salutationDropdown: Locator;
  readonly salutationOptions: Locator;
  readonly phoneField: Locator;
  readonly mobileField: Locator;
  readonly titleField: Locator;
  readonly emailField: Locator;
  readonly leadSourceDropdown: Locator;
  readonly websiteField: Locator;
  readonly industryDropdown: Locator;
  readonly annualRevenueField: Locator;
  readonly ratingDropdown: Locator;
  readonly employeesField: Locator;
  readonly faxField: Locator;
  readonly leadStatusOption: Locator;

  readonly streetField: Locator;
  readonly cityField: Locator;
  readonly zipPostalCodeField: Locator;
  readonly stateProvinceField: Locator;
  readonly countryField: Locator;

  readonly productInterestDropdown: Locator;
  readonly currentGeneratorsField: Locator;
  readonly sicCodeField: Locator;
  readonly primaryDropdown: Locator;
  readonly numberOfLocationsField: Locator;

  readonly descriptionField: Locator;

  readonly saveButton: Locator;
  readonly saveAndNewButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.leadInformationHeader = page.locator(
      "//h3/span[text()='Lead Information']",
    );
    this.salutationDropdown = page.getByRole("combobox", {
      name: "Salutation",
    });
    this.salutationOptions = page.getByRole("option");
    this.firstNameField = page.getByRole("textbox", { name: "First Name" });
    this.lastNameField = page.getByRole("textbox", { name: "Last Name" });
    this.companyField = page.getByRole("textbox", { name: "Company" });
    this.phoneField = page.getByLabel("Phone");
    this.mobileField = page.getByLabel("Mobile");
    this.faxField = page.getByLabel("Fax");
    this.titleField = page.getByLabel("Title");
    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.leadSourceDropdown = page.getByLabel("Lead Source");
    this.websiteField = page.getByLabel("Website");
    this.industryDropdown = page.getByLabel("Industry");
    this.annualRevenueField = page.getByLabel("Annual Revenue");
    this.leadStatusDropdown = page.getByRole("combobox", {
      name: "Lead Status",
    });
    this.leadStatusOption = page.getByRole("listbox", { name: "Lead Status" });
    this.ratingDropdown = page.getByLabel("Rating");
    this.employeesField = page.getByLabel("No. of Employees");

    this.streetField = page.getByLabel("Street");
    this.cityField = page.getByLabel("City");
    this.zipPostalCodeField = page.getByLabel("Zip/Postal Code");
    this.stateProvinceField = page.getByLabel("State/Province");
    this.countryField = page.getByLabel("Country");

    this.productInterestDropdown = page.getByLabel("Product Interest");
    this.currentGeneratorsField = page.getByLabel("Current Generator(s)");
    this.sicCodeField = page.getByLabel("SIC Code");
    this.primaryDropdown = page.getByLabel("Primary");
    this.numberOfLocationsField = page.getByLabel("Number of Locations");

    this.descriptionField = page.getByLabel("Description");

    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.saveAndNewButton = page.getByRole("button", { name: "Save & New" });
    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
      exact: true,
    });
  }

  async isLeadInformationHeaderVisible(): Promise<void> {
    await expect(this.leadInformationHeader).toBeVisible();
  }

  async clickSalutationDropdown() {
    await this.salutationDropdown.click();
  }

  async selectSalutation(salutation: string): Promise<void> {
    await this.salutationOptions.getByText(salutation).click();
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameField.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameField.fill(lastName);
  }

  async enterCompany(company: string): Promise<void> {
    await this.companyField.fill(company);
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async selectLeadStatus(leadStatus: string): Promise<void> {
    await this.leadStatusDropdown.click();
    await this.leadStatusOption.getByText(leadStatus).click();
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }

  async clickSaveAndNew(): Promise<void> {
    await this.saveAndNewButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
