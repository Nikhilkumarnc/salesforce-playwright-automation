import { test } from "../../fixtures/playgroundSetup.fixture";
import { expect } from "@playwright/test";

import usersData from "../../test-data/users-data.json";

const leadUser = usersData.leads.userJames;
const leadUserFullName = `${leadUser.firstName} ${leadUser.lastName}`;

test("Opportunity management", async ({ salesforce }) => {
  const { salesforcePage, salesforcePages } = salesforce;

  await salesforcePages.salesHomePage.clickContactsTab();

  await expect(
    salesforcePage.getByRole("heading", { name: "My Contacts" }),
  ).toBeVisible({
    timeout: 15000,
  });

  await salesforcePages.contactsPage.selectContact(leadUserFullName);
  await salesforcePages.contactDetailsPage.clickOpportunitiesNewBtn();
  await salesforcePages.contactDetailsPage.enterOpportunityName(
    "James Smith Ltd - Software Subscription",
  );
  await salesforcePages.contactDetailsPage.verifyOpportunityAccountName(
    "James Smith Ltd",
  );
  await salesforcePages.contactDetailsPage.enterOpportunityAmount("50000");
  await salesforcePages.contactDetailsPage.selectOpportunityDate(
    "2027",
    "January",
    "31",
  );

  await salesforcePages.contactDetailsPage.selectOpportunityStage();
  await salesforcePages.contactDetailsPage.saveOpportunity();
});
