<template>
  <div class="modal-con">
    <sweet-modal
      ref="modal"
      :modalWidth="460"
      :title="modalTitle"
      :enable-mobile-fullscreen="false"
    >
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
        <!-- 兼容富文本内容渲染 -->
        <quill-editor v-model="content" :options="editorOption"></quill-editor>
        <!-- <el-input type="textarea" v-model="content"></el-input> -->
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
      height: 280px !important;
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
  list
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
      }
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
      } else {
        (this.groupName = ""), (this.title = "");
        this.content = "";
        this.id = "";
      }
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      saveOrUpdate(this.groupName, this.title, this.content, this.id).then(
        res => {
          if (this.id) {
            this.$message.success("更新常用语模版成功");
          } else {
            this.$message.success("保存常用语模版成功");
          }
          this.close();
          this.bus.$emit("refreshTemplate");
        }
      );
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
    this.bus.$on("openAddTemplateModal", item => {
      this.open(item);
    });
  },
  components: {
    quillEditor
  }
};
</script>
