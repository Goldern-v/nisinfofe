<template>
  <div class="health-education">
    <div class="health-education-list" v-if="['formPage', 'record'].includes($route.path)">
      <div class="treeTitle">健康教育单</div>
      <baseTree :configList="configList" class="baseTree"></baseTree>
    </div>
    <div
      class="health-education-table"
      :style="
        !['formPage', 'record'].includes($route.path)
          ? 'width:100%;margin:0;'
          : ''
      "
      v-loading="pageLoading"
    >
      <!-- 无推送内容 -->
      <div v-if="isData === 2 || isEmpty()" style="height:100%">
        <NullBg></NullBg>
        <div class="addBtn">
          <WhiteButton text="添加健康教育单" @click="addEducation" />
        </div>
      </div>

      <!-- 有推送内容 -->
      <!-- 操作按钮 -->
      <div class="main">
        <div class="tool-con" v-show="isData === 1">
          <div class="tool-fix">
            <WhiteButton text="添加" @click="onAdd"></WhiteButton>
            <WhiteButton
              text="修改"
              @click="onEdit"
              :disabled="!selected"
            ></WhiteButton>
            <WhiteButton
              text="删除当条"
              @click="onRemove"
              :disabled="!selected"
            ></WhiteButton>
            <WhiteButton
              text="推送"
              @click="onPush"
              :disabled="!selected"
            ></WhiteButton>
          </div>
          <div class="tool-fix tool-right">
            <WhiteButton text="新建教育单" @click="addEducation"></WhiteButton>
            <WhiteButton text="删除整单" @click="delectBlock"></WhiteButton>
            <WhiteButton text="打印预览" @click="toPrint"></WhiteButton>
          </div>
        </div>
        <!-- 教育单表单 -->
        <div class="healthContent">
          <div
            v-show="isData === 1"
            ref="HealthEducation"
            class="healthEducation health-page"
          >
            <div v-for="(item, index) in printTableData" :key="index + 'print'">
              <!-- 表单头部信息 -->
              <div class="health-education-head">
                <div class="hospital">
                  <img class="nfsd-img" src="./image/nfyksdyy.png" alt="logo" />
                </div>
                <div class="title" style="border-bottom: 1px solid #000;">
                  住院患者健康教育评估及实施记录单
                </div>
                <div>
                  <div class="sdyyinfo">
                    <span
                      >姓名：{{
                        patientInfo.name
                      }}</span
                    >
                    <span style="margin-left: 20px;"
                      >性别：{{
                        patientInfo.sex
                      }}</span
                    >
                    <span style="margin-left: 20px;"
                      >年龄：{{
                        patientInfo.age
                      }}</span
                    >
                    <span style="margin-left: 20px;"
                      >床号：{{
                        configList[0]? configList[0].children[index].bedExchange :  patientInfo.bedLabel
                      }}</span
                    >
                    <span
                      >住院号：{{
                        patientInfo.inpNo
                      }}</span
                    >
                  </div>
                  <div class="sdyyinfo" style="border-bottom: 1px solid #000;">
                    <span
                      >科室：{{
                         configList[0] ? configList[0].children[index].deptExchange : patientInfo.deptName
                      }}</span
                    >
                    <span style="margin-left: 20px;width: 372px;" >病区:{{
                      configList[0] ? configList[0].children[index].wardExchange : $route.query.wardName }}
                    </span>
                  </div>
                </div>
              </div>
              <!-- 表单内容 -->
              <Table
                :index="index"
                :page="printTableData.length"
                :pageParam="item ? item : pageParam"
                ref="tableParams"
                :selected.sync="selected"
                @dblclick="onEdit"
              />
            </div>
          </div>
          <!-- 弹框 -->
          <EditModal
            :blockId="blockId"
            ref="editModal"
            @confirm="pullData"
            :pageParam="pageParam"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteButton from "@/components/button/white-button.vue"; // 添加按钮
