<template>
  <div>
    <div class="tool-bar" flex="dir:top main:center cross:center">
      <!-- <div class="item-box" @click="toBig">
      <div class="icon" flex="cross:center main:center">
        <i class="iconfont icon-fangda"></i>
      </div>
      <div class="text">放大</div>
    </div>
    <div class="item-box" @click="toSmall">
      <div class="icon" flex="cross:center main:center">
        <i class="iconfont icon-suoxiao" style="font-size: 12px;transform:scale(.5,.5)"></i>
      </div>
      <div class="text">缩小</div>
    </div>
    <div class="item-box" @click="resert">
      <div class="icon" flex="cross:center main:center">
        <i class="iconfont icon-zhongzhi" style="font-size: 20px;"></i>
      </div>
      <div class="text">重置</div>
      </div>-->
      <div class="item-box" @click="goBack" v-if="HOSPITAL_ID!=='xiegang'&&HOSPITAL_ID!=='whfk' && HOSPITAL_ID!=='sdlj'">
        <div
          class="icon"
          style="font-size: 18px;"
          flex="cross:center main:center"
        >返回</div>
      </div>
      <div class="item-box" @click="qoSelect = '0'">
        <div
          class="icon qo-text"
          flex="cross:center main:center"
          :class="{selected: qoSelect == '0'}"
        >全</div>
      </div>
      <div class="item-box" @click="qoSelect = '1'">
        <div
          class="icon qo-text"
          flex="cross:center main:center"
          :class="{selected: qoSelect == '1'}"
        >奇</div>
      </div>
      <div class="item-box" @click="qoSelect = '2'">
        <div
          class="icon qo-text"
          flex="cross:center main:center"
          :class="{selected: qoSelect == '2'}"
        >偶</div>
      </div>
      <div class="item-box" @click="print" :class="{disabled: !canPrint}">
        <div class="icon" flex="cross:center main:center">
          <i class="iconfont icon-dayinji-" style="font-size: 20px"></i>
        </div>
        <div class="text">打印</div>
      </div>
    </div>
    <div class="print-box" flex="main:center">
      <div
        class="print-con"
        :style="{transform: `scale(${scaleNum})`, transformOrigin: 'center top'}"
      >
        <shfitPrint v-if="$route.params.type == 'shift'"></shfitPrint>
        <!-- <shfitPrint1 v-if="$route.params.type == 'shift'"></shfitPrint1> -->
        <!-- <shfitPrint2 v-if="$route.params.type == 'shift'"></shfitPrint2> -->
        <assessmentPrint v-if="$route.params.type == 'assessment'"></assessmentPrint>
        <assessmentPrintV1 v-if="$route.params.type == 'assessmentv1'"></assessmentPrintV1>
        <labelPrint v-if="$route.params.type == 'label'"></labelPrint>
        <executePrint v-if="$route.params.type == 'execute'"></executePrint>
        <spirePrint v-if="$route.params.type == 'spire'"></spirePrint>
        <notice v-if="$route.params.type == 'notice'"></notice>
        <sheetPrintPage v-if="$route.params.type == 'sheetPage'" :qoSelect="qoSelect"></sheetPrintPage>
        <sheetPrintNursingOrder v-if="$route.params.type == 'sheetNursingOrder'"></sheetPrintNursingOrder>
        <sugar v-if="$route.params.type == 'sugar'"></sugar>
        <oxygen v-if="$route.params.type == 'oxygen'"></oxygen>
        <bloodSugar v-if="$route.params.type == 'bloodSugar'"></bloodSugar>
        <health v-if="$route.params.type == 'health'"></health>
        <lcHealth v-if="$route.params.type == 'lcHealth'"></lcHealth>
        <growthPrintPage v-if="$route.params.type == 'growth'"></growthPrintPage>
        <birthCertificatePrint v-if="$route.params.type == 'birthCertificate'"></birthCertificatePrint>
        <diagnosisPrintPage v-if="$route.params.type == 'diagnosis'"  :qoSelect="qoSelect"></diagnosisPrintPage>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.tool-bar {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  background: #F1F1F1;
  box-shadow: -2px 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 0 10px;
  box-sizing: border-box;
  z-index: 100;

  .item-box {
    margin-bottom: 10px;

    &.disabled {
      .icon i, .text {
        color: #ccc;
      }
    }
  }

  .icon {
    background: #FFFFFF;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    box-sizing: border-box;

    &:hover, &.selected {
      border: #ddd 1px solid;
      border-radius: 2px;
    }

    i {
      color: #7C8793;
      font-size: 18px;
    }
  }

  .text {
    font-size: 12px;
    color: #333333;
    text-align: center;
    line-height: 20px;
    margin-top: 4px;
  }

  .qo-text {
    font-size: 18px;
    color: rgba(124, 135, 147, 0.5);

    &.selected {
      color: rgba(124, 135, 147, 1);
    }
  }
}

