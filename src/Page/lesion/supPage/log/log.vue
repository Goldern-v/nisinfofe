<template>
  <div class="contain" v-loading="ajax.loading">
    <div class="left">
      <searchContent :data="data.床位日志" :allData="data"></searchContent>
    </div>
    <logTable :data="data"></logTable>
  </div>
</template>

<style lang="stylus" scoped>
.left
  background #fff
  bottom 0
  border-right 1px solid #CBD5DD;  
  position fixed
  top 62px
  left 0
  width 200px
  z-index 101
.right 
  margin-left 201px
  // min-height calc(100vh - 122px)
  position relative
</style>

<script>
import { getWardLog } from "@/api/log";
import searchContent from "./component/search-con";
import logTable from './component/log-table'
export default {
  data() {
    return {
      Date: new Date().Format("yyyy-MM-dd"),
      data: {
        科室名字: '--',
        转床病人: [],
        病危病人: [],
        预出院: [],
        新入病人: [],
        明日手术: [],
        床位日志: {},
        病重病人: [],
        转出病人: [],
        手术病人: [],
        等床病人: [],
        出院病人: [],
        转入病人: []
      },
      ajax: {
        loading: false
      }
    };
  },
  computed: {
    wardCode() {
      return this.$store.state.lesion.deptCode;
    }
  },
  methods: {
    init() {
      this.data = {
        新入病人: [],
        转床病人: [],
        出院病人: [],
        病危病人: [],
        病重病人: [],
        手术病人: [],
        转出病人: [],
        转入病人: [],
        明日手术: [],
        预出院: [],
        科室名字: [],
        床位日志: {},
        等床病人: [],
      };
    },
    getData() {
      this.ajax.loading = true;
      getWardLog(this.wardCode, this.Date)
        .then(res => {
          if (res.data.data) {
            this.data = res.data.data;
            this.ajax.loading = false;
          } else {
            this.init();
          }
        })
        .catch(() => {
          this.ajax.loading = false;
        });
    }
  },
  watch: {
    wardCode() {
      this.getData();
    }
  },
  created() {
    if (this.wardCode) {
      this.getData();
    }
  },
  components: {
    searchContent,
    logTable
  }
};
</script>
