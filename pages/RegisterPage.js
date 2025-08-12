import PlaywrightUtils from '../Utilites/PlaywrightUtils.js';

export class RegisterPage {
  
  constructor(page) {
    this.page = page;
    this.newUserSignUpHeader = page.getByRole('heading', { name: 'New User Signup!' });
    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.locator('//input[@data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.existingEmailSignupFailureMsg = page.getByText('Email Address already exist!');
    this.enterAccountInfoHeader = page.locator("//b[normalize-space()='Enter Account Information']");
    this.mrTitleRadioButton = page.getByRole('radio', { name: 'Mr.' });
    this.mrsTitleRadioButton = page.getByRole('radio', { name: 'Mrs.' });
    this.prePopulatedNameEditBox = page.locator('#name');
    this.prePopulatedEmailEditBox = page.locator('//input[@name="email" and @disabled="disabled"]');
    this.passwordInput = page.locator('#password');
    this.daysDropdown = page.locator('#days');
    this.monthsDropdown = page.locator('#months');
    this.yearsDropdown = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countryDropdown = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountButton = page.locator('//button[normalize-space()="Create Account"]');
    this.accountCratedSuccessMessage = page.getByText('Account Created!');
    this.continueButton = page.locator('//a[normalize-space()="Continue"]');
    this.accountDeletedSuccessMessage = page.getByText('Account Deleted!');
  }
  
  async enterNewUserDetails(name, email) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }
 
  async isNewUserSignUpHeaderExist() {
    await this.page.waitForLoadState('networkidle');
    if (await this.newUserSignUpHeader.isVisible()) {
      return await this.newUserSignUpHeader.textContent();
    }
    return null;
  }
  async getExistingEmailSignupFailureMsg() {
    await this.page.waitForLoadState('networkidle');
    if (await this.existingEmailSignupFailureMsg.isVisible()) {
      return await this.existingEmailSignupFailureMsg.textContent();
    }
    return null;
  }

  async isEnterAccountInfoHeader() {
    if (await this.enterAccountInfoHeader.isVisible()) {
      return await this.enterAccountInfoHeader.textContent();
    } 
    return null;
  } 

  async selectTitle(title) {
    if (title === 'Mr.') {
      await this.mrTitleRadioButton.check();
    } else if (title === 'Mrs.') {
      await this.mrsTitleRadioButton.check();
    } 
  } 

  async getPrePopulatedFields() {
    const name = await this.prePopulatedNameEditBox.inputValue();
    const email = await this.prePopulatedEmailEditBox.inputValue();
    return { name, email };
  } 

  async fillAccountInfo(password, newsletter, specialOffers) {
    await this.passwordInput.fill(password);
    await PlaywrightUtils.selectRandomOption(this.daysDropdown);
    await PlaywrightUtils.selectRandomOption(this.monthsDropdown);
    if (newsletter) {
      await this.newsletterCheckbox.check();
    }
    if (specialOffers) {
      await this.specialOffersCheckbox.check();
    }    await PlaywrightUtils.selectRandomOption(this.yearsDropdown);  

  }

  async fillPersonalDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.address1Input.fill(address1);
    await this.address2Input.fill(address2);
    await PlaywrightUtils.selectRandomOption(this.countryDropdown);
    await this.countryDropdown.selectOption(country);
    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
    await this.zipcodeInput.fill(zipcode);
    await this.mobileNumberInput.fill(mobileNumber);
  } 

  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  } 

  async verifyAccountCreationSuccess() {
   
    if (await this.accountCratedSuccessMessage.isVisible()) {
      return await this.accountCratedSuccessMessage.textContent();
    }
    throw new Error('Account creation failed or success message not found');
  } 
  async clickContinueButton() {
    await this.continueButton.click();
    
    return await this.page.url();
  }
  async verifyAccountDeletionSuccess() {
     await this.accountDeletedSuccessMessage.isVisible();   
  }
}   
