describe('Edit Article', () => {
  beforeEach(() => {
    cy.serverLogin();
  });

  it('should publish article', () => {
    cy.visit('/write');

    cy.get('.lX9hHA2LkBu-nb0o7Q5vI')
      .clear()
      .type('Edit Article Title');
    cy.get('.ck-content')
      .clear()
      .type('To Edit');
    cy.get('#tech-btn')
      .click();

    cy.contains('Publish')
      .click();
  });

  it('written article should be editable', () => {
    cy.visit('/');
    cy.contains('Edit Article Title')
      .click();

    cy.contains('Edit');
  });

  it('should be able to load article for editing', () => {
    cy.visit('/');
    cy.contains('Edit Article Title')
      .click();

    cy.contains('Edit')
      .click();

    cy.url().should('include', '/write');
  });

  it('should edit article title', () => {
    cy.visit('/');
    cy.contains('Edit Article Title')
      .click();
    cy.contains('Edit')
      .click();

    cy.get('.lX9hHA2LkBu-nb0o7Q5vI')
      .clear()
      .type('New Demo Article Title');
    cy.contains('Republish')
      .click();

    cy.url().should('include', '/read');
    cy.contains('New Demo Article Title');
  });
});
