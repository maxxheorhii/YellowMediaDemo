// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
import {Constants} from "../e2e/fixtures/constants";
import {BasePo} from "../e2e/page-objects/base-po";

const basePage = new BasePo()

// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

beforeEach(() => {
    basePage.openPage(Constants.baseUrl)
    basePage.clickElement(basePage.cookiePolicyButton)
})