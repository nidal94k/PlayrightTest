import test, { expect } from "../base/Fixtures/BaseTest"
import { testData } from "./testData";
import { locators } from "../pages/elementsPage/elementsPageLocators";

test.describe.configure({ mode: 'serial' });
test.describe('TC01', () => {

  test("Verify user can enter new data into the table", async ({ page, dashboardPage, elementsPage }, testinfo) => {
    //arrange
    page.goto(testData.qa);

    //assert - Page title
    await expect(page).toHaveTitle("DEMOQA");

    //actions
    await dashboardPage.navigateTo("Elements");

    await elementsPage.navigateToWebTables();
    await elementsPage.addWebTables();

    //assert - Add web-tables modal has opened
    await expect(page.locator(locators.Modal)).toBeVisible();

    //action
    await elementsPage.submitWebTables();

    //assert - Can't submit an empty values
    await expect(page.locator(locators.Modal)).toBeVisible();

    //actions
    await elementsPage.fillWebTables(testData.FirstName, testData.LastName, testData.Age,
      testData.Email, testData.Salary, testData.Department);      
    await elementsPage.submitWebTables();

    //assert - Modal is not visible and search table for the new added value
    await expect(page.locator(locators.Modal)).not.toBeVisible();
    expect(elementsPage.verifyUserAdded(testData.Email)).toBeTruthy();
    });

  test("Verify user can edit the row in a table", async ({page, elementsPage }, testinfo) => {
    //arrange
    page.goto("https://demoqa.com/webtables"); //refresh data-set
    let email = await elementsPage.extractEmailFromRow(2);

    //assert
    expect(email).not.toBeNull();

    //actions
    await elementsPage.editSecondRow();

    await elementsPage.editFirstName(testData.EditedFirstName);
    await elementsPage.editLastName(testData.EditedLastName);

    await elementsPage.submitWebTables();
  
    //assert - Edit modal is not visible anymore
    await expect(page.locator(locators.Modal)).not.toBeVisible();
  
    //actions
    let firstName = await elementsPage.extractValueFromTable(email, "first name");
    let lastName = await elementsPage.extractValueFromTable(email, "last name");
  
    //assert - Edit functionality is working
    expect(firstName).toEqual(testData.EditedFirstName);
    expect(lastName).toEqual(testData.EditedLastName);
    });
})