<template>
  <div class="ward-report-detail" v-loading="loading">
    <div class="toolbar">
      <div class="toolbar-left">
        <!-- <span>科室：</span>

        <ElSelect size="small" v-model="code" filterable>
          <ElOption
            v-for="d of depts"
            :key="d.code"
            :label="d.name"
            :value="d.code"
          />
        </ElSelect> -->
      </div>
      <div class="toolbar-right">
        <Button @click="onPrint">打印预览</Button>
      </div>
    </div>
    <div class="container">
      <div class="print-area" ref="area">
        <Paper :name="name" :paperData="papers" :twoDayPaper="twoDay" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import print from "printing";

import NullBg from "@/components/null/null-bg.vue";
import common from "@/common/mixin/common.mixin.js";
import Paper from "./components/paper.vue";
import * as apis from "./apis";

export default {
  mixins: [common],
  components: {
    NullBg,
    Paper
  },
  props: {
    dayProp: String,
    dates: Array,
    twoDay: String
  },
  data() {
    return {
      loading: false,
      printing: false,
      date: "",
      digits: null,
      papers: {},
      smallSize: 0,
      largeSize: 0,
      user: JSON.parse(localStorage.user),
      depts: [], //选项卡数据
      code: "",
      name: "",
      dataList: []
    };
  },
  computed: {},
  watch: {
    deptCode(value, oldValue) {
      this.code = this.deptCode;
      // if (oldValue !== value) {
      //   this.loadDepts();
      // }
    },
    code(value, oldValue) {
      if (oldValue !== value) {
        const dept = this.depts.find(d => d.code === value);
        this.name = dept ? dept.name : "";
        this.load();
      }
    },
    "$route.params.date"() {
      this.load();
    }
  },
  mounted() {
    if (this.deptCode) {
      this.code = this.deptCode;
      // this.loadDepts();
    }
  },
  methods: {
    buttonT(e) {
      console.log(this.$route.params.date);
    },
    // async loadDepts() {
    //   const parentCode = this.deptCode;
    //   const res1 = await apis.listDepartment(parentCode);
    //   const {
    //     data: { data: depts }
    //   } = res1;

    //   this.depts = depts.map(item => ({
    //     code: item.deptCode,
    //     name: item.deptName
    //   }));
    //   if (!depts[0]) {
    //     depts[0] = {};
    //   }
    //   this.code = this.depts[0] && this.depts[0].code;
    // },
    async load(refresh) {
      const date = this.$route.params.date;

      if (!date)
        return this.$router.push(
          "/nursingGradeStatistics/" + moment().format("YYYY-MM-DD")
        );
      //下面跳接口
      if (!this.code) return;
      // this.code = '031202'
      //到上面
      this.loading = true;

      const res2 = await apis.listWardReport(this.code, date);
      let {
        data: {
          data: {
            num: digits,
            newPatsAndTranIn: inList,
            outPatsAndTranOut: outList
          }
        }
      } = res2;
      //日期只有一天有数据，先写死，之后接口数据好了，在改回来
      let startDate = date + " 00:00:00"; //接口开始

      let endData =
        moment(date)
          .add(0, "d")
          .format("YYYY-MM-DD") + " 23:59:59";
      // let startDate = '2019-01-01 00:00:00'
      // let endData = '2019-01-02 23:59:59'
      // let obj = {
      //   wardCode: "051202",
      //   beginDate: "2021-05-19 00:00:00",
      //   endDate: "2020-03-13 23:59:59"
      // };
      let obj = {
        wardCode: this.code,
        beginDate: startDate,
        endDate: endData
      };
      const resData = await apis.nursingClassStatistics(obj);
      this.papers = resData.data.data;
      console.log(resData);
      this.loading = false;
    },
    async onPrint() {
      this.printing = true;

      await this.$nextTick();

      const area = this.$refs.area;
      const els = Array.from(area.querySelectorAll(".paper"));

      await print(els, {
        direction: "horizontal",
        injectGlobalCss: true,
        scanStyles: false,
        css: `
            @page {
              margin: 5mm 10mm;
            }
            table { page-break-inside:auto }
            tr,td { page-break-inside:avoid; page-break-after:auto }
            .paper { box-shadow: none !important; }
          `
      });

      this.printing = false;
    }
  }
};
</script>

<style lang="stylus">
.ward-report-detail {
  display: flex;
  flex-direction: column;
  height: 100%;

  .toolbar {
    display: flex;
    align-items: center;
    height: 41px;
    padding: 0 18px;
    background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
    border: 1px solid #CBD5DD;
    overflow: hidden;
    font-size: 14px;

    &-left {
      flex: 1;
    }
    &-right {
      button {
        display inline-block
        align-items center
        justify-content center
        width 100px
        height 28px
        font-size 12px
        color #333
        background #fff
        border 1px solid #cbd5dd
        border-radius 2px
        box-sizing border-box
        outline none
        cursor pointer
        &:hover {
          font-weight bold
        }

        &[disabled] {
          cursor default
          opacity 0.5
          &:hover {
            font-weight normal
          }
        }
      }
    }
  }

  .container {
    padding: 15px 0;
    flex: 1;
    overflow: auto;
  }

  .actions {
    position: fixed;
    top: 70px;
    right: 10px;
    z-index: 1;
  }

  .print-btn {
    padding: 10px 12px;
    color: #687179;
    background: #fff;
    border: 1px solid #adb4ba;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
    border-radius: 2px;

    &:hover {
      background: #fafafa;
    }
  }
}
</style>
