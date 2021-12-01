<template>
  <div>
    <iframe
      :style="{ height: height }"
      frameborder="0"
      class="assessment-iframe"
      v-if="url"
      :src="url"
      @load="onload"
      ref="iframe"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: '',
      // 流转单路径
      url: ''
    }
  },
  created() {
    this.url = ''
  },
  methods: {
    onload() {

    }
  }
}
</script>

<style>

</style>
