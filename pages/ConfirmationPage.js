export class ConfirmationPage {
  constructor(page) {
    this.page = page;
    this.orderPlacedHeader = this.page.locator('//b[normalize-space()="Order Placed!"]');
    this.orderConfirmationMsg= this.page.locator('//b[normalize-space()="Order Placed!"]/following::p[1]');
    this.continueButton = this.page.locator('//a[normalize-space()="Continue"]');
    this.dowloadInvoiceButton = this.page.locator('//a[normalize-space()="Download Invoice"]');
    this.pageTitle = 'Automation Exercise - Order Placed';
    this.confirmationMsg ='Congratulations! Your order has been confirmed!';
  }

  async verifyOrderPlacedHeader() {
    await this.orderPlacedHeader.waitFor({ state: 'visible' });
    return await this.orderPlacedHeader.textContent();
  }
  async verifyOrderConfirmationMsg() {
    await this.orderConfirmationMsg.waitFor({ state: 'visible' });
    return await this.orderConfirmationMsg.textContent();
  }
  async clickOnContinueButton() {
    if (await this.continueButton.isVisible()) {
      await this.continueButton.click();
    } else {
      throw new Error('Continue button is not visible');
    }
  }
  async clickOnDownloadInvoiceButton() {
    if (await this.dowloadInvoiceButton.isVisible()) {
      await this.dowloadInvoiceButton.click();
    } else {
      throw new Error('Download Invoice button is not visible');
    }
  }
  async getPageTitle() {
    await this.page.waitForLoadState('networkidle');
    const title = await this.page.title();
    if (title !== this.pageTitle) {
      throw new Error(`Expected page title to be "${this.pageTitle}", but got "${title}"`);
    }
    return title;
  }
  async getConfirmationMessage() {
    await this.page.waitForLoadState('networkidle');
    const message = await this.page.locator('//div[contains(text(), "' + this.confirmationMsg + '")]').textContent();
    if (!message.includes(this.confirmationMsg)) {
      throw new Error(`Expected confirmation message to be "${this.confirmationMsg}", but got "${message}"`);
    }
    return message;
  }
}   
