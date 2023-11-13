<template>
  <div>
    <boxBase title="值班医生" :icon="require('../images/值班医生.png')">
      <span slot="head-tool" @click.stop="saveData">保存</span>
      <div class="body-con" v-loading="pageLoading" slot="body-con" flex="dir:top main:top" :class="{'body-con-hd':HOSPITAL_ID=='huadu'}" v-if="HOSPITAL_ID=='huadu'">
        <div flex="cross:center">
          <div class="label">值班医生：</div>
          <input flex-box="1" v-model="data.mainClassDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">副班医生：</div>
          <input flex-box="1" v-model="data.onDutyDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">住院总医生：</div>
          <input flex-box="1" v-model="data.secondTierDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">二线医生：</div>
          <input flex-box="1" v-model="data.workClass" @blur="update" />
        </div>
      </div>
      <div class="body-con" v-loading="pageLoading" slot="body-con" flex="dir:top main:top" v-else-if="['nfyksdyy', 'sdhpwk'].includes(HOSPITAL_ID)">
        <div flex="cross:center">
          <div class="label"><input style="width: 65px;border: none;padding-left: 0;color: #0000FF" v-model="data.customization1" />:</div>
          <input flex-box="1" v-model="data.mainClassDoctor"  />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label"><input style="width: 65px;border: none;padding-left: 0;color: #0000FF" v-model="data.customization2"  />:</div>
          <input flex-box="1" v-model="data.onDutyDoctor"  />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label"><input style="width: 65px;border: none;padding-left: 0;color: #0000FF" v-model="data.customization3"/>:</div>
          <input flex-box="1" v-model="data.secondTierDoctor"  />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label"><input style="width: 65px;border: none;padding-left: 0;color: #0000FF" v-model="data.customization4" />:</div>
          <input flex-box="1" v-model="data.classP"  />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label"><input style="width: 65px;border: none;padding-left: 0;color: #0000FF" v-model="data.customization5"  />:</div>
          <input flex-box="1" v-model="data.classN"  />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label"><input style="width: 65px;border: none;padding-left: 0;color: #0000FF" v-model="data.customization6"/>:</div>
          <input flex-box="1" v-model="data.classAllP"  />
        </div>
        <div style="height: 15px"></div>
      </div>
      <div class="body-con" v-loading="pageLoading" slot="body-con" flex="dir:top main:top"  v-else-if="HOSPITAL_ID=='xiegang'">
        <div flex="cross:center">
          <div class="label">二线医生：</div>
          <input flex-box="1" v-model="data.mainClassDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">副班医生：</div>
          <input flex-box="1" v-model="data.onDutyDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">值班医生：</div>
          <input flex-box="1" v-model="data.classP" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">办公室：</div>
          <input flex-box="1" v-model="data.workClass" @blur="update" />
        </div>
      </div>
      <div class="body-con" v-loading="pageLoading" slot="body-con" flex="dir:top main:top" v-else-if="HOSPITAL_ID=='nanfangzhongxiyi'">
        <div flex="cross:center">
          <div class="label">{{deptCode == '041002' && HOSPITAL_ID=='hj'?'门诊医生':'三线医生'}}：</div>
          <input flex-box="1" v-model="data.mainClassDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">值班医生：</div>
          <input flex-box="1" v-model="data.onDutyDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">二线医生：</div>
          <input flex-box="1" v-model="data.secondTierDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">办公室：</div>
          <input flex-box="1" v-model="data.workClass" @blur="update" />
        </div>
        <template v-if="deptCode == '041702'">
          <div style="height: 15px"></div>
          <div flex="cross:center">
            <div class="label">创伤值班：</div>
            <input flex-box="1" v-model="data.traumaOnDuty" @blur="update" />
          </div>
        </template>
      </div>
      <div class="body-con" v-loading="pageLoading" slot="body-con" flex="dir:top main:top" v-else-if="HOSPITAL_ID=='925'">
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">值班医生：</div>
          <input flex-box="1" v-model="data.onDutyDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">二线医生：</div>
          <input flex-box="1" v-model="data.secondTierDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">办公室：</div>
          <input flex-box="1" v-model="data.workClass" @blur="update" />
        </div>
        <template v-if="deptCode == '041702'">
          <div style="height: 15px"></div>
          <div flex="cross:center">
            <div class="label">创伤值班：</div>
            <input flex-box="1" v-model="data.traumaOnDuty" @blur="update" />
          </div>
        </template>
      </div>
      <div class="body-con" v-loading="pageLoading" slot="body-con" flex="dir:top main:top" v-else>
        <div flex="cross:center">
          <div class="label">{{doctor1}}：</div>
          <input flex-box="1" v-model="data.mainClassDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">值班医生：</div>
          <input flex-box="1" v-model="data.onDutyDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">二线医生：</div>
          <input flex-box="1" v-model="data.secondTierDoctor" @blur="update" />
        </div>
        <div style="height: 15px"></div>
        <div flex="cross:center">
          <div class="label">{{HOSPITAL_ID=='whyx'?"三线医生：":"办公室："}}</div>
          <input flex-box="1" v-model="data.workClass" @blur="update" />
        </div>
        <template v-if="deptCode == '041702'">
          <div style="height: 15px"></div>
          <div flex="cross:center">
            <div class="label">创伤值班：</div>
            <input flex-box="1" v-model="data.traumaOnDuty" @blur="update" />
          </div>
        </template>
      </div>
    </boxBase>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con {
  padding: 20px 20px;
  min-height: 220px;
  box-sizing: border-box;
  overflow: auto;
}

.label {
  width: 80px;
  font-size: 14px;
  color: #333333;
}

input {
  height: 32px;
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  outline: none;
  padding-left: 10px;
}
.body-con-hd {
  .label {
    width: 85px;
  }
}

</style>
<script>
import boxBase from "../base/box-base.vue";
import { deptSetting } from "../api";
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
  computed: {
    doctor1() {
      if (this.deptCode == '041002' && this.HOSPITAL_ID == 'hj') return '门诊医生'
      if (this.HOSPITAL_ID == 'whyx') return '白班医生'
      return '主班医生'
    }
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
    saveData() {
      this.update().then(res => {
        this.$message.success("保存成功");
        this.isSave = true;
      });
    }

  },
  components: {
    boxBase
  }
};
</script>
