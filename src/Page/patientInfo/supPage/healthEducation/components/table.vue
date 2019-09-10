<template>
  <div class="health-education">
    <table class="education-table" border="1px solid #000"  border-collapse="collapse">
      <thead>
        <tr
          v-for="(item, i) in theadData"
          :key="i">
          <th
            v-for="(v, j) in item"
            :key="j" :rowspan="v.rowspan || 1"
            :style="v.width ? `width:${v.width}px;` : ''"
            :colspan="v.colspan || 1"
          >
            {{v.text}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, k) in tableData"
          :key="k+'ab'"
          class="health-tr point"
          :class="{selected: selected === data}"
          @click="onSelect(data)"
          @dblclick="onDblClick(data)"
        >
          <!-- 教育时间 -->
          <td>
            <span>{{data['教育时间']}}</span>
          </td>
          <!-- 宣教内容 -->
          <td class="contentLeft">
            <span>{{data['宣教内容']}}</span>
          </td>
          <!-- 教育对象 -->
          <td v-for="o in object" :key="o + 'a'">
            <span class="is-radio" v-if="data['教育对象'] === o">√</span>
          </td>
          <!-- 教育方法 -->
          <td v-for="p in method" :key="p + 'b'">
            <span class="is-radio" v-if="data['教育方法'] === p">√</span>
          </td>
          <!-- 教育评估 -->
          <td v-for="q in assessment" :key="q + 'c'">
            <span class="is-radio" v-if="data['教育评估'] === q">√</span>
          </td>
          <!-- 备注 -->
          <td class="remark contentLeft">
            <span
              class="remark-span"
            >
              {{data['备注']}}
            </span>
          </td>
          <!-- 签名 -->
          <td>
            <span>{{data['签名']}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 页码 -->
    <div class="health-table-page">{{`第${index + 1}/${page}页`}}</div>
  </div>
</template>

<script>

export default {
  props: {
    selected: Object,
    pageParam: { // 未处理的表格数据
      type: Array,
      default: () => []
    },
    index: { // 未处理的表格数据
      type: Number,
      default: 1
    },
    page: { // 未处理的表格数据
      type: Number,
      default: 1
    }
  },
  components: {
  },
  data () {
    return {
      theadData: [
        [
          { rowspan: 2, text: '教育时间', width: 80 },
          { rowspan: 2, text: '宣教内容', width: 140 },
          { colspan: 2, text: '教育对象'},
          { colspan: 4, text: '教育方法'},
          { colspan: 3, text: '教育评估'},
          { rowspan: 2, text: '备注', width: 100 },
          { rowspan: 2, text: '签名', width: 70 }
        ],
        [
          { text: '患者', width: 30 },
          { text: '家属', width: 30 },
          { text: '口述', width: 30 },
          { text: '书面', width: 30 },
          { text: '在线', width: 30 },
          { text: '示范', width: 30 },
          { text: '能理解', width: 30 },
          { text: '会演示', width: 30 },
          { text: '需强化', width: 30 }
        ]
      ],
      object: ["患者", "家属"],
      method: ["口述", "书面", "在线", "示范"],
      assessment: ["能理解", "会演示", "需强化"],
      tableData: [],
      resData: [],
      patientId: ''
    }
  },
  watch: {
    pageParam: {
      handler (val) {
        this.setTableData(val)
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.patientId = this.$route.query.patientId
    },
    // 初始化默认值
    setData (total) {
      let array = []
      for (let i = 0; i < total; i++) {
        array.push(
          {
            '教育时间': '',
            '宣教内容': '',
            '教育对象': '',
            '教育方法': '',
            '教育评估': '',
            '备注': '',
            '签名': ''
          }
        )
      }
      this.tableData = array
    },
    // 处理表格数据
    setTableData (val) {
      this.setData(val.length > 30 ? val.length : 30) // 重置表格
      val.map((item, index)=> {
        this.$set(this.tableData, index, JSON.parse(item.pageParam.pageParam))
        this.$set(this.tableData[index], "宣教内容", item.instance.title)
        this.$set(this.tableData[index], "item", item.instance)
      })
    },
    // 点击行
    onSelect(data) {
      if (!data['宣教内容']) return
      if (data === this.selected) {
        this.$emit("update:selected", null);
        return
      }
      this.$emit("update:selected", data);
    },
    // 双击行修改
    onDblClick(data) {
      if (!data['宣教内容']) return
      this.$emit("dblclick", data);
    }
  }
}
</script>

<style scoped lang='scss'>
.health-education {
  font-size: 12px;
  * {
    box-sizing: border-box;
  };

  .health-table-page {
    font-size: 13px;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .education-table {
    width: 660px;
    color: #000;
    border-collapse: collapse;

    thead{
      background: #f4f2f5
    }

    th, td {
      position: relative;
      padding: 5px;
      text-align: center;
      border: 1px solid #222;
      height: 25px;
      vertical-align: middle !important;
      box-sizing: border-box;
    }

    .is-radio {
      position: absolute;
      width: 20px;
      height: 20px;
      font-size: 14px;
      top: 50%;
      left: 50%;
      margin-left: -10px;
      margin-top: -7px;
      color: #000;
      line-height: 20px;
    }

    .radio {
      width: 20px;
      height: 20px;
      opacity: 0;
    }

    .point{
      &:hover {
        cursor: pointer;
        background: #e6e6e6;
       }
      &.selected {
        background: #FFF8B1;
      }
    }
    .contentLeft{
      text-align: left;
      padding-left: 10px;
    }
  }

  .remark {
    min-width: 100px;

    .remark-input {
      width: 96px;
      border: none;
      border-bottom: 1px solid #000;
      outline: none;
    }
  }
}
</style>
