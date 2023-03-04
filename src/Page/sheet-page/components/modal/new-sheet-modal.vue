<template>
  <div class="modal-con">
    <sweet-modal
      ref="newRecord"
      size="big"
      title="创建新护理文书"
      class="modal-record padding-0"
    >
      <div class="title-bar" flex="cross:center">
        <span class="type-text">选择科室</span>
        <el-select
          filterable
          v-model="this_deptCode"
          placeholder="选择科室"
          class="type-select"
          @change="changeDept"
        >
          <el-option
            v-for="item in allDeptList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
        <el-input
          class="text-con"
          :placeholder="'搜索记录单'"
          icon="search"
          v-model="searchWord"
        ></el-input>
      </div>
      <div class="record-con" v-loading="pageLoading">
        <div
          @click="openUrl(item)"
          @dblclick="create(item)"
          class="record-box"
          :class="{
            active: selectData == item,
          }"
          v-for="item of filterData"
          :key="item.id"
        >
          <el-row type="flex" align="middle">
            <img
              src="../../../../common/images/record/文件创建.png"
              alt
              height="35"
            />
            <span class="name" v-if="item.name">{{ item.name }}</span>
            <span class="name" v-if="item.recordName">{{
              item.recordName
            }}</span>
          </el-row>
          <!-- 开发环境区分用，做了判断的，正式不会有的 -->
          <el-row v-if="node_env=='development'">
            <p title="开发环境区分用，做了判断的，正式不会有的">
              {{item.recordCode}}
            </p>
          </el-row>
        </div>
      </div>
      <div slot="button" @click="newRecordClose">
        <el-button class="modal-btn">关闭</el-button>
        <el-button
          class="modal-btn"
          type="primary"
          @click="create"
          :disabled="!selectData"
          >创建</el-button
        >
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title-bar {
  height: 45px;
  background: #fff;
  border-bottom: 1px solid #EAEEF1;
  padding: 0 15px;
}

.type-select {
  >>>.el-input {
    width: 180px;
  }

  >>>.el-input__inner {
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
  }
}

.text-con {
  >>>&.el-input {
    width: 138px;
    margin-left: 10px;
  }

  >>>.el-input__inner {
    width: 138px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
  }
}

