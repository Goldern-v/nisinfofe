<template>
    <div>
        <sweet-modal
            ref="modal"
            @close="beforeClose"
            :modalWidth="1000"
            title="入量统计用法设置"
            :enable-mobile-fullscreen="false"
            :blocking="false"
            >
            <template v-for='(other,i) in otherList' >
                <el-popover 
                    :key="i+'popoo'"
                    :ref="i+'other'"
                    placement="bottom"
                    width="460"
                    trigger="click"
                    v-model="other.showCHose"
                    popper-class="popover otherpopover"
                >
                    <el-transfer
                        v-model="other.choseList"
                        :props="{
                            key: 'usage',
                            label: 'usage'
                            }"
                        :data="canChoseList"
                        >
                    </el-transfer>
                    <div style="text-align: center; margin: 10px 0px;">
                        <el-button size="mini" type="text" @click="()=>{other.showCHose = false;other.choseList=[]}">取消</el-button>
                        <el-button type="primary" size="mini" @click="otherConfirm(other)">确定</el-button>
                    </div>
                </el-popover>
            </template>
            <div id="modal" @click.prevent="clickFun">
                <el-popover
                    ref="popover1"
                    placement="bottom"
                    width="460"
                    trigger="click"
                    v-model="showCHose"
                    popper-class="popover"
                >
                    <el-transfer
                        v-model="choseList"
                        :props="{
                            key: 'usage',
                            label: 'usage'
                            }"
                        :data="canChoseList"
                        >
                    </el-transfer>
                    <div style="text-align: center; margin: 10px 0px;">
                        <el-button size="mini" type="text" @click="()=>{showCHose = false;choseList=[]}">取消</el-button>
                        <el-button type="primary" size="mini" @click="confirm">确定</el-button>
                    </div>
                </el-popover>
                <el-popover
                    ref="popover2"
                    placement="bottom"
                    width="460"
                    trigger="click"
                    v-model="showCHose2"
                    popper-class="popover"
                >
                    <el-transfer
                        v-model="choseList2"
                        :props="{
                            key: 'usage',
                            label: 'usage'
                            }"
                        :data="canChoseList"
                        >
                    </el-transfer>
                    <div style="text-align: center; margin: 10px 0px;">
                        <el-button size="mini" type="text" @click="()=>{showCHose2 = false;choseList2=[]}">取消</el-button>
                        <el-button type="primary" size="mini" @click="confirm2">确定</el-button>
                    </div>
                </el-popover>
                <div flex="cross:center" style="margin-bottom: 20px;">项目名称：静脉入量</div>
                <div class="boxxOut">
                    <div class="boxx-tll">用<span></span>法：</div>
                    <div class="boxx-content">
                        <template  v-for="(item,index) in jingmai">
                            <div class="boxx-li" :key="index+'jingmai'">
                                {{ item.usage }}
                                <div @click="deleteLi(jingmai,index)" class="closeBTN">×</div>
                            </div>
                        </template>
                        <div class="setting" v-popover:popover1 ></div>
                    </div>
                </div>
                <div flex="cross:center" style="margin-bottom: 20px;">项目名称：胃肠入量</div>
                <div class="boxxOut">
                    <div class="boxx-tll">用<span></span>法：</div>
                    <div class="boxx-content">
                        <template  v-for="(item,index) in weichang">
                            <div class="boxx-li" :key="index+'weichang'">
                                {{ item.usage }}
                                <div @click="deleteLi(weichang,index)" class="closeBTN">×</div>
                            </div>
                        </template>
                        <div class="setting" v-popover:popover2 ></div>
                    </div>
                </div>
                <div v-for='(other,i) in otherList' :key="i+'other'" class="otherList">
                    <div style="display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        margin-bottom: 20px;
                    ">
                        项目名称：
                        <el-input v-model="other.type" placeholder=""  style="width:250px"/>
                        <div @click="addOhter(i)" class="otherBTN addOhter" v-if="i==otherList.length-1">+</div>
                        <div @click="deleteOther(i)" class="otherBTN deleteOther">-</div>
                    </div>
                    <div class="boxxOut">
                        <div class="boxx-tll">用<span></span>法：</div>
                        <div class="boxx-content">
                            <template v-for="(item,index) in other.useList" >
                                <div class="boxx-li" :key="index+'other'">
                                    {{ item.usage }}
                                    <div @click="deleteLi(other.useList,index)" class="closeBTN">×</div>
                                </div>
                            </template>
                            <div class="setting" :data-setIndex="i"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="button">
                <el-button class="modal-btn" @click="close">取消</el-button>
                <el-button class="modal-btn" @click="save">保存</el-button>
            </div>
        </sweet-modal>
    </div>
</template>

<script>
import {inputItemAll,batchUpdate} from '@/Page/sheet-page/api/index.js';

