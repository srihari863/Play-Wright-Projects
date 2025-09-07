export class LoginPage {
  
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginHeader = page.getByRole('heading', { name: 'Login to your account' });
    this.automationText = page.locator('div[class="item active"] span:nth-child(1)');
    this.loggedInUser = page.locator('//ul[@class="nav navbar-nav"]//li[last()]/a');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.invalidLoginMsg = page.locator('//p[normalize-space()="Your email or password is incorrect!"]')
  }

  async doLogin(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.clickLoginButton();
  }

  clickLoginButton() {
    return this.loginButton.click();
  }

  async doLogout() {
    if (await this.loggedInUser.isVisible()) {
      await this.logoutLink.click();
    }   
  } 

  async getLoggedInUserName() {
    if (await this.loggedInUser.isVisible()) {
      return await this.loggedInUser.textContent();
    }
    return null;
  }
  async verifyInvalidLoginMsg(){
    if (await this.invalidLoginMsg.isVisible()) {
      return await this.invalidLoginMsg.textContent();
    }
    return null;
  }
  async verifyLoginPageHeader() {
    return await this.loginHeader.isVisible();
  }
  async verifyAutomationExerciseImg() {
    return await this.automationExerciseImg.isVisible();
  }
}