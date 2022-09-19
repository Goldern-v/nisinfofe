<template>
	<div>
		<section class="newFormDialogDteatil">
			<el-dialog title="护理会诊单" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :show-close="true" :before-close="beforeClose">
				<img v-if="consultation.status=='暂存'" class="stamp" :src="require('@/common/images/consultation/hold.png')" alt="会诊暂存">
				<img v-if="(consultation.status) =='申请确认'" class="stamp" :src="require('@/common/images/consultation/applySure.png')" alt="申请确认">
				<img v-if="(consultation.status) == '完成'" class="stamp" :src="require('@/common/images/consultation/done.png')" alt="会诊完成">
				<img v-if="consultation.status=='等待确认'" class="stamp" :src="require('@/common/images/consultation/waitSure.png')" alt="等待确认">
				<el-form>
					<div class="form-header">
						<span>床号：{{consultation.patientBed}}</span>
						<span>姓名：{{consultation.patientName}}</span>
						<span>性别：{{consultation.patientGender}}</span>
						<span>年龄：{{consultation.patientAge}}</span>
						<span>科室：{{consultation.deptName}}</span>
					</div>
					<el-form-item label="会诊类型" :label-width="formLabelWidth">
						<!-- <el-input v-model="form.name" auto-complete="off"></el-input> -->
						<el-select v-model="consultation.type" placeholder="请选择活动区域" class="form-item" :readonly="true">
							<el-option label="普通" value="普通"></el-option>
							<el-option label="紧急" value="紧急"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="申请会诊时间" :label-width="formLabelWidth">
						<el-date-picker v-model="consultation.planDate" type="date" format="yyyy-MM-dd hh:mm" placeholder="选择日期" :picker-options="applyMeetDateOption" :readonly="true">
						</el-date-picker>
						<!-- <el-time-select v-model="consultation.applyMeetTime" :picker-options="applyMeetTimeOption" placeholder="选择时间">
								</el-time-select> -->
					</el-form-item>
					<el-form-item label="邀请会诊科室" :label-width="formLabelWidth">
						<!-- <multiselect v-model="form.applyDepartment" placeholder="选择或输入关键词搜索" label="name" track-by="code" :options="applyDepartmentOptions" :multiple="true" :taggable="false"></multiselect> -->
						<el-input type="text" size="small" class="form-item dept-label" :value="item.deptName" :readonly="true" v-for="item in conDeptList" :key="item.deptName"></el-input>
					</el-form-item>
					<el-form-item label="申请会诊目的" :label-width="formLabelWidth">
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="consultation.conGoal" :readonly="true">
						</el-input>
					</el-form-item>
					<el-form-item label="当前护理诊断" :label-width="formLabelWidth">
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="conDiag" :readonly="true">
						</el-input>
					</el-form-item>
					<el-form-item label="当前护理措施" :label-width="formLabelWidth" v-show="consultation.status != '暂存'">
						<div class="mesure-box" v-html="mesureText"></div>
					</el-form-item>
					<!-- 完成状态显示 -->
					<div v-show="(consultation.status) == '完成'" style="margin-top: 20px;">
                        <div class="complete-con">
						<div class="line"></div>
						<p class="head">护理部意见</p>
						<div class="info">
							<span class="info-con">
		                         会诊人员：<span class="value">{{consultation.invitedName}}</span>
							</span>
							<span class="info-con">
		                         意见日期：<span class="value">{{consultation.sugDate}}</span>
							</span>
						</div>
                        </div>
						<p class="title">最主要的主要护理问题</p>
						<el-input v-model="consultation.sugDiagnosis" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" class="textare"></el-input>
						<p class="title">预期目标</p>
						<el-input v-model="consultation.sugGoal" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" class="textare"></el-input>
						<p class="title">可采取护理措施</p>
						<el-input v-model="consultation.sugMeasure" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" class="textare"></el-input>
					</div>
				</el-form>
				<div slot="footer" class="dialog-footer" center>
					<el-button type="primary" v-touch-ripple @click="toAccept" v-show="(consultation.status) =='等待确认'">接受会诊申请</el-button>
					<el-button v-touch-ripple @click="toSuggest" v-show="(consultation.status) =='完成'" type="primary">编辑会诊意见</el-button>
					<el-button v-touch-ripple @click="close" v-show="(consultation.status) =='完成'">关闭</el-button>
					<el-button type="primary" v-touch-ripple @click="toSuggest" v-show="(consultation.status) =='申请确认'" icon="plus">添加会诊意见</el-button>
				</div>
			</el-dialog>
		</section>
		<!-- 人员弹窗 -->
		<peopelMoadl ref="peopelMoadl" :id="conId" @refresh="refresh"></peopelMoadl>
		<!-- 意见弹窗 -->
		<suggestMoadl ref="suggestMoadl" :id="conId" @refresh="refresh"></suggestMoadl>
	</div>
</template>

