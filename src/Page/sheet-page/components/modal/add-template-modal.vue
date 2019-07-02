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
</style>

<script>
import {
  typeList,
  saveOrUpdate,
  list
} from "@/Page/sheet-page/api/recordDesc.js";
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      bus: bus(this),
      groupName: "",
      title: "",
      content: "",
      id: "",
      typeList: ""
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
  components: {}
};
</script>
