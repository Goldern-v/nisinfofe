<template>
  <div class="header-con">
    <div class="title">{{ HOSPITAL_NAME }}</div>
    <div class="title">{{ typeName }}</div>
    <div class="header-info">
      <span>
        姓名：
        <div class="bottom-line" style="min-width: 70px">
          {{ query.name }}
        </div>
      </span>
      <span>
        科室：
        <div class="bottom-line" style="min-width: 70px">
          {{ query.deptName }}
        </div>
      </span>
      <span>
        床号：
        <div class="bottom-line" style="min-width: 30px">
          {{ query.bedLabel }}
        </div>
      </span>
      <span>
        住院病历号：
        <div class="bottom-line" style="min-width: 70px">
          {{ query.inpNo }}
        </div>
      </span>
      <span>
        病人ID：
        <div class="bottom-line" style="min-width: 70px; text-align: left">
          {{ query.patientId }}
        </div>
      </span>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.header-con {
  .title {
    font-size: 21px;
    text-align: center;
    font-weight: bold;
    font-family: simsun, "Times New Roman", Georgia, Serif !important;
    padding: 10px 0 10px 10px;
  }

  span {
    margin-right: 4px;
    font-size: 14px;
    color: #000;
  }

  .header-info {
    padding-top: 15px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;

    .bottom-line {
      display: inline-block;
      // border-bottom 1px solid #000
      padding: 2px 0 2px 2px;
      border-bottom: 1px solid #000 !important;
    }

    .bottom-line-input {
      display: inline-block;
      border: 0;
      width: 30px;
      border-bottom: 1px solid #000;
      padding: 2px 0 2px 2px;
      height: 12px;
      position: relative;
      outline: none;
      text-align: center;
    }
  }
}
</style>
<script>
export default {
  props: {
    typeName: {
      type: String,
      default: "长期医嘱记录单",
    },
  },
  data() {
    return {};
  },
  computed: {
    query() {
      return this.$route.query;
    },
  },
  methods: {},
  components: {},
};
</script>
