<template>
  <div>
    <div class="item-con" @dblclick="addTemplateAtDoc">
      <div class="title" v-if="data.title">{{data.title}}</div>
      <div class="desc" v-html="data.content"></div>
      <div class="tool-box" flex="cross:center">
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.item-con {
  position: relative;
  padding: 10px 20px;

  &:hover {
    background: #f4f2f5;
    cursor: pointer;
    transition: all 0.3s;

    .tool-box {
      display: flex;
    }

    .title {
      min-height: 14px;
    }
  }

  .title {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    padding-right: 50px;
    min-height: 0px;
    margin-bottom: 10px;
  }

  .desc {
    font-size: 13px;
    color: #687179;
    line-height: 18px;
  }

  .tool-box {
    position: absolute;
    bottom: 0px;
    right: 5px;
    display: none;

    i {
      color: #687179;
      font-size: 16px;
      padding: 4px 2px;
    }
  }
}

.line {
  background: #ECEEEF;
  height: 1px;
  margin: 0 20px;
}
</style>
<script>
import bus from "vue-happy-bus";
import data from "../../../sheet";
import { del,delByEmpNo } from "../../../api/recordDesc.js";
export default {
  props: {
    data: Object
  },
  data() {
    return {
      bus: bus(this),
      msg: "hello vue"
    };
  },
  computed: {},
  methods: {
    addTemplateAtDoc() {
      this.bus.$emit("addTemplateAtDoc", this.data.content);
    },
  },
  components: {}
};
</script>
