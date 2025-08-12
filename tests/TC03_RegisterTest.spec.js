import { test, expect } from '@playwright/test';
import { POMMessage } from '../pages/POMManager';
import loginData from '../data/login_Data.json';
const { faker } = require('@faker-js/faker');

const logindata = loginData.logindata;
test.describe('Registration Tests', () => {
  let pomManager;
  let registerPage;
  let dashboardPage;
  let name;
  let email;
  let password;
  let firstName;
  let lastName;
  let company;
  let address1;
  let address2;
  let country;
  let state;
  let city;
  let zipcode;
  let mobileNumber;
  let day;
  let month;
  let year;

  test.beforeEach(async ({ page }) => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    name = `${firstName} ${lastName}`;
    email = faker.internet.email({ firstName, lastName }).toLowerCase();
    password = faker.internet.password({ length: 8 });
    company = faker.company.name();
    address1 = faker.location.streetAddress();
    address2 = faker.location.secondaryAddress();
    country = 'India';  // Using a specific country as it's a dropdown
    state = faker.location.state();
    city = faker.location.city();
    zipcode = faker.location.zipCode('####');
    mobileNumber = faker.phone.number('##########');
    day = faker.number.int({ min: 1, max: 28 }).toString();
    month = faker.number.int({ min: 1, max: 12 }).toString();
    year = faker.number.int({ min: 1960, max: 2000 }).toString();

    pomManager = new POMMessage(page);
    dashboardPage = pomManager.getDashboardPage();
    await dashboardPage.navigateToHomePage(logindata.BASE_URL);
    await dashboardPage.verifyLogo();
    await dashboardPage.navigateToSignupLogin();
  });

  test('TC03_Verify User Register test', async ({ page }) => {
    pomManager = new POMMessage(page);
    registerPage = pomManager.getRegisterPage();
    dashboardPage = pomManager.getDashboardPage();
    // Verify we're on the right page
    expect(page.url()).toContain('automationexercise.com');
    const signupHeader = await registerPage.isNewUserSignUpHeaderExist();
    expect(signupHeader).toBe('New User Signup!');
    
    // Enter new user details for signup
    await registerPage.enterNewUserDetails(name, email);
    
    // Verify we're on the account info page
    const accountInfoHeader = await registerPage.isEnterAccountInfoHeader();
    expect(accountInfoHeader).toBe('Enter Account Information');
    
    // Select title and fill account information
    await registerPage.selectTitle('Mr.');
    await registerPage.fillAccountInfo(password, true, true);
    
    // Fill personal details
    await registerPage.fillPersonalDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber);
    
    // Create account and verify success
    await registerPage.clickCreateAccountButton();
    const successMessage = await registerPage.verifyAccountCreationSuccess();
    expect(successMessage).toBe('Account Created!');
    // Click continue to go back to the dashboard
    const dashboardUrl = await registerPage.clickContinueButton();
    expect(dashboardUrl).toContain('automationexercise.com');
    // Verify the dashboard page title
    expect(await dashboardPage.verifyPageUrl()).toBeTruthy();
    await dashboardPage.navigateToDeleteAccount();
    // Verify the delete account page is displayed
    await registerPage.verifyAccountDeletionSuccess();
  });
});  