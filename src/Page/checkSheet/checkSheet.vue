<template>
  <div class="content-main" v-loading="loading">
    <div class="table-mian">
      <div class="toolbar">
        <span>科室：</span>
        <ElSelect
          size="small"
          :value="$route.params.code"
          @input="onCodeChange"
        >
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
      <div class="teble-content" v-if="!isEmpty">
        <checkSheetTable ref="ContainTable" :checkData="sheetData"></checkSheetTable>
      </div>
      <Placeholder
        v-else
        icon="el-icon-plus"
        @click="onCreateModalOpen($route.params.code)"
        >创建医嘱查对登记表</Placeholder
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-main {
  height: 100vh;
  display: flex;
  .toolbar {
    height: 40px;
    background-image: linear-gradient(-180deg, #f8f8fa 0%, #ebecf0 100%);
    border: 1px solid #cbd5dd;
    overflow: hidden;
    font-size: 14px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    .empty {
      flex: 1;
    }
    .el-select {
      margin-left: 8px;
      margin-right: 10px;
    }
    .button {
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

      &:hover {
        font-weight: bold;
      }
      & {
        margin-left: 10px;
      }
      &[disabled] {
        cursor: default;
        opacity: 0.5;
        &:hover {
          font-weight: normal;
        }
      }
    }
  }
  .table-mian {
    width: 100%;
  }
  .teble-content {
    height: calc(100vh - 40px);
    overflow-y: auto;
  }
  .left {
    width: 250px;
    height: 100%;
  }
}
</style>
<script>
import checkSheetTable from "./components/checkSheetTable.vue";
import Placeholder from "./components/placeholder.vue";
import { listDepartment,getOrderCheckByData, saveOrderCheck} from "./apis/index.js";
import $ from "jquery";
export default {
  inject: [
    "getFullPage",
    "reloadSideList",
    "onCreateModalOpen",
    "onToggleFullPage",
  ],
  props: {},
  data() {
    return {
      depts: [],
      loading:false,
      sheetData: Array.from({ length: 14 }, () => {
        return { aDuty:'',aHeadNurse:'',aNight:'',aPrincipal:'',nNextDay:'',nNextNurse:'',nNight:'',orderCheckDate:''};
      })
    };
  },
  computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode;
    },
    isEmpty() {
      return !this.$route.params.id;
    },
  },
  created(){
    this.handleDeptCode()
  },
  watch: {
    deptCode() {
      this.handleDeptCode();
    },
    "$route.params.id"(newId) {
      if(newId) this.loadTable()
    }
  },
  methods: {
     async loadTable(){
      this.loading = true
      const {data:res} = await getOrderCheckByData(this.$route.params.id)
      if(res.code == '200'){
        this.sheetData.forEach((item,index) => {
          if(!res.data[index]) return
          this.$set(this.sheetData, index,  res.data[index])
        })
        this.loading = false;
      }else{
        this.loading = false;
      }
    },
    async handleDeptCode() {
      let res1 = await listDepartment(this.deptCode);
      const {
        data: { data: depts },
      } = res1;

      this.depts = depts;
      const code = depts[0] && depts[0].deptCode;
      const params = this.$route.params;

      if (!params.code) {
        this.$router.push({ path: `/checkSheets/${code}` });
      }
    },
    onCodeChange(code) {
      let dataDept = this.depts.find((item) => item.deptCode == code);
      this.$store.commit("upCheckDeptName", dataDept.deptName);
      this.$router.push({ path: `/checkSheets/${code}` });
    },
    async onSave() {
      let list = {
       orderCheckId:this.$route.params.id,
       deptCode:this.deptCode,
       orderCheckSaves:this.sheetData
      }
      const {data} = await saveOrderCheck(list)
      console.log(data);
    },
    onPrint() {
      window.localStorage.checkSheet = $(this.$refs.ContainTable).html();
    },
    onRemove() {},
  },
  components: {
    checkSheetTable,
    Placeholder,
  },
  // async beforeRouteUpdate(to, from, next) {
  //   if (from.params.id && from.params.id !== to.params.id) {
  //     await this.$confirm("交班志还未保存，离开将会丢失数据", "提示", {
  //       confirmButtonText: "离开",
  //       cancelButtonText: "取消",
  //       type: "warning"
  //     });

  //     this.$refs.table.selectRow(-1);
  //   }

  //   next();
  // },
};
</script>
