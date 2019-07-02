import _ from "lodash";
import { variables } from "./variables";
import { getApn } from "./thead";
import moment from "moment";
const getJh = rowIndex => rowIndex + 1;

function getFQ(rowIndex, equiIndexList, areaList, equiLengthList) {
  let currentIndex = equiIndexList.findIndex(item => rowIndex == item);
  if (currentIndex > -1) {
    return [
      {
        label: areaList[currentIndex],
        rowSpan: equiLengthList[currentIndex],
        style: {
          background: "#F4F2F5"
        }
      }
    ];
  }
  return [];
}

function getJH(currentEquiItem) {
  return [
    {
      label: currentEquiItem.equiName,
      style: {
        background: currentEquiItem.colorHex
      }
    }
  ];
}

function getCell(rowIndex, currentEquiItem, startDate) {
  return getApn().map(item => {
    let hdDate = startDate
      ? moment(startDate)
          .add(item.weekNumber, "d")
          .format("YYYY-MM-DD")
      : "";
    let hdEqui = currentEquiItem.equiName;
    let timeSlice = item.timeSlice;
    return {
      style: {
        height: variables.CELL_HEIGHT
      },
      jh: getJh(rowIndex),
      weekNumber: item.weekNumber,
      apnNumber: item.apnNumber,
      type: "cell",
      position: `${hdDate}#${timeSlice}#${hdEqui}`,
      timeSlice,
      hdEqui,
      hdDate
    };
  });
}

export const tbody = (areaDict, equiDict, startDate) => {
  let bodyList = [];

  let equiObj = _.groupBy(equiDict, "equiArea");

  let areaList = areaDict.map(item => item.equiArea);

  let equiLengthList = [];

  for (let i = 0; i < areaList.length; i++) {
    equiLengthList.push(equiObj[areaList[i]].length);
  }

  let equiIndexList = [0];

  for (let i = 0; i < equiLengthList.length; i++) {
    equiIndexList.push(
      equiLengthList.slice(0, i + 1).reduce((total, length) => total + length)
    );
  }

  /** 设备列表 */
  let equiList = [];
  for (let key in equiObj) {
    if (equiObj.hasOwnProperty) {
      equiList.push(...equiObj[key]);
    }
  }

  for (let rowIndex = 0; rowIndex < equiList.length; rowIndex++) {
    /** 当前设备 */
    let currentEquiItem = equiList[rowIndex];
    bodyList.push([
      ...getFQ(rowIndex, equiIndexList, areaList, equiLengthList),
      ...getJH(currentEquiItem),
      ...getCell(rowIndex, currentEquiItem, startDate)
    ]);
  }
  console.log(bodyList, "bodyList");
  return bodyList;
};
