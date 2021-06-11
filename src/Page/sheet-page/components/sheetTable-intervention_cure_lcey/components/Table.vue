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
              />
              <el-date-picker
                v-if="trIndex === tbody.length - 1"
                size="small"
                style="display:inline-block;border:0px;margin:2px"
                v-model="sheetInfo.relObj.jrzlsj"
                :data-value="sheetInfo.relObj.jrzlsj"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                class="editOrPirnt"
                placeholder="选择日期时间"
                @change="
                  formatChange(
                    'YYYY-MM-DD HH:mm:ss',
                    sheetInfo.relObj.jrzlsj,
                    'jrzlsj'
                  )
                "
              ></el-date-picker>
            </td>
          </tr>
        </tbody>
      </table>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import RenderItem from "../../sheetTable/components/table-components/RenderItem";
import tableModel from "../data/dataModel";
import sheetInfo from "../../config/sheetInfo";
import moment from "moment";
export default {
  data() {
    return {
      cols: tableModel.table.cols,
      table: tableModel.table.tbody,
      model: {},
      sheetInfo
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
    formatChange(formatType, value, key) {
      this.sheetInfo.relObj[key] = moment(value).format(formatType);
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
  tr {
    border-bottom: 1px solid #000;
  }
  tr:last-child {
    border-bottom: none;
  }
  td {
    /* padding-top: 10px;
    padding-bottom: 10px; */
    position: relative;
    line-height: 20px;

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
  // border: 1px solid #000;
  line-height: 20px;
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
.table-footer {
  text-align: center;
  padding-top: 5px;
  margin-top: 10px;
  // border-top: 1px solid #000;
}
</style>
