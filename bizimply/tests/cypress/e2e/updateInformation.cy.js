describe('update data', () => {
  const env = Cypress.env();

  before(() => {
    cy.login(env.login.username, env.login.password);
  });

  it('update your employee personal data', () => {
    cy.openProfilePage();
    cy.updateProfileData(env.profile_data);

    //assert that an alert message displayed showing that the profile is updated successfully
    cy.get('.alert').should('be.visible');
    cy.get('.alert').should('contain', 'Your profile was successfully updated.');
  });

});