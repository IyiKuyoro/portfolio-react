describe('Login', () => {
  it('should load the login page', () => {
    cy.visit('/login');
  });

  it('should show error if email is empty', () => {
    cy.get('#userName')
      .type('   ');

    cy.contains('Please provide a username');
  });

  it('should show error if email is empty', () => {
    cy.get('#password')
      .type('password')
      .clear();

    cy.contains('Please provide a password');
  });

  it('should login with fake details', () => {
    cy.get('#userName')
      .type('user');
    cy.get('#password')
      .type('pass');

    cy.contains('submit')
      .click();

    cy.contains('Authorization error');
  });

  it('should log user in', () => {
    cy.get('#userName')
      .clear()
      .type('testuser');
    cy.get('#password')
      .clear()
      .type('password');

    cy.contains('submit')
      .click();

    cy.contains('Hi, I am Opeoluwa Iyi-Kuyoro');
  });

  it('should not be able to revisit login page', () => {
    cy.visit('/login');

    cy.get('#userName')
      .clear()
      .type('testuser');
    cy.get('#password')
      .clear()
      .type('password');

    cy.contains('submit')
      .click();

    cy.contains('Hi, I am Opeoluwa Iyi-Kuyoro');
  });
});
