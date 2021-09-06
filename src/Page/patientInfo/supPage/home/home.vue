<template>
  <div class="contain" v-if="isNewPage">
    <topPart></topPart>
    <bottomPart></bottomPart>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 20px 20px 0
</style>
<script>
import topPart from './components/top-part/top-part'
import bottomPart from './components/bottom-part/bottom-part'
  export default {
    data() {
      return {
        msg: 'hello vue',
        isNewPage:true
      }
    },
    watch:{
      '$route.path'(){
        this.isNewPage = false;
        setTimeout(()=>{
        this.isNewPage = true;
        })
      }
    },
    components: {
      topPart, bottomPart
    }
  }
</script>
