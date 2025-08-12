
export class DashboardPage {
    constructor(page) {
    this.page = page;
    this.Url = 'https://automationexercise.com/';
    this.logo = page.locator('img[alt="Website for automation practice"]');
    this.products = page.locator('a[href="/products"]');
    this.pageTitle = 'Automation Exercise';
    this.cartLink = page.locator('//ul[@class="nav navbar-nav"]//li[3]/a');
    this.signupLoginLink = page.locator('//ul[@class="nav navbar-nav"]//li[4]/a');
    this.contactUsLink = page.locator('//ul[@class="nav navbar-nav"]//li[9]/a');
    this.deleteAccountLink = page.locator('//ul[@class="nav navbar-nav"]//li[5]/a');
  }
async navigateToHomePage(url) {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    const title = await this.page.title();
    return title === this.pageTitle;
}

    async verifyLogo() {
        await this.logo.waitFor({ state: 'visible' });
        return await this.logo.isVisible();
    }
    async navigateToProducts() {
        if (await this.products.isVisible()) {
            await this.products.click();
        }  
    }
    async navigateToCart() {

        if (await this.cartLink.isVisible()) {
            await this.cartLink.click();
        }
    }
    async isSingupLoginLinkVisible(){
        return await this.signupLoginLink.isVisible();
    }
    async navigateToSignupLogin() {
        if (await this.signupLoginLink.isVisible()) {
            await this.signupLoginLink.click();
        }
    }
    async navigateToContactUs() {
        if (await this.contactUsLink.isVisible()) {
            await this.contactUsLink.click();
        }
    }
    async navigateToDeleteAccount() {
        if (await this.deleteAccountLink.isVisible()) {
            await this.deleteAccountLink.click();
        }
    }
    async verifyPageTitle() {
        const title = await this.page.title();
        return title === this.pageTitle;
    }
    async verifyPageUrl() {
        const url = await this.page.url();
        return url === this.Url;
    }
    async verifyPageElements(){
        await this.page.waitForLoadState('domcontentloaded');
        const logo = await this.logo.isVisible();
        const products = await this.products.isVisible();
        const cartLink = await this.cartLink.isVisible();
        const signupLoginLink = await this.signupLoginLink.isVisible();
        const contactUsLink = await this.contactUsLink.isVisible();
        return { logo, products, cartLink, signupLoginLink, contactUsLink };
    }

}
