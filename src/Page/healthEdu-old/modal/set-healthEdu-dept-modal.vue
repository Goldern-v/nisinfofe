<template>
  <!-- 签名确认 -->
  <sweet-modal ref="modalName" size="small" :title="title">
    <!-- <p for class="name-title">设置科室</p> -->
    <div action @keyup.13="post" ref="titleInput">
      <!-- <el-input size="small" type="text" placeholder="输入标题名称" v-model="title"></el-input> -->
      <el-autocomplete
        style="width: 100%"
        v-model="wardName"
        :fetch-suggestions="querySearch"
        placeholder="输入科室名称"
      ></el-autocomplete>
    </div>
    <div style="height: 10px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title
  font-size 14px;
  margin 5px 0 10px  
  font-weight bold
</style>

<script>
import { listItem } from "@/api/record";
export default {
  data() {
    return {
      wardName: "",
      title: "",
      callback: "",
      list: []
    };
  },
  methods: {
    async open(callback, wardName, title, autoText, code) {
      this.callback = callback;
      this.title = title || "";
      this.wardName = wardName || "";
      this.$refs.modalName.open();
      this.list = (await listItem(autoText, code)).data.data;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.titleInput.querySelector("input").focus();
        }, 200);
      });
    },
    post() {
      this.$refs.modalName.close();
      this.callback(this.wardName);
    },
    async querySearch(queryString, cb) {
      // 调用 callback 返回建议列表的数据
      let data = this.list;
      let autoList = [];
      if (!queryString) {
        autoList = data.map(item => {
          return {
            value: item.name
          };
        });
      } else {
        autoList = data
          .filter(item => item.name.indexOf(queryString) > -1)
          .map(item => {
            return {
              value: item.name
            };
          });
      }
      cb(autoList);
    }
  },
  components: {}
};
</script>
