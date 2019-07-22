
<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="700" title="未做化验打印">
      <div class="printable" ref="printable">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>床号</th>
              <th>姓名</th>
              <th>申请时间</th>
              <th>化验项目</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rows,i) in printData" :key="i">
              <td>{{i+1}}</td>
              <td>{{rows.bedLabel}}床</td>
              <td>{{rows.name}}</td>
              <td>{{rows.scheduleDate }}</td>
              <td>{{rows.examItem}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="onPrint">打印</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='stylus' scoped>
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

    &:nth-of-type(1), &:nth-of-type(2) {
      width: 60px;
      text-align: center;
    }

    &:nth-of-type(3) {
      width: 80px;
      text-align: center;
    }

    &:nth-of-type(4) {
      width: 150px;
    }
  }
}
</style>
<script>
import commom from "@/common/mixin/common.mixin";
import print from "printing";
import formatter from "./right-print-formatter";
export default {
  mixins: [commom],
  props: {
    list: Array
  },
  data() {
    return {
      allPrint: true,
      printData: []
    };
  },
  computed: {
    // printData() {
    //   return this.goundBy(this.list);
    // }
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
        beforePrint: formatter,
        // direction: "horizontal",
        injectGlobalCss: true,
        scanStyles: false,
        css: `
        body {
          background: #fff !important;
        }
        .pageBox {
          width: 750px;
          padding: 40px 25px;
          position: relative;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          margin: 20px auto;
          border: 1px solid red;
        }
        .pageNum {
          position: absolute;
          left: 50%;
          bottom: 0;
          -webkit-transform: translateX(-50%);
          -ms-transform: translateX(-50%);
          -o-transform: translateX(-50%);
          transform: translateX(-50%);
        }

        @media print{
            table {color: black !important;}
            table,th,td {border-color:black !important;}
          }
          @page {
            margin: 0;
            position: relative;
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
  components: {}
};
</script>
