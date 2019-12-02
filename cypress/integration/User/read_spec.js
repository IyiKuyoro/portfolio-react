describe('Read Article', () => {
  it('should be able to load native article', () => {
    cy.visit('/');
  });

  it('written article should be editable', () => {
    cy.visit('/');
    cy.contains('Demo Article 1')
      .click();

    cy.contains('Demo Article 1');
    cy.contains('Test User');
  });
});
