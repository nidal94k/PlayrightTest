import test, { expect } from "../base/Fixtures/BaseTest"
import { testData } from "./testData";
import { locators } from "../pages/widgetsPage/widgetsPageLocators";

test.describe('TC05', () => {

  test("Verify the tooltip", async ({ page, dashboardPage, widgetsPage }, testinfo) => {
    //arrange
    page.goto(testData.qa);

    //assert - Page title
    await expect(page).toHaveTitle("DEMOQA");

    //actions
    await dashboardPage.navigateTo("Widgets");
    await widgetsPage.navigateToToolTips();
    await widgetsPage.hoverOverButton();

    //assert - Verify tooltip is shown and text is matching
    await expect(page.locator(locators.ButtonToolTip)).toBeVisible();
    expect((await page.locator(locators.ButtonToolTip).innerText()).toString()).toBe(testData.ButtonHoverText); 

    //actions
    await widgetsPage.hoverOverTextButton();

    //assert - Verify tooltip is not shown anymore
    await expect(page.locator(locators.ButtonToolTip)).toBeVisible();
    expect((await page.locator(locators.ButtonToolTip).innerText()).toString()).not.toEqual(testData.ButtonHoverText); 
    });
})