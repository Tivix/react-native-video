import wd from 'wd';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;
const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: '/Users/tivix/Documents/react-native-video/examples/embed-and-fullscreen-new/android/app/build/outputs/apk/debug/app-debug.apk'
};
const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(3000);
}) // Sometime for the app to load

afterAll(async function() {
  await driver.quit();
});

test('my first appium test', async () => {
  expect(await driver.hasElementByAccessibilityId('fullButton')).toBe(true);
  const element = await driver.elementByAccessibilityId('fullButton');
  await element.click();
  await driver.sleep(3000);
  expect(await driver.hasElementByAccessibilityId('notHere')).toBe(false);
});
