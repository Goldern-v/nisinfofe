<template>
  <div class="contain" v-loading="pageLoading" :style="{'min-height':containHeight}">
    <div ref="Contain">
      <div v-show="!isChart" class="blood-sugar-con">
        <div class="sugr-page" v-for="(item, index) in listMap" :key="index">
          <!-- <img class="his-logo"
          src="../../../../common/images/his-logo/厚街医徽.png" />-->
          <div class="title">{{HOSPITAL_NAME_SPACE}}</div>
          <div class="sup-title">指尖血糖测定登记表</div>

          <p flex="main:justify" class="info">
            <span>病人姓名：{{patientInfo.name}}</span>
            <span>性别：{{patientInfo.sex}}</span>
            <span
                v-if="HOSPITAL_ID == 'lingcheng'"
                @dblclick="onEditAge"
            >年龄：{{formAge?formAge:patientInfo.age}}</span>
            <span v-if="HOSPITAL_ID != 'lingcheng'">年龄：{{resAge?resAge:patientInfo.age}}</span>
            <span>科室：{{patientInfo.wardName || patientInfo.deptName}}</span>
            <!-- <span>入院日期：{{patientInfo.admissionDate | toymd}}</span> -->
            <span>床号：{{patientInfo.bedLabel}}</span>
            <!-- <span class="diagnosis-con">诊断：{{patientInfo.diagnosis}}</span> -->
            <span>住院号：{{patientInfo.inpNo}}</span>
            <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
          </p>
          <div class="table-warpper" flex="cross:stretch">
            <sugarTable :data="item.left" :selected.sync="selected" @dblclick="onEdit"></sugarTable>
            <div style="width: 10px;border-top: 1px solid #000;border-bottom: 1px solid #000;"></div>
            <sugarTable :data="item.right" :selected.sync="selected" @dblclick="onEdit"></sugarTable>
          </div>
          <div class="page-con">第 {{index + startPage}} / {{listMap.length + startPage - 1}} 页</div>
        </div>
        <nullBg v-show="listMap.length == 0"></nullBg>
        <div class="addBtn" v-show="listMap.length == 0">
          <whiteButton text="添加血糖记录" @click="onAddTable"/>
        </div>
      </div>
    </div>
    <div class="chart-con" v-if="isChart">
      <sugarChart ref="sugarChartModal" :lineData="hisPatSugarList" :sugarItem.sync="typeList"></sugarChart>
    </div>
    <div class="tool-con" v-show="listMap.length">
      <div class="tool-fix" flex="dir:top">
        <whiteButton text="添加" @click="onAdd"></whiteButton>
        <whiteButton
            text="修改"
            @click="onEdit"
            :disabled="!selected || !selected.recordDate"
            v-if="HOSPITAL_ID != 'lingcheng'"
        ></whiteButton>
        <whiteButton text="删除" @click="onRemove" :disabled="!selected || !selected.recordDate"></whiteButton>
        <whiteButton :text="`设置起始页(${startPage})`" @click="openSetPageModal"></whiteButton>
        <whiteButton text="打印预览" @click="toPrint"></whiteButton>
        <whiteButton :text="!isChart?'查看曲线':'查看表格'" @click="openChart" v-if="HOSPITAL_ID != 'gy'"></whiteButton>
      </div>
    </div>
    <editModal ref="editModal" :sugarItem.sync="typeList" @confirm="onSave"/>
    <editAge ref="editAge" @confirm="onSaveAge"/>
    <setPageModal ref="setPageModal"/>
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

    .addBtn {
      margin-top: 20px;
      text-align: center;

      >>> .white-btn {
        margin-right: 0;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .tool-con {
    position: fixed;
    top: 70px;
    right: 10px;

    .tool-fix {
      > > > .white-btn {
        justify-content: center;
      }

      .btn-con + .btn-con {
        margin-top: 10px;
      }
    }
  }
</style>


<script>
  import sugarTable from "./components/sugar-table.vue";
  import {
    getSugarListWithPatientId,
    saveSugarList,
    removeSugar,
    getPvHomePage,
    getSugarItemDict,
    getEditAge,
    getFormHeadData,
  } from "./api/index.js";
  import whiteButton from "@/components/button/white-button.vue";
  import sugarChart from "./components/sugar-chart.vue";
  import nullBg from "@/components/null/null-bg.vue";
  import editModal from "./components/edit-modal.vue";
  import editAge from "./components/edit-age.vue";
  import setPageModal from "./components/setPage-modal.vue";
  import $ from "jquery";
  import moment from "moment";
  import common from "@/common/mixin/common.mixin.js";

  export default {
    mixins: [common],
    data() {
      return {
        pageLoading: false,
        listMap: [],
        hisPatSugarList: [],
        isChart: false,
        selected: null,
        startPage: 1,
        typeList: [],
        formAge: 0,
        resAge: 0,
      };
    },
    computed: {
      patientInfo() {
        return this.$route.query;
      },
      containHeight() {
        return this.wih - 130 + "px";
      },
    },
    mounted() {
      this.getFormHead();
    },
    methods: {
      async getFormHead() {
        console.log("判断医院名称=========", this.HOSPITAL_ID);
        console.log(this.patientInfo.patientId, this.patientInfo.visitId);
        const res = await getFormHeadData(
          this.patientInfo.patientId,
          this.patientInfo.visitId
        );
        console.log("getFormHeadData==========", res.data.data.itemMap.age);
        this.formAge = res.data.data.itemMap.age;
      },
      async load() {
        this.pageLoading = true;
        const res = await getSugarListWithPatientId(
          this.patientInfo.patientId,
          this.patientInfo.visitId
        );
        this.resAge = res.data.data.age
        this.pageLoading = false;

        this.hisPatSugarList = res.data.data.hisPatSugarList;
        /** 时间排序 */
        let list = res.data.data.hisPatSugarList.sort(
          (a, b) =>
            new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime()
        );
        let listMap = [];

        for (let i = 0; i < list.length; i += 54) {
          let obj = {};
          obj.left = list.slice(i, i + 27);
          obj.right = list.slice(i + 27, i + 54);
          listMap.push(obj);
        }
        this.listMap = listMap;

        getPvHomePage(
          this.$route.query.patientId,
          this.$route.query.visitId
        ).then((res) => {
          if (res.data.data) {
            this.startPage = res.data.data.indexNo;
          } else {
            this.startPage = 1;
          }
        });
      },
      toPrint() {
        window.localStorage.sugarModel = $(this.$refs.Contain).html();
        if (process.env.NODE_ENV === "production") {
          let newWid = window.open();
          newWid.location.href = "/crNursing/print/sugar";
        } else {
          this.$router.push(`/print/sugar`);
        }
      },
      openChart() {
        // this.$refs.sugarChartModal.open()
        this.isChart = !this.isChart;
      },
      onAddTable() {
        if (this.$route.query.patientId) {
          this.listMap.push({left: [], right: []});
        } else {
          this.$message.warning("请先选择一名患者");
        }
      },
      onAdd() {
        this.$refs.editModal.open("添加血糖记录");
      },
      onEdit() {
        this.$refs.editModal.open("编辑血糖记录", this.selected);
      },
      onEditAge() {
        this.$refs.editAge.open("编辑年龄");
      },
      async onRemove() {
        await this.$confirm(
          "确定要删除该血糖记录吗？删除后将无法恢复！",
          "提示",
          {
            confirmButtonText: "确定删除",
            cancelButtonText: "点错了",
            type: "warning",
          }
        );

        const item = {
          patientId: this.patientInfo.patientId,
          visitId: this.patientInfo.visitId,
          recordDate: this.selected.recordDate,
          sugarItem: this.selected.sugarItem,
          sugarValue: this.selected.sugarValue,
          recordId: this.selected.recordId || "",
        };

        await removeSugar(item);
        this.load();
        this.selected = null;
      },
      async onSave(item) {
        item.recordDate =
          moment(item.recordDate).format("YYYY-MM-DD HH:mm") + ":00";
        item.patientId = this.patientInfo.patientId;
        item.visitId = this.patientInfo.visitId;

        await saveSugarList([item]);

        this.load();
        this.$refs.editModal.close();
        this.selected = null;
        this.$message.success("保存成功");
      },
      async onSaveAge(item) {
        item.patientId = this.patientInfo.patientId;
        item.visitId = this.patientInfo.visitId;
        console.log("item", item.age);
        let itemValue = item.age;
        let itemMap = [
          {
            itemCode: "age",
            itemValue: itemValue,
          },
        ];
        await getEditAge(item.patientId, item.visitId, itemMap).then((res) => {
          console.log("年龄接口返回res===", res);
        });
        console.log("年龄接口返回item", item);
        this.load();
        this.$refs.editAge.close();
        this.getFormHead();
        this.$message.success("保存成功");
      },
      openSetPageModal() {
        this.$refs.setPageModal.open();
      },
      getSugarItemDict() {
        getSugarItemDict().then((res) => {
          let data = res.data.data;
          this.typeList = data.map((item) => {
            return {
              vitalSign: item.itemName,
            };
          });
        });
      },
    },
    created() {
      if (this.$route.query.patientId) {
        this.load();
      }
      if (this.HOSPITAL_ID == "lingcheng") {
        this.getSugarItemDict();
      }
      this.getFormHead();
    },
    components: {
      sugarTable,
      whiteButton,
      sugarChart,
      nullBg,
      editModal,
      setPageModal,
      editAge,
    },
  };
</script>
