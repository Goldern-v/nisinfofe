<template>
  <div>
  <div class="contain">
    <div class="title">
      等床病人 (共100人)
      <span class="return"><span style="margin: 0 10px">|</span> <span class="aside" @click="returnH">返回</span></span>
    </div>
    <wait-table :tableData="tableData"></wait-table>
  </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 20px 20px 0
  .title
    font-size: 16px;
    color: #687179;
    .return
      font-size: 13px;
      color: #687179;  
      .aside
        cursor pointer
        &:hover
          color: #4BB08D
</style>
<script>
import waitTable from './component/wait-table'
import { getWaitingPat } from '@/api/log'
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      getData() {
        getWaitingPat(this.wardCode).then(res => {
          this.tableData = res.data.data
        })
      },
      returnH() {
        this.$router.push('/lesion/log')
      }
    },
    computed: {
      wardCode() {
        return this.$store.state.lesion.deptCode
      }
    },
     watch: {
      wardCode() {
        this.getData()
      }
    },
    created() {
      if (this.wardCode) {
        this.getData()
      }
    },
    components: {
      waitTable
    }
  }
</script>
