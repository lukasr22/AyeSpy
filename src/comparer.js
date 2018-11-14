import { promisify } from 'util';
import resemble from 'resemblejs';
import logger from './logger';

const comparejsAsync = promisify(resemble.compare);

const options = {
  output: {
    errorColor: {
      red: 255,
      green: 0,
      blue: 255
    },
    errorType: 'movement',
    transparency: 0.3,
    largeImageThreshold: 1200,
    useCrossOrigin: false,
    outputDiff: true
  },
  scaleToSameSize: true,
  ignore: 'antialiasing'
};

const isEqual = imageData =>
  comparejsAsync(imageData.baseline, imageData.latest, options)
    .then(data => {
      let retVal = false;
      var rawThreshold = 0;
      if (imageData.tolerance != undefined) {
        rawThreshold = imageData.tolerance;
      }
      if (data.rawMisMatchPercentage <= rawThreshold) {
        logger.info('comparer', `✅ Passed: ${imageData.label}`);
        retVal = true;
      } else {
        logger.info('comparer', `☠️ Failed: ${imageData.label}`);
      }
      return retVal;
    })
    .catch(err => {
      logger.error('comparer', err);
    });

export default isEqual;
