import { test, expect } from '@playwright/test';
import { POMMessage } from '../pages/POMManager';
import loginData from '../data/login_Data.json';

test.setTimeout(120000);

test.describe('Login Tests', () => {
  let pomManager;
  let dashboardPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    pomManager = new POMMessage(page);
    dashboardPage = pomManager.getDashboardPage();
    loginPage = pomManager.getLoginPage();

    // Navigate and setup
    await page.goto(loginData.BASE_URL, { 
      waitUntil: 'domcontentloaded',
      timeout: 120000 
    });
    await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
    await dashboardPage.verifyLogo();
    await dashboardPage.navigateToSignupLogin();
  });

  for (const [index, user] of loginData.users.entries()) {
    test(`Login test [${index + 1}] for user: ${user.username}`, async ({ page }) => {
      // Perform login
      pomManager = new POMMessage(page);
      loginPage = pomManager.getLoginPage();
      await loginPage.doLogin(user.username, user.password);

      // Verify login result
      if (user.expected === 'srihari') {
        // For successful login
        await expect(loginPage.loggedInUser).toBeVisible();
        const loggedInUser = await loginPage.getLoggedInUserName();
        expect(loggedInUser).toContain(user.expected);
      } else {
        // For failed login
        await expect(loginPage.invalidLoginMsg).toBeVisible();
        const errorMsg = await loginPage.verifyInvalidLoginMsg();
        expect(errorMsg).toBe(user.expected);
      }
    });
  }
});