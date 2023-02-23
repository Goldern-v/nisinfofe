<template>
  <div class="modal-con">
    <sweet-modal
      ref="newRecord"
      :modalWidth="370"
      :title="title"
      class="modal-record padding-0"
    >
      <div class="group" v-if="type != 'add'">
        <span>编码：</span>
        <el-input
        disabled
          size="small"
          style="width: 250px;"
          placeholder="请输入编码"
          v-model="code"
        ></el-input>
      </div>
      <div class="group">
        <span>名称：</span>
        <el-input
          size="small"
          style="width: 250px;"
          placeholder="请输入名称"
          v-model="name"
        ></el-input>
      </div>
      <div class="group">
        <span>状态：</span>
        <el-radio-group v-model="status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </div>
      <div class="group">
        <span>床位：</span>
        <el-select v-model="bedNoList" multiple placeholder="请选择"  style="width: 250px;">
          <el-option
            v-for="item in bedOptions"
            :key="item.bedNo"
            :disabled="item.usage == 1"
            :label="item.bedNo"
            :value="item.bedNo"
          ></el-option>
        </el-select>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="post">
          保存
        </el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal-con {
  >>>.sweet-modal {
    .sweet-content {
      padding: 30px 30px 0px !important;
      max-height: 300px;
    }

    .group {
      display: flex;
      align-items: center;
      padding-bottom: 30px;

      .el-date-editor {
        width: 300px !important;
      }
    }
  }
}
</style>

<script>
import commonMixin from '@/common/mixin/common.mixin'
import moment from 'moment'
import { addPatientRoom, getBedNo,updatePatientRoom } from '../api/api.js'
import bus from 'vue-happy-bus'
export default {
  mixins: [commonMixin],
  data() {
    return {
      eidtRowData: {},
      bus: bus(this),
      type: '',
      code: '',
      name: '',
      status: 1,
      bedNoList: [],
      bedOptions: [],
      title: '添加病房信息',
    }
  },
  methods: {
    open(type, data) {
      this.type = type
      this.$refs.newRecord.open()
      if (type == 'add') {
        this.title = '添加病房信息'
        this.eidtRowData = {}
        this.name =''
        this.code = ''
        this.status = 1
        this.bedNoList =[]
      } else {
        this.title = '修改病房信息'
        this.eidtRowData = data
        this.name = data.name
        this.code = data.code
        this.status = data.status
        this.bedNoList = data.bedNoList
      }
     
      getBedNo({
        deptCode: this.deptCode,
      }).then(
        (res) => {
          this.bedOptions = res.data.data ? res.data.data : []
          this.bedOptions.map(item=>{
            if(this.bedNoList.includes(item.bedNo)){
              item.usage=0
            }
          })
        },
        (err) => {
          this.pageLoadng = false
        },
      )
    },
    close() {
      this.$refs.newRecord.close()
    },
    post() {
      const fn=this.type=='add'?addPatientRoom: updatePatientRoom;
      const bedNoList=[];
      this.bedNoList.map(item=>{
        bedNoList.push({bedNo:item})
      })
      let data = {
        code:this.type=='add'?null: this.code,
        deptCode:this.deptCode,
        name: this.name,
        id:this.eidtRowData.id,
        status:this.status,
        patientRoomBedNoVoList:bedNoList
      }
      fn(data).then((res) => {
        const mess=this.type=='add'?'新增成功！':'修改成功！'
        this.$message.success(mess)
        this.bus.$emit('loadPatientRoomList')
        this.close()
      })
    },
  },
  created() {},
  mounted() {},
  watch: {},
  components: {},
}
</script>
