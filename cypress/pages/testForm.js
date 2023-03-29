// //div[textarea[@id='call-result']]/following-sibling::p
// div:has( > textarea#call-result) ~ p

class TestForm{
    elements = {
        callFormButton:() => cy.get('#call-form-button'),
        callForm: () => cy.get('#call-form'),
        callTypeDropDown: () => cy.get('#call-type'),
        // phoneNumberDropDown: () => cy.get('#phone-number-wrapper'),
        phoneNumberDropDown: {
            element: () => cy.get('#phone-number-wrapper'),
            errorMessage: () => cy.get('#phone-number-wrapper > span')
        },
        callReasonDropDown: () => cy.get('#call-reason'),
        resultType: () => cy.get('#result-type'),
        callResultTextBox: () => cy.get('#call-result'),
        saveButton: () => cy.get('#form-save')
    }

    openCallForm() {
        this.elements.callFormButton.click()
        this.elements.callForm().should('be.visible')
    }
}