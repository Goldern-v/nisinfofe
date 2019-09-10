<template>
<div class="health-education" v-loading="pageLoading">
  <div ref="Contain">
  <!-- 无推送内容 -->
  <div v-if="isData === 2" style="height:100%">
    <NullBg></NullBg>
    <div class="addBtn">
      <WhiteButton text="添加健康教育单" @click="addEducation" />
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
      <WhiteButton text="新建教育单" @click="addEducation"></WhiteButton>
      <el-select
        v-model="selectValue"
        @change="changeSelectBlock"
        default-first-option
        value-key="id"
        placeholder="请选择健康教育单"
        class="select-con"
        popper-class="sheetSelect-con-sheet"
      >
        <div class="head-con" flex="cross:stretch">
          <div class="col-2">科室</div>
          <div class="col-3">开始时间</div>
        </div>
        <el-option
          v-for="item in sheetBlockList"
          :key="item.id"
          :label="blockLabel(item, sheetBlockList.length)"
          :value="item"
        >
          <div class="list-con" flex="cross:stretch">
            <div class="col-2" :title="item.wardName">{{item.wardName}}</div>
            <div class="col-3" :title="item.creatDate">{{item.creatDate}}</div>
          </div>
        </el-option>
      </el-select>
    </div>
  </div>

  <div v-show="isData === 1" ref="HealthEducation" class="healthEducation health-page">
    <!-- 表单 -->
    <div v-for="(item, index) in printTableData" :key="index + 'print'" ref="Contain">

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
      <Table :index="index" :page="printTableData.length" :pageParam="item ? item : pageParam" ref="tableParams" :selected.sync="selected" @dblclick="onEdit"/>

      <!-- 页码 -->
      <!-- <div class="health-table-page">{{`第${index + 1}/${printTableData.length}页`}}</div> -->
    </div>
  </div>

  <!-- 弹框 -->
  <EditModal :blockId="blockId" ref="editModal" @confirm="pullData"/>
  </div>
</div>
</template>

