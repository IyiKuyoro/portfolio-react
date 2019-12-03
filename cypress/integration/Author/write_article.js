describe('Write Article', () => {
  beforeEach(() => {
    cy.serverLogin();
    indexedDB.deleteDatabase('iyikuyoro-portfolio-database');
  });

  it('should not publish without category', () => {
    cy.visit('/write');

    cy.get('.lX9hHA2LkBu-nb0o7Q5vI')
      .clear()
      .type('Title');
    cy.get('.ck-content')
      .clear()
      .type('New Demo Article');

    cy.contains('Publish')
      .click();

    cy.contains('Incomplete request params');
  });

  it('should redirect to login', () => {
    cy.visit('/write');
    cy.get('._1L0LZ-UPXqQ-KWE2X7odQv')
      .click();
    cy.contains('Logout')
      .click();

    cy.visit('/write');
    cy.url().should('include', '/login');
  });

  it('should add article title', () => {
    cy.visit('/write');
    cy.get('.lX9hHA2LkBu-nb0o7Q5vI')
      .clear()
      .type('Title');

    cy.get('.lX9hHA2LkBu-nb0o7Q5vI').should('be', 'New Demo Article');
  });

  it('should add article body', () => {
    cy.visit('/write');

    cy.get('.ck-content')
      .clear()
      .type('New Demo Article');

    cy.get('.ck-content').should('be', 'New Demo Article');
  });

  it('should be able to submit new article', () => {
    cy.visit('/write');

    cy.get('.lX9hHA2LkBu-nb0o7Q5vI')
      .clear()
      .type('Title');
    cy.get('.ck-content')
      .clear()
      .type('New Demo Article');

    cy.contains('Publish');
  });

  it('should publish article', () => {
    cy.visit('/write');

    cy.get('.lX9hHA2LkBu-nb0o7Q5vI')
      .clear()
      .type('Title');
    cy.get('.ck-content')
      .clear()
      .type('New Demo Article');
    cy.get('#tech-btn')
      .click();

    cy.contains('Publish')
      .click();

    cy.url().should('include', '/read');
  });
});
