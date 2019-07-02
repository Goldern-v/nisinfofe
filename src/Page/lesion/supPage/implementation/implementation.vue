<template lang="pug">
.contain
  .im-table-con
    .head-con(flex="main:justify cross:center")
      .left-part(flex="main:justify cross:center") 
        span(class="title-text") 日期：
        span.time-select-con
          el-date-picker(v-model="selectTime" type="date" placeholder="选择日期" @change="dateChange()")
        span(class="title-text") 时间：
        span.time-select-con.time-opt
          el-select(v-model="timePot" placeholder="请选择")
            el-option(v-for="item in timeOptions" :key="item" :label="item" :value="item")
        span(class="title-text") 类型：    
        span.time-select-con
          el-select(v-model="type" placeholder="请选择")
            el-option(v-for="(item,index) in typeOptions" :key="index" :label="item" :value="item")    
        span(class="title-text") 执行情况：    
        span.time-select-con
          el-select(v-model="state" placeholder="请选择")
            el-option(v-for="(item,index) in stateOptions" :key="index" :label="item" :value="item")    
        //- el-button(type="primary comfirm" @click="filterArr()") 确定
        searchType(@changeType="getData" ref="searchType")
        div(class="input-con" flex="cross:stretch")
          input(type="text" class="search-input" flex-box="1" placeholder="床号/姓名" v-model="searchText")
          div(class="search-btn" @click="onSearch()" flex="cross:center main:center")
            i(class="iconfont icon-search") 
      .right-part(flex="cross:center") 
        span()
          whiteButton(text="执行单打印" @click="executePrint()")
        span()
          whiteButton(text="瓶签打印" @click="labelPrint()")
    implementationTable(:data="filterArr" :loading="loading" :printBarCode.sync="printBarCode")
</template>

<script>
 import whiteButton from '@/components/button/white-button.vue'
 import implementationTable from './component/shift-table/implementation-table.vue'
 import {list} from '@/api/implementation'
 import moment from 'moment'
 import searchType from './component/search-type/search-type.vue'
  export default {
    data() {
      return {
        // 搜索关键字
        searchText: '',
        // 请求接口日期参数开始时间和结束时间，默认今天
        selectTime: moment().format('YYYY-MM-DD'),
        // 表格数据
        tableData: [],
        //时间点，对应zxsj字段
        timePot: '全部',
        timeOptions: ['全部','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        // 护理单元code 
        wardCode: '',
        // 表格数据正在加载
        loading: true,
        // 类型，对应repeatIndicator字段
        type: '全部',
        typeOptions: ['全部','临时','长期'],
        // 执行情况，对应executeFlag字段
        state: '全部',
        stateOptions: ['全部','未执行','执行中','已结束'],
        // 全部数据
        sData: [],
        // 选中的数据
        printBarCode: [],
      }
    },
    methods: {
      // 日期改变
      dateChange(val){
        this.getData();
      },
      /**
       * 请求数据
       */
      // 数据初始化
      // init() {
      //   this.timePot = '全部'
      //   this.type = '全部'
      //   this.typeOptions = '全部'
      //   this.state = '全部'
      // },
      async getData() {
        if(this.selectTime) {
           try{
          let wardCode = this.deptCode;
          let startDate = moment(this.selectTime).format('YYYY-MM-DD')
          let endDate = moment(this.selectTime).format('YYYY-MM-DD')
          if(wardCode && startDate && endDate) {
            this.loading = true;
            let {data:{data:data}} = await list(wardCode,startDate,endDate, this.$refs.searchType.type);
            this.loading = false;
            this.tableData = this.stripe(data)
          }
        }
        catch(e) {
          console.log(e);
        }
        }
      },
      stripe(list) {
        let stripeRow = true
        let isFirst = false
        let barCode = ''
        let renderList = list.map((item) => {
        item.stripeRow = stripeRow
          if(item.barCode != barCode) {
            barCode = item.barCode
            stripeRow = !stripeRow
            item.stripeRow = stripeRow
            item.isFirst = true
          }
          return item
        })
        return renderList
      },
      // 瓶签打印
      labelPrint() {

        return  this.$alert('请前往护士工作站->医嘱->医嘱瓶签（二维码）中打印瓶签，谢谢', '提醒', {
          confirmButtonText: '确定',
        });
        let printBarCode = this.printBarCode;
        let printData = []
        if(!printBarCode.length){
          this.$message.error('请选择要打印的选项！');
          return;
        }
        printData = this.printBarCode.map(item => {
          return this.tableData.filter(option => {
            return option.barCode == item
          })
        })
        console.log(printData)
        let print_wid = window.open(`/crNursing/print/label`);
        print_wid.onload = () => {
          print_wid.getData(printData);
          // print_wid.print();
        }
      },
      // 执行单打印
      executePrint() {
        return  this.$alert('请前往护士工作站->医嘱->医嘱瓶签（二维码）中打印瓶签，谢谢', '提醒', {
          confirmButtonText: '确定',
        });
        let printBarCode = this.printBarCode;
        let printData = []
        let time =  moment().format('YYYY-MM-DD hh:mm');
        if(!printBarCode.length){
          this.$message.error('请选择要打印的选项！');
          return;
        }
        printData = this.printBarCode.map(item => {
          return this.tableData.filter(option => {
            return option.barCode == item
          })
        })
        let print_wid = window.open(`/crNursing/print/execute`);
          print_wid.onload = () => {
          print_wid.getData(printData, time)
          // print_wid.print()
        }
      }
    },
    computed: {
      // 获取 护理单元code
      deptCode() {
        return this.$store.state.lesion.deptCode;
      },
      //根据条件筛选数组
      filterArr(){
       return this.tableData.filter((item) => {
          // 过滤时间点
          if(this.timePot != '全部' && this.timePot != item.zxsj.split(':')[0]) return false
          if(this.type != '全部' && this.type != item.repeatIndicator) return false
          if(this.state != '全部' && this.state != item.executeFlag) return false
          if(this.searchText != '') {
            if( item.bedLabel.indexOf(this.searchText) == -1 && item.name.indexOf(this.searchText) == -1) {
              return false
            }
          }
          return true
       })
       return this.tableData
      },
    },
    watch: {
      deptCode() {
        this.getData();
      }
    },
    mounted() {
      this.getData();
    },
    components: {
      whiteButton, implementationTable, searchType
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.comfirm
  margin-right: 40px
.contain
  margin 20px 20px 0
.im-table-con
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  background #fff
  .head-con
    height 50px
    padding 0 16px
    background: #F8F8F8;
    border-bottom 1px solid #CBD5DD    
.title-text
  font-size: 12px;
  color: #687179;
.input-con
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 2px 0 0 2px;
    height 28px
    .search-input
      width 0  
      outline none 
      border 0
      font-size: 12px;
      color: #687179;
      padding-left 15px
      width 100px
    .search-btn
      width 40px
      border-left 1px solid #C2CBD2
      i 
        font-size 18px
        color #788188
</style>

<style lang="stylus">
.time-select-con
  .el-input__inner
    height 30px
    // width 180px
    background: #FFFFFF;  
    border: 1px solid #C2CBD2;
    border-radius: 4px;
    font-size: 12px;
    // color: #C4C8CF !important;
  .el-date-editor--date.el-input
    width 120px  
    margin-right 15px
  .el-input
    width 90px  
    margin-right 15px
.time-opt    
  .el-input
    width 80px  
    margin-right 15px
</style>
