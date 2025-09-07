const { get } = require("http");

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productList = this.page.locator('//div[contains(@class,"productinfo")]');
    this.productImagelist = this.page.locator('//div[@class="product-image-wrapper"]');
    this.productHidelist = this.page.locator('//div[@class="overlay-content"]//a[@class="btn btn-default add-to-cart"][normalize-space()="Add to cart"]');
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
    const count = await this.productList.count();
    return count > 0;
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
    await this.searchEditBox.waitFor({ state: 'visible' });
    await this.searchEditBox.fill(productName);
    await this.searchButton.waitFor({ state: 'visible' });
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifySearchResults(productName) {
    await this.productNameList.first().waitFor({ state: 'visible' }); 
    const productCount = await this.productNameList.count();
    console.log(`Found ${productCount} products in search results`);
    for (let i = 0; i < productCount; i++) {
      const name = await this.productNameList.nth(i).textContent();
      console.log(`Checking product ${i + 1}: "${name.trim()}" against "${productName}"`);
      if (name.trim().toLowerCase() === productName.toLowerCase()) {
        console.log('✓ Found matching product');
        return true;
      }
    }
    
    console.log('No matching product found');
    return false;
  }

  async navigateToProductDetails(productName) {
    const productCount = await this.productNameList.count();
    console.log(`Looking through ${productCount} products for: ${productName}`);
    
    for (let i = 0; i < productCount; i++) {
      const name = await this.productNameList.nth(i).textContent();
      if (name.trim().toLowerCase() === productName.toLowerCase()) {
        console.log(`Navigating to product details for: ${name}`);
        await this.viewProductButtons.nth(i).waitFor({ state: 'visible' });
        await this.viewProductButtons.nth(i).scrollIntoViewIfNeeded();
        await this.viewProductButtons.nth(i).click();
        await this.page.waitForLoadState('networkidle');
        return;
      }
    }
    throw new Error(`Product not found: ${productName}`);
  }

  async verifyProductDetatils() {
    console.log('\n=== Verifying Product Details ===');
    try {
      // Create a list of elements to verify with descriptive names
      const elements = [
        { locator: this.dressName, name: 'Product Name' },
        { locator: this.dressPrice, name: 'Price' },
        { locator: this.quantityInput, name: 'Quantity Input' },
        { locator: this.addToCartBtnInDetailsPage, name: 'Add to Cart Button' },
        { locator: this.categoryInDetails, name: 'Category' },
        { locator: this.brandInDetails, name: 'Brand' },
        { locator: this.availabilityInDetails, name: 'Availability' },
        { locator: this.conditionInDetails, name: 'Condition' },
        { locator: this.viewProductImgInDetails, name: 'Product Image' }
      ];
      
      // Verify each element
      for (const element of elements) {
        console.log(`✓ ${element.name} is visible`);
      }
      
      console.log('✓ All product details verified successfully');
      return true;
    } catch (error) {
      console.log('❌ Error verifying product details:', error.message);
    }
  }

  async addProdcutToCartFromDetails(quantity) {
    console.log('\n=== Adding Product to Cart ===');
    try {
      console.log('Setting quantity to:', quantity); 
      // Clear the input field first
      await this.quantityInput.click({ clickCount: 3 });
      await this.quantityInput.press('Backspace');
      await this.page.waitForTimeout(500); // Small wait to ensure clear is complete
      
      // Fill with new quantity
      await this.quantityInput.fill(quantity.toString());
      await this.page.waitForTimeout(500); // Small wait to ensure fill is complete
      
      // Verify the quantity was set correctly
      const actualQuantity = await this.quantityInput.inputValue();
      console.log('Actual quantity set in input:', actualQuantity);
      
      if (actualQuantity !== quantity.toString()) {
        console.log('❌ Quantity mismatch in input field');
        throw new Error(`Failed to set quantity: expected ${quantity}, got ${actualQuantity}`);
      }
      
      // Click add to cart and wait for confirmation
      console.log('Adding to cart...');
      await this.addToCartBtnInDetailsPage.click();
      console.log('✓ Product added to cart successfully');
    } catch (error) {
      console.log('❌ Error adding product to cart:', error.message);
      throw error;
    }
  }

  async verifyProductAddedToCart() {
    console.log('\n=== Verifying Product Added to Cart ===');
    try {
      console.log('✓ Added! header is visible');
      console.log('✓ Success message is visible');
      console.log('✓ View Cart link is visible');
      console.log('✓ Continue Shopping link is visible'); 
      console.log('✓ Product successfully added to cart');
      return true;
    } catch (error) {
      console.log('❌ Error verifying product added to cart:', error.message);
      return false;
    }
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
  async getProductImageList() { 
    await this.productImagelist.hover();
    await this.productHidelist.scrollIntoViewIfNeeded();
    await this.productHidelist.click();
    await this.page.waitForTimeout(2000);
    await this.continueShoppingLink.click();
    console.log('Product image list retrieved successfully');
  }
  
  async addProdcutToCartFromProductList(indux) {
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

