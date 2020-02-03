<template lang="html" src="./puerperantSituation.html"></template>

<script>
import commonMixin from "./../../common/mixin/common.mixin";
import customPagenation from "./components/pagination";
import editModal from "./components/editModal";
import createModal from "./components/createModal";
import moment from "moment";
import {getList,changeOrSaveForm,deleteForm,getPatEmrList} from './api/api'
import {columns} from './data/columns'
import {eduOptions,filterOptions,cbwOptions,sexOptions,hoOptions,bcnOptions,otherOptions} from './data/options'

export default {
  components: {
    customPagenation,
    editModal,
    createModal
  },
  mixins: [commonMixin],
  data() {
    // 设置起止时间
    let nowDate = new Date();
    let nowtDay = nowDate.getDay();
    let nowTime = nowDate.getTime();
    let reduceDay = 0;
    let addDay = 0;
    if(nowtDay==0){
      reduceDay=6;
      addDay=0;
    }else{
      reduceDay = nowtDay-1;
      addDay = 7-nowtDay;
    }

    let startDate = moment(new Date(nowTime-reduceDay*86400000)).format('YYYY-MM-DD')+' 00:00:00';
    let endDate = moment(new Date(nowTime+addDay*86400000)).format('YYYY-MM-DD')+' 23:59:59';

    return {
      query: {
        startDate: startDate,
        endDate: endDate,
        searchingContent:'',
        selectContent: '',
        pageIndex: 1,
        pageSize: 10
      },
      fileTotal: 0,
      tableHeight: 0,
      tableData: [],
      eduOptions: eduOptions,
      cbwOptions: cbwOptions,
      sexOptions: sexOptions,
      bcnOptions: bcnOptions,
      hoOptions: hoOptions,
      otherOptions: otherOptions,
      filterOptions: filterOptions,
      tableLoading: false,
      editCfg: {
        idx: "",
        title: "",
        value: "",
        name: "",
        type: "",
        options: [],
        visible: false
      },
      createVisible:false,
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: 'tableContext',
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null
        },
        // Menu options (菜单选项)
        menulists: [{
          fnHandler: 'savedata', // Binding events(绑定事件)
          icoName: 'fa fa-home fa-fw', // icon (icon图标 )
          btnName: '选项1' // The name of the menu option (菜单名称)
        }, {
            fnHandler: 'deleteRow',
            icoName: 'fa fa-home fa-fw',
            btnName: '删除行测试'
        }],
        row: null,
        column: null
      },
      columns: columns(this),
    }
    
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this);
    this.handelResize();
    window.addEventListener("resize", this.handelResize);

    this.getTableData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handelResize);
  },
  methods: {
    signUrl(empNo){
      if(!empNo)return ''
      return `/crNursing/api/file/signImage/${empNo}?${this.token}`
    },
    getTableData(){
      this.tableLoading= true;
      let query = {...this.query};

      let startDateType = Object.prototype.toString.call(query.startDate)
      if(startDateType=='[object Date]')
        query.startDate = moment(query.startDate).format('YYYY-MM-DD')+' 00:00:00'
      else if(!query.startDate )
        query.startDate = ''

      let endDateType = Object.prototype.toString.call(query.endDate)
      if(endDateType=='[object Date]')
        query.endDate = moment(query.endDate).format('YYYY-MM-DD')+' 23:59:59'
      else if(!query.endDate )
        query.endDate = ''

      getList(query).then(res=>{
        this.tableLoading= false;
        if(res.data.data){
          let data = res.data.data;

          this.tableData = this.formatList(data.list);
          this.fileTotal = data.totalCount
        }
      },err=>this.tableLoading= false)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex >= 9) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    formatList(list){
      let newList = [];
      //增加产科丈夫信息行
      for(let i=0;i<list.length;i++){
        newList = newList.concat([{...list[i]},{...list[i]}])
      }

      return newList;
    },
    handleCurrentChange(page) {
      this.getTableData();
    },
    handleSizeChange(size) {
      if(this.query.pageSize!==size)this.query.pageSize = size
      this.getTableData();
    },
    handelResize() {
      let tableHeight = document.querySelector(".main-contain .table-contain")
        .offsetHeight;
      this.tableHeight = tableHeight;
    },
    handleDateChange() {
      this.query.pageIndex=1;
      this.getTableData();
    },
    handleSearch(){
      if(this.query.pageIndex==1)
      this.getTableData();
      else
      this.query.pageIndex=1;
    },
    formatDate(date, format) {
      if (!date) return "";

      format = format || "YYYY-MM-DD HH:mm:ss";
      // if (!(date instanceof Date)) date = date.replace(/\//g, "");

      return moment(date).format(format);
    },
    rowClassName(row,idx){
      let rowIdx = idx + 1;
      if (rowIdx % 4 == 0 || rowIdx % 4 == 3) return "ivu-table-row-hover";

      return "";
    },
    saveData(params,success,error){
      changeOrSaveForm(params)
      .then(res=>{
        success&&success(res)
      },err=>{
        error&&error(err)
      })
    },
    deleteRecord(record){
      this.$confirm('是否删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        return deleteForm({
          idList:[record.id]
        })
      },err=>{})
      .then(res=>{
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getTableData();
      },err=>{})
    },
    handleCellClick(record) {
      let row = record.row;
      let column = record.column
      let editName = column.key;
      let title = column.title;
      let editType = "input";
      let options = [];
      let editValue = null;
      let modalVisible = true;
      switch (column.key) {
        case "分娩时间-年":
        case "分娩时间-月":
        case "分娩时间-日":
        case "分娩时间-时":
        case "分娩时间-分":
          title = '分娩时间'
          editName = 'childBirthTime';
          editType = "dateTime";
          if(moment(row[editName]).format('YYYY-MM-DD HH:mm:ss')=='Invalid Date')editValue=''
          break;
        case "natureBrokenMenbraneTime":
        case "artiBrokenMembraneTime":
          if(moment(row[editName]).format('YYYY-MM-DD HH:mm')=='Invalid Date')editValue=''
          editType = "dateTime";
          break;
        default:
          modalVisible = false;
          return
      }

      if(modalVisible){
        if(editValue===null)editValue = (row[editName]||'').toString();

        if(column.key)this.openEditModal({
          idx: record.index,
          name: editName,
          value: editValue,
          type: editType,
          title,
          options
        });
      }else{}

      
    },
    openEditModal(payload) {
      this.editCfg = {
        ...this.editCfg,
        ...payload,
        visible: true
      };
    },
    handleEditOk(payload) {
      let target = this.tableData[this.editCfg.idx];
      let otherIdx = this.editCfg.idx+1
      if(this.editCfg.idx%2!==0)otherIdx = this.editCfg.idx-1
      let otherTarget = this.tableData[otherIdx]

      target[this.editCfg.name] = this.editCfg.value;
      otherTarget[this.editCfg.name] = this.editCfg.value;

      payload.modal.saveLoading=true;

      this.saveData(target,()=>{
        // this.getTableData()
        this.tableData = this.tableData.concat()

        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.editCfg.visible=false;
        payload.modal.saveLoading=false;
      },()=>{
        payload.modal.saveLoading=false;
      })
    },
    handleCreate(){
      this.createVisible = true;
    },
    handleSign(record,name){
      name = name.replace('Name','Id');
      let isCancel = false;

      if(record[name]!='')isCancel = true;

      window.openSignModal((password,empNo,signDate)=>{
        // console.log(password,empNo,signDate)
        let params = {...record}
       
        if(isCancel)
        if(empNo!=params[name]){
          this.$message({
            message: '非本人操作,不能取消签名',
            type: 'error'
          })
          return
        }

        params[name] = isCancel?'':empNo;

        // console.log(params)
        this.saveData(params,()=>{
          this.getTableData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      },isCancel?'取消签名':'接生者签名',false)
    },
    handleCreateOk(){
      this.createVisible = false;
      this.getTableData();
    },
    handleChange(record,key,val,options={}){
      let row = record.row
      let idx = record.index
      row = {...row,...this.tableData[idx]}
      row[key] = val
      let otherIdx;
      if(idx%2==1){
        otherIdx=idx-1;
      }else{
        otherIdx=idx+1;
      }
      //重新计算总产程
      if(options.reSumProductionProcess){
        let newSum = this.productionProcessSumUp(row)

        if(newSum!==row.productionProcessCount){
          row.productionProcessCount=newSum
          options.forceRender=true
        }
      }

      if(val!==this.tableData[otherIdx][key]){
        this.tableData[idx]={...row}
        this.tableData[otherIdx]={...row}
        if(options.forceRender)this.tableData=this.tableData.concat()

        this.saveData(this.tableData[idx],()=>{
          this.$message.success({message:'修改成功'})
        })
      }
    },
    defaultRender(h,record){
      let row = record.row
      let key = record.column.key
      if(record.index%2==0)return h('span',record.row[key])
    },
    defaultEditRender(h,record,_key){
      let row = record.row
      let key = _key||record.column.key
      return h('el-input', {
        props: {
          value: row[key],
          type: 'textarea',
          autosize: {minRows: 1},
          resize: 'none'
        },
        on: {
          blur: (e) => this.handleChange(record, key, e.target.value)
        }
      })
    },
    productEditRender(h,record,_key){
      let row = record.row
      let key = _key||record.column.key
      let idx = record.index
      return h('el-input', {
        props: {
          value: row[key],
          type: 'textarea',
          autosize: {minRows: 1},
          resize: 'none'
        },
        on: {
          blur: (e) => {
            let iptVal = e.target.value
            let newVal = iptVal
            if(/^\d\d\d\d$/.test(iptVal)){
              iptVal = iptVal.split('')
              newVal = `${iptVal[0]}${iptVal[1]}:${iptVal[2]}${iptVal[3]}`
              e.target.value = newVal
            }

            this.handleChange(record, key, newVal,{reSumProductionProcess:true})
          }
        }
      })
    },
    productionProcessSumUp(row){
      let p1 = row.productionProcess1;
      let p2 = row.productionProcess2;
      let p3 = row.productionProcess3;
      let reg = /^\d\d:\d\d$/

      function getMin(str){
        let hour = str.split(':')[0]
        let min = str.split(':')[1]
        return hour*60+Number(min)
      }

      if(reg.test(p1)){
        p1 = getMin(p1)
      }else{
        p1=0
      }

      if(reg.test(p2)){
        p2 = getMin(p2)
      }else{
        p2=0
      }

      if(reg.test(p3)){
        p3 = getMin(p3)
      }else{
        p3=0
      }

      let sum = p1+p2+p3

      let hour = parseInt(sum/60)
      if(hour<10)hour = `0${hour}`
      let min = sum%60
      if(min<10)min = `0${min}`

      return `${hour}:${min}`
    },
    defaultSelectRender(h,record,options,_key){
      let row = record.row
      let key = _key||record.column.key

      return h('el-select', {
        props: {
          value: row[key]||'',
          placeholder: '',
        }
      }, [
        h('el-option', { 
            props: {
              value: '',
              label: ''
            },
            attrs: { dataValue: ''},
            nativeOn:{
              click:(e)=>this.handleChange(record, key, '', true)
            }
          }, 
          ''
        ),
        options.map((item) =>
          h('el-option', {
            props: {
              value: item.code,
              label: item.name
            },
            attrs:{
              dataValue: item.code
            },
            nativeOn:{
              click:(e)=>{
                let val = e.target.getAttribute('dataValue')||e.target.innerHTML
                this.handleChange(record, key, val, true)
              }
            }
          }))
      ])
    },
    defaultModalRender(h,record,_key,_text){
      let row = record.row
      let key = _key||record.column.key
      let text= _text||row[key]
      if(!row[key]){
        return h('div',{
          class: 'temp',
          on:{
            click:()=>this.handleCellClick(record)
          }
        })
      }else{
        return h('span',{
          class: 'temp',
          on:{
            click:()=>this.handleCellClick(record)
          }
        },text)
      }
    },
    handleSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex >= 9) {
        if (rowIndex % 2 == 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
    },
  }
};
</script>

<style lang="scss">
  @import './assets/puerperantSituation.scss';
</style>

<style lang="scss" scoped>
  @import './assets/puerperantSituation.scope.scss';
</style>