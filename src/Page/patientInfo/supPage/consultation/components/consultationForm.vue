<template>
  <div>
	<el-row class="consultationForm" v-loading="consultation.status == '' && conId" v-show="!state.inDel">
		<!--
			@parame type { String }:
			hold: 会诊暂存
			done: 会诊完成
			waitSure: 等待确认
			applySure: 申请确认
			-->
		<aside class="tip" v-show="consultation.status != '完成'">
			<i class="el-icon-warning"></i>
			<span v-if="consultation.status == '暂存'">会诊申请单尚未提交，受邀请方不会接收到该申请单。您可以继续编辑该申请单。</span>
			<span v-if="consultation.status == '等待确认'">会诊申请已提交，请耐心等待会诊科室确认。</span>
			<span v-if="consultation.status =='申请确认'">会诊申请已确认，会诊人员（{{consultation.invitedName}}）将在{{consultation.beginDate}}到达，请做好准备。</span>
			<!-- 还有几种情况没写完恩 -->
		</aside>
		<h1 class="title">
			护理会诊单
			<img v-if="consultation.status=='暂存'" class="stamp" :src="require('@/common/images/consultation/hold.png')" alt="会诊暂存">
			<img v-if="consultation.status=='申请确认'" class="stamp" :src="require('@/common/images/consultation/applySure.png')" alt="申请确认">
			<img v-if="consultation.status=='完成'" class="stamp" :src="require('@/common/images/consultation/done.png')" alt="会诊完成">
			<img v-if="consultation.status=='等待确认'" class="stamp" :src="require('@/common/images/consultation/waitSure.png')" alt="等待确认">
		</h1>
		<el-form>
			<div class="form-header">
				<span>床号：{{consultation.patientBed}}</span>
				<span>姓名：{{consultation.patientName}}</span>
				<span>性别：{{consultation.patientGender}}</span>
				<span>年龄：{{consultation.patientAge}}</span>
				<span>科室：{{$route.query.deptName}}</span>
			</div>
			<div class="form-neck" flex="main:justify">
				<span>申请人：{{consultation.createName}}</span>
				<span>申请日期：{{consultation.createDate}}</span>
				<span v-show="consultation.status != '暂存'">类型：{{consultation.type}}</span>
			</div>
			<div class="draft-con">
			<el-form-item label="会诊类型" :label-width="formLabelWidth" v-show="consultation.status == '暂存'">
					<!-- <el-input v-model="form.name" auto-complete="off"></el-input> -->
				<el-select v-model="consultation.type" placeholder="请选择会诊类型" class="form-item" :readonly="consultation.status != '暂存'" :style="{'pointer-events': consultation.status != '暂存'? 'none' : 'auto'}">
					<el-option label="普通" value="普通"></el-option>
					<el-option label="紧急" value="紧急"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="预计会诊时间" :label-width="formLabelWidth" style="padding-bottom: 10px;border-bottom: 1px dashed #A09D9D;">
				<el-date-picker v-model="consultation.planDate" type="datetime" placeholder="选择日期时间" :format="'yyyy-MM-dd HH:mm'" :readonly="consultation.status != '暂存'">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="邀请会诊科室" :label-width="formLabelWidth" :style="{'pointer-events': consultation.status != '暂存' ? 'none' : 'auto'}">
				<!-- <multiselect v-model="deptList" placeholder="选择或输入关键词搜索" label="name" track-by="code" :options="applyDepartmentOptions" :multiple="true" :taggable="false" :readonly="consultation.status != '暂存'"></multiselect> -->
			</el-form-item>
			<el-form-item label="申请会诊目的" :label-width="formLabelWidth">
				<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="consultation.conGoal" :readonly="consultation.status != '暂存'">
				</el-input>
			</el-form-item>
			<el-form-item label="当前护理诊断" :label-width="formLabelWidth">
				<div class="diagnosis-list-con" v-if="consultation.status == '暂存'">
						<el-radio-group v-model="diagnosisSelected" class="diagnosisSelected">
							<el-radio :label="`${item.id}#${item.diagName}`" class="diagnosisRadio" v-for="item in diagnosisList" :key="item.id">{{`P${item.seqNo}: ${item.diagName}`}}</el-radio>
						</el-radio-group>
					</div>
					<div v-else class="mesure-box" v-text="conDiag"></div>
			</el-form-item>
			<el-form-item label="当前护理措施" :label-width="formLabelWidth" v-show="consultation.status != '暂存'">
				<div class="mesure-box" v-html="mesureText"></div>
			</el-form-item>


			<div class="footer-btn-con" v-show="consultation.status == '暂存'">
				<!-- <el-button type="primary" class="draft-btn">暂存</el-button> -->
				<el-button type="primary" class="del-btn" @click="del">删除申请</el-button>
				<el-button type="primary" @click="submit" :loading="btnLoading.sumbit">提交申请</el-button>
			</div>

			<div class="complete-con">
				<completeCon v-if="consultation.status == '完成'" :data="consultation"></completeCon>
			</div>
			</div>
		</el-form>
	</el-row>
	<div v-show="state.inDel">
		<img src="../../../../../common/images/consultation/delete-null.png" alt="" class="del-img">
		<p class="del-text">该会诊已经删除～</p>
	</div>
  </div>
