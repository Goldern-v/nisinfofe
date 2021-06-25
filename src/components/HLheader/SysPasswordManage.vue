<template>
  <div class="password-manage-group" v-loading="loading">
    <div>
      <el-switch
        active-color="#4BB08D"
        inactive-color="#eee"
        :value="!!params.passwordVariety"
        :disabled="loading"
        on-text
        off-text
        @change="(payload) => handleChange(payload, 'passwordVariety')"
      ></el-switch>
      <b>密码强度校验</b>
    </div>
    <div>
      <el-switch
        active-color="#4BB08D"
        inactive-color="#eee"
        :value="!!params.passwordTime"
        :disabled="loading"
        on-text
        off-text
        @change="(payload) => handleChange(payload, 'passwordTime')"
      ></el-switch>
      <b>密码期限管理</b>
    </div>
    <div>
      <el-switch
        active-color="#4BB08D"
        inactive-color="#eee"
        :disabled="loading"
        :value="!!params.passwordThreshold"
        on-text
        off-text
        @change="(payload) => handleChange(payload, 'passwordThreshold')"
      ></el-switch>
      <b>密码阀值管理</b>
    </div>
  </div>
</template>

<script>
import commonMixin from "@/common/mixin/common.mixin";
import { getSysPasswordSet, saveSysPasswordSet } from "@/api/common";

export default {
  mixins: [commonMixin],
  props: {},
  data() {
    return {
      params: {
        passwordVariety: 0,
        passwordTime: 0,
        passwordThreshold: 0,
      },
      loading: false,
    };
  },
  mounted() {
    this.getSetting();
  },
  methods: {
    handleChange(avalable, key) {
      let newVal = avalable ? 1 : 0;
      this.params[key] = newVal;

      this.loading = true;
      saveSysPasswordSet(this.params).then(
        (res) => {
          // this.loading = false;
          this.$message.success("操作成功");
          this.getSetting();
        },
        () => (this.loading = false)
      );
    },
    getSetting() {
      this.loading = true;

      getSysPasswordSet().then(
        (res) => {
          this.loading = false;
          let params = res.data.data[0] || {};

          if (Object.keys(params).length > 0) this.params = params;
        },
        () => (this.loading = false)
      );
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
