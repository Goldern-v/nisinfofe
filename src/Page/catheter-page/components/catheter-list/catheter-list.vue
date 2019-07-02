<template>
  <div class="list-container">
    <div class="title-content" flex="cross:center main:justify">
      <span>管道</span>
      <el-button type="text" class="new-btn" @click="openEditBlockModal">
        <i class="el-icon-plus"></i>创建
      </el-button>
    </div>
    <div class="list-content">
      <div
        class="item-content"
        flex="cross:center"
        v-for="(item, index) in model.blockList"
        :key="index"
        @click="model.setSelectedBlock(item)"
        :class="{isActive: model.selectedBlock == item}"
      >
        <span>{{item.catheterName}}</span>
        <span flex-box="1"></span>
        <span class="date">{{item.status != '2' ? item.startDate: item.endDate}}</span>
        <div class="block" :class="{isActive: item.status == '1'}"></div>
      </div>

      <nullText v-if="model.blockList.length == 0"></nullText>
    </div>
    <editBlockModal ref="editBlockModal"></editBlockModal>
  </div>
</template>

<script>
import { model } from "../../store";
import nullText from "@/components/null/null-text";
import editBlockModal from "../../modal/edit-block-modal";
export default {
  data() {
    return {
      model
    };
  },
  methods: {
    openEditBlockModal() {
      this.$refs.editBlockModal.open({});
    }
  },
  components: {
    nullText,
    editBlockModal
  }
};
</script>

<style lang='scss' scoped>
.list-container {
  background: rgba(255, 255, 255, 1);
  border-radius: 2px 2px 0px 2px;
  border: 1px solid rgba(203, 213, 221, 1);
  height: 100%;
  box-sizing: border-box;
  .new-btn {
    color: #687179;
    font-size: 12px;
  }
  i {
    margin-right: 2px;
  }
}
.title-content {
  height: 38px;
  background: rgba(247, 250, 250, 1);
  font-size: 13px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px solid rgba(203, 213, 221, 1);
  padding-left: 13px;
}
.list-content {
  height: calc(100% - 38px);
  padding: 5px 0;
  box-sizing: border-box;
  overflow: auto;
  .item-content {
    height: 37px;
    color: rgba(104, 113, 121, 1);
    font-size: 13px;
    padding: 0 16px;
    cursor: pointer;
    &.isActive {
      background: #e4f1f0;
    }
    .date {
      margin-right: 22px;
    }
    .block {
      height: 17px;
      width: 17px;
      background: rgba(190, 190, 190, 1);
      &.isActive {
        background: #69a7d9;
      }
    }
  }
}
</style>
