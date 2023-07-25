<template>
  <div>
    <template v-if="!['foshanrenyi'].includes(this.HOSPITAL_ID)">
      <div class="item-con" @click="addTemplateAtDoc">
        <div class="title">{{data.title}}</div>
        <div class="desc">{{data.content}}</div>
        <div class="tool-box" flex="cross:center">
          <el-tooltip content="编辑" placement="bottom" effect="dark">
            <i class="iconfont icon-hulijiludan" @click.stop="toEdit(data)"></i>
          </el-tooltip>
          <el-tooltip content="删除" placement="bottom" effect="dark">
            <i class="iconfont icon-shanchuzhenghang" @click.stop="toDel"></i>
          </el-tooltip>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="item-con" @dblclick="addTemplateAtDoc">
        <div class="title">{{data.title}}</div>
        <div class="desc">{{data.content}}</div>
        <div class="tool-box" flex="cross:center">
          <el-tooltip content="编辑" placement="bottom" effect="dark">
            <i class="iconfont icon-hulijiludan" @click.stop="toEdit(data)"></i>
          </el-tooltip>
          <el-tooltip content="删除" placement="bottom" effect="dark">
            <i class="iconfont icon-shanchuzhenghang" @click.stop="toDel"></i>
          </el-tooltip>
        </div>
      </div>
    </template>
    <div class="line"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.item-con
  position relative
  padding 10px 20px
  &:hover
    background: #f4f2f5;
    cursor pointer
    transition all .3s
    .tool-box
      display flex
    .title
      min-height 14px
  .title
    font-size: 14px;
    color: #333333
    font-weight bold
    padding-right 50px
    min-height 0px
    margin-bottom 10px
  .desc
    font-size: 13px;
    color: #687179;
    line-height 18px
  .tool-box
    position absolute
    bottom 0px;
    right 5px
    display none
    i
      color #687179
      font-size 16px;
      padding 4px 2px
.line
    background: #ECEEEF;
    height 1px
    margin 0 20px
</style>
<script>
import bus from "vue-happy-bus";
import { del, del_foshanshiyi } from "../../api/template.js";
// import { keyNameMap, keyCodeMap } from "./deptMapList";
import commom from "@/common/mixin/common.mixin.js";
export default {
  mixins: [commom],
  props: {
    data: Object,
    refName: String,
    filterData: {
      type: Array,
      default: []
    },
    isEditor:Boolean,
    editorCallback:Function
  },
  data() {
    return {
      bus: bus(this),
      user: localStorage.user && JSON.parse(localStorage.user),
    };
  },
  computed: {
    formCode() {
      try {
        return window.formObj.formSetting.formInfo.formCode;
      } catch (error) {}
      return "E0001";
    }
  },
  methods: {
    delete() {
      return this.filterData.filter(item => item.id !== this.data.id)
    },
    addTemplateAtDoc() {
      // 判断是一体化评估进入还是编辑器一体化评估进入
      if(this.isEditor){
        // 编辑器进入，点击当前的数据this.data.content去做拼接
        this.editorCallback(this.data.content)
      }else{
       if (this.HOSPITAL_ID === 'foshanrenyi') {
        let markObj = []
        // 成人模板
        if (this.formCode === 'E2332') {
          markObj = [
            {
              title: "现病史",
              code: "I2332026"
            },
            {
              title: "基础护理",
              code: "I2332181"
            },
            {
              title: "专科护理",
              code: "I2332182"
            },
            {
              title: "其他",
              code: "I2332184"
            }
          ]
        } else {
          markObj = [
            {
              title: "现病史",
              code: "I2333040"
            },
            {
              title: "基础护理",
              code: "I2333184"
            },
            {
              title: "专科护理",
              code: "I2333185"
            },
            {
              title: "其他",
              code: "I2333187"
            }
          ]
        }
        let mark = markObj.find(item => this.data.title.includes(item.title))
        if (mark) {
          this.$root.$refs[this.formCode][
          mark.code
          ].$parent.inputValue += this.data.content;
        } else {
          this.$root.$refs[this.formCode][
            this.refName
          ].$parent.inputValue += this.data.content;
        }
      } else {
        this.$root.$refs[this.formCode][
          this.refName
        ].$parent.inputValue += this.data.content;
      }
      }
    },
    toEdit() {
      if (this.HOSPITAL_ID === 'foshanrenyi') {
        if (this.isRoleManage || this.isNewAdminOrNursingDepartment){
          if (!this.data.wardCode) {
            if (this.isRoleManage && !this.isNewAdminOrNursingDepartment) {
              this.$message.warning('护士长没有权限编辑公共模板！')
              return
            }
          }
          this.bus.$emit("openAddTemplateModal", this.data);
        }
        else 
          this.$message.warning('普通没有权限编辑模板！')
      } else {
        this.bus.$emit("openAddTemplateModal", this.data);
      }
      
    },
    toDel() {
      if (['foshanrenyi', 'nfyksdyy'].includes(this.HOSPITAL_ID)) {
        if (this.isRoleManage || this.isNewAdminOrNursingDepartment){
          if (!this.data.wardCode) {
            if (this.isRoleManage && !this.isNewAdminOrNursingDepartment) {
              this.$message.warning('护士长没有权限删除公共模板！')
              return
            }
          }
          this.$confirm("此操作将永久删除该常用语模版, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            del_foshanshiyi(this.data.id).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.bus.$emit("refreshTemplate", this.delete());
              
            });
          });
        }else this.$message.warning('普通没有权限编辑模板！')
      } else {
        this.$confirm("此操作将永久删除该常用语模版, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          del(this.data.id).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.bus.$emit("refreshTemplate");
          });
        });
      }
    }
  },
  components: {}
};
</script>
