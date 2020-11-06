<template>
  <div>
    <div class="table" v-for="(tbody, index) in table" :key="index">
      <table border="1px solid #ccc" cellspacing="0">
        <colgroup>
          <col v-for="(col, idx) in cols" :key="idx" :width="col" />
        </colgroup>
        <tbody>
          <tr v-for="(tr, trIndex) in tbody" :key="trIndex">
            <td
              :class="td.class"
              :rowspan="td.rowspan"
              :colspan="td.colspan"
              :key="tdIdx"
              :style="td.style"
              v-for="(td, tdIdx) in tr"
            >
              <RenderItem
                v-for="(item, itemIdx) in td.children"
                :key="itemIdx"
                :item="item"
                :model.sync="model"
              >
              </RenderItem>
            </td>
          </tr>
        </tbody>
      </table>
      <slot name="table"></slot>
      <slot name="bottomCon"></slot>
    </div>
  </div>
</template>

<script>
import RenderItem from "../../sheetTable/components/table-components/RenderItem";
import tableModel from "../data/dataModel";
import sheetInfo from "../../config/sheetInfo";
import moment from "moment";
import getUser from "../../../api/index";
export default {
  data() {
    return {
      cols: tableModel.table.cols,
      table: tableModel.table.tbody1,
      model: {},
      sheetInfo
    };
  },
  props: [],
  components: {
    RenderItem
  },
  computed: {
    isPrint() {
      return window.location.href.indexOf("print") > -1;
    }
  },
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
  // padding: 5px 1px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 15px;
  // margin-bottom: -10px;
}
/deep/ .iswrap {
  height: 0px !important;
}
table {
  border-collapse: collapse;
  width: 100%;
  background: #fff;
  td {
    position: relative;
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
}
</style>


