<template>
  <el-dialog
    :visible.sync="signListShow"
    custom-class="vital-list-dialog"
    :close-on-click-modal="false"
    @close="close"
    :append-to-body="false"
  >
    <div class="modal-table" :style="{ height: `${height}px` }">
      <div class="table__header-wrapper" ref="headerRef">
        <table class="table__header">
          <colgroup>
            <col width="38px"/>
            <col width="38px"/>
            <col v-for="i in colLength" :key="'th' + i" width="37px"/>
            <col v-if="hasScroll" width="7px"/>
          </colgroup>
          <thead>
            <tr>
              <th rowspan="2">日期</th>
              <th rowspan="2">时间</th>
              <th :colspan="baseDictKey.length">生命体征</th>
              <th :colspan="otherDictKey.length">出入量</th>
              <th :colspan="customDictKey.length">自定义项目</th>
              <th v-if="hasScroll" rowspan="2"></th>
            </tr>
            <tr>
              <th v-for="(key, index) in baseDictKey" :key="key + index">
                {{ baseDictMap[key] }}
              </th>
              <th v-for="(key, index) in otherDictKey" :key="key + index">
                {{ otherDictMap[key] }}
              </th>
              <th v-for="(key, index) in customDictKey" :key="key + index" :ref="`th${index}`">
                <textarea
                  v-model="customDictMap[key].fieldCn"
                  style="color: blue"
                  :class="{
                    manyrows: isOverText(customDictMap[key].fieldCn, `th${index}`),
                  }"
                  @click="editCustomTitle(customDictMap[key].fieldCn, key)"
                ></textarea>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div ref="bodyRef" class="table__body-wrapper" :style="{ height: `${tableBodyHeight}px` }">
        <table v-if="tableData && tableData.length" class="table__body">
          <colgroup>
            <col width="38px"/>
            <col width="38px"/>
            <col v-for="i in colLength" :key="'td' + i" width="37px"/>
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="'tr' + index">
              <td>{{ item.recordMonth }}</td>
              <td>{{ item.recordHour }}</td>
              <td
                v-for="(key, tdIndex) in [...baseDictKey, ...otherDictKey, ...customDictKey]"
                :key="key + '-' + tdIndex"
                :ref="`td${index}-${tdIndex}`"
              >
                <textarea
                  v-model="item.vitals[key]"
                  :class="{
                    manyrows: isOverText(item.vitals[key], `td${index}-${tdIndex}`),
                  }"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <NullBg v-else></NullBg>
      </div>
    </div>
    <span class="footer-btn" slot="footer">
      <el-button @click="signListShow = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="onSave" v-if="tableData.length">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getTemperatureList, saveTemperatureList, savefieldTitleNew } from '../api/api.js';
