Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('/');
  
      cy.get('#user_user_name').type(username);
      cy.get('#user_password').type(password);
  
      cy.contains('Sign in').click();
    });

    cy.visit('/');
  });

Cypress.Commands.add('openProfilePage', () => {
    cy.contains('Update information').click();
});

Cypress.Commands.add('updateProfileData', (profileData) => {
    //select title
    cy.get('#select2-employee_title-container').click()
    cy.get('#select2-employee_title-results').find('li').contains(profileData.title).click();

    //type phone number
    cy.get('#employee_phone_number').clear().type(profileData.phone_number);

    //select country
    cy.get('#employee_address_record_attributes_country-button').click();
    cy.get('#employee_address_record_attributes_country-menu').find('li').contains(profileData.country).click();

    // type birth date
    cy.get('#employee_date_of_birth').clear().type(profileData.birth_date)
    cy.get('.ui-datepicker-days-cell-over > .ui-state-default').click();

    //select ethnicity
    cy.get('#select2-employee_ethnicity-container').click();
    cy.get('#select2-employee_ethnicity-results').find('li').contains(profileData.ethnicity).click();

    //type passport expiry date
    cy.get('#employee_passport_expiry').clear().type(`${profileData.passport_expiry}{esc}`);

    cy.contains('Save').click();
});

Cypress.Commands.add('openTimeOffPage', () => {
    cy.contains('Time Off').click();
});

Cypress.Commands.add('createTimeOffRequest', (vacation, type) => {
    cy.get('#new_time_off_button').click();
    if(type == vacation.type.holiday){
        cy.get('#employee_time_off_request_time_off_category_id').select(vacation.type.holiday);
        cy.get('#employee_time_off_request_reason').type(vacation.reason);
    } else if(type == vacation.type.other) {
        cy.get('#employee_time_off_request_time_off_category_id').select(vacation.type.other);
        cy.get('#employee_time_off_request_reason').type(vacation.half_day.note);
        }
    cy.get('#employee_time_off_request_start_date').type(vacation.date.start_date);
    cy.get('.ui-datepicker-days-cell-over > .ui-state-default').click();
    cy.get('#employee_time_off_request_end_date').type(vacation.date.end_date);
    cy.get('.ui-datepicker-days-cell-over > .ui-state-default').click();  
});

Cypress.Commands.add('submitRequest', () => {
    cy.contains('Submit').click();
});

Cypress.Commands.add('confirm', () => {
    cy.get('#ok-button-time-off').click();
});

Cypress.Commands.add('deleteRequest', () => {
    cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).find('td').eq(6).find('a').click();
});