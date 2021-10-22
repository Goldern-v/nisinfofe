<template>
  <div
    class="contain"
    v-loading="pageLoading"
    :style="{ 'min-height': containHeight }"
  >
    <div ref="Contain" @mousewheel="(e) => onScroll(e)">
      <div v-show="!isChart" class="blood-sugar-con">
        <div class="sugr-page" v-for="(item, index) in listMap" :key="index">
          <!-- <img class="his-logo"
          src="../../../../common/images/his-logo/厚街医徽.png" />-->
          <div class="title">{{ HOSPITAL_NAME_SPACE }}</div>
          <div
            class="sup-title"
            v-if="HOSPITAL_NAME === '广州市花都区人民医院'"
          >
            指尖血糖测定登记表
          </div>
          <div
            class="sup-title"
            v-else-if="HOSPITAL_NAME === '江门市妇幼保健院'"
          >
            血糖记录单
          </div>
          <div
            class="sup-title"
            v-else-if="HOSPITAL_NAME === '德州市陵城区人民医院'"
          >
            血糖测量记录单
          </div>
          <div class="sup-title" v-else-if="HOSPITAL_ID == 'liaocheng'">
            血糖酮体记录表
          </div>
          
          <div class="sup-title" v-else>微量血糖测定登记表</div>
          <div class="identifying" v-if="HOSPITAL_ID == 'liaocheng'">POCT</div>
          <p flex="main:justify" class="info" v-if="HOSPITAL_ID == 'liaocheng'">
            <span v-if="HOSPITAL_ID == 'fuyou'">科室：{{ tDeptName }}</span>
            <span v-else
            style="width:150px"
              >科室：{{ patientInfo.wardName || patientInfo.deptName }}</span
            >
            <!-- <span>入院日期：{{patientInfo.admissionDate | toymd}}</span> -->
            <span  style="width:100px">床号：{{ patientInfo.bedLabel }}</span>
            <span>病人姓名：{{ patientInfo.name }}</span>
            <span>性别：{{ patientInfo.sex }}</span>
            <span v-if="HOSPITAL_ID == 'lingcheng'" @dblclick="onEditAge"
              >年龄：{{ formAge ? formAge : patientInfo.age }}</span
            >
            <span v-else>年龄：{{ resAge ? resAge : patientInfo.age }}</span>
            <!-- <span class="diagnosis-con">诊断：{{patientInfo.diagnosis}}</span> -->
            <span v-if="HOSPITAL_ID == 'liaocheng'"
              >病案号：{{ patientInfo.inpNo }}</span
            >
            <span v-else>住院号：{{ patientInfo.inpNo }}</span>
            <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
          </p>
          <p flex="main:justify" class="info" v-else>
            <span>病人姓名：{{ patientInfo.name }}</span>
            <span>性别：{{ patientInfo.sex }}</span>
            <span v-if="HOSPITAL_ID == 'lingcheng'" @dblclick="onEditAge"
              >年龄：{{ formAge ? formAge : patientInfo.age }}</span
            >
            <span v-else>年龄：{{ resAge ? resAge : patientInfo.age }}</span>
            <span v-if="HOSPITAL_ID == 'fuyou'">科室：{{ tDeptName }}</span>
            <span v-if="HOSPITAL_ID == 'guizhou'">科室：{{ resDeptName|| patientInfo.wardName || patientInfo.deptName }}</span>
            <span v-else
              >科室：{{ patientInfo.wardName || patientInfo.deptName }}</span
            >
            <!-- <span>入院日期：{{patientInfo.admissionDate | toymd}}</span> -->
            <span>床号：{{ resBedNol || patientInfo.bedLabel }}</span>
            <!-- <span class="diagnosis-con">诊断：{{patientInfo.diagnosis}}</span> -->
            <span v-if="HOSPITAL_ID == 'liaocheng'"
              >病案号：{{ patientInfo.inpNo }}</span
            >
            <span v-else>住院号：{{ resInHosId || patientInfo.inpNo }}</span>
            <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
          </p>
          <div class="table-warpper" flex="cross:stretch">
            <!-- 【左边】聊城二院血糖表格单独管理 -->
            <sugarTableLcey
            v-if="HOSPITAL_ID == 'liaocheng'"
            :data="item.left"
              :selected.sync="selected"
              @dblclick="hisDisabled()&&onEdit()"
              :baseIndex='0'
            ></sugarTableLcey>
            <sugarTable
            v-else
              :data="item.left"
              :selected.sync="selected"
              @dblclick="hisDisabled()&&onEdit()"
              :baseIndex='0'
            ></sugarTable>
            <div
              style="
                width: 10px;
                border-top: 1px solid #000;
                border-bottom: 1px solid #000;
              "
            ></div>
             <!--【右边】 聊城二院血糖表格单独管理 -->
            <sugarTableLcey
            v-if="HOSPITAL_ID == 'liaocheng'"
            :data="item.right"
              :selected.sync="selected"
              @dblclick="hisDisabled()&&onEdit()"
              :baseIndex='27'
            ></sugarTableLcey>
            <sugarTable
            v-else
              :data="item.right"
              :selected.sync="selected"
              @dblclick="hisDisabled()&&onEdit()"
              :baseIndex='27'
            ></sugarTable>
          </div>
          <div class="page-con">
            第 {{ index + 1 }} / {{ listMap.length }} 页
          </div>
        </div>
        <nullBg v-show="listMap.length == 0"></nullBg>
        <div class="addBtn" v-show="listMap.length == 0">
          <whiteButton text="添加血糖记录" @click="onAddTable" />
        </div>
      </div>
    </div>
    <div class="chart-con" v-if="isChart">
      <sugarChart
        ref="sugarChartModal"
        :lineData="hisPatSugarList"
        :sugarItem.sync="typeList"
      ></sugarChart>
    </div>
    <div class="tool-con" v-show="listMap.length" :class="[HOSPITAL_ID=='guizhou'?'guizhou-btn':'']">
      <div class="tool-fix" flex="dir:top">
        <whiteButton text="添加" @click="hisDisabled()&&onAdd()"></whiteButton>
        <whiteButton
          text="修改"
          @click="hisDisabled()&&onEdit()"
          :disabled="!selected || !selected.recordDate"
          v-if="HOSPITAL_ID != 'lingcheng'"
        ></whiteButton>
        <whiteButton
          text="删除"
          @click="hisDisabled()&&onRemove()"
          :disabled="!selected || !selected.recordDate"
        ></whiteButton>
        <whiteButton
          :text="`设置起始页(${startPage})`"
          @click="hisDisabled()&&openSetPageModal(listMap.length)"
        ></whiteButton>
        <whiteButton text="打印预览" @click="hisDisabled()&&toPrint()"></whiteButton>
        <whiteButton
          :text="!isChart ? '查看曲线' : HOSPITAL_ID=='guizhou'?'返回':'查看表格'"
          @click="openChart"
          v-if="HOSPITAL_ID != 'gy'"
        ></whiteButton>
      </div>
    </div>
    <editModal ref="editModal" :sugarItem.sync="typeList" @confirm="onSave" />
    <editAge ref="editAge" @confirm="onSaveAge" />
    <setPageModal ref="setPageModal" />
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
  .identifying{
    width: 88px;
    height: 34px;
    border: 1px solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 34px;
    position: absolute;
    top: 30px;
    right: 60px;
    font-weight:700;
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
    > .white-btn {
      justify-content: center;
    }

    .btn-con + .btn-con {
      margin-top: 10px;
    }
  }
}
.guizhou-btn{
  /deep/ .white-btn{
    color: #000;
  }
}
</style>


