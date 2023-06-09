<template>
    <div>
        <sweet-modal
            ref="modal"
            @close="beforeClose"
            :modalWidth="1000"
            title="出入量实时查看"
            :enable-mobile-fullscreen="false"
            :blocking="false"
            >
            <div flex="cross:center" style="margin-bottom: 50px;position: relative;">
                统计时间日期：
                <el-date-picker
                    v-model="timeArange"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    type="datetimerange"
                    placeholder="选择时间范围">
                    </el-date-picker>
                <div class="toset" v-show="activeTab==2 && isEnabl" @click="openSeting"></div>
            </div>
            <el-tabs v-model="activeTab" class="tab-content" type="card">
                <el-tab-pane label="出量" name="1">
                    <div class="title" flex="cross:center main:justify">出量总量：{{ outLength?outLength+'ml':"" }}</div>
                    <div class="outPro">
                        <table v-for="(num,i) in 3" :key="i+'table'">
                            <colgroup>
                                <col width="20%"/>
                                <col width="55%"/>
                                <col width="25%"/>
                            </colgroup>
                            <tr>
                                <td>序号</td>
                                <td>项目</td>
                                <td>总量（ml）</td>
                            </tr>
                            <tr :key="index + 'out'" v-for="(out,index) in computedNum(i)">
                                <td>
                                    <div>{{ out.num }}</div>
                                </td>
                                <td>
                                    <div>
                                        {{ out.food }}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {{ out.foodSize }}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="入量" name="2">
                    <div class="title" flex="cross:center main:justify" style="margin-bottom: 20px;">1、入量总量：{{ inShows['入量'] || 0 }}ml</div>
                    <div class="title" flex="cross:center main:justify">2、静脉入量：{{ inShows['静脉入量'] || 0 }}ml</div>
                    <div class="boxx">
                        <div class="boxx-tll">用法类型：</div>
                        <div>
                            <el-checkbox-group v-model="jingmaiList">
                                <div class="measuresBox">
                                    <div class="measuresLi" :key="index + 'measure'" v-for="(out,index) in filterOut('静脉入量')">
                                        <el-checkbox :label="out.usage"></el-checkbox>
                                    </div>
                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="title" flex="cross:center main:justify">3、胃肠入量：{{ inShows['胃肠入量'] || 0  }}ml</div>
                    <div class="boxx">
                        <div class="boxx-tll">用法类型：</div>
                        <div>
                            <el-checkbox-group v-model="weichangList">
                                <div class="measuresBox">
                                    <div class="measuresLi" :key="index + 'measure'" v-for="(out,index) in filterOut('胃肠入量')">
                                        <el-checkbox :label="out.usage"></el-checkbox>
                                    </div>
                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <template v-for="(other,index) in otherList" >
                        <div :key="index+'other1'" class="title" flex="cross:center main:justify">{{ 4+index+'、'+other.type + "：" + (inShows[other.type] || 0 ) }}ml</div>
                        <div class="boxx">
                            <div class="boxx-tll">用法类型：</div>
                            <div>
                                <el-checkbox-group v-model="other.usagelist">
                                    <div class="measuresBox">
                                        <div class="measuresLi" :key="index + 'measure'" v-for="(out,index) in filterOut(other.type)">
                                            <el-checkbox :label="out.usage"></el-checkbox>
                                        </div>
                                    </div>
                                </el-checkbox-group>
                            </div>
                        </div>
                        
                    </template>
                </el-tab-pane>
            </el-tabs>
            <div slot="button">
                <el-button class="modal-btn" @click="close">取消</el-button>
                <el-button class="modal-btn" @click="getData">查询</el-button>
            </div>
        </sweet-modal>
        <patientInfoOutFoodSeting @refresh="inputItemAll" ref="patientInfoOutFoodSeting"></patientInfoOutFoodSeting>
    </div>
</template>

<script>
import moment from "moment";
import patientInfoOutFoodSeting from './patient-info-outFoodSei'
import {putGroupCountWeiHai,inputItemAll,isEnableToEdit} from '@/Page/sheet-page/api/index.js';

