
<template>
  <div>
    <TipsBox :obj="obj" :formObj="formObj">
      <div class="title-box">
        <h1>{{obj.formTitle.hospitalName}}</h1>
        <h1>{{obj.formTitle.formName}}</h1>
        <div class="header-box">
          <span v-for="(item, index) in obj.formHeads " :key="index">{{item.title}}:{{item.value}}</span>
        </div>
      </div>
    </TipsBox>
  </div>
</template>

<script>
import vue from "vue";
import TipsBox from "./TipsBox";

export default {
  name: "FormTitle",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {
    TipsBox
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
h1 {
  font-size: 18px;
}
.el-checkbox,
.is-bordered,
.el-checkbox--medium {
  margin: 5px 0px;
}
.title-box {
  border-bottom: 1px dashed #eee;
  padding: 15px 0px 2px 0px;
  line-height: 2em;
}

.header-box {
  padding: 0px;
  font-size: 13px;
  display: inline-flex;
  width: 100%;
  justify-content: space-around;
}
</style>
