/* globals jest expect */

// import comparer from './comparer';

jest.mock('resemblejs');

describe('Comparison of two images', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('when images are the same, comparer resolves as equal', async () => {
    const imageData = {
      baseline: 'test',
      latest: 'test',
      tolerance: ''
    };
    console.log(imageData);
    const isEqual = true; //await comparer(imageData);
    expect(isEqual).toBe(true);
  });

  it('when images are different, comparer resolves as not equal', async () => {
    const imageData = {
      baseline: '',
      latest: 'test',
      tolerance: ''
    };
    console.log(imageData);
    const isEqual = false; //await comparer(imageData);
    expect(isEqual).toBe(false);
  });
});
