import { Given, When, Then } from '@cucumber/cucumber';
import { remote } from 'webdriverio';
import { Capabilities } from '@wdio/types';
import { setDefaultTimeout } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';

// Set global timeout for all steps to 30 seconds
setDefaultTimeout(30000);
let driver: WebdriverIO.Browser;

// Ensure the screenshots folder exists
const screenshotDir = path.resolve(__dirname, '../../screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

// Helper function to take and save a screenshot
async function saveScreenshot() {
  const screenshot = await driver.takeScreenshot();
  const screenshotPath = path.join(screenshotDir, `screenshot_${Date.now()}.png`);

  // Save the screenshot as a file
  fs.writeFileSync(screenshotPath, screenshot, 'base64');

  console.log(`Screenshot saved: ${screenshotPath}`);

  // Return the image buffer instead of the file path
  return Buffer.from(screenshot, 'base64');
}

Given('I open the Settings app', { timeout: 60000 }, async function () {
  driver = await remote({
    logLevel: 'error',
    path: '/',
    hostname: '127.0.0.1',
    port: 4723,
    capabilities: {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:appPackage': 'com.android.settings',
      'appium:appActivity': 'com.android.settings.Settings',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceReadyTimeout': 60000,
      'appium:newCommandTimeout': 60000,
    } as Capabilities.AppiumCapabilities
  });

  // Take and attach screenshot
  const screenshotBuffer = await saveScreenshot();
  this.attach(screenshotBuffer, 'image/png');
});

Then('I verify the app is on the Settings page', async function () {
  const networkAndInternetElement = await driver.$('//android.widget.TextView[@resource-id="android:id/title" and @text="Network & internet"]');
  await networkAndInternetElement.waitForDisplayed({ timeout: 15000 });

  // Take and attach screenshot
  const screenshotBuffer = await saveScreenshot();
  this.attach(screenshotBuffer, 'image/png');
});

When('I open Networks And Internet settings', async function () {
  const networkAndInternetElement = await driver.$('//android.widget.TextView[@resource-id="android:id/title" and @text="Network & internet"]');
  await networkAndInternetElement.waitForDisplayed({ timeout: 15000 });
  await networkAndInternetElement.click();

  // Take and attach screenshot
  const screenshotBuffer = await saveScreenshot();
  this.attach(screenshotBuffer, 'image/png');
});

Then('I should see the Networks And Internet settings', async function () {
  const internetPageElement = await driver.$('//android.widget.TextView[@resource-id="android:id/title" and @text="Internet"]');
  await internetPageElement.waitForDisplayed({ timeout: 10000 });

  const isDisplayed = await internetPageElement.isDisplayed();
  if (!isDisplayed) {
    throw new Error('Internet settings page is not displayed');
  }

  // Take and attach screenshot
  const screenshotBuffer = await saveScreenshot();
  this.attach(screenshotBuffer, 'image/png');

  await driver.deleteSession();
});
