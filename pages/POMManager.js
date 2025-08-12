import {LoginPage} from "./LoginPage";
import {DashboardPage} from "./DashboardPage";
import {CartPage} from "./CartPage";
import {ConfirmationPage} from "./ConfirmationPage";
import {ContactUsFormPage} from "./ContactUsFormPage";
import {ProductsPage} from "./ProductsPage";
import {RegisterPage} from "./RegisterPage";
import {CheckoutPage} from "./CheckoutPage";
import {PaymentPage} from "./PaymentPage";


class POMMessage{
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.confirmationPage = new ConfirmationPage(page);
        this.contactUsFormPage = new ContactUsFormPage(page);
        this.productsPage = new ProductsPage(page);
        this.registerPage = new RegisterPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.paymentPage = new PaymentPage(page);  
    }

    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getConfirmationPage() {
        return this.confirmationPage;
    }
    getContactUsFormPage() {
        return this.contactUsFormPage;
    }
    getProductsPage() {
        return this.productsPage;
    }
    getRegisterPage() {
        return this.registerPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }
    getPaymentPage() {
        return this.paymentPage;
    }
 }
export { POMMessage };