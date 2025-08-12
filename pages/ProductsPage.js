const { get } = require("http");

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productList = this.page.locator('//div[contains(@class,"productinfo")]');
    this.saleBanner = this.page.locator('//img[@id="sale_image"]');
    this.productNameList = this.page.locator('//div[contains(@class,"productinfo")]/p');
    this.viewProductButtons = this.page.locator('//a[contains(text(),"View Product")]');
    this.priceList = this.page.locator('//div[contains(@class, "productinfo")]/h2');
    this.searchEditBox = this.page.locator('//input[@id="search_product"]');
    this.searchButton = this.page.locator('#submit_search');
    this.brandNameList = this.page.locator('//div[@class="brands-name"]/ul/li/a');
    this.categoryList = this.page.locator('//div[@id="accordian"]/div');
    this.addToCartButtons = this.page.locator('//div[contains(@class,"productinfo")]/a[contains(@class,"add-to-cart")]');
    this.addedHeader = this.page.locator('//h4[normalize-space()="Added!"]');
    this.addedToCortMessage = this.page.locator('(//p[normalize-space()="Your product has been added to cart."])[1]');
    this.viewCartLink = this.page.locator('//u[normalize-space()="View Cart"]');
    this.continueShoppingLink = this.page.locator('//button[normalize-space()="Continue Shopping"]');
    this.dressName = this.page.locator('//div[@class="product-details"]/div[2]/div/h2');
    this.dressPrice = this.page.locator('//div[@class="product-information"]/span/span');
    this.quantityInput = this.page.locator('//input[@id="quantity"]');
    this.addToCartBtnInDetailsPage = this.page.locator('//button[@class="btn btn-default cart"]');
    this.categoryInDetails = this.page.locator('//div[@class="product-details"]/div[2]/div/p[1]');
    this.brandInDetails = this.page.locator('//div[@class="product-details"]/div[2]/div/p[4]');
    this.availabilityInDetails = this.page.locator('//div[@class="product-details"]/div[2]/div/p[2]');
    this.conditionInDetails = this.page.locator('//div[@class="product-details"]/div[2]/div/p[3]');
    this.viewProductImgInDetails = this.page.locator('//div[@class="product-details"]/div[1]/div/img');
  }
  async isProductListExist() {
    try {
      return await this.productList.isVisible();
    } catch (error) {
      return false; // if locator not found or detached
    }
  }

  async getProductListLocator() {
    return this.productList;
  }

  async verifySaleBanner() {
    return await this.saleBanner.isVisible();
  }

  async getProductNames() {
    const productNames = [];
    for (let i = 0; i < await this.productNameList.count(); i++) {
      const productNames = await this.productNameList.nth(i).textContent();
      names.push(productNames.trim());
    }
    return productNames;
  }

  async getProductPrices() {
    const prices = [];
    for (let i = 0; i < await this.priceList.count(); i++) {
      const price = await this.priceList.nth(i).textContent();
      prices.push(price.trim());
    }
    return prices;
  }

  async searchProduct(productName) {
    await this.searchEditBox.fill(productName);
    await this.searchButton.click();
  }

  async verifySearchResults(productName) {
    const productCount = await this.productNameList.count();
    for (let i = 0; i < productCount; i++) {
      const name = await this.productNameList.nth(i).textContent();
      if (name.trim() === productName) {
        return true;
      }
    }
    return false; // If no matching product found
  }

  async navigateToProductDetails(productName) {
    const productCount = await this.productNameList.count();
    for (let i = 0; i < productCount; i++) {
      const name = await this.productNameList.nth(i).textContent();
      if (name.trim() === productName) {
        await this.viewProductButtons.nth(i).click();
        return;
      }
    }
    throw new Error(`Product with name ${productName} not found`);
  }

  async verifyProductDetatils() {
    return await this.dressName.isVisible() && await this.dressPrice.isVisible() &&
      await this.quantityInput.isVisible() && await this.addToCartBtnInDetailsPage.isVisible() &&
      await this.categoryInDetails.isVisible() && await this.brandInDetails.isVisible() &&
      await this.availabilityInDetails.isVisible() && await this.conditionInDetails.isVisible() &&
      await this.viewProductImgInDetails.isVisible();
  }

  async addProdcutToCartFromDetails(quantity) {

    await this.quantityInput.fill(quantity.toString());
    await this.addToCartBtnInDetailsPage.click();
  }

  async verifyProductAddedToCart() {
    return await this.addedHeader.isVisible() && await this.addedToCortMessage.isVisible() &&
      await this.viewCartLink.isVisible() && await this.continueShoppingLink.isVisible();

  }

  async clickContinueShoppingLink() {
    await this.continueShoppingLink.isVisible();
      await this.continueShoppingLink.click();
  }

  async getBrandNames() {
    const brandNames = [];
    for (let i = 0; i < await this.brandNameList.count(); i++) {
      const brandName = await this.brandNameList.nth(i).textContent();
      brandNames.push(brandName.trim());
    }
    return brandNames;
  }

  async getCategoryNames() {
    await this.page.waitForLoadState('networkidle');
    const categoryNames = [];
    for (let i = 0; i < await this.categoryList.count(); i++) {
      const categoryName = await this.categoryList.nth(i).textContent();
      categoryNames.push(categoryName.trim());
    }
    return categoryNames;
  }

  async addToCart(index) {
    await this.addToCartButtons.nth(index).click();
  }

  async verifyAddedToCart() {
    await this.page.waitForLoadState('networkidle');
    return await this.addedHeader.isVisible() && await this.addedToCortMessage.isVisible();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }

  async clickOnViewProductBtn(productName) {
    const productCount = await this.productNameList.count();
    console.log(`Total products found: ${productCount}`);
    for (let i = 0; i < productCount; i++) {
      const name = await this.productNameList.nth(i).textContent();
      console.log(`Product ${i + 1}: ${name}`);
      if (name.trim() === productName) {
        await this.viewProductButtons.nth(i).click();
        return;
      }
    }
    throw new Error(`Product with name ${productName} not found`);
  }

  async addProdcutToCartFromProductList(indux, quantity) {
    for (let i = 0; i < await this.addToCartButtons.count(); i++) {
      if (i === indux) {
        console.log(`Adding product at index ${i} to cart`);
        await this.addToCartButtons.nth(i).click();
        if (await this.addedHeader.isVisible()) {
          console.log('Product added to cart successfully');
        } else {
          return;
        }
      }
    }
  }
}

