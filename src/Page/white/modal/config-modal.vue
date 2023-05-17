<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="1200"
      title="病区动态项目配置"
      :fullBtn="true"
      :enable-mobile-fullscreen="false"
    >
      <el-tabs v-model="activeTab" class="tab-content" type="card">
        <el-tab-pane
          v-for="item in tabConfig"
          :key="item.tabKey"
          :label="item.tabLabel"
          :name="item.tabKey"
        >
          <table class="table-con">
            <colgroup>
              <col :width="c.width" v-for="(c, index) of item.itemConfig" :key="index">
            </colgroup>
            <tr>
              <th center p1 v-for="(c, index) of item.itemConfig" :key="index">
                {{c.dataLabel}}
                <template v-if="c.ifHoldAll">
                  <el-checkbox :key="index+'checkAll'" :value="choseAllParamsObj[c.ifHoldAll+item.tabKey]" @change="changeAll(c.ifHoldAll,item.tabKey)"></el-checkbox>
                </template>
              </th>
            </tr>
            <tr
              v-for="b of filterBoardConfigureList(item.tabKey)"
              :key="b.id"
              @click="selecRow = b"
              :class="{selectRow: selecRow == b}"
            >
              <td center p1 v-for="(c, index) of item.itemConfig" :key="index">
                <template v-if="c.type === 'text'">{{b[c.dataKey]}}</template>
                <template v-if="c.type === 'checkbox'">
                  <el-checkbox v-model="b[c.dataKey]"></el-checkbox>
                </template>
                <template v-if="c.type === 'input'">
                  <input type="text" class="auto-input" v-model="b[c.dataKey]" center>
                </template>
                <template v-if="c.type === 'select'">
                  <el-select
                     v-if="c.multiple"
                    v-model="b[c.dataKey]"
                    placeholder="请选择"
                    size="mini"
                    :multiple="c.multiple"
                    @input="(val) => onSelectChange(b, c.dataKey, val)"
                  >
                    <el-checkbox-group v-model="b[c.dataKey]">
                      <el-option
                        v-for="l in c.dataList"
                        :key="l.code"
                        :label="l.name"
                        :value="l.code"
                      >
                        <el-checkbox
                          style="pointer-events: none"
                          :label="l.code"
                        > {{ l.name }}
                        </el-checkbox>
                      </el-option>
                    </el-checkbox-group>
                  </el-select>
                  <el-select
                    v-else
                    v-model="b[c.dataKey]"
                    placeholder="请选择"
                    size="mini"
                  >
                    <el-option
                      v-for="l in c.dataList"
                      :key="l.code"
                      :label="l.name"
                      :value="l.code"
                    ></el-option>
                  </el-select>
                </template>
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>

      <div slot="button" flex="cross:center">
        <el-button class="modal-btn" @click="addRow">添加自定义项目</el-button>
        <el-button class="modal-btn" type="danger" @click="delRow">&nbsp;删除&nbsp;</el-button>
        <el-button class="modal-btn" type="primary" @click="post">&nbsp;保存&nbsp;</el-button>
        <div flex-box="1"></div>
        <el-button class="modal-btn" @click="close">&nbsp;取消&nbsp;</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.table-con
  border-collapse collapse
  margin-bottom 40px
  width 100%
  td,tr,th
    border: 1px solid #E3E7EA;
  td
    height 36px
    vertical-align middle
  th
    background #F7FAFA;
    height 36px
    font-size: 13px;
    color: #687179;
    font-weight bold
    vertical-align middle
  *[left]
    text-align left
  *[center]
    text-align center
  *[p1]
    padding 0 13px
  *[p2]
    padding 0 19px
  *[p3]
    padding 0 8px
.auto-input
  width 100%
  border 0
  outline 0
.selectRow,.selectRow *
  background #FFF8B1
.tab-content
  min-height 500px;
  >>>.el-tabs__header
    margin-left -20px
    margin-right -20px
    margin-top -20px
    background #F7FAFA
  >>>.el-tabs__item
    height 37px
    border-radius 0
    border-top 3px solid transparent
    border-bottom 3px solid transparent
    &.is-active
      background #fff
      border-radius 0
      border-top 3px solid #4BB08D
      border-bottom 3px solid transparent
      box-sizing border-box
      font-weight bold
      line-height 33px
      color #333
  >>>.el-tabs__item
    line-height 37px
