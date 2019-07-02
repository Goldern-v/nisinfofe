<template>
	<section class="card" :style="{height: style.height}">
		<!-- 添加留言弹窗 -->
		<el-dialog class="msg-board" title="添加留言" :visible.sync="addMsgDialogVisible" size="tiny" :before-close="handleAddClose" :close-on-click-modal="false">
			<textarea class="msg-board_txt" name="message" id="" cols="30" rows="10" v-model="newMsg" placeholder="请输入留言内容"></textarea>
			<!-- <el-input class="msg-board_txt" type="textarea" autosize placeholder="请输入内容" v-model="newMsg"> -->
			<span slot="footer" class="dialog-footer">
										<el-button @click="handleAddClose" size="small">取 消</el-button>
										<el-button type="primary" size="small" @click="addNewMsg(newMsg)">发表</el-button>
									</span>
		</el-dialog>
		<!-- 编辑留言弹窗 -->
		<el-dialog class="msg-board" title="编辑留言" :visible.sync="editMsgDialogVisible" size="tiny" :before-close="handleEditClose" :close-on-click-modal="false">
			<textarea class="msg-board_txt" name="message" id="" cols="30" rows="10" v-model="currentMsg"></textarea>
			<!-- <el-input class="msg-board_txt" type="textarea" autosize placeholder="请输入内容" v-model="newMsg"> -->
			<span slot="footer" class="dialog-footer">
									<el-button @click="handleEditClose" size="small">取 消</el-button>
									<el-button type="primary" size="small" @click="postEditMsg">发表</el-button>
								</span>
		</el-dialog>
		<!-- 留言板 -->
		<div class="card_title">
			<h4 class="card_title-desc">留言板</h4>
		</div>
		<div class="card_progress">
			<el-progress class="card_progress-bar yellow" :text-inside="true" :stroke-width="13" :percentage="totalCount != 0?doneCount/totalCount * 100:0" :show-text="false"></el-progress>
			<aside class="card_progress-desc">
				<span class="card_progress-desc_green">{{doneCount}}</span>&nbsp;/
				<span>{{totalCount}}</span>
			</aside>
		</div>
		<div class="card_wrap" :style="{height: style.heightScroll}" ref="scrollCon">
			<div ref="container">
				<div ref="content">
					<!-- 动态生成 -->
					<div class="card_item nodone" v-for="(item, index) in list" :key="item.id">
						<div class="card_item-flag" @click="toComplete(item,index)">
							<i class="iconfont icon-wancheng" v-show="item.status == 1"></i>
						</div>
						<!-- <el-tooltip class="item" effect="dark" content="" placement="bottom"> -->
						<!-- <div slot="content" class="card_item-tip_detial">{{item.msg}}</div> -->
						<!-- <div slot="content">{{item.msg}}</div> -->
						<div class="card_item-tip" :title="item.msg">{{item.msg}}</div>
						<!-- </el-tooltip> -->
						<p class="card_item-desc">{{item.creatorName}}<span style="opacity: 0">空</span>{{item.createDate}}</p>
						<div class="card_item-handle">
							<el-tooltip class="item" effect="dark" content="编辑" placement="top">
								<i class="iconfont icon-bianji" @click="openEditMsg(item.id, item.msg, index)"></i>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="top">
								<i class="iconfont icon-shanchu" @click="delMsg(item.id)"></i>
							</el-tooltip>
						</div>
					</div>
					<div class="card_noitem" v-if="list.length == 0">
						<img :src="require('@/common/images/task/nondata.png')" alt="" v-if="true">
						<span>暂无留言板信息～</span>
						<button class="card_noitem-add btn" @click="addMsgDialogVisible = true"><i class="iconfont icon-guanbi"></i>&nbsp;添加留言</button>
					</div>
					<!-- 这个不能删 -->
					<!-- <div class="card_item done" v-if="true">
													<div class="card_item-flag">
														<i class="iconfont icon-wancheng"></i>
													</div>
													<span class="card_item-tip">手术备皮</span>
													<p class="card_item-desc">{{`王大锤`}}&nbsp;&nbsp;&nbsp;{{`2分钟前`}}</p>
												</div> -->
				</div>
			</div>
		</div>
		<div class="card_footer" v-if="list.length != 0">
			<button class="card_footer-add btn" @click="addMsgDialogVisible = true"><i class="iconfont icon-guanbi"></i>&nbsp;添加留言</button>
		</div>
	</section>
</template>

