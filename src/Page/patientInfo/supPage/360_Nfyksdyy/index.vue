<template>
  <div>
    <iframe :src="url" style="width: 100%; height: calc(100vh - 53px);"></iframe>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";

export default {
  mixins: [common],
  data() {
    return {
      url: ''
    };
  },
  computed: {
  },
  mounted() {
    let { inpNo } = this.$route.query
    let cutInpNo = inpNo && inpNo.split('_')[0]
    this.url = `http://192.168.5.74:8000/cdr-c/cdrView.do?type=102&attribute=${cutInpNo}&emplCode=${this.empNo}&authCode=df10814b-fa20-4978-5782-587c6f54f8e7&module=`
  }
};
</script>