<template>
  <div>
    <LEheader></LEheader>
    <router-view></router-view>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>

<script>
import LEheader from "@/Page/lesion/supComponts/LEheader";
export default {
  data() {
    return {
      msg: "hello vue"
    };
  },
  watch: {
    $route(to, from) {
      this.$store.commit("updateDataTime");
    }
  },
  components: {
    LEheader
  }
};
</script>
