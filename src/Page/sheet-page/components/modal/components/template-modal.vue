<template>
  <div>
    <div class="search-con" style="line-height:32px" flex>
      <span style="font-size:14px;">模板分类：</span>
      <el-radio v-model="selectedObj.deptType" label="dept">科室</el-radio>
      <el-radio
        v-model="selectedObj.deptType"
        label="common"
        style="margin-right:10px"
        >公共</el-radio
      >
      <el-button @click="delActiveType" :disabled="canDelete" size="mini"
        >删除当前分类<i class="el-icon-delete"></i>
      </el-button>
    </div>
    <!--佛一要求增加 表单的筛选  可以查找其他护记的模板-->
    <div class="search-con" v-if="selectedObj.deptType == 'dept'">
      <el-select
        v-model="selectedObj.templateCode"
        filterable
        placeholder="筛选表单模板"
        :popper-append-to-body="false"
        style="width: 320px;"
      >
        <el-option
          v-for="(item, key) in formList"
          :key="key"
          :label="item.recordName"
          :value="item.recordCode"
          :value-key="item.recordCode"
        >
        </el-option>
      </el-select>
    </div>
    <div class="search-con" flex>
      <div class="select-box" :style="{ width: selectWidth + 'px' }">
        <el-select
          v-model="selectedObj.selectedType"
          filterable
          placeholder="请选择"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="(item, key) in typeList"
            :key="key"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <input
        type="text"
        flex-box="1"
        class="search-input"
        placeholder="请输入你要查找的模版…"
        v-model="searchWord"
      />
    </div>
    <div
      class="list-con"
      v-if="selectedObj.selectedType == '特殊符号'"
      :style="listconHeight"
    >
      <ul class="specific_symbol">
        <template>
          <li
            v-for="item in specificSymbol"
            :key="item"
            @click="addTemplateAtDoc(item)"
          >
            {{ item }}
          </li>
        </template>
      </ul>
    </div>
    <div class="list-con" v-else :style="listconHeight">
      <div v-if="HOSPITAL_ID == 'nfyksdyy'" class="test_wrapper" @dragover="dragover($event)">
        <transition-group  class="transition-wrapper" name="sort">
          <div
          v-for="item in filterData"
          :key="item.id"
          :draggable="true"
          @dragstart="dragstart(item)"
          @dragenter="dragenter(item,$event)"
          @dragend="dragend(item,$event)"
          @dragover="dragover($event)"
          >
            <templateItem
              :data="item"
              @openAddModal="data => $emit('openAddModal', data)"
            ></templateItem>
          </div>
        </transition-group>
      </div>
      <div v-else>
        <div
          v-for="(item, key) in filterData"
          :key="key"
        >
          <templateItem
            :data="item"
            :key="item.id"
            @openAddModal="data => $emit('openAddModal', data)"
          ></templateItem>
        </div>
      </div>
      <div style="height: 60px;"></div>
    </div>
  </div>
</template>

