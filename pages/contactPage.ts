import { Page, Locator, expect } from '@playwright/test';

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
    this.submitButton = page.getByText("Submit");//page.locator('a.btn-contact');
    this.forenameField = page.locator('#forename');
    this.emailField = page.locator('#email');
    this.messageField = page.locator('#message');
    
    this.forenameError = page.locator('#forename-err');
    this.emailError = page.locator('#email-err');
    this.messageError = page.locator('#message-err');
    this.successMessage = page.locator('.alert-success');
  }

  async submitForm() {
    await this.submitButton.click();
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
  }

  async verifyNoErrors() {
    await expect(this.forenameError).not.toBeVisible();
    await expect(this.emailError).not.toBeVisible();
    await expect(this.messageError).not.toBeVisible();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText('Thanks');
  }
}