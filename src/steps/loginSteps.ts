import { Given, When, Then } from '@cucumber/cucumber';
import { remote } from 'webdriverio';
import { Capabilities } from '@wdio/types';

let driver: WebdriverIO.Browser;

Given('I open the Settings app', async function () {
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
      'appium:deviceReadyTimeout': 60,
      'appium:newCommandTimeout': 600,
    } as Capabilities.AppiumCapabilities
  });

  // Wait for the Settings app to fully load
  await driver.waitUntil(async () => {
    const settingsPageElement = await driver.$('~Settings');  // Use a suitable selector for a visible element on the Settings screen
    return settingsPageElement.isDisplayed();  // Wait until the element is displayed
  }, {
    timeout: 15000,  // Maximum wait time in milliseconds (10 seconds)
    timeoutMsg: 'Settings app did not open within 15 seconds',  // Timeout message if the wait fails
  });
});


When('I open Wi-Fi settings', async function () {
  const wifiElement = await driver.$('~Wi-Fi');
  await wifiElement.waitForDisplayed({ timeout: 10000 });  // Wait up to 10 seconds for element to be visible
  await wifiElement.click();
});

Then('I should see the Wi-Fi settings page', async function () {
  const wifiPageElement = await driver.$('~Wi-Fi settings');
  await wifiPageElement.waitForDisplayed({ timeout: 10000 });  // Wait for Wi-Fi settings page to load
  const isDisplayed = await wifiPageElement.isDisplayed();
  if (!isDisplayed) {
    throw new Error('Wi-Fi settings page is not displayed');
  }
  await driver.deleteSession();
});
