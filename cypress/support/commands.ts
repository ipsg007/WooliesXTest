/// <reference types="cypress" />

import HomePage from "../integration/pageobjects/HomePage";

// export {};

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            gotoHomePage(): Chainable<HomePage>;  
        }
    }
}


Cypress.Commands.add('gotoHomePage', () => {
    cy.visit('').then(() => new HomePage());
  });