<template>
  <div class="modal-con">
    <sweet-modal ref="newRecord" size="big" title="创建新护理文书" class="modal-record padding-0">
      <div class="title-bar" flex="cross:center">
        <span class="type-text">护理文书类型</span>
        <span class="type-text">选择科室</span>
        <el-select
          v-model="this_deptCode"
          filterable
          placeholder="选择类型"
          class="type-select"
          @change="changeDept"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>

        <el-input
          class="text-con"
          :placeholder="'搜索' + (formType == 2?'维护单':'')"
          icon="search"
          v-model="searchWord"
        ></el-input>
      </div>
      <div class="record-con" v-loading="pageLoading">
        <div
          @click="openUrl(item)"
          @dblclick="create(item)"
          class="record-box"
          :class="{active: selectData == item}"
          v-for="item of filterData"
          :key="item.id"
        >
          <el-row type="flex" align="middle">
            <img src="../../../../common/images/record/文件创建.png" alt height="35" >
            <span class="name" v-if="item.name">{{item.name}}</span>
            <span class="name" v-if="item.recordName">{{item.recordName}}</span>
          </el-row>
        </div>
      </div>
      <div slot="button" @click="newRecordClose">
        <el-button class="modal-btn">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="create" :disabled="!selectData">创建</el-button>
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
import { listRecord } from "../../api/index.js";
import commonMixin from "@/common/mixin/common.mixin";
import { host } from "@/api/apiConfig";
import bus from "vue-happy-bus";
import { blockSave } from "../../api/index.js";
import { nursingUnit } from "@/api/lesion";
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
      selectData: ""
    };
  },
  methods: {
    open() {
      // this.templates = [];
      this.$refs.newRecord.open();
      // this.getData();
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
      if (data.formCode || data.recordCode) {
        item = data;
      } else {
        item = this.selectData;
      }
      blockSave(
        this.patientInfo.patientId,
        this.patientInfo.visitId,
        this.deptCode,
        item.formCode,
        item.formType
      ).then(res => {
        this.bus.$emit("getBlockList");
        this.$message.success("创建成功");
        this.bus.$emit("refrehDeepPatientList");
      });
      this.newRecordClose();
    },
    newRecordClose() {
      this.$refs.newRecord.close();
    },
    getData() {
      this.pageLoading = true;
      if (!this.this_deptCode) return;
      listRecord(this.this_deptCode).then(res => {
        this.templates = res.data.data.list;
        this.pageLoading = false;
      });
    },
    changeDept() {
      this.getData();
    }
  },
  computed: {
    filterData() {
      if (this.searchWord) {
        this.selectData = "";
        return this.templates.filter(item => {
          return item.recordName.indexOf(this.searchWord) > -1;
        });
      } else {
        return this.templates;
      }
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    }
  },
  created() {
    // 获取科室列表
    nursingUnit("/all").then(res => {
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
    }
  },
  components: {}
};
</script>
