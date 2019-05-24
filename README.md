# vue-picture-master

> medium-like picture by default, canvas power if you need

## Install

### npm

```sh
npm i vue-picture-master
```

### Vue

```js
import { PictureMaster, helpers } from 'vue-picture-master'

export default {
  components: {
    PictureMaster
  }
}
```

## Usage

### template

```html
<template>
  <PictureMaster
    :placeholder="placeholder"
    :cuts="cuts"
    :baseImage="baseImage"
    :heightRatio="0.75"
    :customCanvas="false"
    :animated="true"
    :blurred="true"
    :forceLoadingDelay="750"
    @load="onLoad" />
</template>
```

### props

```js
// very little placeholder (width: 40px, height: 30px most likely)
const placeholder = {
  src: 'https://placekitten.com/40/30',
  alt: 'kitten-placeholder'
}

// complete sources array, we get it from helpers
const cuts = helpers.builder()

// the tiniest image you want to display
const baseImage = {
  src: 'https://placekitten.com/400/300',
  alt: 'alt text'
}

// height ratio compared to width (height / width), we get it from helpers
const heightRatio = helpers.heightRatio(width)(height)

// default false, true if you want to have a clean <canvas></canvas> instead of the tiny placeholder
const customCanvas = false

// default true, set to false if you don't want the default transition time
const animated = true

// default true, set to false if you don't want the default medium-like blur-out animation
const blurred = true

// default 750ms, if something goes wrong with the plugin (iPhone 6), this forces the image load after some time
const forceLoadingDelay = 750
```

### methods

```js
// get the created inner canvas so you can play with it, get it after the component mount
const canvas = component.getCanvas()

// now you can use the canvas, try it with PIXI or THREEJS
```

### events

- `@load="src => {}"`

called when the picture is fully loaded
callbacks with the loaded image src

### helpers

```js
helpers.builder()

// gets the height ratio
const width = 400
const height = 300

helpers.heightRatio(width)(height) // -> 0.75
```
