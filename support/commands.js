// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
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

Cypress.Commands.add("login", () => {

        cy.visit("https://finance.dev.fabrique.studio/accounts/login", {
            auth: {
              username: "fabrique",
              password: "fabrique",
            },
          });
          cy.get("input[type='email']").type('admin@admin.ad');
          cy.get("input[type='password']").type("admin");
          cy.contains('Далее').click()
          cy.contains('Перейти на главную страницу системы').click()
    });