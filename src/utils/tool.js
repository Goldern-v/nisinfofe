/**
* 获取字符串字节长度
export
*/
export const getBytesLength = (text) => {
 let totalLength = 0;
 let charCode;
 text.split('').map(v => {
   charCode = v.charCodeAt();
   if (charCode < 0x007f) {
     totalLength++;
   } else if (0x0080 <= charCode && charCode <= 0x07ff) {
     totalLength += 2;
   } else if (0x0800 <= charCode && charCode <= 0xffff) {
     totalLength += 3;
   } else {
     totalLength += 4;
   }
 });
 return totalLength;
}

/**
 * 根据医院id返回数据
 * @param {*} config {
 *   map: {
 *     默认选项 other
 *     other?: any,
 *     默认选项 all
 *     all?: any,
 *     默认选项 default
 *     default?: any,
 *     [p: string]: any
 *   },
 *   当前医院id或状态 默认为系统医院id
 *   currentHospitalId?: string,
 *   是否可以归类
 *   vague?: boolean
 * }
 * @returns
 */
export const hisMatch = (config) => {
  const { map, currentHospitalId, vague = true } = config
  let _currentHospitalId = currentHospitalId || process.env.HOSPITAL_ID
  if (vague) {
    for (let hospitalId in map) {
      if (hospitalId.split(',').indexOf(_currentHospitalId) >= 0)
        return map[hospitalId]
    }
  } else {
    if (Object.keys(map).indexOf(_currentHospitalId) >= 0) return map[_currentHospitalId]
  }

  return map["other"] || map["all"] || map["default"] || null
}