<script>
	import {
		SweetModal,
		SweetModalTab
	} from '@/plugin/sweet-modal-vue';
	import {
		getMsg,
		delMsg,
		updateMsg,
		addMsg,
		accomplish
	} from '@/api/task';
	import _ from 'lodash'
	export default {
		data() {
			return {
				style: {
					height: `${window.innerHeight - 212}px`,
					heightScroll: `${window.innerHeight - 350}px`,
				},
				// 增加留言弹窗
				addMsgDialogVisible: false,
				newMsg: '',
				// 修改留言弹窗
				editMsgDialogVisible: false,
				currentMsg: '',
				currentId: 1,
				// 标题进度条
				doneCount: 0,
				totalCount: 0,
				// 列表
				list: [],
				index: 0,
				pageIndex: 0,
				totalPage: 1,
				pageSize: 10,
				scrObj: ''
			}
		},
		computed: {
			deptCode: function() {
				return this.$store.state.lesion.deptCode;
			},
		},
		watch: {
			"deptCode" (val) {
				if (this.scrObj) {
					this.refresh()
				} else {
					this.scrollInit()
				}
			}
		},
		methods: {
			render() {
				// let deptCode = this.$store.state.lesion.deptCode;
				// console.log(deptCode)
				// let deptCode = '4003';
				return getMsg(this.deptCode, this.pageIndex, this.pageSize)
			},
			scrollInit() {
				if (this.scrObj) return
				this.scrObj = new Scrollload({
					container: this.$refs.container,
					content: this.$refs.content,
					window: this.$refs.scrollCon,
					noMoreDataHtml: '',
					loadMore: (sl) => {
						if (this.pageIndex == this.totalPage) {
							sl.noMoreData()
							return
						}
						this.render().then(res => {
								this.list = [...this.list, ...res.data.data.pager.list]
								this.totalPage = res.data.data.pager.totalPage
								this.pageIndex++
                                this.doneCount = res.data.data.pager.totalCount - res.data.data.undoneCount
				                this.totalCount = res.data.data.pager.totalCount
								sl.unLock()
							})
							.catch(err => {
								sl.throwException()
							})
					},
				})
			},
			verifyAddMsg(txt) {
				let isVerify = true;
				if (!txt) {
					this.$message({
						message: '请填写留言内容',
						type: 'warning'
					});
					isVerify = false;
				}
				return isVerify;
			},
			addNewMsg(txt) {
				if (this.verifyAddMsg(txt)) {
					addMsg(txt, this.deptCode).then(res => {
						let result = res.data.data;
						this.$message({
							message: '留言发表成功',
							type: 'success'
						});
						this.newMsg = '';
						this.addMsgDialogVisible = false;
						this.list = []
						this.$nextTick(() => {
							this.refresh()
						})
					})
				}
			},
			handleAddClose(done) {
				if (this.newMsg == '') {
					this.addMsgDialogVisible = false;
					return;
				} else {
					this.$confirm('没保存留言就关闭？')
						.then(_ => {
							this.addMsgDialogVisible = false;
							done();
						})
						.catch(_ => {});
				}
			},
			openEditMsg(id, msg, index) {
				this.editMsgDialogVisible = true;
				this.currentMsg = msg;
				this.currentId = id;
				this.index = index
			},
			handleEditClose(done) {
				let id = this.currentId;
				let msg = _.find(this.list, {
					'id': id
				}).msg;
				// 如果留言没做任何更改，直接关闭弹窗
				if (this.currentMsg == msg) {
					this.editMsgDialogVisible = false;
					this.$msgbox.close();
					return;
				}
				this.$msgbox({
					title: '编辑留言',
					message: '不保存您的编辑，直接关闭？',
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							this.editMsgDialogVisible = false;
							done();
						} else {
							done();
						}
					}
				})
			},
			verifyModifyMsg() {
				let isVerify = true;
				let id = this.currentId;
				let msg = _.find(this.list, {
					'id': id
				}).msg;
				if (this.currentMsg == msg) {
					this.$message({
						message: '您还没对此留言做任何修改哦',
						type: 'warning'
					});
					isVerify = false;
				}
				return isVerify;
			},
			postEditMsg() {
				if (this.verifyModifyMsg()) {
					let id = this.currentId;
					let msg = this.currentMsg;
					let index = this.index
					updateMsg(id, msg).then(res => {
						let result = res.data.data;
						this.$message({
							message: '修改留言成功',
							type: 'success'
						});
						this.list[index].msg = msg
						this.editMsgDialogVisible = false;
						this.$msgbox.close();
						return;
					})
				}
			},
			delMsg(id) {
				this.$confirm('是否确定删除？', '提示')
					.then(_ => {
						delMsg(id).then(res => {
							this.list.splice(this.index, 1)
							this.$message({
								message: '删除留言成功',
								type: 'success'
							});
						})
						done();
					})
					.catch(_ => {});
			},
			refresh() {
				this.pageIndex = 0
				this.totalPage = 1
				this.list = []
				this.$nextTick(() => {
					this.scrObj.refreshData()
				})
			},
			toComplete(item, index) {
				if (item.status == 1) return
				accomplish(item.id).then(() => {
					this.$message({
						message: '修改状态成功',
						type: 'success'
					});
					this.list[index].status = 1
				})
			}
		},
		mounted() {
			if (this.deptCode) {
				this.scrollInit()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.progress-bar {
		background: #fff;
		&__inner {
			display: inline-block;
			background: #E4F6FF;
			height: 100%;
			position: absolute;
			left: 0;
		}
	}
	.fullpage-mask {
		position: fixed;
		z-index: 200;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card {
		height: 667px;
		background: #fff;
		border: 1px solid #cbd5dd;
		border-radius: 2px; // height: 300px;
		width: 32%;
		position: relative;
		&_title {
			background: #f7fafa;
			height: 35px;
			padding: 0 4%;
			color: #333;
			&-desc {
				display: inline;
				font-family: 'PingFangSC-Medium';
				font-size: 13px;
				font-weight: bold;
				color: #333;
				letter-spacing: 0;
				line-height: 35px;
			}
		}
		&_progress {
			height: 30px;
			background: #f7fafa;
			padding: 0 4%;
			border-bottom: 1px solid #EAEEF1;
			&-bar {
				width: 81%;
				float: left;
			}
			&-desc {
				text-align: right;
				float: right;
				font-size: 13px;
				color: #2c2f00;
				letter-spacing: 0;
				line-height: 16px;
				&_green {
					color: #F4C413;
				}
			}
		}
		&_wrap {
			box-sizing: border-box;
			padding: 20px 20px 0;
			position: relative;
			overflow: auto;
			.done {
				background: #F2F2F2;
			}
			.nodone {
				background: #fff;
			}
			.card_noitem {
				width: 100%;
				height: 100%;
				button,
				img,
				span {
					position: absolute;
					left: 50%;
					transform: translate(-50%, 0);
				}
				&-add {
					top: 370px;
				}
				img {
					width: 140px;
					height: 140px;
					top: 180px;
				}
				span {
					top: 340px;
					display: inline-block;
					font-size: 13px;
					color: #CBD5DD;
				}
			}
			.card_item {
				font-size: 13px;
				color: #687179;
				margin-bottom: 10px;
				border: 1px solid #E4E8EB;
				border-radius: 2px;
				padding: 10px 15px;
				box-sizing: border-box;
				position: relative;
				&-flag {
					width: 18px;
					height: 18px;
					display: inline-block;
					vertical-align: middle;
					background: #FFF;
					border: 1px solid #CBD5DD;
					text-align: center;
					margin-right: 11px;
					cursor: pointer;
					float: left;
					margin-top: 3px;
					i {
						line-height: 18px;
						font-size: 12px;
						color: #4BB08D;
					}
				}
				&-tip {
					margin-left: 32px;
					line-height: 18px;
					word-wrap: break-word
				}
				&-desc {
					margin-top: 6px;
					margin-left: 32px;
					font-size: 12px;
					color: #999999;
				}
				&-handle {
					position: absolute;
					bottom: 14px;
					right: 15px;
					i {
						font-size: 14px;
						margin-left: 12px;
						cursor: pointer;
					}
				}
				span {
					vertical-align: middle;
				}
			}
		}
		.btn {
			border: none;
			outline: none;
			cursor: pointer;
			height: 34px;
			background: #FFFFFF;
			border: 1px solid #CBD5DD;
			box-shadow: 0 1px 2px 0 rgba(200, 200, 200, 0.50);
			border-radius: 2px;
			font-size: 12px;
			color: #687179;
			padding: 0 10px;
			i {
				display: inline-block;
				transform: rotate(45deg);
				font-size: 13px;
				line-height: 34px;
			}
		}
		&_footer {
			width: 100%;
			height: 65px;
			position: absolute;
			bottom: 0;
			background: #F7FAFA;
			display: flex;
			align-items: center;
			border: 1px solid #E4E8EB;
			&-add {
				margin-left: 20px;
			}
		}
	}
</style>

<style lang="scss">
	.yellow {
		.el-progress-bar__innerText {
			display: none;
		}
		.el-progress-bar__inner {
			background: #F4C413;
		}
	}
	.card_progress .el-progress-bar__outer {
		box-shadow: inset 0 1px 1px 0 rgba(164, 164, 164, 0.50);
		background: #E1E5E9;
	}
	.msg-board {
		&_txt {
			height: 103px;
			width: 290px;
			border: 1px solid #CBD5DD;
			border-radius: 2px;
			padding: 10px 12px;
			line-height: 1.16;
			box-sizing: border-box;
			border: 1px solid #CBD5DD;
			border-radius: 2px;
			resize: none;
		}
		.el-dialog__title {
			font-size: 13px;
			color: #333333;
		}
		.el-dialog__header {
			height: 44px;
			padding: 0 12px;
			background: #F7FAFA;
			border-bottom: 1px solid #e5e6e6;
			line-height: 44px;
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
		}
		.el-dialog__headerbtn {
			margin: 14px 0 0 0;
		}
		.el-icon-close:before {
			color: #333333;
			font-size: 10px;
		}
		.el-dialog--tiny {
			width: 344px;
			height: 230px;
			border: 1px solid #979797;
			box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.50);
			border-radius: 4px;
			position: relative;
		}
		.el-dialog__body {
			display: flex;
			justify-content: center;
			padding: 20px 0 10px 0;
		}
	}
</style>