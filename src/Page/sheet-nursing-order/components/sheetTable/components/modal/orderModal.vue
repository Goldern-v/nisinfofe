<template>
    <div class="modalpage" @click.stop="closeSelf">
        <div class="selectbox" :style="{top:top,left:left}" v-if="type=='护嘱内容'">
            <div class="optionbox"  v-for="(item,index) in contentOptions" :key="index" @click.stop="choseitem(item)">
                {{item}}
            </div>
        </div>
        <div class="selectbox" :style="{top:top,left:left}" v-else-if="type=='频次'">
            <div class="optionbox"  v-for="(item,index) in frequencyOptions" :key="index" @click.stop="choseitem(item)">
                {{item}}
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.modalpage{
    width: 100vw;
    height: 100vh;
    // background-color:rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:-0%;
    .selectbox{
        width: 300px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        border: 1px solid #ddd;
        box-shadow: 0px 0px 10px #ccc;
        overflow: auto;
        .optionbox{
            border-bottom: 1px solid #ddd;
            height: 25px;
            line-height: 25px;
            text-indent: 10px;
            cursor: pointer;
            font-size: 12px;
        &:hover{
            background-color: #50c595;
            color: #fff;
        }
        }
    }
}
</style>
<script>
export default {
props: {
    top:{
        type:String,
        value:'0px'
    },
    left:{
        type:String,
        value:'0px'
    },
    type:{
        type:String,
        value:'护嘱内容'
    }
},
data() {
return {
    contentOptions:[
        '协助更衣',
        '指/趾甲护理',
        '面部清洁和梳头',
        '鼻饲',
        '协助进食',
        '糖尿病饮食宣教',
        '口腔护理',
        '吞咽评估',
        '吞咽冰刺激训练',
        '言语训练',
        '会阴护理',
        '留置尿管护理',
        '足部护理',
        '压疮预防及护理',
        '肛周皮肤护理',
        '协助/指导患者翻身及有效咳嗽',
        "抬高床头15-30°",
        '抬高床头30°以上',
        '协助床上移动',
        '指导/协助被动肢体功能锻炼',
        '指导主动肢体功能锻炼',
        '指导坐轮椅',
        '指导使用助行器',
        '协助上下楼梯',
        '防跌倒',
        '床上使用便器',
        '床边放大便椅',
        '床上擦浴',
        '床上洗头',
        '温水擦浴',
        '餐前打胰岛素', 
        '脐部护理',
        '洗浴',
        '防坠床',
        '翻身拍背',
        "肢体气压治疗",
        '母乳喂养知识宣教',
        '观察产程进展',
        '落实减痛措施',
        '指导分娩技巧',
        '观察胎心情况',
        '观察宫缩情况',
        '指导自数胎动',
        '观察膀胱排空及羊水情况',
        '保持会阴清洁',
        '禁止下床',
        '指导床上活动',
        '指导卧位',
        '观察阴道流血情况',
        '观察宫腔止血球囊引流情况',
        '保持管道通畅及防管道脱落',
        '协助翻身',
        '指导挤奶技巧',
        '指导肢体功能锻炼促进产后康复',
        '观察伤口出血/渗血情况',
        '检查伤口敷料情况',
        '剪指甲/更换病人服',
        '控制入量',
        '观察会阴情况',
        '观察下肢血运情况',
        '腹部按摩',
        '右下肢制动',
    ],
    frequencyOptions:['qd','bid','tid','q2h','q4h','q6h','q8h','q12h','q3d','qw','biw']
};
},
methods:{
    closeSelf(){
        this.$emit('close')
    },
    choseitem(item){
        this.$emit('changeOrderContent',item)
    }
},
components: {}
};
</script>