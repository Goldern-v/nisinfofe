<template>
  <div class="modal-con">
    <sweet-modal
      ref="newRecord"
      :modalWidth="500"
      title="提示"
      class="modal-record padding-0"
      v-if="type =='补执行'"
    >
      <div class="group">
        <span>开始执行时间：</span>
        <el-date-picker
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择开始执行时间"
          size="small"
          v-model="afterStartExecuteTime"
          style="width:120px"
        ></el-date-picker>
      </div>
      <div class="group">
        <span>结束执行时间：</span>
        <el-date-picker
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束执行时间"
          size="small"
          v-model="afterEndExecuteTime"
          style="width:120px"
        ></el-date-picker>
      </div>
      <div class="group">
        <span>补执行的原因：</span>
        <el-input   size="small"  style="width:200px" placeholder="请输入补执行的原因" v-model="reason"></el-input>

      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="postReason"
          >保存</el-button
        >
      </div>
    </sweet-modal>
    <sweet-modal
      ref="newRecord"
      :modalWidth="500"
      title="修改时间"
      class="modal-record padding-0"
      v-if="type == '补执行-sdyy'"
    >
       <div class="group">
        <span>补执行的原因：</span>
        <el-autocomplete
          size="small"  style="width:280px"
          v-model="reason"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
        ></el-autocomplete>
        <!-- <el-input   size="small"  style="width:200px" placeholder="请输入补执行的原因" v-model="reason"></el-input> -->
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="postReasonSdyy"
          >保存</el-button
        >
      </div>
    </sweet-modal>
    <sweet-modal
      ref="newRecord"
      :modalWidth="500"
      title="修改时间"
      class="modal-record padding-0"
      v-else
    >
      <div class="group">
        <span>实际执行时间：</span>
        <el-date-picker
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择实际执行时间"
          size="small"
          v-model="afterStartExecuteTime"
          style="width:120px"
        ></el-date-picker>
      </div>
      <div class="group">
        <span>结束输液时间：</span>
        <el-date-picker
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束输液时间"
          size="small"
          v-model="afterEndExecuteTime"
          style="width:120px"
        ></el-date-picker>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="post"
          >保存</el-button
        >
      </div>
    </sweet-modal>
  </div>

</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal-con {
  >>>.sweet-modal {
    .sweet-content {
      padding: 30px 30px 0px !important;
    }

    .group {
      display: flex;
      align-items: center;
      padding-bottom: 30px;

      .el-date-editor {
        width: 200px !important;
      }
    }
  }
}
</style>

<script>
import commonMixin from "@/common/mixin/common.mixin";
import moment from "moment";
import {
  addRecord,
  cancelOrderExecuteApi,
  updateOrderExecutePc,
} from "../../api/index";
import { updateExecuteTime } from "../../api/index";
import bus from "vue-happy-bus";
export default {
  mixins: [commonMixin],
  data() {
    return {
      eidtRowData: {},
      afterStartExecuteTime: moment().format("YYYY-MM-DD HH:mm"),
      afterEndExecuteTime: moment().format("YYYY-MM-DD HH:mm"),
      bus: bus(this),
      type:'',
      reason:'',
      callback:null
    };
  },
  methods: {
    open(data,type, callback) {
      this.type = type;
      this.$refs.newRecord.open();
      this.afterStartExecuteTime = data.realExecuteDateTime;
      this.afterEndExecuteTime = data.endDateTime || data.endInfusionTime;
      this.eidtRowData = data;
      this.callback = callback
    },
    close() {
      this.$refs.newRecord.close();
      this.reason = '';
    },
    post() {
      let data = {
        labelId: this.eidtRowData.barCode, //条码号
        empNo: this.empNo, //护士工号
        empName: this.empName, //护士名字
        beforeStartExecuteTime: this.eidtRowData.realExecuteDateTime
          ? moment(this.eidtRowData.realExecuteDateTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : this.eidtRowData.realExecuteDateTime, //修改前的实际执行时间
        beforeEndExecuteTime: this.eidtRowData.endDateTime
          ? moment(this.eidtRowData.endDateTime).format("YYYY-MM-DD HH:mm:ss")
          : this.eidtRowData.endDateTime, //修改前的结束时间
        afterStartExecuteTime: this.afterStartExecuteTime
          ? moment(this.afterStartExecuteTime).format("YYYY-MM-DD HH:mm:ss")
          : this.afterStartExecuteTime, //需要修改后的实际执行时间
        afterEndExecuteTime: this.afterEndExecuteTime
          ? moment(this.afterEndExecuteTime).format("YYYY-MM-DD HH:mm:ss")
          : this.afterEndExecuteTime //需要修改后的实际结束时间
      };
      updateExecuteTime(data).then(res => {
        this.$message.success('修改成功！');
        this.bus.$emit("loadImplementationList");
        this.close();
      });
    },
    postReason(){
      let data = {
        barcode:  this.eidtRowData.barCode, //条码号
        empNO: this.empNo, //执行人
        type: 1, //是否补执行(pda默认传0正常执行  1补执行pc端)
        typeReason: this.reason, //补执行的原因填写
        p_startdate: this.afterStartExecuteTime
          ? moment(this.afterStartExecuteTime).format("YYYY-MM-DD HH:mm:ss")
          : this.afterStartExecuteTime, //需要修改后的实际执行时间
        p_enddate: this.afterEndExecuteTime
          ? moment(this.afterEndExecuteTime).format("YYYY-MM-DD HH:mm:ss")
          : this.afterEndExecuteTime //需要修改后的实际结束时间
      };
      updateOrderExecutePc(data).then((res) => {
        this.$message.success("补录成功");
        this.bus.$emit("loadImplementationList");
        this.close();
      });
    },
    postReasonSdyy(){
      let data = {
        barcode:  this.eidtRowData.barCode, //条码号
        empNO: this.empNo, //执行人
        type: 1, //是否补执行(pda默认传0正常执行  1补执行pc端)
        typeReason: this.reason, //补执行的原因填写
      };
      updateOrderExecutePc(data).then((res) => {
        this.$message.success("补录成功");
        this.bus.$emit("loadImplementationList");
        this.callback && this.callback()
        this.close();
      });
    },
    cancelOrderExecute(item) {
      let user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
      if (!["护长", "护士长"].includes(user.job)) {
        this.$message.error("没有权限！");
      } else {
        this.$prompt("请输入取消的原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            let { empNo } = user;
            let { barCode } = item;
            let cancelReason = value;
            console.log(cancelReason);
            cancelOrderExecuteApi({
              empNO: empNo,
              barcode: barCode,
              cancelReason,
            }).then((res) => {
              this.$message.success(res.data.desc);
              this.bus.$emit("loadImplementationList");
              this.close();
            });
          })
          .catch((err) => {
            this.$message.success(err.data.desc);
          });
      }
    },
    querySearch(queryString, cb) {
        let restaurants = [
          {
            value: '患者外出检查'
          },
          {
            value: '患者抢救、补录执行信息'
          },
          {
            value: '二维码不清晰，扫码失败'
          },
          {
            value: '网络故障'
          },
        ]
        // 过滤所填写的项
        // let results = queryString ? restaurants.filter((restaurant) => {
        //   return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        // }) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(restaurants);
      },
  },
  created() {},
  mounted() {},
  watch: {},
  components: {}
};
</script>
