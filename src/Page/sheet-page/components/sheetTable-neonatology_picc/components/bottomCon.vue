<template>
  <div>
    <slot name="table"></slot>
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
                <div
                  slot="sign"
                  class="sign-img-con"
                  @click="sign2"
                  v-if="item.class == 'sign1'"
                >
                  <span v-if="!isPrint" class="head-sign-text">{{
                    sheetInfo.selectBlock.relSignInfo.signerName2
                  }}</span>
                  <img
                    class="head-sign-img"
                    v-if="sheetInfo.selectBlock.relSignInfo.signerNo2"
                    :src="
                      `/crNursing/api/file/signImage/${sheetInfo.selectBlock.relSignInfo.signerNo2}?${token}`
                    "
                    alt
                  />
                </div>

                <div
                  slot="sign"
                  class="sign-img-con"
                  @click="sign3"
                  v-if="item.class == 'sign2'"
                >
                  <span v-if="!isPrint" class="head-sign-text">{{
                    sheetInfo.selectBlock.relSignInfo.signerName3
                  }}</span>
                  <img
                    class="head-sign-img"
                    v-if="sheetInfo.selectBlock.relSignInfo.signerNo3"
                    :src="
                      `/crNursing/api/file/signImage/${sheetInfo.selectBlock.relSignInfo.signerNo3}?${token}`
                    "
                    alt
                  />
                </div>
              </RenderItem>
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
import {
  setBlockCreateTime,
  signBlock,
  signBlockD,
  cancelSign,
  cancelSignD
} from "../../../api/index";
import bus from "vue-happy-bus";
import { getUser } from "../api/index";
import common from "@/common/mixin/common.mixin.js";
export default {
  data() {
    return {
      cols: tableModel.table.cols,
      table: tableModel.table.tbody2,
      model: {},
      bus: bus(this),
      sheetInfo
    };
  },
  props: [],
  components: {
    RenderItem
  },
  mixins: [common],
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
    },
    sign2() {
      if (this.sheetInfo.selectBlock.relSignInfo == undefined) {
        this.sheetInfo.selectBlock.relSignInfo = {};
      }
      let title = sheetInfo.selectBlock.relSignInfo.signerName2
        ? "取消签名"
        : "责任护士签名";
      window.openSignModal((password, username) => {
        if (sheetInfo.selectBlock.relSignInfo.signerName2) {
          cancelSignD(password, username, 2).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName2",
              res.data.data.relSignInfo.signerName2
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo2",
              res.data.data.relSignInfo.signerNo2
            );
          });
        } else {
          signBlockD(password, username, 2).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName2",
              res.data.data.relSignInfo.signerName2
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo2",
              res.data.data.relSignInfo.signerNo2
            );
          });
        }
        this.bus.$emit("saveSheetPage", true);
      }, title);
    },
    sign3() {
      if (this.sheetInfo.selectBlock.relSignInfo == undefined) {
        this.sheetInfo.selectBlock.relSignInfo = {};
      }
      let title = sheetInfo.selectBlock.relSignInfo.signerName3
        ? "取消签名"
        : "责任护士签名";
      window.openSignModal((password, username) => {
        if (sheetInfo.selectBlock.relSignInfo.signerName3) {
          cancelSignD(password, username, 3).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName3",
              res.data.data.relSignInfo.signerName3
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo3",
              res.data.data.relSignInfo.signerNo3
            );
          });
        } else {
          signBlockD(password, username, 3).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName3",
              res.data.data.relSignInfo.signerName3
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo3",
              res.data.data.relSignInfo.signerNo3
            );
          });
        }
      }, title);
      this.bus.$emit("saveSheetPage", true);
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
    if (sheetInfo.selectBlock.relSignInfo == undefined) {
      this.$set(this.sheetInfo.selectBlock, "relSignInfo", {});
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  // padding-bottom: 5px;
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
.table-footer {
  text-align: center;
  padding-top: 5px;
  margin-top: 10px;
}
.sign-img-con {
  display: inline-block;
  width: 100px;
  height: 30px;
  font-size: 12px;
  margin-right: 14px;
  cursor: pointer;
  border-bottom: 1px solid #444;
  .head-sign-text {
    width: 100px;
    height: 28px;
    line-height: 28px;
  }
  .head-sign-img {
    transform: translate(-1px, 10px);
    margin-top: -10px;
    display: none;
    height: 28px;
    line-height: 28px;
  }
}
</style>


