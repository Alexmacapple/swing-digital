// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 0,
    reporter: [['html', { open: 'never' }], ['list']],
    use: {
        baseURL: 'http://localhost:8080',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'desktop-1920',
            use: { viewport: { width: 1920, height: 1080 } },
        },
        {
            name: 'desktop-1024',
            use: { viewport: { width: 1024, height: 768 } },
        },
        {
            name: 'tablette-768',
            use: { viewport: { width: 768, height: 1024 } },
        },
        {
            name: 'mobile-375',
            use: { viewport: { width: 375, height: 812 } },
        },
    ],
    webServer: {
        command: 'python3 -m http.server 8080 --directory src',
        port: 8080,
        reuseExistingServer: true,
    },
});
