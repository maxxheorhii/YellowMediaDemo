export class BasePo {
    baseLink = '[href="{replacePart}"]'
    navigationButton = '.header__nav'
    breadcrumbsList = '[typeof="BreadcrumbList"]'
    cookiePolicyButton = '.cookie-policy__button'
    baseButton = 'button'

    openPage(pageUrl) {
        cy.visit(pageUrl)
    }

    clickElement(locator, index) {
        if (typeof index !== 'undefined') {
            cy.get(locator).eq(index).click();
        } else {
            cy.get(locator).click();
        }
    }

    clickElementByText(locator, text) {
        cy.get(locator).contains(text).scrollIntoView().click()
    }

    transformDynamicSelector(selector, dynamicPart, replaceItem) {
        return selector.replace(dynamicPart, replaceItem)
    }

    checkElementWitTextVisibility(selector, text) {
        cy.get(selector).contains(text).scrollIntoView().should('be.visible')
    }

    checkElementVisibility(selector) {
        cy.get(selector).scrollIntoView().should('be.visible')
    }

    checkMultipleElementsWithTextVisibility(elements, selector) {
        for (let i = 0; i < elements.length; i++) {
            this.checkElementWitTextVisibility(selector, elements[i])
        }
    }

    clickMultipleElementsByText(elements, selector) {
        for (let i = 0; i < elements.length; i++) {
            this.clickElementByText(selector, elements[i])
        }
    }

    checkElementsQuantity(selector, quantity) {
        for(let i = 0; i < quantity; i++) {
            cy.get(selector).eq(i).scrollIntoView().should('be.visible')
        }
    }

    interceptRequest(requestType, endpoint) {
        cy.intercept(requestType, endpoint).as('interceptedRequest');
    }

    checkInterceptedRequest(requestType, endpoint, expectedStatusCode, isResponseChecked) {
        // TODO: Cypress can have issues with intercepting multiple requests one by one.
        //  Wait serves as handler for this issue but there still could be flaky error related to code status.
        //  Try to restart test if it appears
        cy.wait('@interceptedRequest' , { timeout: 30000 }).then(interception => {
            cy.wait(5000)
            if(isResponseChecked && interception.response && interception.response.body !== '') {
                 // TODO: Commented code below is correct, but due to image stored directly into request,
                 //    comparison takes all of Cypress memory -> leads to stuck test.
                //    Current realisation is check that body includes data
                // let response = JSON.stringify(interception.response.body)
                // let formattedBody = JSON.stringify(body)
                // expect(response).to.deep.eq(formattedBody);


                expect(interception.response.body).to.have.property('data');
            }

            cy.wrap(interception.response).should(response => {
                expect(response.statusCode).to.equal(expectedStatusCode);
            });
        });
    }
}