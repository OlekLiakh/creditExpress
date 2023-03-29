require('@cypress/xpath')

class CallForm {
    elements = {
        callFormButton: () => cy.get('#call-form-button'),
        callForm: () => cy.get('#call-form'),
        saveButton: () => cy.get('#form-save'),
        successMessage: () => cy.get('.MuiAlert-message'),
        dropDownRecords: () => cy.get('[role=listbox] li'),
        fields: {
            "Call Type": {
                element: () => cy.get('#call-type-wrapper'),
                errorMessage: () => cy.get('#call-type-wrapper  > span')
            },
            "Phone Number": {
                element: () => cy.get('#phone-number-wrapper'),
                errorMessage: () => cy.get('#phone-number-wrapper p')
            },
            "Call Result": {
                element: () => cy.get('#call-result'),
                errorMessage: () => cy.get('div:has( > textarea#call-result) ~ p')
            },
            "Result Type": {
                element: () => cy.get('#result-type-wrapper'),
                errorMessage: () => cy.get('#result-type-wrapper > span')
            },
            "Call Reason": {
                element: () => cy.get('#call-reason-wrapper'),
                errorMessage: () => cy.get('#call-reason-wrapper > span')
            },
        }
    }

    //region ACTIONS
    openCallForm() {
        this.elements.callFormButton()
            .should("be.visible")
            .click()
        this.verifyCallFormIsPresent()
        return this
    }

    selectOptionInDropDownForField(fieldName, value) {
        this.elements.fields[fieldName].element().click()
        cy.contains(value).click()
        this.elements.fields[fieldName].element().find('input').should('have.value', value)
        return this
    }

    fillCallResultWithText(text) {
        this.elements.fields['Call Result'].element().type(text)
        return this
    }

    clickOnSaveButton() {
        this.elements.saveButton().click()
        return this
    }

    //endregion

    //region VERIFIES
    verifyCallFormIsPresent(isPresent = true) {
        this.elements.callForm()
            .should(`${isPresent ? 'be.visible' : 'not.exist'}`)
        return this
    }

    verifyFieldIsPresented(fieldName, isPresent = true) {
        this.elements.fields[fieldName].element()
            .should(`${isPresent ? 'be.visible' : 'not.exist'}`)
        return this
    }

    verifyDropDownForFieldHasValues(fieldName, values = []) {
        this.elements.fields[fieldName].element().click()
        this.elements.dropDownRecords()
            .each(($element, index) => {
                expect($element).to.have.text(values[index])
            })
        return this
    }

    verifyErrorMessageIsPresentForField(fieldName, isPresent = true) {
        this.elements.fields[fieldName].errorMessage()
            .should(`${isPresent ? 'be.visible' : 'not.exist'}`)
        return this
    }

    verifySuccessMessageIsPresent(isPresent = true) {
        if (isPresent) {
            this.elements.successMessage()
                .should('be.visible')
                .and('have.text', 'Successfully saved!')
        } else {
            this.elements.successMessage().should('not.exist')
        }
        return this
    }

    //endregion
}

module.exports = new CallForm();
