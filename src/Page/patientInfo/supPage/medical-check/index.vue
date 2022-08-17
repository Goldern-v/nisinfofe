<template>
<div class="medical-check">
  <iframe :src="url" frameborder="0"></iframe>
</div>
</template>
<style lang='scss' scoped>
.medical-check {
  display: flex;
  width: 100%;
  height: calc(100vh - 65px);
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
<script>
export default {
props: {},
data() {
return {
};
},
computed: {
  url() {
    const baseUrl = 'http://10.45.0.184/EmrVieww/Index.aspx?hospital_no=45722882244190011A1001&patient_id='
    const { patientId , visitId} = this.$route.query
    // 后面需要拼接住院次数。不然默认是1
    return baseUrl + patientId + '&visit_id=' + visitId;
  }
},
methods: {
},
components: {}
};
</script>
