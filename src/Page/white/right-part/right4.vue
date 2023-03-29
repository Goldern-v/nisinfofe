<template>
  <div>
    <boxBase title="今日护士排班" :icon="require('../images/今日护士排班.png')">
      <el-button v-if="['fsxt'].includes(HOSPITAL_ID)" slot="head-btn" size="small" class="head-btn" @click="handleSync">同步</el-button>
      <div class="body-con" v-loading="pageLoading" slot="body-con" flex="dir:top main:top" v-if="HOSPITAL_ID=='huadu'">
        <div flex="cross:center">
          <div class="label">A班：</div>
          <input flex-box="1" v-model="data.classP" @blur="update">
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">P班：</div>
          <input flex-box="1" v-model="data.classAllP" @blur="update">
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">N班：</div>
          <input flex-box="1" v-model="data.classN" @blur="update">
        </div>
        <div style="height: 15px"></div>
         <div flex="cross:center">
          <div class="label">D班：</div>
          <input flex-box="1" v-model="data.classD" @blur="update">
        </div>
        <!-- <div flex="cross:center">
          <div class="label">办公室：</div>
          <input flex-box="1" v-model="data.workClass" />
        </div>-->
      </div>
      <div class="body-con" v-loading="pageLoading" slot="body-con" flex="dir:top main:top" v-else-if="HOSPITAL_ID=='xiegang'">
        <div flex="cross:center">
          <div class="label">电脑班：</div>
          <input flex-box="1" v-model="data.secondTierDoctor" @blur="update">
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">P班：</div>
          <input flex-box="1" v-model="data.classAllP" @blur="update">
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">N班：</div>
          <input flex-box="1" v-model="data.classN" @blur="update">
        </div>
      </div>
      <div class="body-con" v-loading="pageLoading" slot="body-con" flex="dir:top main:top" v-else>
        <div flex="cross:center">
          <!-- <div class="label">P班：</div> -->
          <div class="label">{{ geClassP()}}</div>
          <input flex-box="1" v-model="data.classP" @blur="update">
        </div>
        <div style="margin: 15px 0" v-if="['fsxt'].includes(HOSPITAL_ID)">
          <div flex="cross:center">
            <div class="label">二级护士：</div>
            <input flex-box="1" v-model="data.secondDutyNurse" @blur="update">
          </div>
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <!-- <div class="label">{{ HOSPITAL_ID !== 'hengli' ? 'P全班：' : 'PN班：' }}</div> -->
          <div class="label">{{ getClassAllP() }}</div>
          <input flex-box="1" v-model="data.classAllP" @blur="update">
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">{{ getClassAllP2() }}</div>
          <input flex-box="1" v-model="data.classN" @blur="update">
        </div>
        <div style="height: 15px"></div>
        <!-- <div flex="cross:center">
          <div class="label">办公室：</div>
          <input flex-box="1" v-model="data.workClass" />
        </div>-->
      </div>
    </boxBase>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con
  padding 20px 20px
  min-height 180px
  box-sizing border-box
  overflow auto
.label
  width 80px
  font-size: 14px;
  color: #333333;
input
  height 32px
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px
  outline none
  padding-left 10px
</style>
<script>
import boxBase from "../base/box-base.vue";
import { deptSetting, getTodayNurse } from "../api";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
export default {
  mixins: [common],
  inject: ["update"],
  props: {
    data: Object,
    isSave: Boolean
  },
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      list: []
    };
  },
  created() {
    this.bus.$on("indexGetAllData", this.getData);
  },
  methods: {
    getData() {
      this.pageLoading = true;
      deptSetting(this.deptCode).then(res => {
        this.list = res.data.data.nurseDept;
        this.pageLoading = false;
      });
    },
    //获取班次名称
    geClassP(){
      switch(this.HOSPITAL_ID){
        case "wujing":
          return "A班："
        case "nanfangzhongxiyi":
        case "yangchunzhongyi":
          return "A班："
        case "fsxt":
          case "925":
          return "A班："
        default:
          return "P班："
      }
    },
    getClassAllP(){
      // <div class="label">{{ HOSPITAL_ID !== 'hengli' ? 'P全班：' : 'PN班：' }}</div>
      switch(this.HOSPITAL_ID){
        case "hengli":
          return "PN班："
        case "wujing":
          return "P班："
        case "nanfangzhongxiyi":
        case "yangchunzhongyi":
          return "P班："
        case "fsxt":
          return "P班："
        case "whyx":
          return "大N班："
        default:
          return "P全班："
      }
    },
    getClassAllP2(){
      switch(this.HOSPITAL_ID) {
        // case "whyx":
        //   return "大N班："
        default:
          return "N班："
      }
    },
    formatClassName(arr) {
      return arr.reduce((text, item, index) => text += `${index > 0 ? ' ' : ''}${item.empName}`, '')
    },
    // 同步护士
    async handleSync() {
      try {
        const res = await getTodayNurse(this.deptCode)
        if (res.data && res.data.code == '200') {
          this.data.classP = this.formatClassName(res.data.data['A班'] || [])
          this.data.classAllP = this.formatClassName(res.data.data['P班'] || [])
          this.data.classN = this.formatClassName(res.data.data['N班'] || [])
          this.update()
        }
      } catch (e) {
      }
    }
  },
  components: {
    boxBase
  }
};
</script>
