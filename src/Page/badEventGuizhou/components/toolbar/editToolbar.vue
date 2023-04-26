
<template>
  <!-- 不良事件 -->
  <div>
    <div class="toolbar">
      <div class="toolbar-left">
        <div v-if="showLeft">
          <Button class="save-button" @click.stop="save" :disabled="isSaved">保存</Button>
          <!-- <Button class='submit-button' @click.stop="submit">提交审核</Button> -->
          <!-- <Button @click.stop="del" :disabled='this.$route.params.operation==="create"?true:false'>删除</Button> -->
          <!-- <Button @click.stop="goback">取消</Button> -->
          <Button @click.stop="goback">返回</Button>
        </div>
      </div>
      <!-- <div class="toolbar-right" v-if="showRight">
                <Button @click.stop="goback">返回上一页</Button>
                <Button @click.stop="newFormOpen" >新建</Button>
      </div>-->
    </div>
    <!-- <div class='bad-event-list'> -->
    <!-- <EventTable></EventTable> -->
    <!-- </div> -->
    <!-- <div class="bad-event-create-event"> -->
    <!-- <NewForm ref="newBadEventForm"></NewForm> -->
    <!-- </div> -->
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.toolbar {
  display: flex;
  align-items: center;
  height: 41px;
  padding: 0 18px;
  background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
  border: 1px solid #CBD5DD;
  overflow: hidden;
  font-size: 14px;
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  padding-right: 20px;

  &-left {
    flex: 1;
    text-align: right;
  }

  &-left, .el-input, .el-input__inner {
    width: 150px !important;
    height: 30px !important;
    display: inline-block !important;
  }

  &-left .date-picker .el-input .el-input__inner {
    width: 150px !important;
  }

  .save-button {
    background-color: #4bb08d;
    color: #fff;
    border: none;
  }
}

// .container
// padding 0px 0
// flex 1
// overflow auto
.actions {
  position: fixed;
  top: 70px;
  right: 10px;
  z-index: 1;
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import dayjs from "dayjs";
import apis from "../../apis/index.js";

import NewForm from "../modal/new-form.vue";
import EventTable from "../table/eventTable";
import Button from "../button";

import BusFactory from "vue-happy-bus";

export default {
  mixins: [common],
  components: {
    Button,
    EventTable,
    NewForm
  },
  props: {
    showRight: Boolean,
    showLeft: Boolean
  },
  data() {
    return {
      bus: BusFactory(this),
      eventTypes: [{}],
      dateHappen: "",
      dateEnd: "",
      eventType: "全部",
      eventTypeOptions: [
        { value: "保存", label: "保存" },
        { value: "提交审核", label: "提交审核" },
        { value: "护士长审核通过", label: "护士长审核通过" },
        { value: "护士长审核不通过", label: "护士长审核不通过" },
        { value: "护理部审核通过", label: "护理部审核通过" },
        { value: "护理部审核不通过", label: "护理部审核不通过" }
      ],
      eventStatus: "全部",
      eventStatusOptions: [
        { value: "坠床/跌倒", label: "坠床/跌倒" },
        { value: "非计划拔罐", label: "非计划拔罐" },
        { value: "给药错误", label: "给药错误" },
        { value: "压疮", label: "压疮" },
        { value: "难免性压疮", label: "难免性压疮" },
        { value: "失禁性皮炎", label: "失禁性皮炎" },
        { value: "其他", label: "其他" }
      ],
      pageInput: "",
      tableData: [],
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        totalPage: 1
      },
      wid: Object,
      isSaved: false
    };
  },
  created() {
    this.bus.$on("configButton", this.configButton);
    this.bus.$on("gotoBack", this.goback);
  },
  mounted() {
    let iframe = document.getElementsByClassName("badEvent-iframe")[0] || null;
    if (iframe) {
      this.wid = iframe.contentWindow;
    }
    console.log("mounted:", this.wid);
  },
  methods: {
    configButton(config) {
      let save = document.getElementsByClassName("save-button")[0];
      // let submit = document.getElementsByClassName("submit-button")[0];
      // console.log("configButton", config, save, submit);
      if (config.save) {
        save.disabled = config.save.disabled;
      }
      // if (config.submit) {
      //   submit.disabled = config.submit.disabled;
      // }
    },
    newFormOpen() {
      this.$refs.newBadEventForm.open();
    },
    goback() {
      // this.$router.push({name: 'badEvents'})
      this.$router.go(-1);
    },
    save(e) {
      console.log("save", e);
      if (
        this.wid.formObj &&
        this.wid.formObj.model &&
        !this.wid.formObj.model.ward_name && !["guizhou", '925'].includes(this.HOSPITAL_ID)
      ) {
        window.messageBox.show("请选择科室", "error", 3000);
        return;
      }
      // else if(this.$route.params.code == 'badevent_nys_pressure' && this.wid.formObj &&
      //   this.wid.formObj.model &&
      //   !this.wid.formObj.model.happen_time){
      //     window.messageBox.show("请选择压疮发生时间", "error", 3000);
      //    return;
      // }
      if (this.wid) {
        // this.isSaved = true;
        // this.wid.saveForm()
        let data = window.deptData || {}
        let deptData = {
          deptCode:data.wardCode || this.deptCode,
          deptName:data.wardName || this.deptName
        }
        this.wid.CRForm.controller.saveForm(this.$router,null,deptData);
      }
      //this.$router.push({name: 'badEventEdit', params: {id:row.id, name:row.badEventName,operation:'edit'}})
    },
    submit() {
      if (this.wid) {
        // this.wid.submitForm();
        this.wid.CRForm.controller.submitForm();
      }
    },
    del() {
      console.log("del报告单", this.$route.params);
      // if(this.wid){this.wid.delForm()}
      if (this.$route.params.operation === "edit") {
        console.log("del报告单", this.$route.params.id, this.wid);
        if (this.wid) {
          // this.wid.deleteForm(this.$route.params.id);
          this.wid.form.controller.deleteForm(this.$route.params.id);
        }
      }
    }
  }
};
</script>
