<template>
  <div class="tags-view-container">
    <div ref="scrollRef" class="tags-view-wrapper" @wheel.prevent="onScrollX">
      <span
        v-for="(tag, index) in tagsList"
        :key="index + 'tag'"
        :class="isActive(tag) ? 'active' : ''"
        class="tags-view-item"
        tag="span"
        @click="onOpenTagForm(tag)"
      >
        {{ tag.recordName }}
        <span
          v-if="tagsList && tagsList.length > 1"
          class="el-icon-close"
          @click.prevent.stop="onCloseTag(tag)"
        ></span>
      </span>
    </div>
  </div>
</template>

<script>
import BusFactory from "vue-happy-bus";
export default {
  props: {
    tagsList: {
      type: Array,
      default: () => []
    },
    currentTag: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      bus: BusFactory(this),
      selectedTag: this.currentTag,
    }
  },
  methods: {
    isActive(item) {
      return this.selectedTag && item.id === this.selectedTag.id
    },
    onScrollX(e) {
      // console.log(e)
      const deltaX = -e.wheelDelta || e.deltaY + 40 || e.detail;
      const scrollRef = this.$refs.scrollRef;
      if (scrollRef) {
        scrollRef.scrollLeft = scrollRef.scrollLeft + deltaX / 4
      }
    },
    // 打开评估单
    onOpenTagForm(tag) {
      this.selectedTag = tag;
      this.$emit('switchSheet', tag);
    },
    // 关闭标签
    onCloseTag(tag) {
      this.$emit('closeSheet', tag);
    }
  },
  watch: {
    currentTag: {
      handler(val) {
        this.onOpenTagForm(val);
      }, deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    position: relative;
    z-index: 10;
    .tags-view-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      margin-bottom: -17px;
      &:hover {
        overflow: auto;
        transition: all .3s;
      }
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
          margin-left: 15px;
        }
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          background-color: #4bb08d;
          color: #fff;
          border-color: #4bb08d;
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
        .el-icon-close {
          width: 16px;
          height: 16px;
          vertical-align: 2px;
          border-radius: 50%;
          text-align: center;
          transition: all .3s cubic-bezier(.645, .045, .355, 1);
          transform-origin: 100% 50%;
          &:before {
            transform: scale(.6);
            display: inline-block;
            vertical-align: -3px;
          }
          &:hover {
            background-color: #b4bccc;
            color: #fff;
          }
        }
      }
    }
  }
</style>
