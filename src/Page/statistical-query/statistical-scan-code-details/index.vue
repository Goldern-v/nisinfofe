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
          // 病区、状态、非扫码类、输液、注射、雾化、标本、口服
          return [
              {
                key: 'wardName',
                title: '病区',
                align: 'center',
                minWidth: 80,
              },
              {
                key: 'status',
                title: '状态',
                align: 'center',
                minWidth: 80,
              },
              {
                key: 'noScanRate',
                title: '非扫码类',
                align: 'center',
                minWidth: 85,
              },
              {
                key: 'transfusion',
                title: '输液类',
                align: 'center',
                minWidth: 90,
              },
              {
                key: 'Injection',
                title: '注射类',
                align: 'center',
                minWidth: 90,
              },
              {
                key: 'specimen',
                title: '标本',
                align: 'center',
                minWidth: 80,
              },
              {
                key: 'atomization',
                title: '雾化',
                align: 'center',
                minWidth: 80,
              },
              {
                key: 'orally',
                title: '口服',
                align: 'center',
                minWidth: 80,
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
