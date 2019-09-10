<template>
  <div class="familyBigScreen">
    <familyBigScreenList v-if="!params.name"></familyBigScreenList>
    <router-view v-if="params.name"></router-view>
  </div>
</template>

<script>
import familyBigScreenList from "./family-big-screen-list.vue";
export default {
  components: {
    familyBigScreenList
  },
  data() {
    return {
      params: {}
    };
  },
  methods: {
    showTip1(item) {
      this.$refs.info1modal.open(item);
    },
    showTip2(item) {
      item.patientName = item.name;
      this.$refs.info1modal.open(item);
    },
    showTip3(item) {
      this.$refs.info3modal.open(item);
    },
    init() {
      if (!this.deptCode) return;
      let time = moment().format("L");
      let data = Cookie.get("NURSING_USER") || "";
      if (!data) {
        window.location.href = "/login";
      }

      this.page1Loading = true;
      this.page2Loading = true;
      this.page3Loading = true;
    },
    tablesHeight() {
      try {
        let tableHeight = this.wih - 210;
        this.table1 =
          this.$refs.table1.clientHeight > tableHeight ? true : false;
        this.table2 =
          this.$refs.table2.clientHeight > tableHeight ? true : false;
      } catch (e) {}
    },
    beColor(type) {
      switch (type) {
        case "1":
          return "rgba(185, 89, 255, .8)";
        case "2":
          return "rgba(48, 163, 255, .8)";
        case "3":
          return "rgba(162, 131, 94, .8)";
        case "4":
          return "rgba(208, 196, 79, .8)";
        case "5":
          return "rgba(80, 208, 101, .8)";
      }
    },
    getData() {
      this.page3Loading = true;
      queryByDeptCode(this.deptCode).then(res => {
        this.deptInfo = res.data.data;
        this.page3Loading = false;
        setTimeout(() => {
          try {
            this.$refs.right2.isSave = true;
          } catch (error) {}
        }, 300);
      });
    },
    update() {
      let data = Object.assign(this.deptInfo, {
        deptCode: this.deptCode
      });
      return updateByDeptCode(data).then(res => {
        // this.$message.success('更新数据成功')
        // this.getData();
      });
    }
  },
  mounted() {
    this.params = this.$route.params;
  },
  created() {},
  watch: {
    "$route.params"() {
      this.params = this.$route.params;
      console.log(this.params);
    }
  }
};
</script>

<style lang="stylus" scoped></style>