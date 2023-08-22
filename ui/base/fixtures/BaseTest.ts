import { DashboardPage } from '../../Pages/DashboardPage/DashboardPage';
import { ElementsPage } from '../../Pages/ElementsPage/ElementsPage';
import { FormsPage } from '../../Pages/FormsPage/FormsPage';
import { InteractionsPage } from '../../Pages/InteractionsPage/InteractionsPage';
import { WidgetsPage } from '../../Pages/WidgetsPage/WidgetsPage';
import { test as baseTest } from "@playwright/test";
import { CommonScenario } from "../common/CommonScenario";
import { CommonPage } from "../common/CommonPage";

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