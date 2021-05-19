<template>
  <div class="paper" paperData-print-class="printing">
    <div class="head">
      <!-- <img class="logo" :src="hospitalLogo" alt="logo"> -->
      <h1 class="title">{{ HOSPITAL_NAME_SPACE }}</h1>
      <h2 class="sub-title">护 理 等 级 统 计 查 询</h2>
      <div class="details">
        <!-- <div @click="qqqq">fdfdfd</div> -->
        <div class="left">病房：{{ name }}</div>
      </div>
    </div>
    <table class="table-wrapper">
      <colgroup>
        <!-- 类型 -->
        <col width="100px" />
        <!-- 数量 -->
        <col width="100px" />
        <!-- 类型 -->
        <col width="100px" />
        <!-- 数量 -->
        <col width="100px" />
      </colgroup>
      <tbody>
        <tr class="thead">
          <td rowspan="1">类型</td>
          <td rowspan="1">数量</td>
          <td rowspan="1">类型</td>
          <td colspan="1">数量</td>
        </tr>
        <tr>
          <td rowspan="1">特级护理</td>
          <td rowspan="1">{{ paperData.特级护理 }}</td>
          <td rowspan="1">跌倒高风险</td>
          <td colspan="1">{{ paperData.跌倒高风险 }}</td>
        </tr>
        <tr>
          <td rowspan="1">一级护理</td>
          <td colspan="1">{{ paperData.一级护理 }}</td>
          <td rowspan="1">压疮高风险</td>
          <td colspan="1">{{ paperData.压疮高风险 }}</td>
        </tr>
        <tr>
          <td rowspan="1">二级护理</td>
          <td colspan="1">{{ paperData.二级护理 }}</td>
          <td rowspan="1">已有压疮</td>
          <td colspan="1">{{ paperData.已有压疮 }}</td>
        </tr>
        <tr>
          <td rowspan="1">三级护理</td>
          <td colspan="1">{{ paperData.三级护理 }}</td>
          <td rowspan="1">新入</td>
          <td colspan="1">{{ paperData.新入 }}</td>
        </tr>
        <tr>
          <td rowspan="1">病危</td>
          <td colspan="1">{{ paperData.病危 }}</td>
          <td rowspan="1">预出院</td>
          <td colspan="1">{{ paperData.预出院 }}</td>
        </tr>
        <tr>
          <td rowspan="1">病重</td>
          <td colspan="1">{{ paperData.病重 }}</td>
          <td rowspan="1">明日出院</td>
          <td colspan="1">{{ paperData.明日出院 }}</td>
        </tr>
        <tr>
          <td rowspan="1">过敏</td>
          <td colspan="1">{{ paperData.过敏 }}</td>
          <td rowspan="1">今日手术</td>
          <td colspan="1">{{ paperData.今日手术 }}</td>
        </tr>
        <tr>
          <td rowspan="1">MEWS预警</td>
          <td colspan="1">{{ paperData.MEWS预警 }}</td>
          <td rowspan="1">明日手术</td>
          <td colspan="1">{{ paperData.明日手术 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";

export default {
  mixins: [common],
  props: {
    name: String,

    paperData: Object,
    twoDayPaper: String
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="stylus" scoped>
.paper {
  >>>table {
    width: 100%;

    td {
      border: 1px solid black;
      text-align: center;
      vertical-align: middle;
      height: 55px;
      font-size: 13px;
      line-height: 55px;
    }

    .thead td {
      height: 35px;
    }

    .thead {
      background: #f4f2f5;
    }
  }

  >>>.table-top, >>>.table-bottom {
    td:first-child, th:first-child {
      border-left: none;
    }

    td:last-child, th:last-child {
      border-right: none;
    }

    tr:first-child > td, tr:first-child > th {
      border-top: none;
    }

    tr:last-child > td {
      border-bottom: none;
    }
  }
}

.paper {
  position: relative;
  margin: 0 auto 20px;
  padding: 12px 20px;
  width: 1080px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  box-sizing: border-box;

  &.printing {
    margin: 0;
    padding: 0;
    box-shadow: none;
  }
}

.head {
  position: relative;

  .logo {
    position: absolute;
    left: 0;
    top: 0;
    height: 44px;
  }

  .title {
    padding-top: 15px;
    font-size: 22px;
    text-align: center;
  }

  .sub-title {
    margin-top: 10px;
    text-align: center;
  }

  .details {
    margin-top: 10px;
    font-size: 13px;
    overflow: hidden;

    .left {
      float: left;
    }

    .right {
      float: right;
    }
  }
}

.table-wrapper {
  margin-top: 8px;
}

.foot {
  position: relative;
  margin-top: 15px;

  .sign {
    float: right;
    font-size: 13px;

    span {
      display: inline-block;
    }

    .title {
      vertical-align: middle;
    }

    .content {
      min-width: 60px;
      vertical-align: middle;
    }

    .sign-img {
      display: none;
      width: 52px;
      vertical-align: middle;
      max-height: 25px;
    }
  }

  .page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    font-family: SimSun;
  }
}
</style>
