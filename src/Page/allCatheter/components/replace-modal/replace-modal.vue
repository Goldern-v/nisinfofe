<template>
    <div class="del-modal">
        <div class="cathter-replace-bg" @click="cancel"></div>
        <div class="contont">
            <div class="contont-title">修改更换时间</div>
            <div class="username">
                <div style="width:100px;">预计留置时间：</div>
                <el-date-picker
                    v-model="replaceDay"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    @change='changeVal'
                    placeholder="请选择日期时间">
                </el-date-picker>
            </div>
            <div class="btns">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="changeRep">确认</el-button>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.del-modal{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    .cathter-replace-bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.3);
    }
    .contont{
        width: 500px;
        height: 300px;
        padding: 80px 100px;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        .btns{
            display: flex;
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            justify-content: space-between;
            padding: 0 150px 20px;
            box-sizing: border-box;
        }
        .contont-title{
            display: flex;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-indent: 20px;
            font-weight: 700;
            position: fixed;
            top: 0;
            left: 0;
        }
    }
    .username,.password{
        margin-bottom: 20px;
        display: flex;
        line-height: 37px;
        /deep/ .el-input__inner{
            border: 1px solid #c2cbd2;
            width: 200px;
        }
    }
}
</style>
<script>
import moment from 'moment';
export default {
props: {
    replaceTime:{
        type:String,
        value:''
    }
},
data() {
return {
    replaceDay:this.replaceTime
};
},
methods: {
    changeVal(val){
        this.replaceDay = val
    },
    cancel(){
        this.$emit('closeRepModal')
    },
    changeRep(){
        this.$emit('changeRepFn',this.replaceDay)
    }
},
components: {}
};
</script>
