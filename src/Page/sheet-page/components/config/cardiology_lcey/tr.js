/*
聊城二院 - 心内科介入患者观察记录单
*/
import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1,
  limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

import {createTr} from "../config"

let {
  节点,日期,时间,年月,体温,措施,脉搏,呼吸,血压,
  血压处理,疼痛评分,疼痛措施,尿量,动脉搏动,皮温,
  末梢循环,出血血肿,肿胀,敷料,并发症,
  特殊情况,签名1,ID,签名1_名字,状态,唯一标识,
  年份,日期哈希,月份小时,签名1_工号,签名2_工号,
  审核_工号,审核_名字,工号,多签
} = createTr(multiDictInfo,keyf1,limitChange,event_date,event_time,click_date,click_time)

节点.textarea.width

export default [节点,日期,时间,年月,体温,措施,脉搏,呼吸,血压,血压处理,疼痛评分,疼痛措施,尿量,动脉搏动,皮温,末梢循环,出血血肿,肿胀,敷料,并发症,
  特殊情况,签名1,ID,签名1_名字,状态,唯一标识,年份,日期哈希,月份小时,签名1_工号,签名2_工号,审核_工号,审核_名字,工号,多签]
