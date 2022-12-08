<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="520" title="日期查询：" :enable-mobile-fullscreen="false">
      <div flex="main:center cross:center" style="margin-bottom: 20px">
        <p style="margin-right: 10px">查询范围：</p>
          <el-date-picker v-model="value4" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围"
            align="right">
          </el-date-picker>
        </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">查询</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>
<script>
import bus from 'vue-happy-bus'
import moment from 'moment'
import {getPageIndex} from '../../api/index.js'
  export default {
    props:{
    // 护记的id
    blockId: {
      type: Number | String,
    },
    sheetStartPage: {
      type: Number,
      default:1
    },
    },
    data() {
      return {
        startPage: 1,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        //默认是当前时间到昨天的时间
        value4:(()=>{
          const dateStart = new Date()
          const dateEnd = new Date()
          dateStart.setTime(dateStart.getTime() - 3600 * 1000 * 24);
          return [dateStart,dateEnd]
        })(),
        bus: bus(this)
      }
    },
    methods: {
      open() {
        this.$refs.modal.open()
      },
      close() {
        this.$refs.modal.close()
      },
      post() {
        const [dateStart,dateEnd] = this.value4
        const params = {
          blockId: this.blockId,
          startRecordDate: moment(dateStart).format('YYYY-MM-DD HH:mm'),
          endRecordDate: moment(dateEnd).format('YYYY-MM-DD HH:mm')
        }
        getPageIndex(params).then((res)=>{
          if(res.data.code == 200){
            const {startIndex,endIndex} = res.data.data
            if(startIndex>=0&&endIndex>=0){
              this.$message({
                type: "success",
                message: "页码查询成功",
              });
              this.$emit('updateCallBack',{startPage:startIndex + this.sheetStartPage,endPage:endIndex + this.sheetStartPage,pageByDateFlag:true})
              this.close()
            }else{
              this.$message({
                type: "warm",
                message: "查询日期无数据",
              });
            }
          }
        })
      }
    },
    components: {}
  }
</script>
