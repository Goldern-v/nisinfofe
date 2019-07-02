export function decoder_title(th) {
  let customTitleList = th.th.mid.filter(item => {
    // return item.key && item.key.indexOf("field") > -1;
    return item.label && item.type === "Custom"
  });
  return customTitleList;
}

export function decoder_record(record) {
  let resultObj = {};
  let zidian = {};
  for (let i = 0; i < record[0].length; i++) {
    resultObj[record[0][i].key] = record[0][i].value;
    if (record[0][i].autoComplete) {
      zidian[record[0][i].key] = record[0][i].autoComplete.data;
    }
  }
  return [resultObj, zidian];
}
