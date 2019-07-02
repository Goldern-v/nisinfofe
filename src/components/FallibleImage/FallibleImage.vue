<template>
  <span v-if="error">{{alt}}</span>
  <img v-else :src="src" :alt="alt" @error="onError">
</template>

<script>
  export default {
    props: {
      src: String,
      alt: String
    },
    data: () => ({
      error: false
    }),
    methods: {
      onError () {
        this.error = true
      }
    }
  }
</script>

<style lang="stylus">
</style>
