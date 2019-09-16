
<template>
  <div>
    <div>
      <a :name="obj.title"></a>
    </div>
    <div v-if="obj.type==='formGroupTitle'"
    :style='obj.style'
    :class='obj.class|| obj.level&&obj.level==="1"?"group-title-box":"group-sub-title-box"'
    >{{obj.title}}</div>
  </div>
</template>

<script>
import vue from 'vue'
import uuid from 'node-uuid'

export default {
  name:"FormGroupTitle",
  props: {
    obj: Object,
    formObj: Object,
  },
  components: {

  },
  data() {
    return {
    }
  },
  computed:{
    uui(){
      return uuid.v1()
    }
  },
  watch: {
  },
  mounted() {
  },
  created() {
  },
  methods: {
    getUUID(){
      let uuid_ = uuid.v1()
      // console.log(uuid_)
      return uuid_
    }
  },
}
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .group-title-box
    margin 10px 0 10px 0
    font-weight bold
  .group-sub-title-box
    font-size 15px
    text-indent 1.25em
    margin 10px 0 5px 0
</style>
