
<template>
  <div>
    <TipsBox :obj="obj" :formObj="formObj">
      <div class="title-box">
        <h1 class="hospital-title">{{hospitalName}}</h1>
        <span v-if="['lyxrm', 'stmz', 'lyyz'].includes(HOSPITAL_ID)" class="form-title">入 院 评 估</span>
        <span v-else class="form-title">{{formName}}</span>
        <div class="header-box">
          <span
            v-for="(item, index) in formHeads "
            :key="index"
          >{{item.title}}:{{item.value}}{{item.postText?`(${item.postText})`:''}}</span>
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
  computed: {
    hospitalName() {
      return this.obj.formTitle.hospitalName;
    },
    formName() {
      return this.obj.formTitle.formName;
    },
    ageLevel() {
      return this.$store.getters.getAgeLevel();
    },
    formHeads() {
      let patient = this.$store.getters.getCurrentPatient();
      let ret = [
        {
          name: "name",
          value: "",
          title: "姓名"
        },
        {
          name: "sex",
          value: "",
          title: "性别"
        },
        {
          name: "age",
          value: "",
          title: "年龄",
          postText: this.ageLevel
        },
        {
          name: "wardName",
          value: "",
          title: "病区"
        },
        {
          name: "bedLabel",
          value: "",
          title: "床号"
        },
        {
          name: "inpNo",
          value: "",
          title: "住院号"
        },
        {
          name: "admissionDate",
          value: "",
          title: "入院日期"
        }
      ];
      ret.map(r => {
        try {
          r.value = patient[r.name];
        } catch (error) {}
      });
      return ret;
    }
  },
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
  margin: 15px 60px 2px 0px;
  line-height: 2em;
  width: 100%;
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
}
</style>
