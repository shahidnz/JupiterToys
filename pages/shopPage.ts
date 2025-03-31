import { Page, Locator, expect } from '@playwright/test';
import logger from '@utils/logger';

export class ShopPage {
  readonly page: Page;
  readonly cartTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTab = page.locator('a[href="#/cart"]');
    logger.debug('ShopPage initialized');
  }

  async addItemToCart(itemName: string, quantity: number) {
    logger.info(`Adding ${quantity} of ${itemName} to cart`);
    const buyButton = this.page.locator(`xpath=//\*[text()="${itemName}"]/following-sibling::p/a[contains(@class, "btn-success")]`);
    //const buyButton = this.page.getByText(itemName).locator('xpath=following-sibling::p/a[contains(@class, "btn-success")]');
    for (let i = 0; i < quantity; i++) {
      await buyButton.click();
      logger.debug(`Clicked Buy for ${itemName}, iteration ${i + 1}`);
    }
  }

  async navigateToCart() {
    logger.info('Navigating to Cart page from Shop page');
    await this.cartTab.click();
    logger.debug('Clicked Cart tab');
  }
}