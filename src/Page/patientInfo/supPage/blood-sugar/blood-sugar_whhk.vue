<template>
  <div
    class="contain"
    v-loading="pageLoading"
    :style="containHeight"
  >
    <div ref="Contain" @mousewheel="e => onScroll(e)">
      <div v-show="!isChart" class="blood-sugar-con">
        <div
          class="sugr-page"
          v-for="(item, index) in listMap"
          :key="index"
          :class="index !== listMap.length - 1 ? 'break-pages' : ''"
        >
          <div class="title">{{ HOSPITAL_NAME_SPACE }}</div>
          <div class="sup-title">血糖记录单</div>
          <p flex="main:justify" class="info" v-if="isPreviewUserInfo">
            <span
              >病人姓名：{{ sugarUserInfo.name || tableHeaderInfo.name }}</span
            >
            <span>性别：{{ sugarUserInfo.gender }}</span>
            <span>年龄：{{ sugarUserInfo.age }}</span>
            <span>科室：{{ sugarUserInfo.deptName }}</span>
            <span>床号：{{ sugarUserInfo.bedNo }}</span>
            <span>住院号：{{ sugarUserInfo.inHosId }}</span>
          </p>
          <!-- 表头信息-->
          <p
            flex="main:justify"
            class="info"
            :style="{ marginTop: Toppx }"
            v-else
          >
            <span>病人姓名：{{ patientInfo.name || tableHeaderInfo.name }}</span>
            <span>性别：{{ patientInfo.sex || tableHeaderInfo.gender }}</span>
            <span>年龄：{{ resAge ? resAge : patientInfo.age || tableHeaderInfo.gender }}</span>
            <span>科室：{{
                patientInfo.deptName ||
                  patientInfo.deptName ||
                  tableHeaderInfo.deptName
            }}</span>
            <span
              >床号：{{
                resBedNol || patientInfo.bedLabel || tableHeaderInfo.bedLabel
              }}</span
            >
            <span
              >住院号：{{
                resInHosId || patientInfo.inpNo || tableHeaderInfo.bedNo
              }}</span
            >
          </p>
          <div class="table-warpper" flex="cross:stretch">
            <sugarTableWHHK
              :data="item.left"
              :selected.sync="selected"
              @dblclick="hisDisabled() && onEdit()"
              :baseIndex="0"
              :sugarItem.sync="typeList"
            ></sugarTableWHHK>
            <div
              style="
                width: 10px;
                border-top: 1px solid #000;
                border-bottom: 1px solid #000;
              "
            ></div>
            <sugarTableWHHK
              :data="item.right"
              :selected.sync="selected"
              @dblclick="hisDisabled() && onEdit()"
              :baseIndex="27"
              :sugarItem.sync="typeList"
            ></sugarTableWHHK>
          </div>
          <div class="page-con">
            第 {{ index + 1 }} / {{ listMap.length }} 页
          </div>
        </div>
        <nullBg v-show="listMap.length == 0"></nullBg>
        <!-- <div class="addBtn" v-show="listMap.length == 0"> -->
        <div class="addBtn" v-show="listMap.length == 0 && !isPreview">
          <whiteButton
            text="添加血糖记录"
            @click="onAddTable"
            :disabled="isPreview"
          />
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
    <div class="tool-con" v-show="listMap.length">
      <div class="tool-fix" flex="dir:top">
        <whiteButton
          text="添加"
          @click="hisDisabled() && onAdd()"
          :disabled="isPreview"
        ></whiteButton>
        <whiteButton
          text="保存"
          @click="saveActiveSugar()"
          :disabled="!selected || !selected.recordDate"
         ></whiteButton>
        <whiteButton
          text="修改"
          @click="hisDisabled() && onEdit()"
          :disabled="!selected || !selected.recordDate || isPreview"
        ></whiteButton>
        <whiteButton
          text="删除"
          @click="hisDisabled() && onRemove()"
          :disabled="!selected || !selected.recordDate || isPreview"
        ></whiteButton>
        <whiteButton
          :text="`设置起始页(${startPage})`"
          @click="hisDisabled() && openSetPageModal(listMap.length)"
          :disabled="isPreview"
        ></whiteButton>
        <whiteButton
          text="打印预览"
          @click="hisDisabled() && toPrint()"
          :disabled="isPreview"
        ></whiteButton>
        <whiteButton
          :text="!isChart ? '查看曲线' : '查看表格'"
          @click="openChart"
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

  .title-img {
    width: 100%;
    height: 100%;
  }

  .sup-title {
    font-size: 21px;
    padding: 1px 0 0px;
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
.guizhou-btn {
  /deep/ .white-btn {
    color: #000;
  }
}
</style>

<script>
import sugarTableWHHK from "./components/sugar-table-whhk.vue";
import {
  getSugarListWithPatientId,
  saveSugarList,
  removeSugar,
  getPvHomePage,
  getSugarItemDict,
  getEditAge,
  getFormHeadData
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
      tableHeaderInfo: {},
      selected: null,
      startPage: 1,
      typeList: [],
      formAge: 0,
      resAge: 0,
      resName: "",
      resGender: "",
      resDeptName: "",
      resBedNol: "",
      resInHosId: "",
      tDeptName: "",
      registNum: 0, //血糖登记次数
      hisUserTitLeList: ["huadu"], //表头用户信息通过获取用户信息接口获取的医院
      sugarUserInfo: {} //患者基础信息
    };
  },
  computed: {
    patientInfo() {
      return this.$route.query;
    },
    containHeight() {
      if (this.$route.path.includes("nursingPreview")) {
        return { height: this.wih - 40 + 'px' }
      }
      return { minHeight: this.wih - 130 + "px" };
    },
    //是否为预览状态不可编辑
    isPreview() {
      return (
        this.$route.query &&
        this.$route.path.includes("nursingPreview") &&
        this.$route.query.nursingPreviewIsShow == "1"
      );
    },
    //是否为表头用户信息通过获取用户信息接口获取的医院且为调阅接口
    isPreviewUserInfo() {
      return (
        this.hisUserTitLeList.includes(this.HOSPITAL_ID) &&
        this.$route.path.includes("nursingPreview")
      );
    },
    Toppx() {
      return "30px";
    }
  },
  methods: {
    uploadView() {
      this.load();
      this.getSugarItemDict();
    },
    async saveActiveSugar() {
      if (this.HOSPITAL_ID !== 'whhk') {
        if(!this.selected.sugarItem){
          return this.$message({
            message: '请填写项目再保存',
            type: 'error',
            duration:"1500"
          })
        }
      }

      // if(!this.selected.sugarValue && this.HOSPITAL_ID !== 'whhk'){
      //   return this.$message({
      //     message: '请填写血糖值再保存',
      //     type: 'error',
      //     duration:"1500"
      //   })
      // }
      const user = JSON.parse(localStorage.getItem("user"));
      let item = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        name: this.patientInfo.name,
        bedLabel: this.patientInfobedLabel,
        recordDate: this.selected.recordDate,
        sugarItem: this.selected.sugarItem,
        sugarValue: this.selected.sugarValue,
        riValue: this.selected.riValue,
        oldRecordDate: "",
        nurseEmpNo: user.empNo,
        nurse: user.empNo,
        expand1: this.selected.expand1,
        expand2: 1,
        wardCode: this.patientInfo.wardCode,
        time: this.selected.time,
        date: this.selected.date || ""
      };
      const DateArr = item.recordDate.split(" ");
      const timeArr = DateArr[1].split(":");
      const firstTime = `${timeArr[0]}:${timeArr[1]}`;

      if (this.selected.expand2 !== undefined) {
        item.expand2 = 2;
        item.oldRecordDate = item.recordDate;
        const fulltime = `${DateArr[0]} ${item.time}:00`;
        await removeSugar(item);
        item.recordDate = fulltime;
      }
      // 判断时间
      if (firstTime !== item.time) {
        item.recordDate = `${DateArr[0]} ${item.time}:00`;
      }
      await saveSugarList([item]);
      this.$message.success("保存成功");
      this.load();
      this.getSugarItemDict();
    },
    hisDisabled() {
      return !this.$route.path.includes("nursingPreview");
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
      this.selected = null
      const res = await getSugarListWithPatientId(
        this.patientInfo.patientId,
        this.patientInfo.visitId
      );
      this.tableHeaderInfo = res.data.data;
      if (res.data.data.hisPatSugarList.length != 0) {
        this.tableHeaderInfo.bedLabel =
          res.data.data.hisPatSugarList[0].bedLabel;
      }
      this.resAge = res.data.data.age;
      ////表头用户信息通过获取用户信息接口获取的医院
      this.hisUserTitLeList.includes(this.HOSPITAL_ID) &&
        (this.sugarUserInfo = res.data.data);
      res.data.data.registNum && (this.registNum = res.data.data.registNum); //血糖登记次数
      this.pageLoading = false;

      this.hisPatSugarList = res.data.data.hisPatSugarList;
      /** 时间排序 */
      // let list = res.data.data.hisPatSugarList.sort(
      //   (a, b) =>
      //     new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime()
      // );
      let list = res.data.data.hisPatSugarList
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
      ).then(res => {
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
        age: this.formAge || this.patientInfo.age
      });
    },
    async onRemove() {
      await this.$confirm(
        "确定要删除该血糖记录吗？删除后将无法恢复！",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "点错了",
          type: "warning"
        }
      );

      let item = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        recordDate: this.selected.recordDate,
        sugarItem: this.selected.sugarItem,
        sugarValue: this.selected.sugarValue,
        recordId: this.selected.recordId || ""
      };

      await removeSugar(item);
      await this.load();
      this.selected = null;
    },
    async onSave(item) {
      // if (!item.sugarValue) {
      //   return this.$message.error('请填写血糖值再保存')
      // }
      item.recordDate =
        moment(item.recordDate).format("YYYY-MM-DD HH:mm") + ":00";
      item.patientId = this.patientInfo.patientId;
      item.visitId = this.patientInfo.visitId;
      item.name = this.patientInfo.name;
      item.bedLabel = this.patientInfo.bedLabel;
      item.wardCode = this.patientInfo.wardCode;
      (item.nurseEmpNo = this.empNo || ""), //护士工号
        console.log(item, "xiaog");
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
          itemValue: itemValue
        }
      ];
      await getEditAge(item.patientId, item.visitId, itemMap).then(res => {
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
      getSugarItemDict().then(res => {
        let data = res.data.data;
        this.typeList = data.map(item => {
          return {
            vitalSign: item.itemName
          };
        });
      });
    },
    onScroll(e) {
      if (e.deltaY < 0 && this.$refs.Contain.style.top.split("px")[0] <= 20) {
        this.$refs.Contain.style.top =
          Number(this.$refs.Contain.style.top.split("px")[0]) + 20 + "px";
      }
    }
  },
  async created() {
    if (this.$route.query.patientId) {
      await this.load();
    }
    this.getSugarItemDict();
  },
  watch: {
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
    }
  },
  components: {
    sugarTableWHHK,
    whiteButton,
    sugarChart,
    nullBg,
    editModal,
    setPageModal,
    editAge
  }
};
</script>
