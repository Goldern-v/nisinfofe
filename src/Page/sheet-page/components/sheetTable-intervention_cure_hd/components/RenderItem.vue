<template>
  <span
    class="renderItem"
    :class="[{iswrap:item.value=='<br/>'},item.elementClass]"
    :style="item.eleStyle"
  >
    <span class="prev" v-if="item.prev" v-html="item.prev" />
    <component :is="ChildComponent(item)" :item="item" :model.sync="model">
      <!-- <template v-if="item.children">
        <renderItem v-for="(child,idx) in " :key="idx" :item="item.children" />
      </template>-->
    </component>
    <span class="next" v-if="item.next" v-html="item.next" />
  </span>
</template>

<script>
import TableText from "./TableText";
import TableInput from "./TableInput";
import TableRadio from "./TableRadio";
import TableCheckBox from "./TableCheckBox";
export default {
  name: "renderItem",
  props: ["item", "model"],
  components: {
    TableText,
    TableInput,
    TableCheckBox,
    TableRadio
  },
  created() {
    // console.log(this.item.name)
  },
  methods: {
    ChildComponent(item) {
      switch (item.type) {
        case "text":
          return "TableText";
        case "input":
          return "TableInput";
        case "radio":
          return "TableRadio";
        case "checkbox":
          return "TableCheckBox";
        default:
          return "TableText";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.renderItem {
  display: inline-block;

  &:last-of-type {
    margin-right: 0;
  }
}
.iswrap {
  display: block;
  height: 5px;
  border-bottom: 1px solid #000;
  margin-left: -2.5px;
  margin-right: -2px;
}
.mr10 {
  margin-right: 8px;
}
.mr11 {
  margin-right: 100px;
}
.txhtouxiqi {
  margin-left: 156px;
}
.rightStyle {
  width: 350px !important;
}
</style>

