<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="745" title="护理评估记录">
      <div class="modal-main">
        <div class="header">
          评估日期：
          <div class="startChooseCon">
            <el-date-picker
              v-model="startData"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
            至
          <div class="startChooseCon">
            <el-date-picker
              v-model="endData"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <el-button >查询</el-button>
        </div>
        <div class="midTable">
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="状态"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="评估日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="评估表">
            </el-table-column>
            <el-table-column
              prop="address"
              label="得分">
            </el-table-column>
            <el-table-column
              prop="address"
              label="评估人">
            </el-table-column>
          </el-table>

        </div>

      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      startData:"",
      endData:"",
      tableData: []
    };
  },
  computed: {
    aaa () {
      moment(this.value11).format('YYYY-MM-DD')
    }
  },
  methods: {
    open() {
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      this.close();
    }
  },
  mounted() {

  },
  components: {},
};
</script>

<style lang="stylus" scoped>
  >>>.sweet-modal
    width 879px !important
    overflow hidden
  >>>.sweet-content
    padding 0
    height 700px
  >>>.sweet-title
    box-sizing:border-box
    padding 0 23px
    width 744px
    height 39px
  >>>.sweet-box-actions
    width 11px
    height 11px
  .modal-main
    .header
      padding 0 18px
      height 40px
      line-height 40px
      background:rgba(237,240,244,1);
      font-size 12px
      .startChooseCon
        display:inline-block
        >>>.el-date-editor
          margin 0 13px
          width:128px;
          height:30px;
          // background:rgba(255,255,255,1);
        >>>.el-input__inner
          // padding-right: 35px;
          height 30px
          border-radius:4px;
          border:1px solid rgba(194,203,210,1);
        >>>.el-input__icon
          top 3px
          width 35px
          height 30px
      >>>.el-button
        margin-left 14px
        padding 6px 14px
        box-sizing border-box
        width:52px;
        height:30px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(194,203,210,1);
        font-size 12px

    .midTable
      display inline-block
      width 517px
      height 392px
      background rgba(255,255,255,1);
      >>> .el-table__header
        width:520px;
        height:37px;
        background:rgba(247,250,250,1);
        th
          height:37px !important

</style>