</style>
<script>
import { saveBoardConfigure, deleteBoardConfigure } from "../api/index.js";
import common from "@/common/mixin/common.mixin.js";
import {choseAllParams} from "../modal/config/tabConfig.js";
export default {
  mixins: [common],
  data() {
    return {
      activeTab: "0",
      boardConfigureList: [],
      selecRow: {},
      tabConfig: [],
      choseAllParamsObj:{}
    };
  },
  created() {
    let tabConfig = require("./config/tabConfig").default;
    this.tabConfig = tabConfig;
  },
  computed: {
    maxSortValue() {
      return Math.max(
        ...this.boardConfigureList.map(item => item.sortValue),
        0
      );
    }
  },
  methods: {
    onSelectChange(item, key, value) {
      this.$set(item, key, value);
      const index = this.boardConfigureList.findIndex(v => v.id === item.id);
      if (index !== -1) {
        this.$set(this.boardConfigureList, index, { ...item, addExpand: item.addExpand.join('/') });
        this.$forceUpdate();
      }
    },
    changeAll(dataKey,tabKey){
      this.choseAllParamsObj[dataKey+tabKey] = !this.choseAllParamsObj[dataKey+tabKey]
      this.boardConfigureList.forEach(item=>{
        if(item.configureType===tabKey){
          item[dataKey.replace("All","")]=this.choseAllParamsObj[dataKey+tabKey]
        }
      })
    },
    open(boardConfigureList) {
      this.selecRow = {};
      this.boardConfigureList = boardConfigureList || [];
      this.choseAllParamsObj={"nameShowAll0":false,"bedLabelShowAll0":false,"verticalShowAll0":false,"showOrHideAll0":false,"nameShowAll1":false,"bedLabelShowAll1":false,"verticalShowAll1":false,"showOrHideAll1":false}
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    filterBoardConfigureList(configureType) {
      let filterArr =  this.boardConfigureList.filter(
        item => item.configureType == configureType
      );
      if( configureType==="0" || configureType==="1"){
        choseAllParams.forEach(params=>{
          let flag = filterArr.some((item)=>{
            return item[params.replace("All",'')]===false
          })
          this.choseAllParamsObj[params+configureType]=!flag
        })
      }
      if (this.HOSPITAL_ID === 'nfyksdyy') {
        filterArr = filterArr.map(item => {
          return {
            ...item,
            addExpand: item.addExpand ? item.addExpand.split('/') : []
          }
        })
      }
      return filterArr
    },
    addRow() {
      this.activeTab = "2";
      this.boardConfigureList.push({
        show: true,
        configure: "",
        sortValue: "",
        configureType: "2",
        showOrHide: true,
        customItem: true
      });
    },
    post() {
      saveBoardConfigure({
        boardConfigures: this.boardConfigureList,
        deptCode: this.deptCode
      }).then(res => {
        this.$message.success("配置修改成功");
        this.$parent.getData();
        this.close();
      });
    },
    delRow() {
      let index = this.boardConfigureList.indexOf(this.selecRow);
      if (index > -1) {
        if (this.selecRow.configureType == "2") {
          if (this.selecRow.id) {
            deleteBoardConfigure(this.selecRow.id).then(res => {
              this.boardConfigureList.splice(index, 1);
              this.$message.success("删除成功");
              this.$parent.getData();
            });
          } else {
            this.boardConfigureList.splice(index, 1);
          }
          this.selecRow = {};
        } else {
          this.$message.warning("非自定义项不可删除");
        }
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
  /deep/ .el-select {
    width: 100%!important;
    & .el-select__tags {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & input {
      height: 24px!important;
    }
    .el-tag {
      height: 20px!important;
      line-height: 18px!important;
      padding: 0 6px;
      & .el-icon-close {
        display: none!important;
      }
    }
  }
</style>
