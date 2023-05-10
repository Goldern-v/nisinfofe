
<template>
  <div :ref="refName">
    <!-- 开发模式 -->
    <div class="tips-box" v-if="mode==='development'">
      <!-- <hr> -->
      <span style="display:flex">
        <span class="tips-label">{{obj.title}}</span>
        <span class="tips-label name-label">{{obj.name}}</span>
        <span class="tips-label type-label">{{obj.type}}</span>
        <span class="tips-label value-label">{{formObj.model[obj.name]}}</span>
        <span style="flex:1"></span>
        <span class="tips-label opt-label" @click="operation($event,'edit')">编辑</span>
        <span class="tips-label opt-label" @click="operation($event,'copy')">复制</span>
        <span class="tips-label opt-label" @click="operation($event,'delete')">删除</span>
      </span>
      <slot></slot>
      <!-- <hr> -->
    </div>
    <!-- 预览模式 -->
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

export default {
  name: "TipsBox",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {},
  data() {
    return {
      TipsBoxValue: [],
      refName: 'tipsBox' + this.obj.name + this.obj.title
      // mode: this.getMode()
    };
  },
  computed: {
    winFormObj() {
      return window.formObj;
    },
    mode() {
      return this.getMode();
    },
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {}
      return "E0001";
    }
  },
  watch: {
    TipsBoxValue(valueNew, oldvaule) {
      console.log("TipsBoxValue:", valueNew, oldvaule);
      console.log("TipsBoxValue-model:", this.formObj.model);
    }
  },
  mounted() {
    if (this.obj.name && this.obj.title && this.$refs[this.refName]) {
      this.$root.$refs[this.formCode][this.refName] = this.$refs[this.refName];
    }
    // console.log('TipsBoxMounted',this.$refs,this.$root.$refs)
  },
  created() {},
  methods: {
    getMode() {
      try {
        return this.formObj.pageSetting.mode;
      } catch (error) {
        return "normal";
      }
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    operation(e, code) {
      console.log(
        code,
        e,
        this.obj,
        this.formObj,
        this.refName,
        this.$root.$refs[this.formCode][this.obj.name],
        this.$root.$refs
      );
      // this.$root.$refs.uiEditor
      if (code === "edit") {
        this.$root.$refs.uiEditor.open(this.obj, this.formObj);
      }
    }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.el-date-picker,
.is-bordered,
.el-date-picker--small,
.el-input,
.el-input--small,
.el-input-group,
.el-input-group--prepend {
  /* */
}

.tips-box {
  /* outline: 1px dashed red; */
  .tips-label,
  .name-label,
  .type-label {
    font-size: 12px;
    display: none;
  }
}

.tips-box:hover,
.tips-box:active,
.tips-box:focus {
  /* border-radius: 10px;
    border: 1px dashed red; */
  outline: 1px dashed #ff000070;
  background: #fffff0;
  cursor: move;
  .tips-label,
  .name-label,
  .type-label {
    display: inherit;
    vertical-align: top;
  }
  .tips-label {
    font-size: 12px;
    color: white;
    background: #ff000070;
    padding: 3px 5px;
  }

  .name-label {
    color: white;
    background: #559e3f70;
  }

  .type-label {
    color: white;
    background: #3f519e70;
  }

  .value-label {
    background: #559e3f70;
    color: white;
  }

  .opt-label {
    font-size: 12px;
    color: rgb(81, 128, 216);
    background: transparent;
    cursor: pointer;
    outline: 0px dashed rgb(81, 128, 216);
    margin: 0px 0 0 0px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 3px 5px;
  }

  .opt-label:hover {
    color: #3f519e70;
  }
}
</style>
