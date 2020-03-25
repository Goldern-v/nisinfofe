<template>
  <sweet-modal
    ref="modalName"
    class="satisfy-modal-1577412732265"
    title="满意度调查表"
    @close="onClose"
    :modalWidth="900"
  >
    <iframe v-if="id" :src="url" frameborder="0"></iframe>
    <div class="content">
      <p class="title">
        患者问卷填写
        <span style="color: #999999; font-weight: normal">（最高分75分）</span>：
      </p>
      <p class="grade">
        得分：
        <span
          :class="{'noGrade': data.F001018 !== '1'}"
        >{{data.F001018 === '1' ? evalScore : "未填写"}}</span>
      </p>
      <ul v-if="data.F001018 === '1'">
        <li v-for="(o, h) in listData" :key="h" :class="{'special': o.block}">
          <el-tooltip :content="o.text" placement="top">
            <div>
              <span>{{`${h+1}.`}}</span>
              <span :style="color(o.value)">{{o.block ? o.value : `（${o.value}）`}}</span>
            </div>
          </el-tooltip>
        </li>
      </ul>
    </div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped>
iframe {
  background: #f0f0f0;
  padding: 12px 25px;
  box-sizing: border-box;
  width: 50%;
  height: calc(100vh - 260px);
  margin-bottom: -6px;
  float: left;
}
.content {
  float: right;
  width: 50%;
  height: calc(100vh - 260px);
  .title {
    color: #333333;
    font-size: 13px;
    font-weight: bold;
    border-left: 3px solid #54b393;
    padding-left: 10px;
    margin-left: 15px;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .grade {
    margin: 10px 0 10px 30px;
    color: #333333;
    font-size: 13px;
    .noGrade {
      color: #e73030;
    }
  }
}
ul {
  margin-left: 30px;
  li {
    display: inline-block;
    width: 100px;
    margin-bottom: 12px;
  }
  li:hover {
    cursor: pointer;
  }
  .special {
    display: block !important;
    width: 100% !important;
  }
}
</style>
<style lang='scss'>
.satisfy-modal-1577412732265 .sweet-content {
  padding: 0;
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import { blockList } from "@/Page/sheet-page/api/index.js";
import { getDataById } from "../../api/index";
export default {
  props: {},
  mixins: [common],
  data() {
    return {
      id: "",
      data: {},
      onOkCallBack: null,
      // 弹窗右边数据
      listData: [
        {
          text: "1 科室护士服务态度",
          name: "F001001",
          value: ""
        },
        {
          text: "2 科室护士专业知识、技术操作及解决问题的能力。",
          name: "F001002",
          value: ""
        },
        {
          text:
            "3 科室护士向您做健康宣教的全面性和及时性（用药及饮食指导、术前术后宣教、功能锻炼、预防跌倒等）。",
          name: "F001003",
          value: ""
        },
        {
          text: "4 科室医生服务态度。",
          name: "F001004",
          value: ""
        },
        {
          text: "5 主管医生的查房和问题处理的能力。",
          name: "F001005",
          value: ""
        },
        {
          text:
            "6 主管医生与您的沟通全面性和及时性（告知病情、预后、手术、检查治疗情况等）。",
          name: "F001006",
          value: ""
        },
        {
          text: "7 病房环境整洁度，卫生间的卫生，保洁员的服务态度。",
          name: "F001007",
          value: ""
        },
        {
          text: "8 病房设备、设施、灯光、照明、床、柜、扶手等性能。",
          name: "F001008",
          value: ""
        },
        {
          text: "9 食堂工作人员的服务态度，菜品的种类及卫生状况等。",
          name: "F001009",
          value: ""
        },
        {
          text: "10 出入院结账处的服务",
          name: "F001010",
          value: ""
        },
        {
          text: "11 医疗价格的公示、费用查询告知服务",
          name: "F001011",
          value: ""
        },
        {
          text: "12 入院登记处工作人员的服务",
          name: "F001012",
          value: ""
        },
        {
          text: "13 陪检人员服务",
          name: "F001013",
          value: ""
        },
        {
          text: "14 麻醉医生术前查看病情和麻醉告知服务",
          name: "F001014",
          value: ""
        },
        {
          text: "15 手术室医护人员的服务",
          name: "F001015",
          value: ""
        },
        {
          text: "16 您最满意的医生、护士和事",
          name: "F001016",
          value: "",
          block: true
        },
        {
          text:
            "17 如您有任何的意见或建议，恳请您提出，以便我们更好地改进工作。",
          name: "F001017",
          value: "",
          block: true
        }
      ],
      evalScore: "" // 总分
    };
  },
  computed: {
    url() {
      return `http://dghjns.cr-health.com:9091/crNursing/missionPublicAccount/#/healthQuestionnaire?id=${this.id}&readonly=true`;
    }
  },
  methods: {
    open(id, onOkCallBack) {
      // 获取右边问卷详情数据
      getDataById(id).then(res => {
        this.data = res.data.data.itemData;
        this.evalScore = res.data.data.master.evalScore;
        this.listData.map(item => {
          item.value = res.data.data.itemData[item.name];
        });
      });
      this.id = id;
      this.$refs.modalName.open();
    },
    post() {
      this.onOkCallBack();
      this.$refs.modalName.close();
    },
    onClose() {
      this.id = "";
    },
    // 12红色 34蓝色
    color(data) {
      switch (data) {
        case "1分" || "2分":
          return "color: #E84254";
          break;
        case "3分" || "4分":
          return "color: #284FC2";
          break;
      }
    }
  },
  components: {}
};
</script>
