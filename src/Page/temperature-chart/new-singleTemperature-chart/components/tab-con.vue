<template>
  <div class="right-con">
    <el-button size="mini" @click="addTab(editableTabsValue)">
      + 新建记录
    </el-button>
    <el-tabs v-model="editableTabsValue" type="card" tab-position="right">
      <!-- 获取该患者的前二十条体温单记录，label -->
      <el-tab-pane
        v-for="(item, index) in tabsData"
        :key="index"
        :label="`${item.recordMonth} ${item.recordHour}`"
        :name="item.recordMonth"
      >
        <el-form :model="item" ref="temperatureForm" label-width="85px">
          <div class="row">
            <el-form-item
              label="日期:"
              prop="recordMonth"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.recordMonth"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="时间:"
              prop="recordHour"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.recordHour"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="体温:"
              prop="temperature"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.temperature"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="脉搏:"
              prop="paluse"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.paluse"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="呼吸:"
              prop="breath"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.breath"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="血压:"
              prop="pressblood"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.pressblood"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="心率:"
              prop="heart"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.heart"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="疼痛:"
              prop="painScore"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.painScore"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="物理降温:"
              prop="physicalCooling"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.physicalCooling"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="疼痛降分:"
              prop="painDrop"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.painDrop"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="大便次数:"
              prop="stoolNum"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.stoolNum"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="尿量:"
              prop="fieldThree"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.fieldThree"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="引流量:"
              prop="foodSize"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.foodSize"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="痰量:"
              prop="fieldThree"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.fieldThree"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="总出量:"
              prop="dischargeSize"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.dischargeSize"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="入量:"
              prop="foodSize"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.foodSize"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="基础代谢:"
              prop=""
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.dischargeSize"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="体重:"
              prop="weight"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.weight"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="大便量:"
              prop=""
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.dischargeSize"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="呕吐量:"
              prop="weight"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.weight"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item
              label="身高:"
              prop="height"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.height"
                style="width: 80px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="血氧饱和:"
              prop="spo2"
              label-width="80px"
              class="is-bold"
            >
              <el-input
                size="mini"
                v-model="item.spo2"
                style="width: 80px"
              ></el-input>
            </el-form-item>
          </div>
          <div style="position:relative;left:20%;">
            <el-button style="width:200px;" type="primary">保存</el-button>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss" scoped>
.right-con {
  width: 100%;
  background: #fff;
  .el-form {
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .row-content-flex {
      .el-form-item__content {
        display: flex;

        .el-input {
          margin-right: 3px;
          flex: 1;
        }

        button {
          padding: 8px 10px;
        }
      }
    }

    .el-form-item {
      margin-bottom: 2px;

      .el-form-item__content {
        line-height: 32px;
      }

      > label {
        font-size: 12px;
        line-height: 32px;
        color: #000;
        padding: 0 5px 0 0;
      }

      p {
        color: #000;
        padding-bottom: 10px;
      }

      &.el-form-item-flex {
        .el-form-item__content {
          display: flex;
        }

        .el-input {
          flex: 1;
        }
      }

      .el-form-item__content {
        .el-select {
          width: 100%;
        }
      }

      .el-input-number {
        width: 125px;

        span {
          height: 32px;
          top: 0;
        }
      }

      .hide-label {
        .el-checkbox__label {
          display: none;
        }
      }
    }
  }
}
.el-tabs {
  display: flex;
  /deep/ .el-tabs__header {
    border: 1px solid #eee !important;
    height: 100%;
  }
  /deep/ .el-tabs__item {
    height: 34px;
    border: 1px solid #eee !important;
    &.is-active {
      background: #f1f1f5;
      color: #000;
    }
  }
  /deep/ .el-tabs__nav {
    display: flex;
    flex-direction: column;
  }
}
</style>
<script>
import { tabsData } from "../data.js";
export default {
  props: {},
  data() {
    return {
      editableTabsValue: "2",
      tabsData,
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
    }
  },
  components: {}
};
</script>
