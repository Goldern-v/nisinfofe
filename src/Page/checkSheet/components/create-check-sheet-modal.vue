<template>
  <SweetModal
    ref="modal"
    title="创建医嘱查对表"
    :modal-width="450"
  >
    <ElForm>
      <ElFormItem label="请选择查对表日期：" label-width="150px">
        <ElSelect v-model="date" style="width:210px">
          <ElOption
            v-for="(item,index) in dateWeek"
            :key="index"
            :label="item"
            :value="item"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="选择科室：" label-width="150px">
        <ElSelect v-model="code">
          <ElOption
            v-for="d of depts"
            :key="d.deptCode"
            :label="d.deptName"
            :value="d.deptCode"
          />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" :disabled="loading" type="primary" @click="onConfirm(false)">创建</ElButton>
  </SweetModal>
</template>

<script>
  import common from '@/common/mixin/common.mixin.js'
  import * as apis from '../apis'
  import moment from 'moment'

  export default {
    mixins: [common],
    data: () => ({
      loading: false,
      depts: [],
      code: '',
      date:''
    }),
    computed:{
      dateWeek(){
        // 设置距离当前时间12月前的周日（frontDate）和12月后的周六（lastDate）
        // 为了取frontDate和lastDate的时间单数周和双数周一样，当前时间年周数为判断条件
        let frontDate = moment().week() % 2  ? moment().day(-91) : moment().day(-84)
        let lastDate =  moment().week() % 2 ? moment().day(76) : moment().day(83)
        // 如果单前时间为周日，下一个周日就距离一周，如果是其他时间就距离两周，所以针对周日做一个处理
        if(moment().format('d') == '0' ){
          frontDate = moment(frontDate).day(7)
          lastDate = moment(lastDate).day(-7)
        }
        // 两个时间距离时间的天数
        const intervalDay = lastDate.diff(frontDate, 'day')
        let list = [];
        // 拿到两周的遍历数次
        let forDate = Math.ceil(intervalDay / 14)
        // 遍历数次，两周为一次选择节点
        for(let i =0 ; i < forDate; i++){
          let lastDay = moment(frontDate).add(13, "day").format("YYYY-MM-DD")
          let dateObj = `${moment(frontDate).format("YYYY-MM-DD")} - ${lastDay}`
          list.push(dateObj);
          frontDate = moment(lastDay).add(1, 'day').format('YYYY-MM-DD');
        }
        return list || []
      },

    },

    methods: {
      async open (code) {
        await this.loadDepts()
        this.date =  this.setDate()
        this.code = code || this.code
        this.$refs.modal.open()
      },
      setDate(){
        let datedd = ''
        this.dateWeek.map(item => {
          let fornt = item.slice(13 , Infinity)
          let last = item.slice(0, 10)
          if(moment().isAfter(last) && moment().isBefore(fornt)){
            datedd = item
          }
        })
        return datedd
      },
      close () {
        this.$refs.modal.close()
      },
      async loadDepts () {
        const res1 = await apis.listDepartment(this.deptCode)
        const {data: {data: depts}} = res1

        this.depts = depts
        this.code = depts[0].deptCode
      },
      onClose () {
        this.close()
      },
      onConfirm (copy = false) {
        if (this.loading) return

        this.loading = true
        this.$emit('confirm', {
          date: this.date,
          code: this.code,
          copy,
          done: () => {
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scroped>
</style>
