<template>
  <div class="statistical-query" :style="pageStyle">
    <side-bar/>
    <div class="statistical-query__content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import commonMixin from '@/common/mixin/common.mixin'
import SideBar from './components/side-bar.vue'

export default {
  mixins: [commonMixin],
  computed: {
    pageStyle() {
      let style = {}
      style.height = this.wih - 61 + 'px'
      return style
    }
  },
  components: {
    SideBar,
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import './index.scss';
.statistical-query {
  display: flex;
  .statistical-query__content {
    flex: 1;
    overflow: auto;
  }
}
</style>
