
<template>
  <div class="left1-print-modal">
    <sweet-modal ref="modal" :modalWidth="700" :title="title">
      <div class="showTableContent">
        <table class='page'>
          <!-- <thead>
            <tr>
              <th>序号</th>
              <th>床号</th>
              <th>姓名</th>
              <th>申请时间</th>
              <th>化验项目</th>
            </tr>
          </thead> -->
          <tbody>
            <tr v-for="(rows,i) in printData" :key="i">
              <td style='width: 30px'>{{i+1}}</td>
              <td>{{rows.name}}</td>
              <td>{{rows.configureValue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="printable" ref="printable" >
        <div v-for="(item, index) in dataArr" :key="index" class="form-page">
          <pageTitle :config="config" :infoDate="saveParams" show-border/>
          <table class='page'>
            <thead>
            </thead>
            <tbody>
              <tr v-for="(rows,i) in item" :key="i">
                <td style='width: 30%'>{{rows.name}}</td>
                <td>{{rows.configureValue }}</td>
              </tr>
            </tbody>
          </table>
          <div class="page-footer">{{'第'}}{{ index + 1 }}{{'页'}}</div>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="onPrint">打印</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='stylus' scoped>
.left1-print-modal {
  .showTableContent {
    background-color: #fff;
  }

  >>>.sweet-content {
     background-color: #fff;
  }

  >>>.sweet-content-content {
    position: relative;
    background-color: #fff;
    overflow: hidden;
  }

  .printable {
    width: 540px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    padding: 50px 30px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .page{
      padding: 20px 50px;
    }
  }
}

table {
  width: 100%;
  margin-bottom: 20px;
  border-top: 1px solid #E3E7EA;
  border-left: 1px solid #E3E7EA;
  font-size: 13px;
  color: #333333;

  th, td {
    min-height: 16px;
    box-sizing: border-box;
    padding: 8px 10px;
    line-height: 16px;
    border-right: 1px solid #E3E7EA;
    border-bottom: 1px solid #E3E7EA;
    text-align: center;

    &:nth-of-type(1), &:nth-of-type(2) {
      width: 60px;
    }

    &:nth-of-type(3) {
      width: 80px;
    }

    &:nth-of-type(4) {
      width: 150px;
    }
  }

  td {
    &:last-of-type {
      text-align: left;
    }
  }
  // .page-footer{
  //   position: absolute;
  //   bottom: 30px;
  //   left: 50%;
  //   transform: translateX(-50%);
  // }
}
</style>
<script>
import commom from "@/common/mixin/common.mixin";
import print from "printing";
import pageTitle from '../components/page-title/index.vue'
import { pageTitleConfig } from '../components/config.js'
import dayjs from 'dayjs'

const A4_hegiht_width_rate = 297 / 210; // 打印区域长宽比
const page_width = 740; // 页面宽度
const page_height = Math.ceil(A4_hegiht_width_rate * page_width); // 页面高度

export default {
  mixins: [commom],
  props: {
    list: Array,
    title: {
      default: '病区动态',
      type: String
    }
  },
  data() {
    return {
      dataArr:[],
      allPrint: true,
      printData: [],
      config: pageTitleConfig,
      saveParams: {
        deptCodeName: '', // 科室名称
        name: localStorage.getItem('rememberAccount') || '', // 打印人
        date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
    };
  },
  computed: {
    // printData() {
    //   return this.goundBy(this.list);
    // }
  },
  mounted() {
    this.saveParams.deptCodeName = this.deptName
    // console.log(page_height, 99)
  },
  methods: {
    open() {
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      this.close();
    },
    checkAll(check) {
      this.list.forEach(item => {
        item.isPrint = this.allPrint;
      });
    },
    onPrint() {
      print(this.$refs.printable, {
        // beforePrint: formatter,
        // direction: "horizontal",
        injectGlobalCss: true,
        scanStyles: false,
        css: `
       @media print{
          * {color: black !important;}
          table,th,td {border-color:black !important;}
        }
        @page {
          margin: 0;
          // padding: 30px 50px;
          // position: relative;
        }
        .form-page{
          page-break-after: always;
          padding: 0 50px;
          height: ${page_height}px;
          position: relative;
        }
        .page-footer{
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
        }
        `
      });
    },
    goundBy(arr) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.bedLabel]) {
          dest.push({ data: [ai] });
          map[ai.bedLabel] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j].data;
            if (dj[0].bedLabel == ai.bedLabel) {
              dj.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    getPrintData(arr) {
      if (arr && arr.constructor === Array) {
        let printArr = [];
        arr.map(item => {
          if (item.isPrint) {
            printArr.push(item);
          }
        });
        if (printArr.length == 0) {
          this.printData = arr;
        } else {
          this.printData = printArr;
        }
        this.open();
      }
    }
  },
  watch:{
    printData(val){
      console.log("printData",val);
      if(val.length){
        this.dataArr = []
        let e = []
        val.map((item,index)=>{
          if(index % 29 != 0 && index != val.length-1){
            e.push(item)
          }else if(index!=0 && index != val.length-1){
            this.dataArr.push([...e])
            e = [item]
          }else if(index==0){
            e = [item]
          }else if(index == val.length-1){
            e.push(item)
            this.dataArr.push([...e])
          }
        })
        console.log(this.dataArr);
      }
    }
  },
  components: {
    pageTitle
  }
};
</script>
