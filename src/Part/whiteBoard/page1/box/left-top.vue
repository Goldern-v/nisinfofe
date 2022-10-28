<template>
  <div class="contain">
    <Box icon="📊" title="病区统计">
      <showList :data="data"></showList>
    </Box>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

</style>

<script>
import Box from "../../components/box.vue";
import showList from '../components/showList'
export default {
  props: {
    data: Object
  },
  data() {
    return {
      msg: "hello vue"
    };
  },
  components: {
    Box, showList
  }
};
</script>
