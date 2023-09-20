<template>
  <div class="search-contain">
    <div class="search-box">
      <div class="title">护理单元</div>
      <el-select
        placeholder="请选择"
        v-model="data.deptValue"
        filterable
        @change="changeDept(data.deptValue)"
      >
        <el-option :value="0" label="全部"></el-option>
        <el-option
          v-for="item in data.deptList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
    </div>
    <div class="search-box">
      <div class="title">出入院</div>
      <div class="select-box" flex="cross:stretch">
        <div
          class="select-item"
          flex="cross:center main:center"
          flex-box="1"
          style="border-right: 1px solid #c2cbd2"
        >
          <el-radio class="radio" v-model="data.status" label="1" size="small"
            >在院</el-radio
          >
        </div>
        <div
          class="select-item"
          flex="cross:center main:center"
          flex-box="1"
          style="border-right: 1px solid #c2cbd2"
          v-if="hospitalTransfer"
        >
          <el-radio class="radio" v-model="data.status" label="3" size="small"
            >转科</el-radio
          >
        </div>
        <div class="select-item" flex="cross:center main:center" flex-box="1">
          <el-radio class="radio" v-model="data.status" label="2" size="small"
            >出院</el-radio
          >
        </div>
      </div>
    </div>
    <div v-if="!['beihairenyi'].includes(HOSPITAL_ID)">
      <div class="search-box" v-if="data.status == 1">
        <div class="title">入院起始日期</div>
        <el-date-picker
          v-model="data.admissionDate[0]"
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择入院起始时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 1">
        <div class="title">入院结束日期</div>
        <el-date-picker
          v-model="data.admissionDate[1]"
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择入院结束时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 2">
        <div class="title">出院起始时间</div>
        <el-date-picker
          v-model="data.dischargeDate[0]"
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择出院起始时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 2">
        <div class="title">出院结束时间</div>
        <el-date-picker
          v-model="data.dischargeDate[1]"
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择出院结束时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 3 && isPatients">
        <div class="title">起始日期</div>
        <el-date-picker
          v-model="data.dateTime[0]"
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择转科起始时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 3 && isPatients">
        <div class="title">结束时间</div>
        <el-date-picker
          v-model="data.dateTime[1]"
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择转科结束时间"
        ></el-date-picker>
      </div>
    </div>
    <!--北海医院的选择部分，要求精确到时分跟其他医院区分开--->
    <div v-if="['beihairenyi'].includes(HOSPITAL_ID)">
      <div class="search-box" v-if="data.status == 1">
        <div class="title">入院起始日期</div>
        <el-date-picker
          v-model="data.admissionDate[0]"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择入院起始时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 1">
        <div class="title">入院结束日期</div>
        <el-date-picker
          v-model="data.admissionDate[1]"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择入院结束时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 2">
        <div class="title">出院起始时间</div>
        <el-date-picker
          v-model="data.dischargeDate[0]"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择出院起始时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 2">
        <div class="title">出院结束时间</div>
        <el-date-picker
          v-model="data.dischargeDate[1]"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择出院结束时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 3 && isPatients">
        <div class="title">转科起始日期</div>
        <el-date-picker
          v-model="data.dateTime[0]"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择出院起始时间"
        ></el-date-picker>
      </div>
      <div class="search-box" v-if="data.status == 3 && isPatients">
        <div class="title">转科结束时间</div>
        <el-date-picker
          v-model="data.dateTime[1]"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择出院结束时间"
        ></el-date-picker>
      </div>
    </div>
    <div v-if="!['foshanrenyi'].includes(HOSPITAL_ID)">
      <div class="search-box">
        <div class="title">病人信息</div>
        <div class="input-con">
          <el-input v-model="data.name" placeholder="请输入病人姓名"></el-input>
        </div>
        <div class="input-con" v-if="HOSPITAL_ID != 'fuyou'">
          <el-input
            v-model="data.patientId"
            placeholder="请输入病人ID"
          ></el-input>
        </div>
        <div class="input-con">
          <el-input v-model="data.inpNo" placeholder="请输入住院号"></el-input>
        </div>
        <div class="input-con">
          <el-select
            v-if="useSelect"
            v-model="data.sign"
            placeholder="请选择标志"
            clearable
          >
            <el-option
              v-for="item in signList"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-else v-model="data.bedLabel" placeholder="请输入床号"></el-input>
        </div>
        <div class="input-con" v-if="HOSPITAL_ID == 'zhongshanqi'">
          <el-input
            v-model="data.diagnosis"
            placeholder="请输入病种"
          ></el-input>
        </div>
        <div class="input-con" v-if="HOSPITAL_ID === 'wujing'">
          <el-input
            v-model="data.companyAddress"
            placeholder="请输入单位地址"
          ></el-input>
        </div>
      </div>
    </div>
    <div v-if="['foshanrenyi'].includes(HOSPITAL_ID)">
      <div class="search-box">
        <div class="title">病人信息</div>
        <div class="input-con">
          <el-input v-model="data.name" placeholder="请输入病人姓名"></el-input>
        </div>
        <div class="input-con">
          <el-input
            v-model="data.patientId"
            placeholder="请输入病人住院号"
          ></el-input>
        </div>
        <div class="input-con">
          <el-input
            v-model="data.inpNo"
            placeholder="请输入病人记账号"
          ></el-input>
        </div>
        <div class="input-con">
          <el-input v-model="data.bedLabel" placeholder="请输入床号"></el-input>
        </div>
      </div>
    </div>
    <div
      class="search-btn"
      flex="cross:center main:center"
      @click="search"
      v-touch-ripple
    >
      检索
    </div>
    <div
      class="search-btn2"
      v-if="data.status === '2' && ['whfk', 'xiegang','whsl'].includes(HOSPITAL_ID)"
      @click="synchWhFK"
      v-touch-ripple
    >
      同步出院患者
    </div>
    <div
      class="search-btn2"
      v-if="['huadu'].includes(HOSPITAL_ID)"
      @click="onSyncHuadu"
      v-touch-ripple
    >
      同步
    </div>
    <div
      class="search-btn2"
      v-if="data.status === '1' && ['sdlj'].includes(HOSPITAL_ID)"
      @click="syncGetNurseBedRecData"
      v-touch-ripple
    >
      同步
    </div>
    <div
      class="search-btn2"
      v-if="data.status === '2' && hasSynchronize.includes(HOSPITAL_ID)"
      @click="synchronize"
      v-touch-ripple
    >
      同步
    </div>
    <div
      class="search-btn2"
      v-if="data.status === '3' && HOSPITAL_ID === 'beihairenyi'"
      @click="syncMajor"
      v-touch-ripple
    >
      同步
    </div>
    <div
      class="search-btn2"
      v-if="data.status === '2' && ['liaocheng', 'fsxt','ytll','foshanrenyi','gdtj', 'lyyz','zhzxy','dglb','nfyksdyy'].includes(HOSPITAL_ID)"
      @click="throttleSyncDischargedPatient"
      v-touch-ripple
      >同步出院患者</div
    >
    <div
      class="search-btn2"
      v-if="['wujing', 'whsl'].includes(HOSPITAL_ID)"
      @click="handleExport"
      v-touch-ripple
    >
      导出
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-contain {
  padding: 20px 16px 10px;
  box-sizing: border-box;

  .title {
    font-size: 12px;
    color: #000000;
    letter-spacing: 0;
    margin-bottom: 10px;
  }

  >>>.el-select {
    width: 100%;
  }

  >>>.el-date-editor--daterange {
    width: 100%;
  }

  >>>.el-input__inner {
    height: 32px;
    font-size: 12px;
    color: #687179;
  }

  .search-box {
    margin-bottom: 15px;
  }
}

