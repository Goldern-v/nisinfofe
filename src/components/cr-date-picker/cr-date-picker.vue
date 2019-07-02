<template>
  <masked-input
    type="text"
    class="mask-input"
    :showMask="false"
    :value="value"
    @input="changeValue"
    :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/]"
    :guide="true"
    placeholderChar="0"
  ></masked-input>
</template>

<script>
import moment from "moment";
export default {
  props: {
    value: String
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    changeValue(value) {
      this.$emit("input", value.replace(/\O/g, 0));
      // this.$emit("input", value);
    }
  },
  created() {
    !this.value && this.$emit("input", moment().format("YYYY-MM-DD HH:mm"));
  },
  components: {}
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
  border-radius: 4px;
  border: 1px solid rgb(191, 217, 210);
  box-sizing: border-box;
  color: rgb(31, 61, 53);
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>
