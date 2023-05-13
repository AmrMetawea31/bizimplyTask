const { defineConfig } = require('cypress');

module.exports = defineConfig({
    defaultCommandTimeout: 10000,
    numTestsKeptInMemory: 2,

    e2e: {
        baseUrl: 'https://app.bizimply.com/',
        testIsolation: false,
        experimentalRunAllSpecs: true,
      },

    env: {
        login:{
            username: "nmorsy+amr@bizimply.com",
            password: "Pa$$w0rd"
        },
        
        profile_data:{
            title: "Mx",
            phone_number: "123456",
            country: "Egypt",
            birth_date: "9/1/1997",
            ethnicity: "Middle Eastern",
            passport_expiry: "13/10/2023"
        },
        vacation:{
            type:{
            holiday: "Holiday",
            other: "Other",
            },
            date:{
            start_date: "",
            end_date: ""
            },
            period: 3,
            reason: "Travelling with family",
            half_day:{
                period: 1,
                note: "This is a half day request",
            }

        }
        
    },
})