.select-box {
  width: 100%;
  height: 32px;
  background: #FFFFFF;
  border: 1px solid #C2CBD2;
  border-radius: 2px;
}

.select-item {
  width: 0;

  >>>.el-radio__label {
    font-size: 12px;
    color: #687179;
  }

  >>>.el-radio__inner {
    width: 16px;
    height: 16px;
  }
}

.input-con {
  margin-bottom: 10px;
}

.search-btn {
  height: 34px;
  background: #4BB08D;
  border-radius: 2px;
  font-size: 12px;
  color: #FFFFFF;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #5CC6A1;
  }
}
.search-btn2 {
  height: 34px;
  background: #4BB08D;
  border-radius: 2px;
  font-size: 12px;
  margin: 10px 0 0 0;
  color: #FFFFFF;
  text-align: center;
  line-height: 34px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #5CC6A1;
  }
}
</style>
<script>
import { nursingUnit, syncGetNurseBedRecJiangMenFSSY, syncPatListHd } from "@/api/lesion";
import {_throttle} from './throttle'
import {
  synchronizeHengLi,
  synchronizeWHFK,
  syncMajorBH,
  syncDischargedPatient,
} from "@/api/document";
import { nursingUnitAll } from "@/api/common";
import moment from "moment";
export default {
  data() {
    return {
      data: {
        deptValue: "",
        deptList: [],
        status: "1", //1住院，2出院，3转科
        name: "",
        bedLabel: "",
        companyAddress: "",
        inpNo: "",
        patientId: "",
        admissionDate: [moment().subtract(30, "days"), new Date()],
        dischargeDate: [moment().subtract(30, "days"), new Date()],
        dateTime: [moment().subtract(30, "days"), new Date()],
        diagnosis: "", //病种
        sign: '', // 转科标志
        // hospitalTransfer:['huadu','fuyou']//转科医院名字
      },
      ifCanTobu: true,
      ifCanFKtongbu: true,
      hasSynchronize: ["hengli", "fuyou", "beihairenyi", "nanfangzhongxiyi"],
      signList: [
        { name: '转病区', value: '1' },
        { name: '转科', value: '2' },
        { name: '飞床', value: '3' },
      ]
    };
  },
  computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode;
    },
    //是否为查询界面
    isPatients() {
      return this.$route ? this.$route.path == "/nursingDocumentation" : false;
    },
    // 具备转科查询的医院（查询条件包括病人ID等）
    hospitalTransfer() {
      return [
        "huadu",
        "fuyou",
        "beihairenyi",
        "sdlj",
        "nanfangzhongxiyi",
        "foshanrenyi",
        'gdtj',
        'whsl',
        'lyyz',
        'zhzxy',
        'ytll',
        'nfyksdyy',
        'liaocheng',
        '925',
        'qhwy',
        'whhk',
        'zjhj'
      ].includes(this.HOSPITAL_ID);
    },
    useSelect() {
      return ['nfyksdyy'].includes(this.HOSPITAL_ID) && this.data.status == 3;
    }
  },
  watch: {
    deptCode() {},
  },
  created() {
    let getNursingUnit =
      this.HOSPITAL_ID == "hj" ? nursingUnitAll : nursingUnit;
    getNursingUnit()
      .then((res) => {
        this.data.deptList = res.data.data.deptList;
        this.data.deptValue =
          this.$store.state.lesion.deptCode ||
          res.data.data.defaultDept ||
          res.data.data.deptList[0].code;
        this.$store.commit("upDeptCode", this.data.deptValue);
      })
      .then(() => {
        this.$parent.getData();
      });
    //花都入院起始日期 改为提前7天
    if (["huadu"].includes(this.HOSPITAL_ID)) {
      this.data.admissionDate = [moment().subtract(7, "days"), new Date()];
    }
  },
  mounted() {
    //江门妇幼、转院、出院中的【起始时间】调整为当天
    if (["fuyou"].includes(this.HOSPITAL_ID)) {
      this.data.dischargeDate = [new Date(), new Date()];
      this.data.dateTime = [new Date(), new Date()];
    } else if (["sdlj", "whfk"].includes(this.HOSPITAL_ID)) {
      this.data.dischargeDate = [new Date(), new Date()];
    } else if (['nfyksdyy'].includes(this.HOSPITAL_ID)) {
      this.data.dischargeDate = [new Date(), new Date()];
    }
  },
  methods: {
    changeDept(value) {
      // if(!['huadu'].includes(this.HOSPITAL_ID)) {
      //   this.$store.commit("upDeptCode", value);
      // }
    },
    handleParams() {
      let data = this.data;
      let obj = {};
      if (data.deptValue) {
        obj.wardCode = data.deptValue || data.deptList.join(",");
      }
      if (data.status) {
        obj.status = data.status;
      }
      if (data.name) {
        obj.name = data.name;
      }
      if (data.patientId) {
        obj.patientId = data.patientId;
      }
      if (data.inpNo) {
        obj.inpNo = data.inpNo;
      }
      if (data.bedLabel) {
        obj.bedLabel = data.bedLabel;
      }

      if (data.admissionDate[0]) {
        obj.admissionDateBegin = new Date(data.admissionDate[0]).Format(
          "yyyy-MM-dd"
        );
      }
      if (data.admissionDate[1]) {
        obj.admissionDateEnd = new Date(data.admissionDate[1]).Format(
          "yyyy-MM-dd"
        );
      }
      if (data.dischargeDate[0]) {
        obj.dischargeDateBegin = new Date(data.dischargeDate[0]).Format(
          "yyyy-MM-dd"
        );
      }
      if (data.dischargeDate[1]) {
        obj.dischargeDateEnd = new Date(data.dischargeDate[1]).Format(
          "yyyy-MM-dd"
        );
      }

      if (data.status == 1) {
        obj.dischargeDateBegin = "";
        obj.dischargeDateEnd = "";
        this.isChangeMajor = false;
      }
      if (data.status == 2) {
        obj.admissionDateBegin = "";
        obj.admissionDateEnd = "";
        this.isChangeMajor = false;
      }
      if (data.status == 3) {
        this.isChangeMajor = true;
        obj.startDate =
          new Date(data.dateTime[0]).Format("yyyy-MM-dd") + " 00:00:00";
        obj.endDate =
          new Date(data.dateTime[1]).Format("yyyy-MM-dd") + " 23:59:59";
        obj.admissionDateBegin = "";
        obj.admissionDateEnd = "";
        obj.dischargeDateBegin = "";
        obj.dischargeDateEnd = "";
      }
      // 顺德人医转科接口修改
      if (this.HOSPITAL_ID === 'nfyksdyy' && this.isChangeMajor) {
        obj.status = data.sign || '0';
      }
      return obj;
    },
    syncGetNurseBedRecData() {
      if (!this.ifCanTobu) return;
      this.ifCanTobu = false;
      this.$message.info("正在更新");
      syncGetNurseBedRecJiangMenFSSY(this.deptCode).then(
        (res) => {
          this.$message.success("更新成功");
          this.getDate();
          this.ifCanTobu = true;
        },
        () => {
          this.$message.error("更新失败");
          this.ifCanTobu = true;
        }
      );
    },
    search() {
      this.$parent.page.pageIndex = 1;
      this.$parent.fatherStatus = this.data.status;
      this.$parent.getData();
    },
    synchronize() {
      this.$parent.page.pageIndex = 1;
      synchronizeHengLi().then((res) => {
        if (res.data.code === "200") {
          this.$message.success("出院患者同步成功");
        } else {
          this.$message.error(res.data.desc || "出院患者同步失败");
        }
      });
    },
    synchWhFK() {
      if (!this.ifCanFKtongbu) return;
      this.ifCanFKtongbu = false;
      this.$parent.page.pageIndex = 1;
      synchronizeWHFK().then(
        (res) => {
          if (res.data.code === "200") {
            this.$message.success("出院患者同步成功");
          } else {
            this.$message.error(res.data.desc || "出院患者同步失败");
          }
          this.ifCanFKtongbu = true;
        },
        (err) => {
          this.$message.error("系统出错");
          this.ifCanFKtongbu = true;
        }
      );
    },
    // 患者出院因为要抽取，耗能很大 所以增加节流
    /**同步出院患者 */
    onSyncHuadu:_throttle('syncDischargedPatientHD',0*1000),
    async syncDischargedPatientHD() {
      console.log('您触发了')
      try {
        let obj = this.handleParams();
        obj.pageIndex = this.$parent.page.pageIndex;
        obj.pageNum = this.$parent.page.pageNum;
        obj.status = this.data.status;
        obj.wardCode = this.data.deptValue || this.data.deptList.join(",");
        let res = null;
        if (this.data.status == 3) {
          let newObj = JSON.parse(JSON.stringify(obj));
          delete newObj.admissionDateBegin;
          delete newObj.admissionDateEnd;
          delete newObj.dischargeDateBegin;
          delete newObj.dischargeDateEnd;
          newObj.pageSize = newObj.pageNum;
          res = await syncPatListHd(newObj);
        }else{
          res = await syncPatListHd(obj);
        }
        if (res.data.code === '200') {
          this.$message.success("患者同步成功");
          this.search()
          return
        }
        this.$message.error(res.data.desc || "患者同步失败");
      } catch (error) {
        console.log(error, this.$parent);
      }
    },
    syncMajor() {
      this.$parent.page.pageIndex = 1;
      syncMajorBH(this.data.deptValue).then((res) => {
        if (res.data.code === "200") {
          this.$message.success("转科患者同步成功");
        } else {
          this.$message.error(res.data.desc || "转科患者同步失败");
        }
      });
    },
    handleExport() {
      this.$parent.handleExport();
    },
    // 患者出院因为要抽取，耗能很大 所以增加节流
    /**同步出院患者 */
    throttleSyncDischargedPatient:_throttle('syncDischargedPatient',30*1000),
    async syncDischargedPatient() {
      console.log('您触发了')
      try {
        const res = await syncDischargedPatient({
          dischargeDateBegin: moment(this.data.dischargeDate[0]).format('YYYY-MM-DD'),
          dischargeDateEnd: moment(this.data.dischargeDate[1]).format('YYYY-MM-DD'),
        });
        if (res.data.code === '200') {
          this.$message.success("出院患者同步成功");
          this.search()
          return
        }
        this.$message.error(res.data.desc || "出院患者同步失败");
      } catch (error) {
      }
    },
  },
  components: {},
};
</script>
