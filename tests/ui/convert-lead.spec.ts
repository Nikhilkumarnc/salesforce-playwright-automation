import { test, expect } from "../../fixtures/playgroundSetup.fixture";

import usersData from "../../test-data/users-data.json";

const leadUser = usersData.leads.userJames;
const leadUserFullName = `${leadUser.firstName} ${leadUser.lastName}`;

test("open lead", async ({ salesforce }) => {
  const { salesforcePage, salesforcePages } = salesforce;

  await salesforcePages.salesHomePage.clickLeadsTab();

  await salesforcePages.leadsPage.selectLead(leadUserFullName);

  await salesforcePages.leadAccountPage.clickConvertButton();

  await salesforcePages.convertLeadFormPage.clickConvertButton();

  await expect(
    salesforcePage.getByText("Your lead has been converted"),
  ).toBeVisible();

});
