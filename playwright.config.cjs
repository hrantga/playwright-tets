// CommonJS config to avoid ESM requirement warnings on older Node versions
const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  workers:1,
  htmlreport:true,
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    stdout: 'pipe',
    stderr: 'pipe',
  },
})


