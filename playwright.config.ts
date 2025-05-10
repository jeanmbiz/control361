import { defineConfig } from '@playwright/test'

export default defineConfig({
  // diretório de testes e2e
  testDir: './test',
  // testes rodam apenas em arquivos .e2e-spec.ts
  testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // reporter: 'html',
  use: {
    // coloca mesma porta da chave "dev:test" do package.json
    baseURL: 'http://localhost:50789',
  },
  webServer: {
    // comando para rodar aplicação no ambiente de teste
    command: 'npm run dev:test',
    // URL em ambiente de teste que abre com comando acima
    url: 'http://localhost:50789',
    reuseExistingServer: !process.env.CI,
  },

  // projects: navegadores onde fará os testes (cometado faz no navegador local)
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },

  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   // },
  // ],
})
