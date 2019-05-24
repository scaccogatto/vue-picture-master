// ratio
const preciseHeightRatio = decimals => width => height => (height / width).toFixed(decimals)
const heightRatio = preciseHeightRatio(2)

// cuts
const cutsSizes = cutsNumber => cutsMin => cutsMax =>
  Array.from(new Array(cutsNumber))
    .map((e, i) => cutsMin * i)
    .filter(size => size < cutsMax)

// const cutsMedia = mediaTrigger => cutsUnit => cutsSizes =>
//   cutsSizes
//     .map(size => size + cutsUnit)
//     .map(size => `${mediaTrigger}: ${size}`)
//     .map(size => `(${size})`)

const builder = templateFn => cutsNumber => cutsMin => cutsMax => config => {
  const sizes = cutsSizes(cutsNumber)(cutsMin)(cutsMax)

  const cuts = cutsMin < cutsMax
    ? sizes.slice().reverse()
    : sizes

  const types = config.types || ['jpeg']

  const mediaTrigger = config.mediaTrigger || 'min-width'
  const mediaUnit = config.mediaUnit || 'px'

  return cuts
    .reduce(
      (accumulator, cut) => [].concat(accumulator, ...types.map(type => ({ type, cut }))),
      []
    )
    .map(metaCut => Object.assign({}, metaCut, {
      src: templateFn(Object.assign({}, config, { width: metaCut.cut, height: metaCut.cut * config.ratio }))
    }))
    .map(({ type, cut, src }) => ({
      type,
      media: `(${mediaTrigger}: ${cut}${mediaUnit})`,
      src
    }))
}

export default {
  preciseHeightRatio,
  heightRatio,
  builder
}
