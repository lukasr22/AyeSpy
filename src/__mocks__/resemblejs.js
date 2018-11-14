export default (reference, image, opts, callback) => {
  const data =
    reference === image
      ? { rawMisMatchPercentage: 0.0 }
      : { rawMisMatchPercentage: 1.0 };
  callback(null, data);
};
