const {defineConfig} = require("cypress")

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        charts: true,
        reportPageTitle: 'Cypress Report',
        embeddedScreenshots: true,
        inlineAssets: true,
    },
    video: false,
    e2e: {
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on)
        },
    },
    env: {
        URL: 'https://bold-sun-8337.fly.dev',
    }
})
