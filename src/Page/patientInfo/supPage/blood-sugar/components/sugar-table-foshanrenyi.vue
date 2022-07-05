<template>
  <div flex-box="1" class="table-box blood-sugar-table">
    <table>
      <tr>
        <th style="width: 2%; min-width: 20px">序号</th>
        <th style="width: 23%; min-width: 75px">时间</th>
        <th style="width: 20%">项目</th>
        <th style="width: 23%">血糖值<br />(mmol/L)</th>
        <th style="width: 18%">尿酮值<br/>(mmol/L)</th>
        <th style="width: 14%">执行人</th>
      </tr>
      <tr
        v-for="(item,index) in renderData"
        :class="{ selected: selected === item }"
        :key="item.recordDate"
        @click="onSelect(item)"
        @dblclick="onDblClick(item)"
      >
        <td>
          {{index + baseIndex + 1}}
        </td>
        <td style="padding: 0 4px">
          <div flex="main:justify" style="white-space: nowrap;justify-content: center">
            <span>
              <span>{{ item.date }}</span>
            </span>
            <!-- <span>
              <span>{{ item.time }}</span>
            </span> -->
          </div>
        </td>
        <td>
          <div class="cell noPrint" :title="item.sugarItem">
            <!-- {{ item.sugarItem }} -->
            <ElSelect
              v-model="item.sugarItem"
              placeholder=""
              size="mini"
              :popperClass="selected === item ? 'selected' : ''"
            >
              <ElOption
                v-for="item in sugarItem"
                :key="item.vitalSign"
                :label="item.vitalSign"
                :value="item.vitalSign"
              />
            </ElSelect>
          </div>
          <div class="cell inPrint" :title="item.sugarItem">
            {{ item.sugarItem }}
          </div>
        </td>
        <td>
          <div class="cell noPrint">
            <input :class="{ selected: selected === item }" v-model="item.sugarValue"/>
          </div>
          <div class="cell inPrint">
            {{ item.sugarValue && item.sugarValue !== "0" ? item.sugarValue : "" }}
          </div>
        </td>
        <td>
          <div class="cell noPrint">
            <!-- {{ item.riValue && item.riValue !== "0" ? item.riValue + " ü" : "" }} -->
            <input :class="{ selected: selected === item }" v-model="item.riValue"/>
          </div>
          <div class="cell inPrint">
            {{ item.riValue && item.riValue !== "0" ? item.riValue + " ü" : "" }}
          </div>
        </td>
        <td>
          <div class="cell noPrint">{{ item.nurse }}</div>
          <div :class="['cell','inPrint']">
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

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
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
      &:hover .cell input {
        background: #e6e6e6;
      }
      &:hover .cell >>> .el-input__inner {
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
        input {
          width: 100%;
          padding: 2px 0px;
          border: none;
          outline: none;
          font-size: inherit;
          text-align: center;
          &.selected {
            background: #FFF8B1;
          }
        }
      }

      img {
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
  .selected >>> .el-input__inner {
    background: #FFF8B1!important;
  }
  .el-select {
    >>>.el-input__icon {
      display: none;
    }
    >>>.el-input__icon + .el-input__inner {
      padding-right: 0px;
    }
    >>>.el-input__inner {
      padding: 0px;
      padding-right: 0px;
      border: none;
      text-align: center;
      color: #000;
    }
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
    sugarItem: Array
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
        this.data[i].md = new Date(this.data[i].recordDate).Format("yyyy-MM-dd hh:mm");
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
      // console.log(renderData);
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
    openSignModal() {

    }
  },
  components: {},
};
</script>
