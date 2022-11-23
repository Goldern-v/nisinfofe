<template>
  <el-dialog
    title="创建质量指标报表"
    :visible.sync="qcIndicatorShow"
    custom-class="custom-dialog"
    width="30%"
    :close-on-click-modal="false"
    @close="close"
    top="0"
  >
    <el-form :model="createForm" label-width="70px">
      <el-form-item label="年份">
        <el-select v-model="createForm.year" placeholder="请选择年份">
          <el-option
            v-for="year in years"
            :key="year"
            :label="year"
            :value="year"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月份">
        <el-select v-model="createForm.month" placeholder="请选择月份">
          <el-option
            v-for="month in months"
            :key="month.name"
            :label="month.name"
            :value="month.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据同步">
        <el-radio-group v-model="createForm.sync">
          <el-radio :label="true">开启</el-radio>
          <el-radio :label="false">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="qcIndicatorShow = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="confirmFn">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    callback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      qcIndicatorShow: false,
      createForm: {
        year: `${moment().subtract(1, 'months').year()}`, // 上个月的年份
        month: moment().subtract(1, 'months').month() + 1, // 默认上个月
        sync: true
      }
    }
  },
  computed: {
    years() {
      return new Array(4).fill('').map((_, index) => {
        return moment().subtract(index, 'years').format('YYYY')
      })
    },
    months() {
      return new Array(12).fill('').map((_, index) => {
        return { name: `${index + 1}月`, value: index + 1 }
      })
    }
  },
  methods: {
    open() {
      this.qcIndicatorShow = true
    },
    close() {
      this.createForm = {
        year: `${
          moment().subtract(1, 'months').month() + 1 === 12
            ? moment().subtract(1, 'years').year()
            : moment().year()
        }`,
        month: moment().subtract(1, 'months').month() + 1, // 上个月
        sync: true
      }
      this.qcIndicatorShow = false
    },
    confirmFn() {
      this.$emit('confirm', this.createForm)
      this.close()
    }
  },
};
</script>
<style lang='stylus' scoped>
  >>>.el-dialog {
    top: 50%!important;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    border-radius: 8px!important;
  }
  >>>.el-dialog__body {
    padding: 20px 20px 0px;
  }
  >>>.el-dialog__header {
    padding: 15px 20px 10px!important;
    border-bottom: 1px solid #eee!important;
  }
  >>>.el-dialog__footer {
    border-top: 1px solid #eee!important;
  }
  >>>.el-select {
    width: 100%;
  }
</style>
