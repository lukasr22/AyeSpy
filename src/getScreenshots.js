import webdriver, { By, until } from 'selenium-webdriver';
import pLimit from 'p-limit';
import scenarioValidator from './scenarioValidator';

const limit = pLimit(5);

export default (SnapShotter, config) =>
  Promise.all(
    config.scenarios.map(scenario => {
      return limit(() => snapShoot(scenario, SnapShotter, config));
    })
  );

function snapShoot(scenario, SnapShotter, config) {
  return new Promise(resolve => {
    scenarioValidator(scenario);
    const promises = [];
    scenario.viewports.forEach(viewport => {
      const snap = new SnapShotter(
        {
          label: scenario.label,
          latest: config.latest,
          browser: config.browser,
          mobileDeviceName: scenario.mobileDeviceName,
          gridUrl: config.gridUrl,
          height: viewport.height,
          width: viewport.width,
          viewportLabel: viewport.label,
          cookies: scenario.cookies,
          cropToSelector: scenario.cropToSelector,
          removeSelectors: scenario.removeSelectors,
          waitForSelector: scenario.waitForSelector,
          url: scenario.url,
          onBeforeScript: scenario.onBeforeScript,
          onReadyScript: scenario.onReadyScript,
          wait: scenario.wait
        },
        { webdriver, By, until }
      );
      promises.push(snap.takeSnap());
    });
    resolve(Promise.all(promises));
  });
}
