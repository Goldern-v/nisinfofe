<template>
<div class="statistical-operation">
  <search-con
    :deptList="deptList"
    :loading.sync="loading"
    :formData="formData"
    :istype="!!HOSPITAL_ID == 'nfyksdyy'"
    datetype="datetime"
    @handleExport="handleExport"
    @handleQuery="handleQuery"/>
  <div class="statistical-operation__content default-content" v-loading.sync="loading">
    <iview-table
      stripe
      :data="tableData"
      border
      :height="wih - 182"
      :columns="columns"/>
    <pagination
      :pageIndex="pageIndex"
      :size="pageNum"
      :total="total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange" />
  </div>
</div>
</template>
<style lang='scss' scoped>
.statistical-operation {
  .statistical-operation__content {
    >>>.ivu-table {
      width: 100%;
      box-sizing: border-box;
    }
		>>>.ivu-table th {
			text-align: center;
			background-color: #eef5f6;
			height: 40px;
		}
		>>>.ivu-table td .ivu-table-cell {
			text-align: center;
		}
  }
}
</style>
<script>
import commonMixin from '@/common/mixin/common.mixin';
import SearchCon from '../components/search-con.vue'
import indexMixins from '../mixins/index.mixins'
import Pagination from '@/components/pagination/pagination.vue'

export default {
  mixins: [commonMixin, indexMixins],
  props: {},
  data() {
    return {
      formData: {
        beginTime: '',
        endTime: '',
        wardCode: '',
        status: 0,
      },
      columns: this.handleColumns()
    };
  },
  mounted() {
    delete this.formData.status;
  },
  methods: {
    handleColumns(){
      switch (this.HOSPITAL_ID) {
        default:
          return [
              {
                key: 'wardName',
                title: '病区',
                align: 'center',
                minWidth: 80,
              },
              {
                key: 'scanRate',
                title: '药品类扫码率统计',
                align: 'center',
                minWidth: 120,
              },
              {
                key: 'tolScanRate',
                title: '整体执行率统计',
                align: 'center',
                width: 200,
              },
            ]
      }
    },
  },
  components: {
    SearchCon,
    Pagination,
  }
};
</script>
