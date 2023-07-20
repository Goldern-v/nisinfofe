<template>
  <div class="ward-report-detail" v-loading="loading">
    <div class="toolbar">
      <div class="toolbar-left">
        <span>科室：</span>
        <ElSelect size="small" v-model="code">
          <ElOption
            v-for="d of depts"
            :key="d.deptCode"
            :label="d.deptName"
            :value="d.deptCode"
          />
          <!-- <ElOption
            v-for="d of depts"
            :key="d.code"
            :label="d.name"
            :value="d.code"
          />-->
        </ElSelect>
      </div>
      <div class="toolbar-right">
        <Button @click="onPrint">打印预览</Button>
      </div>
    </div>
    <div class="container">
      <NullBg v-if="!digits" text="暂时没有病房日报数据～" />
      <div class="print-area" v-else ref="area">
        <component
          :is="whichPaper"
          v-for="(paper, i) of papers"
          :key="i"
          :name="name"
          :signNo="user.empNo"
          :signName="user.empName"
          :date="date"
          :digits="i === 0 ? digits : null"
          :LogBabyNum="i === 0 ? LogBabyNum : null"
          :inList="paper.inList"
          :outList="paper.outList"
          :index="i === 0 ? 1 : smallSize + 1 + (i - 1) * largeSize"
          :page="i"
          :total="papers.length"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import print from "printing";

import Button from "./components/button";
import NullBg from "@/components/null/null-bg.vue";
import common from "@/common/mixin/common.mixin.js";
import Paper from "./components/paper.vue";
import PaperSdyy from "./components/paper-sdyy.vue";
import * as apis from "./apis";

export default {
  mixins: [common],
  components: {
    NullBg,
    Paper,
    Button,
    PaperSdyy
  },
  data() {
    return {
      loading: false,
      printing: false,
      date: "",
      digits: null,
      LogBabyNum: null,
      papers: [],
      smallSize: 0,
      largeSize: 0,
      user: JSON.parse(localStorage.user),
      depts: [],
      code: "",
      name: ""
    };
  },
  computed: {
    whichPaper() {
      const pager = {
        'nfyksdyy': PaperSdyy,
      }
      return pager[this.HOSPITAL_ID] || Paper;
    },
    smallSize4Hospital() {
      const pageSize = {
        nfyksdyy: 10
      }
      return pageSize[this.HOSPITAL_ID] || 10;
    }
  },
  watch: {
    deptCode(value, oldValue) {
      if (oldValue !== value) {
        this.loadDepts();
      }
    },
    code(value, oldValue) {
      if (oldValue !== value) {
        const dept = this.depts.find(d => d.deptCode === value);
        this.name = dept ? dept.deptName : "";
        this.load();
      }
    },
    "$route.params.date"() {
      this.load();
    }
  },
  mounted() {
    if (this.deptCode) {
      this.loadDepts();
    }
  },
  methods: {
    async loadDepts() {
      const parentCode = this.deptCode;
      const res1 = await apis.listDepartment(parentCode);
      const {
        data: { data: depts }
      } = res1;
      // this.depts = depts.deptList
      //  if(!depts[0]) {
      //   depts[0] = {}
      // }
      // this.code = depts[0].code

      this.depts = depts;
      this.code = depts[0].deptCode;
    },
    async load(refresh) {
      const date = this.$route.params.date;

      if (!date)
        return this.$router.push(
          "/wardReport/" + moment().format("YYYY-MM-DD")
        );
      if (!this.code) return;

      this.loading = true;

      const res2 = await apis.listWardReport(this.code, date);
      let {
        data: {
          data: {
            num: digits,
            LogBabyNum,
            newPatsAndTranIn: inList,
            outPatsAndTranOut: outList
          }
        }
      } = res2;

      const smallSize = (this.smallSize = this.smallSize4Hospital);
      const largeSize = (this.largeSize = 16);

      const total = Math.max(inList.length, outList.length);
      const papers = [];
      const paperCount =
        total > smallSize ? Math.ceil((total - smallSize) / largeSize) + 1 : 1;

      for (let i = 0; i < paperCount; i++) {
        const size = i === 0 ? smallSize : largeSize;
        const start = i === 0 ? 0 : smallSize + (i - 1) * largeSize;
        const end = i === 0 ? smallSize : smallSize + i * largeSize;

        let inL = inList.slice(start, end);
        let outL = outList.slice(start, end);

        inL = inL.concat(
          Array.from({ length: size - inL.length }).map(() => ({}))
        );
        outL = outL.concat(
          Array.from({ length: size - outL.length }).map(() => ({}))
        );

        papers.push({
          inList: inL,
          outList: outL
        });
      }

      this.date = moment(date).format("YYYY年MM月DD日");
      this.digits = digits;
      this.LogBabyNum = LogBabyNum;
      if (this.code.indexOf("051102") == -1) {
        this.LogBabyNum = null;
      } else {
        this.LogBabyNum = LogBabyNum;
      }
      this.papers = papers;
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
        scanStyles: false
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
