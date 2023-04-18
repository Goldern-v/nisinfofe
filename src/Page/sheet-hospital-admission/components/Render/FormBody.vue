
<template>
  <div class="title-box" :hospital="hospital" v-if="obj">
    <!-- <draggable v-model="obj"
    ghost-class="ghost-box"
    :group="{ name: 'people', pull: 'clone', put: 'clone' }"
    @start="drag=true"
    @end="dragEnd">
    <transition-group>-->

    <div v-for="(group,index) in obj" :key="group.name+index+obj.name+getUUID()">
      <FormGroupHTML :obj="group" :formObj="formObj" />
      <FormGroupTitle :obj="group" :formObj="formObj" />
      <FormGroupHR :obj="group" :formObj="formObj" />
      <FormGroupHorizontalBox :obj="group" :formObj="formObj" />
      <FormGroupVerticalBox :obj="group" :formObj="formObj" />
      <FormGroupColBox :obj="group" :formObj="formObj" />
    </div>

    <!-- </transition-group>
    </draggable>-->
  </div>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import FormGroupTitle from "./FormGroupTitle";
import FormGroupHR from "./FormGroupHR";
import FormGroupHTML from "./FormGroupHTML";
import FormGroupHorizontalBox from "./FormGroupHorizontalBox";
import FormGroupVerticalBox from "./FormGroupVerticalBox";
import FormGroupColBox from "./FormGroupColBox";
import draggable from "vuedraggable";

export default {
  name: "FormBody",
  props: {
    obj: Array,
    formObj: Object
  },
  components: {
    FormGroupTitle,
    FormGroupHR,
    FormGroupHTML,
    FormGroupHorizontalBox,
    FormGroupVerticalBox,
    FormGroupColBox,
    draggable
  },
  data() {
    return {
      drag: false
    };
  },
  computed: {
    hospital(){
      return this.HOSPITAL_ID
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    resize(newRect) {
      console.log("newRect", newRect);
    },
    onResize: function(x, y, width, height) {
      console.log("onResize", x, y, width, height);
    },
    onDrag: function(x, y) {
      console.log("onDrag", x, y);
    },
    dragEnd(e) {
      console.log("dragEnd", e, this.formObj);
      this.drag = false;
      this.source = JSON.stringify(this.formObj, null, 4);
      this.updateFunc(this.source);
    },
    updateFunc(e) {
      console.log("updateFunc", e);
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    }
  }
};
</script>


<style lang="scss" scoped>
div {
  font-family: sim;
}
h1,
h2,
h3,
h4 {
  text-align: center;
  font-family: sim;
}
.el-checkbox,
.is-bordered,
.el-checkbox--medium {
  margin: 5px 0px;
}
.title-box {
  border-bottom: 0px dashed #eee;
  /* padding: 10px 30px; */
  padding: 10px 20px 50px 30px;
  /* padding-bottom: 50px; */
  &[hospital='foshanrenyi']{
    font-family:"宋体" !important;
    /deep/ span,.el-checkbox__label{
      font-size:14px !important;
    }
    /deep/ .group-title-box{
      font-size:16px !important;
    }
  }
}

.header-box {
  padding: 0px;
  font-size: 13px;
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
}
</style>
