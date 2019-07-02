<template>
    <div class="people-modal">
        <el-dialog title="接受会诊申请" :visible.sync="dialogVisible" size="tiny" :close-on-click-modal="false" :modal="false" :before-close="beforeClose">
            <div>
                <div class="peple-box" flex="cross:center">
                    <div class="label">会诊时间</div>
                    <div class="con" flex-box="1">
                        <el-date-picker v-model="dateTime" type="datetime" placeholder="选择会诊时间" format="yyyy-MM-dd HH:mm" class="people-input">
                        </el-date-picker>
                    </div>
                </div>
                <div class="peple-box" flex="">
                    <div class="label" style="margin-top: 10px">会诊人员</div>
                    <div class="con" flex-box="1">
                        <div v-for="item in deptList" :key="item.deptName" style="margin-bottom: 15px">
                        <el-input type="text" :readonly="true" class="people-input" :value="item.name"></el-input>
                        <el-select v-model="item.selected" filterable placeholder="请选择" class="people-input" :value-key="options.name">
                            <el-option v-for="options in item.userList" :key="options.code" :label="options.name" :value="`${options.code},${options.name}`">
                            </el-option>
                        </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="postPeopel" :loading="btn.postLoading">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<style lang="stylus">
.peple-box
  margin-bottom 15px;
  .label
    width 70px;
    font-size 14px;
    color #666
  .con
    width 0  
.people-input
  width 45% !important
  margin-right 20px
</style>

<style lang="stylus">
.people-modal
  .el-dialog
    width 560px
  .el-dialog__header
    background #f7fafa
    padding 10px
    border: 1px solid #EAEEF1;
    .el-dialog__title
      font-size: 13px;
      color: #333333;
  .el-dialog__body
    padding 20px    
</style>

<script>
import {
    getDeptUserList,
    answer
    } from '@/api/consultation'
    export default {
        props: ['id'],
        data() {
            return {
                dialogVisible: false,
                dateTime: new Date(),
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                selectPeople: '',
                deptList: [],
                btn: {
                    postLoading: false,
                },
            };
        },
        methods: {
            init(item) {
                this.dateTime = new Date()
                this.conId = item.id
                this.btn.postLoading = false
                getDeptUserList(item.map((item)=>{return item.consultDeptId.code})).then(res => {
                    this.deptList = res.data.data
                })
            },
            open(item) {
                this.init(item)
                this.dialogVisible = true
            },
            close() {
                this.dialogVisible = false
                this.$emit('refresh')
            },
            beforeClose(done) {
              this.$emit('refresh')
              done()
			},
            postPeopel() {
                let postData = {}
                postData.userList = this.deptList.map((item)=>{
                    return {
                        deptCode: item.code,
                        empNo: item.selected.split(',')[0],
                        userName: item.selected.split(',')[1],
                    }
                })
                postData.conId = this.id
                postData.beginDate = new Date(this.dateTime).Format('yyyy-MM-dd hh:mm')
                this.btn.postLoading = true
                answer(postData).then(res => {
                    this.$message({
                        showClose: true,
                        message: '操作成功',
                        type: 'success'
                    })
                    this.btn.postLoading = false
                    this.close()
                }).catch(()=>{
                    this.btn.postLoading = false
                })
            }
        }
    };
</script>
