<template>
  <span :class="item.class||''">
    <span v-html="item.value"></span>
  </span>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["item"],
  components: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  padding: 5px 0;
  &::before,
  &::after {
    position: absolute;
    content: "";
    width: 150%;
    height: 1px;
    background-color: #000;
    left: -10px;
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }
}
</style>


