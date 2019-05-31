// ratio
const preciseHeightRatio = decimals => width => height => (height / width).toFixed(decimals)
const heightRatio = preciseHeightRatio(2)

// cuts
const defaultCuts = [
  {
    media: '(min-width: 2561px)',
    width: 2880
  },
  {
    media: '(min-width: 2561px)',
    width: 2880
  },
  {
    media: '(min-width: 2305px)',
    width: 2560
  },
  {
    media: '(min-width: 1921px)',
    width: 2304
  },
  {
    media: '(min-width: 1441px)',
    width: 1920
  },
  {
    media: '(min-width: 1367px)',
    width: 1440
  },
  {
    media: '(min-width: 1281px)',
    width: 1366
  },
  {
    media: '(min-width: 1025px)',
    width: 1280
  },
  {
    media: '(min-width: 769px)',
    width: 1024
  },
  {
    media: '(min-width: 0px)',
    width: 768
  }
]

const builder = templateFn => config => {
  // fallback to jpeg
  const types = config.types || ['jpeg']

  // default to personal chosen cuts
  const cuts = config.cuts || defaultCuts

  return cuts
    // add all types
    .reduce(
      (accumulator, cut) => [].concat(accumulator, ...types.map(type => ({ type, cut }))),
      []
    )
    // spread cut
    .map(({ type, cut }) => ({
      type,
      media: cut.media,
      src: templateFn(Object.assign({}, config, { width: cut.width }))
    }))
}

export default {
  preciseHeightRatio,
  heightRatio,
  builder,
  defaultCuts
}
