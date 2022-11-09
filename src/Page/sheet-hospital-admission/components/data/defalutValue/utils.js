import { 入院默认值 } from "./入院评估";
import { 吞咽 } from "./吞咽";
export default function mergeDefaultValue(
  obj,
  defaultArr = [入院默认值, 吞咽]
) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!obj[key]) {
        let days = 0;
        defaultArr.forEach(item => {
          if (item[key]) {
            obj[key] = item[key];
            days++;
          }
        });
        // if (days == 1) {
        //   // console.log(`${key}设置默认值${obj[key]}成功`);
        // } else if (days > 1) {
        //   console.error(`设置${key}默认值发现重名！！！`);
        // }
      }
    }
  }
  console.log;
}

export let setDefaultValue = function(
  obj,
  defaultArr = [入院默认值]
){
  defaultArr.forEach(item => {
    for (let key in item) {
      if (item[key] && !obj[key]) {
        obj[key] = item[key];
      }
    }
  });
}

