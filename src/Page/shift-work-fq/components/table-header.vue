<template>
    <table class="table" ref="table">
        <thead>
            <tr>
                <th @click="log()">病区动态</th>
                <th v-for="(col,key) of keys" :key="key">{{keys[key]}}</th>
            </tr>
            <tr v-for="(shift,index) in columns" :key="index">
                <td>{{columnsKey[index]}}</td>
                <td v-for="(col,key) of keys" :key="key">
                    <!-- 不可编辑 -->
                    <!-- <div v-text="shift[key]"  style="outline:none;" @blur="(e)=>change(e,index,key)"></div> -->
                    <!-- 可编辑 -->
                    <div v-html="shift[key]" contenteditable="true" style="outline:none;" @blur="(e)=>change(e,index,key)"></div>
                </td>
            </tr>
        </thead>
    </table>
</template>
<style lang="stylus" scoped>
  .table
    width 100%
    border-collapse collapse

    th, td
      text-align center
      height 30px
      border 1px solid #444444
      font-size 12px
      vertical-align middle
      line-height 14px
      box-sizing border-box

    th
      padding 8px 4px
      background #f4f2f5
      font-weight 700
      text-align center
      word-break keep-all
      white-space nowrap

    tbody tr
      &:nth-child(2n)
        background #f4f2f5

      &:hover
        background #e6e6e6

      &.selected
        background #FFF8B1

    .cell
      padding 6px 4px

    label
      display flex
      align-items center
      // margin-top -4px
      // margin-bottom -4px
      height 100%
      width 100%

    >>>textarea, >>>pre
      display block
      // padding 8px 4px
      padding 4px;
      margin 0
      width 100%
      min-height 15px
      box-sizing border-box
      border none !important
      outline none !important
      resize none
      background none !important
      color black !important
      overflow-y hidden
      text-align inherit
      cursor auto !important

      &:disabled
        color black
        background none
.fixed-th
  position fixed
  top 102px
  width 1040px
  z-index 1
</style>
<script>
export default {
props: {
    columns:{
        type:Array,
        value:[]
    }
},
data() {
return {
    columnsKey:['白班','中班','夜班'],
    keys:{
        // bedEmpty:'空床',
        patientTotal:'原有',
        outHospitalTotal:'出院',
        transOutTotal:'转出',
        moveout:'迁出',
        // patientNew:'新收',
        patientTransferIn:'转入',
        movein:'迁入',
        patientDead:'死亡',
        inHospitalTotal:'入院',
        nowHospitalTotal:'现有',
        patientOpration:'手术',
        patientBirth:'分娩',
        patientBw:'病危',
        seriousTotal:'病重',
        goout:'外出',
        specialCare:'特护',
        patientYi:'一级护理',
        companions:'陪人数'
    }
};
},
methods: {
    log(){
        console.log(this.columns);
    },
    change(e,index,key){
        let value = e.currentTarget.innerText
        this.$emit('changeShiftWithWardcodes',index,key,value)
    }
},
created(){
    console.log(this.columns);
},
components: {}
};
</script>