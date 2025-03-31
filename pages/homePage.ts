import { Page, Locator, expect } from '@playwright/test';
import logger from '@utils/logger';

export class HomePage {
  readonly page: Page;
  readonly contactTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactTab = page.locator('a[href="#/contact"]');
    logger.debug('HomePage initialized');
  }

  async navigateToContact() {
    logger.info('Navigating to Contact page from Home page');
    await this.contactTab.click();
    logger.debug('Clicked on Contact tab');
    //Verify UI elements states :
    // async expect(this.page.)
  }
}