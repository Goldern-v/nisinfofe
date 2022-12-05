<template>
  <div class="template-item" @click="onClick">
    <div class="title">{{listData.title}}</div>
    <div class="content">{{listData.content}}</div>
    <div class="actions" @click.stop>
      <ElTooltip content="编辑111" placement="bottom" effect="dark">
        <i class="iconfont icon-hulijiludan" @click="onEdit"></i>
      </ElTooltip>
      <ElTooltip content="删除" placement="bottom" effect="dark">
        <i class="iconfont icon-shanchuzhenghang" @click="onRemove"></i>
      </ElTooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: Object
  },
  methods: {
    onClick() {
      this.$emit("click", this.listData);
    },
    onEdit() {
      this.$emit("edit", this.listData);
    },
    onRemove() {
      this.$emit("remove", this.listData);
    }
  }
};
</script>

<style lang="stylus" scoped>
.template-item {
  position: relative;
  padding: 10px 20px;
  user-select: none;

  &::after {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 0;
    content: '';
    display: block;
    content: '';
    background: #ECEEEF;
    height: 1px;
  }

  &:hover {
    background: #f4f2f5;
    cursor: pointer;
    transition: all 0.3s;

    .actions {
      display: block;
    }
  }

  .title {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    min-height: 0px;
    margin-bottom: 10px;
    line-height: 1.4em;
  }

  .content {
    font-size: 13px;
    color: #687179;
    line-height: 1.4em;
  }

  .actions {
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: none;

    i {
      color: #687179;
      font-size: 18px;
      padding: 4px 2px;
    }
  }
}
</style>
