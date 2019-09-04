<template>
<div class="video-list-setting">
 setting
</div>
</template>

<script>
// import commonMixin from "./../../common/mixin/common.mixin";
export default {
  components: {
  },
  // mixins: [commonMixin],
  data() {
    return {
      query: {
        typeId: "", //类型id
        deptCode: "", //科室代码
        status: "", //状态1:提交未审核，2：已审核
        checkDateStart: "", //检查日期开始日期（yyyy-MM-dd）
        checkDateEnd: "", //检查日期结束日期（yyyy-MM-dd
        pageIndex: 1, //页码
        pageSize: 20, //每页条数
        pageSize: 20
      },
    };
  },
  mounted() {
  },
  methods: {}
};
</script>
<style lang="scss" scoped>

</style>