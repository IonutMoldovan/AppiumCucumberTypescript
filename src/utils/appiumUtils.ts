import { remote } from 'webdriverio';

export async function launchApp() {
  return await remote({
    logLevel: 'error',
    capabilities: {
      platformName: 'Android',
      deviceName: 'emulator-5554',
      app: 'path/to/app.apk',
    }
  });
}
