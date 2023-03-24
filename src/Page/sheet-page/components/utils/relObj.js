/** 处理relobj */
export function renderRelObj(obj) {
  let newObj = {
    ...obj
  };
  for (let key in newObj) {
    if (newObj[key] instanceof Array) {
      newObj[key] = JSON.stringify(newObj[key]);
    }
  }
  return newObj;
}
/** 解析relobj */
export function decodeRelObj(obj) {
  for (let key in obj) {
    if (obj[key].indexOf("[") > -1 && obj[key].indexOf("]") > -1) {
      try {
        obj[key] = JSON.parse(obj[key]);
      } catch (e) {

      }
    }
  }
  return obj;
}
