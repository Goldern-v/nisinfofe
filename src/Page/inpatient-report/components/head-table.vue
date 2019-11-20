<template>
  <table class="head-table">
    <colgroup>
      <!-- 科 别 -->
      <col width="100px" />
      <!-- 住院号 -->
      <col width="70px" />
      <!-- 姓名 -->
      <col width="70px" />
      <!-- 性别 -->
      <col width="60px" />
      <!-- 年龄 -->
      <col width="60px" />
      <!-- 入院日期 -->
      <col width="80px" />
      <!-- 时间 -->
      <col width="60px" />
      <!-- 交押金情况	 -->
      <col width="70px" />
      <!-- 入院诊断 -->
      <col width="140px" />
      <!-- 详细地址（联系人和电话） -->
      <col width="140px" />
    </colgroup>
    <tbody>
      <tr class="thead">
        <td rowspan="1">科 别</td>
        <td rowspan="1">住院号</td>
        <td rowspan="1">姓名</td>
        <td colspan="1">性别</td>
        <td rowspan="1">年龄</td>
        <td rowspan="1">入院日期</td>
        <td rowspan="1">时间</td>
        <td rowspan="1">收治医生</td>
        <td rowspan="1">入院诊断</td>
        <td rowspan="1">详细地址（联系人和电话）</td>
      </tr>
      <!-- <tr>
        <th rowspan="2">计</th>
        <th colspan="2">死亡</th>
      </tr>
      <tr>
        <th>计</th>
        <th>24小时</th>
      </tr>-->
      <!-- </tbody>
      <tbody>-->
      <tr v-for="(headItem,index) in paperHeaderData" :key="index">
        <td>{{headItem.deptName}}</td>
        <td>{{headItem.inpNo}}</td>
        <td
          @click="toPatientHome(headItem.patientId, headItem.visitId)"
          style="cursor: pointer"
        >{{headItem.name}}</td>
        <td>{{headItem.sex}}</td>
        <td>{{headItem.age}}</td>
        <td>{{headItem.firstDate}}</td>
        <td>{{headItem.secondDate}}</td>
        <td>
          {{
          headItem.outpDoctor
          }}
          <!-- <input type="text" value="√" class="chooseClass" v-if="headItem.paySituation" />
          <input
            type="text"
            value="X"
            class="chooseClass"
            v-else-if="headItem.paySituation == false"
          />
          <input type="text" value class="chooseClass" v-else />-->
          <!-- 887 -->
        </td>
        <td>{{headItem.diagnosis}}</td>
        <td>
          <table class="childTable">
            <tr>
              <td>{{headItem.contactName}}</td>
            </tr>
            <tr>
              <td>{{headItem.contactPhone}}</td>
            </tr>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: Object,
    paperHeaderData: Array
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="stylus">
.chooseClass {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  text-align: center;
  font-size: 16px;
}

.childTable {
  border-collapse: collapse;

  td {
    // height 10px !important
  }
}
</style>
