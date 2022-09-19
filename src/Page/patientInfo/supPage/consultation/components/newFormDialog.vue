<template>
	<section class="newFormDialog">
		<el-dialog title="护理会诊单" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form>
				<div class="form-header">
					<span>床号：{{bedNo}}</span>
					<span>姓名：{{name}}</span>
					<span>性别：{{sex}}</span>
					<span>年龄：{{age}}</span>
					<span>科室：{{department}}</span>
				</div>
				<el-form-item label="会诊类型" :label-width="formLabelWidth">
					<!-- <el-input v-model="form.name" auto-complete="off"></el-input> -->
					<el-select v-model="form.type" placeholder="请选择活动区域" class="form-item">
						<el-option label="普通" value="普通"></el-option>
						<el-option label="紧急" value="紧急"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="预计会诊时间" :label-width="formLabelWidth">
					<!-- <el-date-picker v-model="form.applyMeetDate" type="date" format="yyyy-MM-dd" placeholder="选择日期" :picker-options="applyMeetDateOption">
					</el-date-picker>
					<el-time-select v-model="form.applyMeetTime" :picker-options="applyMeetTimeOption" placeholder="选择时间">
					</el-time-select> -->
					<el-date-picker
                     v-model="form.applyMeetDate"
                     type="datetime"
					 format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期时间">
            </el-date-picker>
				</el-form-item>
				<el-form-item label="邀请会诊科室" :label-width="formLabelWidth">
					<!-- <multiselect v-model="form.applyDepartment" placeholder="选择或输入关键词搜索" label="name" track-by="code" :options="applyDepartmentOptions" :multiple="true" :taggable="false"></multiselect> -->
				</el-form-item>
				<el-form-item label="申请会诊目的" :label-width="formLabelWidth">
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.applyPurpose">
					</el-input>
				</el-form-item>
				<el-form-item label="当前护理诊断" :label-width="formLabelWidth">
					<!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.currentResults">
						</el-input> -->
					<div class="diagnosis-list-con">
						<el-radio-group v-model="diagnosisSelected" class="diagnosisSelected">
							<el-radio :label="`${item.id}#${item.diagName}`" class="diagnosisRadio" v-for="item in diagnosisList" :key="item.id">{{`P${item.seqNo}: ${item.diagName}`}}</el-radio>
						</el-radio-group>
					</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" center>
				<el-button type="info" @click="postData('暂存')" :loading="saveLoading">暂存</el-button>
				<el-button type="primary" @click="postData('等待确认')" :loading="postLoading">提交</el-button>
				<el-button @click="dialogFormVisible = false">关闭</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import {
		save,
		getAllDept,
		patDiag
	} from '@/api/consultation'
	// import multiselect from '@/plugin/vue-multiselect/src/index'
	import BusFactory from 'vue-happy-bus'
	export default {
		name: "newFormDialog",
		// props: ['dialogFormVisible'],
		components: {
			// multiselect
		},
		data() {
			return {
				bus: BusFactory(this),
				inDel: false,
				dialogFormVisible: false,
				formLabelWidth: '85px',
				saveLoading: false,
				postLoading: false,
				diagnosisSelected: '',
				diagnosisList: [],
				bedNo: this.$route.query.bedLabel,
				name: this.$route.query.name,
				sex: this.$route.query.sex,
				age: this.$route.query.age,
				department: this.$route.query.wardName,
				form: {
					// 中间
					type: '普通',
					applyMeetDate: '',
					applyDepartment: [],
					// 足部
					applyPurpose: '',
					currentResults: ''
				},
				// 多选tag的菜单配置
				applyDepartmentOptions: [],
			}
		},
		methods: {
			init() {
				this.form =  {
					// 中间
					type: '普通',
					applyMeetDate: '',
					applyDepartment: [],
					// 足部
					applyPurpose: '',
					currentResults: ''
				}
				this.diagnosisSelected = ''
			},
			open() {
				this.init()
				this.dialogFormVisible = true;
			},
			close() {
				this.dialogFormVisible = false;
			},
			filterData(status) {
				let opstDate = {
					"deptList": this.form.applyDepartment,
					"diagnosis": this.form.currentResults,
					"goal": this.form.applyPurpose,
					diagId: this.diagnosisSelected.split('#')[0],
					diagnosis: this.diagnosisSelected.split('#')[1],
					"patientAge": this.$route.query.age,
					"patientBed": this.$route.query.bedLabel,
					"patientDept": this.$route.query.wardCode,
					"patientGender": this.$route.query.sex,
					"patientId": this.$route.query.patientId,
					"patientName": this.$route.query.name,
					"status": status,
					"type": this.form.type,
					"visitId": this.$route.query.visitId,
					"planDate": new Date(this.form.applyMeetDate).Format('yyyy-MM-dd hh:mm')
				}
				return opstDate
			},
			postData(status) {
				if (status == '暂存') {
					this.saveLoading = true
				} else {
					this.postLoading = true
				}
				save(this.filterData(status)).then(res => {
						this.$message({
							showClose: true,
							message: res.data.desc,
							type: 'success'
						})
						if (status == '暂存') {
							this.saveLoading = false
						} else {
							this.postLoading = false
						}
						this.close()
						// 刷新
						this.dialogFormVisible = false
						this.bus.$emit('consultationListRefresh')
					})
					.catch(res => {
						if (status == '暂存') {
							this.saveLoading = false
						} else {
							this.postLoading = false
						}
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
		}
	}
</script>




<style lang="stylus" scoped>
.diagnosis-list-con
   height 240px;
   overflow-y auto
</style>




<style lang="stylus">
.diagnosisSelected{
	width 100%
}
.diagnosisRadio{
	display: block !important
	background: #fff
	border: 1px solid #CBD5DD;
    box-shadow: inset 0 1px 2px 0 rgba(0,0,0,0.20);
    border-radius: 4px;
	padding 9px 12px 7px
	margin 0 0px 10px
	&.el-radio + .el-radio {
	  margin-left 0
	}
}
	.newFormDialog {
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
					font-size: 12px;
					// &:nth-child(1) {
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
			}

		}
	}
</style>

