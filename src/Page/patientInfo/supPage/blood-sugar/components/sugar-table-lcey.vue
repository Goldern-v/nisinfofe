<template>
<!--聊城 血糖酮体记录表 -->
  <div flex-box="1" class="table-box blood-sugar-table" >
    <table>
      <tr>
        <th
          v-if="HOSPITAL_ID != 'liaocheng'"
          style="width: 2%; min-width: 20px"
        >
         序号
        </th>
        <th
          v-if="HOSPITAL_ID != 'lingcheng'"
          style="width: 20%; min-width: 75px"
        >
          时间
        </th>
        <th v-else style="width: 22%; min-width: 75px">日期</th>
        <th v-if="HOSPITAL_ID != 'lingcheng' && HOSPITAL_ID != 'liaocheng'" style="width: 20%">项目</th>
        <th v-else-if="HOSPITAL_ID != 'lingcheng' && HOSPITAL_ID == 'liaocheng'" style="width: 40%">类型</th>
        <th v-else style="width: 24%">测量时间</th>
        <th style="width: 21%">
          血糖值
          <br />(mmol/L)
        </th>
        <th
          style="width: 16%"
          v-if="
            HOSPITAL_ID != 'gy' &&
            HOSPITAL_ID != 'lingcheng' &&
            HOSPITAL_ID != 'huadu' &&
            HOSPITAL_ID != 'liaocheng' &&
            HOSPITAL_ID == 'hengli' &&
            HOSPITAL_ID == 'guizhou'
          "
        >
          {{HOSPITAL_ID=="quzhou"?'胰岛素剂量':'RI剂量'}}
        </th>
        <th
          style="width: 21%"
          v-if="
            HOSPITAL_ID == 'liaocheng'
          "
        >
          血酮值
        <br />(mmol/L)
        </th>
        <th style="width: 14%">{{HOSPITAL_ID == 'liaocheng' ? '签名' : '执行人'}}</th>
      </tr>
       <!-- :key="item.recordDate" -->
      <tr
        v-for="(item,index) in renderData"
        :class="{ selected: selected === item }"
        :key="index"
        @click="onSelect(item)"
      >
          <!--序号 -->
        <td v-if="HOSPITAL_ID != 'liaocheng'">
          {{index + baseIndex + 1}}
        </td>
        <!-- 时间 -->
        <td v-if="HOSPITAL_ID != 'lingcheng'" style="padding: 0 2px;" @click="textTime(item,index)">
          <div flex="main:justify" style="white-space: nowrap" class="time">
              <!-- 显示时间 -->
            <span :data-value="item.date">
              <input type="text" v-model="item.date" :data-value="item.date" @input="handlPattern(item)">
              <!-- <span>{{ item.date }}</span> -->
            </span>
            <span>
              <!-- <input type="text" v-model="item.time" :data-value="item.time" @input="handleTime"> -->
                <input type="text" v-model="item.time" :data-value="item.time" @input="((el)=>{handleTime(el,item)})">
              <!-- <span>{{ item.time }}</span> -->
            </span>
          </div>
        </td>
        <td v-else>
          <div class="cell">{{ item.date }}</div>
        </td>
        <!-- 类型 -->
        <td v-if="HOSPITAL_ID != 'lingcheng'">
          <div class="cell" :title="item.sugarItem" >
             <input type="text" class="fake" v-model="item.sugarItem" :data-value="item.sugarItem" >
            <el-autocomplete
              class="inline-input"
              v-model="item.sugarItem"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
              debounce=0
              type="textarea"
            ></el-autocomplete>
          </div>
          <!-- <div class="cell" :title="item.sugarItem">{{ item.sugarItem }}</div> -->
          <!-- <div class="cell" :title="item.sugarItem">
            <input type="text" v-model="item.sugarItem">
          </div> -->
        </td>
        <td v-else>
          <div class="cell" :title="item.sugarItem">{{ item.time }}</div>
        </td>
        <!-- 血糖值 -->
        <td>
          <!-- <div class="cell">
            {{
              item.sugarValue && item.sugarValue !== "0" ? item.sugarValue : ""
            }}
          </div> -->
           <div class="cell" >
             <input type="text" v-model="item.sugarValue" :data-value="item.sugarValue" >  
            </div>
        </td>
        <!-- 血酮 -->
        <td
          v-if="HOSPITAL_ID != 'liaocheng'"
        >
          <div class="cell">
            {{
              item.riValue && item.riValue !== "0" ? item.riValue + " ü" : ""
            }}
          </div>
        </td>
        <td
          v-if="HOSPITAL_ID == 'liaocheng'"
        >
          <!-- <div class="cell">
            {{
              item.riValue && item.riValue !== "0" ? item.riValue  : ""
            }}
          </div> -->
          <div class="cell" >
              <input type="text" v-model="item.riValue" :data-value="item.riValue"> 
            </div>
        </td>
           <!-- 签名 -->
        <td v-if="HOSPITAL_ID == 'liaocheng'">
          <div class="cell liaocheng-img" @click="sign(item)">
            <!-- 这里改。-->
            <img
              :src="`/crNursing/api/file/signImage/${item.nurseEmpNo}?${token}`"
              :alt="item.nurse"
              v-if="item.nurseEmpNo"
            />
            <!-- <div>{{item.nurseEmpNo}}</div> -->
          </div>
        </td>
        <td v-else>
          <div class="cell noPrint" v-if="HOSPITAL_ID == 'fuyou'" style="display:block">{{ item.nurse }}</div>
          <div class="cell noPrint" v-else>{{ item.nurse }}</div>
          <div class="cell inPrint lc" v-if="HOSPITAL_ID == 'lingcheng'">
            <!-- {{item.nurseEmpNo}} -->
            <img
              :src="`/crNursing/api/file/signImage/${item.expand1}?${token}`"
              :alt="item.nurse"
              v-if="item.expand1"

            />
          </div>
       
          <div :class="['cell','inPrint',HOSPITAL_ID=='guizhou'?'guizhou-img':'']" v-else>
            <!-- {{item.nurseEmpNo}} -->
            <img
              :src="`/crNursing/api/file/signImage/${item.nurseEmpNo}?${token}`"
              :alt="item.nurse"
              v-if="item.nurseEmpNo"
            />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" >
