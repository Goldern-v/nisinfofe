<template>
  <div class="password-manage-group" v-loading="loading">
    <div>
      <el-switch
        active-color="#4BB08D"
        inactive-color="#eee"
        :value="true"
        on-text
        off-text
        @change="(payload) => handleChange(payload, '密码强度校验')"
      ></el-switch>
      <b>密码强度校验</b>
    </div>
    <div>
      <el-switch
        active-color="#4BB08D"
        inactive-color="#eee"
        :value="false"
        on-text
        off-text
        @change="(payload) => handleChange(payload, '密码期限管理')"
      ></el-switch>
      <b>密码期限管理</b>
    </div>
    <div>
      <el-switch
        active-color="#4BB08D"
        inactive-color="#eee"
        :value="false"
        on-text
        off-text
        @change="(payload) => handleChange(payload, '密码阀值管理')"
      ></el-switch>
      <b>密码阀值管理</b>
    </div>
  </div>
</template>

<script>
import commonMixin from "@/common/mixin/common.mixin";

export default {
  mixins: [commonMixin],
  props: {},
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleChange(payload, name) {
      console.log(payload, name);
    },
  },
  components: {},
};
</script>

<style lang='scss' scoped>
.password-manage-group {
  & > div {
    margin-bottom: 10px;
  }
}
</style>
