import { Page, expect, TestInfo } from "@playwright/test"
import { locators } from "./FormsPageLocators";
import { CommonPage } from "../../base/common/CommonPage";
import { CommonScenario } from "../../base/common/CommonScenario";

export class FormsPage extends CommonPage {
    constructor(public page: Page, readonly scenario: CommonScenario) {
        super(page, scenario);
    }
    async clickOnPracticeForm()
    {
        await this.page.locator(locators.PracticeForm).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async fillForm(firstName: string, lastName: string, email: string, gender: string,
        mobile: string, dateOfBirth: string, subjects: string, hobbies: string,
        currentAddress: string, stateAndCity: string)
        {
            var StateAndCity_array = stateAndCity.split(',')


            await this.page.locator(locators.FirstName).fill(firstName);
            await this.page.locator(locators.LastName).fill(lastName);
            await this.page.locator(locators.Email).fill(email);
            await this.page.locator(locators.Mobile).fill(mobile);
            await this.page.locator(locators.CurrentAddress).fill(currentAddress);

            if(gender.match("Male"))
            await this.page.locator(locators.GenderMale).click();
            else if(gender.match("Female"))
            await this.page.locator(locators.GenderFemale).click();
            else if(gender.match("Other"))
            await this.page.locator(locators.GenderOther).click();

            await this.page.locator(locators.DateBirth).fill(dateOfBirth);

//----------   //there's a bug here!  Playwright Assignment can't be found   ---------\\
           //await this.page.locator(locators.Subjects).fill(subjects); 
            
            if(hobbies.match("Sports"))
            await this.page.locator(locators.HobbiesSports).click();
            if(hobbies.match("Reading"))
            await this.page.locator(locators.HobbiesReading).click();
            if(hobbies.match("Music"))
            await this.page.locator(locators.HobbiesMusic).click();

            await this.page.evaluate(() => {
                document.body.style.transform = 'scale(0.5)'
              })

           await this.pickState(StateAndCity_array[0]);
           await this.pickCity("Delhi");

           await this.uploadPicture();
        }

        async pickState(state: string)
        {
            await this.page.locator(locators.State).click();
            for (const row of await this.page.locator(locators.StateOptions).all()) {
                const valueOfRow = await row.textContent();
                if (valueOfRow == state) {
                    row.click();
                    break;
                }
            }
        }

        async pickCity(city: string)
        {
            await this.page.locator(locators.City).click();
            await this.page.locator(locators.CityOptions).click();
        } 

        async submit()
        {
            await this.page.locator(locators.Submit).click();
        }

        async uploadPicture()
        {
            await this.page.setInputFiles(locators.Picture, 'tests/DwightSC.jpg')
        }
}