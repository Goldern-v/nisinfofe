import 住院默认值 from "./住院评估";
import 吞咽 from "./吞咽";
export default function mergeDefaultValue(
  obj,
  defaultArr = {...住院默认值, ...吞咽}
) {
  for (let key in defaultArr) {
    if (obj.hasOwnProperty(key)>-1
    ) {
      obj[key] = defaultArr[key]?defaultArr[key] : ""
    }
  }
  // console.log();
}
