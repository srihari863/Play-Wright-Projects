export class PaymentPage {
  constructor(page) {
    this.page = page;
    // Card payment form elements - using more general selectors
    this.paymentForm = this.page.locator('form#payment-form, form.payment-form');
    this.nameOnCard = this.page.locator('[placeholder*="Name on Card"], input[name*="name"], input[data-qa*="name"]');
    this.cardNumber = this.page.locator("//input[@name='card_number']");
    this.cvc = this.page.locator('[placeholder*="CVC"], input[name*="cvc"], input[data-qa*="cvc"]');
    this.expiryMonth = this.page.locator('[placeholder*="MM"], input[name*="month"], input[data-qa*="month"]');
    this.expiryYear = this.page.locator('[placeholder*="YYYY"], input[name*="year"], input[data-qa*="year"]');
    this.payAndConfirmOrderButton = this.page.locator("//button[@id='submit']");

    // Success elements
    this.successMessage = this.page.locator('.alert-success');
    this.orderPlacedHeading = this.page.locator('h2.title:has-text("Order Placed!")');
    this.orderPlacedText = this.page.locator('h2.title:has-text("Order Placed!")'); // Same as orderPlacedHeading
    this.congratulationsMessage = this.page.locator('p:has-text("Congratulations!")');
    this.congratulationsMesg = this.page.locator('p:has-text("Congratulations!")'); // Same as congratulationsMessage
    this.continueButton = this.page.locator('a:has-text("Continue")');
    this.downloadInvoiceButton = this.page.locator('a:has-text("Download Invoice")');
    this.dowloadInvoiceButton = this.page.locator('a:has-text("Download Invoice")'); // Alias for downloadInvoiceButton
    
    // Navigation elements
    this.paymentBreadCrumb = this.page.locator('.breadcrumbs:has-text("Payment")');
    this.paymentHeading = this.page.locator('h2.title:has-text("Payment")');
  }

  async fillPaymentDetails(name, cardNumber, cvc, month, year) {
    await this.nameOnCard.fill(name);
    await this.cardNumber.fill(cardNumber);
    await this.cvc.fill(cvc);
    await this.expiryMonth.fill(month);
    await this.expiryYear.fill(year);
  }

  async waitForPaymentPage() {
    await this.page.waitForLoadState('networkidle');
    await this.paymentForm.waitFor({ state: 'visible', timeout: 30000 });
    if (!(await this.paymentForm.isVisible())) {
      throw new Error('Payment form is not visible');
    }
  }

  async fillAndSubmitPayment(name, cardNumber, cvc, month, year) {
    await this.fillPaymentDetails(name, cardNumber, cvc, month, year);
    await this.submitPayment();
  }

  async enterCardDetails(name, cardNumber, cvc, month, year) {
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
    await this.continueButton.waitFor({ state: 'visible' });
    await this.continueButton.click();
  }
  async clickOnDownloadInvoiceButton() {
    await this.dowloadInvoiceButton.waitFor({ state: 'visible' });
    await this.dowloadInvoiceButton.click();
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
