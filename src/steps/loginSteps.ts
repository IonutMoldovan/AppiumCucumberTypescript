import { Given, When, Then } from '@cucumber/cucumber';
import { remote } from 'webdriverio';
import { Capabilities } from '@wdio/types';

// Explicitly define the driver type
let driver: WebdriverIO.Browser;

Given('I open the login page', async function () {
  driver = await remote({
    logLevel: 'error',
    path: '/wd/hub',  // Ensure this path is correct
    url: 'http://localhost:4723',  // Appium server URL
    capabilities: {
      platformName: 'Android',
      deviceName: 'emulator-5554',  // Replace with your emulator/device name
      app: './resources/periodcalendar.apk',  // Path to your APK in the 'resources' folder
      automationName: 'UiAutomator2',
      appPackage: 'com.periodcalendar',  // Ensure this is the correct app package name
      appActivity: 'com.periodcalendar.MainActivity',  // Ensure this is the correct main activity
    } as Capabilities.AppiumCapabilities // Cast to Appium-specific capabilities
  });
});

When('I enter valid credentials', async function () {
  // Assuming there are input fields for username and password
  await driver.$('~username').setValue('testUser');
  await driver.$('~password').setValue('testPassword');
  await driver.$('~loginButton').click();
});

Then('I should see the homepage', async function () {
  // Assuming the homepage has an element with the identifier ~homePage
  const homePageElement = await driver.$('~homePage');
  const isDisplayed = await homePageElement.isDisplayed();
  if (!isDisplayed) {
    throw new Error('Homepage is not displayed');
  }
  await driver.deleteSession();
});
