<template>
  <div id="grouthPagePrint">
    <div class="head-con">
      <div class="hospital">{{HOSPITAL_NAME_SPACE}}</div>
      <div class="title">生长发育评估量表{{sexName}}</div>
      <div class="info">
        <span>姓名:{{queryInfo.name}}</span>
        <span>性别:{{queryInfo.sex}}</span>
        <span>年龄:{{queryInfo.age}}</span>
        <!-- <span>科室:{{queryInfo.deptName}}</span> -->
        <span>床号:{{queryInfo.bedLabel}}</span>
        <span>住院号:{{queryInfo.inpNo}}</span>
        <span>入院时间:{{queryInfo.admissionDate | ymd}}</span>
        <!-- <span v-if="showOperationDate">手术日期:{{operationDate}}</span> -->
      </div>
    </div>
    <div class="grouth-con">
      <img :src="bg" alt />
      <div class="chartCon">
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <line
            :x1="point[0]"
            :y1="point[1]"
            :x2="realWeightOpints[index + 1][0]"
            :y2="realWeightOpints[index + 1][1]"
            style="stroke:blue;stroke-width:2"
            v-for="(point, index) in realWeightOpints"
            :key="index + 'a'"
            v-if="index !== (realWeightOpints.length - 1) "
          />
          <line
            :x1="point[0]"
            :y1="point[1]"
            :x2="realHeadOpints[index + 1][0]"
            :y2="realHeadOpints[index + 1][1]"
            style="stroke:blue;stroke-width:2"
            v-for="(point, index) in realHeadOpints"
            :key="index"
            v-if="index !== (realHeadOpints.length - 1) "
          />
          <line
            :x1="point[0]"
            :y1="point[1]"
            :x2="realLengthOpints[index + 1][0]"
            :y2="realLengthOpints[index + 1][1]"
            style="stroke:blue;stroke-width:2"
            v-for="(point, index) in realLengthOpints"
            :key="index + 'b'"
            v-if="index !== (realLengthOpints.length - 1) "
          />
          <circle
            :cx="point[0]"
            :cy="point[1]"
            r="4"
            fill="blue"
            v-for="(point, index) in realWeightOpints"
            :key="index + 'c'"
          />
          <circle
            :cx="point[0]"
            :cy="point[1]"
            r="4"
            fill="blue"
            v-for="(point, index) in realHeadOpints"
            :key="index + 'd'"
          />
          <circle
            :cx="point[0]"
            :cy="point[1]"
            r="4"
            fill="blue"
            v-for="(point, index) in realLengthOpints"
            :key="index + 'e'"
          />
        </svg>
      </div>
    </div>
    <div class="remark">备注：新生儿的正常体重，身长，头围范围在第10-90个百分位之间，如低于第10个百分位，则存在营养风险，大于第90个百分位则存在营养过剩。</div>
  </div>
</template>

<style lang="scss" scoped>
#grouthPagePrint {
  padding: 20px 40px;
  overflow: hidden;
  width: 710px;
}
.grouth-con {
  width: 710px;
  overflow: hidden;
  position: relative;
  img {
    width: 780px;
    height: 950px;
    margin: -20px -30px -20px -40px;
  }
  .chartCon {
    position: absolute;
    /* background: red; */
    /* border: 1px solid #000; */
    top: 25px;
    left: 81px;
    right: 73px;
    bottom: 81px;
    transform: rotateX(180deg);
  }
}

