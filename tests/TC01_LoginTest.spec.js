import { test, expect } from '@playwright/test';
import { POMMessage } from '../pages/POMManager';
import loginData from '../data/login_Data.json';

const logindata = loginData.logindata;
test.describe('Login Tests', () => {
  let pomManager;

  test.beforeEach(async ({ page }) => {
    pomManager = new POMMessage(page);
    const dashboardPage = pomManager.getDashboardPage();
    await dashboardPage.navigateToHomePage(logindata.BASE_URL);
    await dashboardPage.verifyLogo();
    await dashboardPage.navigateToSignupLogin();
  });

  test('User can log in with in valid credentials', async () => {
    const loginPage = pomManager.getLoginPage();
    const dashboardPage = pomManager.getDashboardPage();
    expect(dashboardPage.isSingupLoginLinkVisible()).toBeTruthy();
    await loginPage.doLogin(logindata.ivusername, logindata.password);
    // Verify successful login
    const loggedInUser = await loginPage.getLoggedInUserName();
    expect(loggedInUser).toBeTruthy();
    await loginPage.verifyInvalidLoginMsg();
  });

  test('User can log in with valid credentials', async () => {
    const loginPage = pomManager.getLoginPage();
    await loginPage.doLogin(logindata.username, logindata.password);
    // Verify successful login
    const loggedInUser = await loginPage.getLoggedInUserName();
    expect(loggedInUser).toBeTruthy();
    await loginPage.doLogout();
  });

});