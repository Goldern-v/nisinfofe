<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="460"
      :title="modalTitle"
      :enable-mobile-fullscreen="false"
    >
      
      <div flex="main:justify cross:center" style="margin-bottom: 20px">
        <p for class="title" style="margin-right: 10px">类别：</p>
        <el-input v-model="groupName" placeholder="请输入类别"></el-input>
        <!-- <el-autocomplete
          style="width: 100%"
          v-model="groupName"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
        ></el-autocomplete> -->
      </div>
      <div flex="main:justify cross:center" style="margin-bottom: 20px">
        <p for class="title" style="margin-right: 10px">类型：</p>
        <el-select style="width: 100%"  @change="selectChangeType" v-model="selectedType" placeholder="请选择">
          <el-option v-for="item in type" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div v-if="selectedType === '科室'" flex="main:justify cross:center" style="margin-bottom: 20px">
        <p for class="title" style="margin-right: 10px">科室：</p>
        <el-select
          style="width: 100%"
          v-model="deptValue"
          filterable
          placeholder="请选择科室"
          autocomplete="off"
        >
          <el-option
            v-for="item in deptList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </div>
      <div>
        <div v-if="selectedType !== '公共'" flex="main:justify cross:center" style="margin-bottom: 20px">
          <p for class="title" style="margin-right: 10px">表单：</p>
          <el-select
            style="width: 100%"
            v-model="formCode"
            filterable
            placeholder="请选择表单"
            autocomplete="off"
          >
            <el-option
              v-for="item in formCodeList.filter(item => item.code !== 'all' && item.code !== '000000')"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div flex="main:justify cross:center" style="margin-bottom: 20px">
        <p for class="title" style="margin-right: 10px">标题：</p>
        <el-input type="text" v-model="title"></el-input>
      </div>
      <div flex="main:justify cross:top" style="margin-bottom: 10px">
        <p for class="title" style="margin-right: 10px">内容：</p>
        <el-input type="textarea" v-model="content"></el-input>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">保存</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title
  width 60px
  font-weight bold
>>>textarea
  height 100px
>>>.el-input__inner
  width 100%
  height 37px
</style>

<script>
import { typeList, saveOrUpdate_foshanshiyi, list, add, update } from "../../api/template.js";
import bus from "vue-happy-bus";
import { keyNameMap, keyCodeMap } from "./deptMapList";
import commom from "@/common/mixin/common.mixin.js";
import { nursingUnit } from "@/api/lesion";
export default {
  mixins: [commom],
  props: ['formCodeList'],
  data() {
    return {
      bus: bus(this),
      groupName: "",
      title: "",
      content: "",
      id: "",
      userEmpNo: '',
      typeList: "",
      selectedType: '公共',
      deptValue: '',
      type: ['公共', '科室'],
      deptENName: keyNameMap[this.deptName] || "neurology",
      deptList: [],
      deptId: '',
      user: localStorage.user && JSON.parse(localStorage.user),
      formCode: '000000',
      groupId: ''
    };
  },
  computed: {
    modalTitle() {
      if (this.id) {
        return "编辑常用语模版";
      } else {
        return "新建常用语模版";
      }
    }
  },
  methods: {
    selectChangeType(val) {
      if (val === '公共') 
        this.formCode = '000000'
      else this.formCode = this.id ? this.formCode : ''
    },
    getDeptLists() {
      nursingUnit().then(res => {
        if (res.data.code === '200')
          this.deptList = res.data.data.deptList;
      });
    },
    open(item) {
      // console.log(item,'item')
      this.$refs.modal.open();
      this.getDeptLists()
      // this.getData();
      // let user = localStorage.user && JSON.parse(localStorage.user)
      // if (this.selectedType === '公共') this.deptValue = ''

      // if (this.isRoleManage) {
      //   // let user = localStorage.user && JSON.parse(localStorage.user)
      //   this.type = ['科室']
      //   this.selectedType = '科室'
      //   this.deptValue = this.user.deptCode
      // }
      if (item) {
        (this.groupName = item.groupName), (this.title = item.title);
        this.content = item.content;
        this.id = item.id;
        this.groupId = item.groupId
        this.userEmpNo = item.empNo
        this.deptId = item.wardCode
        this.deptValue = item.wardCode
        this.formCode = item.moduleCode
        if (item.wardCode !== '000000') {
          this.type = ['科室']
          this.selectedType = '科室'
          // this.formCode = item.moduleCode
        } else {
          this.type = ['公共']
          this.selectedType = '公共'
        }
      } else {
        (this.groupName = ""), (this.title = "");
        this.content = "";
        this.id = "";
        this.userEmpNo = ''
        this.deptId = ''
        this.deptValue = this.user.deptCode
        this.type = this.isRoleManage && !this.isNewAdminOrNursingDepartment ?  ['科室'] : ['公共', '科室']
        if (this.isRoleManage && !this.isNewAdminOrNursingDepartment) {
          this.type = ['科室']
          this.selectedType = '科室'
        } else {
          this.type = ['公共', '科室']
          this.selectedType = '公共'
        }
      }
    },
    close() {
      this.$refs.modal.close();
      this.selectedType = '公共',
      this.deptValue = ''
    },
    post() {
      let code = this.selectedType === '公共' ? '000000' : this.deptValue
      let http = this.id ? update(
        this.groupName,
        this.title,
        this.content,
        code,
        this.formCode,
        this.groupId,
        this.id
      ) : 
      add(
        this.groupName,
        this.title,
        this.content,
        code,
        this.formCode
      )
      http.then(res => {
        if (this.id) {
          this.$message.success("更新常用语模版成功");
        } else {
          this.$message.success("保存常用语模版成功");
        }
        this.bus.$emit("refreshTemplateAdd", { groupName: this.groupName, formCode: this.formCode, deptCode: code, selectedType: this.selectedType, id: this.id });
        this.close();
      });


      


    },
    querySearch(queryString, cb) {
      cb(
        queryString
          ? this.typeList.filter(item => item.value.indexOf(queryString) > -1)
          : this.typeList
      );
    },
    getData() {
      typeList().then(res => {
        this.typeList = res.data.data.list.map(item => {
          return {
            value: item
          };
        });
      });
    }
  },
  created() {
    // this.getDeptLists()
    this.bus.$on("openAddTemplateModal", item => {
      this.open(item);
    });
    
  },
  components: {}
};
</script>
