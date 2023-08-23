import { DashboardPage } from '../../pages/dashboardPage/dashboardPage';
import { ElementsPage } from '../../pages/elementsPage/elementsPage';
import { FormsPage } from '../../pages/formsPage/formsPage';
import { InteractionsPage } from '../../pages/interactionsPage/interactionsPage';
import { WidgetsPage } from '../../pages/widgetsPage/widgetsPage';
import { test as baseTest } from "@playwright/test";
import { CommonScenario } from "../common/commonScenario";
import { CommonPage } from "../common/commonPage";

// declaring the objects type for autocompletion 
interface PageObjects {
    dashboardPage: DashboardPage;
    elementsPage: ElementsPage;
    formsPage: FormsPage;
    interactionsPage: InteractionsPage;
    widgetsPage: WidgetsPage;
    commonPage: CommonPage,
    commonScenarioPage: CommonScenario
}
// intializing all the page objects you have in your app
// and import them as fixture in spec file
const test = baseTest.extend<PageObjects>({
    commonScenarioPage: async ({ page }, use, testinfo) => {
        await use(new CommonScenario(page, testinfo));
    },
    dashboardPage: async ({ page, commonScenarioPage }, use) => {
        await use(new DashboardPage(page, commonScenarioPage));
    },
    elementsPage: async ({ page, commonScenarioPage }, use) => {
        await use(new ElementsPage(page, commonScenarioPage));
    },
    formsPage: async ({ page, commonScenarioPage }, use) => {
        await use(new FormsPage(page, commonScenarioPage));
    },
    interactionsPage: async ({ page, commonScenarioPage }, use) => {
        await use(new InteractionsPage(page, commonScenarioPage));
    },
    widgetsPage: async ({ page, commonScenarioPage }, use) => {
        await use(new WidgetsPage(page, commonScenarioPage));
    },
});
test.beforeEach(async ({ browser }) => {
    console.log('Test is about to start running!');
});

test.afterEach(async ({ }) => {
    console.log('Test has been executed!');
});

// export default and name export so spec files can use it 
export default test;
export const expect = test.expect;