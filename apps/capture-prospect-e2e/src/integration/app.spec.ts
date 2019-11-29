import { getGreeting } from '../support/app.po';

describe('capture-prospect', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to capture-prospect!');
  });
});