export default {
    components:{patientInfoOutFoodSeting},
    data(){
        return {
            timeArange:[],
            foodList:[],
            activeTab:"1",
            outLength:"",
            inShows:{},
            inList:[],
            jingmaiList:[],
            weichangList:[],
            otherList:[],
            isEnabl:false,
        }
    },
    methods:{
        openSeting(){
            this.$refs.patientInfoOutFoodSeting.open()
        },
        computedNum(i){
            if(i==0) return this.foodList.filter((item,index)=>(item.num%3==1))
            else if(i==1) return this.foodList.filter((item,index)=>(item.num%3==2))
            else if(i==2) return this.foodList.filter((item,index)=>(item.num%3==0))
        },
        async open(){
            this.$set(this.timeArange,0, moment().format('YYYY-MM-DD 07:01:00'))
            this.$set(this.timeArange,1, moment().format('YYYY-MM-DD HH:mm:00'))
            this.isEnableToEdit()
            this.inputItemAll()
            this.$refs.modal.open();
        },
        filterOut(type){
            return this.inList.filter(item=>type===item.type)
        },
        isEnableToEdit(){
            isEnableToEdit().then(res=>{
                this.isEnabl = res.data.data.isEnableToEdit
            })
        },
        inputItemAll(){
            inputItemAll().then(res=>{
                let {data:{data:allINData}} = res
                this.inList = allINData
                let jingmaiList = this.inList.filter(item=>'静脉入量'===item.type)
                let weichangList = this.inList.filter(item=>'胃肠入量'===item.type)
                let otherList = this.inList.filter(item=>(!['静脉入量','胃肠入量'].includes(item.type) && item.type))
                this.jingmaiList = jingmaiList.map(item=>item.usage)
                this.weichangList = weichangList.map(item=>item.usage)
                
                let ARR = []
                for(let i=0;i<otherList.length;i++){
                    let index = ARR.findIndex(item=>(item.type === otherList[i].type))
                    if(index>=0){
                        ARR[index].usagelist.push(otherList[i].usage)
                    }else{
                        ARR.push({
                            type:otherList[i].type,
                            usagelist:[otherList[i].usage]
                        })
                    }
                }
                this.otherList = ARR
                this.getData()
            })
        },
        getData(){
            let otherList = {}
            this.otherList.map(item=>{
                let key = item['type']
                otherList[key] = item.usagelist
            })
            let query = {
                startTime:moment(this.timeArange[0]).format("YYYY-MM-DD HH:mm:ss"),
                endTime:moment(this.timeArange[1]).format("YYYY-MM-DD HH:mm:ss"),
                type:0,
                typeAndUsage:{
                    "静脉入量":this.jingmaiList,
                    "胃肠入量":this.weichangList,
                    ...otherList
                }
            }
            Promise.all([putGroupCountWeiHai(query)]).then((res)=>{
                let {data:{data:data}} = res[0]
                this.outLength = data.outShows['出量']
                delete data.outShows["出量"]
                let outKeys = Object.keys(data.outShows)
                let outValues = Object.values(data.outShows)
                let foodList = []
                outKeys.map((item,index)=>{
                    foodList.push({num:index+1,food:item,foodSize:outValues[index]})
                })
                this.foodList = foodList
                this.inShows = data.inShows
            })
        },
        close(){
            this.$refs.modal.close();
        },
        beforeClose(){
            this.$emit("onClose")
        }
    },
}
</script>

<style lang="scss" scoped>
/deep/ .toset{
        cursor: pointer;
        background-image:url('../images/toset.png');
        width: 40px;
        height: 40px;
        background-size: 100% 37px;
        background-repeat: no-repeat;
        position: absolute;
        right: 50px;
        top: 0;
    }
.tab-content {
    
  /deep/ .el-tabs__header {
    margin-left: -20px;
    margin-right: -20px;
    background: #F7FAFA;
  }
  /deep/ .el-tabs__content{
    min-height: 400px;
  }
  .boxx{
        display: flex;
        align-items: center;
        .boxx-tll{
            margin-left: 20px;
            min-width: 70px;
        }
        .el-checkbox-group{
            .measuresBox{
                display: flex;
                align-items: center;
                line-height: 40px;
                .measuresLi{
                    margin-right:20px;

                }
            }
        }
    }
  /deep/ .el-tabs__item {
    height: 37px;
    border-radius: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &.is-active {
      background: #fff;
      border-radius: 0;
      border-top: 3px solid #4BB08D;
      border-bottom: 3px solid transparent;
      box-sizing: border-box;
      font-weight: bold;
      line-height: 33px;
      color: #333;
    }
  }

  /deep/ .el-tabs__item {
    line-height: 37px;
  }
}
.modal-btn-box {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}
.outPro{
    // display: flex;
    // justify-content: space-between;
    overflow:hidden;
    margin-top: 10px;
  
  table{
    border-collapse: collapse;
    width:32%;
    float:left;
    &:nth-of-type(n+2){
        margin-left: 10px;
      } 
    tr{
      &:first-of-type{
        td{
          background:#bdc9c8;
          text-align:center;
          vertical-align: middle;
          height: 22px;
        }
      }
      td{
        border: 1px solid #000;
        color:#000;
        vertical-align: middle;
        >div{
          text-align:left;
          height:100%;
          line-height: 22px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 5px;
        }
      }
    }
  }
}

</style>