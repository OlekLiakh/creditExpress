## Setup
There is a prerequisites for running the e2e tests locally:
- installed Node.js version not bellow than 14.0

## Installing the project
Clone repo
```bash
git clone https://github.com/OlekLiakh/creditExpress
```
Open folder "creditExpress"
```bash
cd creditExpress
```
You will need to call command to install the project before first run
```bash
npm install
```
## Running the project
Command for running the project
```bash
npx cypress run
```
By default, Cypress uses Electron browser for running tests

The another browser can also be specified via the "--browser" flag
```bash
npx cypress run --browser firefox
npx cypress run --browser chrome
```

By default, when cypress runs from the CLI, all browsers launch headlessly.
Add flag "--headed" to run test without headless mode:
```bash
npx cypress run --browser chrome --headed
```

Provide flag "--env" to run test on the production environment
```bash
npx cypress run --browser chrome --headed -- env URL=http://google.com
```

## Reports
HTML report, with run results, places in folder "/cypress/reports" after each run

## Test task Requirements notes
1. A ""Call Form" button is visible on the page" verification is provided in method "openCallForm()" every time the call form opens.
2. A "Pop-up window with the form opens after clicking the "Call Form"" verification is provided in method "openCallForm()" every time the call form opens.
3. A "The form fields are updated after changing the "Call Type" drop down list value" verification is provided in method "selectOptionInDropDownForField()" every time the dropDown value is selected.'
4. Rest of requirements are covered by the test cases.

