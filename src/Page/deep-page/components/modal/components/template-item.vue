<template>
<div>
  <div class="item-con" @click="addTemplateAtDoc">
    <div class="title">
      {{data.title}}
    </div>
    <div class="desc">
      {{data.content}}
    </div>
    <div class="tool-box" flex="cross:center">
      <el-tooltip content="编辑" placement="bottom" effect="dark">
        <i class="iconfont icon-hulijiludan" @click.stop="toEdit"></i>
      </el-tooltip>
      <el-tooltip content="删除" placement="bottom" effect="dark">
        <i class="iconfont icon-shanchuzhenghang" @click.stop="toDel"></i>
      </el-tooltip>  
    </div>
  </div>
  <div class="line"></div>
</div>  
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.item-con
  position relative
  padding 10px 20px
  &:hover
    background: #f4f2f5;
    cursor pointer
    transition all .3s
    .tool-box
      display flex
    .title
      min-height 14px  
  .title
    font-size: 14px;
    color: #333333
    font-weight bold
    padding-right 50px
    min-height 0px
    margin-bottom 10px
  .desc
    font-size: 13px;
    color: #687179;  
    line-height 18px
  .tool-box
    position absolute
    bottom 0px;
    right 5px
    display none
    i
      color #687179
      font-size 16px;
      padding 4px 2px
.line
    background: #ECEEEF;     
    height 1px 
    margin 0 20px      
</style>
<script>
import bus from 'vue-happy-bus'
import data from '../../../sheet';
import {del} from '../../../api/recordDesc.js'
  export default {
    props: {
      data: Object,
    },
    data() {
      return {
        bus: bus(this),
        msg: 'hello vue'
      }
    },
    computed: {
    },
    methods: {
      addTemplateAtDoc() {
        this.bus.$emit('addTemplateAtDoc', this.data.content)
      },
      toEdit() {
        this.bus.$emit('openAddTemplateModal', this.data)
      },
      toDel() {
        this.$confirm('此操作将永久删除该常用语模版, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(this.data.id).then(res => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.bus.$emit('refreshTemplate')
          })
        })
      }
    },
    components: {}
  }
</script>
