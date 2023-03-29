import callForm from '/cypress/pages/CallForm.js'
import {testData as dropDownValues} from '/cypress/fixtures/testData/dropDownValues.json'
import {testData as saveFormData} from '/cypress/fixtures/testData/saveFormData.json'

describe('Verify dropDown values', function () {
    beforeEach(() => {
        cy.visit(Cypress.env('URL'))
    })
    dropDownValues.forEach((scenario) => {
        it(`${scenario.label}`, function () {
            callForm
                .openCallForm()
                .verifyFieldIsPresented("Call Type")
                .verifyFieldIsPresented("Phone Number")
                .verifyFieldIsPresented("Call Result")
                .verifyFieldIsPresented("Result Type", false)
                .verifyFieldIsPresented("Call Reason", false)
            if (scenario.callType) {
                callForm
                    .selectOptionInDropDownForField("Call Type", scenario.callType)
                    .verifyFieldIsPresented(scenario.fieldName)
            }
            callForm
                .verifyDropDownForFieldHasValues(scenario.fieldName, scenario.dropDownValues)
        })
    })
})

describe('Verify that form can be saved', function () {
    beforeEach(() => {
        cy.visit(Cypress.env('URL'))
    })
    saveFormData.forEach((scenario) => {
        it(`${scenario.label}`, () => {
            callForm
                .openCallForm()
                .selectOptionInDropDownForField("Call Type", scenario.callType)
                .selectOptionInDropDownForField("Phone Number", scenario.phoneNumber)
                .selectOptionInDropDownForField(scenario.fieldName, scenario.dropDownValue)
                .fillCallResultWithText(scenario.callResult)
                .clickOnSaveButton()
                .verifySuccessMessageIsPresent()
                .verifyCallFormIsPresent(false)
        })
    })
})
describe('Verify error messages', function () {
    it('Verify error messages', () => {
        cy.visit(Cypress.env('URL'))
        callForm
            .openCallForm()
            .clickOnSaveButton()
            .verifySuccessMessageIsPresent(false)
            .verifyCallFormIsPresent()
            .verifyErrorMessageIsPresentForField("Call Type")
            .verifyErrorMessageIsPresentForField("Phone Number")
            .verifyErrorMessageIsPresentForField("Call Result")
            .selectOptionInDropDownForField("Call Type", "Incoming Call")
            .verifyErrorMessageIsPresentForField("Call Type", false)
            .verifyErrorMessageIsPresentForField("Phone Number")
            .verifyErrorMessageIsPresentForField("Call Reason", false)
            .verifyErrorMessageIsPresentForField("Call Result")
            .selectOptionInDropDownForField("Phone Number", "+1 555 444 3333")
            .fillCallResultWithText("Result")
            .clickOnSaveButton()
            .verifySuccessMessageIsPresent(false)
            .verifyCallFormIsPresent()
            .verifyErrorMessageIsPresentForField("Call Type", false)
            .verifyErrorMessageIsPresentForField("Phone Number", false)
            .verifyErrorMessageIsPresentForField("Call Result", false)
            .verifyErrorMessageIsPresentForField("Call Reason")
    })
})
