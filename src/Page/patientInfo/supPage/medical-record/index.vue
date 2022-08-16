<template>
<div class="medical-record">
  <iframe :src="url" frameborder="0"></iframe>
</div>
</template>
<style lang='scss' scoped>
.medical-record {
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
import qs from 'qs'
// 病历 by沂州
export default {
props: {},
data() {
return {
};
},
computed: {
  url() {
    const { patientId, visitId } = this.$route.query
    const baseUrl = `http://10.66.3.1:8009/EMRWeb.aspx?${qs.stringify({inhosid: `'${patientId}'`, inhostimes: visitId})}`
    return baseUrl;
  }
},
methods: {
},
components: {}
};
</script>
