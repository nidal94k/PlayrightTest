import { Page, expect, TestInfo } from "@playwright/test"
import { locators } from "./ElementsPageLocators";
import { CommonPage } from "../../base/common/CommonPage";
import { CommonScenario } from "../../base/common/CommonScenario";

export class ElementsPage extends CommonPage {
    constructor(public page: Page, readonly scenario: CommonScenario) {
        super(page, scenario);
    }
    async navigateToWebTables()
    {
        await this.page.locator(locators.WebTables).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async addWebTables()
    {
        await this.page.locator(locators.WebTablesAdd).click();
    }

    async fillWebTables(firstName: string, lastName: string, age: number, email: string, 
        salary: number, department: string)
    {
        await this.page.locator(locators.FirstNameInput).fill(firstName);
        await this.page.locator(locators.LastNameInput).fill(lastName);
        await this.page.locator(locators.AgeInput).fill(age.toString());
        await this.page.locator(locators.EmailInput).fill(email);
        await this.page.locator(locators.SalaryInput).fill(salary.toString());
        await this.page.locator(locators.DepartmentInput).fill(firstName);
    }

    async submitWebTables()
    {
        await this.page.locator(locators.Submit).click();
    }

    async verifyUserAdded(emailFinder: string) : Promise<boolean>
    {
        await this.page.locator(locators.SearchInput).type(emailFinder);
        let userFound = false;
        for (const row of await this.page.locator(locators.Rows).all()) {
            const emailOfRow = await row.locator(".rt-td:nth-child(4)").textContent();
            if (emailFinder == emailOfRow) {
                userFound = true;
                break;
            }
        }
        await this.page.locator(locators.SearchInput).clear();
        return userFound;
    }

    async extractEmailFromRow(row: number) : Promise<string|null>
    {
        var emailLocator = locators.FindEmail.replace("row", row.toString());
        let emailValue = this.page.locator(emailLocator).innerText();
        return emailValue;
    }

    async editSecondRow()
    {
        await this.page.locator(locators.Edit).click();
    }

    async editFirstName(firstName: string)
    {
        await this.page.locator(locators.FirstNameInput).clear()
        await this.page.locator(locators.FirstNameInput).fill(firstName);
    }

    async editLastName(lastName: string)
    {
        await this.page.locator(locators.LastNameInput).clear()
        await this.page.locator(locators.LastNameInput).fill(lastName);
    }

    async extractValueFromTable(email: string|null, value: string) : Promise<string|null>
    {
        if (email == null)
        return "";
    
        let returnedValue;
        await this.page.locator(locators.SearchInput).type(email);
        for (const row of await this.page.locator(locators.Rows).all()) {
            const emailOfRow = await row.locator(".rt-td:nth-child(4)").textContent();
            if (email == emailOfRow) {
                break;
            }
        }
        switch(value) { 
            case "first name": { 
               returnedValue = this.page.locator(locators.FindFirstName).textContent();
               break; 
            } 
            case "last name": { 
               returnedValue = this.page.locator(locators.FindLastName).textContent();
               break; 
            } 
            case "age": { 
               returnedValue = this.page.locator(locators.FindAge).textContent();
               break; 
            } 
            case "salary": { 
               returnedValue = this.page.locator(locators.FindSalary).textContent();
               break; 
            } 
             case "department": { 
               returnedValue = this.page.locator(locators.FindDepartment).textContent();
               break; 
            } 
         } 

        await this.page.locator(locators.SearchInput).clear();
        return returnedValue;
    }

    async clickOnBrokenLinkImages()
    {
        await this.page.locator(locators.BrokenLinksImages).click()
    }

    async brokenLinkImagesValue() : Promise<string>
    {
        let src = await this.page.locator(locators.BrokenImage).getAttribute("src");
        if(src!=null)
            return src
        return "";
    }
}