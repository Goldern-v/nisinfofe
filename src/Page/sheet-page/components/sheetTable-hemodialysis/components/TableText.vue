<template>
  <span :class="item.class||''" :style="item.style">
    <span v-html="item.value" @click="openSignModal" :style="item.style" class="printSign" :class="{'isNoSign': item.sign && isNoSign}"></span>
    <div class="sign-img">
      <img :src="`/crNursing/api/file/signImage/${signerNo}?${token}`" alt v-if="signerNo" />
      <span v-if="signerNo">/</span>
      <img :src="`/crNursing/api/file/signImage/${auditorNo}?${token}`" alt v-if="auditorNo" />
    </div>
  </span>
</template>

<script>
import bus from "vue-happy-bus";
import sheetInfo from "../../config/sheetInfo/index.js";
import { getUser } from "../api";
import common from "@/common/mixin/common.mixin.js";
export default {
  data() {
    return {
      sheetInfo,
      bus: bus(this),
      auditorNo: "",
      signerNo: "",
      isNoSign: false
    };
  },
  mixins: [common],
  props: ["item", "model"],
  computed: {
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    }
  },
  mounted() {
    //  住院号/ID号
    if (this.patientInfo.inpNo && this.item.name == "inpNo") {
      this.item.value = this.patientInfo.inpNo;
    }
  },
  components: {},
  methods: {
    openSignModal() {
      if (this.item.sign) {
        window.openSignModal((password, empNo) => {
          getUser(password, empNo).then(res => {
            this.model[this.item.otherKey] = res.data.data.empNo;
            this.model[this.item.name] = res.data.data.empName;
            this.item.value = res.data.data.empName;

            if (this.item.otherKey == "signerNo") {
              this.signerNo = this.model[this.item.otherKey];
            } else {
              this.auditorNo = this.model[this.item.otherKey];
            }

            this.isNoSign = false;
            
            this.bus.$emit("saveSheetPage");
            this.$notify.success({
              title: "提示",
              message: "签名成功"
            });
          });
        });
      }
    }
  },
  watch: {
    model() {
      if (this.item.sign) {
        if (this.item.otherKey == "signerNo") {
          this.signerNo = this.model[this.item.otherKey] || "";
        }
        if (this.item.otherKey == "auditorNo") {
          this.auditorNo = this.model[this.item.otherKey] || "";
        }
        this.item.value = this.model[this.item.name] || "";

        this.isNoSign = this.model[this.item.otherKey] ? false: true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  padding: 5px 0;
  &::before,
  &::after {
    position: absolute;
    content: "";
    width: 150%;
    height: 1px;
    background-color: #000;
    left: -10px;
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }
}
.inpNo {
  width: 80px;
  border-bottom: 1px solid #000;
  text-align: center;
}
.sign-img {
  display: none;
}
.auditorName .sign-img{
  padding-right: 8px;
}
</style>
<style lang="stylus">
#sheetPagePrint .printSign, #sheetPagePrint .auditorName .prev {
  display: none !important;
}
</style>


