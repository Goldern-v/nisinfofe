
<template>
  <div class="contain" :class="{fullpage}" v-loading="pageLoading" element-loading-text="正在保存">
    <div class="head-con" flex>
      <div class="dept-select-con"></div>
      <div class="tool-con" flex-box="1">
        <sheetTool></sheetTool>
      </div>
    </div>
    <div class="body-con" id="sheet_body_con" :style="{height: containHeight}">
      <div class="left-part">
        <patientList :data="data.bedList" v-loading="patientListLoading"></patientList>
      </div>
      <div class="right-part">
        <div class="sheetTable-contain">
          <span
            v-if="!((store.selectedForm && store.selectedForm.id) === undefined)"
            v-loading="tableLoading"
            class="form-warrper"
          >
            <iframe
              :src="formUrl"
              :style="{height: formBoxHeight + 'px', width: '100%'}"
              frameborder="0"
              @load="onload"
              ref="formCon"
              id="healthIframe"
            ></iframe>
          </span>
          <div
            v-else
            class="null-btn"
            flex="cross:center main:center"
            @click="bus.$emit('addHealthEdu')"
          >
            <i class="el-icon-plus"></i> 创建健康宣教
          </div>
        </div>
      </div>
    </div>
    <newHealthEduForm ref="newHealthEduForm"></newHealthEduForm>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 0
  background #fff
  border 1px solid #CBD5DD
  border-radius 2px
  &.fullpage
    position fixed !important
    z-index 10000
    left 0
    top 0
    bottom 0
    right 0
    margin 0
  .head-con
    height 41px
  .body-con
    position relative
    .left-part
      width 199px
      position absolute
      left 0
      top 0
      bottom 0
    .right-part
      margin-left 199px
      height 100%
      overflow hidden
.dept-select-con
  box-sizing border-box
  width 199px
  height 41px
  background #F7FAFA
  border-right 1px solid #CBD5DD
  border-bottom 1px solid #EAEEF1
  border-radius 2px 0 0 0
  display flex
  justify-content center
  align-items center
  >>>.el-input__inner
    width 172px
    height 28px
    border 1px solid #C2CBD2
    border-radius 4px
    font-size 12px
.sheetTable-contain
  height 100%
  background #DFDFDF
  overflow auto
  padding 15px 5px 15px
  box-sizing border-box
  margin 0 auto 20px
  position relative
.null-btn
  position absolute
  top 0px
  bottom 150px
  left 0
  right 0
  margin auto
  font-size 17px
  color #687179
  width 195px
  height 50px
  background #FFFFFF
  border 1px solid #ADB4BA
  box-shadow 0 1px 2px 0 rgba(200, 200, 200, 0.5)
  border-radius 2px
  cursor pointer
  &:hover
    background #fafafa
  i
    margin-right 4px
.form-warrper
  border-radius: 2px;
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0px 5px 10px 0 rgba(0,0,0,0.5);
  box-shadow: 0px 5px 10px 0 rgba(0,0,0,0.5);
  padding: 20px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 762px;
  margin: 0 auto;
  min-height 800px
  display block
