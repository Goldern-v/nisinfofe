<template>
  <div
    class="contain"
    :class="{ fullpage }"
    v-loading="pageLoading"
    element-loading-text="正在保存"
  >
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight, overflow: 'hidden' }"
    >
      <div class="left-part" v-if="isAllCathterPage">
        <div
          class="head-con"
          flex
          :style="{ height: hasPatientGroup ? '75px' : '41px' }"
        >
          <div
            class="dept-select-con"
            :style="{ height: hasPatientGroup ? '75px' : '41px' }"
          ></div>
        </div>
        <follow-list
          :data="data.bedList"
          @selectPatient="onChangePatient_self"
          v-if="hasFollowList"
        >
          <template slot-scope="{ scope }">
            <div class="cathter-icon" v-if="scope.catheterIcon">
              {{ scope.catheterIcon }}
            </div>
            <img
              src="../../common/images/record/文件夹.png"
              alt
              class="has-file"
              v-if="scope.config && scope.config.hasCreatedDvc"
            />
          </template>
        </follow-list>
        <patientList
          :data="data.bedList"
          v-loading="patientListLoading"
          @onChangePatient="onChangePatient_self"
          :hasPatientGroup="hasPatientGroup"
        ></patientList>
      </div>
      <div
        class="right-part"
        v-loading="tableLoading"
        :class="{ noAllpage: !isAllCathterPage }"
      >
        <catheterList
          :cathterArr="cathterArr"
          @addCathter="addCathter"
          @updateTableConfig="updateTableConfig"
          ref="catheterList"
        />
        <div
          class="sheetTable-contain"
          :style="{
            width: `calc(100% - ${isAllCathterPage ? '280px' : '81px'} )`,
            marginLeft: `${isAllCathterPage ? '280px' : '81px'}`
          }"
          ref="scrollCon"
        >
          <cathterTabel
            @toPrint="toPrint()"
            @onChangePatient_self="onChangePatient_self"
            :title="tableInfo.formTitle"
            @changeShowTable="changeShowTable"
            :tabelConfig="tabelConfig"
            :tableInfo="tableInfo"
            v-if="showTable && !isMorePage"
            @updateTableConfig="updateTableConfig"
          />
          <div
            v-if="!showTable && !isMorePage"
            class="null-btn"
            flex="cross:center main:center"
            @click="addCathter"
          >
            <i class="el-icon-plus"></i>
            添加导管
          </div>
          <template v-if="showTable && isMorePage">
            <cathterTabel
              @toPrint="toPrint()"
              :ref="`cathterTabel_${index}`"
              @saveTableFn="saveTableFn"
              @onChangePatient_self="onChangePatient_self"
              :title="tableInfo.formTitle"
              @changeShowTable="changeShowTable"
              :tabelConfig="tableList"
              :tableInfo="tableInfo"
              @updateTableConfig="updateTableConfig"
              v-for="(tableList, index) in tabelConfig"
              :key="index"
              :pageNum="index + 1"
            />
          </template>
        </div>
      </div>
      <div id="printTable" ref="printTable">
        <printTable
          :tabelConfig="tabelConfig"
          :tableInfo="tableInfo"
          :config="config"
        >
        </printTable>
      </div>
    </div>
    <addCathter
      v-if="isAddCathter"
      @close="closeCathter"
      @create="createCathter"
    />
    <newCathter
      v-if="isCreateCathter"
      @getDate="getDate"
      @close="closeCreate"
      :newCathterType="newCathterType"
      @onChangePatient_self="onChangePatient_self"
    />
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  font-size:14px;
  margin: 0;
  background: #fff;
  border: 1px solid #CBD5DD;
  border-radius: 2px;

  &.fullpage {
    position: fixed !important;
    z-index: 10000;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0;
  }

  .head-con {
    height: 41px;
  }

  .body-con {
    position: relative;

    .left-part {
      width: 199px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: column
    }

    .right-part {
      margin-left: 199px;
      height: 100%;
      overflow: hidden;
      display:flex;
    }
  }
}

.dept-select-con {
  box-sizing: border-box;
  width: 199px;
  height: 41px;
  background: #F7FAFA;
  border-right: 1px solid #CBD5DD;
  border-bottom: 1px solid #EAEEF1;
  border-radius: 2px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  >>>.el-input__inner {
    width: 172px;
    height: 28px;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
    font-size: 12px;
  }
}

