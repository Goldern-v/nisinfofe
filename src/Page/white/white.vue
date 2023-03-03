<template>
  <div class="contain">
    <!-- <div class="page" flex="">
        <div class="left-part">
          <leftTop></leftTop>
          <div style="height: 10px"></div>
          <leftBottom></leftBottom>
        </div>
        <div class="mid-part" flex-box="1">
          <mid></mid>
        </div>
        <div class="right-part">
          <right></right>
        </div>
      </div>
    <page2></page2>-->
    <div :class="['page',HOSPITAL_ID == 'wujing'?'wujing':'']" flex>
      <div class="left-part" flex-box="6">
        <left1></left1>
        <div style="height: 20px"></div>
        <left2></left2>
        <div style="height: 20px"></div>
        <left3></left3>
      </div>
      <div class="right-part" flex-box="4">
        <right1></right1>
        <div style="height: 20px"></div>
        <right7 :data="deptInfo" ref="right7" v-if="HOSPITAL_ID == 'liaocheng'"></right7>
        <right2 :data="deptInfo" ref="right2"></right2>
        <div style="height: 20px"></div>
        <right6 :data="deptInfo" ref="right6" v-if="isChanxiu"></right6>
        <div style="height: 20px" v-if="isChanxiu"></div>

        <right3 :data="deptInfo" :isSave="isSave"></right3>
        <div style="height: 20px"></div>
        <right4 :data="deptInfo" :isSave="isSave"></right4>
        <div style="height: 20px"></div>
        <right5 :data="deptInfo" ref="right5"></right5>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.page
  margin 10px
  .left-part
    width 0
    margin-right 10px
  .right-part
    width 0
  &.wujing >>> *{
  font-size 16px
}
</style>

<script>
import left1 from "./left-part/left1.vue";
import left2 from "./left-part/left2.vue";
import left3 from "./left-part/left3.vue";
import right1 from "./right-part/right1.vue";
import right2 from "./right-part/right2.vue";
import right3 from "./right-part/right3.vue";
import right4 from "./right-part/right4.vue";
import right5 from "./right-part/right5.vue";
import right6 from "./right-part/right6.vue";
import right7 from "./right-part/right7.vue";
import bus from "vue-happy-bus";
import common from "@/common/mixin/common.mixin.js";
import { queryByDeptCode, updateByDeptCode, getDeptSetting } from "./api";
export default {
  mixins: [common],
  provide() {
    return {
      update: this.update
    };
  },
  data() {
    return {
      bus: bus(this),
      deptInfo: {},
      isSave: true
    };
  },
  computed: {
    isChanxiu() {
      return this.deptCode == "051102_03" || this.deptCode == "051102_04";
    }
  },
  mounted() {
    if (this.deptCode) {
      this.bus.$emit("indexGetAllData");
    }
  },
  created() {
    this.bus.$on("indexGetAllData", this.getData);
  },
  methods: {
    getData(type) {
      this.pageLoading = true;
      queryByDeptCode(this.deptCode).then(res => {
        this.deptInfo = res.data.data;
        if(this.deptInfo.message&&this.deptInfo.message!==''){
          this.deptInfo.message = this.deptInfo.message.replace("<br/>", "\n")
        }
        this.pageLoading = false;
        setTimeout(() => {
          this.isSave = true;
          try {
            this.$refs.right2.isSave = true;
            this.$refs.right5.isSave = true;
            this.$refs.right6.isSave = true;
          } catch (error) {}
        }, 300);

        // if(this.HOSPITAL_ID == 'hj'){
        //   this.deptInfo.classPEdit = this.deptInfo.classP ? true : false;
        //   this.deptInfo.classAllPEdit = this.deptInfo.classAllP ? true : false;
        //   this.deptInfo.classNEdit = this.deptInfo.classN ? true : false;
        // }
        // if(this.HOSPITAL_ID == 'hj' && type != 'notGet'){
        //   this.getRange();
        // }
      });
    },
    update(type) {
      let data = Object.assign(this.deptInfo, {
        deptCode: this.deptCode
      });
      return updateByDeptCode(data).then(res => {
        // this.$message.success('更新数据成功')
        this.getData(type);
      });
    },
     getRange(){
      getDeptSetting(this.deptCode).then((rep) => {
          let data = rep.data.data;
          data.map(item=>{
            switch(item.rangeName){
              case'P班':
                {
                  this.deptInfo.classP = this.deptInfo.classP || item.name || "";
                }
                 break;
              case'P全':
                {
                  this.deptInfo.classAllP = this.deptInfo.classAllP || item.name || "";
                }
                 break;
              case 'N班':
                {
                  this.deptInfo.classN = this.deptInfo.classN || item.name || "";
                }
                 break;
            }
          })
          if(data.length>0){
            this.update('notGet');
          }
        })
    }
  },
  watch: {
    deptInfo: {
      deep: true,
      handler() {
        this.isSave = false;
      }
    },
    deptCode() {
      if (this.deptCode) {
        this.bus.$emit("indexGetAllData");
      }
    }
  },
  components: {
    left1,
    left2,
    left3,
    right1,
    right2,
    right3,
    right4,
    right5,
    right6,
    right7
  }
};
</script>
