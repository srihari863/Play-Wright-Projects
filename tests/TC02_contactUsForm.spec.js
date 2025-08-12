import { test, expect } from '@playwright/test';
import { POMMessage } from '../pages/POMManager';
import loginData from '../data/login_Data.json';
import contactFormData from '../data/contactForm_Data.json';

const logindata = loginData.logindata;
const contactData = contactFormData.contactFormData;
test.describe('Contact Us Tests', () => {
  let pomManager;
  let contactUsPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    pomManager = new POMMessage(page);
    dashboardPage = pomManager.getDashboardPage();
    await dashboardPage.navigateToHomePage(logindata.BASE_URL);
    await dashboardPage.verifyLogo();
    await dashboardPage.navigateToSignupLogin();
  });

  test('TC02_Verify ContactUs form', async ({ page }) => {
    pomManager = new POMMessage(page);
    dashboardPage = pomManager.getDashboardPage();
    contactUsPage = pomManager.getContactUsFormPage();
    const loginPage = pomManager.getLoginPage();
    expect(dashboardPage.pageTitle).toBe('Automation Exercise');
    expect(dashboardPage.isSingupLoginLinkVisible()).toBeTruthy();
    await loginPage.doLogin(logindata.username, logindata.password);
    await page.waitForTimeout(3000);
    // Verify successful login
    await dashboardPage.navigateToContactUs();
    expect(await contactUsPage.isContactUsHeaderExist()).toBeTruthy();
    expect(await contactUsPage.isGetInTouchHeaderExist()).toBeTruthy();
    await contactUsPage.enterContactDetails(
      contactData.name,
      contactData.email,
      contactData.subject,
      contactData.message
    );
    //upload a file
    await contactUsPage.uploadFile(contactData.filePath);
    await contactUsPage.clickSubmitButton();
    await page.waitForTimeout(3000); // Wait for the form submission to complete
    // Handle alert dialog
    page.on('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept(); // Closes the alert
    });
    await contactUsPage.getSuccessMessage();
    //await contactUsPage.navigateToHomePage();
    //expect(await dashboardPage.verifyPageTitle()).toBeTruthy();
  });
});  