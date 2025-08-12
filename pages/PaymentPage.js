export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.paymentBreadCrumb = this.page.locator('//ol[@class="breadcrumb"]/li[2]');
    this.payAndConfirmOrderButton= this.page.locator('//button[@id="submit"]');
    this.paymentHeading = this.page.locator('//h2[normalize-space()="Payment"]');
    this.nameOnCard = this.page.locator('input[name="name_on_card"]');
    this.cardNumbar = this.page.locator('input[name="card_number"]');
    this.cvcNo = this.page.locator('input[name="cvc"]');
    this.exiprationMonth = this.page.locator('input[name="expiry_month"]');
    this.exiprationYear = this.page.locator('input[name="expiry_year"]');
    this.successMessage = this.page.locator('//div[contains(text(),"Your order has been placed successfully!")]');
    this.orderPlacedText = this.page.locator('//b[normalize-space()="Order Placed!"]');
    this.congratulationsMesg= this.page.locator('//b[normalize-space()="Order Placed!"]/following::p[1]');
    this.continueButton = this.page.locator('//a[normalize-space()="Continue"]');
    this.dowloadInvoiceButton = this.page.locator('//a[normalize-space()="Download Invoice"]');
  }

  async fillPaymentDetails(name, cardNumber, cvc, month, year) {
    await this.enterNameOnCard(name);
    await this.enterCardNumber(cardNumber);
    await this.enterCVCNo(cvc);
    await this.enterExiprationMonth(month);
    await this.enterExiprationYear(year);
  }
  async submitPayment() {
    if (await this.payAndConfirmOrderButton.isVisible()) {
      await this.payAndConfirmOrderButton.click();
    } else {
      throw new Error('Pay and Confirm Order button is not visible');
    }
  }
  async verifyPaymentBreadCrumb() {
    await this.paymentBreadCrumb.waitFor({ state: 'visible' });
    return await this.paymentBreadCrumb.textContent();
  }
  async verifyPaymentHeading() {
    await this.paymentHeading.waitFor({ state: 'visible' });
    return await this.paymentHeading.textContent();
  }
  async verifySuccessMessage() {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.successMessage.textContent();
  }
  async isOrderPlacedTextExists() {
    await this.orderPlacedText.waitFor({ state: 'visible' });
    return await this.orderPlacedText.textContent();
  }
  async isCongratulationsMesgExists() {
    await this.congratulationsMesg.waitFor({ state: 'visible' });
    return await this.congratulationsMesg.textContent();
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
  async getPaymentBreadCrumbText() {
    await this.paymentBreadCrumb.waitFor({ state: 'visible' });
    return await this.paymentBreadCrumb.textContent();
  }
  async getPaymentHeadingText() {
    await this.paymentHeading.waitFor({ state: 'visible' });
    return await this.paymentHeading.textContent();
  }
  async getOrderPlacedText() {
    await this.orderPlacedText.waitFor({ state: 'visible' });
    return await this.orderPlacedText.textContent();
  }
  async getCongratulationsMesgText() {
    await this.congratulationsMesg.waitFor({ state: 'visible' });
    return await this.congratulationsMesg.textContent();
  }
}   