.blood-sugar-table {
  &.table-box {
    width: 0;
    table {
      border-collapse: collapse;
      width: 100%;
    }

    td, tr, th {
      border: 1px solid #000;
      text-align: center;
      vertical-align: middle;
    }
    tr {
      &:hover {
        background: #e6e6e6;
      }

      &.selected {
        background: #FFF8B1;
      }
    }

    td {
      height: 29px;
      font-size: 12px;
      padding: 0 1px;
      .cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // max-width: 74px;
      }
      img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
        object-fit: contain;
      }
    }
    th {
      height: 40px;
      font-size: 13px;
      font-weight: bold;
      background: #f4f2f5;
    }
  }

  .inPrint {
    display: none;
 
    &.lc {
      height: 29px;
    }
  }
  .liaocheng-img{
    width:55px;
    height:18px;
  }
  .guizhou-img img{
    width: 55px !important;
    height: 25px !important;
  }
  .time{
    input{
      height 15px;
      width:32px;
      border: none;
      outline: none;
      background: inherit;
        font-size :12px !important
    }
  }
  .cell{
    position relative
    input{
      padding:0px;
      height 15px;
      width: 100%; 
      border: none;
      outline: none;
      background: inherit;
      text-align center;
      font-size :12px !important;
    };
    .fake{
       position absolute;
       left: 0;
       top:0;
       z-index:-1,
    }
  }
  .el-autocomplete-suggestion{
    .el-scrollbar{
      width:80px
    }
  }
  .el-autocomplete{
     opacity:0
  }
  
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import * as apis from "../api";
import {
  saveSugarList,
    getSugarListWithPatientId,
      getPvHomePage,
      removeSugar,
} from "../api/index.js";
import { update } from '@/api/home';
import { arrayTest } from '@/Page/inpatient-report/test';
export default {
  props: {
    data: Array,
    selected: Object,
    baseIndex:Number,
  },
  mixins: [common],
  data() {
    return {
      msg: "hello vue",
      restaurants: [],
      isEdit:false,
      activeEmpNo:""
    };
  },
  computed: {
    renderData: {
      get(){
if (!this.data) return;
      let renderData = [];
      let firstDate = "";
      for (let i = 0; i < this.data.length; i++) {
        if(this.HOSPITAL_ID == 'lingcheng'){
          this.data[i].md = new Date(this.data[i].recordDate).Format("yyyy-MM-dd hh:mm");
        }else{
          this.data[i].md = new Date(this.data[i].recordDate).Format("MM-dd hh:mm");
        }
        let obj = this.data[i];
        let date = this.data[i].md.split(" ")[0];
        let time = this.data[i].md.split(" ")[1];
        if (firstDate != date) {
          obj.date = date;
        } else {
          obj.date = "";
        }
        firstDate = date;
        obj.time = time;
        renderData.push(obj);
      }
      while (renderData.length <= 26) {
        renderData.push({});
      }
      return renderData;
      },
      set(val){
         console.log(val)
      }
    },
    patientInfo() {
      return this.$route.query;
    },
  },
  filters: {
    formatDate(val) {
      return new Date(val).Format("MM-dd");
    },
    formatTime(val) {
      return new Date(val).Format("hh:mm");
    },
  },
  methods: {
    // handlerClick(){
    //   console.log(1);
    // },
   textTime(item,index){
    //  判断是否为空
    if(!item.date&&!item.time){
        if(item.expand2===undefined){
     const fullTime=moment().format("YYYY-MM-DD HH:mm:ss")
     const date=moment().format("MM-DD")
     const time=moment().format("HH:mm")
     item.date=date
     item.time=time
     item.recordDate=fullTime
     this.isEdit=false
     //  可以判断时间
      for (let i = 0;  i< index ;  i++) {
        if(this.renderData[i].date===item.date){
          item.date=""
          break
        }
      }
      }else{
        this.isEdit=true
      }
    }
      
    },
    onSelect(item) {
      this.$emit("update:selected", item);
    },
    // onDblClick(item) {
    //   this.$emit("dblclick", item);
    // },
   sign(item){
     window.openSignModal((password, empNo) => {
        apis.getUser(password, empNo).then(async(res) => {
          this.activeEmpNo=res.data.data.empNo
          // 保存逻辑
          if(item.expand2===undefined){
            item.expand2=1
            const a1=item.recordDate.split(" ")
            const a2=a1[1].split(":")
            const time=`${a2[0]}:${a2[1]}`
            if(item.time!==time){
              // 如果不相等就处理时间
              // const newDate=a1[0].split("-")
              item.recordDate=`${a1[0]} ${item.time}`
            }
            // 处理日期
            const a3=a1[0].split("-")
            const rdDate=`${a3[1]}-${a3[2]}`
            if(item.date&&item.date!==rdDate){
              const recordDateArr=item.recordDate.split(" ")
              const dateArr=recordDateArr[0].split("-")
              item.recordDate=`${dateArr[0]}-${item.date} ${recordDateArr[1]}`
            }
          }else{
             item.expand2=2
             item.recordId=""
             if(item.date){
              // 存在日期
              const a1=item.recordDate.split(" ")
              const a2=a1[0].split("-")
              const rD=`${a2[0]}-${item.date} ${item.time}`
              item.oldRecordDate=rD
             }else{
               item.oldRecordDate=item.recordDate
              }
      //  先删后改
        await removeSugar(item);
       if(item.recordDate){
     const arr= item.oldRecordDate.split(" ")
      const arr1= arr[0].split("-")
     const year=`${arr1[0]}-${arr1[1]}-${arr1[2]}`
    // const year=`${arr[0]} ${item.date}`
      item.recordDate=`${year} ${item.time}:00`
     }
          }
          this.curEmpName = res.data.data.empName;
          // this.empNo = res.data.data.empNo;
          // 执行表单保存逻辑
      item.recordDate =
      moment(item.recordDate).format("YYYY-MM-DD HH:mm") + ":00";
      item.patientId = this.patientInfo.patientId;
      item.visitId = this.patientInfo.visitId;
      item.name = this.patientInfo.name;
      item.bedLabel = this.patientInfo.bedLabel;
      item.wardCode = this.patientInfo.wardCode;
      (item.nurseEmpNo = this.activeEmpNo||this.empNo || ""), //护士工号
      item.nurse= this.activeEmpNo||this.empNo || ""
     await  saveSugarList([item])
      this.load();
      this.isEdit=false
      // 解决报错
      // this.selected = null;
      this.activeEmpNo=""
      this.$emit("update:selected",null);
      this.$emit("uploadList")
      this.$message.success("保存成功");
        });
      });
    },
     async load() {
      this.pageLoading = true;
      const res = await getSugarListWithPatientId(
        this.patientInfo.patientId,
        this.patientInfo.visitId
      );
      this.resAge = res.data.data.age;
      if(this.HOSPITAL_ID=='guizhou'&&this.$route.path.includes('nursingPreview')){
        this.resName = res.data.data.name;
        this.resGender = res.data.data.gender;
        this.resDeptName = res.data.data.deptName;
        this.resBedNol = res.data.data.bedNo;
        this.resInHosId = res.data.data.inHosId;
      }
      if (this.HOSPITAL_ID == "fuyou") this.tDeptName = res.data.data.deptName;
      this.pageLoading = false;

      this.hisPatSugarList = res.data.data.hisPatSugarList;
      /** 时间排序 */
      let list = res.data.data.hisPatSugarList.sort(
        (a, b) =>
          new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime()
      );
      let listMap = [];

      for (let i = 0; i < list.length; i += 54) {
        let obj = {};
        obj.left = list.slice(i, i + 27);
        obj.right = list.slice(i + 27, i + 54);
        listMap.push(obj);
      }
      this.listMap = listMap;

      getPvHomePage(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then((res) => {
        if (res.data.data) {
          this.startPage = res.data.data.indexNo;
        } else {
          this.startPage = 1;
        }
      });
    },
    querySearch(queryString, cb){
      console.log(queryString)
       var restaurants = this.restaurants;
       var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
       cb(results);
    },
    createFilter(queryString) {
        return (restaurant) => {
          // return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          return restaurant
        };
      },
    handleSelect(item){
       console.log(item)
    },
    handlPattern(item){
      if(item.patientId){
this.isEdit=true
      }
    },
    handleTime(e,item){
   const insert_flg=function(str, flg) {
  str = str.replace(flg, "");
  str = str.replace(/(.{2})/, `$1${flg}`);
  return str;
}
       if (e.target.value.length >= "2" && e.target.value.indexOf(":") == -1 && e.keyCode != 8) {
    setTimeout(() => {
      e.target.value = insert_flg(e.target.value, ":");
    }, 10);
     if (e.target.value.length >= 4 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 13 && e.keyCode != 108 && e.keyCode != 9 && e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 20 && e.keyCode != 27 && e.keyCode != 91) {
    e.target.value = e.target.value.substring(0,4);
  }
  }
    },
    loadAll() {
        return [
          { "value": "qd" },
          { "value": "qh" }, 
          { "value": "q2h" },
          { "value": "q3h" },
          { "value": "q4h" },
          { "value": "q6h" },
          { "value": "q8h" },
          { "value": "q12h" },
          { "value": "q1/2h" },
          { "value": "tid" },
          { "value": "bid" },
          { "value": "凌晨" },
          { "value": "早餐前" },
          { "value": "早餐后2H" },
          { "value": "午餐前" },
          { "value": "午餐后2H" },
          { "value": "晚餐前" },
          { "value": "晚餐后2H"},
          { "value": "睡前" },
          { "value": "随机" },
        ];
      },
  },
  components: {},
  mounted(){
      this.restaurants = this.loadAll();
  }
};
</script>
