import test, { expect } from "../base/Fixtures/BaseTest"
import { testData } from "./testData";
import { locators } from "../pages/elementsPage/elementsPageLocators";

test.describe.configure({ mode: 'serial' });
test.describe('TC02', () => {

  test("Verify broken image", async ({ page, dashboardPage, elementsPage }, testinfo) => {
    //arrange
    page.goto(testData.qa);

    //assert - Page title
    await expect(page).toHaveTitle("DEMOQA");

    //actions
    await dashboardPage.navigateTo("Elements");

    await elementsPage.clickOnBrokenLinkImages();

    //assert - Add web-tables modal has opened
    await expect(page.locator(locators.BrokenImage)).toBeVisible();
    expect((await elementsPage.brokenLinkImagesValue()).toString()).toBe(testData.BrokenImage);
    });
})