<template>
<div class="statistical-temperature">
  <search-con
    :deptList="deptList"
    :loading.sync="loading"
    :formData="formData"
    :recordList="recordList"
    @handleExport="handleExport"
    @handleQuery="handleQuery">
    <template>
      <div class="search-con__ctx__item">
        尿量：
        <input-num-range :props="{step: 0.1}" :value="[formData.nrineMin, formData.nrineMax]" @change="(e) => handleIptNum(e,['nrineMin', 'nrineMax'])"/>
      </div>
      <div class="search-con__ctx__item main-color">
        <i class="icon iconfont">&#xe6bc;</i>注：尿量查询时的范围包含所输入的区间值
      </div>
    </template>
  </search-con>
  <div class="statistical-temperature__content default-content" v-loading.sync="loading">
    <iview-table
      stripe
      :data="tableData"
      border
      :height="wih - 222"
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
@import '../index.scss';
.statistical-temperature {
  .statistical-temperature__content {
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
import InputNumRange from '../components/input-num-range.vue'
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
        recordName: '出入量记录表',
        status: 0,
        timing: '',
        nrineMin: 0,
        nrineMax: 500,
      },
      recordList: [
        { name: '出入量记录表', value: '出入量记录表' },
        { name: '病重（病危）患者护理记录单', value: '病重（病危）患者护理记录单' },
        { name: '重症医学科监护记录单', value: '重症医学科监护记录单' },
      ]
    };
  },
  methods: {
  },
  computed:{
    columns(){
      if (['whsl'].includes(this.HOSPITAL_ID)) {
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
					minWidth: 180,
				},
        {
					key: 'bedNo',
					title: '床号',
          align: 'center',
					minWidth: 70,
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
					key: 'recordDate',
					title: '日期',
          align: 'center',
					minWidth: 180,
				},
        {
					key: 'urine',
					title: '尿量(ml)',
          align: 'center',
					minWidth: 100,
				},
       ]
      }else{
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
					minWidth: 180,
				},
        {
					key: 'bedNo',
					title: '床号',
          align: 'center',
					minWidth: 70,
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
					key: 'recordDate',
					title: '日期',
          align: 'center',
					minWidth: 110,
          render: (h, { row }) => {
            return <span>{row.recordDate.split(' ')[0]}</span>

          }
				},
        {
					key: 'timing',
					title: '时间点',
          align: 'center',
					minWidth: 70,
				},
        {
					key: 'urine',
					title: '尿量(ml)',
          align: 'center',
					minWidth: 100,
				},
       ]
      }
    }
  },
  components: {
    SearchCon,
    InputNumRange,
    Pagination,
  }
};
</script>
