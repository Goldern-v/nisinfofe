<template>
   <div class="side-bar">
     <div class="side-bar__item" :class="{'side-bar__item--act':actIndex == v}" v-for="(v, i) in 10" :key="i" @click="handleSelect(v)">
      <span class="side-bar__item__arrow"></span>
      <span class="side-bar__item__text">
        {{v}}
      </span>
     </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      actIndex: 1
    }
  },
  methods: {
    handleSelect(i) {
      console.log('test-i', i)
      this.actIndex = i
    }
  }
}
</script>

<style lang="scss" scoped>
$theme-color: #4bb08d;
.side-bar {
  width: 200px;
  height: 100%;
  background: #fff;
  .side-bar__item {
    position: relative;
    display: flex;
    border-right: 4px solid  $theme-color;
    height: 36px;
    align-items: center;
    cursor: pointer;
    .side-bar__item__arrow {
      width: 70px;
    }
    .side-bar__item__text {
      flex: 1;
    }
    &.side-bar__item--act {
      color: $theme-color;
      &::after {
        /* position: absolute; */
        content: '';
        /* right: 4px; */
        /* top: 50%; */
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 0px solid transparent;
        border-right: 6px solid $theme-color;
      }
    }
  }
}
</style>
