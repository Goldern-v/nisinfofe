<template>
  <span class="renderItem" :class="[{iswrap:item.value=='<br/>'},item.elementClass]" :style="item.eleStyle">
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
// import TableRadioGroup from "./TableRadioGroup";
// import TableCheckBoxGroup from "./TableCheckBoxGroup";
import TableRadio from "./TableRadio";
import TableCheckBox from "./TableCheckBox";
export default {
  name: "renderItem",
  props: ["item", "model"],
  components: {
    TableText,
    TableInput,
    // TableRadioGroup,
    // TableCheckBoxGroup,
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
        // case 'radioGroup': return 'TableRadioGroup'
        // case 'checkBoxGroup': return 'TableCheckBoxGroup'
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
}
.mr10 {
  margin-right: 10px;
}
.txhtouxiqi {
  margin-left: 156px;
}
</style>

