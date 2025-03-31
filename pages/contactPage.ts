import { Page, Locator, expect } from '@playwright/test';
import logger from '@utils/logger';

export class ContactPage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly forenameField: Locator;
  readonly emailField: Locator;
  readonly messageField: Locator;
  readonly forenameError: Locator;
  readonly emailError: Locator;
  readonly messageError: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.getByText("Submit");
    this.forenameField = page.locator('#forename');
    this.emailField = page.locator('#email');
    this.messageField = page.locator('#message');
    
    this.forenameError = page.locator('#forename-err');
    this.emailError = page.locator('#email-err');
    this.messageError = page.locator('#message-err');
    this.successMessage = page.locator('.alert-success');
    logger.debug('ContactPage initialized with UI elements');
  }

  async submitForm() {
    await this.submitButton.click();
    logger.debug('Submit button clicked');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  async verifyErrorMessages() {
    await expect(this.forenameError).toHaveText('Forename is required');
    await expect(this.emailError).toHaveText('Email is required');
    await expect(this.messageError).toHaveText('Message is required');
  }

  async fillMandatoryFields(forename: string, email: string, message: string) {
    await this.forenameField.fill(forename);
    await this.emailField.fill(email);
    await this.messageField.fill(message);
    logger.debug('Mandatory fields filled in the contact foem');
  }

  async verifyNoErrors() {
    await expect(this.forenameError).not.toBeVisible();
    await expect(this.emailError).not.toBeVisible();
    await expect(this.messageError).not.toBeVisible();
    logger.debug('All errors clear');
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText('Thanks');
    logger.debug('Success message verified');
  }
}