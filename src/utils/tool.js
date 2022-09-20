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

/**
 * 广度优先
 * @param {array} treeArr 树形数组
 * @param {string} childName 节点名称
 * @param {boolean} includesRoot 是否包含非叶子节点
 * @returns 一维数组
 */
export const wideTraversal = (treeArr, childName = 'columns', includesRoot = false) => {
  let arr = []
  if (treeArr != null) {
    let queue = [...treeArr]
    while (queue.length != 0) {
      let item = queue.shift()
      if (!item[childName] || includesRoot) {
        arr.push(item)
      }
      let children = item[childName] || []
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i])
      }
    }
  }
  return arr
}
/**
 * 深度优先
 * @param {array} treeArr 树形数组
 * @param {array} arr 存储数组
 * @param {string} childName 节点名
 * @returns 一维数组
 */
 export const deepTraversalByLeaf = (treeArr, arr = [], childName = 'columns') => {
  if (treeArr) {
    for(let i = 0; i < treeArr.length; i++) {
      if (treeArr[i][childName]) {
        deepTraversalByLeaf(treeArr[i][childName], arr)
      }else {
        arr.push(treeArr[i])
      }
    }
  }
  return arr
 }
/**
 * 树形数组转层级数组 第一层在下标0 第二层在下标1 以此类推
 * @param {array} treeArr 原数组
 * @param {array} arr 存储数组
 * @param {number} index 层级
 * @param {string} childName 节点名
 * @returns 层级数组
 */
export const deepTraversal = (treeArr, arr = [], index = 0, childName = 'columns') => {
  if (treeArr) {
    for(let i = 0; i < treeArr.length; i++) {
      !arr[index] && (arr[index] = [])
      arr[index].push(treeArr[i])
      if (treeArr[i][childName]) {
        deepTraversal(treeArr[i][childName], arr, index + 1)
      }
    }
  }
  return arr
}