</style>
<script>
import sheetTool from "./components/sheet-tool/sheet-tool.vue";
import patientList from "./components/patient-list/patient-list.vue";
import common from "@/common/mixin/common.mixin.js";
import { deleteMission } from "./api";
import store from "./store/index.js";
import { patients } from "@/api/lesion";
import bus from "vue-happy-bus";
import newHealthEduForm from "./modal/new-healthEdu-form.vue";
import qs from "qs";
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: []
      },
      patientListLoading: false,
      pageLoading: false,
      tableLoading: false,
      bus: bus(this),
      store,
      formBoxHeight: 500
    };
  },
  computed: {
    containHeight() {
      if (this.fullpage) {
        return this.wih - 44 + "px";
      } else {
        return this.wih - 104 + "px";
      }
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    formUrl() {
      if (this.patientInfo.patientId && this.store.selectedForm) {
        this.tableLoading = true;
        this.formBoxHeight = 500;
        let url = `${
          this.isDev ? "/crNursing" : "/crNursing"
        }/formUrl/健康教育单.html?${qs.stringify({
          ...this.patientInfo,
          token: this.token,
          missionId: this.store.selectedForm.missionId,
          id: this.store.selectedForm.id
        })}`;
        try {
          let wid = this.$refs.formCon.contentWindow;
          if (url == wid.location.pathname + wid.location.search) {
            wid.location.reload();
          }
        } catch (error) {}
        return url;
      } else return "";
    }
  },
  methods: {
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {}).then(res => {
          this.data.bedList = res.data.data.filter(item => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    },
    onload() {
      // alert("onload");
      this.tableLoading = false;
      let wid = this.$refs.formCon.contentWindow;
      window.wid = wid;

      try {
        window.wid.document.querySelector('.hospital').innerText = this.hospitalName
      } catch (error) {
        //
      }


      let timer = setInterval(() => {
        if (this.formBoxHeight > 500) {
          clearInterval(timer);
        }
        this.formBoxHeight = wid.document.body.scrollHeight + 50;
      }, 100);

      setTimeout(() => {
        // console.log(
        //   "this.store.selectedForm.missionId",
        //   this.store.selectedForm.missionId
        // );
        // console.log("wid.formInfo", wid.formInfo);
        wid.formInfo.getItem(
          this.store.selectedForm.missionName || this.store.selectedForm.name
        );
        // this.store.selectedForm.missionName = this.info.pageItem.replace(
        //   /健康教育单/g,
        //   ""
        // );
        wid.formInfo.missionId = this.store.selectedForm.missionId + "";
        wid.setTitle(
          (this.store.selectedForm.missionName ||
            this.store.selectedForm.name) + "健康教育单"
        );
        wid.formInfo.status = this.store.selectedForm.status;

        wid.data.setFormData("页面ID", this.store.selectedForm.missionId || "");
      }, 500);
    }
  },
  created() {
    this.$store.commit("upPatientInfo", {});
    store.clean();
    // 初始化
    if (this.deptCode) {
      this.getDate();
    }
    this.bus.$on("saveHealthEdu", () => {
      try {
        let wid = this.$refs.formCon.contentWindow;
        this.tableLoading = true;
        wid.saveForm().then(res => {
          this.tableLoading = false;
          // 保存还是新建
          if (!this.store.selectedForm.id) {
            this.store.selectedForm = {
              id: res.data.data.id,
              creatorName: res.data.data.creatorName,
              creatorDate: res.data.data.creatorDate
            };
            this.bus.$emit("refreshFormList");
          }
        });
      } catch (error) {}
    });
    this.bus.$on("delHealthEdu", () => {
      try {
        if (!this.store.selectedForm.id) return;
        this.$confirm("此操作将永久删除该评估表", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          window.openSignModal((password, empNo) => {
            deleteMission(this.store.selectedForm.id, password, empNo).then(
              res => {
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success"
                });
                store.clean();
                this.bus.$emit("refreshFormList", true);
              }
            );
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
    this.bus.$on("addHealthEdu", () => {
      if (this.patientInfo.patientId) {
        this.$refs.newHealthEduForm.open();
      } else {
        this.$message.warning("请先选择一名患者");
      }
    });
    this.bus.$on("printHealthEdu", () => {
      if (this.formUrl) {
        localStorage["assessment_printUrl"] = this.formUrl + "&isPrint=true";
        let print_wid = window.open(`/crNursing/print/assessmentv1`);
      } else {
        this.$message.warning("请先选择一张评估单");
      }
    });
    this.bus.$on("pushHealthEdu", () => {
      if (this.formUrl) {
        let wid = this.$refs.formCon.contentWindow;
        wid.pushMission();
      } else {
        this.$message.warning("请先选择一张评估单");
      }
    });
  },
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
      }
    }
  },
  components: {
    sheetTool,
    patientList,
    newHealthEduForm
  }
};
</script>
