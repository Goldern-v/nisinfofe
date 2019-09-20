
<template>
  <div>
    <TipsBox :obj="obj" :formObj="formObj">
      <div class="title-box">
        <h1 class="hospital-title">{{obj.formTitle.hospitalName}}</h1>
        <span class="form-title">{{obj.formTitle.formName}}</span>
        <div class="header-box" v-if="obj.formHeads && obj.formHeads.length>0">
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


<style lang="stylus" scoped>
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
  font-size: 17px;
}
.el-checkbox,
.is-bordered,
.el-checkbox--medium {
  margin: 5px 0px;
}
.title-box {
  border-bottom: 1px dashed #eee;
  padding: 25px 0px 2px 0px;
  line-height: 1.5em;
}

.hospital-title {
  letter-spacing: 0.5em;
}
.form-title {
  font-size: 21px;
  margin-bottom: 10px;
  text-align: center;
  display: block;
}

.header-box {
  padding: 0px;
  font-size: 13px;
  display: inline-flex;
  width: 100%;
  justify-content: space-around;
  &:hover{
    cursor: pointer;
    background: #eef5f5;
    // outline: 1px dashed green;
  }
}
</style>
