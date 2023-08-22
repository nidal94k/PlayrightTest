import test, { expect } from "../base/Fixtures/BaseTest"
import { testData } from "./TestData";
import { locators } from "../Pages/InteractionsPage/InteractionsPageLocators";

test.describe('TC06', () => {

  test("Verify user can drag and drop", async ({ page, dashboardPage, interactionsPage }, testinfo) => {
    //arrange
    page.goto(testData.qa);

    //assert - Page title
    await expect(page).toHaveTitle("DEMOQA");

    //actions
    await dashboardPage.navigateTo("Interactions");
    await interactionsPage.navigateToDroppable();
    await interactionsPage.dragDrop();

    //assert - Verify tooltip is shown and text is matching
    await expect(page.locator(locators.DroppableBoxText)).toBeVisible();
    expect((await page.locator(locators.DroppableBoxText).innerText()).toString()).toBe(testData.DroppedText);
    expect((await interactionsPage.verifyDroppableBoxColour()).toString()).toBe(testData.Color); 
    });
})