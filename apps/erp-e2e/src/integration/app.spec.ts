import { getGreeting } from '../support/app.po';

describe('erp', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to erp!');
  });
});
