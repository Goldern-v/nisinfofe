<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" title="出入量统计">
      <p for class="name-title">请选择日期区间：</p>
      <div flex="cross:center main:center" style="margin: 0 15px 20px">
        <el-date-picker
          v-model="date[0]"
          type="datetime"
          placeholder="选择开始日期"
          @change="putGroupCountFn('update')"
        ></el-date-picker>
        <span style="padding: 0 15px; width: 30px">至</span>
        <el-date-picker
          v-model="date[1]"
          type="datetime"
          placeholder="选择结束日期"
          @change="putGroupCountFn('update')"
        ></el-date-picker>
      </div>
      <div class="group-count" v-loading="loading">
        <div>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
        </div>
        <div class="check-group">
          <div class="left">
            <span>入量</span>
            <el-checkbox-group
              v-model="resultList"
              size="small"
              @change="handleCheckedCitiesChange"
            >
              <div class="m-10" v-for="(item, key) of inShows" :key="key">
                <el-checkbox :label="key"></el-checkbox>:{{
                  item ? `${item}` : " "
                }}
              </div>
            </el-checkbox-group>
          </div>
          <div class="right">
            <span>出量</span>
            <el-checkbox-group
              v-model="resultList2"
              size="small"
              @change="handleCheckedCitiesChange"
            >
              <div class="m-10" v-for="(item, key) of outShows" :key="key">
                <el-checkbox :label="key"></el-checkbox>:{{
                  item ? `${item}` : " "
                }}
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <!-- <p for class="name-title" flex="cross:center main:justify">
        <span>特殊情况处理：</span>
        <span class="activeText" @click="putGroupCount">分类合计</span>
      </p> -->
      <!-- <div style="margin: 0 15px" class="textarea-con">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入特殊情况处理"
          v-model="description"
        ></el-input>
      </div> -->
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post" :disabled="!(isIndeterminate||checkAll)"
          >保存</el-button
        >
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.noTimeCon .el-date-picker__editor-wrap:last-child {
  pointer-events: none;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title {
  font-size: 14px;
  margin: 0px 0 15px;
  font-weight: bold;
  padding-left: 15px;
  padding-right: 15px;
}

.activeText {
  font-size: 14px;
  color: rgb(40, 79, 194);
  cursor: pointer;
  font-weight: normal;
}

.textarea-con {
  >>>textarea {
    height: 120px;
  }
}

.group-count {
  padding-left: 15px;
  padding-right: 15px;

  .check-group {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }

  .el-checkbox-group {
    padding-top: 10px;
  }
}
</style>

<script>
import { outputSumHd } from "@/api/record";
import { putGroupCount } from "../../api/index.js";
import moment from "moment";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
export default {
  data() {
    return {
      date: [
        moment().format("YYYY-MM-DD HH:mm"),
        moment().format("YYYY-MM-DD HH:mm"),
      ],
      description: "",
      bus: bus(this),
      inShows: "",//入量数据
      outShows: "",///出量数据
      resultList: [],//入量勾选的数据
      resultList2: [],//出量勾选的数据
      checkAll: false,//是否选中全部选项
      isIndeterminate: false,
      loading:true,
    };
  },
  methods: {
    open() {
      this.loading = true
      this.$refs.modal.open();
      this.description = "";
      let y = moment().subtract(1, "days").format("YYYY-MM-DD");
      let t = moment().format("YYYY-MM-DD");
      let yt = y + " 07:00";
      let tt = t + " 07:00";
      this.date = [yt, tt];
      this.resultList = [];
      this.resultList2 = [];
      this.isIndeterminate = false;
      this.checkAll = false;
      this.putGroupCountFn();
    },
    close() {
      this.resultList = [];
      this.resultList2 = [];
      this.isIndeterminate = true;
      this.checkAll = false;
      this.$refs.modal.close();
    },
    dateFormat(date) {
      let myDate = new Date(date);
      let Y = myDate.getFullYear();
      let M = myDate.getMonth() + 1;
      M = M < 10 ? "0" + M : M;
      let D = myDate.getDate();
      D = D < 10 ? "0" + D : D;
      let H = myDate.getHours();
      H = H < 10 ? "0" + H : H;
      let Min = myDate.getMinutes();
      Min = Min < 10 ? "0" + Min : Min;
      let second = myDate.getSeconds();
      second = second < 10 ? "0" + second : second;
      console.log(
        "formatDate",
        Y + "-" + M + "-" + D + " " + H + ":" + Min + ":" + second
      );
      return Y + "-" + M + "-" + D + " " + H + ":" + Min + ":" + second;
    },
    post() {
      if (this.date[1]) {
        let date = this.date;
        let startTime = this.dateFormat(this.date[0]);
        let endTime = this.dateFormat(this.date[1]);
        let recordCode = sheetInfo.sheetType;
        outputSumHd(
          this.$parent.patientInfo.patientId,
          this.$parent.patientInfo.visitId,
          recordCode,
          startTime,
          endTime,
          this.description,
          this.resultList,
          this.resultList2
        ).then((res) => {
          // this.bus.$emit("refreshSheetPage");
          this.bus.$emit("initSheetPageSize");
          this.$message({
            showClose: true,
            message: "保存成功",
            type: "success",
          });
          this.close();
        });
      } else {
        this.$message({
          showClose: true,
          message: "请输入正确的时间",
        });
      }
    },
    putGroupCountFn(type) {
        this.loading = true
      if(type){
        this.resultList = [];
        this.resultList2 = [];
        this.isIndeterminate = false;
        this.checkAll = false;
      }

      let date = this.date;
      let startTime = this.dateFormat(this.date[0]);
      let endTime = this.dateFormat(this.date[1]);
      putGroupCount(
        this.$parent.patientInfo.patientId,
        this.$parent.patientInfo.visitId,
        startTime,
        endTime
      ).then((res) => {
        this.inShows = res.data.data.inShows;
        this.outShows = res.data.data.outShows;
        this.resultList = Object.keys(this.inShows)
        this.resultList2 = Object.keys(this.outShows)
        this.checkAll = true
        this.loading = false
      });
    },
    handleCheckAllChange(val) {
      if (this.checkAll) {
        for (let key in this.inShows) {
          this.resultList.push(key);
        }
        for (let key in this.outShows) {
          this.resultList2.push(key);
        }
      } else {
        this.resultList = [];
        this.resultList2 = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      let num1 = 0,
        num2 = 0;
      for (let key in this.inShows) {
        num1++;
      }
      for (let key in this.outShows) {
        num2++;
      }
      this.checkAll =
        (num1&&num2)&&(this.resultList.length + this.resultList2.length == num1 + num2);
      this.isIndeterminate =!!((num1&&num2&&(this.resultList.length||this.resultList2.length))&&(this.resultList.length + this.resultList2.length < num1 + num2));
        console.log(num1,num2,this.resultList.length,this.resultList2.length);
    },
  },
  watch:{
      isIndeterminate(newVal,oldVal){
          console.log('isIndeterminate',newVal,oldVal);
      },
      checkAll(newVal,oldVal){
          console.log('checkAll',newVal,oldVal);
      },
  },
  components: {},
};
</script>
