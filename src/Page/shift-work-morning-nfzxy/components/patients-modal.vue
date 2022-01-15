<template>
  <SweetModal
    ref="modal"
    title="请选择交班病人"
    :modal-width="900"
  >
    <div class="container" v-loading="loading">
      <div class="group">
        <div class="items" v-if="groups.length">
          <div :class="['item',selectPatients.includes(item)?'selectItem':'']" v-for="item of groups" :key="item.key" @click="()=>handlerSelect(item)">
            {{`${item.bedLabel}床 ${item.name}`}}
          </div>
        </div>
        <div class="empty" v-else>
          暂无
        </div>
      </div>
    </div>
    <div class="footer" slot="button">
        <ElButton @click="close">取消</ElButton>
        <ElButton type="primary" @click="selectPatient">保存</ElButton>
        <strong style="display:block;flex:1;text-align:left;color:red">*请双击对应患者进行填写</strong>
    </div>
  </SweetModal>
</template>

<script>

  import * as apis from '../apis'
  import Button from './button'

  export default {
   data(){
     return {
       groups:[],
       loading:false,
       selectPatients:[]
     }
   },
    methods: {
      handlerSelect(item){
        let index = this.selectPatients.findIndex(patient=>patient.patientId==item.patientId)
        if(index!=-1){
          this.selectPatients.splice(index,1)
        }else{
          this.selectPatients.push(item)
        }
      },
      async open (
        deptCode,
        date,
        id,
        selectedKeys
      ) {
        this.selectPatients = []
        this.$refs.modal.open()
        this.loading = true
        const { data:{data} } = await apis.listPatients(deptCode, date, id)
        this.groups = data
        this.loading = false
      },
      close () {
        this.$refs.modal.close()
      },
      selectPatient(){
        // console.log(this.selectPatients.length);
        if(!this.selectPatients.length)return this.$message.warning('请至少选择一名患者！')
        this.$emit('selectCallBack',this.selectPatients)
        this.close()
      }
    },
    components: {
      Button
    }
  }
</script>

<style lang="stylus" scoped>
 .container {

  }

  .footer {
    overflow: hidden;

    .left {
      margin-top: 6px;
      float: left;
    }

    .right {
      float: right;
    }
  }

  .items {
    margin-top: 5px;
  }

  .item {
    cursor: pointer;
    margin-top: 5px;
    margin-left: 5px;
    height: 30px;
    line-height 30px;
    display: inline-block;
    width: 16%;
    text-align center
  }
  .item:nth-child(6n+1),.item:first-child{
    margin-left: 0;
  }
  .item:hover {
    background #6fc0a4
    color:#fff;
  }
  .selectItem{
    background #6fc0a4
    color:#fff;
  }
  .title {
    margin-top: 10px;
  }

  .empty {
    text-align center;
    margin-top: 50px;
    color: #bbb;
  }
</style>
