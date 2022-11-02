<template>
  <div>
    <!-- <div class="search-con" style="line-height:32px" flex>
      <span style="font-size:14px;">模板分类：</span>
      <el-radio v-model="selectedObj.deptType" label="dept">科室</el-radio>
      <el-radio v-model="selectedObj.deptType" label="common" style="margin-right:10px">公共</el-radio>
      <el-button @click="delActiveType" :disabled="canDelete" size="mini">删除当前分类<i class="el-icon-delete"></i>
      </el-button>
    </div> -->
    <!--佛一要求增加 表单的筛选  可以查找其他护记的模板-->
    <div class="search-con" >
      <el-select v-model="selectedObj.deptCode" filterable placeholder="筛选科室" :popper-append-to-body="false"
        style="width: 320px;">
        <el-option v-for="(item, key) in deptList" :key="key" :label="item.name" :value="item.code" :value-key="item.recordCode">
        </el-option>
      </el-select>
    </div>
    <div class="search-con">
      <el-select v-model="selectedObj.templateCode" filterable placeholder="筛选表单模板" :popper-append-to-body="false"
        style="width: 320px;">
        <el-option v-for="(item, key) in formList" :key="key" :label="item.recordName" :value="item.recordCode" :value-key="item.recordCode">
        </el-option>
      </el-select>
    </div>
    <div class="search-con" flex>
      <div class="select-box" :style="{ width: selectWidth + 'px' }">
        <el-select v-model="selectedObj.selectedType" filterable placeholder="请选择" :popper-append-to-body="false">
          <el-option v-for="(item, key) in typeList" :key="key" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <input type="text" flex-box="1" class="search-input" placeholder="请输入你要查找的模版…" v-model="searchWord" />
    </div>
    <div class="list-con"  :style="listconHeight">
      <div v-for="(item, key) in filterData" :key="key">
        <templateItem :data="item" :key="item.id"></templateItem>
      </div>
      <div style="height: 30px;"></div>
    </div>
  </div>

</template>

<script>
import templateItem from "./template-itemNoEdit.vue";
import specificSymbolArr from '../eval-model/specificSymbol'
import { typeListByDept, listFsry, listRecord ,nursingUnit} from "@/Page/sheet-page/api/recordDesc.js";
import bus from "vue-happy-bus";
export default {
  components: {
    templateItem
  },
  data() {
    return {
      bus: bus(this),
      searchWord: "",
      selectedTab: "1",
      isShow: false,
      deptList:false,
      deptValue:'',
      selectedObj: {
        selectedType: "",
        deptCode:'',
        templateCode:'',
        deptType:'dept'
      },
      formList: [],
      listMap: [],
      selectWidth: 100,
      typeList: [],
    };
  },
  created(){
    nursingUnit().then(res => {
      this.deptList = res.data.data.deptList;
      this.selectedObj.deptCode =
        res.data.data.defaultDept || this.deptCode;
    });
    this.initTypeData()
    this.initData()
  },
  methods: {
    //把标题添加到护记特殊记录输入框
    addTemplateAtDoc(item) {
      this.bus.$emit("addTemplateAtDoc", item);
    },
    //初始化类型数据，每次切换类型的时候执行
    async initTypeData() {
      if(this.selectedObj.deptCode)
      typeListByDept(this.selectedObj.deptCode, this.HOSPITAL_ID).then(res => {
        const typeListRes = res.data.data[`${this.selectedObj.deptType}`]
        this.typeList = typeListRes.map((list) => {
          return { label: list, value: list == '全部' ? '' : list }
        })
        if(!typeListRes.includes('全部')){
        this.typeList.unshift({ label: "全部", value: '' });
        }
        if(!this.selectedObj.templateCode) return
        this.initData()
      });
    },
   async initData() {
      //初始化列表记录 根据表单编码
      let code = this.selectedObj.templateCode
      if(code)
      listFsry(this.selectedObj.selectedType, this.selectedObj.deptCode, code).then(res => {
        this.listMap = Array.from(res.data.data.list)
      });
    },
    initFormList(){
      //每次初始化表单接口 就初始化当前选择表单为空
      this.selectedObj.templateCode = ''
      if(this.selectedObj.deptCode){
        listRecord(this.selectedObj.deptCode).then((res) => {
        this.formList = Array.from(res.data.data.list)
      })
      }
    }
  },
  computed: {
    specificSymbol(){
      return specificSymbolArr.filter(item => {
        return (
          (item|| "").indexOf(this.searchWord) > -1 ||
          (item || "").indexOf(this.searchWord) > -1
        );
      });;
    },
    filterData() {
      return this.listMap.filter(item => {
        return (
          (item.content || "").indexOf(this.searchWord) > -1 ||
          (item.title || "").indexOf(this.searchWord) > -1
        );
      });;
    },
    listconHeight() {
      return 'height: calc(100vh - 246px)'
    },
    //登录的科室编码
    deptCode() {
      return this.selectedObj.deptType === "dept" ? localStorage.wardCode : ""
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    }
  },
  watch: {
    "selectedObj.deptCode": {
      handler(newName, oldName) {
        //每次切换科室 选择的表单编码就变为空,选择类型为全部
        this.selectedObj.templateCode = ''
        this.selectedObj.selectedType = ''
        this.typeList = []
        this.initFormList()
        this.initTypeData()
      },
      deep: true,
    },

    "selectedObj.templateCode": {
      handler(newName, oldName) {
        this.selectedObj.selectedType = ''
        this.initData()
      },
      deep: true,
    },
    "selectedObj.selectedType": {
      handler(newName, oldName) {
        this.initData()
      },
      deep: true,
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-con {
  margin: 10px 20px;
  .search-input {
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 0;
    border-right: 0px;
    border-left: 0px;
    outline: none;
    padding-left: 10px;
    font-size: 12px;
    color: #687179;
    border-right: 1px solid #c2cbd2;
  }
}

.list-con {
  height: calc(100vh - 145px);
  overflow: auto;
  .specific_symbol {
    padding-left: 20px;

    li {
      display: inline-block;
      width: 27%;
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #eceeef;
      margin-right: 20px;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        background: #f4f2f5;
        cursor: pointer;
        transition: all 0.3s;
      }
    }
  }
}

.listMap-title {
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  padding-right: 50px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 14px;
}

.footer-con {
  height: 46px;
  background: #4BB08D;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #5CC6A1;
  }

  i {
    margin-right: 5px;
    font-weight: bold;
    font-size: 12px;
  }
}

.select-box {
  // margin-right 10px
  width: 100px;

  >>>.el-input__inner {
    height: 32px;
    background: #f7fafa;
    border-radius: 2px 0 0 2px;
  }
}

</style>
