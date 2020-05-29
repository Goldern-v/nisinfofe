/** 处理relobj */
export function renderRelObj(obj) {
  obj = {
    ...obj
  };
  for (let key in obj) {
    if (obj[key] instanceof Array) {
      obj[key] = JSON.stringify(obj[key]);
    }
  }
  return obj;
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
