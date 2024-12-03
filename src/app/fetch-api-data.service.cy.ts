/// <reference types="cypress" />

import { FetchApiDataService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: FetchApiDataService;

  beforeEach(() => {
    // Initializes the service instance to be tested
    service = new FetchApiDataService(Cypress.env('httpClient'));
  });

  it('should be created', () => {
    // Verifies if the service instance is created successfully
    expect(service).to.exist; // Using Chai's `exist` assertion, included with Cypress
  });
});
