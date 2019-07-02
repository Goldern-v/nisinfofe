<template>
  <div>
    <table class="table-con-1">
      <thead>
        <tr>
          <td style="width: 20%">管道类型</td>
          <td style="width: 25%">原有置管床号</td>
          <td style="width: 25%">新增置管床号</td>
          <td style="width: 30%">UE床号</td>
        </tr>
      </thead>
      <tr>
        <td>胃管</td>
        <td>
          <input type="text" class="ff-input" v-model="form.wgYyzgBed">
        </td>
        <td>
           <input type="text" class="ff-input" v-model="form.wgXzzgBed">
        </td>
        <td>
           <input type="text" class="ff-input" v-model="form.wgUEBed">
        </td>
      </tr>
      <tr>
        <td>尿管</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ngYyzgBed">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ngXzzgBed">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ngUEBed">
        </td>
      </tr>
      <tr>
        <td>气管导管</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.qgdgYyzgBed">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.qgdgXzzgBed">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.qgdgUEBed">
        </td>
      </tr>
      <tr>
        <td>深静脉导管</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.szmdgYyzgBed">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.szmdgXzzgBed">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.szmdgUEBed">
        </td>
      </tr>
      <tr>
        <td>(<input type="text" v-model="form.ylgName" class="ff-input" style="width: 20px; text-align: center;">) 引流管</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ylgYyzgBed">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ylgXzzgBed">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ylgUEBed">
        </td>
      </tr>
    </table>
    <table class="table-con-2" style="margin-top: 20px">
      <thead>
        <tr>
          <td style="width: 35%">压疮指标数据</td>
          <td style="width: 15%">例数</td>
          <td style="width: 50%">床号</td>
        </tr>
      </thead>
      <tr>
        <td>入院人数</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ryrsNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ryrsBed">
        </td>
      </tr>
      <tr>
        <td>入院时已有压疮</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ryycNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ryycBed">
        </td>
      </tr>
      <tr>
        <td>入院时属压疮高风险患者</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ryycgwNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ryycgwBed">
        </td>
      </tr>
      <tr>
        <td>实际评估压疮高风险患者</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ycgwNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.ycgwBed">
        </td>
      </tr>
      <tr>
        <td>已评高风险患者发生的压疮</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.gwycNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.gwycBed">
        </td>
      </tr>
      <tr>
        <td>住院患者发生压疮</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.zyycNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.zyycBed">
        </td>
      </tr>
    </table>
     <table class="table-con-2" style="margin-top: -1px">
      <thead>
        <tr>
          <td style="width: 35%">其他指标数据</td>
          <td style="width: 15%">例数</td>
          <td style="width: 50%">床号</td>
        </tr>
      </thead>
      <tr>
        <td>排便/排尿失禁患者</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.sjhzNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.sjhzBed">
        </td>
      </tr>
      <tr>
        <td>失禁患者发生失禁性皮炎</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.sjpyNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.sjpyBed">
        </td>
      </tr>
      <tr>
        <td>发生足下垂患者</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.zxcNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.zxcBed">
        </td>
      </tr>
      <tr>
        <td>住院患者的约束人数</td>
        <td>
           <input type="text" class="ff-input"  v-model="form.zyysNum">
        </td>
        <td>
           <input type="text" class="ff-input"  v-model="form.zyysBed">
        </td>
      </tr>
      <tr>
        <td>误吸高风险住院患者</td>
        <td><input type="text" class="ff-input"  v-model="form.wxgfxNum"></td>
        <td><input type="text" class="ff-input"  v-model="form.wxgfxBed"></td>
      </tr>
      <tr>
        <td>住院患者发生误吸</td>
        <td><input type="text" class="ff-input"  v-model="form.zywxNum"></td>
        <td><input type="text" class="ff-input"  v-model="form.zywxBed"></td>
      </tr>
      <tr>
        <td>走失高风险的住院患者</td>
        <td><input type="text" class="ff-input"  v-model="form.zsgfxNum"></td>
        <td><input type="text" class="ff-input"  v-model="form.zsgfxBed"></td>
      </tr>
      <tr>
        <td>住院患者走失</td>
        <td><input type="text" class="ff-input"  v-model="form.zyzsNum"></td>
        <td><input type="text" class="ff-input"  v-model="form.zyzsBed"></td>
      </tr>
      <tr>
        <td>患者使用静脉药物发生错误</td>
        <td><input type="text" class="ff-input"  v-model="form.jmcwNum"></td>
        <td><input type="text" class="ff-input"  v-model="form.jmcwBed"></td>
      </tr>
    </table>
     <table class="table-con-2" style="margin-top: -1px">
      <thead>
        <tr>
          <td style="width: 35%">跌倒/坠床指标数据</td>
          <td style="width: 15%">例数</td>
          <td style="width: 50%">床号</td>
        </tr>
      </thead>
      <tr>
        <td>入院时属高风险跌倒患者</td>
        <td><input type="text" class="ff-input"  v-model="form.ryddNum"></td>
        <td><input type="text" class="ff-input"  v-model="form.ryddBed"></td>
      </tr>
      <tr>
        <td>实际评估跌倒/坠床高风险患者</td>
        <td><input type="text" class="ff-input"  v-model="form.ddNum"></td>
        <td><input type="text" class="ff-input"  v-model="form.ddBed"></td>
      </tr>
      <tr>
        <td>已评高风险患者发生的跌到</td>
        <td><input type="text" class="ff-input"  v-model="form.gfxddNum"></td>
        <td><input type="text" class="ff-input"  v-model="form.gfxddBed"></td>
      </tr>
      <tr>
        <td>住院患者发生跌倒</td>
        <td><input type="text" class="ff-input"  v-model="form.zyddNum"></td>
        <td><input type="text" class="ff-input"  v-model="form.zyddBed"></td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
table
  border-collapse collapse
  width 100%
  border 1px solid #EAEEF1;
  td
    border 1px solid #EAEEF1;
    height 36px
    padding 0 13px
    vertical-align middle
  thead 
    td
      background: #F7FAFA;
      font-size: 13px;
      color: #333333
      width 100%
      font-weight bold
.ff-input
  border 0
  outline 0
  width 100%    
  font-size: 13px;
  color: #333333  
</style>

<script>
  export default {
    props: {
      form: Object
    },
    data() {
      return {
      }
    },
    components: {}
  }
</script>
