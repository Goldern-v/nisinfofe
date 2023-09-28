export function decoder_title(th) {
  let customTitleListTop = th.th.top.filter(item => {
    return item.key && item.key != 'recordYear'
  });
  let customTitleListMid = th.th.mid.filter(item => {
    return item.key
  });
  let customTitleListBottom = th.th.bottom.filter(item => {
    return item.key
  });

  return [...customTitleListMid, ...customTitleListTop, ...customTitleListBottom];
}

/**
 *
 * @param {*} record 当前选中的行数据
 * @param {*} customTitle 自定义列数据
 */
export function decoder_record(record, customTitle) {
  let customTitleList = customTitle.map(item => item.key)
  let resultObj = {};
  let zidian = {};
  let fixedList = {} //固定列
  for (let i = 0; i < record[0].length; i++) {
    resultObj[record[0][i].key] = record[0][i].value;
      if (record[0][i].autoComplete) {
        zidian[record[0][i].key] = record[0][i].autoComplete.data;
      }
    if(!customTitleList.includes(record[0][i].key)) {
      fixedList[record[0][i].key] = record[0][i]
    }
  }
  // console.log(resultObj, 'resultObj')
  // 生成固定列列表
  return [resultObj, zidian, renderFixItem(fixedList)];
}

/**
 *
 * @param {*} record 当前选中的行数据
 * @param {*} customTitle 自定义列数据
 */
export function decoder_record2(record, customTitle) {
  let customTitleList = customTitle.map(item => item.key)
  let resultObj = {};
  let zidian = {};
  let fixedList = {} //固定列
  for (let i = 0; i < record[0].length; i++) {
    resultObj[record[0][i].key] = record[0][i].value;
      if (record[0][i].autoComplete) {
        zidian[record[0][i].key] = record[0][i].autoComplete.data;
      }
    if(!customTitleList.includes(record[0][i].key) && (record[0][i].name || record[0][i].next)) {
      fixedList[record[0][i].key] = record[0][i]
    }
  }
  // console.log(resultObj, 'resultObj')
  // 生成固定列列表
  return [resultObj, zidian, fixedList];
}

function renderFixItem(fixedList) {
  delete fixedList.recordMonth
  delete fixedList.recordHour
  delete fixedList.temperature
  delete fixedList.pulse
  delete fixedList.breath
  delete fixedList.bloodPressure
  delete fixedList.spo2
  delete fixedList.consciousness
  delete fixedList.sign
  delete fixedList.audit
  delete fixedList.signerNo
  delete fixedList.auditorNo
  delete fixedList.description
  delete fixedList.pupilSizeLeft
  delete fixedList.pupilSizeRight
  delete fixedList.pupilReflexLeft
  delete fixedList.pupilReflexRight
  delete fixedList.foodSize
  delete fixedList.food
  delete fixedList.discharge
  delete fixedList.dischargeSize
  for(let key in fixedList) {
    if(fixedList[key].hidden) {
      delete fixedList[key]
    }
  }
  console.log(fixedList, 'fixedList')
  return fixedList
}