import { defineConfig } from '/opt/node22/lib/node_modules/playwright/test.mjs';

export default defineConfig({
    testDir: './tests/e2e',
    use: {
        baseURL: 'http://localhost:8080',
        headless: true,
    },
    webServer: {
        command: 'http-server . -p 8080 -c-1 --silent',
        port: 8080,
        reuseExistingServer: !process.env.CI,
    },
});
