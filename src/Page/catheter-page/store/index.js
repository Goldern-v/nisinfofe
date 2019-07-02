import moment from "moment";
import {
  getBlockList,
  updateBlock,
  delBlock,
  getRecordList,
  endBlock,
  saveBlock
} from "../api";
class Model {
  constructor() {}
  selectedPatient = {}; /** 选中的病人信息 */
  blockList = []; /** 管道列表 */
  selectedBlock = {}; /** 选中的管道 */
  selectedDate = ""; /** 选中的日期 */
  recordList = []; /** 导管护理记录列表 */

  init() {
    this.selectedPatient = {};
    this.blockList = [];
    this.selectedBlock = {};
    this.selectedDate = "";
    this.recordList = [];
  }
  setSelectedPatient(obj) {
    this.selectedPatient = obj;
    this.getBlockList();
  }
  getBlockList(id) {
    let { patientId, visitId } = this.selectedPatient;
    if (patientId && visitId) {
      getBlockList(patientId, visitId).then(res => {
        this.blockList = res.data.data.list;
        if (id) {
          this.setSelectedBlock(
            this.blockList.find(item => item.id == id) || {}
          );
        } else {
          this.setSelectedBlock(
            this.blockList[this.blockList.length - 1] || {}
          );
        }
      });
    }
  }
  setSelectedBlock(obj) {
    this.selectedBlock = obj;
  }
  /** 更新block */
  updateBlock(block) {
    let data = Object.assign({}, this.selectedBlock, block);
    return updateBlock(data).then(res => {
      Object.assign(this.selectedBlock, res.data.data);
    });
  }

  /** 新建block */
  saveBlock(block) {
    let data = Object.assign({}, this.selectedPatient, block);
    return saveBlock(data).then(res => {
      this.getBlockList(res.data.data.id);
    });
  }

  /** 删除block */
  delBlock(obj) {
    let data = Object.assign({}, this.selectedBlock, obj);
    return delBlock(data).then(res => {
      this.getBlockList({});
    });
  }

  /** 获取导管记录列表 */
  getRecordList() {
    let { patientId, visitId } = this.selectedPatient;
    let { orderNo, orderSubNo, startDate } = this.selectedBlock;
    if (patientId && visitId && orderNo && orderSubNo && this.selectedDate) {
      getRecordList(
        patientId,
        visitId,
        orderNo,
        orderSubNo,
        this.selectedDate.date,
        startDate
      ).then(res => {
        this.recordList = res;
      });
    }
  }

  /** 拔管 */
  endBlock(block) {
    return endBlock(block).then(res => {
      Object.assign(this.selectedBlock, res.data.data);
    });
  }
}

// 拔管状态策略树
let status_strategy = {
  "0": {
    text: "未开始",
    color: "#BEBEBE",
    endDate: "endDate",
    endDateText: "预计拔管"
  },
  "1": {
    text: "插管中",
    color: "#69A7D9",
    endDate: "expectEndDate",
    endDateText: "预计拔管"
  },
  "2": {
    text: "已拔管",
    color: "#BEBEBE",
    endDate: "endDate",
    endDateText: "拔管时间"
  },
  "3": {
    text: "非计划拔管",
    color: "#BEBEBE",
    endDate: "endDate",
    endDateText: "拔管时间"
  }
};
let model = new Model();
export { model, status_strategy };
