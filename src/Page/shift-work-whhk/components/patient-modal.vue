<template>
  <SweetModal ref="modal" :title="modalData.title" :modal-width="760" @close="onPanelClose">
    <div class="head">
      <label>
        <span>床号：</span>
        <ElInput
          type="text"
          style="width:60px;"
          ref="input"
          v-model="form.bedLabel"
          :disabled="bedLabelDisabled"
          @input="onBedLabelChange"
          @blur="onLoadPatient"
          @keyup.native.enter="onLoadPatient"
        />
      </label>
      <label>
        <span>姓名：</span>
        <ElInput
          type="text"
          ref="name"
          style="width:100px;"
          v-model="form.name"
          :disabled="!isSignedN"
        />
      </label>
      <a v-if="!isSignedN" class="action" @click="onPanelOpen">+ 模板</a>
    </div>
    <div class="content">
      <ElTabs class="tabs" v-model="tab" type="card" @input="onTabChange">
        <ElTabPane :label="tabItem.name" :name="String(index+1)" v-for="(tabItem,index) in modalData.tabs" :key="tabItem.name">
          <div v-for="item in tabItem.editContent" :key="item.title">
            <div class="label">{{item.title}}</div>
            <ElInput
              type="textarea"
              :rows="4"
              v-model="form[item.prop]"
              :disabled="isSignedN"
            />
          </div>
        </ElTabPane>

        <!-- <ElTabPane label="白班" name="1">
          <div class="label">诊断</div>
          <ElInput
            type="textarea"
            ref="diagnosis"
            :rows="4"
            v-model="form.diagnosis"
            :disabled="isSignedN"
          />
          <div class="label">交班内容</div>
          <ElInput
            type="textarea"
            ref="remark1"
            :rows="4"
            v-model="form.remark1"
            :disabled="isSignedN"
          />
        </ElTabPane>
        <ElTabPane label="小夜" name="2">
          <div class="label">诊断</div>
          <ElInput
            type="textarea"
            ref="diagnosis"
            :rows="4"
            v-model="form.diagnosis"
            :disabled="isSignedN"
          />
          <div class="label">交班内容</div>
          <ElInput
            type="textarea"
            ref="remark3"
            :rows="4"
            v-model="form.remark3"
            :disabled="isSignedN"
          />
        </ElTabPane>
        <ElTabPane label="大夜" name="3">
          <div class="label">诊断</div>
          <ElInput
            type="textarea"
            ref="diagnosis"
            :rows="4"
            v-model="form.diagnosis"
            :disabled="isSignedN"
          />
          <div class="label">交班内容</div>
          <ElInput
            type="textarea"
            ref="remark2"
            :rows="4"
            v-model="form.remark2"
            :disabled="isSignedN"
          />
        </ElTabPane> -->
      </ElTabs>
    </div>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" type="primary" @click="onConfirm">保存</ElButton>
  </SweetModal>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";

import * as apis from "../apis";
import Button from "./button";

const defaultForm = {
  name: "",
  bedLabel: "",
  patientStatus: "",
  diagnosis: "",
  remark1: "",
  remark2: "",
  remark3: "",
};

export default {
  mixins: [common],
  props: {
    date: String,
    modalData: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    tab: "",
    bedLabelDisabled: false,
    isSignedN: false,
    form: { ...defaultForm },
  }),
  methods: {
    open(tab, form, autoFocus, isSignedN) {
      this.tab = tab || "1";
      this.form = { ...defaultForm, ...form };
      this.bedLabelDisabled = !!form;
      this.isSignedN = !!isSignedN;
      this.$refs.modal.open();

      if (!autoFocus || autoFocus === "bedLabel") {
        this.$nextTick(() => this.$refs.input.$refs.input.focus());
      } else if (autoFocus === "name") {
        this.$nextTick(() => this.$refs.input.$refs.input.focus());
        // this.$nextTick(() => this.$refs[autoFocus].$refs.input.focus())
      } else if (autoFocus && this.$refs[autoFocus]) {
        this.$nextTick(() => this.$refs[autoFocus].$refs.textarea.focus());
      }
    },
    close() {
      this.$refs.modal.close();
    },
    changeTab(tab = "1") {
      this.tab = tab;
    },
    applyTemplate(tab, item) {
      if (tab === "1") {
        this.form.remark1 = (this.form.remark1 || "") + item.content;
      } else if (tab === "2") {
        this.form.remark3 = (this.form.remark3 || "") + item.content;
      } else if (tab === "3") {
        this.form.remark2 = (this.form.remark2 || "") + item.content;
      }
    },
    onClose() {
      this.close();
    },
    onConfirm() {
      this.$emit("confirm", this.form);
    },
    onPanelOpen() {
      this.$emit("panel-open");
    },
    onPanelClose() {
      this.$emit("panel-close");
    },
    onTabChange(tab) {
      this.$emit("tab-change", tab);
    },
    onBedLabelChange() {
      this.form = { ...this.form, name: "", patientStatus: "" };
    },
    async onLoadPatient() {
      const bedLabel = this.form.bedLabel;
      if (!bedLabel) return;

      const params = this.$route.params;
      const {
        data: { data },
      } = await apis.getPatient(params.code, bedLabel, this.date);

      if (data) {
        const { testResult, examResult } = data;
        data.remark1 = data.remark1 || "";
        data.remark2 = data.remark2 || "";
        data.remark3 = data.remark3 || "";

        this.form = { ...this.form, ...data };
      } else {
        this.$message.error("找不到该患者");
      }
    },
  },
  components: {
    Button,
  },
};
</script>

<style lang="stylus" scoped>
.head {
  position: relative;
  margin-left: -10px;
  padding-right: 60px;
  display: flex;
  line-height: 32px;

  label {
    white-space: nowrap;
    margin-right: 20px;
  }

  .action {
    position: absolute;
    top: 0;
    right: 0;
    color: rgb(40, 79, 194);
    cursor: pointer;
  }
}

.tabs {
  margin-top: 20px;

  >>>.el-tabs__header {
    margin-left: -20px;
    margin-right: -20px;
    background: #F7FAFA;
    height: 36px;
  }

  >>>.el-tabs__item {
    height: 38px;
    border-radius: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &.is-active {
      margin-bottom: -1px;
      background: #fff;
      border-radius: 0;
      border-top: 3px solid #4BB08D;
      border-bottom: 3px solid transparent;
      box-sizing: border-box;
      color: #333;
      font-weight: 700;
    }
  }

  >>>.el-tabs__item {
    line-height: 38px;
  }
}

.content {
  height: 325px;

  .label {
    margin: 10px 0;
  }

  .textarea {
    >>>.el-textarea__inner {
      height: 232px;
    }
  }
}
</style>