<script>
import sugarTable from "./components/sugar-table.vue";
import sugarTableLcey from "./components/sugar-table-lcey.vue";
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
      resName:'',
      resGender:'',
      resDeptName:'',
      resBedNol:'',
      resInHosId:'',
      tDeptName: "",
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
  methods: {
    hisDisabled(){
      return  !this.$route.path.includes('nursingPreview')
    },
    async getFormHead() {
      const res = await getFormHeadData(
        this.patientInfo.patientId,
        this.patientInfo.visitId
      );
      this.formAge = res.data.data.itemMap.age;
    },
    async load() {
      this.pageLoading = true;
      const res = await getSugarListWithPatientId(
        this.patientInfo.patientId,
        this.patientInfo.visitId
      );
      console.log(res);
      this.resAge = res.data.data.age;
      if(this.HOSPITAL_ID=='guizhou'&&this.$route.path.includes('nursingPreview')){
        this.resName = res.data.data.name;
        this.resGender = res.data.data.gender;
        this.resDeptName = res.data.data.deptName;
        this.resBedNol = res.data.data.bedNo;
        this.resInHosId = res.data.data.inHosId;
      }
      if (this.HOSPITAL_ID == "fuyou") this.tDeptName = res.data.data.deptName;
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
        this.listMap.push({ left: [], right: [] });
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
      this.$refs.editAge.open("编辑年龄", {
        age: this.formAge || this.patientInfo.age,
      });
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

      let item = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        recordDate: this.selected.recordDate,
        sugarItem: this.selected.sugarItem,
        sugarValue: this.selected.sugarValue,
        recordId: this.selected.recordId || "",
      };

      if (this.HOSPITAL_ID == "fuyou") {
        item = {
          ...item,
          riValue: this.selected.riValue || "",
          oldRecordDate: this.selected.oldRecordDate || "",
          nurseEmpNo: this.empNo || "", //护士工号
          nurse: this.empName || "", //护士姓名
          wardCode: this.patientInfo.wardCode || "",
        };
      }

      await removeSugar(item);
      this.load();
      this.selected = null;
    },
    async onSave(item) {
      console.log(this.patientInfo);
      item.recordDate =
        moment(item.recordDate).format("YYYY-MM-DD HH:mm") + ":00";
      item.patientId = this.patientInfo.patientId;
      item.visitId = this.patientInfo.visitId;
      item.name = this.patientInfo.name;
      item.bedLabel = this.patientInfo.bedLabel;
      item.wardCode = this.patientInfo.wardCode;
      (item.nurseEmpNo = this.empNo || ""), //护士工号
        console.log(item, "xiaog");
      await saveSugarList([item])
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
      this.load();
      this.$refs.editAge.close();
      this.getFormHead();
      this.$message.success("保存成功");
    },
    openSetPageModal(length) {
      this.$refs.setPageModal.open(length);
    },
    // 通过字典获取项目下拉内容
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
    onScroll(e) {
      if (e.deltaY < 0 && this.$refs.Contain.style.top.split("px")[0] <= 20) {
        this.$refs.Contain.style.top =
          Number(this.$refs.Contain.style.top.split("px")[0]) + 20 + "px";
      }
    },
  },
  created() {
    if (this.$route.query.patientId) {
      this.load();
    }
    if (this.HOSPITAL_ID != "hj" && this.HOSPITAL_ID != "huadu") {
      this.getSugarItemDict();
    }
    if (this.HOSPITAL_ID == "lingcheng") {
      this.getFormHead();
    }
  },
  watch: {
    "patientInfo.patientId"(nVal, oVal) {
      if (this.HOSPITAL_ID == "lingcheng") {
        this.getFormHead();
      }
    },
    startPage() {
      let contont = this.$refs.Contain.children
        ? this.$refs.Contain.children[0]
        : [];
      this.$refs.Contain.style.position = "relative";
      this.$refs.Contain.style.top =
        "-" +
        contont.children[0].offsetHeight * (this.startPage - 1) -
        20 +
        "px";
    },
  },
  components: {
    sugarTable,
    // 聊城二院血糖表格
    sugarTableLcey,
    whiteButton,
    sugarChart,
    nullBg,
    editModal,
    setPageModal,
    editAge
  },
};
</script>
