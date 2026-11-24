import { test as base } from "../fixtures/pageObjects.fixture";

type LoginFixture = {
  authenticatedPage: void;
};

export const test = base.extend<LoginFixture>({
  authenticatedPage: async ({ pages, context }, use) => {
    await pages.trailheadHomepage.navigateToHomePage();

    await context.storageState({ path: "state.json" });

    await use();
  },
});

export const expect = test.expect;