.sheetTable-contain {
  height: 100%;
  background: #DFDFDF;
  overflow: auto;
  padding: 5px 5px 15px;
  box-sizing: border-box;
  margin: 0 0 20px 0;
  position: relative;
}

.null-btn {
  position: absolute;
  top: 0px;
  bottom: 150px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 17px;
  color: #687179;
  width: 195px;
  height: 50px;
  background: #FFFFFF;
  border: 1px solid #ADB4BA;
  box-shadow: 0 1px 2px 0 rgba(200, 200, 200, 0.5);
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }

  i {
    margin-right: 4px;
  }
}
</style>
<style lang="stylus">
.noAllpage{
  .fix-table{
    top:51px!important;
  }
}
.cathter-icon {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 20px;
  text-align: center;
  color: #21a0ff;
  margin-left: 5px;
}
.has-file {
  position: absolute;
  left: 28px;
  top: 18px;
  width 20px;
}
#printTable{
  display: none
}
</style>
<script>
import printing from "printing";
import patientList from "@/Page/allCatheter/components/patient-list/patient-list.vue";
import catheterList from "@/Page/allCatheter/components/catheter-list/catheter-list.vue";
import addCathter from "@/Page/allCatheter/components/add-cathter/add-cathter.vue";
import newCathter from "@/Page/allCatheter/components/add-cathter/new-cathter.vue";
import cathterTabel from "@/Page/allCatheter/components/cathter-tabel/cathter-tabel.vue";
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import sheetInfo from "@/Page/allCatheter/components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import {
  getCatheterList,
  saveCatheter,
  getCatheterTable,
  getConfig
} from "@/Page/allCatheter/api/catheter";
import FollowList from "@/components/follow/index.vue";
import printTable from "@/Page/allCatheter/components/cathter-tabel/print-table-other.vue";
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: [] // 患者列表存放数组
      },
      patientListLoading: false, // 患者列表刷新动画
      pageLoading: false, // 页面刷新动画
      tableLoading: false, // 表格刷新动画
      bus: bus(this), // 事件总线
      sheetInfo, // 表单信息
      scrollTop: 0, // 顶部滚动距离
      cathterArr: [], // 导管列表存放数组
      isAddCathter: false, // 添加导管弹框
      isCreateCathter: false, // 新增导管详情弹框
      newCathterType: "", // 新增导管类型
      tabelConfig: [], // 表体数据
      tableInfo: {}, // 导管信息
      showTable: false, // 是否显示表体，用于组件销毁
      hasPatient: false, // 当前是否选中患者
      isMorePage: false, // 当前导管是否多页
      config: []
    };
  },
  computed: {
    // 判断路由是否主页导管（与患者详情页的导管作区分）
    isAllCathterPage() {
      return this.$route.path.includes("allCatheter");
    },
    // 计算内容高度
    containHeight() {
      // if (this.fullpage) {
      if (this.isAllCathterPage) {
        return this.wih - 62 + "px";
      } else {
        return this.wih - 112 + "px";
      }
      // } else {
      // return this.wih - 104 + "px";
      // }
    },
    // 当前选中的患者信息
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    hasFollowList() {
      return process.env.hasFollow;
    },
    hasPatientGroup() {
      return ["nfyksdyy"].includes(this.HOSPITAL_ID);
    }
  },
  methods: {
    async toPrint() {
      let res = await getConfig(this.tableInfo.code);
      this.config = res.data.data;
      document.getElementById("printTable").style.display = "block";
      setTimeout(() => {
        this.$nextTick(() => {
          console.log(this.$refs.printTable);
          printing(this.$refs.printTable, {
            direction: "horizontal",
            injectGlobalCss: true,
            scanStyles: false,
            // margin: 0 0;
            css: `

            `
          })
            .then(() => {
              document.getElementById("printTable").style.display = "none";
            })
            .catch(e => {});
        });
      }, 500);
    },
    // 更新导管数据
    refreshCatcherTable(code, type, id, patientId, visitId) {
      getCatheterTable(
        {
          code,
          type,
          id,
          patientId,
          visitId
        },
        code
      ).then(res => {
        // console.log(res);
        this.updateTableConfig(res.data.data);
      });
    },
    // 保存导管信息
    saveTableFn() {
      let { code, type, id, patientId, visitId } = this.tableInfo;
      let saveParams = [];
      // 如果是多页,将多页数据合并后再请求保存
      if (this.isMorePage) {
        let arr = [];
        this.tabelConfig.map((item, index) => {
          arr = [
            ...arr,
            ...this.$refs[`cathterTabel_${index}`][0]["_data"].tabelData
          ];
        });
        saveParams = arr;
      } else {
        saveParams = this.tabelConfig;
      }
      saveCatheter(
        {
          code,
          type,
          id,
          list: saveParams
        },
        code
      )
        .then(res => {
          this.$message.success("保存成功");
          this.refreshCatcherTable(code, type, id, patientId, visitId);
          this.getDate();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 获取患者列表数据及部分初始化
    getDate() {
      this.isMorePage = false;
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {
          showDvc: true,
          showFollew: true
        }).then(res => {
          this.data.bedList = res.data.data.filter(item => {
            return item.patientId;
          });
          this.patientListLoading = false;
          sheetInfo.isSave = true;
        });
      }
    },
    onChangePatient_self(info) {
      // 更改当前选中患者,更新导管列表
      this.showTable = false;
      this.hasPatient = true;
      this.cathterArr = [];
      this.$refs.catheterList.current = null;
      let { patientId, visitId, wardCode } = info;
      getCatheterList({
        patientId,
        visitId,
        wardCode
      }).then(res => {
        this.cathterArr = res.data.data.list;
      });
    },
    // 添加导管按钮事件
    addCathter() {
      if (!this.hasPatient) {
        this.$message.error("请先选择一名患者！");
        return;
      }
      this.isAddCathter = true;
    },
    // 关闭添加导管弹窗事件
    closeCathter() {
      this.isAddCathter = false;
    },
    // 关闭新增导管详情弹窗页面
    closeCreate() {
      this.isCreateCathter = false;
      this.isAddCathter = false;
    },
    // 添加导管详情弹窗
    createCathter(type) {
      this.newCathterType = type;
      this.isCreateCathter = true;
    },
    // 更新表体信息
    updateTableConfig(res) {
      this.isMorePage = false;
      this.showTable = false;
      this.tableInfo = { ...this.tableInfo, ...res };
      this.tabelConfig = [...this.tableInfo.list];
      console.log(this.tabelConfig);
      setTimeout(() => {
        this.showTable = true;
      });
    },
    // 切换表格显示
    changeShowTable(flag) {
      this.showTable = flag;
    }
  },
  created() {
    // 初始化
    if (this.deptCode) {
      this.getDate();
    }
  },
  watch: {
    patientInfo(val) {},
    tabelConfig(list, oldList) {
      if (list.length >= 17) {
        let arr = [];
        // let ids = [] // 打印id用
        this.isMorePage = true;
        for (let i = 0; i < list.length; i += 17) {
          if (list.length - i >= 17) {
            let ele = JSON.parse(JSON.stringify(list.slice(i, i + 17)));
            arr.push(ele);
            // ids.push(ele.map(item=>item.id))
          } else {
            let ele = JSON.parse(
              JSON.stringify(list.slice(i, list.length + 1))
            );
            arr.push(ele);
            // ids.push(ele.map(item=>item.id))
          }
        }
        list.length % 17 == 0 && arr.push([]);
        // console.log(ids);
        this.tabelConfig = [...arr];
      }
    },
    deptCode(val) {
      if (val) {
        this.cathterArr = [];
        this.$store.commit("upPatientInfo", {});
        this.getDate();
        // this.breforeQuit(() => {
        //   cleanData();
        //   this.getDate();
        // });
      }
    }
  },
  mounted() {
    // 对患者详情页的导管做默认渲染
    let patientInfo = this.$route.query;
    let isObj =
      Object.prototype.toString.call(patientInfo) == "[object Object]";
    let hasProp = JSON.stringify(patientInfo) != "{}";
    if (isObj && hasProp) {
      this.$store.commit("upPatientInfo", patientInfo);
      this.onChangePatient_self(patientInfo);
    }
  },
  components: {
    patientList,
    catheterList,
    addCathter,
    newCathter,
    cathterTabel,
    FollowList,
    printTable
  }
};
</script>
