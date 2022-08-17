<template>
  <div class="tableCon">
    <div class="firstTabel">
      <table>
        <!-- <colgroup>
          <col width="10%" style="text-align: center;">
          <col width="10%">
          <col width="10%">
          <col width="10%">
          <col width="40%">
          <col width="20%">
        </colgroup>-->
        <tr>
          <th v-for="(item,index) in firstTableHead" :key="index+item">{{item}}</th>
        </tr>

        <!-- <tr v-for="(item,index) in firstTableBody" :key="index+item.name">
          <td><input type="text" v-model="item.name"></td>
          <td><input type="text" v-model="item.deliveryBefore"></td>
          <td><input type="text" v-model="item.deliveryAfter"></td>
          <td><input type="text" v-model="item.name1"></td>
          <td><input type="text" v-model="item.deliveryBefore1"></td>
          <td><input type="text" v-model="item.deliveryAfter1"></td>
        </tr>-->

        <tr>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name1"
              :data-value="sheetInfo.relObj.name1"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore1"
              :data-value="sheetInfo.relObj.deliveryBefore1"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter1"
              :data-value="sheetInfo.relObj.deliveryAfter1"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name2"
              :data-value="sheetInfo.relObj.name2"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore2"
              :data-value="sheetInfo.relObj.deliveryBefore2"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter2"
              :data-value="sheetInfo.relObj.deliveryAfter2"
            >
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name3"
              :data-value="sheetInfo.relObj.name3"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore3"
              :data-value="sheetInfo.relObj.deliveryBefore3"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter3"
              :data-value="sheetInfo.relObj.deliveryAfter3"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name4"
              :data-value="sheetInfo.relObj.name4"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore4"
              :data-value="sheetInfo.relObj.deliveryBefore4"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter4"
              :data-value="sheetInfo.relObj.deliveryAfter4"
            >
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name5"
              :data-value="sheetInfo.relObj.name5"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore5"
              :data-value="sheetInfo.relObj.deliveryBefore5"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter5"
              :data-value="sheetInfo.relObj.deliveryAfter5"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name6"
              :data-value="sheetInfo.relObj.name6"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore6"
              :data-value="sheetInfo.relObj.deliveryBefore6"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter6"
              :data-value="sheetInfo.relObj.deliveryAfter6"
            >
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name7"
              :data-value="sheetInfo.relObj.name7"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore7"
              :data-value="sheetInfo.relObj.deliveryBefore7"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter7"
              :data-value="sheetInfo.relObj.deliveryAfter7"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name8"
              :data-value="sheetInfo.relObj.name8"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore8"
              :data-value="sheetInfo.relObj.deliveryBefore8"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter8"
              :data-value="sheetInfo.relObj.deliveryAfter8"
            >
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name9"
              :data-value="sheetInfo.relObj.name9"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore9"
              :data-value="sheetInfo.relObj.deliveryBefore9"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter9"
              :data-value="sheetInfo.relObj.deliveryAfter9"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name10"
              :data-value="sheetInfo.relObj.name10"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore10"
              :data-value="sheetInfo.relObj.deliveryBefore10"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter10"
              :data-value="sheetInfo.relObj.deliveryAfter10"
            >
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name11"
              :data-value="sheetInfo.relObj.name11"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore11"
              :data-value="sheetInfo.relObj.deliveryBefore11"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter11"
              :data-value="sheetInfo.relObj.deliveryAfter11"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name12"
              :data-value="sheetInfo.relObj.name12"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore12"
              :data-value="sheetInfo.relObj.deliveryBefore12"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter12"
              :data-value="sheetInfo.relObj.deliveryAfter12"
            >
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name13"
              :data-value="sheetInfo.relObj.name13"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore13"
              :data-value="sheetInfo.relObj.deliveryBefore13"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter13"
              :data-value="sheetInfo.relObj.deliveryAfter13"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name14"
              :data-value="sheetInfo.relObj.name14"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore14"
              :data-value="sheetInfo.relObj.deliveryBefore14"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter14"
              :data-value="sheetInfo.relObj.deliveryAfter14"
            >
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name15"
              :data-value="sheetInfo.relObj.name15"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore15"
              :data-value="sheetInfo.relObj.deliveryBefore15"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfte15"
              :data-value="sheetInfo.relObj.deliveryAfte15"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.name16"
              :data-value="sheetInfo.relObj.name16"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryBefore16"
              :data-value="sheetInfo.relObj.deliveryBefore16"
            >
          </td>
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj.deliveryAfter16"
              :data-value="sheetInfo.relObj.deliveryAfter16"
            >
          </td>
        </tr>
      </table>
    </div>
    <div class="midCon">
      <div class="midConItem">
        核对者：
        <!-- <input type="text" v-model="mid"> -->
        <div class="sign-img-con" @click="sign2">
          <span
            v-if="!isPrint"
            class="head-sign-text"
          >{{sheetInfo.selectBlock.relSignInfo.signerName2}}</span>
          <img
            class="head-sign-img"
            v-if="sheetInfo.selectBlock.relSignInfo.signerNo2"
            :src="`/crNursing/api/file/signImage/${sheetInfo.selectBlock.relSignInfo.signerNo2}?${token}`"
            alt
          >
        </div>

        <div class="sign-img-con" @click="sign3">
          <span
            v-if="!isPrint"
            class="head-sign-text"
          >{{sheetInfo.selectBlock.relSignInfo.signerName3}}</span>
          <img
            class="head-sign-img"
            v-if="sheetInfo.selectBlock.relSignInfo.signerNo3"
            :src="`/crNursing/api/file/signImage/${sheetInfo.selectBlock.relSignInfo.signerNo3}?${token}`"
            alt
          >
        </div>

        <div class="sign-img-con" @click="sign4">
          <span
            v-if="!isPrint"
            class="head-sign-text"
          >{{sheetInfo.selectBlock.relSignInfo.signerName4}}</span>
          <img
            v-if="sheetInfo.selectBlock.relSignInfo.signerNo4"
            class="head-sign-img"
            :src="`/crNursing/api/file/signImage/${sheetInfo.selectBlock.relSignInfo.signerNo4}?${token}`"
            alt
          >
        </div>
      </div>
    </div>
    <div class="secondTableTitle">产后（产房）观察记录单</div>
  </div>
