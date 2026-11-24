import { test, expect } from "../../fixtures/login.fixture";

test("Create a new Salesforce Playground", async ({
  authenticatedPage,
  pages,
  page,
}) => {
  test.setTimeout(4 * 60 * 1000);

  await pages.dashboardPage.isHomePageContainerLoaded();
  await pages.dashboardPage.isHomePageContainerLoaded();

  await pages.dashboardPage.hoverOnProfile();

  await pages.dashboardPage.clickHandsOnOrgs();

  await pages.handsOnOrgPage.clickCreateplayground();

  const playgroundName = "Playwright CRM Automation 11";

  await pages.playgroundPage.enterPlaygroundName(playgroundName);

  await pages.playgroundPage.clickCreate();

  const slowExpect = expect.configure({
    timeout: 6 * 60 * 1000,
  });

  await pages.handsOnOrgPage.getplaygroundOrgId(playgroundName);
});
