<template>
  <div class="toolbar">
    <span>科室：</span>
    <ElSelect size="small" :value="$route.params.code" @input="onCodeChange">
      <ElOption
        v-for="d of depts"
        :key="d.deptCode"
        :label="d.deptName"
        :value="d.deptCode"
      />
    </ElSelect>
    <button class="button" @click="onSave(true)">保存</button>
    <button class="button" @click="onPrint">打印预览</button>
    <div class="empty"></div>
    <button class="button" @click="onRemove">删除整单</button>
  </div>
</template>
<style lang="scss" scoped>
.toolbar{
    height: 41px;
    background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
    border: 1px solid #CBD5DD;
    overflow: hidden;
    font-size: 14px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    .empty{
      flex:1;
    }
    .el-select{
      margin-left: 8px;
      margin-right: 10px;
    }
    .button{
    display: inline-block;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 28px;
    font-size: 12px;
    color: #333;
    background: #fff;
    border: 1px solid #cbd5dd;
    border-radius: 2px;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;

    &:hover{
      font-weight: bold;
    }
    &{
      margin-left: 10px;
    }
    &[disabled]{
      cursor: default;
      opacity: 0.5;
      &:hover{
        font-weight: normal;
        }
    }
    }
}
</style>
<script>
import { listDepartment } from "../apis/index.js";
export default {
  props: {
    deptCode: String
  },
  data() {
    return {
      depts: []
    };
  },
  created() {
    this.handleDeptCode();
  },
  methods: {
    async handleDeptCode() {
      let res1= await listDepartment(this.deptCode);
      const {
        data: { data: depts }
      } = res1;

      this.depts = depts;
      const code = depts[0] && depts[0].deptCode;
      const params = this.$route.params;

      if (!params.code) {
        this.$router.push({ path: `/checkSheets/${code}` });
      }
    },
    onCodeChange(code) {
      this.$router.push({ path: `/checkSheets/${code}` });
    },
    onSave() {},
    onPrint() {},
    onRemove() {}
  },
  components: {
  }
};
</script>
