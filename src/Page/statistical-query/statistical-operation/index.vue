<template>
<div class="statistical-operation">
  <search-con
    :formData="formData"
    @handleExport="handleExport"
    @handleQuery="handleQuery"/>
</div>
</template>
<style lang='scss' scoped></style>
<script>
import SearchCon from '../components/search-con.vue'

export default {
props: {},
data() {
return {
  formData: {
    beginTime: '',
    endTime: '',
    type: '',
    status: ''
  }
};
},
methods: {
  handleExport(obj) {

  },
  handleQuery(obj) {
    this.formData = { ...this.formData, ...obj}
    console.log('test-formData', this.formData)
  }
},
components: {
  SearchCon
}
};
</script>
