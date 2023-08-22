import { Page } from "@playwright/test"
import { locators } from "./InteractionsPageLocators";
import { CommonPage } from "../../base/common/CommonPage";
import { CommonScenario } from "../../base/common/CommonScenario";

export class InteractionsPage extends CommonPage {
    constructor(public page: Page, readonly scenario: CommonScenario) {
        super(page, scenario);
    }
    async navigateToDroppable()
    {
        await this.page.locator(locators.DroppableTab).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async dragDrop() {
        const source = this.page.locator(locators.DraggableBox);
        const target = this.page.locator(locators.DroppableBox).first();
    
        await source.click();
        await source.hover();
        await source.click();
        await this.page.mouse.down();
        const box = (await target.boundingBox())!;
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await this.page.mouse.up();
    }

    async verifyDroppableBoxColour(): Promise<string>
    {
      const progressColor = await this.page.locator(locators.DroppableBox).first().evaluate((element) =>
      window.getComputedStyle(element).getPropertyValue('background-color'));
  
      return progressColor;
    }
}