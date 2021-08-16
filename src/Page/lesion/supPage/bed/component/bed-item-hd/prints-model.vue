<template>
  <div class="right-mouse-modal" @click="toPrint">
    批量打印
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.right-mouse-modal{
    cursor pointer;
    background-color #fdfdfd
    position: absolute;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align center;
    z-index:999;
    border:1px solid #ccc;
}
</style>
<script>
export default {
props: {},
data() {
return {};
},
methods: {
    toPrint(){
        this.$emit('toPrints')
    }
},
components: {}
};
</script>
