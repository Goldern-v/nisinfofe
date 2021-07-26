<template>
  <div class="infuse">
    <infuseList v-if="$route.path=='/infuse'"></infuseList>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import infuseList from "./infuse-list.vue";
export default {
  components: {
    infuseList
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style>
</style>