<script>
	import {
		detail
	} from '@/api/consultation'
	// import Multiselect from '@/plugin/vue-multiselect/src/index'
	import peopelMoadl from '../moadl/peopel.vue'
	import suggestMoadl from '../moadl/suggest.vue'
	import BusFactory from 'vue-happy-bus'
	export default {
		name: "newFormDialog",
		// props: ['dialogFormVisible'],
		components: {
			// Multiselect
		},
		data() {
			return {
				bus: BusFactory(this),
				dialogFormVisible: false,
				formLabelWidth: '85px',
				saveLoading: false,
				postLoading: false,
				"consultation": {
					"id": '',
					"conGoal": "",
					"conDiagnosis": "",
					"conMeasure": "",
					"sugGoal": "",
					"sugDiagnosis": "",
					"sugMeasure": "",
					"isManySubject": "",
					"deptCode": "",
					"deptName": "",
					"deptSize": 0,
					"invitedId": 0,
					"invitedName": "",
					"createId": '',
					"createName": "",
					"createDate": "",
					"status": "",
					"sugStatus": "",
					"type": "",
					"patientId": "",
					"patientName": "",
					"patientGender": "",
					"patientAge": "",
					"patientBed": "",
					"patientDept": "",
					"visitId": "",
					"planDate": "",
					"beginDate": "",
					"sugDate": "",
					"sugPerName": ""
				},
				conDiag: '',
				conMearsure: [],
				conDeptList: [],
				// 日期选择器配置
				applyMeetDateOption: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				// 时间选择器配置
				applyMeetTimeOption: {
					start: '08:30',
					step: '00:15',
					end: '18:30'
				},
				// 多选tag的菜单配置
				applyDepartmentOptions: [],
				conId: '',
				item: {}
			}
		},
		methods: {
			init(item) {
				this.consultation = {}
				this.conDiag = ''
				this.conId = item.id
				this.getDetail(item)
			},
			getDetail(item) {
				detail(item.id).then(res => {
					this.consultation = res.data.data.consultation
					this.conDeptList = res.data.data.conDeptList
					this.conDiag = res.data.data.conDiag || '无'
					this.conMearsure = res.data.data.conMearsure || '无'
				})
			},
			open(item) {
				this.item = item
				this.init(item)
				this.dialogFormVisible = true;
			},
			close() {
				this.dialogFormVisible = false;
				this.$emit('refresh')
			},
			filterData(status) {
				let opstDate = {
					"deptList": this.form.applyDepartment,
					"diagnosis": this.form.currentResults,
					"goal": this.form.applyPurpose,
					"measure": "", //措施
					"patientAge": this.$route.query.age,
					"patientBed": this.$route.query.bedLabel,
					"patientDept": this.$route.query.wardCode,
					"patientGender": this.$route.query.sex,
					"patientId": this.$route.query.patientId,
					"patientName": this.$route.query.name,
					"status": status,
					"type": this.form.type,
					"visitId": this.$route.query.visitId,
					"planDate": `${new Date(this.form.applyMeetDate).Format('yyyy-MM-dd')} ${this.form.applyMeetTime}`
				}
				return opstDate
			},
			toAccept() {
				this.$refs.peopelMoadl.open(this.conDeptList)
			},
			toSuggest() {
				this.$refs.suggestMoadl.open()
			},
			refresh() {
				this.init(this.item)
			},
			beforeClose(done) {
				this.$emit('refresh')
				done()
			}
		},
		computed: {
			mesureText() {
				let result = []
				if (this.conMearsure.length) {
					result = this.conMearsure.map((item, index) => {
						return `${index + 1}，${item.name}`
					})
					return result.join('<br>')
				} else {
					return '无'
				}
			}
		},
		created() {
			// getAllDept().then(res => {
			// 	this.applyDepartmentOptions = res.data.data
			// })
		},
		components: {
			peopelMoadl,
			suggestMoadl
		}
	}
</script>

<style lang="stylus" scoped>
.title
  font-size: 13px;
  color: #687179;
  margin-bottom 8px
.textare
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  box-shadow: inset 0 1px 2px 0 rgba(0,0,0,0.20);
  border-radius: 4px;
  font-size: 13px;
  color: #333333;
  margin-bottom 15px
  outline none
</style>


<style lang="scss" scoped>
	.stamp {
		position: absolute;
		right: 24px;
		top: 20px;
		opacity: .9;
		width: 176px;
		height: 139px;
		z-index: -1;
	}
	.dept-label {
		width: 190px;
		margin: 0px 15px 5px 0;
	}
	.mesure-box {
		background: #fff;
		padding: 5px 7px;
		border: 1px solid #CBD5DD;
		border-radius: 4px;
		color: rgb(31, 61, 53);
	}
</style>

<style lang="stylus">
.complete-con
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
  .info
    margin 15px 0 18px
  .info-con
    margin-right 50px
    .value
      color: #151515;
</style>




<style lang="scss">
	.newFormDialogDteatil {
		.form-header {
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			color: #333333;
			border-bottom: 1px dashed #A09D9D;
			padding-bottom: 1em;
		}
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
				width: 750px;
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
				border-top: 1px dashed #A09D9D;
				padding: 20px 0 50px;
				margin-top: 20px;
				.el-button {
					width: 130px;
					border-radius: 2px;
					height: 34px;
					font-size: 12px; // &:nth-child(1) {
					// 	background: #48AAEB;
					// 	border-color: #48AAEB;
					// }
					// &:nth-child(2) {
					// 	background: #F45D3F;
					// 	border-color: #F45D3F;
					// }
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
					border-bottom: 1px dashed #A09D9D;
				}
			} // &-icon-close::before {
			// 	content: '';
			// }
		}
	}
</style>

