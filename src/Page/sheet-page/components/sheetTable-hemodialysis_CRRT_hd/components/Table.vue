<template>
  <div>
    <div class="table" v-for="(tbody,index) in table" :key="index">
      <table border="1px solid #ccc" cellspacing="0">
        <colgroup>
          <col v-for="(col,idx) in cols" :key="idx" :width="col" />
        </colgroup>
        <tbody>
          <tr v-for="(tr,trIndex) in tbody" :key="trIndex">
            <td
              :class="td.class"
              :rowspan="td.rowspan"
              :colspan="td.colspan"
              :key="tdIdx"
              :style="td.style"
              v-for="(td,tdIdx) in tr"
            >
              <RenderItem
                v-for="(item,itemIdx) in td.children"
                :key="itemIdx"
                :item="item"
                :model.sync="model"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <slot></slot>
      <!-- <div class="operatorSign" v-if="index==1"></div> -->
      <!-- <div class="table-footer" v-if="index != 0">第 {{index}} 页</div> -->
    </div>
  </div>
</template>

<script>
import RenderItem from "./RenderItem";
import tableModel from "../data/dataModel";
import sheetInfo from "../../config/sheetInfo";
import moment from "moment";
export default {
  data() {
    return {
      cols: tableModel.table.cols,
      table: tableModel.table.tbody,
      model: {}
    };
  },
  props: [],
  components: {
    RenderItem
  },
  computed: {},
  methods: {
    save() {
      console.log(this.model);
    },
    changeDate() {
      window.openSetAuditDateModal(
        date => {
          this.createTime = date;
          sheetInfo.relObj.createTime = date;
          this.$message.success("修改日期成功，保存护记后生效");
        },
        this.createTime,
        "修改日期"
      );
    }
  },
  created() {
    this.model = {};
    this.$nextTick(() => {
      this.model = sheetInfo.relObj;
    });
    window.getRelObj = () => {
      return this.model;
    };
  }
};
</script>

<style lang="scss" scoped>
.table {
  padding: 5px 1px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
table {
  border-collapse: collapse;
  width: 100%;
  background: #fff;
  td {
    // padding-top: 10px;
    // padding-bottom: 10px;
    position: relative;
    // line-height: 20px;
    &.red-border {
      border: 1px solid #000 !important;
      &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 40px;
        border: 2px solid #f00;
        left: 0;
        bottom: 0;
        background-color: transparent;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .renderItem {
        z-index: 1000;
        position: relative;
      }
    }
  }
}
td,
th {
  border: 1px solid #000;
  // line-height: 20px;
  padding: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  span {
    font-size: 13px;
    word-break: break-all;
    vertical-align: middle;
    display: inline-block;
  }
  input {
    vertical-align: middle;
    &[type="checkbox"] {
      vertical-align: middle;
    }
  }
}
.table {
  page-break-after: always;
  /*  &:first-child {
    padding-bottom: 120px;
  } */
  // &:nth-child(2) {
  //   padding-top: 50px;
  // }
}
.operatorSign {
  padding-top: 10px;
  position: relative;
  // .rightTime {
  //   position: absolute;
  //   right: 15px;
  // }
  .timeInput {
    width: 15px;
    border: 0;
    outline: none;
    text-align: center;
    &:first-child {
      width: 30px !important;
    }
  }
}
.table-footer {
  text-align: center;
  padding-top: 5px;
  margin-top: 10px;
}
</style>