</template>

<script>
import {
  firstTableHead,
  firstTableBody,
  firstTableBody1
} from "./countData.js";
import sheetInfo from "../../../config/sheetInfo";
import {
  setBlockCreateTime,
  signBlock,
  signBlockD,
  cancelSign,
  cancelSignD
} from "../../../../api/index";
import commom from "@/common/mixin/common.mixin";
import bus from "vue-happy-bus";
export default {
  mixins: [commom],
  data() {
    return {
      sheetInfo,
      firstTableHead,
      firstTableBody,
      firstTableBody1,
      mid: ["", ""],
      bus: bus(this),
      relObj: {...sheetInfo.relObj}
    };
  },
  methods: {
    // sign() {
    //   if(this.sheetInfo.selectBlock.relSignInfo == undefined) {
    //     this.sheetInfo.selectBlock.relSignInfo = {}
    //   }
    //   let title = this.sheetInfo.selectBlock.relSignInfo.signerName2
    //     ? "取消签名"
    //     : "责任护士签名";
    //   window.openSignModal((password, username) => {
    //     if (this.sheetInfo.selectBlock.relSignInfo.signerName2) {
    //       cancelSignD(password, username,2).then(res => {
    //         // this.sheetInfo.selectBlock.signerName = res.data.data.signerName;
    //         // this.sheetInfo.selectBlock.signerNo = res.data.data.signerNo;

    //         this.sheetInfo.selectBlock.relSignInfo.signerName2 = res.data.data.relSignInfo.signerName2;
    //         this.sheetInfo.selectBlock.relSignInfo.signerName2 = res.data.data.relSignInfo.signerNo2;
    //       });
    //     } else {
    //       signBlockD(password, username,2).then(res => {
    //         // this.sheetInfo.selectBlock.signerName = res.data.data.signerName;
    //         // this.sheetInfo.selectBlock.signerNo = res.data.data.signerNo;
    //          this.sheetInfo.selectBlock.relSignInfo.signerName2 = res.data.data.relSignInfo.signerName2;
    //         this.sheetInfo.selectBlock.relSignInfo.signerNo2 = res.data.data.relSignInfo.signerNo2;
    //       });
    //     }
    //   }, title);
    // },
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
    },
    sign4() {
      if (this.sheetInfo.selectBlock.relSignInfo == undefined) {
        this.sheetInfo.selectBlock.relSignInfo = {};
      }
      let title = sheetInfo.selectBlock.relSignInfo.signerName4
        ? "取消签名"
        : "责任护士签名";
      window.openSignModal((password, username) => {
        if (sheetInfo.selectBlock.relSignInfo.signerName4) {
          cancelSignD(password, username, 4).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName4",
              res.data.data.relSignInfo.signerName4
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo4",
              res.data.data.relSignInfo.signerNo4
            );
          });
        } else {
          signBlockD(password, username, 4).then(res => {
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerName4",
              res.data.data.relSignInfo.signerName4
            );
            this.$set(
              this.sheetInfo.selectBlock.relSignInfo,
              "signerNo4",
              res.data.data.relSignInfo.signerNo4
            );
          });
        }
        this.bus.$emit("saveSheetPage", true);
      }, title);
    }
  },
  mounted() {
        if (sheetInfo.selectBlock.relSignInfo == undefined) {
      this.$set(this.sheetInfo.selectBlock, "relSignInfo", {});
    }
      if (Object.keys(this.sheetInfo.relObj).length==0) {
          this.sheetInfo.relObj = {...this.firstTableBody1}
      }
  },
  computed: {
    isPrint() {
      return window.location.href.indexOf("print") > -1;
    }
  },
  watch: {

  },
  coponents: {}
};
</script>

