<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="920"
      title="病区动态项目配置"
      :fullBtn="true"
      :enable-mobile-fullscreen="false"
    >
      <div class="select-con">
        <!-- <el-checkbox-group v-model="checkList">
          <el-checkbox :label="item" v-for="item in allList" :key="item"></el-checkbox>
        </el-checkbox-group>-->
        <table class="table-con">
          <colgroup>
            <col width="70">
            <col width="200">
            <col width="100">
            <col width="120">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="120">
            <col width="120">
          </colgroup>
          <tr>
            <th center p1>显示</th>
            <th left p2>项目名称</th>
            <th center p3>显示顺序</th>
            <th center p3>无数据隐藏</th>
            <th center p3>垂直显示</th>
            <th center p3>备注</th>
            <th center p3>显示姓名</th>
            <th center p3>显示床号</th>
            <th center p3>排序方式</th>
            <th center p3>医嘱类型</th>
          </tr>
          <tr
            v-for="item of boardConfigureList"
            :key="item.id"
            @click="selecRow = item"
            :class="{selectRow: selecRow == item}"
          >
            <td center p1>
              <el-checkbox v-model="item.show"></el-checkbox>
            </td>
            <td left p2>
              <input
                type="text"
                class="auto-input"
                :readonly="!item.customItem"
                v-model="item.configure"
              >
            </td>
            <td center p3>
              <input type="text" class="auto-input" v-model="item.sortValue" center>
            </td>
            <td center p3>
              <el-checkbox v-model="item.showOrHide"></el-checkbox>
            </td>
            <td center p3>
              <el-checkbox v-model="item.verticalShow"></el-checkbox>
            </td>
            <td center p3>
              <el-checkbox v-model="item.diagnosisShow"></el-checkbox>
            </td>
            <td center p3>
              <el-checkbox v-model="item.nameShow"></el-checkbox>
            </td>
            <td center p3>
              <el-checkbox v-model="item.bedLabelShow"></el-checkbox>
            </td>
            <td center p3>
              <el-select v-model="item.shortShow" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in shortList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td center p3>
              <el-select v-model="item.orderTypeShow" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in orderTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
        </table>
      </div>
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
  height 100%
  border 0
  outline 0
.selectRow,.selectRow *
  background #FFF8B1
</style>
<script>
import { saveBoardConfigure, deleteBoardConfigure } from "../api/index.js";
import common from "@/common/mixin/common.mixin.js";
export default {
  mixins: [common],
  data() {
    return {
      boardConfigureList: [],
      selecRow: {},
      orderTypeList: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "临时"
        },
        {
          value: "2",
          label: "长期"
        }
      ],
      shortList: [
        {
          value: null,
          label: "床位"
        },
        {
          value: "1",
          label: "正常"
        }
      ]
    };
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
    open(boardConfigureList) {
      this.selecRow = {};
      this.boardConfigureList = boardConfigureList || [];
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    addRow() {
      this.boardConfigureList.push({
        // deptCode: this.deptCode,
        show: true,
        sortValue: this.maxSortValue + 1 || 1,
        configure: "",
        customItem: true,
        showOrHide: false,
        diagnosisShow: false,
        verticalShow: false,
        nameShow: true,
        bedLabelShow: true,
        orderTypeShow: "2",
        shortShow: null
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
      if (index) {
        if (this.selecRow.customItem) {
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
