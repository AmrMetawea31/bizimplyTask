describe('time off requests', () => {
    const env = Cypress.env();

    before(() => {
      cy.login(env.login.username, env.login.password);
    });

    context('creating time off requests', () => {
    it('create holiday time off request after 3 days', () => {
        // set the date to be after 2 days
        const today = new Date();
        today.setDate(today.getDate() + 2);
        const startDate = `${('0' + today.getDate()).slice(-2)}/${('0' + (today.getMonth() + 1)).slice(-2)}/${today.getFullYear()}`;
        const endDate = `${('0' + (today.getDate() + (env.vacation.period - 1))).slice(-2)}/${('0' + (today.getMonth() + 1)).slice(-2)}/${today.getFullYear()}`;
        env.vacation.date.start_date = startDate;
        env.vacation.date.end_date = endDate;
        cy.openTimeOffPage();
        cy.createTimeOffRequest(env.vacation, env.vacation.type.holiday);
        cy.submitRequest();

        //verify that confimation dialogue contains correct data
        cy.get('#confirmation-dialog-request-for').should('have.text', env.vacation.type.holiday);
        cy.get('#confirmation-dialog-starting-on').should('have.text', env.vacation.date.start_date);
        cy.get('#confirmation-dialog-ending-on').should('have.text', env.vacation.date.end_date);
        cy.get('#confirmation-dialog-days').should('have.text', env.vacation.period);
        cy.get('#confirmation-dialog-reason').should('have.text', env.vacation.reason);

        //confirm dialogue
        cy.confirm();
        
        //verify that request displayed in time off list with status pending
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.type.holiday)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.date.start_date)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.date.end_date)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.period)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.reason)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', 'Pending')
      });

    it('create other type time off request for a half day', () => {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        const startDate = `${('0' + today.getDate()).slice(-2)}/${('0' + (today.getMonth() + 1)).slice(-2)}/${today.getFullYear()}`;
        const endDate = `${('0' + today.getDate()).slice(-2)}/${('0' + (today.getMonth() + 1)).slice(-2)}/${today.getFullYear()}`;
        env.vacation.date.start_date = startDate;
        env.vacation.date.end_date = endDate;

        cy.openTimeOffPage();
        cy.createTimeOffRequest(env.vacation, env.vacation.type.other);

        cy.get('.other_choice_msg').should('have.text','* Please note that Other leave is not deducted from your holiday allowance ')
        cy.submitRequest();

        //verify that confimation dialogue contains correct data
        cy.get('#confirmation-dialog-request-for').should('have.text', env.vacation.type.other);
        cy.get('#confirmation-dialog-starting-on').should('have.text', env.vacation.date.start_date);
        cy.get('#confirmation-dialog-ending-on').should('have.text', env.vacation.date.end_date);
        cy.get('#confirmation-dialog-days').should('have.text', env.vacation.half_day.period);
        cy.get('#confirmation-dialog-reason').should('have.text', env.vacation.half_day.note);

        //confirm dialogue
        cy.confirm();
        
        //verify that request displayed in time off list with status pending
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.type.other)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.date.start_date)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.date.end_date)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.half_day.period)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', env.vacation.half_day.note)
        cy.get('#time-off-requests-employee-list').find('tbody').find('tr').eq(0).should('contain', 'Pending')
      });

    it('delete created request', () => {
        cy.openTimeOffPage();
        cy.deleteRequest();

        //assert that an alert message displayed showing that the request is deleted successfullt
        cy.get('.alert').should('be.visible')
        cy.get('.alert').should('contain', 'Time Off Request was successfully deleted.')
    });

    it('test submit button without filling all the fields', () => {
        cy.openTimeOffPage();
        cy.get('#new_time_off_button').click();

        //assert that the submit button is disabled
        cy.contains('Submit').should('be.disabled');
    });

    it('check that request has to be done at least before 2 days', () => {
        const today = new Date();

        cy.openTimeOffPage();
        cy.get('#new_time_off_button').click();
        cy.get('#employee_time_off_request_start_date').click();
        cy.get('.ui-datepicker-unselectable > .ui-state-default').should('contain', today.getDate());
        cy.get('.ui-datepicker-unselectable > .ui-state-default').should('contain', today.getDate() + 1);
    });
  });
});