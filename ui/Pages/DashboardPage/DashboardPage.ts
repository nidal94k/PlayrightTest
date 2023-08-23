import { Page} from "@playwright/test";
import { locators } from "./dashboardPageLocators";
import { CommonPage } from "../../base/common/commonPage";
import { CommonScenario } from "../../base/common/commonScenario";

export class DashboardPage extends CommonPage {
    constructor(public page: Page, readonly scenario: CommonScenario) {
        super(page, scenario);
    }
    async navigateTo(requestedPage: string)
    {
        switch(requestedPage) { 
            case "Forms": { 
               await this.page.locator(locators.FormsCategory).click();
               await this.page.waitForLoadState("domcontentloaded");
               break; 
            } 
            case "Elements": { 
                await this.page.locator(locators.ElementsCategory).click();
                await this.page.waitForLoadState("domcontentloaded");
               break; 
            } 
            case "Widgets": { 
                await this.page.locator(locators.WidgetsCategory).click();
                await this.page.waitForLoadState("domcontentloaded");
                break; 
             } 
             case "Interactions": { 
                await this.page.locator(locators.InteractionsCategory).click();
                await this.page.waitForLoadState("domcontentloaded");
                break; 
             } 
            } 
    }
}