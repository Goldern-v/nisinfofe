<template>
  <div class="prints-view">
    <div class="content-view">
      <div class="m_title">请选择要打印的患者:</div>
      <el-select v-model="printSelect" filterable multiple placeholder="请选择">
        <el-option
            v-if=""
            v-for="item in optionList"
            :key="item.patientId"
            :label="`${item.bedLabel}床 ${item.name} ${item.patientId} ${HOSPITAL_ID == 'huadu' ? item.remark : ''}`"
            :value="item.patientId">
        </el-option>
      </el-select>
      <div class="buttons">
        <el-button @click="cancelPrint">取消</el-button>
        <el-button @click="clearPringts">清空</el-button>
        <el-button @click="allPrints">全选</el-button>
        <el-button @click="surePrint" :disabled="!printSelect.length">打印</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.prints-view {
  z-index 999
  position fixed
  top 0
  left 0
  width 100%
  height 100vh
  background-color rgba(0, 0, 0, .3)

  .content-view {
    width 500px
    min-height 250px
    background-color #fff
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -100%)
    box-sizing border-box
    padding 0 0 0 50px

    .m_title {
      line-height 50px
    }

    .el-select {
      margin-bottom: 50px

      >>> input {
        width 400px
      }

      >>> .el-select__tags {
        max-height 120px
        overflow auto
      }
    }

    .buttons {
      position absolute
      top 80%
      left 20%
    }
  }
}
</style>
<script>
export default {
  props: {
    list: {
      type: Array,
      value: [],
      disabled: true
    }
  },
  data() {
    return {
      printSelect: [],
      optionList: []
    };
  },
  methods: {
    cancelPrint() {
      this.$emit("cancelPrint")
    },
    clearPringts() {
      this.printSelect = []
    },
    allPrints() {
      this.printSelect = this.optionList.map(item => item.patientId)
    },
    surePrint() {
      if (!this.printSelect.length) {
        return
      }
      let printSelect = {}
      this.optionList.forEach(item => {
        // console.log(item);
        printSelect[item.patientId] = JSON.parse(JSON.stringify(item))
      })
      let selected = this.printSelect.map(item => printSelect[item])
      this.$emit("toPrints", selected)
    }
  },
  watch: {
    list() {
      this.optionList = this.list.filter(item => item.patientId).sort((a, b) => a.bedNo - b.bedNo)
    }
  }
};
</script>
