<template>
<div class="health-education" v-loading="pageLoading">

  <!-- 无推送内容 -->
  <div v-if="isData === 2" style="height:100%">
    <NullBg></NullBg>
    <div class="addBtn">
      <WhiteButton text="添加健康教育单" @click="onAddTable" />
    </div>
  </div>

  <!-- 有推送内容 -->
  <!-- 操作按钮 -->
  <div class="tool-con" v-show="isData === 1">
    <div class="tool-fix">
      <WhiteButton text="添加" @click="onAdd"></WhiteButton>
      <WhiteButton text="修改" @click="onEdit" :disabled="!selected"></WhiteButton>
      <WhiteButton text="删除" @click="onRemove" :disabled="!selected"></WhiteButton>
      <WhiteButton text="推送" @click="onPush" :disabled="!selected" ></whiteButton>
      <WhiteButton text="打印预览" @click="toPrint"></WhiteButton>
    </div>
    <div class="tool-fix tool-right">
      <WhiteButton text="新建教育单" @click="makeNew"></WhiteButton>
      <WhiteButton text="新建教育单"></WhiteButton>
    </div>
  </div>

  <div v-show="isData === 1" class="healthEducation">
    <!-- 表单 -->
    <div ref="Contain">

      <!-- 表单头部信息 -->
      <div class="health-education-head">
        <div class="hospital">东 莞 市 厚 街 医 院</div>
        <div class="title">住院患者健康教育评估及实施记录单</div>
        <div class="info">
              <span>病人姓名：{{patientInfo.name}}</span>
              <span>性别：{{patientInfo.sex}}</span>
              <span>年龄：{{patientInfo.age}}</span>
              <span>科室：{{patientInfo.deptName}}</span>
              <span>床号：{{patientInfo.bedLabel}}</span>
              <span>住院号：{{patientInfo.inpNo}}</span>
        </div>
      </div>

      <!-- 表单内容 -->
      <Table @isShowTable="isShowTable" ref="tableParams" :selected.sync="selected" @dblclick="onEdit"/>
    </div>

    <!-- 弹框 -->
    <EditModal ref="editModal" @confirm="pullData"/>
  </div>
</div>
</template>

<script>
import WhiteButton from "@/components/button/white-button.vue"; // 添加按钮
import NullBg from "@/components/null/null-bg.vue"; // 页面初始化背景
import Table from './components/table'
import EditModal from "./components/editModal";
// import makeNewModal from "../components/makeNewModal";

import { getMissionPageParamById, deleteMission, pushMission } from './api/healthApi'
import dayjs from 'dayjs'
import { setTimeout } from 'timers';

export default {
  name: "healthEducation",
  components: {
    Table,
    WhiteButton,
    EditModal,
    NullBg
  },

  data() {
    return {
      pageLoading: true,
      isData: 2, // 是否有数据 1-有 2-没有
      selected: null // 选择某行
    };
  },

  computed: {
    patientInfo () {
      return this.$route.query;
    }
  },

  methods:{
    // 控制表格是否显示
    isShowTable (val) {
      this.isData = val
      this.pageLoading = false
    },
    // 无数据时点击打开表单
    onAddTable() {
      if (this.$route.query.patientId) {
        this.isData = 1
      } else {
        this.$message.warning("请先选择一名患者");
      }
    },

    // 删除
    async onRemove() {
      await this.$confirm(
        "确定要删除该健康教育单吗？删除后将无法恢复！",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      let id = this.selected['item'].id
      await deleteMission(id);
      this.pullData()
      this.$message.success('删除成功！')
      this.selected = null;
    },
    // 更新列表数据
    async pullData (item) {
      this.$refs.tableParams.getTableData()
      this.selected = null;
    },
    // 添加
    onAdd() {
      this.$refs.editModal.open("添加健康宣教");
    },
    // 修改
    onEdit (data) {
      this.$refs.editModal.open("编辑健康宣教", data || this.selected);
    },

    makeNew() {

    },

    // 推送
    async onPush () {
      let queryInfo = this.$route.query
      let selected = this.selected['item']
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
            pushDate: dayjs().format("MM-DD HH:mm") // "01-09 09:28:22"
          }
        ]
      };
      this.pageLoading = true
      try {
        await pushMission(params)
        this.$message.success('推送成功！')
      } catch (e) {
      } finally {
        this.pageLoading = false
      }
    },
    // 打印
    toPrint() {
      // this.$refs.tableParams.concealpagination()
      setTimeout(() => {
        window.localStorage.sugarModel = $(this.$refs.Contain).html();
        if (process.env.NODE_ENV === "production") {
          let newWid = window.open();
          newWid.location.href = "/crNursing/print/sugar";
        } else {
          this.$router.push(`/print/sugar`);
        }
      }, 300)
    },
  }
}
</script>

<style scoped lang='scss'>
  .health-education {
    min-height: calc(100vh - 65px);
    overflow: hidden;
    .addBtn {
      margin-top: 20px;
      text-align: center;

      /deep/ .white-btn {
        margin-right: 0 !important;
      }
    }
    .healthEducation{
      margin: 60px auto;
      background: #ffffff;
      width: 706px;
      padding: 20px;
      min-height: 945px;
      box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.5);
      position: relative;
    }
    .tool-con {
      width: calc(100vw - 200px);
      height: 50px;
      /* background: yellow; */
      background: #f2f2f2;
      position: fixed;
      top: 50px;
      z-index: 100;
      .tool-fix {
        float: left;
        margin-left: 10px;
        /deep/ .white-btn {
          justify-content: center !important;
          text-align: center !important;
        }
        .btn-con + .btn-con {
          margin-top: 10px;
        }
      }
      .tool-right{
        float: right;
        margin-right: 10px;
      }
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
  }

</style>
