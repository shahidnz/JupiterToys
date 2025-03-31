import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/homePage';
import { ContactPage } from '@pages/contactPage';
import { ShopPage } from '@pages/shopPage';
import { CartPage } from '@pages/cartPage';
import logger from '@utils/logger';
import { contactFormData, cartItemsData } from './testData'; // Import data

test.describe('Jupiter Toys Tests', () => {
  test.beforeEach(async ({ page }) => {
    logger.info('Starting new test: Navigating to home page');
    await page.goto('/');
    logger.debug('Home page loaded');
  });

  test.afterEach(async () => {
    logger.info('Test completed');
  });

  // Test Case 1: Contact Form Error Validation and Correction (Single Test)
  test('should validate contact form errors and correction', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    logger.info('Test Case 1: Starting contact form error validation');
    await homePage.navigateToContact();
    await contactPage.submitForm();
    await contactPage.verifyErrorMessages();
    await contactPage.fillMandatoryFields('John Doe', 'john@example.com', 'Test message');
    await contactPage.verifyNoErrors();
    logger.info('Test Case 1: Completed successfully');
  });

  // Test Case 2: Contact Form Successful Submission (Data-Driven)
  test.describe('Contact Form Successful Submission', () => {
    for (const data of contactFormData) {
      test(`should validate successful submission - Run ${data.run}`, async ({ page }) => {
        const homePage = new HomePage(page);
        const contactPage = new ContactPage(page);

        logger.info(`Test Case 2: Starting successful submission - Run ${data.run}`);
        await homePage.navigateToContact();
        await contactPage.fillMandatoryFields(data.forename, data.email, data.message);
        await contactPage.submitForm();
        await contactPage.verifySuccessMessage();
        logger.info(`Test Case 2: Run ${data.run} completed successfully`);
      });
    }
  });

  // Test Case 3: Cart Validation (Data-Driven)
  test.describe('Cart Validation', () => {
    for (const data of cartItemsData) {
      test('should validate cart with multiple items', async ({ page }) => {
        const shopPage = new ShopPage(page);
        const cartPage = new CartPage(page);

        logger.info('Test Case 3: Starting cart validation');
        await page.goto('#/shop');
        for (const item of data.items) {
          await shopPage.addItemToCart(item.name, item.quantity);
        }
        await shopPage.navigateToCart();
        for (const item of data.items) {
          await cartPage.verifySubtotal(item.name, item.subtotal);
          await cartPage.verifyPrice(item.name, item.price);
        }
        await cartPage.verifyTotal(data.total);
        logger.info('Test Case 3: Completed successfully');
      });
    }
  });
});