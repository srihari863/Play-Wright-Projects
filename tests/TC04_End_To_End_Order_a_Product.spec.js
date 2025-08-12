import { test, expect } from '@playwright/test';
import { POMMessage } from '../pages/POMManager';
import loginData from '../data/login_Data.json';
import orderProductData from '../data/orderProduct_Data.json';

const logindata = loginData.logindata;
const orderData = orderProductData.products;
test.describe('End to End Order Product Test', () => {
  let pomManager;
  let dashboardPage;
  let cartPage;
  let confirmationPage;
  let paymentPage;
  let loginPage;
  let checkoutPage;
  let productsPage;
  test.beforeEach(async ({ page }) => {
    pomManager = new POMMessage(page);
    dashboardPage = pomManager.getDashboardPage();
    cartPage = pomManager.getCartPage();
    confirmationPage = pomManager.getConfirmationPage();
    paymentPage = pomManager.getPaymentPage();
    loginPage = pomManager.getLoginPage();
    checkoutPage = pomManager.getCheckoutPage();
  
    await dashboardPage.navigateToHomePage(logindata.BASE_URL);
    await dashboardPage.verifyLogo();
    await dashboardPage.navigateToSignupLogin();
  });

  test('TC04_Verify User Product Search test', async ({ page }) => {
    pomManager = new POMMessage(page);
        dashboardPage = pomManager.getDashboardPage();
        productsPage = pomManager.getProductsPage();
        const loginPage = pomManager.getLoginPage();
        expect(dashboardPage.pageTitle).toBe('Automation Exercise');
        expect(dashboardPage.isSingupLoginLinkVisible()).toBeTruthy();
        await loginPage.doLogin(logindata.username, logindata.password);
        await page.waitForTimeout(3000);
        // navigate to products page
        await dashboardPage.navigateToProducts();
        expect(page).toHaveTitle('Automation Exercise - All Products');
        await productsPage.verifySaleBanner();
        // Verify product list is visible
        await productsPage.isProductListExist();
        //Search for a product
        await productsPage.searchProduct(orderData.productName);
        // Verify search results
        await productsPage.verifySearchResults(orderData.productName);
        // Navigate to product details
        await productsPage.navigateToProductDetails(orderData.productName);
        // Verify product details
        await productsPage.verifyProductDetatils();
        // Add product to cart
        await productsPage.addProdcutToCartFromDetails(orderData.productQty);
        // Verify product added to cart
        await productsPage.verifyProductAddedToCart();
        // Click continue shopping
        await productsPage.clickContinueShoppingLink();
  });
});  