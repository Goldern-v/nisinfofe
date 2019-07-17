
<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="700" title="未做化验打印">
      <div ref="printable">
        <!-- <div class="table" > -->
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
              <!-- <div class="list-box" flex="cross:stretch" v-for="(rows,i) in printData" :key="i"> -->
              <!-- <div class="list-box" flex="cross:stretch" v-for="(rows,i) in item.data" :key="i"> -->
              <!-- <span class="col-0">
            <el-checkbox v-model="item.isPrint"></el-checkbox>
              </span>-->
              <!-- <span class="col-1">{{i+1}}</span>
            <span class="col-2">{{rows.bedLabel}}</span>
            <span class="col-3">{{rows.name}}</span>
            <span class="col-4">{{rows.scheduleDate }}</span>
              <span class="col-5" flex-box="1">{{rows.examItem}}</span>-->
              <td>{{i+1}}</td>
              <td>{{rows.bedLabel}}</td>
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
}

.table {
  margin-bottom: 20px;
}

table {
  border-top: 1px solid #E3E7EA;
  border-left: 1px solid #E3E7EA;
  font-size: 13px;
  color: #333333;

  th, td {
    min-height: 37px;
    box-sizing: border-box;
    padding: 8px 10px;
    line-height: 22px;
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

  .col-2 {
    width: 80px;
  }

  .col-3 {
    width: 130px;
  }

  .col-4 {
    border-right: 1px solid #E3E7EA;
  }

  .col-0 {
    width: 60px;
  }

  .col-1, .col-2 {
    text-align: center;
  }

  &.head {
    font-size: 13px;
    color: #333;
    font-weight: bold;
    border-top: 1px solid #E3E7EA;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<script>
import commom from "@/common/mixin/common.mixin";
import print from "printing";
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
        beforePrint: null,
        // direction: "horizontal",
        injectGlobalCss: true,
        scanStyles: false,
        css: `
       .col-0 {
         display: none !important;
       }
       body {
        background: #fff !important;
       }
       @media print{
          table {width: 700px !important;margin: 30px auto 20px !important;color: black !important;}
          table,th,td {border-color:black !important;}
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
