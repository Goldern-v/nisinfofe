<template>
  <div>
    <input type="password" style="display:none">
    <cr-date-picker v-model="text"></cr-date-picker>
    {{text}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped>
</style>
