export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator('table#cart_info_table tbody tr');
    this.proceedToCheckoutButton = page.locator('a.check_out');
    this.shoppingCartBreadCrumb = page.locator('//ol[@class="breadcrumb"]/li[2]');
    this.viewCartButton = page.locator('//u[normalize-space()="View Cart"]');
  }

  async waitForCartToLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.cartProducts.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async verifyShoppingCartBreadCrumb() {
    await this.shoppingCartBreadCrumb.waitFor({ state: 'visible', timeout: 10000 });
    return await this.shoppingCartBreadCrumb.textContent();
  }

  async getCartProductsCount() {
    await this.waitForCartToLoad();
    return await this.cartProducts.count();
  }

  async clickOnProceedToCheckoutButton() {
    await this.proceedToCheckoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clearCart() {
    await this.page.goto('https://automationexercise.com/view_cart', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    await this.page.waitForLoadState('networkidle');
      
    const deleteButtons = this.page.locator('td.cart_delete a');
    const cartItems = this.page.locator('table#cart_info_table tbody tr');
      
    const [deleteCount, itemCount] = await Promise.all([
      deleteButtons.count(),
      cartItems.count()
    ]);
      
    if (deleteCount === 0 || itemCount === 0) {
      return true;
    }
      
    for (let i = itemCount - 1; i >= 0; i--) {
      await deleteButtons.nth(i).waitFor({ state: 'visible', timeout: 10000 });
      await deleteButtons.nth(i).click();
      await this.page.waitForLoadState('networkidle');
    }
      
    return await cartItems.count() === 0;
  }

  async clickViewCartButton() {
    await this.viewCartButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.page.waitForLoadState('load');
      
    await Promise.all([
      this.page.waitForLoadState('load'),
      this.page.waitForLoadState('domcontentloaded'),
      this.viewCartButton.click()
    ]);
      
    await this.waitForCartToLoad();
  }

  async getCartProductNames() {
    await this.waitForCartToLoad();
    const productNames = [];
    const count = await this.cartProducts.count();
    for (let i = 0; i < count; i++) {
      const productName = await this.cartProducts.nth(i).locator('td h4 a').textContent();
      productNames.push(productName.trim());
    }
    return productNames;
  }

  async getCartProductQuantities() {
    await this.waitForCartToLoad();
    const productQuantities = [];
    const count = await this.cartProducts.count();
    for (let i = 0; i < count; i++) {
      const productQuantity = await this.cartProducts.nth(i).locator('.cart_quantity').textContent();
      productQuantities.push(productQuantity.trim());
    }
    return productQuantities;
  }

  async getCartProductPrices() {
    await this.waitForCartToLoad();
    const productPrices = [];
    const count = await this.cartProducts.count();
    for (let i = 0; i < count; i++) {
      const productPrice = await this.cartProducts.nth(i).locator('td.cart_price p').textContent();
      productPrices.push(productPrice.trim());
    }
    return productPrices;
  }

  async getCartProductTotals() {
    await this.waitForCartToLoad();
    const productTotals = [];
    const count = await this.cartProducts.count();
    for (let i = 0; i < count; i++) {
      const productTotal = await this.cartProducts.nth(i).locator('td.cart_total p').textContent();
      productTotals.push(productTotal.trim());
    }
    return productTotals;
  }

  async verifyProductInCart(productName) {
    await this.waitForCartToLoad();
    const cartProducts = await this.getCartProductNames();
    return cartProducts.includes(productName);
  }

  async verifyProductQuantity(productName, expectedQuantity) {
    await this.waitForCartToLoad();
    const names = await this.getCartProductNames();
    const quantities = await this.getCartProductQuantities();
    
    const index = names.indexOf(productName);
    if (index === -1) return false;

    const actualQuantity = parseInt(quantities[index], 10);
    const expectedNum = parseInt(expectedQuantity, 10);
    
    return actualQuantity === expectedNum;
  }
}
