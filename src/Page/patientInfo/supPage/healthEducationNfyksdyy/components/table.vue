<template>
  <div class="health-education">
    <table class="education-table" border="1px solid #000" border-collapse="collapse">
      <thead>
        <tr v-for="(item, i) in theadData" :key="i">
          <th
            v-for="(v, j) in item"
            :key="j"
            :rowspan="v.rowspan || 1"
            :style="v.width ? `width:${v.width}px;` : ''"
            :colspan="v.colspan || 1"
          >{{v.text}}</th>
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
            <!-- <input class="date" type="text" name="" id="" :value="data['教育时间']"> -->
          </td>
          <!-- 宣教内容 -->
          <td v-if="HOSPITAL_ID !== 'qhwy'" :class="['contentLeft', {'isPrint': !isPrints}]" @click="healthContent($event, data)">
            <span>{{data['宣教内容']}}</span>
          </td>
          <td class="remark" v-if="HOSPITAL_ID === 'qhwy'">
            <span class="remark-span">{{data['宣教类型']}}</span>
          </td>
          <!-- 宣教内容 -->
          <td :class="['contentLeft', {'isPrint': !isPrints}]" @click="healthContent($event, data)" v-if="HOSPITAL_ID === 'qhwy'">
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
          <td class="remark contentLeft" v-if="HOSPITAL_ID !== 'qhwy'">
            <span class="remark-span">{{data[`${HOSPITAL_ID === 'whhk' ? '宣教情况' : '备注'}`]}}</span>
          </td>
          <!-- 签名 -->
          <td v-if="['lingcheng','guizhou','foshanrenyi','qhwy'].includes(HOSPITAL_ID)" class="specialTd">
            <img
              v-if="['lingcheng','foshanrenyi','qhwy'].includes(HOSPITAL_ID)"
              v-show="data['lc签名']"
              class="img"
              :src="`/crNursing/api/file/signImage/${data['lc签名']}?${token}`"
              alt
            />
            <span class="noPrint" v-else>{{data['签名']}}</span>
            <img
              v-if="HOSPITAL_ID=='guizhou'"
              v-show="data['lc签名']"
              :class="['img',['guizhou'].includes(HOSPITAL_ID) && 'inPrint']"
              :src="`/crNursing/api/file/signImage/${data['lc签名']}?${token}`"
              alt
            />
          </td>
          <!-- <td v-else-if="['guizhou'].includes(HOSPITAL_ID)" class="noPrint">
            <span>{{data['签名']}}</span>
          </td> -->
          <td v-else>
            <span>{{data['签名']}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 页码 -->
    <div class="health-table-page">{{`第${index + 1}/${page}页`}}</div>
    <!-- 宣教内容弹窗 -->
    <healthContentModal ref="healthContentModal" :content="content" :name="name" />
  </div>
</template>

<script>
import { getContentByMissionId } from "../api/healthApi";
import healthContentModal from "./healthContentModal"; // 添加修改弹窗
import common from "@/common/mixin/common.mixin.js";

export default {
  mixins: [common],
  props: {
    selected: Object,
    pageParam: {
      // 未处理的表格数据
      type: Array,
      default: () => []
    },
    index: {
      // 未处理的表格数据
      type: Number,
      default: 1
    },
    page: {
      // 未处理的表格数据
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      content: "",
      name: "",
      contentData: "",
      isContent: false,
      isPrints: false,
      theadData: [
        [
          { rowspan: 2, text: "教育时间", width: 80 },
          this.HOSPITAL_ID === 'qhwy' ?{ rowspan: 2, text: "宣教类型", width: 90 }:{ rowspan: 2, text: "宣教内容", width: 160 },
          ...this.HOSPITAL_ID === 'qhwy' ? [
            { rowspan: 2, text: "宣教内容", width: 160 },
            { colspan: 2, text: "教育对象" },
            { colspan: 4, text: "教育方法" },
            { colspan: 3, text: "教育评估" },
          ] : [
            { colspan: 2, text: "教育对象" },
            { colspan: 4, text: "教育方法" },
            { colspan: 3, text: "教育评估" },
            { rowspan: 2, text: `${this.HOSPITAL_ID === 'whhk' ? '宣教情况' : '备注'}`, width: 90 },
          ],
          { rowspan: 2, text: "签名", width: 60 }
        ],
        [
          { text: "患者", width: 30 },
          { text: "家属", width: 30 },
          { text: "口述", width: 30 },
          { text: "书面", width: 30 },
          { text: "在线", width: 30 },
          { text: "示范", width: 30 },
          { text: "能理解", width: 30 },
          { text: "会演示", width: 30 },
          { text: "需强化", width: 30 }
        ]
      ],
      object: ["患者", "家属"],
      method: ["口述", "书面", "在线", "示范"],
      assessment: ["能理解", "会演示", "需强化"],
      tableData: [],
      resData: [],
      patientId: ""
    };
  },
  watch: {
    pageParam: {
      handler(val) {
        this.setTableData(val);
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.patientId = this.$route.query.patientId;
    },
    // 打印
    print() {
      this.isPrints = true;
    },
    // 初始化默认值
    setData(total) {
      let array = [];
      for (let i = 0; i < total; i++) {
        array.push({
          教育时间: "",
          宣教内容: "",
          宣教类型: "",
          教育对象: "",
          教育方法: "",
          教育评估: "",
          备注: "",
          宣教情况: "",
          签名: ""
        });
      }
      this.tableData = array;
    },
    // 处理表格数据
    setTableData(val) {
      this.setData(val.length > 30 ? val.length : 30); // 重置表格
      val.map((item, index) => {
        let creatDateStr = item.instance.creatDateStr.substring(5);
        let pageParam =
          item.pageParam == null
            ? {}
            : item.pageParam.pageParam
            ? JSON.parse(item.pageParam.pageParam)
            : {};
        let studyTime = pageParam.教育时间 ? pageParam.教育时间 : creatDateStr;
        this.$set(this.tableData, index, pageParam);
        this.$set(this.tableData[index], "宣教内容", item.instance.title);
        this.$set(this.tableData[index], "宣教类型", item.instance.type);
        this.$set(this.tableData[index], "教育时间", studyTime);
        this.$set(this.tableData[index], "item", item.instance);
      });
    },
    //点击宣教内容
    healthContent(e, data) {
      if (!data["宣教内容"]) return;
      e.stopPropagation();
      let ids = data.item ? data.item.missionId : "";
      this.data = data;
      getContentByMissionId(ids)
        .then(res => {
          this.content = res.data.data[0].content;
          this.name = res.data.data[0].name;
          this.isContent = true;
          this.HOSPITAL_ID == "lingcheng"
            ? this.$refs.lcHealthContentModal.open("打开陵城健康宣教")
            : this.$refs.healthContentModal.open("打开健康宣教内容");
        })
        .catch(e => {});
    },
    // 点击行
    onSelect(data) {
      if (!data["宣教内容"]) return;
      if (data === this.selected) {
        this.$emit("update:selected", null);
        return;
      }
      this.$emit("update:selected", data);
    },
    // 双击行修改
    onDblClick(data) {
      if (!data["教育时间"]) return;
      this.$emit("dblclick", data);
    }
  },
  components: {
    healthContentModal,
  }
};
</script>

<style scoped lang='scss'>
.health-education {
  font-size: 12px;
  display: block;
  position: relative;
  * {
    box-sizing: border-box;
  }

  .health-table-page {
    font-size: 13px;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .education-table {
    width: 100%;
    color: #000;
    border-collapse: collapse;
    thead {
      background: #f4f2f5;
    }
    .isPrint {
      color: blue;
    }
    .isPrint:hover {
      text-decoration: underline;
    }
    th,
    td {
      position: relative;
      padding: 1px;
      text-align: center;
      border: 1px solid #222;
      height: 25px;
      vertical-align: middle !important;
      box-sizing: border-box;
    }
    .inPrint{
      display: none;
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
    .point {
      &:hover {
        cursor: pointer;
        background: #e6e6e6;
      }
      &.selected {
        background: #fff8b1;
      }
    }
    .contentLeft {
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

  .health-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 500px;
    height: 600px;
    overflow: auto;
    background: #ccc;
  }
  .img {
    height: 25px;
    width: 100%;
  }
  .specialTd {
    padding: 0 !important;
  }
  /* .date{
    width: calc(100% - 2px);
    border: 0!important;
    padding: 0;
    height: calc(100% - 2px);
    box-sizing: border-box!important;
    outline: none!important;
    text-align: center;
    background: transparent;
    color: #000;
    font-size: 12px;
  } */
}
</style>