<style lang='scss'>
.tableCon {
  width: 800px;
  font-family: simsun, "Times New Roman", Georgia, Serif;
  font-size: 12px;
  .firstTabel {
    table {
      border-collapse: collapse;
      text-align: center;
    }
    th {
      border: 1px solid #444;
      font-weight: bold;
      // font-size: 12px;
      height: 30px;
      line-height: 30px;
    }
    td {
      border: 1px solid #444;
      height: 30px;
      line-height: 30px;
      input {
        border: none;
        outline: none;
        background: transparent;
        width: 100%;
        text-align: center;
        font-size: 12px;
      }
    }
    td:nth-of-type(1) {
      width: 10%;
      // background-color: red
    }
    td:nth-of-type(2) {
      width: 10%;
    }
    td:nth-of-type(3) {
      width: 10%;
    }
    td:nth-of-type(4) {
      width: 10%;
    }
    td:nth-of-type(5) {
      width: 40%;
    }
    td:nth-of-type(6) {
      width: 20%;
    }
    tr:nth-of-type(2n + 1) {
      background-color: #f4f2f5;
    }
  }
  .midCon {
    height: 40px;
    line-height: 40px;
    padding: 12px 0px 20px 0px;
    position: relative;
    .midConItem {
      position: absolute;
      width: 400px;
      right: 0;
      height: 30px;
      line-height: 30px;
      vertical-align: middle;
      // float:right;
      text-align: center;
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

      // input{
      //   border: none;
      //   border-bottom: 1px solid #444;
      //   outline: none;
      //   width:50px;
      //   font-size: 12px;
      //   margin-right:14px;
      // }
    }
  }
  .secondTableTitle {
    margin-bottom: -10px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
