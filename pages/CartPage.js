export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = this.page.locator('table#cart_infor_table> tbody>tr');
    this.proccedToCheckoutButton= this.page.locator('//a[normalize-space()="Proceed To Checkout"]');
    this.shoppingCartBreadCrumb = this.page.locator('//ol[@class="breadcrumb"]/li[2]');
  }
  async verifyShoppingCartBreadCrumb() {
    await this.shoppingCartBreadCrumb.waitFor({ state: 'visible' });
    return await this.shoppingCartBreadCrumb.textContent();
  }
  async getCartProductsCount() {
    await this.cartProducts.waitFor({ state: 'visible' });
    return await this.cartProducts.count();
  }
  async clickOnProceedToCheckoutButton() {
    if (await this.proccedToCheckoutButton.isVisible()) {
      await this.proccedToCheckoutButton.click();
    }else {
      throw new Error('Proceed To Checkout button is not visible');
    } 
  }
  async getCartProductNames() {
    await this.cartProducts.waitFor({ state: 'visible' });
    const productNames = [];
    for (let i = 0; i < await this.cartProducts.count(); i++) {
      const productName = await this.cartProducts.nth(i).locator('td:nth-child(2)').textContent();
      productNames.push(productName.trim());
    }
    return productNames;
  }
  async getCartProductQuantities() {
    await this.cartProducts.waitFor({ state: 'visible' });
    const productQuantities = [];
    for (let i = 0; i < await this.cartProducts.count(); i++) {
      const productQuantity = await this.cartProducts.nth(i).locator('td:nth-child(3)').textContent();
      productQuantities.push(productQuantity.trim());
    }
    return productQuantities;
  }
  async getCartProductPrices() {
    await this.cartProducts.waitFor({ state: 'visible' });
    const productPrices = [];
    for (let i = 0; i < await this.cartProducts.count(); i++) {
      const productPrice = await this.cartProducts.nth(i).locator('td:nth-child(4)').textContent();
      productPrices.push(productPrice.trim());
    }
    return productPrices;
  }
  async getCartProductTotals() {
    await this.cartProducts.waitFor({ state: 'visible' });
    const productTotals = [];
    for (let i = 0; i < await this.cartProducts.count(); i++) {
      const productTotal = await this.cartProducts.nth(i).locator('td:nth-child(5)').textContent();
      productTotals.push(productTotal.trim());
    }
    return productTotals;
  }
  async getProductName(productName) {
    await this.cartProducts.waitFor({ state: 'visible' });
    return await this.locator("//td[@class='cart_description']/h4/a[text()='"+productName+"']").textContent();
  }
}   
