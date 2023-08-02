<template>
  <div class="cathePrintTable">
    <div
      class="cathe-table"
      v-for="(tabelData, tabIn) in filterTable"
      :key="tabIn + 'tab'"
    >
      <div class="hosipatal">青海省第五人民医院（青海省肿瘤医院）</div>
      <div class="formName">管道评估护理记录单</div>
      <div class="info">
        <div v-for="(con, conIn) in info" :key="conIn + 'info'">
          {{ con.label + "：" + tableInfo[con.code] }}
        </div>
      </div>
      <div class="info">
        <div v-for="(con, conIn) in info2" :key="conIn + 'info2'">
          {{ con.label + "：" + (tableInfo[con.code] || '') }}
        </div>
      </div>
      <table>
        <tr>
          <th>日期</th>
          <th>时间</th>
          <th v-for="(th, thIn) in config" :key="thIn + 'th'">
            {{ th.title }}
          </th>
          <th>评估人</th>
        </tr>
        <tr v-for="(tr, trIN) in tabelData" :key="trIN + 'tr'">
          <td>
            <div>{{ tr.recordMonth }}</div>
          </td>
          <td>
            <div>{{ tr.recordHour }}</div>
          </td>
          <td v-for="(td, tdIn) in config" :key="tdIn + 'tdIn'">
            <div>
              {{ tr[td.name] }}
            </div>
          </td>
          <td>
            <!-- <div>{{ tr.signerName }}</div> -->
            <img class='img' v-if="tr.signerNo" :src="`/crNursing/api/file/signImage/${tr.signerNo}?${token}`" alt="">
            <span v-else>{{tr.signerName}}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@media print {
  /* @page {
    size: landscape;
  } */
  .cathe-table {
    margin: 1cm 0;
    page-break-after: always;
  }
}
.cathePrintTable {
  text-align: center;
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    .img{
      width: 65px;
      height: 30px;
      display: block;
      margin: auto;
    }
    tr {
      td,
      th {
        border: 1px solid #000;
        margin: 0;
        padding: 1px;
        line-height: 28px;
        text-align: center;
        vertical-align: top;
      }
      td > div {
        min-height: 29px;
        line-height: 28px;
      }
    }
  }
  .hosipatal {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .formName {
    font-size: 22px;
    margin-bottom: 20px;
    font-weight: 700;
  }
  .info {
    line-height: 22px;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    &:nth-of-type(2) {
      margin-bottom: 20px;
    }
    > div {
      margin-right: 20px;
      text-align: left;
    }
  }
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";

export default {
  props: {
    tableInfo: {
      type: Object,
      value: {},
    },
    tabelConfig: {
      type: Array,
      value: [],
    },
    config: {
      type: Array,
      value: [],
    },
  },
  mixins: [common],
  data() {
    return {
      info: [
        { label: "科室", code: "wardName" },
        { label: "床号", code: "bedLabel" },
        { label: "姓名", code: "name" },
        { label: "年龄", code: "age" },
        { label: "入院日期时间", code: "admissionDate" },
      ],
      info2: [
        { label: "导管名称", code: "formTitle" },
        { label: "置管时间", code: "intubationTime" },
        { label: "置管来源", code: "catheterSource" },
      ],
    };
  },
  methods: {},
  components: {},
  computed: {
    filterTable() {
      if (this.tabelConfig.length == 0) return;
      let arr = [];
      if (!Array.isArray(this.tabelConfig[0])) {
        arr[0] = []
        for (let i = 0; i < 17; i++) {
          if (this.tabelConfig[i]) arr[0].push(this.tabelConfig[i]);
          else arr[0].push({});
        }
      } else {
        this.tabelConfig.map((table, tabIn) => {
          for (let i = 0; i < 17; i++) {
            if (i == 0) {
              if (table[i]) arr.push([table[i]]);
              else break;
            } else if (table[i]) arr[tabIn].push(table[i]);
            else arr[tabIn].push({});
          }
        });
      }
      console.log(arr, "arr");
      return arr;
    },
  },
};
</script>