<script>
import WhiteButton from "@/components/button/white-button.vue"; // 添加按钮
import NullBg from "@/components/null/null-bg.vue"; // 页面初始化背景
import Table from './components/table' // 表单
import EditModal from "./components/editModal"; // 添加修改弹窗
import { getMissionPageParamById, getAllByPatientInfo, saveEducation, deleteMission, pushMission, getEduFormList } from './api/healthApi'
import dayjs from 'dayjs'
import print from "printing";
import { setTimeout } from 'timers';
import { homedir } from 'os';
import formatter from "./right-print-formatter";

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
      pageLoading: false,
      selectValue: '',
      sheetBlockList: [],
      blockId: 0, // 记录单Id
      isData: 2, // 是否有数据 1-有 2-没有
      total: 0, // 总条数
      printTableData: [0], // 打印是表格分页数据
      array: [],
      pageParam: [], // 表格数据
      selected: null // 选择某行
    };
  },
  computed: {
    patientInfo () {
      return this.$route.query;
    }
  },
  created () {
    this.getSelectData()
    this.getTableData()
  },
  methods:{
    // 获取下拉框数据列表
    getSelectData () {
      let { visitId, patientId } = this.$route.query
      let params = {
        visitId,
        patientId
      }
      getEduFormList(params).then(res => {
        this.sheetBlockList = res.data.data
      }).catch(e => {
      })
    },
    blockLabel(item, length) {
      return `${item.wardName} ${dayjs(item.creatDate).format(
        "MM-DD"
      )}建 共${length}张
      `;
    },
    // 获取表格数据
    getTableData () {
      this.pageLoading = true
      let { visitId, patientId } = this.$route.query
      getAllByPatientInfo(this.blockId).then(res => {
        this.isData = res.data.data.length > 0 ? 1 : 2
        let data = res.data.data
        this.pageParam = data.slice()
        this.total = data.length
        this.pageLoading = false
      }).catch(() => {
      this.pageLoading = false
      })
    },
    // 下拉框变化
    changeSelectBlock (value) {
      this.blockId = value.id,
      this.getTableData(),
      console.log(this.blockId)
    },

    // 新建教育单
    async addEducation () {
      await this.$confirm(
        "确定要新建教育单吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      let queryInfo = this.$route.query
      let params = {
        patientId: queryInfo.patientId,
        visitId: queryInfo.visitId,
        patientName: queryInfo.patientName,
        bedLabel: queryInfo.bedLabel,
        wardCode: queryInfo.wardCode,
        wardName: queryInfo.wardName,
        creatDate: dayjs().format("YYYY-MM-DD HH:mm"),
      }
      saveEducation(params).then(res => {
        this.blockId = res.data.data.id
        this.pageParam = []
        this.isData = 1
        this.getSelectData ()
        console.log(this.blockId)
      }).catch(e => {
      })
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
      this.getTableData()
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
            pushDate: dayjs().format("YYYY-MM-DD HH:mm") // "01-09 09:28:22"
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
    // 打印时处理分页函数
    setPageData () {
      // const A4Rate = 297 / 210; // 打印区域长宽比
      // const dowWidth = 700;// 页面宽度
      const tableMaxHeight = 721;// 表格最大高度 240 = 头部信息高度 + 表头高度 + 页码高度
      let allTr = document.querySelectorAll('.healthEducation table .health-tr')
      let height = 0
      let number = 0
      let page = 1
      allTr.forEach((item, index) => {
        height += item.offsetHeight
        if (height > tableMaxHeight) {
          height = 0
          this.$set(this.array, page - 1, this.pageParam.slice(number, index))
          number = index
          page++
        } else {
          this.$set(this.array, page - 1, this.pageParam.slice(number, index))
        }
      })
      this.printTableData = this.array.slice()
    },
    // 打印
    toPrint() {
      this.setPageData()
      setTimeout(() => {
        window.localStorage.healthPrintPage = $(this.$refs.HealthEducation).html();
        if (process.env.NODE_ENV === "production") {
          let newWid = window.open();
          newWid.location.href = "/crNursing/print/health";
        } else {
          this.$router.push(`/print/health`);
        }
      }, 500)
    }
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
    .healthEducation {
      margin: 60px auto;
      background: #ffffff;
      width: 660px;
      padding: 20px;
      /* min-height: 1000px; */
      box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.5);
      position: relative;
    }

    .tool-con {
      width: calc(100vw - 200px);
      height: 50px;
      background: #f2f2f2;
      position: fixed;
      top: 50px;
      z-index: 100;
      .tool-fix {
        float: right;
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
        float: left;
        margin-right: 10px;
        .sheetSelect-con-sheet {
            background: #FFFFFF;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            width: 562px !important;
            right: auto !important;
            left: 120px !important;

            .el-select-dropdown__list, .el-select-dropdown__item {
              padding: 0;
              height: auto;
            }

            .el-select-dropdown__wrap {
              max-height: 500px;
            }

            .head-con {
              height: 37px;
              background: #F7FAFA;
              border-bottom: 1px solid #EAEEF1;
              font-size: 13px;
              color: #333333;
              font-weight: bold;
            }

            .col-1, .col-2, .col-3, .col-4 {
              display: flex;
              align-items: center;
            }

            .col-1 {
              width: 192px;
              padding: 0 24px;
              border-right: 1px solid #EAEEF1;
            }

            .col-2 {
              width: 126px;
              padding: 0 16px;
              border-right: 1px solid #EAEEF1;
            }

            .col-3 {
              width: 133px;
              padding: 0 14px;
              border-right: 1px solid #EAEEF1;
            }

            .col-4 {
              width: 80px;
              padding: 0 14px;
            }

            .list-con {
              font-size: 13px;
              color: #333333;
              height: 37px;
              border-bottom: 1px solid #EAEEF1;
            }

            .el-select-dropdown__item.selected {
              background: #fff;
              position: relative;

              &:after {
                content: '';
                position: absolute;
                right: 0;
                top: 9px;
                height: 20px;
                width: 4px;
                background: #4bb08d;
              }
            }

            .el-select-dropdown__item.hover {
              background: #fff;
            }

            .el-select-dropdown__item:hover {
              background: #E5F1F0;
            }
        }
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
