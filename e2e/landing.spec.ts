import { test, expect } from '@playwright/test'

test.describe('AzoliK Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should load the landing page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/AzoliK/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    const navLinks = page.locator('nav a[href^="#"]')
    await expect(navLinks.first()).toBeVisible()
  })

  test('should scroll to departments section', async ({ page }) => {
    await page.click('a[href="#departments"]')
    await expect(page.locator('#departments')).toBeInViewport()
  })

  test('should scroll to pricing section', async ({ page }) => {
    await page.click('a[href="#pricing"]')
    await expect(page.locator('#pricing')).toBeInViewport()
  })

  test('should have contact form in CTA section', async ({ page }) => {
    await page.click('a[href="#cta"]')
    await expect(page.locator('#cta form')).toBeVisible()
  })

  test('should fill contact form', async ({ page }) => {
    await page.click('a[href="#cta"]')
    
    await page.fill('input[name="business_name"]', 'Test Business')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.selectOption('select[name="industry"]', 'SaaS')
    
    await expect(page.locator('input[name="business_name"]')).toHaveValue('Test Business')
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com')
  })

  test('should show footer with contact info', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('text=+91 9711700199')).toBeVisible()
    await expect(page.locator('text=aarishvimal1@gmail.com')).toBeVisible()
  })
})

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    await expect(page.locator('nav')).toBeVisible()
  })
})