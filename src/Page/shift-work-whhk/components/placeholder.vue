<template>
  <div :class="['placeholder', size, {black}]">
    <div class="add-btn" v-if="showAdd" @click="onAdd">
      <i v-if="icon" :class="['add-btn-icon', icon]"></i>
      <div class="add-btn-text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    size: String,
    black: Boolean,
    showAdd: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({}),
  methods: {
    onAdd() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="stylus" scoped>
.placeholder {
  position: relative;
  min-height: 350px;
  height: 100%;
  font-size: 16px;

  &.small {
    font-size: 14px;

    .add-btn {
      padding: 15px 0;
    }
  }

  &.black {
    background: #dfdfdf;
  }

  .add-btn {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 25px 0;
    color: #687179;
    width: 195px;
    background: #fff;
    border: 1px solid #adb4ba;
    text-align: center;
    cursor: pointer;
    transform: translate(-50%, -50%);

    &:hover {
      background: #fafafa;
    }

    .add-btn-icon {
      margin-bottom: 15px;
      font-size: 30px;
      color: #C2CBD2;
    }
  }
}
</style>