</template>

<script>
	// import Multiselect from '@/plugin/vue-multiselect/src/index'
	import {
		detail,
		getAllDept,
		patDiag,
		save,
		delCon
	} from '@/api/consultation'
	import completeCon from './item/completeCon.vue'
	import BusFactory from 'vue-happy-bus'
	export default {
		name: "newFormDialog",
		// props: ['dialogFormVisible'],
		data() {
			return {
				bus: BusFactory(this),
				dialogFormVisible: false,
				formLabelWidth: '85px',
				conId: '',
				consultation: {},
				deptList: [],
				// 多选tag的菜单配置
				applyDepartmentOptions: [],
				diagnosisSelected: '',
				diagnosisList: [],
				conMearsure: [],
				conDiag: '',
				btnLoading: {
					del: false,
					sumbit: false,
				},
				pageLoading: false,
				state: {
				  inDel: false
				},
			}
		},
		computed: {
			mesureText() {
				let result = []
				if(this.conMearsure) {
					result = this.conMearsure.map((item, index)=>{
						return `${index + 1}，${item.name}`
					})
				}
				return result.join('<br>')
			}
		},
		methods: {
			getData(id) {
				detail(id).then(res => {
					this.consultation = res.data.data.consultation
					this.diagnosisSelected = `${this.consultation.diagId}#${res.data.data.conDiag}`
					this.conMearsure = res.data.data.conMearsure
					this.conDiag = res.data.data.conDiag
					this.deptList = res.data.data.conDeptList.map((item)=>{
						return {
							code: item.consultDeptId.code,
							name: item.deptName
						}
					})
				})
			},
			init(id) {
				this.consultation = {
					status: ''
				}
				this.conId = id
				this.state =  {
				  inDel: false
				},
				this.getData(id)
			},
			refresh() {
				this.init(this.conId)
				this.bus.$emit('consultationListRefresh')
			},
			open(item) {
				this.init(item.id)
			},
			filterData() {
				let opstDate = {
					"deptList": this.deptList,
					"goal": this.consultation.conGoal,
					diagId: this.diagnosisSelected.split('#')[0],
					diagnosis: this.diagnosisSelected.split('#')[1],
					"patientAge": this.$route.query.age,
					"patientBed": this.$route.query.bedLabel,
					"patientDept": this.$route.query.wardCode,
					"patientGender": this.$route.query.sex,
					"patientId": this.$route.query.patientId,
					"patientName": this.$route.query.name,
					"status": '等待确认',
					"type": this.consultation.type,
					"visitId": this.$route.query.visitId,
					"planDate": new Date(this.consultation.planDate).Format('yyyy-MM-dd hh:mm'),
					conId: this.conId
				}
				return opstDate
			},
			submit() {
				this.btnLoading.sumbit = true
				save(this.filterData()).then(res => {
						this.$message({
							showClose: true,
							message: res.data.desc,
							type: 'success'
						})
						// 刷新
						this.refresh()
						this.btnLoading.sumbit = false
					})
					.catch(res => {
						this.btnLoading.sumbit = false
					})
			},
			del() {
				// 删除申请
				this.btnLoading.del = true
				delCon(this.conId).then(res=> {
					this.$message({
							showClose: true,
							message: res.data.desc,
							type: 'success'
						})
						// 刷新
						this.bus.$emit('consultationListRefresh')
						this.btnLoading.del = false
						this.state.inDel = true

				})
				.catch(res => {
						this.btnLoading.del = false
					})
			}
		},
		created() {
			getAllDept(this.$route.query.wardCode).then(res => {
				let result = res.data.data.filter((item)=>{
					return item.code != this.$route.query.wardCode
				})
				this.applyDepartmentOptions = result
			})
			let route = this.$route.query
			patDiag(route.wardCode, route.patientId, route.visitId).then(res => {
				this.diagnosisList = res.data.data
			})
		},
		watch: {
			id() {
				if (this.id) {
					this.getData()
				}
			}
		},
		components: {
			completeCon,
		}
	}
