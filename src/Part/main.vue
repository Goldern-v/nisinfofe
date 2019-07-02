<template>
  <div>
    <HLheader></HLheader>
    <router-view></router-view>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>
<script>
  import HLheader from '@/components/HLheader/HLheader'
  export default {
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      HLheader
    }
  }
</script>
