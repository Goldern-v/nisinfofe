
<template>
  <!-- <span style="margin: 0 0px 0 0;" > -->
  <!-- <TipsBox :obj='obj'  :formObj="formObj"> -->
  <el-radio
    :ref="obj.name+obj.type.toUpperCase()+obj.title||obj.label"
    v-model="radioboxValue"
    border
    :size="obj.size||'small'"
    :label="obj.title"
    :class="obj.class"
    :style="obj.style"
    @click.native.stop="radioClicked($event,obj)"
  >{{obj.title}}</el-radio>

  <!-- <el-radio
      v-if="obj.type==='radio'"
      v-model="radioValue" border
      :size="obj.size||'small'"
      :label="obj.value||obj.title"
      :class="obj.class||''"
      :style="obj.style||''"
  @click.native.stop="radioClicked($event,obj)">{{obj.title}}</el-radio>-->

  <!-- </TipsBox> -->
  <!-- </span> -->
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

import TipsBox from "./TipsBox";

export default {
  name: "Radiobox",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {
    TipsBox
  },
  data() {
    return {
      radioboxValue: []
    };
  },
  computed: {},
  watch: {
    radioboxValue(valueNew, oldvaule) {
      let value = valueNew.toString();
      let index = -1;
      if (!this.formObj.model[this.obj.name]) {
        this.formObj.model[this.obj.name] = [];
      }
      index = this.formObj.model[this.obj.name].indexOf(this.obj.title);
      if (value && index === -1) {
        // console.log("radioboxValue-1:",value, oldvaule, index)
        if (this.formObj.model[this.obj.name]) {
          this.formObj.model[this.obj.name].push(value);
        }
      } else if (!value && index > -1 && this.formObj.model[this.obj.name]) {
        this.formObj.model[this.obj.name].splice(index, 1);
        // console.log("radioboxValue:",valueNew, oldvaule)
      }
      // console.log("radioboxValue-model:",this.formObj.model)
    }
  },
  mounted() {
    let refName =
      this.obj.name +
      this.obj.type.toUpperCase() +
      (this.obj.title || this.obj.label);
    if (this.$refs[refName]) {
      this.$root.$refs[refName] = this.$refs[refName];
    }
    console.log("RadioboxMounted", this.$refs, this.$root.$refs);
  },
  created() {},
  methods: {
    radioClicked(e, child) {
      console.log(
        "radioClicked",
        e,
        child,
        this.formObj.model,
        e.target.tagName
      );
      if (e.target.tagName === "INPUT") {
        if (this.formObj.model[child.name]) {
          this.formObj.model[child.name] = "";
          this.radioValue = "";
        }
      }
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    }
  }
};
</script>


<style scoped>
.el-Radiobox,
.is-bordered,
.el-Radiobox--small,
.el-input,
.el-input--small,
.el-input-group,
.el-input-group--prepend {
  margin: 5px 0px;
}

.el-radio {
  white-space: inherit !important;
}
</style>