export default {
    data(){
        return {
            jingmai:[],
            weichang:[],
            canChoseList:[],
            choseList:[],
            choseList2:[],
            otherList:[],
            showCHose:false,
            showCHose2:false,
        }
    },
    mounted(){
    },
    methods:{
        clickFun(e){
            let {setindex} = e.target.dataset
            if(setindex===undefined){
                this.otherList.map(item=>{
                    item.showCHose && (item.showCHose=false)
                    item.choseList = []
                })
            }else{
                this.otherList[setindex].showCHose = !this.otherList[setindex].showCHose
                this.otherList[setindex].choseList = []
            } 
            this.choseList = []
            this.choseList2 = []
        },
        deleteLi(arr,index){
            this.canChoseList.push({...arr[index],type:""})
            arr.splice(index,1)
        },
        addOhter(i){
            if(this.otherList[i].useList.length==0) return this.$message.warning("请先完成该设置再添加")
            this.otherList.push(
                {
                    usage:"",
                    useList:[],
                    showCHose:false,
                    choseList:[]
                })
        },
        deleteOther(i){
            if(this.otherList.length==1) return this.$message.warning("已经是最后一条啦")
            this.otherList.splice(i,1)
        },
        save(){
            let otherArr = []
            this.otherList.map(item=>{
                item.useList.map(item2=>{
                    otherArr.push({...item2,type:item.type}) 
                })
            })
            let allArr = [
                ...this.jingmai,...this.weichang,...otherArr,...this.canChoseList
            ]
            batchUpdate(allArr).then(res=>{
                this.$emit("refresh")
                this.$message.success("保存成功")
                this.close()
            })
        },
        confirm(){
            this.choseList.map(ischose=>{
                let index = this.canChoseList.findIndex(item=>{
                    return item.usage===ischose
                })
                this.jingmai.push({...this.canChoseList[index],type:"静脉入量"})
                index>=0 && this.canChoseList.splice(index,1)
            })
            this.choseList = []
            this.showCHose = false
        },
        otherConfirm(row){
            row.choseList.map(ischose=>{
                let index = this.canChoseList.findIndex(item=>{
                    return item.usage===ischose
                })
                row.useList.push(this.canChoseList[index])
                index>=0 && this.canChoseList.splice(index,1)
            })
            row.choseList = []
            row.showCHose = false
        },
        confirm2(){
            this.choseList2.map(ischose=>{
                let index = this.canChoseList.findIndex(item=>{
                    return item.usage===ischose
                })
                this.weichang.push({...this.canChoseList[index],type:"胃肠入量"})
                index>=0 && this.canChoseList.splice(index,1)
            })
            this.choseList2 = []
            this.showCHose2 = false
        },
        async open(){
            this.inputItemAll()
            this.choseList=[]
            this.choseList2=[]
            this.otherList=[
                {
                    usage:"",
                    useList:[],
                    showCHose:false,
                    choseList:[]
                }
            ]
            this.$refs.modal.open();
        },
        inputItemAll(){
            inputItemAll().then(res=>{
                let {data:{data:allINData}} = res
                let jingmaiList = allINData.filter(item=>'静脉入量'===item.type)
                let weichang = allINData.filter(item=>'胃肠入量'===item.type)
                this.canChoseList = allINData.filter(item=>!item.type)
                this.jingmai = jingmaiList
                this.weichang = weichang
            })
        },
        close(){
            this.$refs.modal.close();
        },
        beforeClose(){
        },
    }
}
</script>

<style lang="scss" scoped>
/deep/  .el-popover.otherpopover {
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
/deep/ .sweet-content-content{
    >div{
        min-height: 600px;
    }
}
/deep/ .boxxOut{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;
    .boxx-tll{
        min-width: 70px;
        height: 30px;
        line-height: 30px;
        >span{
            width: 28px;
            display: inline-block;
        }
    }
    .boxx-content{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        .boxx-li{
            line-height: 30px;
            min-width: 78px;
            background: rgba(175, 201, 178, 1);
            border-radius: 5px;
            text-align: center;
            position: relative;
            padding: 0 10px;
            color: #fff;
            margin-right: 10px;
            margin-bottom: 10px;
            .closeBTN{
                position: absolute;
                top: 5px;
                right: 5px;
                line-height: 1;
                cursor: pointer;
                color: red;
                font-weight: bold;
            }
        }
    }
    .setting{
        background-image:url('../images/setting.png');
        height: 30px;
        width: 30px;
        cursor: pointer;
        background-size: 100% 100%;
    }
 
}
.otherList{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .otherBTN{
        width: 30px;
        height: 30px;
        text-align:center;
        line-height:30px;
        border:1px solid #666666;
        font-size: 16px;
        border-radius: 50%;
        color:#666666;
        margin-left:20px;
        cursor: pointer;
        &.deleteOther{
        }
    }
}
</style>