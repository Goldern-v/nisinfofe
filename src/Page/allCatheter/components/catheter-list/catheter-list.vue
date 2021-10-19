<template>
    <div class="cathter-box">
        <div class="cathter-tool">
            <div>导管</div>
            <div class="add-btn" @click="addCathter">+添加导管</div>
        </div>
        <div class="cathter-list">
            <div 
            v-for="(item,index) in cathterArr" 
            class="cathter-item" 
            :style="{color:item.fontColor,background:current==index?'#eff6f5':''}" 
            :key="index" 
            @click="selectType(item,index)"
            >
                {{item.formTitle + " " + item.createDate  + " " }}
                <div class="right-part"><div class="point" :style="{border: '5px solid ' + item.fontColor}"></div></div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
    .cathter-box{
        border:1px solid #ccc;
        position: absolute;
        width: 280px;
        height: 100%;
        background-color: #fff;
        top: 0;
        left: 199px;
        z-index: 999;
        .cathter-tool{
            display: flex;
            justify-content: space-between;
            div{
                width: 100px;
                text-indent: 15px;
                height: 30px;
                line-height: 30px;
                font-weight: 700;
            }
            .add-btn{
                cursor: pointer;
                &:hover{
                    color: #4bb08d;
                }
            }
        }
        .cathter-list{
            .cathter-item{
                cursor: pointer;
                text-indent: 10px;
                min-height: 45px;
                line-height: 45px;
                display: flex;
                justify-content: space-between;
                .right-part{
                    width: 45px;
                    padding: 18px 0 0 0;
                }
                .point{
                    height: 1px;
                    width: 1px;
                    border-radius: 50%;
                    margin:0 auto
                }
            }
        }
    }
</style>
<script>
import {getCatheterTable} from '../../api/catheter'
export default {
props: {cathterArr:{type:Array,value:[]}},
data() {
return {
    current:null,
    statusColor:{
        0:'#4bb08d',1:'red',2:'grey'
    }
};
},
methods: {
    addCathter(){
        this.$emit('addCathter')
    },
    selectType(item,index){
        this.current = index
        getCatheterTable({
            code: item.code,
            type: item.type,
            id: item.id,
            patientId: item.patientId,
            visitId: item.visitId
        },item.code).then(res=>{
            this.$emit('updateTableConfig',res.data.data)
        })
    }
},
watch:{
    'cathterArr'(a,b){
        a.map(item=>{
            item.fontColor = this.statusColor[item.catheterStatus]
        })
    }
},
components: {}
};
</script>