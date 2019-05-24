<template>
  <div id="app">
    <PictureMaster
      :placeholder="placeholder"
      :cuts="cuts"
      :baseImage="baseImage"
      :heightRatio="heightRatio" />
  </div>
</template>

<script>
import PictureMaster from '@/components/PictureMaster/PictureMaster'
import helpers from '@/components/PictureMaster/libs/helpers'

export default {
  components: {
    PictureMaster
  },
  data: () => ({
    placeholder: {
      src: 'https://placekitten.com/40/30',
      alt: 'kitten-placeholder'
    },
    cuts: [
      {
        type: 'image/jpeg',
        media: '(min-width: 1281px)',
        src: 'https://placekitten.com/1200/900'
      },
      {
        type: 'image/jpeg',
        media: '(min-width: 800px)',
        src: 'https://placekitten.com/900/675'
      },
      {
        type: 'image/jpeg',
        media: '(min-width: 500px)',
        src: 'https://placekitten.com/675/506'
      }
    ],
    baseImage: {
      src: 'https://placekitten.com/250/187',
      alt: 'alt text'
    },
    heightRatio: 0.75
  }),
  mounted () {
    const config = {
      src: 'http://cdn.it/img.png',
      ratio: 0.75,
      quality: 80,
      types: [
        'image/webp',
        'image/jpeg'
      ]
    }

    const cutsNumber = 4
    const cutsMin = 500
    const cutsMax = 1281

    const templateBuilder = ({ src, width, height, quality }) => `${src}?w=${width}&h=${height}&q=${quality}`

    const build = helpers.builder(templateBuilder)(cutsNumber)(cutsMin)(cutsMax)(config)
    console.log(build)
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
