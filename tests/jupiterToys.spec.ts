import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/homePage';
import { ContactPage } from '@pages/contactPage';

test.describe('Jupiter Toys Tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/'); // Uses baseURL from config
    });
    test('should validate contact form errors and correction', async ({ page }) => {
        const homePage = new HomePage(page);
        const contactPage = new ContactPage(page);
    
        // Step 1: From home page go to contact page
        await homePage.navigateToContact();
    
        // Step 2: Click submit button
        await contactPage.submitForm();
    
        // Step 3: Verify error messages
        await contactPage.verifyErrorMessages();
    
        // Step 4: Populate mandatory fields
        await contactPage.fillMandatoryFields('John Doe', 'john@example.com', 'Test message');
    
        // Step 5: Validate errors are gone
        await contactPage.verifyNoErrors();
      });
});