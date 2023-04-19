<!--佛一添加或者保存模板-->
<template>
  <div class="modal-con">
    <sweet-modal
      ref="modal"
      :modalWidth="460"
      :title="modalTitle"
      :enable-mobile-fullscreen="false"
    >
      <div style="margin-bottom: 20px">
        <span for class="title" style="margin-right: 10px">模板分类：</span>
        <el-radio v-model="templateType" label="dept">科室</el-radio>
        <el-radio v-model="templateType" label="common">公共</el-radio>
      </div>
      <div flex="main:justify cross:center" style="margin-bottom: 20px">
        <p for class="title" style="margin-right: 10px">类别：</p>
        <el-autocomplete
          style="width: 100%"
          v-model="groupName"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
        ></el-autocomplete>
      </div>
      <div flex="main:justify cross:center" style="margin-bottom: 20px">
        <p for class="title" style="margin-right: 10px">标题：</p>
        <el-input type="text" v-model="title"></el-input>
      </div>
      <div flex="main:justify cross:top" style="margin-bottom: 10px">
        <p for class="title" style="margin-right: 10px">内容：</p>
        <!-- 厚街——兼容富文本内容渲染 -->
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
.modal-con {
  >>>.sweet-modal {
    .sweet-content {
      height: 350px !important;
    }
  }

  .title {
    width: 60px;
    font-weight: bold;
  }

  >>>.quill-editor {
    height: 100px;
    width: 100% !important;
    overflow: visible !important;
  }
}
</style>

<script>
import {
  typeList,
  saveOrUpdate,
  list,
  // 特殊情况模板，分类
  typeListByDept,
  saveOrUpdateByEmpNo
} from "@/Page/sheet-page/api/recordDesc.js";
import bus from "vue-happy-bus";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      bus: bus(this),
      groupName: "",
      title: "",
      content: "",
      id: "",
      typeList: "",
      // 富文本编辑器配置
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: [
            [{ script: "sub" }, { script: "super" }] // 上下标
          ]
        },
        theme: "snow"
      },
      templateType:"dept",
      isPosting:false,
      beforeEmpNo:""
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
    open(item) {
      this.$refs.modal.open();
      this.getData();
      if (item) {
        (this.groupName = item.groupName), (this.title = item.title);
        this.content = item.content;
        this.id = item.id;
        this.beforeEmpNo=item.empNo
      } else {
        (this.groupName = ""), (this.title = "");
        this.content = "";
        this.id = "";
        this.beforeEmpNo=""
      }
    },
    close() {
      this.$refs.modal.close();

    },
    post() {
      //特殊情况,保存开启权限分类医院名
        const user=JSON.parse(localStorage.getItem("user"))
        const wardCode=this.templateType==='dept'?localStorage.wardCode:""
        let changeEmpNo=user.empNo
        if(this.id){
          changeEmpNo=this.beforeEmpNo
        }
        if(!this.isPosting){
          this.isPosting=true
          saveOrUpdateByEmpNo(this.groupName, this.title, this.content, this.id ,wardCode,user.empNo,changeEmpNo).then(
          res => {
            if (this.id) {
              this.$message.success("更新常用语模版成功");
              setTimeout(()=>{
                this.bus.$emit("reflashTitleItem");
            },200)
              //更新标题模板上的显示列表
            } else {
             this.$message.success("保存常用语模版成功");
             setTimeout(()=>{
                this.bus.$emit("reflashTitleItem");
            },200)
             //更新标题模板上的显示列表
            }
            setTimeout(()=>{
              this.isPosting=false
            },500)
         }
        );
       }
        this.close();
        setTimeout(()=>{
          this.bus.$emit("refreshTemplate");
        },200)
    },
    querySearch(queryString, cb) {
      cb(
        queryString
          ? this.typeList.filter(item => item.value.indexOf(queryString) > -1)
          : this.typeList
      );
    },
    getData() {
       //特殊情况,开启权限分类医院名
      const isDeptList=["liaocheng","wujing","huadu","foshanrenyi","nfyksdyy"]
      if(isDeptList.includes(this.HOSPITAL_ID)){
        typeListByDept(localStorage.wardCode,this.HOSPITAL_ID).then(res => {
        this.typeList = res.data.data[this.templateType].map(item => {
          return {
            value: item
          };
        });
      });
      }else{
        typeList(localStorage.wardCode,this.HOSPITAL_ID).then(res => {
        this.typeList = res.data.data.list.map(item => {
          return {
            value: item
          };
        });
      });
      }
    }
  },
  created() {
    this.bus.$on("openAddTemplateModal", item => {
      this.open(item);
    });
  },
  watch:{
     templateType(){
       this.getData()
     }
  },
  components: {
    quillEditor
  }
};
</script>
