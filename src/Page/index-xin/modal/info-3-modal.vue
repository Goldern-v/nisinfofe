<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="400" title="患者信息" :enable-mobile-fullscreen="false">
      <div v-loading="iconLoading">
        <div class="list-con">
          <span class="key">患者：</span>
          <span class="value">{{data.patientName}}</span>
        </div>
        <div class="list-con">
          <span class="key">创建人：</span>
          <span class="value">{{data.creatorName}}</span>
        </div>
        <div class="list-con">
          <span class="key">执行人：</span>
          <span class="value">{{data.signerName}}</span>
        </div>
        <div class="list-con">
          <span class="key">批注内容：</span>
          <span class="value">{{data.content}}</span>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post" :loading="iconLoading">查看护理记录单</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.list-con
  margin 0 40px 10px
  font-size: 14px;
  .key
    color: #687179;
  .value
    color: #333333;
.icon-con
  margin 0 38px 10px
  min-height 20px
.table-name
  background: #FF263C;
  border-radius: 2px;
  width 18px
  height 18px;
  margin-left 4px
  font-size: 12px;
  color: #FFFFFF;
  text-align: center
  line-height 18px
.modal-btn
  overflow hidden
</style>
<script>
import common from '@/common/mixin/common.mixin.js'
import mixin from '../mixins/index.js'
import {info} from '../api/index-xin.js'
import sheetInfo from "../../sheet-page/components/config/sheetInfo";
import qs from 'qs'
  export default {
    mixins: [common, mixin],
    data() {
      return {
        data: {},
        details: {},
        iconLoading: false,
      }
    },
    methods: {
      open(data) {
        this.data = data
        this.details = {}
        this.iconLoading = true
        info(data.patientId, data.visitId).then(res => {
          this.details = res.data.data
          this.iconLoading = false
        })
        this.$refs.modal.open()
      },
      close() {
        this.$refs.modal.close()
      },
      post() {
        const {blockId,recordId,recordDate,formCode} = this.data
        let obj = {
          blockId,
          recordId,
          recordDate,
          formCode,
        }
        let item = this.details
        for(let i in item) {
          if(item[i]) {
            obj[i] = item[i]
          }
        }
         //定位需要用到的数据 传值给sheetInfo对象
        sheetInfo.findBlockContext = { blockId, recordId, recordDate, formCode}
        this.$router.push({ name: 'sheetPage' })
        setTimeout(()=>{
          //更新vuex患者记录，然后触发护记的watcher patientId 重新渲染数据
        this.$store.commit('upCurrentPatientObj', obj)
        this.$store.commit('upPatientInfo', obj)
        })
        this.close()
      }
    },
    components: {}
  }
</script>

