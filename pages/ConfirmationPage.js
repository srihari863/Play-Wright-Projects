export class ConfirmationPage {
  constructor(page) {
    this.page = page;
    // Using CSS selectors for better performance
    this.orderPlacedHeader = this.page.locator('.title:has-text("Order Placed"), h2:has-text("Order Placed"), b:has-text("Order Placed")').first();
    this.orderConfirmationMsg = this.page.locator('p:has-text("Congratulations"), .alert p:has-text("Congratulations")').first();
    this.continueButton = this.page.locator('a:has-text("Continue")');
    this.downloadInvoiceButton = this.page.locator('a:has-text("Download Invoice")');
    this.pageTitle = 'Automation Exercise - Order Placed';
    this.confirmationMsg = 'Congratulations! Your order has been confirmed!';
  }

  async getOrderConfirmationMessage() {
    console.log('\n=== Verifying Order Confirmation ===');
    
    try {
      await this.page.waitForLoadState('networkidle');
      
      // Wait for the header first
      await this.orderPlacedHeader.waitFor({ state: 'visible', timeout: 30000 });
      const header = await this.orderPlacedHeader.textContent();
      console.log('Order header:', header);
      
      // Then wait for and get the confirmation message
      await this.orderConfirmationMsg.waitFor({ state: 'visible', timeout: 30000 });
      const message = await this.orderConfirmationMsg.textContent();
      console.log('Confirmation message:', message);
      
      // Verify the complete order information
      const title = await this.page.title();
      console.log('Page title:', title);
      
      // Check if all elements are correct
      const isValid = 
        header.includes('Order Placed!') &&
        message.includes('Congratulations') &&
        title.includes('Order Placed');
      
      if (isValid) {
        console.log('✓ Order confirmation verified successfully');
        return message;
      } else {
        console.log('❌ Order confirmation verification failed');
        throw new Error('Invalid order confirmation: Header, message, or title do not match expected values');
      }
    } catch (error) {
      console.log('❌ Error verifying order confirmation:', error.message);
      throw error;
    }
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
    try {
      await this.continueButton.waitFor({ state: 'visible', timeout: 30000 });
      console.log('Clicking Continue button...');
      await this.continueButton.click();
      await this.page.waitForLoadState('networkidle');
      console.log('✓ Continued to next page');
    } catch (error) {
      console.log('❌ Error clicking Continue button:', error.message);
      throw error;
    }
  }

  async clickOnDownloadInvoiceButton() {
    try {
      await this.downloadInvoiceButton.waitFor({ state: 'visible', timeout: 30000 });
      console.log('Downloading invoice...');
      await this.downloadInvoiceButton.click();
      console.log('✓ Invoice download initiated');
    } catch (error) {
      console.log('❌ Error downloading invoice:', error.message);
      throw error;
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
}
