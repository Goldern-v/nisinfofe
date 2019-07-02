<template>
  <div class="contain">
    <div class="line"></div>
      <p class="head">护理部意见</p>
      <div class="info">
        <span class="info-con">
          会诊科室：
          <span class="value">{{data.deptName}}</span>
        </span>
        <span class="info-con">
          会诊人员：
          <span class="value">{{data.invitedName}}</span>
        </span>
        <span class="info-con">
          意见日期：
          <span class="value">{{data.sugDate}}</span>
        </span>
      </div>
      <div class="dash-line"></div>

      <el-form-item label="主要护理问题" :label-width="formLabelWidth">
				<div class="mesure-box">
          {{data.sugDiagnosis}}
        </div>
      </el-form-item>
      <el-form-item label="预期目标" :label-width="formLabelWidth">
			  <div class="mesure-box">
          {{data.sugGoal}}
          </div>  
      </el-form-item>
      <el-form-item label="护理措施" :label-width="formLabelWidth">
			  <div class="mesure-box">
          {{data.sugMeasure}}
        </div>
			</el-form-item>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  font-size: 13px;
  color: #687179;
.line
  border-top: 1px solid #CBD5DD;
  margin 20px -20px;
.dash-line
  border-top: 1px dashed #A09D9D;
  margin  13px 0px; 
.head
  margin 10px 0 15px;
.info-con
  margin-right 50px  
  .value
    color: #151515;
.mesure-box
  background #fff;
  padding: 5px 7px;
  border: 1px solid #CBD5DD;
  min-height 30px;
  border-radius: 4px;
  color: rgb(31, 61, 53);    
</style>
<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        formLabelWidth: '85px'
      }
    },
    components: {}
  }
</script>
