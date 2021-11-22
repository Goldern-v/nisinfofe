<template>
<masked-input
    type="text"
    class="mask-input"
    :showMask="false"
    :value="value"
    @focus="handlerFocus"
    @input="changeValue"
    :mask="maskedType(type)"
    :guide="true"
    placeholderChar="0"
    >
</masked-input>
</template>
<style lang='scss' scoped>
.mask-input {
  height: 24px;
  background: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  box-sizing: border-box;
  font-size: 12px;
  height: 36px;
  line-height: 1;
  border:none;  
  text-align: center;
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>
<script>
import moment from "moment"
export default {
props: {
    value:String,
    type:String,
},
data() {
return {};
},
methods: {
  maskedType(type){
    let types = {
      YMDHM:[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/,' ',/\d/, /\d/, ':', /\d/, /\d/],
      monthAndDate:[/\d/, /\d/, '-', /\d/, /\d/],
      time:[/\d/, /\d/, ':', /\d/, /\d/]
    }
    return types[type]
  },
  changeValue(value) {
    this.$emit("input", value.replace(/\O/g, 0));
    // this.$emit("input", value);
  },
  handlerFocus(){
    let formats = {
      monthAndDate:"MM-DD",
      time:"HH:mm",
      YMDHM:"YYYY-MM-DD HH:mm"
    }
    !this.value && this.$emit("input", moment().format(formats[this.type]));
  }
},
created() {
    // !this.value && this.$emit("input", moment().format("MM-DD"));
},
components: {}
};
</script>