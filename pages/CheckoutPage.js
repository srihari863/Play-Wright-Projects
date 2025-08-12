export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutBreadCrumb = this.page.locator('//ol[@class="breadcrumb"]/li[2]');
    this.placeOrderButton= this.page.locator('//a[normalize-space()="Place Order"]"]');
    this.addressDetailsHeading = this.page.locator('//h2[normalize-space()="Address Details"]');
    this.yourDeliveryAddressHeading = this.page.locator('//h3[normalize-space()="Your delivery address"]');
    this.yourBillingAddressHeading = this.page.locator('//h3[normalize-space()="Your billing address"]');
    this.reviewYourOrderHeading = this.page.locator('//h2[normalize-space()="Review Your Order"]');
    this.commentTextArea = this.page.locator('//textarea[@name="message"]');
    this.totalAmount = this.page.locator('//b[text()="Total Amount"]/following::p[1]');
    this.deliveryAddressFnameLname = this.page.locator('//ul[@id="address_delivery"]//li[@class="address_firstname address_lastname"]');
    this.deliveryAddressAddress1 = this.page.locator('(//ul[@id="address_delivery"]//li[@class="address_address1 address_address2"])[1]');
    this.deliveryAddressCity = this.page.locator('//ul[@id="address_delivery"]//li[@class="address_city address_state_name address_postcode"]');
    this.deliveryAddressCity = this.page.locator('//ul[@id="address_delivery"]//li[@class="address_country_name"]');
    this.deliveryAddressPhoneNo = this.page.locator('//ul[@id="address_delivery"]//li[@class="address_phone"]');
    this.billingAddressFnameLname = this.page.locator('//ul[@id="address_invoice"]//li[@class="address_firstname address_lastname"]');
    this.billingAddressAddress1 = this.page.locator('(//ul[@id="address_invoice"]//li[@class="address_address1 address_address2"])[1]');
    this.billingAddressCity = this.page.locator('//ul[@id="address_invoice"]//li[@class="address_city address_state_name address_postcode"]');
    this.billingAddressCity = this.page.locator('//ul[@id="address_invoice"]//li[@class="address_country_name"]');
    this.billingAddressPhoneNo = this.page.locator('//ul[@id="address_invoice"]//li[@class="address_phone"]');
  }
  async isCheckoutBreadCrumbExists() {
    await this.checkoutBreadCrumb.waitFor({ state: 'visible' });
    return await this.checkoutBreadCrumb.textContent();
  }
  async isAddressDetailsHeadingExists() {
    await this.addressDetailsHeading.waitFor({ state: 'visible' });
    return await this.addressDetailsHeading.textContent();
  } 
  async isYourDeliveryAddressHeadingExists() {
    await this.yourDeliveryAddressHeading.waitFor({ state: 'visible' });
    return await this.yourDeliveryAddressHeading.textContent();
  }
  async isYourBillingAddressHeadingExists() {
    await this.yourBillingAddressHeading.waitFor({ state: 'visible' });
    return await this.yourBillingAddressHeading.textContent();
  }
  async isReviewYourOrderHeadingExists() {
    await this.reviewYourOrderHeading.waitFor({ state: 'visible' });
    return await this.reviewYourOrderHeading.textContent();
  }
  async enterComment(comment) {
    await this.commentTextArea.waitFor({ state: 'visible' });
    await this.commentTextArea.fill(comment);
  }
  async clickOnPlaceOrderButton() {
    if (await this.placeOrderButton.isVisible()) {
      await this.placeOrderButton.click();
    } else {
      throw new Error('Place Order button is not visible');
    }
  }
  async getTotalAmount() {
    await this.totalAmount.waitFor({ state: 'visible' });
    return await this.totalAmount.textContent();
  }
  async isPlaceOrderButtonExist() {
    return await this.placeOrderButton.isVisible();
  }
  async getAddressDetailsHedingText() {
    await this.addressDetailsHeading.waitFor({ state: 'visible' });
    return await this.addressDetailsHeading.textContent();
  }
  async getYourDeliveryAddressHeadingText() {
    await this.yourDeliveryAddressHeading.waitFor({ state: 'visible' });
    return await this.yourDeliveryAddressHeading.textContent();
  }
  async getYourBillingAddressHeadingText() {
    await this.yourBillingAddressHeading.waitFor({ state: 'visible' });
    return await this.yourBillingAddressHeading.textContent();
  }
  async getReviewYourOrderHeadingText() {
    await this.reviewYourOrderHeading.waitFor({ state: 'visible' });
    return await this.reviewYourOrderHeading.textContent(); 
  }
  async getDeliveryAddressFnameLname() {
    await this.deliveryAddressFnameLname.waitFor({ state: 'visible' });
    return await this.deliveryAddressFnameLname.textContent();
  }
  async getDeliveryAddressAddress1() {
    await this.deliveryAddressAddress1.waitFor({ state: 'visible' });
    return await this.deliveryAddressAddress1.textContent();
  }
  async getDeliveryAddressCity() {
    await this.deliveryAddressCity.waitFor({ state: 'visible' });
    return await this.deliveryAddressCity.textContent();
  }
  async getDeliveryAddressCountry() {
    await this.deliveryAddressCountry.waitFor({ state: 'visible' });
    return await this.deliveryAddressCountry.textContent();
  }
  async getDeliveryAddressPhoneNo() {
    await this.deliveryAddressPhoneNo.waitFor({ state: 'visible' });
    return await this.deliveryAddressPhoneNo.textContent();
  }
  async getBillingAddressFnameLname() {
    await this.billingAddressFnameLname.waitFor({ state: 'visible' });
    return await this.billingAddressFnameLname.textContent();
  }
  async getBillingAddressAddress1() {
    await this.billingAddressAddress1.waitFor({ state: 'visible' });
    return await this.billingAddressAddress1.textContent();
  }
  async getBillingAddressCity() {
    await this.billingAddressCity.waitFor({ state: 'visible' });
    return await this.billingAddressCity.textContent();
  }
  async getBillingAddressCountry() {
    await this.billingAddressCountry.waitFor({ state: 'visible' });
    return await this.billingAddressCountry.textContent();
  }
  async getBillingAddressPhoneNo() {
    await this.billingAddressPhoneNo.waitFor({ state: 'visible' });
    return await this.billingAddressPhoneNo.textContent();
  }
  async getDeliveryAddressDtails() {
    return {
      fnameLname: await this.getDeliveryAddressFnameLname(),
      address1: await this.getDeliveryAddressAddress1(),
      city: await this.getDeliveryAddressCity(),
      country: await this.getDeliveryAddressCountry(),
      phoneNo: await this.getDeliveryAddressPhoneNo()
    };
  }
  async getBillingAddressDtails() {
    return {
      fnameLname: await this.getBillingAddressFnameLname(),
      address1: await this.getBillingAddressAddress1(),
      city: await this.getBillingAddressCity(),
      country: await this.getBillingAddressCountry(),
      phoneNo: await this.getBillingAddressPhoneNo()
    };
  }
}   
