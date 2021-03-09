<template>
  <div class="bottomInput">
    <div class="dayCon">
      <span
        >白班入量=饮入/注入<input v-model="sheetInfo.relObj.bbrl_yrzr" />
        ml+液体<input v-model="sheetInfo.relObj.bbrl_yt" /> ml+泵入量<input
          v-model="sheetInfo.relObj.bbrl_brl"
        />
        ml= <input v-model="sheetInfo.relObj.bbrl_zl" /> ml
      </span>
      <span
        >白班出量=尿量
        <input v-model="sheetInfo.relObj.bbcl_nl" /> ml+大便量<input
          v-model="sheetInfo.relObj.bbcl_dbl"
        />
        ml+汗液 <input v-model="sheetInfo.relObj.bbcl_hy" /> ml+胸液量
        <input v-model="sheetInfo.relObj.bbcl_xyl" /> ml+胃液
        <input v-model="sheetInfo.relObj.bbcl_wy" /> ml=
        <input v-model="sheetInfo.relObj.bbcl_zl" /> ml</span
      >
    </div>
    <div class="nightCon">
      <span
        >夜班入量=饮入/注入<input v-model="sheetInfo.relObj.ybrl_yrzr" />
        ml+液体<input v-model="sheetInfo.relObj.ybrl_yt" /> ml+泵入量<input
          v-model="sheetInfo.relObj.ybrl_brl"
        />
        ml= <input v-model="sheetInfo.relObj.ybrl_zl" /> ml
      </span>
      <span
        >夜班出量=尿量
        <input v-model="sheetInfo.relObj.ybcl_nl" /> ml+大便量<input
          v-model="sheetInfo.relObj.ybcl_dbl"
        />
        ml+汗液 <input v-model="sheetInfo.relObj.ybcl_hy" /> ml+胸液量
        <input v-model="sheetInfo.relObj.ybcl_xyl" /> ml+胃液
        <input v-model="sheetInfo.relObj.ybcl_wy" /> ml=
        <input v-model="sheetInfo.relObj.ybcl_zl" /> ml</span
      >
    </div>
    <div class="AllCon">
      <span
        >24h总入量=饮入/注入<input v-model="sheetInfo.relObj.allrl_yrzr" />
        ml+液体<input v-model="sheetInfo.relObj.allrl_yt" /> ml+泵入量<input
          v-model="sheetInfo.relObj.allrl_brl"
        />
        ml= <input v-model="sheetInfo.relObj.allrl_zl" /> ml
      </span>
      <span
        >24h总出量=尿量
        <input v-model="sheetInfo.relObj.allcl_nl" /> ml+大便量<input
          v-model="sheetInfo.relObj.allcl_dbl"
        />
        ml+汗液 <input v-model="sheetInfo.relObj.allcl_hy" /> ml+胸液量
        <input v-model="sheetInfo.relObj.allcl_xyl" /> ml+胃液
        <input v-model="sheetInfo.relObj.allcl_wy" /> ml=
        <input v-model="sheetInfo.relObj.allcl_zl" /> ml</span
      >
    </div>
    <div class="sign">
      <span
        >白班签名：
        <span class="sh-name-box">
          <div
            class="sign-null-box"
            @click="openAduitModal"
            v-if="!auditorNo"
          ></div>
          <div class="sign-in-box" v-else @click="cancelAduitModal">
            <div class="audit-text no-print">{{ auditorName }}</div>
            <div class="audit-img sign-img">
              <img
                class="in-print"
                :src="`/crNursing/api/file/signImage/${auditorNo}?${token}`"
                alt
              />
            </div>
          </div>
          <!-- <div
            class="sign-null-box"
            @click="openSignModal"
            v-if="!foreShiftNo"
          ></div>
          <div class="sign-in-box" v-else @click="cancelSignModal">
            <div class="audit-text no-print">{{ foreShiftName }}</div>
            <div class="audit-img sign-img">
              <img
                class="in-print"
                :src="`/crNursing/api/file/signImage/${foreShiftNo}?${token}`"
                alt
              />
            </div>
          </div> -->
        </span></span
      >
      <!-- <span>夜班签名：</span> -->
    </div>
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index";
import { getUser } from "@/api/common.js";
export default {
  props: {
    index: Number
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo
    };
  },
  computed: {
    // foreShiftName() {
    //   return (
    //     sheetInfo.auditorMap &&
    //     sheetInfo.auditorMap[`PageIndex_${this.index}_foreShiftName`]
    //   );
    // },
    // foreShiftNo() {
    //   return (
    //     sheetInfo.auditorMap &&
    //     sheetInfo.auditorMap[`PageIndex_${this.index}_foreShiftNo`]
    //   );
    // }
    auditorNo() {
      return (
        sheetInfo.auditorMap &&
        sheetInfo.auditorMap[`PageIndex_${this.index}_auditorNo`]
      );
    },
    auditorName() {
      return (
        sheetInfo.auditorMap &&
        sheetInfo.auditorMap[`PageIndex_${this.index}_auditorName`]
      );
    }
  },
  methods: {
    /** 审核整页 */
    // openSignModal() {
    //   window.openSignModal((password, empNo) => {
    //     getUser(password, empNo).then(res => {
    //       let { empNo, empName } = res.data.data;
    //       sheetInfo.auditorMap[`PageIndex_${this.index}_foreShiftNo`] = empNo;
    //       sheetInfo.auditorMap[
    //         `PageIndex_${this.index}_foreShiftName`
    //       ] = empName;
    //       sheetInfo.auditorMap = { ...sheetInfo.auditorMap };
    //       console.log("empNo", empNo);
    //       console.log("empName", empName);
    //       console.log({ ...sheetInfo.auditorMap });
    //       this.$notify.success({
    //         title: "提示",
    //         message: "审核成功",
    //         duration: 2000
    //       });
    //       this.bus.$emit("saveSheetPage", false);
    //       setTimeout(console.log({ ...sheetInfo.auditorMap }), 3000);
    //     });
    //   }, "审核签名确认");
    // },
    // /** 取消审核整页 */
    // cancelSignModal() {
    //   window.openSignModal((password, empNo) => {
    //     getUser(password, empNo).then(res => {
    //       let { empNo, empName } = res.data.data;
    //       if (this.foreShiftNo === empNo) {
    //         sheetInfo.auditorMap[`PageIndex_${this.index}_foreShiftNo`] = "";
    //         sheetInfo.auditorMap[`PageIndex_${this.index}_foreShiftName`] = "";
    //         sheetInfo.auditorMap = { ...sheetInfo.auditorMap };
    //         this.$notify.success({
    //           title: "提示",
    //           message: "取消审核成功",
    //           duration: 2000
    //         });
    //         this.bus.$emit("saveSheetPage", false);
    //       } else {
    //         this.$message.warning("非审核本人不可取消");
    //       }
    //     });
    //   }, "取消签名确认");
    // }
    /** 审核整页 */
    openAduitModal() {
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          let { empNo, empName } = res.data.data;
          sheetInfo.auditorMap[`PageIndex_${this.index}_auditorNo`] = empNo;
          sheetInfo.auditorMap[`PageIndex_${this.index}_auditorName`] = empName;
          sheetInfo.auditorMap = { ...sheetInfo.auditorMap };
          this.$notify.success({
            title: "提示",
            message: "审核成功",
            duration: 2000
          });
          this.bus.$emit("saveSheetPage", false);
        });
      }, "审核签名确认");
    },
    /** 取消审核整页 */
    cancelAduitModal() {
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          let { empNo, empName } = res.data.data;
          if (this.auditorNo == empNo || this.HOSPITAL_ID === "huadu") {
            sheetInfo.auditorMap[`PageIndex_${this.index}_auditorNo`] = "";
            sheetInfo.auditorMap[`PageIndex_${this.index}_auditorName`] = "";
            sheetInfo.auditorMap = { ...sheetInfo.auditorMap };
            this.$notify.success({
              title: "提示",
              message: "取消审核成功",
              duration: 2000
            });
            this.bus.$emit("saveSheetPage", false);
          } else {
            this.$message.warning("非审核本人不可取消");
          }
        });
      }, "取消签名确认");
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
    >span{
      >input{
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
  }
}
</style>
