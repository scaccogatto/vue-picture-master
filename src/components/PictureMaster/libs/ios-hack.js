import { compatibleSrc } from './polyfills'

export default callback => delay => (isLoading, srcNode) => () => {
  window.setTimeout(async () => {
    // check if we already loaded something
    if (!isLoading()) return

    // if we don't, force loading
    try {
      const src = compatibleSrc(srcNode())
      const e = await forceLoad(src)
      callback(e)
    } catch (e) {
      callback(e)
    }
  }, delay)
}

const forceLoad = src => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', resolve)
    img.addEventListener('error', reject)
    img.setAttribute('src', src)
  })
}
