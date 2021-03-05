import wd from 'wd';
import path from 'path';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;
const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: path.join(process.cwd(), 'android/app/build/outputs/apk/release/app-release.apk')
};
const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(3000);
}) // Sometime for the app to load

afterAll(async function() {
  await driver.quit();
});

test('Player is launched', async () => {
  expect(await driver.hasElementByAccessibilityId('player')).toBe(true);
});

test('Player starts playing video on "play" tap', async () => {
  expect(await driver.hasElementByAccessibilityId('play')).toBe(true);
  const element = await driver.elementByAccessibilityId('play')
  await element.click()
});

test('Seek player to specific time', async () => {
  expect(await driver.hasElementByAccessibilityId('seekButton')).toBe(true);
  const element = await driver.elementByAccessibilityId('seekButton');
  await element.click();
});
