# Playwright automation Testing
End to End testing suite for:

1) API - development of 2 flows, one is happy, the other considers edge cases/user mistakes.
2) UI  - development of 6 test flows as requested in the assignment


## 🤖 Tools

* Playwright https://playwright.dev/
* TypeScript https://www.typescriptlang.org/
* Jest https://jestjs.io/
* chromium
* Postman


## Requirements

In order to utilise this project you need to have the following installed locally:

* Visual Studio Code
* Chrome/FireFox/ (or Chromium)
* Node.js 16+
  
In order for the tests to run, you will need to install the latest version of Playwright

```sh
npm init playwright@latest
```


## 🔨 Usage

Since the project is broken into 2 seperate mini-projects, API & UI testing- Each of these modules can be utilised independently of the other.

To run UI tests only, navigate to `ui` directory and run:
```sh
cd ui
npx playwright test
```

To run API tests only, navigate to `api` directory and run:

```sh
cd api
npx playwright test
```


## 📁 Structure

```sh
 |- api
   |- api 
     |- books # methods realted to books (POST/DELETE)
     |- tokens # methods realted to tokens (POST)
     |- users # methods realted to users (POST/GET)

   |- e2e # tests 🧙‍♂️
     |- happyFlow 
     |- unHappyFlow
     |- testData # here we save data (token/userId/etc)

   |- playwright-report # html report from last run
```
```sh
 |- ui
   |- base
     |- common
       |-commonPage # Configuration/Page object modal
       |-commonScenario # Configuration file
     |- fixtures
       |-baseTest # Configuration/Page object modal

   |- pages 
     |- dashboardPage
       |- dashboardPage # all-functionality realted actions
       |- dashboardLocators # locators of this page
     |- elementsPage
       |- elementsPage # all-functionality realted actions
       |- elementsPageLocators # locators of this page
     |- formsPage
       |- formsPagePage # all-functionality realted actions
       |- formsPageLocators # locators of this page
     |- interactionsPage
       |- interactionsPagePage # all-functionality realted actions
       |- interactionsPageLocators # locators of this page
     |- widgetsPage
       |- widgetsPagePage # all-functionality realted actions
       |- widgetsPageLocators # locators of this page

   |- tests # tests 🧙‍♂️
     |- tc01
     |- tc02
     |- tc03
     |- tc04
     |- tc05
     |- tc06
     |- testData # here we save data (FirstName/backroundColour/etc)

   |- playwright-report # html report from last run

   |- test-results # screenshots of the last run
```


## 📜 Reporting

Reports for each module are written into their respective `/playwright-report` directories after any run.

To run tests and generate a report, navigate to `ui`/`api` directory and run:

```sh
npx playwright test --report=html
```

and to view it after the run:

```sh
npx playwright show-report
```


## BUGS

   * *Summary* : Subject `Playwright Assignment` can't be added to the form.
   
   * *Website* : https://demoqa.com/automation-practice-form
   
   * *Environment* : Prod/TC03
   
   * *Steps* :
   
          a. Navigate to https://demoqa.com/automation-practice-form
   
          b. Fill subject as 'Playwright Assignment'

   * *Current-behaviour* : There's no such option to fill
   
   * *Expected-behaviour* : Users can add 'Playwright Assignment' as a subject