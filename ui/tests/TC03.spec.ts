import test, { expect } from "../base/Fixtures/BaseTest"
import { testData } from "./TestData";
import { locators } from "../Pages/FormsPage/FormsPageLocators";

test.describe.configure({ mode: 'serial' });
test.describe('TC03', () => {

  test("Verify user can submit the form", async ({ page, dashboardPage, formsPage }, testinfo) => {
    //arrange
    page.goto(testData.qa);

    //assert - Page title
    await expect(page).toHaveTitle("DEMOQA");

    //actions
    await dashboardPage.navigateTo("Forms");
    await formsPage.clickOnPracticeForm();

    await formsPage.fillForm(testData.FirstNameTC03, testData.LastNameTC03, testData.Email,
        testData.Gender, testData.Mobile, testData.DateBirth, testData.Subjects, testData.Hobbies
        , testData.CurrentAddress, testData.StateAndCity);

    await formsPage.submit();
    
    //assert - Modal is visible and data is as expected
    await expect(page.locator(locators.Modal)).toBeVisible();
    expect((await page.locator(locators.StudentFullName).innerText()).toString())
    .toBe(testData.FirstNameTC03+" "+testData.LastNameTC03);
    expect((await page.locator(locators.StudentEmail).innerText()).toString()).toBe(testData.Email);
    expect((await page.locator(locators.StudentMobile).innerText()).toString()).toBe(testData.Mobile);
    expect((await page.locator(locators.StudentDateOfBirth).innerText()).toString().replace(",", " ")).toBe(testData.DateBirth);
    expect((await page.locator(locators.StudentHobbies).innerText()).toString()).toBe(testData.Hobbies);
    expect((await page.locator(locators.StudentPicture).innerText()).toString()).toBe(testData.Picture);
    expect((await page.locator(locators.StudentAddress).innerText()).toString()).toBe(testData.CurrentAddress);
    expect((await page.locator(locators.StudentStateNCity).innerText()).toString()).
    toBe(testData.StateAndCity.replace(",", " "));
    expect((await page.locator(locators.StudentGender).innerText()).toString()).toBe(testData.Gender);
    expect((await page.locator(locators.StudentSubject).innerText()).toString()).toBe(testData.Subjects); //bug
    });
})