<script>
import templateItem from "./template-item.vue";
import specificSymbolArr from "../eval-model/specificSymbol";
import {
  typeListByDept,
  listFsry,
  delByType,
  listRecord,
  getBatchSaveOrUpdateByDept
} from "@/Page/sheet-page/api/recordDesc.js";
import bus from "vue-happy-bus";
import nullBgVue from "@/components/null/null-bg.vue";
export default {
  components: {
    templateItem
  },
  props: {
    selectedSheetType: {
      type: String,
      default: ""
    },
    selectType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      bus: bus(this),
      searchWord: "",
      selectedTab: "1",
      isShow: false,
      selectedObj: {
        selectedType: this.selectType,
        templateCode: this.selectedSheetType,
        deptType: "dept"
      },
      formList: [],
      listMap: [],
      selectWidth: 100,
      typeList: [],
      oldData:null, // 开始排序时按住的旧数据
      newData:null // 拖拽过程的数据
    };
  },
  created() {
    this.initData();
    this.initTypeData();
    this.bus.$on("reflashTitleItem", () => {
      this.initTypeData();
      this.initData();
    });
  },
  methods: {
    //把标题添加到护记特殊记录输入框
    addTemplateAtDoc(item) {
      this.bus.$emit("addTemplateAtDoc", item);
    },
    initialize() {
      this.formList = [];
      this.listMap = [];
      this.typeList = [];
    },
    //初始化类型数据，每次切换类型的时候执行
    async initTypeData() {
      await this.initialize();
      if (localStorage.wardCode)
        typeListByDept(localStorage.wardCode, this.HOSPITAL_ID).then(res => {
          const typeListRes = res.data.data[`${this.selectedObj.deptType}`];
          this.typeList = typeListRes.map(list => {
            return { label: list, value: list == "全部" ? "" : list };
          });
          if (!typeListRes.includes("全部")) {
            this.typeList.unshift({ label: "全部", value: "" });
          }
          this.typeList.push({ label: "特殊符号", value: "特殊符号" });
        });
    },
    async initData() {
      await this.initialize();
      //初始化列表记录 根据表单编码
      const wordCode =
        this.selectedObj.deptType === "dept" ? localStorage.wardCode : "";
      let code = this.selectedObj.templateCode
        ? this.selectedObj.templateCode
        : this.selectedSheetType || "orthopaedic_fs";
      if (this.deptCode) {
        listRecord(this.deptCode).then(res => {
          this.formList = Array.from(res.data.data.list);
        });
      }
      if (code)
        listFsry(this.selectedObj.selectedType, wordCode, code).then(res => {
          res.data.data.list.map((item,index) => item.sorted = item.sorted ? item.sorted : index)
          this.listMap = Array.from(res.data.data.list);
        });
    },
    delActiveType() {
      this.$confirm(
        `此操作将永久删除${this.selectedObj.selectedType}该分类, 是否继续?`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          title: "提示"
        }
      ).then(() => {
        const wardCode =
          this.selectedObj.deptType === "dept" ? localStorage.wardCode : "";
        const user = JSON.parse(localStorage.getItem("user"));
        delByType(this.selectedObj.selectedType, wardCode, user.empNo).then(
          async res => {
            this.initTypeData();
            this.initData();
            await this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        );
      });
    },
    dragstart(value) {
      this.oldData = value
    },

    // 记录移动过程中信息
    dragenter(value, e) {
      this.newData = value
      e.preventDefault();
        let usel =  document.querySelector('#footer-isshow')
      if(e.screenY >= 1000){
        usel.classList.add("isshow-footer")
      }else{
        usel.classList.remove("isshow-footer")
      }
    },
   // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
    dragover(e) {
      e.preventDefault()
    },
    // 拖拽最终操作
    dragend(value, e) {
      if (this.oldData !== this.newData) {
        let oldIndex = this.listMap.indexOf(this.oldData)
        let newIndex = this.listMap.indexOf(this.newData)
        let newItems = [...this.listMap]
        let templist = newItems[newIndex].sorted;
        newItems[newIndex].sorted = newItems[oldIndex].sorted;
        newItems[oldIndex].sorted = templist;
        // 删除老的节点
        newItems.splice(oldIndex, 1)
        // 在列表中目标位置增加新的节点
        newItems.splice(newIndex, 0, this.oldData)
        this.listMap = [...newItems]
        setTimeout(()=>{ if(document.querySelector('#footer-isshow').classList.value.includes("isshow-footer")){
          document.querySelector('#footer-isshow').classList.remove("isshow-footer")
        }},0)

        const user = JSON.parse(localStorage.getItem("user"));
        getBatchSaveOrUpdateByDept(this.listMap, user.empNo).then(res => {})
      }
    }

  },
  computed: {
    canDelete() {
      let flag = false;
      if (
        this.selectedObj.selectedType === "特殊符号" ||
        this.selectedObj.selectedType === "全部" ||
        this.selectedObj.selectedType === ""
      ) {
        flag = true;
      }
      return flag;
    },
    specificSymbol() {
      return specificSymbolArr.filter(item => {
        return (
          (item || "").indexOf(this.searchWord) > -1 ||
          (item || "").indexOf(this.searchWord) > -1
        );
      });
    },
    filterData() {
      return this.listMap.filter(item => {
        return (
          (item.content || "").indexOf(this.searchWord) > -1 ||
          (item.title || "").indexOf(this.searchWord) > -1
        );
      });
    },
    listconHeight() {
      let str = "";
      if (
        this.HOSPITAL_ID === "liaocheng" ||
        this.HOSPITAL_ID === "wujing" ||
        this.HOSPITAL_ID === "huadu" ||
        this.HOSPITAL_ID === "foshanrenyi" ||
        this.HOSPITAL_ID === "nfyksdyy"
      ) {
        str = "height: calc(100vh - 246px)";
      }
      return str;
    },
    //登录的科室编码
    deptCode() {
      return this.selectedObj.deptType === "dept" ? localStorage.wardCode : "";
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    }
  },
  watch: {
    selectedObj: {
      handler(newName, oldName) {
        this.initTypeData();
        this.initData();
      },
      deep: true
    },
    "selectedObj.templateCode": {
      handler(newName, oldName) {
        this.selectedObj.selectedType = "";
      },
      deep: true
    }
  }
};
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
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.sort-move {
  transition: transform 0.8s;
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
