import { Given, When, Then } from '@cucumber/cucumber';
import { remote } from 'webdriverio';
import { Capabilities } from '@wdio/types';
import { setDefaultTimeout } from '@cucumber/cucumber';

// Set global timeout for all steps to 30 seconds
setDefaultTimeout(30000);
let driver: WebdriverIO.Browser;
let networkAndInternetElement: WebdriverIO.Element;

Given('I open the Settings app', { timeout: 60000 }, async function () {
  driver = await remote({
    logLevel: 'error',
    path: '/',  // Corrected path (no extra '/session' at the end)
    hostname: '127.0.0.1',
    port: 4723,
    capabilities: {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:appPackage': 'com.android.settings',
      'appium:appActivity': 'com.android.settings.Settings',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceReadyTimeout': 60000, // Ensure Appium gives enough time
      'appium:newCommandTimeout': 60000,
    } as Capabilities.AppiumCapabilities
  });
});

Then('I verify the app is on the Settings page', async function () {
  // Initialize the "Network & internet" element globally
  networkAndInternetElement = await driver.$('//android.widget.TextView[@resource-id="android:id/title" and @text="Network & internet"]') as unknown as WebdriverIO.Element;
  await networkAndInternetElement.waitForDisplayed({ timeout: 15000 });
});

When('I open Networks And Internet settings', async function () {
  await networkAndInternetElement.waitForDisplayed({ timeout: 15000 });
  await networkAndInternetElement.click();
});

Then('I should see the Networks And Internet settings', async function () {
  const internetPageElement = await driver.$('//android.widget.TextView[@resource-id="android:id/title" and @text="Internet"]');
  await internetPageElement.waitForDisplayed({ timeout: 10000 });  // Wait for internetPageElement  page to load
  const isDisplayed = await internetPageElement.isDisplayed();
  if (!isDisplayed) {
    throw new Error('Internet settings page is not displayed');
  }
  await driver.deleteSession();
});
