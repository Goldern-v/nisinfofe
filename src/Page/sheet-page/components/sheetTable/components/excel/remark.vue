<template>
  <div class="bottomRemark">
    <div
      v-if="sheetInfo.sheetType == 'neonatology2'"
      style="font-size: 13px; margin-top: -5px"
    >
      备注 1.肌张力:M(正常) H(高) L(低) 2.肤色:P1(红润) J(黄染) F(潮红) C(紫绀)
      P2(苍白) M(花斑) 3.体位:S(平卧) L(左侧) R(右侧) P(俯卧)
    </div>
    <div v-if="sheetInfo.sheetType == 'stress_injury_hd'">
      备注:
      <span
        >(1)分期请用对应的数字进行记录:1(1期);2(2期);3(3期);4(4期);5(深部组织损伤期);6(不可分期)。</span
      >
      <p style="margin:5px 0 0 42px;">
        (2)评估时机:1、2期压力性损伤每周评估记录;3期以上至少三天评估记录;伤口渗液多或有特殊变化随时评估记录。
      </p>
    </div>
    <div v-if="sheetInfo.sheetType == 'common_hd'">
      备注:健康教育：1.入院及相关疾病知识宣教、2.探视、陪护制度宣教、3.安全告知、4.检查宣教、5.饮食宣教、6.用药宣教、7.特殊治疗护理操作前宣教、
      8.术前宣教、9.术后宣教、10.禁食、11.卧床休息、12.床上活动、13.离床活动、14.出院指导
    </div>
    <div
      v-if="sheetInfo.sheetType == 'postpartum_hd'"
      style="font-size: 13px; margin-top: -5px"
    >
      备注:健康教育：1.入院及相关疾病知识宣教2.探视、陪护制度宣教3.安全告知4.检查宣教5.饮食宣教6.产后/术后宣教7.母乳喂养宣教
      8.母婴用药、安全宣教9.新生儿护理知识宣教10.出院指导
    </div>
    <div
      v-if="
        sheetInfo.sheetType == 'prenatal_hd' ||
          sheetInfo.sheetType == 'neonatology2_hd'
      "
      style="font-size: 13px; margin-top: -5px"
    >
      备注:健康教育：1.入院及相关疾病知识宣教2.探视、陪护制度宣教3.安全告知4.检查宣教5.母乳喂养知识宣教6.胎动知识宣教7.分娩知识宣教8.饮食宣教
      9.特殊治疗护理操作前宣教10.术前宣教11.用药宣教12.卧位宣教13.术后宣教14.出院指导
    </div>
    <div
      v-if="sheetInfo.sheetType == 'neurosurgery_hd'"
      style="font-size: 13px; margin-top: -5px"
    >
      备注:一.意识：清✔，昏迷++。二.瞳孔对光反射判断：灵敏+，迟钝±，消失-。三.人工气道途径：鼻腔气管插管A1，口腔气管插管A2，气管切开B.
      <p style="margin-top:2px;">
        四。健康教育：1.入院及相关疾病知识宣教2.探视、陪护制度宣教3.安全告知4.检查宣教5.母乳喂养知识宣教6.胎动知识宣教7.分娩知识宣教8.饮食宣教
        9.特殊治疗护理操作前宣教10.术前宣教11.用药宣教12.卧位宣教13.术后宣教14.出院指导
      </p>
    </div>
    <div
      v-if="sheetInfo.sheetType == 'common_wj'"
      style="font-size: 13px; margin-top: -5px"
    >
      备注:①意识：清✔、嗜睡、朦胧++、浅昏迷+++、深昏迷++++、麻醉未醒△、药眠○、谵妄⊙。②.瞳孔对光的反应：灵敏+，迟钝±，消失-(左/右);
    </div>
    <div
      v-if="
        sheetInfo.sheetType == 'common_hl' ||
          sheetInfo.sheetType == 'prenatal_hl' ||
          sheetInfo.sheetType == 'obstetrics_hl' ||
          sheetInfo.sheetType == 'gynecology_hl'
      "
      style="font-size: 13px; margin-top: -5px"
    >
      说明:神志：清醒（清）、麻醉未醒（△）、嗜睡（+）、模糊（++）、浅昏迷（+++）、深昏迷（++++）
      瞳孔对光反射灵敏（+），迟钝（±），消失（-）
    </div>
    <div
      v-if="sheetInfo.sheetType == 'neonatology_hd'"
      style="font-size: 13px; margin-top: -5px"
    >
      备注:吸痰性质用符号表示：白色吸痰(WL),黄白稠痰(YWT),黄色稠痰(YT),血性痰(B);痰量：小量(+),中量(++),大量(+++);大便单位（g）。
    </div>
    <div
      v-if="sheetInfo.sheetType == 'picc_maintenance_hd'"
      style="font-size: 13px; margin-top: -5px"
    >
      备注:1、在执行维护后，要在该项目打✔
      <p style="margin:5px 0 0 32px;">
        2、当管道出现问题时请注意描述，例如描述其出血、渗血、穿刺点情况
      </p>
    </div>
    <div v-if="sheetInfo.sheetType == 'mild_hypothermia_hd'">
      备注：记录要求与说明。（1）所处治疗阶段与治疗模式，直接勾选当前选项;(2)亚低温治疗开始为“降温”阶段，每15min记录1次，直至达到目标温度（33.5~33.5-34℃,约1-2h）后1h,
      进入“维持治疗'阶段，然后每2h记录1次，时间约72h：之后开始“复温”，复温期间每小时记录肛温1次，一般肛温为2h升高0.5℃。
      <p>
        （3）按医嘱要求的间隔时间，进行脑科观察，并按以下相应的符号记录，意识状态：清醒（√）、嗜睡（+）、朦胧（++）、浅昏迷（+++）、深昏迷（++++）、麻醉未醒（△）；肢体活动反应：灵敏（+）、迟钝（±）、消失（-）；
        瞳孔对光反应：灵敏（+）、迟钝（±）、消失（）；瞳孔直径（mm)： 1 2 3 4 5
        6 （以上瞳孔直径图形仅为参考，以实际使用记录单内的图形直径为准。）
      </p>
      <p>（4)其它如血压、脉搏、呼吸等生命体征记录在NICU护理记录单中。</p>
      <p>
        （5）维持治疗中每2h变动1次体位，每4h检查新生儿皮肤1次，并在相对应的表格标√。
      </p>
    </div>
    <!-- 江门妇幼-儿科康复护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'child_recovery_jm'">
      <p>
        备注:1护理治疗措施代码:①雾化;②理疗;③电按摩拍背;④吸痰;⑤鼻腔冲洗;⑥温水擦浴.
      </p>

      <p style="text-indent: 32px;">
        2健康教育代码:①饮食指导;②用药指导;③指导翻身拍背排痰手法;④指导配合雾化吸入方法;⑤指导留置针留置的注意事项;⑥指导松解衣服、多喝水协助降温。⑦指导喂养方法,防止窒息;⑧指导臀部护理方法;⑨指导肺功能检查的注意事项;⑩预防坠床,安全告知;11出院指导(A按时服药;B不适随诊;C定时复诊。
      </p>
      <p style="text-indent: 32px;">
        3.在同一栏内(同列)记录内容,如与前一次记录相同,可用:
        “√”表示默认前一次记录,如不一致时,用文字表示。
      </p>
    </div>
    <!-- 江门妇幼-乳腺科护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'breastkenursing_jm'">
      <p>
        说明：
        一、功能锻炼：A深呼吸，手、腕、肘关节的屈伸运动 &emsp;   B患侧上肢爬墙、振翅运动等  &emsp;  C推墙、两肩外展旋转、双上肢举高左右摇摆等
      </p>
      <p style="margin-left: 46px;">
        二、中心静脉导管：A PICC通畅 &emsp;  B 输液港通畅
      </p>
      <p style="margin-left: 46px;">
        三、在同一栏内（同列）记录的内容，如与前一次记录相同，可用‘√’表示默认前一次记录，如不一致时，用文字表示。
      </p>
    </div>
     <!-- 江门妇幼-小儿外科护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'pediatric_surgery_jm'">
      <p>
        备注：
        一、护理指导代码：1观察伤口有无渗血；2保持伤口敷料干洁；3心理护理；4避免碰撞伤口；5避免剧烈运动；6温水擦浴；7勿压迫、折叠、扭曲管道。
      </p>
      <p style="margin-left: 46px;">
        二、健康教育代码：1饮食指导；2用药指导；3指导翻身拍背排痰手法；4指导配合雾化吸入方法；5指导留置针留置的注意事项；6指导松解衣物、多喝水协助降温；7指导喂养方法，防止窒息；8指导臀部护理方法；9预防坠床，安全告知；10出院指导（A、按时服药；B不适随诊；C定时复查）
      </p>
      <p style="margin-left: 46px;">
        三 、在同一栏内(同列)记录的内容,如与前一次记录相同,可用: “√”
        表示默认前一次记录,如不一致时,用文字表示。
      </p>
    </div>
    <!-- 江门妇幼-妇科护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'gynaecology_jm'">
      <p>
        附注代码：
        护理指导：A入院告知 &emsp;  B防跌倒告知 &emsp;  C防药物外渗告知
      </p>
      <p style="margin-left: 72px;">
        留置镇痛泵：A通畅，穿刺点无渗血 &emsp;  B通畅、穿刺点渗血、渗液 &emsp;  C拔除 &emsp;  D暂停使用
      </p>
      <p style="margin-left: 72px;">
        药物使用： A米非司酮片 &emsp;  B米索前列醇片 &emsp;   C硫酸镁 &emsp;  D化疗药物
      </p>
    </div>
    <!-- 江门妇幼-输血护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'safemetachysis_jm'">
      <p>
        备注：
        1、输血护理记录单用于填写成分血、全血的输注记录，成分血的输注顺序（血小板-冷沉淀-红细胞-血浆）。
      </p>
      <p style="margin-left: 46px;">
        2、输血严格执行床旁双人核查加PDA扫码安全核查。
      </p>
      <p style="margin-left: 46px;">
        3、输血速度应先慢后快，输血开始时、输血15min与输血结束时均测量生命体征一次。
      </p>
      <p style="margin-left: 46px;">
        4、输血前后均应用生理盐水冲管。输血后血袋送回血库保存24h。
      </p>
    </div>
    <!-- 外科 -->
    <div v-if="sheetInfo.sheetType == 'surgical_eval_lcey'">
      <p>
        <b>体温异常措施：</b>①适量增加饮水量（ml） ②温水擦浴 ③冰块冷敷
        ④遵医嘱药物治疗 ⑤减少盖被 血压异常处理：①遵医嘱应用药物 ②观察做好宣教
      </p>
      <p>
        <b>氧疗：</b>①鼻导管 ②面罩 ③双鼻塞 <b>术前准备：</b>①备皮 ②术前禁饮食
        ③术前插胃管 ④术前插鼻肠管 ⑤肌注术前针 ⑥术前心理护理
      </p>
      <p>
        <b>术后护理：</b>①体位 ②饮食指导 ③肢体功能锻炼 ④管道维护 ⑤患肢放置
        ⑥协助翻身⑦术后心理护理 ⑧其他 <b>刀口敷料：</b>①清洁 ②少量渗出 ③渗出较多
      </p>
      <p>
        <b>疼痛护理：</b>①非药物治疗 ②遵医嘱用药 腹部症状采取措施①腹部按摩 ②用药
      </p>
      <p>
        <b>采取措施后效果：</b>①好 ②差 <b>呼吸道管理：</b>①指导有效咳嗽及深呼吸
        ②协助扣背排痰 ③排痰机排痰 ④吸痰 ⑤ 雾化吸入
      </p>
      <p>
        <b>睡眠：</b>①安静休息 ②间断入眠 ③入睡困难 ④暗化病室 ⑤应用药物 ⑥其它
        <b>患者依从性</b>：①好 ②一般 ③差 <b>自理能力：</b>①完全自理 ②部分协助
        ③全部协助
      </p>
      <p>
        <b>教育需求：</b>①饮食 ②活动 ③药物 ④疾病知识 ⑤检查化验注意事项 ⑥其它
        <b>心理状态：</b>1.稳定 2.紧张 3.焦虑 4.抑郁 5.恐惧 6.烦躁
      </p>
    </div>
    <!-- 胸心外科 -->
    <div v-if="sheetInfo.sheetType == 'surgical_eval2_lcey'">
      <p>
        <b>体温异常措施：</b>①适量增加饮水量（ml） ②温水擦浴 ③冰块冷敷
        ④遵医嘱药物治疗 ⑤减少盖被 <b>血压异常处理：</b>①遵医嘱应用药物
        ②观察做好宣教
      </p>
      <p>
        <b>刀口敷料：</b>①清洁 ②少量渗出 ③渗出较多 <b>疼痛护理：</b>①非药物治疗
        ②遵医嘱用药 <b>腹部症状采取措施</b>①腹部按摩 ②用药 采取措施后效果：①好
        ②差
      </p>
      <p>
        <b>呼吸道管理：</b>①指导有效咳嗽及深呼吸 ②协助扣背排痰 ③排痰机排痰 ④吸痰
        ⑤ 雾化吸入 <b>睡眠：</b>①安静休息 ②间断入眠 ③入睡困难 ④暗化病室
        ⑤应用药物 ⑥其它
      </p>
      <p>
        <b>泵入药物：</b>1.硝酸甘油 2.硝普钠 3.乌拉地尔 4.多巴胺 5.多巴酚丁胺
        6.去甲肾上腺素 7.肾上腺素 8.右美托咪啶 9.咪哒唑仑 10.芬太尼 11.丙泊酚
        12.氯化钾 13.胺碘酮 14.米力农 15.胰岛素 16.利多卡因 17.艾司洛尔
        18.新活素 19.其他
        <b>备注：</b
        >术后即刻评估疼痛，带气管插管患者，拔除气管插管后连续评估疼痛三次。
      </p>
    </div>
    <!-- 病重（病危）患者护理记录单 -->
    <div
      v-if="
        sheetInfo.sheetType == 'critical2_lcey' ||
          sheetInfo.sheetType == 'critical_lcey'
      "
    >
      <p>
        <b>备注：氧疗：</b>①鼻导管 ②面罩 ③双鼻塞 <b>意识：</b>1.清醒 2.镇静
        3.嗜睡 4.昏睡 5.昏迷 6.意识模糊 7.谵妄 8.其他
      </p>
    </div>
    <!-- 陵 城 病重（病危）患者护理记录单 -->
    <div class="bottomTable" v-if="sheetInfo.sheetType == 'critical_lc'">
      <table>
        <colgroup>
          <col width="46px" />
          <col width="1355px" />
        </colgroup>
        <tbody>
          <tr>
            <td style="text-align: center;vertical-align: middle;">
              医<br />嘱<br />内<br />容
            </td>
            <td class="textarea">
              <textarea
                v-model="sheetInfo.relObj['advice10']"
                :data-value="sheetInfo.relObj['advice10']"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="padding-top: 10px;">
        <p>注：瞳孔对光反应：灵敏（+）、迟钝（S）、消失（-）表示。</p>
      </div>
    </div>
    <!-- 东莞横沥 硫酸镁注射液静脉滴注观察记录单 -->
    <div v-if="sheetInfo.sheetType == 'magnesium_sulphate_hl'">
      <p>
        备注："宫缩"栏以"持续时间(s)/间隔时间(min)"表示
      </p>
    </div>
    <!-- 山南市人民医院临床护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'clinical_sn'">
      <p>
        注:面色：①正常②红润③黄染④发绀⑤苍白⑥灰暗⑦苍黄 肢端:①暖②凉
        氧疗:①鼻导管②头罩③CPAP④无创通气⑤气管插管
        机械通气模式:①SIMV+PS②CMV③IMV④SIMV⑤A/C⑥PSV⑦PCV吸痰耐受“√”，否“×”意识:①清醒②激惹③迟钝④昏睡⑤昏迷前卤:①平坦②凹陷③隆起肌张力:①正常②高③低下腹胀、抽搐、呕吐、潴留等:有“√”，无“×”
        体位:①左侧②右侧③平卧④俯卧喂养:①口服②鼻饲③口服+鼻饲④泵奶⑤禁食
        眼部护理:①正常②炎症 口腔护理:①正常②鹅口疮 脐部护理:①正常②脐炎
        臀部护理:①正常②红臀 瞳孔对光反射：①灵敏②迟钝③消失
      </p>
    </div>
    <!-- 山南市人民医院ICU护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'icu_sn'">
      <p>
        备注：1、观察内容无异常时，用“N”表示，异常时如实描述。2、常用护理措施代码：①口腔护理
        ②会阴护理 ③清洁面部 ④温水擦浴 ⑤气管切开护理 ⑥吸痰 ⑦预防压疮护理
        ⑧雾化吸入 ⑨更换引流装置 ⑩保护性约束
      </p>
    </div>
     <!-- 南方中西医护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'nursingrecords_zxy'">
      <p>
        备注：意识：清醒(-)、嗜睡(+)、浅昏迷(++)、深昏迷(+++)、麻醉未醒(△)、通畅(√) &emsp; &emsp; 敷料：干洁、渗血、渗液   &emsp; &emsp;  瞳孔：灵敏(+)、迟钝(±)、消失(-)
      </p>
    </div>
    <!-- 南方中西医脑科记录单 -->
    <div v-if="sheetInfo.sheetType == 'encephalopathy_zxy'||sheetInfo.sheetType == 'brainobservation_zxy'">
      <p>
        q--h观察意识、瞳孔、肢体、测B.P.P.R 意识：清醒（√）浅昏迷（+++） 导管：脑室引流管（）气管导管（）<br/>
        q--h测体温、记出入量（）记1H尿量（）嗜睡（+） 浅昏迷（++++） 硬膜外引流管（）深静脉管（）硬膜外引流管（）深静脉管（）<br/>
        瞳孔对光反应:朦胧（++）麻醉未醒(△) 硬膜下引流管（） 胃管（）<br/>
        灵敏（+）迟钝（±）消失（-） 肢体肌力分级：0 1 2 3 4 5 腰大池引流管（） 尿管（）<br/>
      </p>
    </div>
     <!-- 武警产后(产房)观察记录单 -->
    <div v-if="sheetInfo.sheetType == 'postpartum_wj'">
      <p>
        注明：1.子宫收缩：用“硬”、“软”表示。<br/> 2.膀胱情况：“-”表示空虚；“±”表示半充盈；“+” 表示充盈。<br/>3.肛查：“-“表示无特殊；”+“表示异常。
      </p>
    </div>
    <!-- 东莞谢岗护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'common_xg'">
      健康宣教内容：1.入院宣教；2.辅助检查目的及注意事项；3.吸氧目的及注意事项；4.心电监护目的及注意事项；5.术前宣教；6.术后宣教；7.饮食指导；
      8.防跌倒；9.出院宣教；<br/>10.用药指导；11.输血注意事项；12.特殊感染隔离注意事项。
    </div>
    <!-- 东莞谢岗产前待产记录单 -->
    <div v-if="sheetInfo.sheetType == 'prenatal_xg'">
      健康宣教内容：1.入院宣教；2.辅助检查目的及注意事项；3.吸氧目的及注意事项；4.心电监护目的及注意事项；5.术前宣教；6.术后宣教；7.饮食指导；
      8.防跌倒；9.出院宣教；<br/>10.用药指导；11.输血注意事项；12.特殊感染隔离注意事项；13.产褥期宣教；14.自数胎动的方法；15.分娩知识宣教；
      16.减痛技巧指导；17.指导用力。
    </div>
    <!-- 北海 婴儿记录表-->
    <div v-if="sheetInfo.sheetType == 'infant_bh'">
       日:早10时--晚20时
       &nbsp; &nbsp; 
       中:晚20时--凌晨03时
       &nbsp; &nbsp; 
       晚:凌晨03时--早10时 
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import sheetInfo from "../../../config/sheetInfo";
export default {
  data() {
    return {
      sheetInfo
    };
  },
  created() {
    if (
      this.sheetInfo.sheetType == "critical_lc" &&
      this.sheetInfo.relObj["advice10"] == undefined
    ) {
      this.sheetInfo.relObj["advice10"] =
        "【1】0.9%NS100ml,奥美拉唑40mg iv 12:00【2】0.9%NS100ml,奥美拉唑40mg iv 12:00";
    }
  }
};
</script>

<style lang="stylus" scoped>
.bottomRemark{
  >div{
      font-size: 13px;
      margin-top: -5px
      text-align :left;
      line-height :20px;
  }
  .bottomTable{
    width: 100%;
    font-size:12px;
    margin-top: -16px;
    table {
      width: 100%;
    }
    td{
      border: 1px solid #000 !important;
      height
      p{
        line-height :20px;
      }
      &.textarea {
        height: 150px;
      }
      textarea  {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
        box-sizing: border-box;
        line-height: 18px;
        padding: 5px;
        overflow: hidden;
      }
    }
  }

}
</style>
