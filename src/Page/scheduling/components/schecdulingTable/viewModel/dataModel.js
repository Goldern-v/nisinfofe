import { variables } from "./variables";
import {
  getHDPatientList,
  getColorDict,
  getHDWayDict,
  getPatientArrange,
  getAreaDict,
  getEquiDict,
  savePatientArrange,
  deletePatientArrange,
  generalPatientArrange,
  searchPatient
} from "../../../api";

class DataModel {
  tableData = [];
  _tableData = []; /** 完整的数据备份 */

  /** 状态类 */
  patientLoading = false;
  dataLoading = false;
  tableLoading = false;
  /** 字典及基础数据 */
  startDate = "";
  endDate = "";
  selectedTx = "全部";
  selectedBc = "全部";
  colorDict = [];
  txDict = [];
  areaDict = [];
  equiDict = [];
  patientList = [];
  selectedPatientId = "";
  cleanItem(obj, data) {
    let { position, timeSlice, hdDate, hdEqui } = obj;
    deletePatientArrange({
      ...data,
      timeSlice,
      hdDate,
      hdEqui
    }).then(res => {
      let index = this.tableData.findIndex(item => item.position == position);
      this.tableData.splice(index, 1);
    });
  }
  insertItem(obj, data, oldPosition) {
    let { position, timeSlice, hdDate, hdEqui } = obj;
    if (this.findItem(position)) {
      window.app.$message.warning("请先移除当前患者");
      return Promise.reject();
    } else {
      if (this.findItemInOneDay(data, hdDate, position, oldPosition)) {
        return window.app
          .$confirm("该患者今日已经排过班了, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            return savePatientArrange({
              ...data,
              timeSlice,
              hdDate,
              hdEqui
            }).then(res => {
              this.tableData.push({
                position: position,
                data: { ...data, hdDate, hdDate, hdEqui, timeSlice }
              });
            });
          })
          .catch(() => {
            return Promise.reject();
          });
      } else {
        return savePatientArrange({
          ...data,
          timeSlice,
          hdDate,
          hdEqui
        }).then(res => {
          this.tableData.push({
            position: position,
            data: { ...data, hdDate, hdDate, hdEqui, timeSlice }
          });
        });
      }
    }
  }
  findItem(position) {
    return this.tableData.find(item => {
      return item.position == position;
    });
  }
  /** 本日是否存在记录 */
  findItemInOneDay(data, hdDate, newPosition, oldPosition) {
    console.log(newPosition, oldPosition, "oldPositionoldPositionoldPosition");
    if (
      oldPosition &&
      newPosition &&
      oldPosition.split("#")[0] === newPosition.split("#")[0]
    )
      return false;

    return this.tableData.find(item => {
      return (
        item.data.patientId == data.patientId && item.data.hdDate == hdDate
      );
    });
  }

  /** 初始化基础数据 */
  async initData() {
    this.dataLoading = true;
    this.selectedPatientId = "";
    await this.getHDPatientList();
    let res2 = await getColorDict();
    this.colorDict = res2.data.data;

    let res3 = await getHDWayDict();
    this.txDict = res3.data.data;

    let res4 = await getAreaDict();
    this.areaDict = res4.data.data;

    let res5 = await getEquiDict();
    this.equiDict = res5.data.data;
    variables.ROW_LENGTH = this.equiDict.length;
    await this.getPatientArrange();
    this.dataLoading = false;
  }

  /** 获取患者列表数据 */
  async getHDPatientList(search) {
    this.patientLoading = true;
    if (search) {
      let res = await searchPatient(search);
      this.patientList = res.data.data;
    } else {
      let res = await getHDPatientList();
      this.patientList = res.data.data;
    }
    this.patientLoading = false;
  }

  async getPatientArrange() {
    if (this.startDate && this.endDate) {
      this.tableLoading = true;
      let res = await getPatientArrange(this.startDate, this.endDate);
      this.tableLoading = false;
      this.tableData = res.data.data
        .map(item => {
          return {
            position: `${item.hdDate}#${item.hdTimeSlice}#${item.hdEqui}`,
            data: item
          };
        })
        .filter(item => {
          if (this.selectedTx != "全部") {
            if (item.data.hdWay != this.selectedTx) {
              return false;
            }
          }
          if (this.selectedBc != "全部") {
            if (item.data.hdTimeSlice != this.selectedBc) {
              return false;
            }
          }
          return true;
        });
    }
  }

  async generalPatientArrange() {
    let res = await generalPatientArrange(this.startDate, this.endDate);
    this.getPatientArrange();
  }
}

export const dataModel = new DataModel();
