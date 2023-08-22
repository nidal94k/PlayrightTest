import { Page, expect, TestInfo } from "@playwright/test"
import { locators } from "./WidgetsPageLocators";
import { CommonPage } from "../../base/common/CommonPage";
import { CommonScenario } from "../../base/common/CommonScenario";

export class WidgetsPage extends CommonPage {
    constructor(public page: Page, readonly scenario: CommonScenario) {
        super(page, scenario);
    }

  async navigateToProgressBar() {
    await this.page.locator(locators.ProgressBarTab).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToToolTips() {
    await this.page.locator(locators.ToolTipsTab).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async stopAfterSeconds(value: number) {
    await this.delay(value*1000);
    await this.page.locator(locators.Stop).click();
  } 

  async start() {
    await this.page.locator(locators.Start).click();
  }

  async stop() {
    await this.page.locator(locators.Stop).click();
  }

  async reset() {
    await this.page.locator(locators.Reset).click();
  }

  async waitUntilProgressIsDoneLoading()
  { 
    await this.delay(4000); // on average - could be enhanced
    await this.page.locator(locators.ProgressBarCurrentValue).getAttribute("aria-valuenow") == "100";
  }

  async delay(ms: number) {
    await new Promise( resolve => setTimeout(resolve, ms) );
  }

  async verifyProgressBarColour() : Promise<string>
  {
    const progressColor = await this.page.locator(locators.ProgressBarCurrentValue).evaluate((element) =>
    window.getComputedStyle(element).getPropertyValue('background-color'));

    return progressColor;
  }

  async hoverOverButton()
  {
    await this.page.locator(locators.ToolTipButton).hover();
  }

  async hoverOverTextButton()
  {
    await this.page.locator(locators.ToolTipTextField).hover();
    await this.delay(1000);// delay
  }
}