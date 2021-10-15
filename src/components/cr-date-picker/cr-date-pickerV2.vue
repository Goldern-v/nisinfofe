<template>
  <masked-input
    v-if="type && type=='time'"
    :style="maskedStyles?[maskedStyles]:{width:width + 'px' }"
    type="text"
    class="mask-input"
    :showMask="false"
    :value="value"
    @input="changeValue"
    @focus="getFocus"
    :mask="() =>[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]"
    :guide="true"
    placeholderChar="0"
  ></masked-input>
  <masked-input
    v-else-if="type && type=='gtime'"
    :style="maskedStyles?[maskedStyles]:{width:width + 'px' }"
    type="text"
    class="mask-input"
    :showMask="false"
    :value="value"
    @input="changeValue"
    @focus="getFocus"
    :mask="() =>[/\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]"
    :guide="true"
    placeholderChar="0"
  ></masked-input>
  <masked-input
    v-else
    :style="maskedStyles?[maskedStyles]:{width: width + 'px' }"
    type="text"
    class="mask-input"
    :showMask="false"
    :value="value"
    @input="changeValue"
    @focus="getFocus"
    :mask="() =>[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]"
    :guide="true"
    placeholderChar="0"
  ></masked-input>
</template>

<script>
import MaskedInput from "@/plugin/vue-text-mask/src/vueTextMask.js";
import moment from "moment";
export default {
  // model: {
  //   prop: "value",
  //   event: "updateValue",
  // },
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      //日期类型 date =>YYYY-MM-DD HH:mm, time=>YYYY-MM-DD
      type: String,
      default: "date",
      validator: (value) => {
        return ["time","gtime", "date"].includes(value);
      },
    },
    maskedStyles: null,//样式对象例如{color:"red"}
    width: {
      type: Number | String,
      default: "122",
    },
  },
  data() {
    return {
      text: "",
      currentValue: "",
      newType: "date",
      typeList: {
        date: {
          format: "YYYY-MM-DD HH:mm",
        },
        time: {
          format: "YYYY-MM-DD",
        },
      },
    };
  },
  watch: {
    value(nVal) {
      if (this.currentValue !== nVal) {
        this.currentValue = nVal;
      }
    },
    type(nval) {
      this.newType = nval;
    },
    diyStyle(value) {
      console.log(value);
    },
  },
  methods: {
    changeValue(value) {
      this.$emit("input", value.replace(/\O/g, 0));
      //this.$emit("input", value);
    },
    //初始化获取焦点
    getFocus(e) {
      if (this.value && this.value != "") return;
      this.$emit("input", moment().format(this.typeList[this.type].format));
    },
  },
  created() {
    //!this.value && this.$emit("input", moment().format("YYYY-MM-DD HH:mm"));
  },
  components: { MaskedInput },
};
</script>

<style lang='scss' scoped>
.mask-input {
  height: 24px;
  background: #fff;
  border: 1px solid #c2cbd2;
  border-radius: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 0px;
  border: 1px solid rgb(191, 217, 210);
  box-sizing: border-box;
  color: rgb(31, 61, 53);
  font-size: inherit;
  /* height: 36px;
  line-height: 1; */
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 150px;
  color: #000000 !important;
}
::v-deep .page input {
  width: auto;
  color: #000000;
}
</style>
