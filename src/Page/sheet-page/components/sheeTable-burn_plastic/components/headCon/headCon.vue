<template>
  <div class="sheet-head-con-neonatology">
    <tableCon :formatData="formatData" tableName="头部表格"></tableCon>
    <div class="sign-con">
      <span>记录时间:</span>
      <span class="sign-date" @click="setDate">{{sheetInfo.selectBlock.createTime | toCn}}</span>
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
      bus: bus(this)
    };
  },
  methods: {
    setDate() {
      window.openSetAuditDateModal(
        date => {
          setBlockCreateTime(date).then(res => {
            this.$message.success("修改时间成功");
            this.sheetInfo.selectBlock.createTime = res.data.data.createTime;
          });
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
      }, title);
    }
  },
  filters: {
    toCn(val) {
      return moment(val).format("YYYY年MM月DD日 HH时mm分");
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