import NullBg from "@/components/null/null-bg.vue"; // 页面初始化背景
import Table from "./components/table"; // 表单
import EditModal from "./components/editModal"; // 添加修改弹窗
import changeMajorRadio from '@/Page/sheet-page/components/modal/changeMajorRadio.vue'
import {
  getAllByPatientInfo,
  saveEducation,
  deleteMission,
  pushMission,
  getEduFormList,
  deleteBlock
} from "./api/healthApi";
import dayjs from "dayjs";
import { setTimeout } from "timers";
import baseTree from "@/components/baseTree/baseTree";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
export default {
  mixins: [common],
  name: "healthEducation",
  props: {
    hasTagsView: Boolean,
  },
  components: {
    Table,
    WhiteButton,
    EditModal,
    NullBg,
    baseTree,
    changeMajorRadio
  },
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      selectValue: "",
      sheetBlockList: [],
      blockId: -1, // 记录单Id
      isData: 2, // 是否有数据 1-有 2-没有
      total: 0, // 总条数
      printTableData: [0], // 打印是表格分页数据
      array: [],
      pageParam: [], // 表格数据
      selected: null, // 选择某行
      configList: [],
    };
  },
  computed: {
    patientInfo() {
      return this.$route.query;
    }
  },
  created() {
    this.init();
  },
  methods: {
    isEmpty() {
      return ['/formPage', '/record'].includes(this.$route.path) && !this.hasTagsView;
    },
    // 获取下拉框数据列表
    init() {
      this.getSelectData(1);
      this.getTableData();
    },
    getSelectData(index) {
      let { visitId, patientId } = this.$route.query;
      let params = {
        visitId,
        patientId
      };
      getEduFormList(params)
        .then(res => {
          let that = this;
          this.sheetBlockList = res.data.data;
          if (res.data.data.length === 0) {
            this.isData = 2; // 如果没数据 直接显示 添加健康教育单按钮
            this.configList = [
              {
                label: "健康教育单",
                children: []
              }
            ];
            return;
          }
          let array = [];
          res.data.data.map(item => {
            array.push({
              label: `健康教育单 ${item.creatDate}`,
              bedExchange: item.bedExchange,
              deptExchange: item.deptExchange,
              wardExchange: item.wardExchange,
              onClick() {
                that.changeEducation(item.id);
              }
            });
          });
          this.configList = [
            {
              label: "健康教育单",
              children: array
            }
          ];
          this.bus.$emit('refreshTree');
          if (res.data.data && res.data.data.length && !index) {
            this.bus.$emit("mountTag", {
              label: `健康教育单 ${res.data.data[0].creatDate}`,
              type: "healthEducation",
              ...res.data.data[0]
            });
          }
          if (index) {
            // 初始化默认第一张单子
            this.changeEducation(res.data.data[0].id);
            this.isData = 1;
          }
        })
        .catch(e => {});
    },
    // 切换教育单
    changeEducation(id) {
      (this.blockId = id), this.getTableData();
    },
    // 获取表格数据
    getTableData() {
      this.pageLoading = true;
      let { visitId, patientId } = this.$route.query;
      getAllByPatientInfo(this.blockId)
        .then(res => {
          let data = res.data.data;
          this.pageParam = data.slice();
          this.total = data.length;
          this.pageLoading = false;
        })
        .catch(() => {
          this.pageLoading = false;
        });
    },
    // 新建教育单
    async addEducation() {
      if (this.$route.query.patientId) {
        await this.$confirm("确定要新建教育单吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        let queryInfo = this.$route.query;
        let params = {
          patientId: queryInfo.patientId,
          visitId: queryInfo.visitId,
          patientName: queryInfo.patientName,
          bedLabel: queryInfo.bedLabel,
          wardCode: queryInfo.wardCode,
          wardName: queryInfo.wardName,
          creatDate: dayjs().format("YYYY-MM-DD HH:mm")
        };
        saveEducation(params)
          .then(res => {
            this.blockId = res.data.data.id;
            this.pageParam = [];
            this.isData = 1;
            this.getSelectData();
          })
          .catch(e => {});
      } else {
        this.$message.warning("请先选择一名患者");
      }
    },
    // 删除
    async onRemove() {
      await this.$confirm(
        "确定要删除该条宣教内容吗？删除后将无法恢复！",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      let id = this.selected["item"].id;
      await deleteMission(id);
      this.pullData();
      this.$message.success("删除成功！");
      this.selected = null;
    },

    //删除整单
    async delectBlock() {
      await this.$confirm(
        "确定要删除该健康教育单吗？删除后将无法恢复！",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      await deleteBlock(this.blockId);
      this.bus.$emit("formTagClose", { id: this.blockId });
      this.pullData();
      this.getSelectData(1);
      this.$message.success("删除成功！");
      this.selected = null;
    },

    // 更新列表数据
    async pullData(item) {
      this.getTableData();
      this.selected = null;
    },
    // 添加
    onAdd() {
      this.$refs.editModal.open("添加健康宣教");
    },
    // 修改
    onEdit(data) {
      this.$refs.editModal.open("编辑健康宣教", data || this.selected);
    },
    // 推送
    async onPush() {
      let queryInfo = this.$route.query;
      let selected = this.selected["item"];
      let params = {
        list: [
          {
            id: selected.id, // 每条推送对应的id
            patientId: queryInfo.patientId, // 病人id
            patientName: queryInfo.name, // 病人姓名
            visitId: queryInfo.visitId, //"1",
            bedLabel: queryInfo.bedLabel, // 床头号
            eduFormCode: "form_edu",
            wardCode: queryInfo.wardCode, // 科室号
            wardName: queryInfo.wardName, // 科室名
            missionId: selected.missionId, // 宣教标题对应id
            title: selected.title, // 宣教标题
            address: selected.address, // 地址
            type: selected.type, // 类型
            status: selected.status, // 推送状态（）
            pusher: selected.pusher, // 推送人
            pusherName: selected.pusherName, // 推送人名
            pushDate: dayjs().format("YYYY-MM-DD HH:mm") // "01-09 09:28:22"
          }
        ]
      };
      this.pageLoading = true;
      try {
        await pushMission(params);
        this.$message.success("推送成功！");
      } catch (e) {
      } finally {
        this.pageLoading = false;
      }
    },
    // 打印时处理分页函数
    setPageData() {
      const tableMaxHeight = 760; // 表格最大高度 240 = 头部信息高度 + 表头高度 + 页码高度
      let allTr = document.querySelectorAll(
        ".healthEducation table .health-tr"
      );
      let height = 0;
      let number = 0;
      let page = 1;
      allTr.forEach((item, index) => {
        height += item.offsetHeight;
        if (height > tableMaxHeight) {
          height = 0;
          this.$set(this.array, page - 1, this.pageParam.slice(number, index));
          number = index;
          page++;
        } else {
          this.$set(this.array, page - 1, this.pageParam.slice(number, index));
        }
      });
      this.printTableData = this.array.slice();
    },
    // 打印
    toPrint() {
      this.$refs.tableParams[0].print();
      if (this.pageParam.length > 30) {
        this.setPageData();
      }
      setTimeout(() => {
        window.localStorage.healthPrintPage = $(
          this.$refs.HealthEducation
        ).html();
        if (process.env.NODE_ENV === "production") {
          let newWid = window.open();
          newWid.location.href = "/crNursing/print/health";
        } else {
          this.$router.push(`/print/health`);
        }
      }, 500);
    }
  }
};
</script>

<style scoped lang="scss">
.health-education {
  display: flex;
  .health-education-list {
    width: 20%;
    height: calc(100vh - 65px);
    background: #fff;
    margin: 10px 0 5px 15px;
    border: 1px solid #cbd5dd;
    box-sizing: border-box;
    .treeTitle {
      height: 35px;
      background: #f7fafa;
      padding: 0 13px;
      border-bottom: 1px solid #eaeef1;
      font-size: 13px;
      color: #333;
      font-weight: bold;
      line-height: 35px;
    }
    .baseTree {
      overflow: auto;
      height: calc(100vh - 98px);
    }
  }
  .nfsd-img {
    text-align: center;
    width: 300px;
    height: 60px;
  }
  .health-education-table {
    width: 80%;
    height: calc(100vh - 65px);
    box-sizing: border-box;
    border: 1px solid #cbd5dd;
    margin: 10px 10px 5px 0;
    border-left: none;
    overflow: hidden;
    .addBtn {
      margin-top: 20px;
      text-align: center;

      /deep/ .white-btn {
        margin-right: 0 !important;
      }
    }
    .healthEducation {
      margin: 60px auto;
      background: #ffffff;
      width: 700px;
      padding: 20px;
      box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.5);
      position: relative;
    }
    .tool-con {
      background-image: linear-gradient(-180deg, #f8f8fa 0%, #ebecf0 100%);
      border-bottom: 1px solid #cbd5dd;
      height: 36px;
      .tool-fix {
        float: left;
        margin-left: 10px;
        margin-top: 4px;
        /deep/ .white-btn {
          justify-content: center !important;
          text-align: center !important;
          height: 26px !important;
          color: #333 !important;
        }
      }
      .tool-right {
        float: right;
        margin-right: 10px;
      }
    }
    .healthContent {
      overflow: auto;
      height: calc(100vh - 105px);
      width: 100%;
    }
  }
  .main {
    background: #eaeaea;
  }
}
.health-education-head {
  padding: 10px;
  .hospital {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
  }
  .title {
    font-size: 21px;
    padding: 10px 0 0px;
    text-align: center;
    font-weight: bold;
    margin-top: 5px;
  }
  .info {
    margin-top: 25px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    font-size: 13px; // 小四
  }
  .nfsd-img {
    text-align: center;
    width: 300px;
    height: 60px;
  }
  .sdyyinfo {
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    font-size: 13px; // 小四
  }
}
</style>
