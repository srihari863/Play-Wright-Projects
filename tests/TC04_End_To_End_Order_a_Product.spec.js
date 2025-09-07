import { test, expect } from '@playwright/test';
import { POMMessage } from '../pages/POMManager';
import loginData from '../data/login_Data.json';
import orderProductData from '../data/orderProduct_Data.json';

const orderData = orderProductData.products;
test.describe.configure({ mode: 'serial' });
test.setTimeout(120000);
test.describe('End to End Order Product Test', () => {
  let pomManager;
  let dashboardPage;
  let cartPage;
  let confirmationPage;
  let paymentPage;
  let loginPage;
  let checkoutPage;
  let productsPage;
  let page;
  let context;

  // Set timeout for beforeAll
  test.slow();
  test.beforeAll(async ({ browser }) => {  
      // Create browser context with longer timeout
      context = await browser.newContext()   
      // Create new page with extended timeouts
      page = await context.newPage();
      // Initialize page objects
      pomManager = new POMMessage(page);
      dashboardPage = pomManager.getDashboardPage();
      cartPage = pomManager.getCartPage();
      confirmationPage = pomManager.getConfirmationPage();
      paymentPage = pomManager.getPaymentPage();
      loginPage = pomManager.getLoginPage();
      checkoutPage = pomManager.getCheckoutPage();
      productsPage = pomManager.getProductsPage();

      // Navigate to site with all load states
      await page.goto(loginData.BASE_URL);
      // Login with retries
          await dashboardPage.navigateToSignupLogin();
          await loginPage.doLogin(loginData.users[0].username, loginData.users[0].password);
      // Clear cart with retries
          await cartPage.clearCart();     
  });

  test('1. Product Navigation and Search', async () => {
    // Go to homepage first
    await page.goto(loginData.BASE_URL, { waitUntil: 'domcontentloaded' });
    // Navigate to products
    await dashboardPage.navigateToProducts();
    expect(await productsPage.verifySaleBanner()).toBeTruthy();
    expect(await productsPage.isProductListExist()).toBeTruthy();
    // Search for product
    await productsPage.searchProduct(orderData.productName);
    expect(await productsPage.verifySearchResults(orderData.productName)).toBeTruthy();
  });
  test('2. Product Details and Cart Addition', async () => {
    // View product details
    await productsPage.navigateToProductDetails(orderData.productName);
    expect(await productsPage.verifyProductDetatils()).toBeTruthy();
    // Add to cart
    await productsPage.addProdcutToCartFromDetails(orderData.productQty);
    expect(await productsPage.verifyProductAddedToCart()).toBeTruthy();
  });

  test('3. Cart Verification and Checkout', async () => {
    // View cart
    await cartPage.clickViewCartButton();
    expect(await cartPage.verifyProductInCart(orderData.productName)).toBeTruthy();
    expect(await cartPage.verifyProductQuantity(orderData.productName, orderData.productQty)).toBeTruthy();
    // Checkout
    await cartPage.clickOnProceedToCheckoutButton();
    expect(await checkoutPage.verifyAddressDetails()).toBeTruthy();
    expect(await checkoutPage.verifyOrderDetails(orderData.productName, orderData.productQty)).toBeTruthy();
  });

  test('4. Payment Processing', async () => {
    // Place order
    await checkoutPage.clickOnPlaceOrderButton();
    // Fill and submit payment
    await paymentPage.fillPaymentDetails(
      "Test User",
      "4111111111111111",
      "123",
      "12",
      "2025"
    );
    await paymentPage.submitPayment();
  });

  test('5. Order Confirmation', async () => {
    await page.waitForLoadState('networkidle');
    const message = await confirmationPage.getOrderConfirmationMessage();
    expect(message).toContain('Congratulations');
  });
  test.afterAll(async () => {
    await cartPage.clearCart();
    await page.close();
    await context.close();
  });
}); 