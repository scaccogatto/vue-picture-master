<template>
  <div
    class="picture-master"
    :class="{
      'picture-master--loading': loading,
      'picture-master--animated': animated,
      'picture-master--blurred': blurred
    }"
  >
    <div class="picture-master__wrapper">
      <div class="picture-master__placeholder-ghost" :style="masterStyle"></div>

      <canvas v-if="customCanvas" ref="canvas" class="picture-master__placeholder">
      </canvas>

      <picture v-if="!customCanvas" class="picture-master__placeholder">
        <img :src="placeholder.src" :alt="placeholder.alt || baseImage.alt" />
      </picture>

      <picture class="picture-master__picture">
        <source
          v-for="(cut, index) of cuts"
          :key="index"
          :type="cut.type"
          :media="cut.media"
          :srcset="cut.src"
        />

        <img
          ref="masterPicture"
          :src="baseImage.src"
          :alt="baseImage.alt"
          @load="$_setLoaded"
        />
      </picture>
    </div>
  </div>
</template>

<script>
import iOSHack from './libs/ios-hack'
import { compatibleSrc } from './libs/polyfills'

export default {
  props: {
    placeholder: {
      type: Object,
      required: true
    },
    cuts: {
      type: Array,
      required: true
    },
    baseImage: {
      type: Object,
      required: true
    },
    heightRatio: {
      type: Number,
      required: true
    },
    customCanvas: {
      type: Boolean,
      default: () => false
    },
    animated: {
      type: Boolean,
      default: () => true
    },
    blurred: {
      type: Boolean,
      default: () => true
    },
    forceLoadingDelay: {
      type: Number,
      default: () => 750
    }
  },
  data: () => ({
    loading: true
  }),
  computed: {
    masterStyle: {
      get () {
        return {
          paddingBottom: `${this.heightRatio * 100}%`
        }
      }
    },
    iOSHack: {
      get () {
        return iOSHack(this.$_setLoaded)(this.forceLoadingDelay)(() => this.loading, () => this.$refs.masterPicture)
      }
    }
  },
  watch: {
    loading: {
      handler (value) {
        if (value) this.$emit('load', compatibleSrc(this.$refs.masterPicture))
      }
    }
  },
  mounted () {
    this.iOSHack()
  },
  methods: {
    getCanvas () {
      return this.$refs.canvas
    },
    $_setLoaded () {
      this.loading = false
    }
  }
}
</script>

<style>
.picture-master {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.picture-master--loading.picture-master--blurred .picture-master__wrapper {
  filter: blur(25px);
}

.picture-master--loading .picture-master__wrapper {
  filter: blur(0);
}

.picture-master__placeholder-ghost {
  position: relative;
  width: 100%;
  height: 0;
  pointer-events: none;
}

.picture-master__placeholder {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
}

.picture-master__placeholder img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.picture-master--loading .picture-master__placeholder {
  opacity: 1;
}

.picture-master__picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.picture-master__picture img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.picture-master--animated .picture-master__wrapper,
.picture-master--animated .picture-master__placeholder {
  transition: all 0.15s linear;
}
</style>
