<template>
  <SweetModal ref="modal" title="创建模板" :modal-width="420">
    <div class="template-modal">
      <ElForm style="margin-bottom: 20px">
        <ElFormItem label="模板类型" v-if="patient">
          <ElSelect v-model="form.templateType">
            <ElOption :label="item.name" :value="String(index+1)" v-for="(item,index) in modalData" :key="item.name"/>
            <!-- <ElOption label="白班" value="1" />
            <ElOption label="小夜" value="2" /> -->
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="类型" v-else>
          <ElAutocomplete v-model="form.type" :fetch-suggestions="getTypes" />
        </ElFormItem>
        <ElFormItem label="标题">
          <ElInput v-model="form.title" />
        </ElFormItem>
        <ElFormItem label="内容">
          <ElInput type="textarea" v-model="form.content" />
        </ElFormItem>
      </ElForm>
    </div>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" type="primary" @click="onConfirm">确定</ElButton>
  </SweetModal>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";

import * as apis from "../apis";

const defaultForm = {
  title: "",
  type: "",
  templateType: "1",
  content: "",
};

export default {
  mixins: [common],
  props: {
    patient: Boolean,
    tab: String,
    modalData: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    types: [],
    form: { ...defaultForm }
  }),
  methods: {
    async open(form) {
      if (form) {
        this.form = { ...form };
      } else {
        this.form = { ...defaultForm, templateType: this.tab };
      }

      if (!this.patient) {
        const res = await apis.listType(this.deptCode);
        this.types = res.data.data;
      }

      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    getTypes(q, cb) {
      cb(this.types.map((value) => ({ value })));
    },
    onClose() {
      this.close();
    },
    onConfirm() {
      const { id, templateType } = this.form;
      const title = (this.form.title || "").trim();
      const content = (this.form.content || "").trim();
      const type = (this.form.type || "").trim();

      if (!title) {
        this.$message.error("请输入标题");
        return;
      }

      if (!content) {
        this.$message.error("请输入内容");
        return;
      }

      if (!this.patient && !type) {
        this.$message.error("请输入类型");
        return;
      }

      this.$emit("confirm", {
        id,
        title,
        content,
        type,
        templateType,
        deptCode: this.deptCode,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.template-modal {
  >>>.el-form-item {
    margin-bottom: 0;
  }

  >>>.el-select, >>>.el-autocomplete {
    width: 100%;
  }

  >>>.el-select-dropdown {
    z-index: 20000 !important;
  }
}
</style>
