<template>
  <div>
    <div class="tool-contain" flex="cross:center">
      <div class="item-box" flex="cross:center main:center" @click="emit('addHealthEdu')">
        <div class="text-con">添加新单</div>
      </div>
      <div class="item-box" flex="cross:center main:center" @click="emit('saveHealthEdu')">
        <div class="text-con" flex="cross:center">保存</div>
      </div>
      <div class="item-box" flex="cross:center main:center" @click="emit('delHealthEdu')">
        <div class="text-con">删除</div>
      </div>
      <div class="item-box" flex="cross:center main:center" @click="emit('pushHealthEdu')">
        <div class="text-con">推送</div>
      </div>

      <div class="item-box" flex="cross:center main:center" @click="emit('printHealthEdu')">
        <div class="text-con">打印预览</div>
      </div>
      <div flex-box="1"></div>

      <span class="label">表单列表：</span>
      <el-select
        v-model="store.selectedForm"
        value-key="id"
        placeholder="请选择健康宣教"
        class="select-con"
        popper-class="healthEdu-con-sheet"
      >
        <div class="head-con" flex="cross:stretch">
          <div class="col-1">表名</div>
          <div class="col-2">创建时间</div>
          <div class="col-3">创建人</div>
        </div>
        <el-option
          v-for="item in formlist"
          :key="item.id"
          :label="formLabel(item, formlist.length)"
          :value="item"
        >
          <div class="list-con" flex="cross:stretch">
            <div class="col-1" :title="item.missionName">{{item.missionName}}</div>
            <div class="col-2" :title="item.creatDateStr">{{item.creatDateStr}}</div>
            <div class="col-3" :title="item.creatorName">{{item.creatorName}}</div>
          </div>
        </el-option>
      </el-select>

      <div class="item-box" flex="cross:center main:center" @click="tofull">
        <div class="text-con">
          <span v-if="fullpage">关闭全屏</span>
          <span v-else>全屏</span>
        </div>
      </div>
      <div style="width: 5px;"></div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" src="./tool.styl" scoped>
</style>

<style lang="stylus" scoped>
.pegeSelect
  >>>.el-input__inner
    border 0 !important
    font-size 12px
    color #333333
.label
  font-size 12px;
  color #333
</style>

<style lang="stylus">
.healthEdu-con-sheet
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.50);
  border-radius: 4px;
  width 480px !important
  left auto !important
  right 88px
  .el-select-dropdown__list, .el-select-dropdown__item
    padding 0
    height auto
  .el-select-dropdown__wrap
    max-height 500px
  .head-con
    height 37px
    background: #F7FAFA;
    border-bottom: 1px solid #EAEEF1;
    font-size: 13px;
    color: #333333;
    font-weight bold
  .col-1,.col-2,.col-3,.col-4
    display flex
    align-items center
  .col-1
    width 180px
    padding 0 24px
    border-right: 1px solid #EAEEF1;
  .col-2
    width 126px
    padding 0 16px
    border-right: 1px solid #EAEEF1;
  .col-3
    width 93px
    padding 0 14px
    border-right: 1px solid #EAEEF1;
  .col-4
    width 133px
    padding 0 14px
  .list-con
    font-size: 13px;
    color: #333333;
    height 37px
    border-bottom: 1px solid #EAEEF1
  .el-select-dropdown__item.selected
    background #fff
    position relative
    &:after
      content ''
      position absolute
      left 0
      top 9px
      height 20px
      width 4px
      background #4bb08d
  .el-select-dropdown__item.hover
    background #fff;
  .el-select-dropdown__item:hover
    background #E5F1F0;
.red-border
  border 2px solid red !important
</style>

<script>
import bus from "vue-happy-bus";
import $ from "jquery";
import commom from "@/common/mixin/common.mixin.js";
import dayjs from "dayjs";
import { groupList } from "../../api/index.js";
import store from "../../store/index.js";
import moment from "moment";
export default {
  mixins: [commom],
  data() {
    return {
      bus: bus(this),
      tool: "",
      user: JSON.parse(localStorage.user),
      formlist: [], // 健康宣教表单列表
      store
    };
  },
  methods: {
    emit(todo) {
      this.bus.$emit(todo);
    },
    tofull() {
      this.$store.commit("upSheetPageFullpage", !this.fullpage);
    },
    toPrint() {},
    getFormList(isRefresh, isDel) {
      // alert(123);
      if (this.patientId) {
        groupList(this.patientId, this.patientInfo.visitId).then(res => {
          try {
            this.formlist = res.data.data;
            //  this.store.formInfo.formCode = obj.formCode
            if (isRefresh && this.store.selectedForm.id) {
              this.store.selectedForm = this.formlist.find(item => item.id);
            } else if (!isDel) {
              this.store.selectedForm = this.formlist[0];
            }
          } catch (error) {
            this.formlist = [];
            console.log(error);
          }
          // this.store.formInfo.formCode = ((deptCode) => {
          //    switch(deptCode) {
          //      case '4002' : return 'joint'
          //      break
          //      case '4027' : return 'gynecology'
          //      break
          //      case '4020' : return 'endocrinology'
          //      break
          //    }
          //  })(this.deptCode)
        });
      }
    },
    formLabel(item, length) {
      let formName = item.missionName;
      return `${formName} ${dayjs(item.createDate).format(
        "MM-DD"
      )}建 共${length}张`;
    }
  },
  computed: {
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    patientId() {
      return this.$store.state.sheet.patientInfo.patientId;
    }
  },
  created() {
    this.bus.$on("refreshFormList", isDel => {
      // alert(123);
      this.getFormList(true, isDel);
    });
  },
  mounted() {},
  watch: {
    patientId: {
      deep: true,
      handler() {
        this.store.clean();
        this.getFormList();
      }
    }
  },
  components: {}
};
</script>
