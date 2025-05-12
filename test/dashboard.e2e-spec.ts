import { expect, test } from '@playwright/test'

test('Renders main components correctly', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await page.waitForSelector('text=Mapa Rastreador', { timeout: 5000 })

  const mapContainer = page
    .locator('div')
    .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
    .nth(1)
  await expect(mapContainer).toBeVisible()

  const firstLine = page.getByRole('cell', { name: 'ABC1000' })
  await expect(firstLine).toBeVisible()
})

test('Filter between "Tracked" and "Other"', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await page.waitForSelector('text=Mapa Rastreador', { timeout: 5000 })

  const firstLineTracked = page.getByRole('cell', { name: 'ABC1000' })
  await expect(firstLineTracked).toBeVisible()

  await page
    .locator('div')
    .filter({ hasText: /^Outros$/ })
    .click()

  const firstLineOthers = page.getByRole('cell', { name: 'ABC1040' })
  await expect(firstLineOthers).toBeVisible()
})

test('Infinite scroll loads more vehicles', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await page.waitForSelector('text=Mapa Rastreador', { timeout: 5000 })

  const table = page.locator('.space-y-2\\.5 > .border')
  const linesBefore = await table.locator('tr').count()

  await page.getByTestId('loader').scrollIntoViewIfNeeded()

  await page.waitForTimeout(3000)
  const newTable = page.locator('.space-y-2\\.5 > .border')
  const linesAfter = await newTable.locator('tr').count()

  expect(linesAfter).toBeGreaterThan(linesBefore)
})

test('Open Map marking information', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await page.waitForSelector('text=Mapa Rastreador', { timeout: 5000 })

  // este seletor no mapa pode falhar, rode novamente.
  await page.locator('gmp-advanced-marker:nth-child(33)').click()

  const markerInformation = page.locator('gmp-advanced-marker:nth-child(33)')

  await expect(markerInformation).toBeVisible()

  await page.waitForTimeout(2000)
})
