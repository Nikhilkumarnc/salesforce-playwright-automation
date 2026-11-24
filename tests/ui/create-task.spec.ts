import { test } from "../../fixtures/playgroundSetup.fixture";
import { expect } from "@playwright/test";

import usersData from "../../test-data/users-data.json";

const leadUser = usersData.leads.userJames;
const leadUserFullName = `${leadUser.firstName} ${leadUser.lastName}`;

test("create task", async ({ salesforce }) => {
  const { salesforcePage, salesforcePages } = salesforce;

  await salesforcePages.salesHomePage.clickContactsTab();

  await expect(
    salesforcePage.getByRole("heading", { name: "My Contacts" }),
  ).toBeVisible({
    timeout: 15000,
  });

  await salesforcePages.contactsPage.selectContact(leadUserFullName);
  await salesforcePages.contactDetailsPage.openMoreLogCallActions();
  await salesforcePages.contactDetailsPage.clickAddCallToToDoList();

  await salesforcePages.newTaskCallFormPage.selectSubject("Call");
  await salesforcePages.newTaskCallFormPage.selectTaskDate(
    "2027",
    "December",
    "29",
  );
  await salesforcePages.newTaskCallFormPage.selectRelatedTo(leadUser.company);
  await salesforcePages.newTaskCallFormPage.selectTaskStatus("Not Started");
  await salesforcePages.newTaskCallFormPage.clickSave();
  await expect(
    salesforcePage.getByText('Task "Call" was created.'),
  ).toBeVisible();
});
