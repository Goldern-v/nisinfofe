<template>
    <div class="cathter-box" :style="{left:$route.path.includes('allCatheter')?'199px':'0px'}">
        <div class="cathter-tool">
            <div style="flex:1;">导管</div>
            <div style="flex:3;text-indent:0;"><el-checkbox v-model="showExtubation">显示已拔除导管</el-checkbox></div>
            <div style="flex:2;" class="add-btn" @click="addCathter">+添加导管</div>
        </div>
        <div class="cathter-list">
            <div
            v-for="(item,index) in renderCathter"
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
        z-index: 999;
        .cathter-tool{
            display: flex;
            justify-content: space-between;
            box-shadow: 0px 3px 5px #ccc;
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
            height: calc(100% - 30px);
            overflow-y: auto;
            .cathter-item{
                cursor: pointer;
                padding-left: 10px;
                min-height: 45px;
                line-height: 45px;
                display: flex;
                justify-content: space-between;
                .right-part{
                    width: 45px;
                    padding: 18px 0 0 0;
                    position: relative;
                }
                .point{
                    position: absolute;
                    transform: translate(-50%,-50%);
                    height: 1px;
                    width: 1px;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                }
            }
        }
    }
</style>
<script>
import {getCatheterTable} from '@/Page/allCatheter/api/catheter'
export default {
props: {cathterArr:{type:Array,value:[]}},
data() {
return {
    current:null,
    statusColor:{
        0:'#4bb08d',1:'red',2:'grey'
    },
    showExtubation:false,
    renderCathter:[]
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
    },
    showExtubationFn(value){
        if(value){
            this.renderCathter = this.cathterArr
        }else{
            this.renderCathter = this.cathterArr.filter(item=>{
                return item.catheterStatus!='2'
            })
        }
    }
},
updated(){
    let id = sessionStorage.getItem('createCathterId')
    let index = this.renderCathter.findIndex(item=>item.id==id)
    let item = this.renderCathter.find(item=>item.id==id)
    if(id && index!=this.current&&index!=-1){
        this.selectType(item,index)
        sessionStorage.setItem('createCathterId',null)
    }
},
watch:{
    'cathterArr'(a,b){
        a.map(item=>{
            item.fontColor = this.statusColor[item.catheterStatus]
        })
        this.showExtubationFn(this.showExtubation)
    },
    showExtubation(value){
        this.showExtubationFn(value)
    }
},
components: {}
};
</script>