.print-con {
  background: #fff;
  box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.5);
  overflow: auto;
  margin-bottom: 10px;
}

.print-box {
  // display table
  // min-height 100vh
  // padding-left: 60px
  margin-top: 26px;
  margin-right: 60px;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
@media print {
  .tool-bar {
    display: none !important;
    width: 0 !important;
  }

  body {
    background: #fff !important;
  }

  body #app {
    min-width: 0;
    margin: 0 auto !important;
  }

  .print-con {
    box-shadow: 0 0 0 0 #fff !important;
    margin: 0 auto !important;
    padding: 0 !important;
  }

  .print-box {
    margin: 0px !important;
    padding: 0 !important;
  }
}
</style>
<script>
import shfitPrint from "./component/shife-print";
// import shfitPrint1 from './component/shife-print-1'
// import shfitPrint2 from './component/shife-print-2'
import assessmentPrint from "./component/assessment-print";
import assessmentPrintV1 from "./component/assessment-print-v1";
import labelPrint from "./component/label-print";
import executePrint from "./component/execute-print";
import spirePrint from "./component/spire-print";
import notice from "./component/notice";
import sheetPrintPage from "./component/sheet-print-page";
import sheetPrintNursingOrder from "./component/sheet-print-nursing-order";
import sugar from "./component/sugar-print-page.vue";
import oxygen from "./component/oxygen-print-page.vue";
import bloodSugar from "./component/bloodSugar-print-page.vue"
import health from "./component/health-print-page";
import lcHealth from "./component/lcHealth-print-page";
import growthPrintPage from "./component/growth-print-page.vue";
import birthCertificatePrint from "./component/birth-certificate-print.vue";
import diagnosisPrintPage from "./component/diagnosis-print-page.vue";
import bus from "vue-happy-bus";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      bus: bus(this),
      scaleNum: 1,
      qoSelect: "0",
      canPrint: false
    };
  },
  methods: {

    print() {
      if (!this.canPrint) return;
      if (this.$route.params.type == "assessment") {
        this.bus.$emit("printAssessment");
      } else if (this.$route.params.type == "assessmentv1") {
        this.bus.$emit("printAssessmentv1");
      } else if (this.$route.params.type == "sheet") {
        this.bus.$emit("printSheet");
      } else {
        window.print();
      }
    },
    toBig() {
      this.scaleNum = this.scaleNum * 1.2;
    },
    toSmall() {
      this.scaleNum = this.scaleNum * 0.8;
    },
    resert() {
      this.scaleNum = 1;
    },
    goBack(){
    if(['liaocheng','huadu','foshanrenyi'].includes(this.HOSPITAL_ID)){
      // 不打开窗口打印返回（下拉会没有和表头不能修改）。刷新页面
      location.replace(this.$store.state.sheet.preRouter)
      setTimeout(()=>{
        this.$store.commit('upPreRouter',"")
      },2000)
    }else{
      this.$router.go(-1)
    }
    }
  },
  created() {
    setTimeout(() => {
      this.canPrint = true;
    }, 1000);
    window.document.body.style.background = "#dfdfdf";
    window.onafterprint = (a, b, c) => {
      console.log(a, b, c, 123);
    };
  },
  components: {
    shfitPrint,
    assessmentPrint,
    assessmentPrintV1,
    labelPrint,
    executePrint,
    // shfitPrint1,
    // shfitPrint2,
    spirePrint,
    sheetPrintPage,
    sheetPrintNursingOrder,
    notice,
    sugar,
    oxygen,
    bloodSugar,
    growthPrintPage,
    health,
    lcHealth,
    birthCertificatePrint,
    diagnosisPrintPage
  }
};
</script>
