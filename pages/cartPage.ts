import { Page, Locator, expect } from '@playwright/test';
import logger from '@utils/logger';

export class CartPage {
  readonly page: Page;
  readonly cartRows: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator('tbody tr');
    this.totalPrice = page.locator('.total');
    logger.debug('CartPage initialized');
  }

  async verifySubtotal(itemName: string, expectedSubtotal: string) {
    logger.debug(`Verifying subtotal for ${itemName}: ${expectedSubtotal}`);
    const subtotal = this.page.getByRole('cell', { name: `${expectedSubtotal}` });
    logger.debug(`Subtotal for ${itemName} = ${subtotal}`);
    await expect(subtotal).toHaveText(expectedSubtotal);

    logger.debug(`Subtotal for ${itemName} verified`);
  }

  async verifyPrice(itemName: string, expectedPrice: string) {
    logger.debug(`Verifying price for ${itemName}: ${expectedPrice}`);
    const price = this.page.getByRole('cell', { name: `${expectedPrice}` }).first()
    await expect(price).toHaveText(expectedPrice);
    logger.debug(`Price for ${itemName} verified`);
  }

  async verifyTotal(expectedTotal: string) {
    logger.debug(`Verifying total in Cart: ${expectedTotal}`);
    await expect(this.totalPrice).toHaveText(`Total: ${Number(expectedTotal).toString()}`);
    logger.debug('Total verified!');
  }
}