.record-con {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 10px 10px 10px;
  max-height: 420px;
  overflow: auto;

  .record-box {
    cursor: pointer;
    float: left;
    box-sizing: border-box;
    padding: 10px 10px 10px;
    width: 33%;
    height: 60px;

    &.active {
      background: #F0F5F3;
      border: 1px solid #C0D4CD;
      border-radius: 4px;
    }

    &.isvertical {
      width: 100% !important;
    }

    img {
      height: 35px;
    }

    .name {
      font-size: 13px;
      color: #687179;
      margin-left: 12px;
      height: 40px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}

.type-text {
  font-size: 13px;
  color: #687179;
  margin-right: 10px;
}
</style>

<script>
import { templates, listRecord, inform, healthEdu } from "@/api/patientInfo";
import commonMixin from "@/common/mixin/common.mixin";
import {createNewHomePage} from '../../api/index.js'
import { host } from "@/api/apiConfig";
import bus from "vue-happy-bus";
import { blockSave } from "../../api/index.js";
import { nursingUnit } from "@/api/lesion";
import th from "../config/joint/th.js";
export default {
  mixins: [commonMixin],
  data() {
    return {
      templates: [],
      options: [],
      this_deptCode: "",
      formType: "2",
      pageLoading: true,
      searchWord: "",
      bus: bus(this),
      selectData: "",
    };
  },
  methods: {
    open() {
      // this.templates = [];
      this.$refs.newRecord.open();
      // this.getData();
      // 判断是否借床病人
      // this.options
    },
    close() {
      this.$refs.modal.close();
    },
    openUrl(item) {
      if (item == this.selectData) {
        this.selectData = "";
      } else {
        this.selectData = item;
      }
    },
    createNewPageSetPage(blockId,endPageIndex){
      return new Promise((resolve, reject)=>{
        createNewHomePage(blockId,endPageIndex).then((res)=>{
          const resp = res.data.data
          if(res.data.data == 200){
            resolve(resp)
          }else{
            reject(resp)
          }
        }).catch((err)=>{
          reject(err)
        })
      })
    },
    create(data) {
      let item;
      if (data.formCode || data.recordCode) {
        item = data;
      } else {
        item = this.selectData;
      }
      const sheetBlockList = this.$parent.sheetBlockList.map((list)=>{
        return {sheetId:list.id,pageIndex:list.pageIndex,endPageIndex:list.endPageIndex}
      })
      blockSave(
        this.patientInfo.patientId,
        this.patientInfo.visitId,
        this.deptCode,
        item.recordCode
      ).then(async (res) => {
        await this.bus.$emit("getBlockList");
        if (res.data.data.id && ['zhzxy'].includes(this.HOSPITAL_ID) && sheetBlockList.length) {
          //先创建
          await this.createNewPageSetPage(res.data.data.id, Number(sheetBlockList[sheetBlockList.length - 1].endPageIndex) + 1)
        }
        await this.$message.success("创建成功");
        await this.bus.$emit("setSheetTableLoading", true);
      });
      this.newRecordClose();

    },
    newRecordClose() {
      this.$refs.newRecord.close();
    },
    getData() {
      this.pageLoading = true;
      if (!this.this_deptCode) return;
      listRecord(this.this_deptCode).then((res) => {
        this.templates = res.data.data.list;
        this.pageLoading = false;
      });
    },
    changeDept() {
      this.getData();
    },
  },
  computed: {
    node_env(){
      return process.env.NODE_ENV
    },
    filterData() {
      // if (["beihairenyi"].includes(this.HOSPITAL_ID)) {
      //   return this.templates.filter((item) => {
      //     return item.recordCode !== "infant_bh";
      //   });
      // }
      if (this.$route.name == "singleTemperatureChart") {
        return this.templates.filter((item) => {
          switch (this.HOSPITAL_ID) {
            case "huadu":
              return item.recordCode.indexOf("body_temperature_Hd") == 0;
            case "hj":
              return item.recordCode.indexOf("body_temperature_hj") == 0;
            case "wujing":
              return item.recordCode.indexOf("body_temperature_wj") == 0;
            default:
              break;
          }
          // if (this.HOSPITAL_ID === "huadu" || this.HOSPITAL_ID === "wujing") {
          //   return item.recordCode.indexOf("body_temperature_Hd") == 0;
          // } else if (this.HOSPITAL_ID === "liaocheng") {
          //   return item.recordCode.indexOf("body_temperature_lcey") == 0;
          // }
        });
      }

      if (this.searchWord) {
        this.selectData = "";
        return this.templates.filter((item) => {
          return item.recordName.indexOf(this.searchWord) > -1;
        });
      } else {
        return this.templates;
      }
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    allDeptList() {
      try {
        if (
          this.patientInfo.lendDeptCode &&
          !this.options.find(
            (item) => item.code == this.patientInfo.lendDeptCode
          )
        ) {
          return [
            ...this.options,
            {
              code: this.patientInfo.lendDeptCode,
              name: this.patientInfo.deptLend,
            },
          ];
        }
        return this.options;
      } catch (error) {}
      return this.options;
    },
  },
  created() {
    // 获取科室列表
    nursingUnit("/all").then((res) => {
      this.options = res.data.data.deptList;
      this.this_deptCode = this.deptCode;
    });
  },
  mounted() {
    this.bus.$on("openNewSheetModal", this.open);
  },
  watch: {
    formType() {
      this.getData();
      this.selectData = "";
    },
    deptCode() {
      this.deptCode && (this.this_deptCode = this.deptCode);
    },
  },
  components: {},
};
</script>
