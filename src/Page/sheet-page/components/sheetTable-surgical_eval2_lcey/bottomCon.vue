<template>
  <div class="bottomInput">
    <div class="dayCon-wrapper">
      <div
        v-for="(item, index) in dataArray"
        style="display:inline"
        :key="index"
      >
        <br v-if="index % 2 === 0" />
        <span>{{ item.title }} = </span>
        <span
          v-for="(cItem, cIndex) in item.children"
          :key="index + '' + cIndex"
        >
          <span v-if="cIndex !== 0">+</span>
          <span>{{ cItem.title }}</span>
          <input
            type="number"
            class="bottom-line"
            v-model="sheetInfo.relObj[cItem.code]"
            :data-value="sheetInfo.relObj[cItem.code]"
            @input="computeTotal(item)"
          />
          <span>ml</span>
        </span>
        <span>=</span>
        <input
          type="number"
          class="bottom-line"
          v-model="sheetInfo.relObj[item.code]"
          :data-value="sheetInfo.relObj[item.code]"
        />
        <span>ml</span>
      </div>
    </div>
    <div class="sign" style="line-height:20px;margin-top:10px;">
      <div style="display:inline">
        白班签名：
        <div class="sign-img-con" @click="sign1">
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
      </div>
      <div style="display:inline">
        夜班签名：
        <div class="sign-img-con" @click="sign2">
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
      </div>
    </div>
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index";
import { getUser } from "@/api/common.js";
import { dataArray } from "./data";
import common from "@/common/mixin/common.mixin.js";
import {
  setBlockCreateTime,
  signBlock,
  signBlockD,
  cancelSign,
  cancelSignD
} from "../../api/index";
export default {
  props: {
    index: Number
  },
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      dataArray
    };
  },
  created() {
    if (this.sheetInfo.selectBlock.relSignInfo == undefined) {
      this.$set(this.sheetInfo.selectBlock, "relSignInfo", {});
    }
  },
  computed: {},
  methods: {
    computeTotal(obj) {
      let itemValue = obj.children.reduce((acc, curr) => {
        const value = this.sheetInfo.relObj[curr.code];
        return acc + (isNaN(value) ? 0 : +value);
      }, 0);
      this.sheetInfo.relObj[obj.code] = itemValue;
    },
    sign1() {
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
    sign2() {
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
  mounted() {
    console.log(this.sheetInfo.auditorMap);
  }
};
</script>

<style lang="stylus" scoped>
.bottomInput{
  text-align :left;
  font-size:10px !important;
  >div{
    .bottom-line{
      display: inline-block;
      border: 0;
      width: 40px;
      border-bottom: 1px solid #000;
      padding: 2px 0 2px 0px;
      height: 12px;
      position: relative;
      outline: none;
      text-align: center;
    }
  }
  input[type=number] {
    -moz-appearance:textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
}
.sign-img-con {
  display: inline-block;
  width: 70px;
  height: 30px;
  font-size: 12px;
  margin-right: 14px;
  cursor: pointer;
  border-bottom: 1px solid #444;
  .head-sign-text {
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
.sign-img-con:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>
