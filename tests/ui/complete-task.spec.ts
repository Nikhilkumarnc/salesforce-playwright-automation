import { test } from "../../fixtures/playgroundSetup.fixture";
import { expect } from "@playwright/test";

import usersData from "../../test-data/users-data.json";

const leadUser = usersData.leads.userJames;
const leadUserFullName = `${leadUser.firstName} ${leadUser.lastName}`;

test("complete task", async ({ salesforce }) => {
  const { salesforcePage, salesforcePages } = salesforce;

  await salesforcePages.salesHomePage.clickContactsTab();

  await expect(
    salesforcePage.getByRole("heading", { name: "My Contacts" }),
  ).toBeVisible({
    timeout: 15000,
  });
  await salesforcePages.contactsPage.selectContact(leadUserFullName);

  await salesforcePages.contactDetailsPage.completeTask("Change Status");
});
