
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
        timeout: 120000
    });
    
    // Wait for content to be loaded
    await this.page.waitForLoadState('domcontentloaded', { timeout: 120000 });
    
    // Wait for logo to be visible as indication of page load
    await this.logo.waitFor({ state: 'visible', timeout: 120000 });
    
    const title = await this.page.title();
    return title === this.pageTitle;
}

    async verifyLogo() {
        await this.logo.waitFor({ state: 'visible', timeout: 30000 });
        return await this.logo.isVisible();
    }
    async navigateToProducts() {
        await this.page.waitForLoadState('networkidle', { timeout: 90000 });
        const productsLink = this.page.locator('//ul[@class="nav navbar-nav"]/li/a[contains(text()," Products")]');
        await productsLink.waitFor({ state: 'visible', timeout: 30000 });
        
        if (await productsLink.isVisible()) {
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 90000 }),
                productsLink.click()
            ]);
            return this.page.url().includes('/products');
        }
        
        await this.page.goto('https://automationexercise.com/products', {
            waitUntil: 'networkidle',
            timeout: 90000
        });
        return this.page.url().includes('/products');
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
        await this.signupLoginLink.waitFor({ state: 'visible', timeout: 30000 });
        await this.signupLoginLink.evaluate(element => element.scrollIntoView());
        await this.signupLoginLink.click({ force: true });
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
        await this.page.waitForLoadState('domcontentloaded');
        await this.logo.waitFor({ state: 'visible', timeout: 30000 });
        const title = await this.page.title();
        return title.includes('Automation Exercise');
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
