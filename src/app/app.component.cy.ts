/// <reference types="cypress" />

describe('AppComponent', () => {
    // Run before each test to visit the root URL of the app
    beforeEach(() => {
      cy.visit('/'); // Visit the main page of the app
    });
  
    it('should create the app', () => {
      // Check if the AppComponent is rendered
      cy.get('app-root').should('exist'); // Verifies that the root component (app-root) is present
    });
  
    it('should have title "myFlix-Angular-client"', () => {
      // Check if the title of the app is "myFlix-Angular-client"
      cy.title().should('eq', 'myFlix-Angular-client'); // Verifies the page title
    });
  
    it('should render title in h1', () => {
      // Check if the title appears inside the <h1> tag
      cy.get('h1').should('contain', 'Hello, myFlix-Angular-client'); // Verifies the content of the h1 tag
    });
  });
  