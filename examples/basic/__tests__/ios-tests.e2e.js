import wd from 'wd';
import path from 'path';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;
const config = {
  platformName: 'iOS',
  platformVersion: '14.4',
  deviceName: 'iPhone 11',
  app: path.join(process.cwd(), 'ios/build/Build/Products/Debug-iphonesimulator/VideoPlayer.app')
};
const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(3000);
}) // Sometime for the app to load

afterAll(async function() {
  await driver.quit();
});

test('testPlayButton', async () => {
  expect(await driver.hasElementByAccessibilityId('play')).toBe(true);
  const element = await driver.elementByAccessibilityId('play')
  await element.click()
});

test('testPlayerExists', async () => {
  await driver.sleep(3000);
  expect(await driver.hasElementByAccessibilityId('player')).toBe(true);
});
