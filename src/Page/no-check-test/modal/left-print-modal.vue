<template>
  <div class="left-print-modal">
    <sweet-modal ref="modal" :modalWidth="700" title="检查预约打印">
      <div class="showTableContent">
        <table v-for="(item,index) in printData" :key="index">
          <thead>
            <tr>
              <th>床号</th>
              <th>姓名</th>
              <th>检查时间</th>
              <th>检查项目</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rows,i) in item.data" :key="i">
              <td>{{rows.bedLabel}}床</td>
              <td>{{rows.nameOrigin || rows.name}}</td>
              <td>{{rows.scheduleDate}}</td>
              <td>{{rows.examItem}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="printable" ref="printable">
        <table v-for="(item,index) in printData" :key="index">
          <thead>
            <tr>
              <th>床号</th>
              <th>姓名</th>
              <th>检查时间</th>
              <th>检查项目</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rows,i) in item.data" :key="i">
              <td>{{rows.bedLabel}}床</td>
              <td>{{rows.nameOrigin || rows.name}}</td>
              <td>{{rows.scheduleDate}}</td>
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
.left-print-modal {
  .showTableContent {
    background-color: #fff;
  }

  >>>.sweet-content-content {
    position: relative;
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
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px 10px;
    line-height: 16px;
    border-right: 1px solid #E3E7EA;
    border-bottom: 1px solid #E3E7EA;
    text-align: center;

    &:nth-of-type(1) {
      width: 60px;
    }

    &:nth-of-type(2) {
      width: 80px;
    }

    &:nth-of-type(3) {
      width: 150px;
    }
  }

  td {
    &:last-of-type {
      text-align: left;
    }
  }
}
</style>

<script>
import commom from "@/common/mixin/common.mixin";
import print from "printing";
import formatter from "./left-print-formatter";
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
      // let printableEle = this.$refs.printable;
      // let sumRows = printableEle.querySelectorAll("tbody tr");
      // console.log(sumRows);
      print(this.$refs.printable, {
        beforePrint: formatter,
        // direction: "horizontal",
        injectGlobalCss: true,
        scanStyles: false,
        css: `
       .printable {
         position: static !important;
         z-index: 1 !important;
       }
       body {
        background: #fff !important;
       }
       .pageBox {
         width: 540px;
         padding: 50px 30px 0;
         position: relative;
         -webkit-box-sizing: border-box;
         box-sizing: border-box;
         margin-bottom: 20px;
         margin-top: 0;
       }
       .endPageBox {
         margin-bottom: 0;
         margin-top: 0;
       }
       .pageNum {
         position: absolute;
         left: 50%;
         bottom: 20px;
         -webkit-transform: translateX(-50%);
         -ms-transform: translateX(-50%);
         -o-transform: translateX(-50%);
         transform: translateX(-50%);
         z-index: 9999;
       }

       @media print{
          * {color: black !important;}
          table,th,td {border-color:black !important;}
        }
        @page {
           margin: 0;
           position: relative;
        }

        `
      });
      // this.close();
      // console.log(this.printData);
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
          this.printData = this.goundBy(arr);
        } else {
          this.printData = this.goundBy(printArr);
        }
        this.open();
      }
    }
  },
  components: {}
};
</script>
