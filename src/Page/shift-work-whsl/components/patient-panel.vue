<template>
  <SidePanel ref="panel">
    <div slot="title">患者ISBAR模版</div>
    <div class="container">
      <ElTabs class="tabs" v-model="tab" type="card">
        <ElTabPane label="主诉" name="1"></ElTabPane>
        <ElTabPane label="背景" name="2"></ElTabPane>
        <ElTabPane label="评估" name="3"></ElTabPane>
        <ElTabPane label="建议" name="4"></ElTabPane>
        <ElTabPane label="评价" name="5"></ElTabPane>
      </ElTabs>
      <div class="search-bar">
        <input class="input" type="text" v-model="title" placeholder="请输入你要查找的模板关键字" />
        <WhiteButton class="button" icon="icon-search" />
      </div>
      <div class="list">
        <TemplateItem
          v-for="item of filteredlist"
          :key="item.id"
          :listData="item"
          @click="onItemClick"
          @edit="onItemEdit"
          @remove="onItemRemove"
        />
      </div>
    </div>
    <div slot="footer">
      <PrimaryButton @click="onTemplateModalOpen">新建模板</PrimaryButton>
    </div>
    <TemplateModal patient ref="templateModal" :tab="tab" @confirm="onTemplateModalConfirm" />
  </SidePanel>
</template>

<script>
import WhiteButton from "@/components/button/white-button";
import common from "@/common/mixin/common.mixin.js";

import * as apis from "../apis";
import SidePanel from "./side-panel";
import PrimaryButton from "./primary-button";
import TemplateModal from "./template-modal";
import TemplateItem from "./template-item";

export default {
  mixins: [common],
  data: () => ({
    visible: false,
    tab: "1",
    title: "",
    list: []
  }),
  computed: {
    filteredlist() {
      const title = this.title.trim() || '';
      return this.list.filter(item => {
        return item.title.includes(title) || item.content.includes(title);
      });
    }
  },
  watch: {
    tab(tab) {
      this.load();
      this.$emit("tab-change", tab);
    }
  },
  methods: {
    async load() {
      if (!this.visible) return;
      const res = await apis.listTemplate(this.deptCode, "", this.tab, "");
      this.list = res.data.data;
      this.title = "";
    },
    open() {
      this.$refs.panel.open();
      this.visible = true;
      this.load();
    },
    close() {
      this.$refs.panel.close();
      this.visible = false;
    },
    changeTab(tab = "1") {
      if (this.tab !== tab) {
        this.tab = tab;
      }
    },
    onTemplateModalOpen() {
      this.$refs.templateModal.open();
    },
    async onTemplateModalConfirm(form) {
      console.log(form);
      await apis.updateTemplate(form);
      this.$refs.templateModal.close();
      this.load();
    },
    onItemClick(item) {
      this.$emit("apply-template", { tab: this.tab, item });
    },
    onItemEdit(item) {
      this.$refs.templateModal.open({ ...item });
    },
    async onItemRemove(item) {
      await this.$confirm("确定删除该模板？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      });
      await apis.removeTemplate(item.id);
      this.load();
    }
  },
  components: {
    SidePanel,
    WhiteButton,
    PrimaryButton,
    TemplateModal,
    TemplateItem
  }
};
</script>

<style lang="stylus" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 90px);
}

.tabs {
  margin-top: -1px;

  >>>.el-tabs__header {
    background: #F7FAFA;
  }

  >>>.el-tabs__item {
    height: 38px;
    border-radius: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &.is-active {
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

.search-bar {
  margin: 0 20px;
  display: flex;
  height: 32px;
  line-height: 32px;

  .input {
    flex: 1;
    padding: 0 10px;
    border: 1px solid #c2cbd2;
    border-right: 0;
    outline: none;
  }
}

.list {
  margin-top: 20px;
  flex: 1;
  overflow-y: auto;
}
</style>
