import test, { expect } from "../base/Fixtures/BaseTest"
import { testData } from "./TestData";
import { locators } from "../Pages/WidgetsPage/WidgetsPageLocators";

test.describe('TC04', () => {

  test("Verify the progress bar", async ({ page, dashboardPage, widgetsPage }, testinfo) => {
    //arrange
    page.goto(testData.qa);

    //assert - Page title
    await expect(page).toHaveTitle("DEMOQA");

    //actions
    await dashboardPage.navigateTo("Widgets");
    await widgetsPage.navigateToProgressBar();

    //assert - Verify not started and colour is as expected
    await expect(page.locator(locators.ProgressBar)).toBeVisible();
    expect((await widgetsPage.verifyProgressBarColour()).toString()).toBe(testData.BackgroundColour_before);
    expect(await page.locator(locators.ProgressBarCurrentValue).getAttribute("aria-valuenow")).toBe("0");

    //actions
    await widgetsPage.start();
    await widgetsPage.stopAfterSeconds(3);

    //assert - Progress bar is progressing and color changes
    expect((await widgetsPage.verifyProgressBarColour()).toString()).toBe(testData.BackgroundColour_before);
    expect(Number(await page.locator(locators.ProgressBarCurrentValue).getAttribute("aria-valuenow"))).toBeGreaterThan(20);
    expect(Number(await page.locator(locators.ProgressBarCurrentValue).getAttribute("aria-valuenow"))).toBeLessThan(70);
    
    //actions
    await widgetsPage.start();
    await widgetsPage.waitUntilProgressIsDoneLoading();
    
    //assert - 
    await expect(page.locator(locators.ProgressBarSuccess)).toBeVisible();
    expect((await widgetsPage.verifyProgressBarColour()).toString()).toBe(testData.BackgroundColour_after);
    expect(Number(await page.locator(locators.ProgressBarCurrentValue).getAttribute("aria-valuenow"))).toBe(100);

    //actions
    await widgetsPage.reset();

    //assert
    await expect(page.locator(locators.Start)).toBeVisible();
    expect((await widgetsPage.verifyProgressBarColour()).toString()).toBe(testData.BackgroundColour_before);
    expect(await page.locator(locators.ProgressBarCurrentValue).getAttribute("aria-valuenow")).toBe("0");    
  });
})