@page {
  margin: 0 10mm;
}
@media print {
  #grouthPagePrint {
    padding: 15px 0 0;
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.head-con {
  position: relative;
  margin: auto;
}

.his-logo {
  height: 44px;
  position: absolute;
  top: 0;
  left: 0;
}

.hospital {
  font-size: 18px; // 四号
  // padding 15px 0 0px
  text-align: center;
  font-weight: bold;
}

.title {
  font-size: 21px; // 三号
  padding: 10px 0 10px;
  text-align: center;
  font-weight: bold;
  font-family: simsun;
  // font-family simHei
}

.info {
  display: flex;
  justify-content: space-between;
  font-size: 14px; // 小四
  // margin-bottom: 5px;
  padding: 0 40px;
}

.remark {
  line-height: 20px;
  font-size: 14px;
  padding: 0 40px;
}
</style>


<script>
import $ from "jquery";
import bus from "vue-happy-bus";
import { printDir } from "../control/common-print.js";
import common from "@/common/mixin/common.mixin.js";
import { addCSS } from "@/utils/css";
import { formatSub } from "@/utils/sup";
import { getDataById } from "../api/index";
import moment from "moment";
let boyBG = require("../images/fenton2013growthchartcolor-boys.svg");
let girlBG = require("../images/fenton2013growthchartcolor-girls.svg");
export default {
  props: ["qoSelect"],
  mixins: [common],
  data() {
    return {
      pageLoading: true,
      bus: bus(this),
      bg: "",
      sexName: "",
      // weightOpints: [
      //   [22, 1],
      //   [23, 1.2],
      //   [24, 1.3],
      //   [25, 2],
      //   [26, 2.2],
      //   [26, 3]
      // ],
      // headOpints: [[22, 11], [23, 25], [24, 24], [25, 5], [26, 10], [27, 25]],
      // lengthOpints: [[22, 14], [23, 12], [24, 24], [25, 30], [26, 12], [27, 55]]
      weightOpints: [],
      headOpints: [],
      lengthOpints: [],
    };
  },
  created() {
    printDir("v");
    addCSS(
      window,
      `
    .el-message {
      display: none !important;
    }
    `
    );
    if (this.queryInfo.sex == "女") {
      this.bg = girlBG;
      this.sexName = "（女孩）";
    } else {
      this.bg = boyBG;
      this.sexName = "（男孩）";
    }

    /** 获取表单数据 */
    getDataById(
      this.queryInfo.formCode,
      this.queryInfo.id,
      this.queryInfo.formType
    ).then((res) => {
      let birthday = this.queryInfo.birthday;
      let list = res.data.data.list;
      console.log("res.data.data=========", res.data.data.age);
      this.queryInfo.age = res.data.data.age;
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let recordDate = item.recordDate;
        let weeks = 0;
        if (item.gestationalAge.indexOf("+") != -1) {
          weeks =
            Number(item.gestationalAge.split("+")[0]) +
            Number(item.gestationalAge.split("+")[1]) / 7;
          console.log(weeks, "weeks1");
        } else {
          weeks = Number(item.gestationalAge);
        }
        console.log(weeks, "weeks");
        // let weeks = moment(recordDate).diff(birthday, "days") / 7;
        // let weeks = moment(recordDate).diff(birthday, "days") / 7;
        this.lengthOpints.push([weeks, Number(item.length)]);
        this.weightOpints.push([weeks, Number(item.weight)]);
        this.headOpints.push([weeks, Number(item.headCircumference)]);
      }
      console.log(res, "re");
    });
  },
  methods: {},
  computed: {
    queryInfo() {
      return this.$route.query;
    },
    realWeightOpints() {
      return this.weightOpints.map((point) => {
        let x = ((point[0] - 22) / 28) * 100 + "%";
        let y = (point[1] / 9) * 100 + "%";
        return [x, y];
      });
    },
    realHeadOpints() {
      return this.headOpints.map((point) => {
        let x = ((point[0] - 22) / 28) * 100 + "%";
        let y = ((point[1] + 30) / 90) * 100 + "%";
        return [x, y];
      });
    },
    realLengthOpints() {
      return this.lengthOpints.map((point) => {
        let x = ((point[0] - 22) / 28) * 100 + "%";
        let y = ((point[1] + 30) / 90) * 100 + "%";
        return [x, y];
      });
    },
  },
  filters: {
    ymd(val) {
      return moment(val).format("YYYY-MM-DD");
    },
  },
  components: {},
};
</script>