import bus from "vue-happy-bus";
import moment from 'moment';
import NullBg from '@/components/null/null-bg.vue';
export default {
  components: { NullBg },
  props: {
    patientInfo: Object,
  },
  data() {
    return {
      height: 450,
      tableBodyHeight: 0,
      bus: bus(this),
      signListShow: false,
      baseDictMap: {},
      otherDictMap: {},
      customDictMap: {},
      tableData: [],
      patient: {
        patientId: '',
        visitId: '',
        wardCode: '',
      },
      query: {
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: moment().format("HH:mm"), //录入时间
      }
    }
  },
  mounted() {
    this.bus.$on('getMultiDict', (data) => {
      this.baseDictMap = data.baseDictMap;
      this.otherDictMap = data.otherDictMap;
      this.customDictMap = data.customDictMap;
    })
    this.bus.$on('watchQueryDate', (query) => {
      this.query.entryDate = query.entryDate;
      this.query.entryTime = query.entryTime;
    })
    this.calcTableBodyHeight();
  },
  computed: {
    baseDictKey() {
      return Object.keys(this.baseDictMap);
    },
    otherDictKey() {
      return Object.keys(this.otherDictMap);
    },
    customDictKey() {
      return Object.keys(this.customDictMap);
    },
    colLength() {
      return Object.keys(this.baseDictMap).length + Object.keys(this.otherDictMap).length + Object.keys(this.customDictMap).length;
    },
    bodyWrapper() {
      return this.$refs.bodyRef;
    },
    hasScroll() {
      const { bodyRef } = this.$refs;
      return bodyRef ? bodyRef.scrollHeight > bodyRef.clientHeight : false;
    }
  },
  watch: {
    tableData() {
      this.$nextTick(() => {
        this.calcTableBodyHeight();
        this.bindEvent();
      });
    }
  },
  methods: {
    async onInit(data) {
      try {
        const res = await getTemperatureList(data);
        if (res.data.data.list && res.data.data.list.length) {
          this.patient = {
            patientId: res.data.data.patientId,
            visitId: res.data.data.visitId,
            wardCode: res.data.data.wardCode,
          }
          this.tableData = res.data.data.list.map(item => {
            return {
              ...item,
              recordMonth: moment(item.recordDate).format('MM-DD'),
              recordHour: moment(item.recordDate).format('HH:mm'),
            }
          });
        } else {
          this.tableData = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    bindEvent() {
      const { headerRef, bodyRef } = this.$refs;
      bodyRef.addEventListener('scroll', function() {
        if (headerRef) headerRef.scrollLeft = this.scrollLeft;
      });
    },
    calcTableBodyHeight() {
      const tableHeaderRef = this.$refs.headerRef;
      if (tableHeaderRef) {
        const headerHeight = tableHeaderRef ? tableHeaderRef.offsetHeight : 0;
        this.tableBodyHeight = this.height - headerHeight;
      }
    },
    open(data) {
      this.signListShow = true;
      this.onInit(data);
    },
    async onSave() {
      const params = {
        ...this.patient,
        list: this.tableData
      }
      try {
        await saveTemperatureList(params);
        this.$message.success('保存成功');
        this.signListShow = false;
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.signListShow = false;
    },
    isOverText(value, ref) {
      try {
        let inputWidth = this.$refs[ref][0].offsetWidth;
        let textWidth = value.split("").reduce((total, num) => {
          let charCode = num.charCodeAt(0);
          if (charCode >= 0 && charCode <= 128) return total + 5.9;
          else return total + 11.8;
        }, 0);

        if (textWidth > inputWidth) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    editCustomTitle(value, key) {
      window.openSetTextModalNew((text) => {
        const data = {
          patientId: this.patientInfo.patientId,
          visitId: this.patientInfo.visitId,
          wardCode: this.patientInfo.wardCode,
          vitalCode: key,
          fieldCn: text,
          recordDate:
            moment(this.query.entryDate).format("YYYY-MM-DD") + " " +
            this.query.entryTime,
        };
        savefieldTitleNew(data).then((res) => {
          this.customDictMap[key].fieldCn = text;
          this.$message.success(`修改${value}成功`);
        });
      }, value, `修改${value}`);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .modal-table {
    height: 450px;
    width: 100%;
    overflow: hidden;
    position: relative;
    .table__header-wrapper {
      width: 100%;
      overflow: hidden;
      .table__header {
        border: 1px solid #444444;
      }
    }
    .table__body-wrapper {
      width: 100%;
      position: relative;
      overflow: auto;
      .table__body {
        border-left: 1px solid #444444;
      }
    }
  }
  table {
    border-collapse: separate;
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    color: #000;
    & thead {
      background: #f4f2f5;
    }
    &, tr, td, th {
      border-right: 1px solid #444444;
      border-bottom: 1px solid #444444;
    }
    td, th {
      height: 30px;
      text-align: center;
      vertical-align: middle;
      line-height: 14px;
      position: relative;
    }
    & tr:nth-child(even) {
      background: #f4f2f5;
    }
    & tr:hover {
      background: #e6e6e6;
    }
    & td, th {
      & textarea {
        overflow: hidden;
        line-height: 29px;
        height: 100% !important;
        width: 100% !important;
        max-height: 27px;
        resize: none;
        position: relative;
        top: 1px;
        border: 0 !important;
        padding: 0;
        box-sizing: border-box !important;
        outline: none !important;
        text-align: center;
        background: transparent;
        color: #000;
        font-size: 12px;

        &:focus {
          // background: #EEF6F5
          background: rgb(228, 241, 240);
        }
        &.manyrows {
          line-height: 14px !important;
        }
      }
    }
  }
</style>
