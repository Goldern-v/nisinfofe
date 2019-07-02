
<template>
  <div class="form-header-box" v-if="obj">
    <div v-for="(group,index) in obj" :key="group.name+index">
      <FormGroupHorizontalBox :obj="group" :formObj="formObj"/>
      <FormGroupColBox :obj="group" :formObj="formObj"/>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import FormGroupHorizontalBox from "./FormGroupHorizontalBox";
import FormGroupColBox from "./FormGroupColBox";

export default {
  name: "FormHeader",
  props: {
    obj: Array,
    formObj: Object
  },
  components: {
    FormGroupHorizontalBox,
    FormGroupColBox
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {}
};
</script>


<style scoped>
div {
  font-family: sim;
}
h1,
h2,
h3,
h4 {
  text-align: center;
  font-family: sim;
}
.el-checkbox,
.is-bordered,
.el-checkbox--medium {
  margin: 5px 0px;
}
.form-header-box {
  /* border-bottom: 1px dashed #eee; */
  padding: 0px 0px 0 0px;
}

.header-box {
  padding: 0px;
  font-size: 13px;
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
