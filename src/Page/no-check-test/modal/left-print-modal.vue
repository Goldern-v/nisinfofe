
<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="700" title="检查预约打印">
      <div ref="printable">
        <div class="table" v-for="(item,index) in printData" :key="index">
          <div
            class="list-box head"
            flex="cross:stretch"
            style="-webkit-print-color-adjust: exact;"
          >
            <!-- <span class="col-0">
            <el-checkbox v-model="allPrint" @change="checkAll"></el-checkbox>
            </span>-->
            <span class="col-1">床号</span>
            <span class="col-2">姓名</span>
            <span class="col-3">检查时间</span>
            <span class="col-4" flex-box="1">检查项目</span>
          </div>
          <div
            class="list-box"
            flex="cross:stretch"
            v-for="(rows,i) in item.data"
            :key="i"
            :data-print-style="!rows.isPrint && 'display: none;'"
          >
            <!-- <div class="list-box" flex="cross:stretch" v-for="(rows,i) in item.data" :key="i"> -->
            <!-- <span class="col-0">
            <el-checkbox v-model="item.isPrint"></el-checkbox>
            </span>-->
            <span class="col-1">{{rows.bedLabel}}</span>
            <span class="col-2">{{rows.name}}</span>
            <span class="col-3">{{rows.scheduleDate }}</span>
            <span class="col-4" flex-box="1">{{rows.examItem}}</span>
          </div>
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
.table {
  margin-bottom: 20px;
}

.list-box {
  border-bottom: 1px dashed #E3E7EA;
  font-size: 13px;
  color: #333333;
  border-bottom: 1px solid #E3E7EA;

  .col-1, .col-2, .col-3, .col-4 {
    width: 0;
    min-height: 37px;
    box-sizing: border-box;
    padding: 8px 10px;
    line-height: 22px;
    border-left: 1px solid #E3E7EA;
  }

  .col-2 {
    // border-left 1px solid #E3E7EA;
    // border-right 1px solid #E3E7EA;
  }

  .col-1 {
    width: 60px;
  }

  .col-2 {
    width: 80px;
  }

  .col-3 {
    width: 130px;
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
