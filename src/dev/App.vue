<template>
  <div id="app">
    <PictureMaster
      :placeholder="placeholder"
      :cuts="cuts"
      :base-image="baseImage"
      :height-ratio="heightRatio" />
  </div>
</template>

<script>
import { PictureMaster, helpers } from '@/index.js'

const config = {
  types: [
    'image/webp',
    'image/jpeg'
  ]
}

const templateBuilder = ({ src, width, quality }) => `https://placekitten.com/${width}/${Math.round(width * 0.75)} 1x, https://placekitten.com/${width * 2}/${Math.round(width * 0.75) * 2} 2x`
const build = helpers.builder(templateBuilder)(config)

export default {
  components: {
    PictureMaster
  },
  data: () => ({
    placeholder: {
      src: 'https://placekitten.com/40/30',
      alt: 'kitten-placeholder'
    },
    cuts: build,
    baseImage: {
      srcset: 'https://placekitten.com/250/187 1x, https://placekitten.com/500/374 2x',
      alt: 'alt text'
    },
    heightRatio: 0.75
  })
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
