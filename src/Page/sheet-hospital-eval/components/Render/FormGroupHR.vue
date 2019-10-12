
<template>
<div>
  <div v-if="obj.type==='formGroupHR' && !obj.line"
  :style='obj.style'
  :class='obj.class|| obj.level&&obj.level==="1"?"group-hr-box":"group-sub-hr-box"'
  >
  </div>
  <div v-if="obj.type==='formGroupHR' && obj.line==='dashed'" class="group-hr-dashed-box"></div>
</div>
</template>

<script>
import vue from 'vue'
import uuid from 'node-uuid'


// {
//     "name": "I003001",
//     "type": "formGroupColBox",
//     "col": 2,
//     "title": "神经系统",
//     "message": "",
//     "require": "false",
//     "prefixDesc": "",
//     "suffixDesc": "",
//     "keys": "I003001",
//     "style": null,
//     "classes": null,
//     "readOnly": null,
//     "children": []
// },

export default {
  name:"FormGroupHR",
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
  .group-hr-box
    margin 10px 0 20px 0
    font-weight bold
  .group-sub-hr-box
    font-size 15px
    // text-indent 1.25em
    margin 10px -20px 15px -20px
    border 1px solid #f2f2f2
    background #d7d7d7
    height 1px
    border 0px solid #d7d7d7
    // border-top 1px solid #d7d7d7
    // border-bottom 1px solid #d7d7d7
  .group-hr-dashed-box
    border-bottom 1px dashed #d7d7d7
    margin 10px -20px 10px -21px
</style>
