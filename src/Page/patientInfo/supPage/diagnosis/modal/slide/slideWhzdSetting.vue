<template>
  <div class="whzdSetting">
    <sweet-modal ref="whzdSetting" :title="title" @close="beforeClose">
      <div class="content">
        <div class="item">
          <span>模板类型：</span>
          <el-select
            v-model="diagnosis.deptType"
            placeholder="请选择"
            size="small"
            autocomplete="off"
            style="width: 100%"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>编号：</span>
          <div class="tip">系统自动生成</div>
          <span>护理问题：</span>
          <el-input v-model="diagnosis.name" />
        </div>
        <div class="item">
          <span>问题定义：</span>
          <el-input v-model="diagnosis.definition" />
        </div>
        <div class="item">
          <span>症状：</span>
          <el-input v-model="diagnosis.symptom" />
        </div>
        <template v-for="(measure, index) in measures">
          <div class="item" :key="index + 'measure'">
            <span>{{ index == 0 ? "护理措施：" : "" }}</span>
            <el-input v-model="measure.measureDetail" />
            <div
              @click="add('measures', measures, 'measureDetail', index)"
              class="btn add"
            >
              +
            </div>
            <div
              @click="todelete('measures', measures, index)"
              class="btn delete"
            >
              -
            </div>
          </div>
        </template>
        <template v-for="(target, index) in targetList">
          <div class="item" :key="index + 'target'">
            <span>{{ index == 0 ? "预期目标：" : "" }}</span>
            <el-input v-model="target.parameter" />
            <div
              @click="add('targetList', targetList, 'parameter', index)"
              class="btn add"
            >
              +
            </div>
            <div
              @click="todelete('targetList', targetList, index)"
              class="btn delete"
            >
              -
            </div>
          </div>
        </template>
        <template v-for="(factor, index) in factorList">
          <div class="item" :key="index + 'factor'">
            <span>{{ index == 0 ? "问题因素：" : "" }}</span>
            <el-input v-model="factor.factor" />
            <div
              @click="add('factorList', factorList, 'factor', index)"
              class="btn add"
            >
              +
            </div>
            <div
              @click="todelete('factorList', factorList, index)"
              class="btn delete"
            >
              -
            </div>
          </div>
        </template>
      </div>
      <div class="footer-Btn">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post"
          >确认</el-button
        >
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='scss' scoped>
.whzdSetting {
  .sweet-modal-overlay {
    z-index: 10002;
  }
  .content {
    .item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
      > span:first-of-type {
        min-width: 70px;
        text-align: right;
      }
      .tip {
        padding: 5px 10px;
        background: #f2f2f2;
        margin-right: 5px;
      }
      .el-input {
        flex: 1;
      }
      .btn {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
        background: #4bb08d;
        color: #fff;
        text-align: center;
        line-height: 20px;
        &:hover {
          background: rgb(111, 192, 164);
          border-color: rgb(111, 192, 164);
        }
        &.add {
          margin: 0 10px;
        }
      }
    }
  }
  .footer-Btn {
    text-align: center;
    margin-top: 50px;
  }
}
</style>
<script>
let defaultmeasure = {
  id: "",
  isDelete: false,
  measureId: "",
  measure: "",
  type: "",
  measureDetail: "",
};
let defaulttarget = {
  id: "",
  code: "",
  expect: "",
  parameter: "",
  remark: "",
  serialNo: "",
};
let defaultfactor = {
  id: "",
  code: "",
  factor: "",
  serialNo: "",
};
let defaultDiagnosis = {
  deptType: "公共",
  name: "",
  code: "",
  id: "",
  definition: "",
  symptom: "",
};

import { editDiagnosis } from "../../api/index";
import bus from "vue-happy-bus";

export default {
  props: {},
  data() {
    return {
      bus: bus(this),
      diagnosis: { ...defaultDiagnosis },
      measures: [{ ...defaultmeasure }],
      targetList: [{ ...defaulttarget }],
      factorList: [{ ...defaultfactor }],
      typeList: [
        {
          label: "公共",
          value: "公共",
        },
        {
          label: "科室",
          value: "科室",
        },
      ],
      title: "新增护理诊断",
    };
  },
  methods: {
    post() {
      let arr = [this.factorList,this.measures,this.targetList]
      arr.forEach(item=>{
        item.forEach((li,index)=>li.serialNo=(parseInt(index)+1))
      })
      let params = {
        factorList:this.factorList,
        measures: this.measures,
        targetList: this.targetList,
        diagnosis: {...this.diagnosis,wardCode:this.wardCode},
      };
      editDiagnosis(params).then((res) => {
        this.$emit("refresh");
        this.bus.$emit("refresh")
        this.close();
        this.$message.success("保存成功");
      });
    },
    todelete(type, list, index) {
      if (list.length === 1) return this.$message.warning("已经是最后一条了");
      list.splice(index, 1);
    },
    add(type, list, key, index) {
      if (list.find((li) => !li[key]))
        return this.$message.warning("前面仍有未填值存在，请先填完再添加");
      switch (type) {
        case "measures":
          this.measures.splice(index + 1, 0, { ...defaultmeasure });
          break;
        case "targetList":
          this.targetList.splice(index + 1, 0, { ...defaulttarget });
          break;
        case "factorList":
          this.factorList.splice(index + 1, 0, { ...defaultfactor });
          break;
      }
    },
    open(config) {
      if (config) {
        (this.measures = config.measures),
          (this.targetList = config.targetList),
          (this.factorList = config.factorList),
          (this.diagnosis = config.diagnosis);
        this.title = "编辑护理诊断";
      }
      this.$refs.whzdSetting.open();
    },
    beforeClose() {
      this.measures = [{ ...defaultmeasure }];
      this.targetList = [{ ...defaulttarget }];
      this.factorList = [{ ...defaultfactor }];
      this.diagnosis = { ...defaultDiagnosis };
      this.title = "新增护理诊断";
    },
    close() {
      this.$refs.whzdSetting.close();
    },
  },
  computed: {
    wardCode() {
      let code = localStorage.getItem("wardCode");
      return code;
    },
  },
  components: {},
};
</script>