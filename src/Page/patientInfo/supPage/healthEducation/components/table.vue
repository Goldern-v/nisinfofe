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
          class="point"
          :class="{selected: selected === data}"
          @click="onSelect(data)"
          @dblclick="onDblClick(data)"
        >
          <!-- 教育时间 -->
          <td>
            <span>{{data['教育时间']}}</span>
          </td>
          <!-- 宣教内容 -->
          <td>
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
          <td class="remark">
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
    <el-pagination
      v-if="total > 30 && isprint === 2"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getAllByPatientInfo } from '../api/healthApi'

export default {
  props: {
    selected: Object
  },
  components: {
  },
  data () {
    return {
      theadData: [
        [
          { rowspan: 2, text: '教育时间', width: 80 },
          { rowspan: 2, text: '宣教内容', width: 160 },
          { colspan: 2, text: '教育对象'},
          { colspan: 4, text: '教育方法'},
          { colspan: 3, text: '教育评估'},
          { rowspan: 2, text: '备注', width: 120 },
          { rowspan: 2, text: '签名', width: 70 }
        ],
        [
          { text: '患者', width: 35 },
          { text: '家属', width: 35 },
          { text: '口述', width: 30 },
          { text: '书面', width: 30 },
          { text: '在线', width: 30 },
          { text: '示范', width: 30 },
          { text: '能理解', width: 30 },
          { text: '会演示', width: 30 },
          { text: '需强化', width: 30 }
        ]
      ],
      pageSize: 30, // 页码大小
      page: 1, // 第几页
      total: 1, // 总条数
      object: ["患者", "家属"],
      method: ["口述", "书面", "在线", "示范"],
      assessment: ["能理解", "会演示", "需强化"],
      tableData: [],
      resData: [],
      pageParam: [], // 未处理的表格数据
      isSetParam: [], // 已处理的表格数据
      patientId: '',
      isprint: 2 // 是否是打印 打印分页隐藏 1-打印 2-非打印
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.patientId = this.$route.query.patientId
      this.setData()
      this.getTableData()
    },
    // 初始化默认值
    setData () {
      let array = []
      for (let i = 0; i < 30; i++) {
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
    // 获取表格数据
    getTableData () {
      let { visitId, patientId } = this.$route.query
      getAllByPatientInfo(patientId, visitId).then(res => {
        let value = res.data.data && res.data.data.length > 0 ? 1 : 2
        this.$emit('isShowTable', value)
        let array = []
        res.data.data.map(item => {
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
          array.push(item)
        })
        let data = array
        // let data = res.data.data
        this.pageParam = data.slice()
        this.total = data.length
        this.isSetParam = data.length > 30 ? data.slice(0, 30) : data.slice()
        this.setTableData()
      }).catch(() => {
        this.$emit('isShowTable', 1)
      })
    },
    // 处理表格数据
    setTableData () {
      this.setData() // 重置表格
      this.isSetParam.map((item, index)=> {
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
    },
    // 页数变化
    handleCurrentChange (page) {
      this.page = page;
      let number = (page - 1) * this.pageSize
      this.isSetParam = this.pageParam.slice(number, this.pageSize + number)
      this.setTableData()
    },
    // 打印隐藏分页
    concealpagination () {
      this.isprint = 1
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

  .education-table {
    width: 706px;
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
  /deep/ .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
