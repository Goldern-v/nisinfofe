<template>
  <div>
    <div class="content">
      <div class="left-part">
        <el-row class="header inspect-header" type="flex" align="middle">
          <span class="title" style="margin-left: 20px">住院次数</span>
          <el-select v-model="visitId" placeholder="请选择" class="select">
            <el-option
              v-for="item in visitList"
              :key="item.value"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-row>
        <div class="body" :style="{ height: height }">
          <div
            class="item"
            v-for="item in list"
            :key="item.operId"
            @click="toRight(item)"
            :class="{ active: item.operId == rightData.operId }"
          >
            <div class="title">{{ item.operName}}</div>
            <div class="aside">{{ item.reqDateTime | dataForm }}</div>
            <div class="result">
              <span
                v-if="status[item.operStatus] === '术后'"
                style="color: green"
              >
                {{ status[item.operStatus] }}
              </span>
              <span 
                style="color: red"
                v-if="status[item.operStatus] !== '术后'">{{
                status[item.operStatus]
              }}</span>
            </div>
          </div>
          <div class="null-con">
            <div v-if="!isDone"
            :style="{ height: height }"
            v-loading="!isDone"
            element-loading-text="正在加载中"
            ></div>
            <div v-else-if="list.length == 0">
              <img src="../../../../common/images/task/nondata.png" alt />
            <p>没有相关检查数据～</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right-part">
        <OperationForm ref="operationForm"></OperationForm>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.inspect-header .select .el-input__inner {
  width: 80px !important;
  min-width: 80px !important;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 20px;
}

.left-part {
  float: left;
  width: 36%;
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;

  .header {
    padding: 0 16px;
    background: #F7FAFA;
    height: 65px;
    border-bottom: 1px solid #EAEEF1;

    .title {
      font-size: 13px;
      color: #333333;
      font-weight: bold;
    }
  }

  .body {
    padding: 20px;
    background: #fff;
    overflow: auto;

    .item {
      padding: 11px 14px 11px 14px;
      margin-bottom: 10px;
      border: 1px solid #E4E8EB;
      border-radius: 2px;
      position: relative;
      cursor: pointer;

      &.active {
        background: #F2F2F2;
      }

      .title {
        font-size: 13px;
        color: #687179;
      }

      .aside {
        font-size: 12px;
        color: #999999;
        margin-top: 10px;
      }

      .result {
        position: absolute;
        top: 8px;
        right: 10px;
        font-size: 13px;
        color: #E72C2C;

        img {
          height: 22px;
        }
      }
    }
  }
  .report-btn {
    font-size: 12px;
    padding-right 0px;
  }
}

.right-part {
  float: right;
  width: 63%;
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
}

.null-con {
  img {
    display: block;
    margin: 20% auto 20px;
    width: 120px;
  }

  p {
    text-align: center;
    font-size: 13px;
  }

  color: #666;

}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.left-part .header .select .el-input__inner {
  height: 30px;
  width: 126px;
  margin-left: 16px;
  font-size: 12px;
  color: #333333;
}
</style>

<script>
import OperationForm from "./form";
import { operationResult } from "@/api/patientInfo";
import moment from "moment"

export default {
  data() {
    return {
      isDone:false,
      list: [],
      rightData: {},
      visitList: [],
      visitId: "",
      optionsByExamClass:[
      {
          label: "全部",
        },
      ],
      status: {
        1: '手术预约',
        2: '手术预约',
        3: '手术进行中',
        4: '术后'
      }
    };
  },
  computed: {
    infoData() {
      return this.$route.query;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 255}px`;
    },
  },
  created() {
    if (this.infoData.visitId > 20) {
      this.visitList = [
        {
          label: this.infoData.visitId,
        },
      ];
    } else {
      for (let i = 0; i <= parseInt(this.infoData.visitId); i++) {
        this.visitList.push({
          label: i === 0 ? "门诊" : i,
        });
      }
    }

    this.visitId = this.infoData.visitId;
    
  },
  methods: {
    toRight(data) {
      if (!data) return;
      this.rightData = data;
      this.$nextTick(() => {
        this.$refs.operationForm.open(data);
      })
    },
    getData() {
      this.isDone = false
      operationResult(
        {
          patientId: this.infoData.patientId,
          visitId: this.visitId == "门诊" ? 0 : this.visitId,
          wardCode: ''
        }
      ).then((res) => {
        this.list = res.data.data || [];
        this.isDone = true
        console.log( this.toRight(this.list.length > 0 ? this.list[0] : {}))
          
      }).catch((err)=>{
        this.isDone = true
      });
    },
  },
  filters: {
    dataForm(value) {
      let result = value ? new Date(value).Format("yyyy-MM-dd hh:mm:ss") : "";
      return result;
    },
  },
  watch: {
    visitId() {
      this.getData();
    },
  },
  components: {
    OperationForm,
  },
};
</script>
