
<template>
  <div v-if="obj.type==='formGroupHorizontalBox'" :style="obj.style" :class="obj.class">
    <TipsBox :obj="obj" :formObj="formObj">
      <table width="100%" class="Form-Group-Horizontal-Box">
        <colgroup>
          <col :width="obj.colWidth?obj.colWidth[0]:'25%'">
          <col :width="obj.colWidth?obj.colWidth[1]:'75%'">
        </colgroup>
        <tr>
          <td class="td-box" :class="obj.titleStyle">
            <label for>{{obj.aliasTitle || obj.title}}</label>
          </td>
          <td class="td-box" style="padding: 0px 5px 0 0px;">
            <InputElements v-if="obj.children" :obj="obj.children" :formObj="formObj"/>
          </td>
        </tr>
      </table>
    </TipsBox>
  </div>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

import InputElements from "./InputElements";
import TipsBox from "./TipsBox";

export default {
  name: "FormGroupHorizontalBox",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {
    InputElements,
    TipsBox
  },
  data() {
    return {};
  },
  computed: {
    uui() {
      return uuid.v1();
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    getUUID() {
      let uuid_ = uuid.v1();
      // console.log(uuid_)
      return uuid_;
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox, .is-bordered, .el-checkbox--medium
  margin: 5px 0px;
.Form-Group-Horizontal-Box
  /* margin: 10px 0 10px 0px; */
.Form-Group-Horizontal-Box:hover
  background: #eef5f5

.td-box
  vertical-align: middle;
  padding: 0px 0 0 5px;
  font-weight: bold;
  font-family: sim;
  height: 40px;
.input
  &:hover
    outline 1px solid #4baf8d
</style>
