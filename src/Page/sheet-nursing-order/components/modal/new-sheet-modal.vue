<template>
  <div class="modal-con">
    <sweet-modal
      ref="newRecord"
      size="big"
      title="创建新护嘱单"
      class="modal-record padding-0"
    >
      <div class="title-bar" flex="cross:center">
        <span class="type-text">护嘱单类型</span>
        <el-select
          v-model="formType"
          placeholder="选择类型"
          class="type-select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          class="text-con"
          :placeholder="'搜索护嘱单'"
          icon="search"
          v-model="searchWord"
        ></el-input>
      </div>
      <div class="record-con" v-loading="pageLoading">
        <div
          @click="openUrl(item)"
          @dblclick="create(item)"
          class="record-box"
          :class="{ active: selectData == item }"
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
    width: 126px;
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
  margin: 0;
  padding: 10px 10px 10px;
  height: 420px;
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
import { host } from "@/api/apiConfig";
import { updateListData } from "@/Page/sheet-nursing-order/components/config/general/tr.js";
import { updateListDataHj } from "@/Page/sheet-nursing-order/components/config/general/tr_hj.js";
import bus from "vue-happy-bus";
import { blockSave } from "../../api/index.js";
import {
  findTemplatesByDeptCode,
  findTemplatesByDeptCodeCN,
} from "../../api/nursingOrder.js";
import sheetInfo from "../config/sheetInfo/index.js";

export default {
  mixins: [commonMixin],
  data() {
    return {
      templates: [],
      options: [
        {
          value: "2",
          label: "护嘱单",
        },
      ],
      formType: "2",
      pageLoading: true,
      searchWord: "",
      bus: bus(this),
      selectData: "",
      dictFormName: "", //'神内护嘱单'
    };
  },
  methods: {
    open() {
      this.templates = [];
      this.$refs.newRecord.open();
      this.getData();
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
    create(data) {
      let item;
      if (data.name || data.formCode || data.recordCode) {
        item = data;
      } else {
        item = this.selectData;
      }
      // blockSave(this.patientInfo.patientId, this.patientInfo.visitId, this.deptCode, item.recordCode).then(res => {
      //   this.bus.$emit('getNOBlockList')
      //   this.$message.success('创建成功')
      // })
      console.log("create:data", data, "item:", item);
      //
      if (!item || !item.orderContentCode) {
        console.log("create:error", data, "item:", item);
        return;
      }
      //
      this.dictFormName = item.orderContentCode.split(":")[2] || "";

      sheetInfo.orderContentCode = item.orderContentCode;
      // 字典更新
      // todo
      let dicData = {
        type: "orders",
        code: "public",
        formName: this.dictFormName,
      };
      console.log("create字典更新", dicData);
      if (this.HOSPITAL_ID === "hj") {
        updateListDataHj(dicData);
      } else {
        updateListData(dicData);
      }
      this.bus.$emit("createNursingOrderPage", false, item.name);
      this.newRecordClose();
    },
    newRecordClose() {
      this.$refs.newRecord.close();
    },
    getData() {
      this.pageLoading = true;
      let defaultList = {
        deptCode: this.$route.query.deptCode || "", // 4003
        deptName: this.$route.query.deptName || "",
        hasRelDept: false,
        recordCode: "", //general_surgery
        recordName: "护嘱单",
        dictFormName: "",
      };
      // console.log('getData:',this.$route.query)
      // findTemplatesByDeptCode
      findTemplatesByDeptCodeCN(this.deptCode).then((res) => {
        console.log("findTemplatesByDeptCode:", res);
        this.templates = res.data.data;
        // this.templates = res.data.data.list
        //
        if (this.templates.length == 0) {
          // this.templates.push(defaultList)
        }
        if (this.templates.length == 1) {
          this.create(this.templates[0])
        }
        //
        // this.templates.map(item=>{
        //   item.recordName = "护嘱单"
        // })
        this.pageLoading = false;
      });
    },
  },
  computed: {
    filterData() {
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
  },
  mounted() {
    this.bus.$on("openNewNOrderSheetModal", this.open);
  },
  watch: {
    formType() {
      this.getData();
      this.selectData = "";
    },
  },
  components: {},
};
</script>
