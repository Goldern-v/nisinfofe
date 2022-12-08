<template>
<div class="statistical-operation">
  <search-con
    :deptList="deptList"
    :loading.sync="loading"
    :formData="formData"
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
  methods: {
    handleColumns(){
      switch (this.HOSPITAL_ID) {
        case 'sdlj':
          return [
            {
              key: 'index',
              title: '编号',
              align: 'center',
              width: 70,
              render: (h, { index }) => {
                return <span>{ (index + 1)  + ((this.pageIndex - 1) * this.pageNum) }</span>
              }
            },
            {
              key: 'wardName',
              title: '病区',
              align: 'center',
              minWidth: 100,
            },
            {
              key: 'patientId',
              title: '住院号',
              align: 'center',
              minWidth: 100,
            },
            {
                key: 'name',
                title: '患者姓名',
                align: 'center',
                minWidth: 100,
              },
              {
                key: 'sex',
                title: '性别',
                align: 'center',
                width: 70,
              },
              {
                key: 'age',
                title: '年龄',
                align: 'center',
                width: 70,
              },
              {
                key: 'contactAddress',
                title: '详细地址',
                align: 'center',
                minWidth: 200,
              },
              {
                key: 'mzzd',
                title: '门（急）诊诊断',
                align: 'center',
                minWidth: 250,
              },
              {
                key: 'mzys',
                title: '医生',
                align: 'center',
                minWidth: 70,
              },
              {
                key: 'admissionDate',
                title: '入院日期',
                align: 'center',
                minWidth: 110,
              },
              {
                key: 'ryzd',
                title: '入院诊断',
                align: 'center',
                minWidth: 230,
              },
              {
                key: 'zyys',
                title: '医生',
                align: 'center',
                minWidth: 70,
              },
              {
                key: 'cyzd',
                title: '出院诊断',
                align: 'center',
                minWidth: 110,
              },
              {
                key: 'cyys',
                title: '医生',
                align: 'center',
                minWidth: 110,
              },
              {
                key: 'dischargeDate',
                title: '出院日期',
                align: 'center',
                minWidth: 110,
                render: (h, { row }) => {
                  return <span>{ row.dischargeDate || '-' }</span>
                }
              },
              {
                key: 'ryts',
                title: '住院天数',
                align: 'center',
                minWidth: 110,
              },
              {
                key: 'bw',
                title: '危',
                align: 'center',
                minWidth: 110,
              },
              {
                key: 'bz',
                title: '重',
                align: 'center',
                minWidth: 110,
              },
              {
                key: 'lx',
                title: '疗效',
                align: 'center',
                minWidth: 110,
              },
              {
                key: 'expand',
                title: '备注',
                align: 'center',
                minWidth: 110,
              },
          ]
        default:
          return [
              {
                key: 'index',
                title: '序号',
                align: 'center',
                width: 70,
                render: (h, { index }) => {
                  return <span>{ (index + 1)  + ((this.pageIndex - 1) * this.pageNum) }</span>
                }
              },
              {
                key: 'wardName',
                title: '病区',
                align: 'center',
                minWidth: 100,
              },
              {
                key: 'name',
                title: '患者姓名',
                align: 'center',
                minWidth: 70,
              },
              {
                key: 'sex',
                title: '性别',
                align: 'center',
                width: 70,
              },
              {
                key: 'age',
                title: '年龄',
                align: 'center',
                width: 70,
              },
              {
                key: 'patientId',
                title: '病案号',
                align: 'center',
                minWidth: 100,
              },
              {
                key: 'diagnosis',
                title: '入院诊断',
                align: 'center',
                minWidth: 110,
              },
              {
                key: 'admissionDate',
                title: '入院时间',
                align: 'center',
                minWidth: 110,
              },
              {
                key: 'dischargeDate',
                title: '出院时间',
                align: 'center',
                minWidth: 110,
                render: (h, { row }) => {
                  return <span>{ row.dischargeDate || '-' }</span>
                }
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
