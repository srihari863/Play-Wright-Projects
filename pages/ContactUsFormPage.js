export class ContactUsFormPage {
  constructor(page) {
    this.page = page;
    this.contactUsHeader = this.page.locator('//div[@class="col-sm-12"]//h2[@class="title text-center"]')
    this.getInTouchHeader = this.page.locator('//h2[normalize-space()="Get In Touch"]');
    this.nameInput = this.page.getByPlaceholder('Name');
    this.emailInput = this.page.locator('//input[@placeholder="Email"]');
    this.subjectInput = this.page.getByPlaceholder('Subject');
    this.messageInput = this.page.getByPlaceholder('Your Message Here');
    this.uploadFileInput = this.page.locator('//input[@type="file"]');
    this.submitButton = this.page.getByRole('button', { name: 'Submit' });
    this.successMessage = this.page.locator('div.status.alert.alert-success');
    this.errorMessage = this.page.getByText('Error! Please check your details and try again.');
    this.homeBtn = this.page.locator('(//a[@class="btn btn-success"])[1]');
  }
  async isContactUsHeaderExist() {
    await this.contactUsHeader.waitFor(2000);
    return await this.contactUsHeader.isVisible();
  }
  async isGetInTouchHeaderExist() {
    await this.getInTouchHeader.waitFor(2000);
    return await this.getInTouchHeader.isVisible();
  }
  async navigateToHomePage() {
    await this.homeBtn.click();
    return await this.page.url();
  }
  async enterContactDetails(name, email, subject, message) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(filePath) {
    const path = require('path');
    const absolutePath = path.join(process.cwd(), filePath);
    await this.uploadFileInput.setInputFiles(absolutePath);
  }
  async clickSubmitButton() {
    await this.submitButton.click();
  } 
  async getSuccessMessage() {
    await this.page.waitForLoadState('networkidle');
    if (await this.successMessage.isVisible()) {
      return await this.successMessage.textContent();
    }
    return null;
  }
  async getErrorMessage() {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }
}   
