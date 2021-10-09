<template>
    <div class="modal-page" @click.stop="closeSelf">
        <div class="new-modal" @click.stop>
            <div class="modal-body">
                <div v-if="newCathterType.name=='（）引流管'" style="display:flex;line-height:37px;width:265px;margin-bottom:10px;">
                    名&nbsp;&nbsp;称:<el-input :value="newCathterType.name" placeholder="请输入内容" @input="changeType"></el-input>
                </div>
                <div v-else style="display:flex;line-height:37px;width:265px;margin-bottom:10px;">
                    名&nbsp;&nbsp;称:<el-input :value="newCathterType.name" placeholder="请输入内容" @input="changeType" :disabled='true'></el-input>
                </div>
                <div style="margin-bottom:10px;">
                    置管时间:<el-date-picker
                            v-model="intubationTime"
                            type="datetime"
                            placeholder="选择日期时间">
                            </el-date-picker>
                </div>
                <div style="margin-bottom:10px;">
                    换管时间:<el-date-picker
                            v-model="expecteReplaceTime"
                            type="datetime"
                            placeholder="选择日期时间">
                            </el-date-picker>
                </div>
                 <div style="margin-bottom:10px;">
                    管道来源:<el-select v-model="catheterSource" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                </div>
                <div class="btns">
                    <button @click="closeSelf">取消</button>
                    <button @click="sumbitCathter">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.modal-page{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
}
.new-modal{
    width: 400px;
    height:300px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 8px;
    padding: 20px 50px;
    box-sizing: border-box;
    overflow: hidden;
    .modal-body{
        input{
            height: 28px;
            outline: none;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 0 0 0 10px;
        }
        .btns{
            display: flex;
            position: absolute;
            bottom:0;
            left: 0;
            width: 100%;
            height: 50px;
            }
        button{
            flex: 1;
            border: 1px solid #ccc;
            background-color: #01c298;
            color: #fff;
            cursor: pointer;
            &:first-child{
                background-color: #ffffff;
                color: #000;
            }
        }
    }
}
</style>
<script>
import {createCathter} from '../../api/catheter'
import moment from 'moment';
export default {
props: {
    newCathterType:{
        type:Object,
        value:{}
    }
},
data() {
    return {
        type:'',
        intubationTime:moment().format("YYYY-MM-DD HH:mm:ss"), //当前时间
        expecteReplaceTime:'',
        options:[{
            value:'本院',
            label:'本院'
        }],
        catheterSource:'',
        formTitle:''
    };
},
methods: {
    closeSelf(){
        this.$emit('close')
    },
    changeType(e){
        this.title = e.currentTarget.value
    },
    sumbitCathter(){
        let {formCode , formType , name} = this.newCathterType
        createCathter({
            code: formCode,
            type: formType,
            deptCode: this.$store.state.sheet.patientInfo.deptCode,
            patientId: this.$store.state.sheet.patientInfo.patientId,
            visitId: this.$store.state.sheet.patientInfo.visitId,
            intubationTime:moment(this.intubationTime).format("YYYY-MM-DD HH:mm:ss"),
            replaceTime:moment(this.expecteReplaceTime).format("YYYY-MM-DD HH:mm:ss"),
            formTitle:this.formTitle?this.formTitle:this.newCathterType.name,
            catheterSource:this.catheterSource
        }).then(res=>{
            this.$message.success('添加成功')
            this.$emit('onChangePatient_self',this.$store.state.sheet.patientInfo)
            this.closeSelf()
        }).catch(err=>{
            this.$message.error(err.desc)
        })
    }
},
watch:{
    newCathterType(a,b){
        console.log(a,'a');
        console.log(b,'b');
    }
},
components: {}
};
</script>