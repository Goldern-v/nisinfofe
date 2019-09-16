<template>
  <div id="sugarPagePrint" :style="{'min-height':containHeight}">
    <div class="blood-sugar-con">
      <div class="sugr-page" v-for="(item, index) in listMap" :key="index">
        <!-- <img class="his-logo"
        src="../../../../common/images/his-logo/厚街医徽.png" />-->
        <div class="title">{{HOSPITAL_NAME_SPACE}}</div>
        <div class="sup-title">微量血糖测定登记表</div>

        <p flex="main:justify" class="info">
          <span>病人姓名：{{patientInfo.name}}</span>
          <span>性别：{{patientInfo.gender}}</span>
          <span>年龄：{{patientInfo.age}}</span>
          <span>科室：{{patientInfo.deptName}}</span>
          <!-- <span>入院日期：{{patientInfo.admissionDate | toymd}}</span> -->
          <span>床号：{{patientInfo.bedLabel}}</span>
          <!-- <span class="diagnosis-con">诊断：{{patientInfo.diagnosis}}</span> -->
          <span>住院号：{{patientInfo.inHosId}}</span>
          <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
        </p>
        <div class="table-warpper" flex="cross:stretch">
          <sugarTable :data="item.left"></sugarTable>
          <div style="width: 10px;border-top: 1px solid #000;border-bottom: 1px solid #000;"></div>
          <sugarTable :data="item.right"></sugarTable>
        </div>
        <div class="page-con">第 {{index + startPage}} / {{listMap.length + startPage - 1}} 页</div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.blood-sugar-con {
  .sugr-page {
    margin: 20px auto;
    background: #ffffff;
    width: 700px;
    padding: 20px;
    min-height: 1000px;
    box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.5);
    position: relative;
  }

  .title {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
  }

  .sup-title {
    font-size: 21px;
    padding: 10px 0 0px;
    text-align: center;
    font-weight: bold;
  }

  .info {
    margin-top: 30px;
    margin-bottom: 5px;

    span {
      margin-right: 4px;
      font-size: 13px;
      color: #000;
    }
  }

  .his-logo {
    position: absolute;
    left: 21px;
    top: 21px;
    height: 44px;
  }

  .page-con {
    font-size: 13px;
    text-align: center;
    bottom: 20px;
    position: absolute;
    // width 100%
    left: 0;
    right: 0;
  }
}
</style>




<script>
import sugarTable from "@/Page/patientInfo/supPage/blood-sugar/components/sugar-table.vue";
import { getSugarListWithPatientId, getPvHomePage } from "../api/api.js";

import $ from "jquery";
import moment from "moment";
import { $params } from "@/pages/sheet-print/tool/tool";
console.log($params, "$params");
export default {
  data() {
    return {
      listMap: [],
      hisPatSugarList: [],
      startPage: 1,
      patientInfo: {},
      query: $params
    };
  },
  computed: {
    containHeight() {
      return this.wih - 130 + "px";
    }
  },
  methods: {
    async load() {
      try {
        const res = await getSugarListWithPatientId(
          this.query.patientId,
          this.query.visitId
        );

        console.log(res, "res");
        this.hisPatSugarList = res.data.data.hisPatSugarList;
        let list = res.data.data.hisPatSugarList;
        let listMap = [];

        for (let i = 0; i < list.length; i += 54) {
          let obj = {};
          obj.left = list.slice(i, i + 27);
          obj.right = list.slice(i + 27, i + 54);
          listMap.push(obj);
        }
        this.listMap = listMap;
        this.patientInfo = res.data.data;
        getPvHomePage(this.query.patientId, this.query.visitId).then(res => {
          if (res.data.data) {
            this.startPage = res.data.data.indexNo;
          } else {
            this.startPage = 1;
          }
        });
      } catch (e) {
        console.log(e, "eee");
      }
    }
  },
  created() {
    if (this.query.patientId) {
      this.load();
    }
  },
  components: {
    sugarTable
  }
};
</script>
