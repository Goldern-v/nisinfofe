<template>
  <div class="sheet-head-con-neonatology">
    <tableCon :formatData="formatData" tableName="头部表格"></tableCon>
    <div class="sign-con">
      <span @click="setDate">记录时间:</span>
      <span
        class="sign-date"
        @click="setDate"
        v-if="noDate != '1'"
      >{{sheetInfo.selectBlock.createTime | toCn}}</span>
      <span class="sign-date" @click="setDate" v-else></span>
      <span>责任护士签字:</span>
      <span class="sign-img-con" @click="sign">
        <span v-if="!isPrint" class="head-sign-text">{{sheetInfo.selectBlock.signerName || '未签名'}}</span>
        <img
          class="head-sign-img"
          v-if="sheetInfo.selectBlock.signerNo"
          :src="`/crNursing/api/file/signImage/${sheetInfo.selectBlock.signerNo}?${token}`"
          alt
        />
      </span>
    </div>
    <div>二、新生儿观察护理记录</div>
  </div>
</template>

<script>
import tableCon from "./table-con.newborn";
import formatData from "./formatData";
import {
  setBlockCreateTime,
  signBlock,
  cancelSign
} from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import moment from "moment";
import commom from "@/common/mixin/common.mixin";
import bus from "vue-happy-bus";
export default {
  mixins: [commom],
  data() {
    return {
      formatData,
      sheetInfo,
      bus: bus(this),
      noDate: sheetInfo.relObj.noDate
    };
  },
  methods: {
    setDate() {
      window.openSetAuditDateModal(
        date => {
          if (date) {
            setBlockCreateTime(date).then(res => {
              this.$message.success("修改时间成功");
              this.sheetInfo.selectBlock.createTime = res.data.data.createTime;
              sheetInfo.relObj.noDate = "0";
              this.noDate = "0";
            });
          } else {
            sheetInfo.relObj.noDate = "1";
            this.noDate = "1";
            this.$message.success("时间删除成功，需要保存护记后生效");
          }
        },
        this.sheetInfo.selectBlock.createTime,
        "修改记录时间"
      );
    },
    sign() {
      let title = sheetInfo.selectBlock.signerName
        ? "取消签名"
        : "责任护士签名";
      window.openSignModal((password, username) => {
        if (sheetInfo.selectBlock.signerName) {
          cancelSign(password, username).then(res => {
            this.sheetInfo.selectBlock.signerName = res.data.data.signerName;
            this.sheetInfo.selectBlock.signerNo = res.data.data.signerNo;
          });
        } else {
          signBlock(password, username).then(res => {
            this.sheetInfo.selectBlock.signerName = res.data.data.signerName;
            this.sheetInfo.selectBlock.signerNo = res.data.data.signerNo;
          });
        }
        this.bus.$emit("saveSheetPage", true);
      }, title, null,false,'',this.sheetInfo.selectBlock);
    }
  },
  filters: {
    toCn(val) {
      return val ? moment(val).format("YYYY年MM月DD日 HH时mm分") : "";
    }
  },
  components: {
    tableCon
  }
};
</script>

<style lang='scss'>
.sheet-head-con-neonatology {
  .sign-con {
    margin: 10px;
    span {
      display: inline-block;
    }
    .sign-date {
      width: 200px;
      margin-right: 20px;
      cursor: pointer;
      min-height: 12px;
    }
    .sign-img-con {
      width: 100px;
      cursor: pointer;
    }
  }
  .head-sign-text {
    display: inline-block;
  }
  .head-sign-img {
    display: none;
    height: 30px;
    margin-bottom: -10px;
  }
}
</style>