</script>

<style lang="stylus" scoped>
.footer-btn-con
  text-align center
  margin-top 20px
//   position absolute
//   bottom 20px
//   width 100%
//   margin 0 -20px
.draft-btn
  background: #48AAEB;
  border-color: #48AAEB;
.del-btn
  background: #F45D3F;
  border-color: #F45D3F;
.mesure-box
  background #fff;
  padding: 5px 7px;
  border: 1px solid #CBD5DD;
  border-radius: 4px;
  min-height 25px
  color: rgb(31, 61, 53);
.del-img
  width 130px;
  height 130px;
  display block
  margin 15% auto 20px
.del-text
  color #c0c0c0
  font-size 18px;
  text-align center
</style>

<style lang="scss" scoped>
	.stamp {
		position: absolute;
		right: -16px; // top: -10px;
		opacity: .9;
	}
	.tip {
		background: #FBF0DC;
		color: #EB852E;
		border-radius: 4px;
		padding: 0.6em 0 0.6em 1em;
		span {
			font-size: 13px;
			padding-left: 0.8em;
		}
		i {
			font-size: 16px;
			vertical-align: middle;
		}
	}
	.title {
		position: relative;
		font-size: 18px;
		color: #333333;
		text-align: center;
		font-weight: 600;
		margin: 16px;
	}
	.form {
		&-header {
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			color: #333333;
			border-bottom: 1px dashed #A09D9D;
			padding-bottom: 1em;
		}
		&-neck {
			margin-top: 20px;
			margin-bottom: 20px;
			font-size: 13px;
			span {
				color: #687179;
				&:nth-child(2) {
					margin-left: 30px;
				}
				&:nth-child(3) {
					margin-left: 30px;
				}
			}
		}
	}
</style>

<style lang="scss">
	.consultationForm {
		.el {
			&-textarea__inner {
				&::placeholder {
					font-size: 13px; // color: #333333;
				}
				border: 1px solid #CBD5DD;
				border-radius: 4px;
			}
			&-input__icon+.el-input__inner {
				width: 190px;
				height: 30px;
				border: 1px solid #C2CBD2;
				color: #333333;
				&::placeholder {
					font-size: 13px;
				}
			}
			&-dialog--small {
				width: 650px;
				background: #F7FAFA;
				border: 1px solid #CBD5DD;
				box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
				border-radius: 4px;
			}
			&-dialog__header {
				font-size: 18px;
				color: #333333;
				text-align: center;
			}
			&-dialog__body {
				padding: 24px 25px 0;
			}
			&-dialog__footer {
				text-align: center;
				.el-button {
					width: 84px;
					border-radius: 2px;
					height: 34px;
					font-size: 12px; // &:nth-child(1) {
					// 	background: #48AAEB;
					// 	border-color: #48AAEB;
					// }
					&:nth-child(2) {
						background: #F45D3F;
						border-color: #F45D3F;
					}
				}
			}
			&-form-item__label {
				font-size: 12px;
				color: #687179;
				text-align: left;
			}
			&-form-item {
				margin: 10px 0;
				&:nth-child(4) {
					padding-bottom: 10px;
				}
			}
			&-icon-close::before {
				content: '';
			}
		}
	}
</style>
