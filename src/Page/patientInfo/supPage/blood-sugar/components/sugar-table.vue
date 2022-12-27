<template>
  <div flex-box="1" class="table-box blood-sugar-table">
    <table>
      <tr>
        <th
          v-if="HOSPITAL_ID != 'guizhou' && HOSPITAL_ID != 'whfk'&& HOSPITAL_ID != 'lyyz'&& HOSPITAL_ID != 'whsl' && HOSPITAL_ID != 'ytll'"
          style="width: 10%; min-width: 20px"
        >
          序号
        </th>
        <th
          v-if="HOSPITAL_ID != 'lingcheng'&& HOSPITAL_ID != 'lyyz'&& HOSPITAL_ID != 'whsl' && HOSPITAL_ID != 'ytll'"
          style="width: 22%; min-width: 75px"
        >
          时间
        </th>
        <th v-else style="width: 27%; min-width: 75px">日期</th>
        <th v-if="HOSPITAL_ID != 'lingcheng' && HOSPITAL_ID != 'liaocheng' && HOSPITAL_ID != 'lyyz'&& HOSPITAL_ID != 'whsl'" style="width: 20%">项目</th>
        <th v-else-if="HOSPITAL_ID != 'lingcheng' && HOSPITAL_ID == 'liaocheng'" style="width: 20%">类型</th>
        <th v-else style="width: 24%">测量时间</th>
        <th :style="HOSPITAL_ID == 'sdlj' ? {width: '20%'} : {width: '23%'}">
          血糖值
          <br />(mmol/L)
        </th>
        <th
          style="width: 10%"
          v-if="
            HOSPITAL_ID != 'gy' &&
            HOSPITAL_ID != 'lingcheng' &&
            HOSPITAL_ID != 'huadu' &&
            HOSPITAL_ID != 'liaocheng'&&
            HOSPITAL_ID != 'hengli'&&
            HOSPITAL_ID != 'fuyou'&&
            HOSPITAL_ID != 'sdlj'&&
            HOSPITAL_ID != 'guizhou'&&
            HOSPITAL_ID != 'whfk' &&
            HOSPITAL_ID != 'lyyz' &&
            HOSPITAL_ID != 'ytll' &&
            HOSPITAL_ID != 'whsl'
          "
        >
          {{HOSPITAL_ID=="quzhou"?'胰岛素剂量':'RI剂量'}}
        </th>
        <th
          style="width: 23%"
          v-if="
            HOSPITAL_ID == 'liaocheng'
          "
        >
          血酮值
        <br />(mmol/L)
        </th>
        <th :style="HOSPITAL_ID == 'sdlj' ? {width: '17%'} : {width: '14%'}">{{HOSPITAL_ID == 'liaocheng' ? '签名' : '执行人'}}</th>
      </tr>
      <tr
        v-for="(item,index) in renderData"
        :class="{ selected: selected === item }"
        :key="item.recordDate"
        @click="onSelect(item)"
        @dblclick="onDblClick(item)"
      >
        <td v-if="HOSPITAL_ID != 'guizhou' && HOSPITAL_ID != 'whfk'&& HOSPITAL_ID != 'lyyz'&& HOSPITAL_ID != 'whsl' && HOSPITAL_ID != 'ytll'">
          {{index + baseIndex + 1}}
        </td>
        <td v-if="HOSPITAL_ID != 'lingcheng'&& HOSPITAL_ID != 'lyyz'&& HOSPITAL_ID != 'whsl'" style="padding: 0 4px">
          <div flex="main:justify" style="white-space: nowrap">
            <span>
              <span>{{ item.date }}</span>
            </span>
            <span>
               <span>{{ item.time }}</span>
            </span>
          </div>
        </td>
        <td v-else>
          <div class="cell">{{ item.date }}</div>
        </td>
        <td v-if="HOSPITAL_ID != 'lingcheng' && HOSPITAL_ID != 'lyyz'&& HOSPITAL_ID != 'whsl'">
          <div class="cell" :title="item.sugarItem">{{ item.sugarItem }}</div>
        </td>
        <td v-else>
          <div class="cell" :title="item.sugarItem">{{ item.time }}</div>
        </td>
        <td>
          <div class="cell">
            {{
              item.sugarValue && item.sugarValue !== "0" ? item.sugarValue : ""
            }}
          </div>
        </td>
        <td
          v-if="
            HOSPITAL_ID != 'gy' &&
            HOSPITAL_ID != 'lingcheng' &&
            HOSPITAL_ID != 'huadu' &&
            HOSPITAL_ID != 'liaocheng'&&
            HOSPITAL_ID != 'hengli'&&
            HOSPITAL_ID != 'fuyou'&&
            HOSPITAL_ID != 'sdlj'&&
            HOSPITAL_ID != 'guizhou'&&
            HOSPITAL_ID != 'whfk' &&
            HOSPITAL_ID != 'lyyz' &&
            HOSPITAL_ID != 'ytll' &&
            HOSPITAL_ID != 'whsl'
          "
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
          <div class="cell">
            {{
              item.riValue && item.riValue !== "0" ? item.riValue  : ""
            }}
          </div>
        </td>
        <td v-if="HOSPITAL_ID == 'liaocheng'">
          <div class="cell liaocheng-img">
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
          <div class="cell noPrint" v-else-if="HOSPITAL_ID == 'whfk'">
            <img
              :src="`/crNursing/api/file/signImage/${item.nurseEmpNo}?${token}`"
              :alt="item.nurse"
              v-if="item.nurseEmpNo"
              style="width:70%;height: 90%;"
            />
          </div>
          <div class="cell noPrint" v-else-if="HOSPITAL_ID == 'foshanrenyi'">
            <img
              :src="`/crNursing/api/file/signImage/${item.nurseEmpNo}?${token}`"
              :alt="item.nurse"
              v-if="item.nurseEmpNo"
            />
          </div>
          <div class="cell noPrint" v-else>{{ item.nurse }}</div>
          <div class="cell inPrint lc" v-if="HOSPITAL_ID == 'lingcheng'">
            <!-- {{item.nurseEmpNo}} -->
            <img
              :src="`/crNursing/api/file/signImage/${item.expand1}?${token}`"
              :alt="item.nurse"
              v-if="item.expand1"
            />
          </div>
          <div :class="['cell','inPrint',HOSPITAL_ID=='guizhou'?'guizhou-img':'',HOSPITAL_ID=='whfk'?'whfk-img':'']" v-else>
            <!-- {{item.nurseEmpNo}} -->
            <img
              :src="`/crNursing/api/file/signImage/${item.nurseEmpNo}?${token}`"
              :alt="item.nurse"
              v-if="item.nurseEmpNo"
              :class="HOSPITAL_ID=='sdlj'? 'imgsdlj' : ''"
            />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
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
        //object-fit: cover;
        object-fit: contain !important;
        -webkit-object-fit: contain!important;
      }
      .imgsdlj {
        width: 40px;
        height: 100%;
        object-fit: contain !important;
        -webkit-object-fit: contain!important;
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
  .whfk-img img{
    width: 45px !important;
    height: 25px !important;
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
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
    };
  },
  computed: {
    renderData() {
      if (!this.data) return;
      let renderData = [];
      let firstDate = "";
      for (let i = 0; i < this.data.length; i++) {
        if(this.HOSPITAL_ID == 'lingcheng' || this.HOSPITAL_ID == 'whfk' || this.HOSPITAL_ID == 'lyyz'|| this.HOSPITAL_ID == 'whsl' || this.HOSPITAL_ID == 'ytll'){
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
      console.log(renderData);
      return renderData;
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
    onSelect(item) {
      this.$emit("update:selected", item);
    },
    onDblClick(item) {
      this.$emit("dblclick", item);
    },
  },
  components: {},
};
</script>
