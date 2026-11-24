import { test as base, Page } from "@playwright/test";

import { TrailheadHomePage } from "../pages/TrailheadHomePage";
import { LoginPage } from "../pages/LoginPage";
import { EmailFieldPage } from "../pages/EmailFieldPage";
import { DashboardPage } from "../pages/DashboardPage";
import { HandsOnOrgsPage } from "../pages/HandsOnOrgsPage";
import { PlaygroundPage } from "../pages/PlaygroundPage";
import { PlaygroundHomePage } from "../pages/PlaygroundHomePage";
import { SalesHomePage } from "../pages/SalesHomePage";
import { NewLeadFormPage } from "../pages/NewLeadFormPage";
import { LeadsPage } from "../pages/LeadsPage";
import { LeadAccountPage } from "../pages/LeadAccountPage";
import { ContactDetailsPage } from "../pages/ContactDetailsPage";
import { ConvertLeadFormPage } from "../pages/ConvertLeadFormPage";
import { NewTaskCallFormPage } from "../pages/NewTaskCallFormPage";
import { ContactsPage } from "../pages/ContactsPage";

export type PageObjects = {
  trailheadHomepage: TrailheadHomePage;
  loginPage: LoginPage;
  emailFieldPage: EmailFieldPage;
  dashboardPage: DashboardPage;
  handsOnOrgPage: HandsOnOrgsPage;
  playgroundPage: PlaygroundPage;
  playgroundHomePage: PlaygroundHomePage;
  salesHomePage: SalesHomePage;
  newLeadFormPage: NewLeadFormPage;
  leadsPage: LeadsPage;
  leadAccountPage: LeadAccountPage;
  convertLeadFormPage: ConvertLeadFormPage;
  contactDetailsPage: ContactDetailsPage;
  newTaskCallFormPage: NewTaskCallFormPage;
  contactsPage: ContactsPage;
};

export function createPageObjects(page: Page): PageObjects {
  return {
    trailheadHomepage: new TrailheadHomePage(page),
    loginPage: new LoginPage(page),
    emailFieldPage: new EmailFieldPage(page),
    dashboardPage: new DashboardPage(page),
    handsOnOrgPage: new HandsOnOrgsPage(page),
    playgroundPage: new PlaygroundPage(page),
    playgroundHomePage: new PlaygroundHomePage(page),
    salesHomePage: new SalesHomePage(page),
    newLeadFormPage: new NewLeadFormPage(page),
    leadsPage: new LeadsPage(page),
    leadAccountPage: new LeadAccountPage(page),
    convertLeadFormPage: new ConvertLeadFormPage(page),
    contactDetailsPage: new ContactDetailsPage(page),
    newTaskCallFormPage: new NewTaskCallFormPage(page),
    contactsPage: new ContactsPage(page),
  };
}

export const test = base.extend<{ pages: PageObjects }>({
  pages: async ({ page }, use) => {
    const pages = createPageObjects(page);

    await use(pages);
  },
});

export const expect = test.expect;
