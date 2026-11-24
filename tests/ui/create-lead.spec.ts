import { test } from "../../fixtures/playgroundSetup.fixture";

import usersData from "../../test-data/users-data.json";

const leadUser = usersData.leads.userJames;

test("create lead-conversion", async ({ salesforce }) => {
  const { salesforcePage, salesforcePages } = salesforce;

  await salesforcePages.salesHomePage.clickLeadsDropdown();

  await salesforcePages.salesHomePage.clickNewLead();

  await salesforcePages.newLeadFormPage.clickSalutationDropdown();

  await salesforcePages.newLeadFormPage.selectSalutation(leadUser.salutation);

  await salesforcePages.newLeadFormPage.enterFirstName(leadUser.firstName);

  await salesforcePages.newLeadFormPage.enterLastName(leadUser.lastName);

  await salesforcePages.newLeadFormPage.enterCompany(leadUser.company);

  await salesforcePages.newLeadFormPage.enterEmail(leadUser.email);

  await salesforcePages.newLeadFormPage.selectLeadStatus(leadUser.leadStatus);

  await salesforcePages.newLeadFormPage.clickSave();
});
