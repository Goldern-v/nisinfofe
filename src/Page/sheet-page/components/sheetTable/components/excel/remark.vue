
注：1、神志：清醒√、嗜睡+、昏睡、浅昏迷++、深昏迷+++、模糊、谵妄、植物状态A、睁眼昏迷B        2、瞳孔观察—瞳孔对光反应：灵敏√  迟钝+  消失++
    3、肢体：关节僵硬A、挛缩B、足下垂C、肿胀D肩痛E、肩关节半脱位F                          3、瞳孔形状：不规则A、术后改变B<template>
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
        四.健康教育：1.入院及相关疾病知识宣教。2.探视、陪护制度宣教。3.安全告知。4.检查宣教。5.饮食宣教。6.用药宣教。7.特殊治疗护理操作前宣教。8.术前宣教。9.术后宣教。10.禁食。11.卧床休息。
        <br/>12.床上活动。13.离床活动。14.出院指导
      </p>
    </div>
    <div
      v-if="sheetInfo.sheetType == 'common_wj'"
      style="font-size: 13px; margin-top: -5px;float: left;"
    >
      备注:①.瞳孔对光的反应：灵敏+，迟钝±，消失-(左/右);
    </div>
    <div
      v-if="sheetInfo.sheetType == 'postpartum_nurse_wj'"
      style="font-size: 13px; margin-top: -5px;"
    >
      备注:①意识：清醒、嗜睡、昏睡、模糊、浅昏迷、深昏迷、谵妄状态、镇静状态、朦胧、麻醉未醒、药眠；&nbsp;②乳房情况：(+)、(-)；&nbsp;③泌乳情况：无、少、中、多；&nbsp;④宫颈高度：u-3、u-2、u-1、u=0、u+1、u+2、u+3；&nbsp;⑤子宫收缩：软、硬、轮廓不清；&nbsp;⑥伤口：会阴(+)、会阴(-)、腹部(+)、腹部(-)
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
    <div v-if="sheetInfo.sheetType == 'mild_hypothermia_hd' || sheetInfo.sheetType == 'mild_hypothermia_sdlj'">
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
    <div class="bottomTable" v-if="sheetInfo.sheetType == 'critical_lc'||sheetInfo.sheetType == 'critical2_lc'||sheetInfo.sheetType == 'critical_new_linyi' || sheetInfo.sheetType == 'critical_new_lc' ">
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
      <div style="padding-top: 10px;" v-if="sheetInfo.sheetType == 'critical_lc' || sheetInfo.sheetType == 'critical_new_linyi'">
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
    <div v-if="sheetInfo.sheetType == 'common_xg'||sheetInfo.sheetType == 'internal_xg'">
      健康宣教内容：1.入院宣教；2.辅助检查目的及注意事项；3.吸氧目的及注意事项；4.心电监护目的及注意事项；5.术前宣教；6.术后宣教；7.饮食指导；
      8.防跌倒；9.出院宣教；<br/>10.用药指导；11.输血注意事项；12.特殊感染隔离注意事项。
    </div>
    <!-- 东莞谢岗产前待产记录单 -->
    <div v-if="sheetInfo.sheetType == 'prenatal_xg'">
      健康宣教内容：1.入院宣教；2.辅助检查目的及注意事项；3.吸氧目的及注意事项；4.心电监护目的及注意事项；5.术前宣教；6.术后宣教；7.饮食指导；
      8.防跌倒；9.出院宣教；<br/>10.用药指导；11.输血注意事项；12.特殊感染隔离注意事项；13.产褥期宣教；14.自数胎动的方法；15.分娩知识宣教；
      16.减痛技巧指导；17.指导用力。
    </div>
    <!-- 催产素静脉点滴观察单 -->
    <div v-if="sheetInfo.sheetType == 'oxytocin_xg'" style="display:flex;justify-content: space-between;padding: 0 50px;">
      <div>催产素使用总量：<input class="bottomInput" type="text" style="width:100px;" v-model="sheetInfo.relObj.ccssyzl" :data-value="sheetInfo.relObj.ccssyzl"/>（总数）</div>
      <div>分娩方式：<input class="bottomInput" type="text" style="width:200px;" v-model="sheetInfo.relObj.fmfs" :data-value="sheetInfo.relObj.fmfs"/></div>
    </div>
    <!-- 聊城二院 心内科介入患者观察记录单 -->
    <div v-if="sheetInfo.sheetType == 'cardiology_lcey'">
      体温处理措施：①适量增加饮水量；②温水擦浴；③冰块冷敷；④遵医嘱药物治疗；⑤减少盖被
    </div>
    <!-- 聊城二院  产妇产后观察记录单-->
    <div v-if="sheetInfo.sheetType == 'maternal_lcey'">
       护理措施:①指导产妇按摩子宫 ②告知知产妇自觉头量、心悸、阴道流血量多时告知助产士 ③指导并协助母要皮肤早接触、早吸吮 ④告知产妇母乳喂养及母婴三早的好处及重要性<br/>
       <span style="margin-left:59px">⑤保暖侧卧⑥皮肤早接触、早吸吮、早开奶</span>
    </div>
    <!-- 聊城二院 硫酸镁静滴观察记录单 -->
    <div v-if="sheetInfo.sheetType == 'magnesium_lcey'">
       1.镁离子早期中毒表现：<br/>
       恶心、面部潮红、有发热感、说话语音模糊，肌肉软弱无力等；膝反射消失；呼吸＜12次/分；呼吸频率减慢和深度减弱；血压偏低。<br/>
       如果出现上述症状，应减慢或停止静滴，并通知医生。中毒现象首先表现为膝反射消失(叩击髌骨下股四头肌肌腱，相应下肢出现反射为正常），随着血镁浓度增加可出现全身肌张力减退及呼吸抑制，严重者心跳可突然停止;每次用药前应检查膝反射，定时测血压和脉搏。<br/>
       2.监测尿排出量：如尿排出量在1小时小于17毫升,24小时小于400毫升时， 提示尿排泄功能受抑制，镁离子易积蓄中毒，应减慢或者停止静滴，并通知医生。<br/>
       3.每小时观察并记录。
    </div>
    <!-- 北海 婴儿记录表-->
    <div v-if="sheetInfo.sheetType == 'infant_bh'">
       日:早10时--晚20时
       &nbsp; &nbsp;
       中:晚20时--凌晨03时
       &nbsp; &nbsp;
       晚:凌晨03时--早10时
    </div>
    <!-- 花都 NICU监护单 -->
    <div v-if="sheetInfo.sheetType == 'nicu_custody_hd'">
      备注：特殊符号：“→” 更换、转换,“√”已检查,与上面相同,或已执行;<br/>
      痰液性质：白色稀痰(WL),白色稠痰(WT),黄色稀痰(YL),黄白色稀痰(YWL)黄色稠痰(YT),黄白色稠痰(YWT),新鲜血性液(B),陈旧性血性液(BL);<br/>
      痰量：小量（+）,中量（++）,大量（+++）;<br/>
      瞳孔：对光反应灵敏(+),对光反应迟钝(±),对光反应消失(-);基础护理:①口腔护理,②脐部护理,③臀部护理,④沐溶,⑤床上擦浴,⑥油浴,⑦抚触。
    </div>
    <!-- 花都 NICU监护单 -->
    <div v-if="sheetInfo.sheetType == 'hipment_hd'">
      备注：健康教育：1.入院及相关疾病知识宣教、2.探视、陪护制度宣教、3.安全告知、4.检查宣教、5.饮食宣教、6.用药宣教、7.特殊治疗护理操作前宣教、  8.术前宣教、9.术后宣教、10.禁食、11.卧床休息、12.床上活动、13.离床活动、14.出院指导
    </div>
    <!-- 威县  新生儿科重症监护记录单 -->
    <div v-if="sheetInfo.sheetType == 'newbornintensive_wx'">
      <strong>一.基础护理:</strong>1. 皮肤护理 2.口腔护理 3.脐部护理 4.臀部护理 5眼部护理 <strong>二.皮肤颜色:</strong>1.正常 2.青紫 3.黄染 4.发花 5.灰暗 6.潮红 7.苍白
      <strong>三.皮肤状况:</strong>1.正常 2.干燥 3.皮疹 4.疱疹 5.破损 6.瘀斑 7.压红 8.出血点 9.潮红 10.渗出 11.水肿 12.血肿 <strong>四.前囟:</strong>1.正常 2.饱满 3.凹陷
      <strong>五.肌张力</strong>1.正常 2.高 3.低 4.无 <strong>六.吸吮力:</strong>1.Ⅰ2.Ⅱ3.Ⅲ4.鼻饲5.无6.禁食 <strong>七.肺部听诊:</strong>1.正常呼吸音 2.呼吸音粗 3.湿性啰音 4.干性啰音 5痰鸣音 6.哮鸣音7.无
      <strong>八.哭声:</strong>1.响亮2.弱 3.沙哑 4.嘶哑5.呻吟6.无 <strong>九.三凹征:</strong>1.无 2.弱阳性3.阳性 <strong>十.腹部:</strong>1.正常 2.膨隆3.轻度腹胀4..中度腹胀 5..重度腹胀
      <strong>十一.意识状态:</strong>1.清 2.嗜睡 3.昏迷 4.深昏迷5.烦躁 6.药眠 7.无 <strong>十二.痰液:</strong>1.白色黏痰 2.白色泡沫样痰3.淡黄色粘痰 4黄色黏痰 5黄绿色黏痰 6.粉红色泡沫样痰7.绿色痰液
      <strong>十三．呕吐物颜色性质:</strong>1.灰白色 2.黄色 3.草绿色 4.咖啡色 5.暗红色 6.鲜红色.7.奶液8.絮状物9.黏液10血性黏液　　
      <strong>十四.胃内引流:</strong>1.黄色粘液 2.白色粘液 3.咖啡色粘液 4.粉红色粘液 5.草绿色粘液 6絮状物7.鲜血8.黄绿色黏液
      <strong>十五．身体部位:</strong>a.面部 b.耳后 c.颈部 d.上肢 e.下肢 f.臀部 g.腹部 h.胸部 i.腋窝 j.脐部 k.眼周 l.口周 m.腹股沟 n.周身 o.头部 P.会阴q.足底
    </div>
    <!-- 佛山杏坛 护理记录单(产前待产记录) -->
    <!-- <div v-if="sheetInfo.sheetType == 'prenataldelivery2_xt'">
      注：<strong>意识</strong>：清醒√；嗜睡＋；模糊±；昏睡＋＋；昏迷＋＋＋；谵妄。&nbsp;<strong>胎心音</strong>：双胎以上用“/”间隔。&nbsp;<strong>胎位</strong>：LOA,ROA，LSA，RSA等。&nbsp;<strong>宫缩</strong>：未临产前：无、偶有、敏感、不规则、弱；临产后：弱、中、强。<br/>
      <strong>宫颈</strong>：未开、容一指及宫颈扩张阿拉伯数字。&nbsp;<strong>胎膜</strong>：已、未。&nbsp;<strong>衔接</strong>：已、未、部分。&nbsp;<strong>羊水性状</strong>：清、Ⅰº浑浊、Ⅱº浑浊、Ⅲº浑浊、血性。&nbsp;<strong>管道</strong>：固定通畅 √，阻塞X。<br/>
      <strong>护理安全</strong>：A留陪人；B防压疮；C防跌倒，防坠床；D挂标识、防药物外渗；E挂标识、防脱管；F防烫伤；G其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlaqQt" :data-value="sheetInfo.relObj.hlaqQt"/>。&nbsp;&nbsp;
      <strong>护理措施</strong>：A饮食指导；B心理支持；C指导室内活动；D绝对卧床休息；<br/>E左侧卧位；F头低足高卧位；G指导产妇深呼吸；H指导产妇屏气；I按摩腰骶部；J母乳喂养指导；K会阴护理；L指导排尿M留陪人；N其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQt" :data-value="sheetInfo.relObj.hlcsQt"/>。
    </div> -->
    <!-- 佛山杏坛 护理记录单(产后) -->
    <!-- <div v-if="sheetInfo.sheetType == 'postpartum2_xt'">
      注：<strong>意识</strong>：清醒√；嗜睡＋；模糊±；昏睡＋＋；昏迷＋＋＋；谵妄。&nbsp;<strong>疼痛程度</strong>：0无痛；I轻度；II中度；III重度。&nbsp;<strong>泌乳情况</strong>：少、中、多；&nbsp;<strong>伤口敷料</strong>：A干洁；B渗液；C渗血。<br/><strong>伤口</strong>：正常√，异常：红肿、渗液、
      渗血、水肿。&nbsp;<strong>预防尿潴留</strong>：A指导多饮水、早排尿；B指导排尿时听流水声；C温水冲洗会阴；D热敷按摩膀胱区；E其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.yfQt" :data-value="sheetInfo.relObj.yfQt"/>。&nbsp;<strong>尿液颜色</strong>：A淡黄；B深黄；C棕红；D酱油色；E乳白色；F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.nyysQt" :data-value="sheetInfo.relObj.nyysQt"/>。
      &nbsp;<strong>饮食指导</strong>：A术后饮食；B产后饮食；C催乳饮食；D其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.ysQt" :data-value="sheetInfo.relObj.ysQt"/>。&nbsp;<strong>母乳喂养指导</strong>：A知识宣教；B早接触、早吸吮；C正确哺乳姿势；D挤奶技巧；E郛房热敷及按摩；<br/>F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.zsxjQt" :data-value="sheetInfo.relObj.zsxjQt"/>。&nbsp;<strong>管道</strong>：固定通畅 √，阻塞X。
      &nbsp;<strong>护理措施</strong>: A协助翻身；B指导床上翻身活动；C指导下床活动；D去枕平卧：E指导患者口腔护理；F膀胱功能训练；G指导会阴护理；H指导更换新生儿尿布；I指导新生儿脐部护理；J留置针护理；K出院指导；L其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQt" :data-value="sheetInfo.relObj.hlcsQt"/>。&nbsp;<strong>护理安全</strong>：A留陪人；B防压疮；C防跌倒，防坠床；D挂标识、防药物外渗；E挂标识、防脱管；F防烫伤；G其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlaqQt" :data-value="sheetInfo.relObj.hlaqQt"/>。
    </div> -->
    <!-- 佛山杏坛 护理记录单(妇科专科) -->
    <!-- <div v-if="sheetInfo.sheetType == 'gynaecology2_xt'">
      注：<strong>意识</strong>：清醒√；嗜睡＋；模糊±；昏睡＋＋；昏迷＋＋＋；谵妄。&nbsp;<strong>腹痛部位</strong>：A上腹部左；B上腹部右；C中上腹；D脐周；E下腹部；F全腹；G其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.ftbwQt" :data-value="sheetInfo.relObj.ftbwQt"/>。&nbsp;<strong>疼痛程度</strong>：0无痛；I轻度；II中度；III重度。<br/>
      <strong>阴道分泌物</strong>：A正常；B黄色脓性；C稀薄泡沫状；D豆腐渣样；E血性；F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.twQt" :data-value="sheetInfo.relObj.twQt"/>。&nbsp;<strong>尿液颜色</strong>：A淡黄；B深黄；C棕红；D酱油色；E乳白色；F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.nyysQt" :data-value="sheetInfo.relObj.nyysQt"/>。&nbsp;<strong>伤口敷料</strong>：A干洁；B渗液；C渗血。<br/>
      <strong>伤口</strong>：正常√，异常：红肿、渗液、渗血、水肿。管道：固定通畅 √，阻塞X。&nbsp;<strong>护理安全</strong>：A留陪人；B防压疮；C防跌倒，防坠床；D挂标识、防药物外渗；E挂标识、防脱管；F防烫伤；G其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlaqQt" :data-value="sheetInfo.relObj.hlaqQt"/>。<br/>
      <strong>护理措施</strong>: A协助翻身；B指导床上翻身活动；C指导下床活动；D去枕平卧：E指导患者口腔护理；F膀胱功能训练；G指导会阴护理；H指导用药注意事项；I留置针护理；J饮食指导；K出院指导；L其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQt" :data-value="sheetInfo.relObj.hlcsQt"/>。<br/>
      <strong>阴道出血颜色</strong>：A鲜红；B暗红；C淡红；D咖啡；E其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.cxysQt" :data-value="sheetInfo.relObj.cxysQt"/>。
    </div> -->
    <!-- 佛山杏坛 护理记录单(产科新生儿科) -->
    <!-- <div v-if="sheetInfo.sheetType == 'pediatric3_xt'">
      注：<strong>皮肤颜色</strong>：R-红润、F-潮红、X-黄染、C-青紫、P-苍白。&nbsp;<strong>皮肤弹性</strong>：G-好、S-一般、D-差；&nbsp;<strong>皮疹位置</strong>：H-头面部、N-颈部、U-上肢、L-下肢、O-腋下、T-胸腹、B-背部、S-阴囊、C-肛周、W-全身；<br/>
      <strong>性质程度</strong>：S-散在、M-多发、I-密集，P-表面脓点皮肤未破损、B-表面破损、U表面溃疡； &nbsp;<strong>产瘤、头部血肿位置</strong>：L-左、R-右，T-头顶、F-顶额部；<br/>
      <strong>护理措施</strong>：A预防窒息；B预防坠床；C预防烫伤；D指导外用药；E指导口药服用；F喂养护理；G其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQt" :data-value="sheetInfo.relObj.hlcsQt"/>。&nbsp;<strong>呕吐物性质</strong>：A白色；B黄色；C绿色；D咖啡E其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.otwQt" :data-value="sheetInfo.relObj.otwQt"/>。
    </div> -->
    <!-- 佛山杏坛 护理记录单(儿科) -->
    <!-- <div v-if="sheetInfo.sheetType == 'paediatrician2_xt'">
      注：<strong>精神状态</strong>：A萎靡；B疲乏；C烦躁不安、D易惊；E其他：<input class="bottomInput" type="text" style="width:70px;" v-model="sheetInfo.relObj.jsztQt" :data-value="sheetInfo.relObj.jsztQt"/>。<strong>上呼吸道症状</strong>：A鼻塞；B流涕；C喷嚏；D咽痛；E声音嘶哑；F其他；<input class="bottomInput" style="width:70px;" type="text" v-model="sheetInfo.relObj.hxdzzQt" :data-value="sheetInfo.relObj.hxdzzQt"/>。<strong>气促/呼吸困难</strong>：0无 I轻度 II中度 III重度 A其他：<input class="bottomInput" type="text" style="width:70px;" v-model="sheetInfo.relObj.qcQt" :data-value="sheetInfo.relObj.qcQt"/>。<br/>
      <strong>留置针位置</strong>：A右手B左手C右足D左足E其它：<input class="bottomInput" style="width:70px;" type="text" v-model="sheetInfo.relObj.lzzwzQt" :data-value="sheetInfo.relObj.lzzwzQt"/>。&nbsp;<strong>咳嗽</strong>：A剧咳；B间咳；C犬吠样咳；D、阵发性连声咳；E其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.ksQt" :data-value="sheetInfo.relObj.ksQt"/>。
      &nbsp;<strong>痰液性质</strong>：WL白色稀痰，YWT黄白稀痰，YT黄色稠痰，A其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.tyxzQt" :data-value="sheetInfo.relObj.tyxzQt"/>。<br/><strong>痰量</strong>：+小量（每天＜10ml）；++中量（每天10~100 ml）；+++大量(每天＞100ml)。&nbsp;<strong>呕吐</strong>：A喷射状；B非喷射状。
      &nbsp;<strong>皮肤颜色</strong>：A红润、B潮红、C黄染、D发绀、E青紫、F苍白、G其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.pfysQt" :data-value="sheetInfo.relObj.pfysQt"/>。<br/><strong>脱水貌</strong>：0无，I轻度，II中度，III重度，A其他；<input class="bottomInput" type="text" v-model="sheetInfo.relObj.tsmQt" :data-value="sheetInfo.relObj.tsmQt"/>。&nbsp;<strong>喘息</strong>：A无；B阵发性；C持续性。&nbsp;<strong>疼痛程度</strong>：0无痛；I轻度；II中度；III重度。
      &nbsp;<strong>留置针情况</strong>:A固定通畅、B堵塞、C脱落、D肿胀、E出血、F拔针。<br/><strong>皮疹位置</strong>：A口腔；B手掌；C足底；D膝部；E肛周；F全身；H躯干；I颜面；J双下肢；k其它：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.lzzQt" :data-value="sheetInfo.relObj.lzzQt"/>。&nbsp;<strong>性质</strong>：A斑丘疹；B丘疹；C疱疹；D脓疮疹；E其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.xzQt" :data-value="sheetInfo.relObj.xzQt"/>。
      &nbsp;<strong>程度</strong>：S-散在、M-多发、I-密集；<br/><strong>吸氧方式</strong>：N-鼻导管、F-面罩、H-头罩。&nbsp;<strong>护理安全</strong>：A留陪人；B防坠床；C防药物外渗；D防红臀；E防拔管；F防误吸；G防窒息；H防烫伤；I其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlaqQt" :data-value="sheetInfo.relObj.hlaqQt"/>。
      &nbsp;<strong>护理措施</strong>：A保持呼吸道通畅；B发热护理；C冰袋降温；<br/>D口服药服用指导；E添加辅食指导；F母乳喂养指导；G活动指导；H饮食指导：H1禁食；H2流质饮食；H3半流饮食；H4其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQt" :data-value="sheetInfo.relObj.hlcsQt"/>。I指导臀部护理；J留置针护理；K指导拍背排痰；L口腔护理；N其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQtN" :data-value="sheetInfo.relObj.hlcsQtN"/>。<br/>
      <strong>大便性状颜色</strong>：A黄色稀便； B洗肉水样稀便；C黄色蛋花样便；D米泔样稀水便；E脓血便；F黄色烂便；G其它：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.dbQt" :data-value="sheetInfo.relObj.dbQt"/>。
    </div> -->
    <!-- 佛山杏坛 护理记录单(新生儿专科) -->
    <!-- <div v-if="sheetInfo.sheetType == 'neonatalspecialty2_xt'">
      注：<strong>反应</strong>：G-好、I-激惹、D-差；&nbsp;<strong>哭声</strong>：D-大、S-一般、F-微弱；&nbsp;<strong>吸吮力</strong>：G-好、S-一般、D-差；&nbsp;<strong>喂养</strong>：种类D-母乳、M-代乳；方式S-自吮、N-鼻饲、M-口饲；&nbsp;<strong>咳嗽</strong>：D-干咳、C-咳痰、A-咳喘、B-犬吠样咳；&nbsp;<br/>
      <strong>呕吐</strong>：J-喷射、T-非喷射；<strong>脐部情况</strong>：D-干洁、S-渗液、E-渗血；&nbsp;<strong>皮肤颜色</strong>：R-红润、F-潮红、X-黄染、C-青紫、P-苍白。皮肤弹性：G-好、S-一般、D-差；&nbsp;<strong>皮疹位置</strong>：H-头面部、N-颈部、U-上肢、L-下肢、O-腋下、T-胸腹、<br/>
      B-背部、S-阴囊、C-肛周、W-全身；<strong>性质</strong>：A斑丘疹；B丘疹；C疱疹；D脓疮疹；E其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.xzQt" :data-value="sheetInfo.relObj.xzQt"/>。&nbsp;<strong>程度</strong>：S-散在、M-多发、I-密集，P-表面脓点皮肤未破损、B-表面破损、U表面溃疡；&nbsp;<strong>痰液性质</strong>：WL-白色稀痰、YWT-黄白稀痰、YT-黄色稠痰、 B-血性痰 ；<strong>痰量</strong>：小量+、中量++、大量+++；&nbsp;<strong>产瘤、头部血肿位置</strong>：L-左、R-右，T-头顶、F-顶额部；&nbsp;<strong>吸氧方式</strong>：N-鼻导管、F-面罩、W-箱内、M-机械通气、H-头罩。&nbsp;<strong>护理安全</strong>：A留陪人；B防坠床；<br/>
      C防药物外渗；D防红臀；E防拔管；F防误吸；G防窒息；H防烫伤；I其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlaqQt" :data-value="sheetInfo.relObj.hlaqQt"/>。
    </div> -->
    <!-- 佛山杏坛 护理记录单(消化专科) -->
    <!-- <div v-if="sheetInfo.sheetType == 'gastroenterology_xt'">
      注：<strong>意识</strong>：清醒√；嗜睡＋；模糊±；昏睡＋＋；昏迷＋＋＋；A谵妄；B药眠。&nbsp;<strong>瞳孔对光反射</strong>：灵敏√；迟钝+；消失－。&nbsp;<strong>恶心</strong>：A持续性；B间；C无。&nbsp;<strong>反酸</strong>：A间；B缓解。&nbsp;<strong>嗳气</strong>：A间；B缓解。&nbsp;<strong>呕吐</strong>：A胃内容物；B咖啡渣样物；C暗红色血液；D鲜血；E其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.otQt" :data-value="sheetInfo.relObj.otQt"/>。
      <strong>管道</strong>：通畅 √，阻塞X。&nbsp;<strong>腹痛部位</strong>：A上腹部□左□右B中上腹；C脐周；D下腹部□左□右；E全腹；F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.ftbwQt" :data-value="sheetInfo.relObj.ftbwQt"/>。<strong>腹痛程度</strong>：0无痛；I轻度；II中度；III重度。<strong>咳嗽</strong>：A剧咳；B间咳;C缓解。
      &nbsp;<strong>水肿护理</strong>：A抬高15cm；B保护水肿皮肤；C其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.szhlQt" :data-value="sheetInfo.relObj.szhlQt"/>。
      &nbsp;<strong>护理措施</strong>：A卧床休息；B心理支持；C协助翻身；D指导活动；E饮食指导（E1禁食；E2低盐低脂饮食；E3糖尿病饮食；E4流质饮食；E5半流质饮食；E6低嘌呤饮食；E7优质蛋白饮食；E8其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQt" :data-value="sheetInfo.relObj.hlcsQt"/>。）；F局部热疗G指导有效咳嗽；H膀胱功能训练；I指导皮肤清洁；J肢体功能锻炼；K其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQtK" :data-value="sheetInfo.relObj.hlcsQtK"/>。<br/>
      <strong>护理安全</strong>：A留陪人；B防压疮；C防跌倒；D防坠床；E防药物外渗；F防失禁性皮炎；G防拔管；H防误吸；I防窒息；J防烫伤；K防走失；L其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlaqQt" :data-value="sheetInfo.relObj.hlaqQt"/>。
      &nbsp;<strong>启用相关护理表格</strong>：A住院患者跌倒/坠床危险因素评估护理单；B基本生活活动能力量表；C吞咽功能障碍评定记录单；D糖尿病足护理记录单；E压疮风险护理单；F压疮伤口护理单；H危重症患者转运护理单；I输血安全护理单；N其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.qybgQt" :data-value="sheetInfo.relObj.qybgQt"/>。
    </div> -->
    <!-- 佛山杏坛 护理记录单(内三科通用单) -->
    <!-- <div v-if="sheetInfo.sheetType == 'care3_xt'">
      注：<strong>意识</strong>：清醒√；嗜睡＋；模糊±；昏睡＋＋；昏迷＋＋＋；A谵妄；B药眠：C其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.ysQt" :data-value="sheetInfo.relObj.ysQt"/>。&nbsp;<strong>瞳孔对光反射</strong>：灵敏√；迟钝+；消失－。疼痛：0无，I轻度，II中度，III重度。&nbsp;<strong>伤口敷料</strong>：A干洁；B渗液；<br/>C渗血；D其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.skflQt" :data-value="sheetInfo.relObj.skflQt"/>。
      <strong>管道</strong>：固定通畅 √，阻塞X。<strong>引流液颜色</strong>：A淡黄；B深黄；C棕红；D酱油；E乳白；F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.ylyQt" :data-value="sheetInfo.relObj.ylyQt"/>。<strong>深静脉</strong>：留置位置：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.lzwz" :data-value="sheetInfo.relObj.lzwz"/>。
      <strong>穿刺口情况</strong>：正常√；红肿+；渗液++；渗血+++；X其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.cckQt" :data-value="sheetInfo.relObj.cckQt"/>。<strong>是否留管</strong>：Y是；N否。<strong>护理措施</strong>：A绝对卧床休息；B卧床休息；C去枕平卧；D协助翻身；E指导下床活动；F指导(主动/被动)运动；G饮食指导（G1禁饮食;G2低盐低脂饮食;G3糖尿病饮食;G4流质饮食;G5半流质饮食;G6低嘌呤饮食;G7粗纤维饮食;G8少渣半流饮食；G9 普食；G10其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQt" :data-value="sheetInfo.relObj.hlcsQt"/>。）；H嘱其更换体位时动作宜慢；I1指导有效咳嗽：I2、指导有效咳痰；I3指导呼吸肌功能锻炼；J肢体功能训练；K膀胱功能训练；L预防足下垂；N指导皮肤清洁；M心理支持；O（O1压疮护理,O2防压疮护理,）; P适时翻身; Q用药指导；R低血糖反应的告知；T禁烟酒；U其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.UQt" :data-value="sheetInfo.relObj.UQt"/>。
      <strong>护理安全</strong>：A留陪人；B防压疮；C防跌倒；D防坠床；E防药物外渗；F防失禁性皮炎；G防拔管；H防误吸；I防窒息；J防烫伤；K防走失;L其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlaqQt" :data-value="sheetInfo.relObj.hlaqQt"/>。<strong>咳嗽</strong>：A剧咳；B间咳；C 缓解；E其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.ksQt" :data-value="sheetInfo.relObj.ksQt"/>。<strong>痰液性质</strong>：A白色（1稀痰；2粘痰）;B黄白色（1稀痰；2粘痰）;C铁锈色（1稀痰；2粘痰）;D黄色（1稀痰；2粘痰）；E无;F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.tyxzQt" :data-value="sheetInfo.relObj.tyxzQt"/>。
      <strong>气促</strong>：A持续性，B减轻，C活动后，D缓解。<strong>乏力</strong>： A持续性 B减轻 C缓解 <strong>麻木</strong>：A持续性 B间 C缓解<strong>(头/眩)晕</strong>：A持续性 B间 C缓解 D无 肿胀： 0无；I轻度；II中度；III重度。<strong>皮肤温度</strong>：A温暖；B偏高；C凉；D冰冷。<strong>皮肤颜色</strong>：A红润；B潮红；C黄染；D青紫；E苍白。<strong>多饮/多食/多尿</strong>：A持续性 B减轻 C缓解。
    </div> -->
    <!-- 佛山杏坛 外一护理记录单 -->
    <!-- <div v-if="sheetInfo.sheetType == 'care2_xt'">
      注：<strong>意识</strong>：①清醒；②嗜睡；③模糊；④浅昏迷；⑤深昏迷；⑥谵妄。&nbsp;<strong>瞳孔对光反射</strong>：灵敏√；迟钝＋；消失－。&nbsp;<strong>疼痛/肿胀</strong>：○无;I轻度;II中度;III重度。&nbsp;<strong>伤口敷料</strong>：①干洁；②渗液；③渗血；④无。<br/>
      <strong>呕心物/引流液/尿液颜色</strong>：A淡黄；B深黄；C淡红色；D鲜红色；E暗红色；F褐色；G草绿色；H墨绿色；I白色；J其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.jQt" :data-value="sheetInfo.relObj.jQt"/>。&nbsp;<strong>留置尿管/留置胃管/留置镇痛泵/深静脉置管/伤口引流管</strong>：①固定通畅；<br/>②夹管；③堵塞；④脱管；⑤拔管；<strong>穿刺口情况</strong>：①正常；②红肿；③渗液；④渗血。
      <strong>护理措施</strong>：A绝对卧床休息；B卧床休息；C半坐位；D抬高患肢；E指导下床活动；F协助翻身；G指导有效咳嗽；H肢体功能训练；I膀胱功能训练；J预防足下垂；K指导皮肤清洁；L心理支持；M去枕平卧；N:口腔护理；O:压疮护理；P q2h翻身拍背；R其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.rQt" :data-value="sheetInfo.relObj.rQt"/>。
      <strong>护理安全</strong>：A留陪人；B防跌倒；C防坠床；D防脱管；E防烫伤；F防压疮；G防走失；H防窒息；I防误吸；J防拔管；K防药物外渗；L防失禁性皮炎; M住院期间禁烟酒。
      <strong>启用相关护理表格</strong>：①基本生活活动能力量表；②住院患跌倒/坠床危险因素评估护理单；③糖尿病足护理单；④压疮风险护理单；⑤输血安全护理单；⑥危重症患者转运护理单；⑦压疮伤口护理单; ⑧吞咽功能障碍评定记录表；⑨格拉斯哥评分；⑩深静脉血栓观察护理单。&nbsp;<strong>皮肤颜色</strong>：①正常；②暗红；③青紫；④淤黑；⑤苍白；⑥黄染；⑦潮红。
    </div> -->
    <!-- 佛山杏坛 护理记录单 -->
    <!-- <div v-if="sheetInfo.sheetType == 'general2_xt'">
      注：<strong>意识</strong>：①清醒；②嗜睡；③模糊；④昏睡；⑤浅昏迷；⑥深昏迷⑦谵妄；⑧麻醉未醒。<strong>瞳孔对光反射</strong>：灵敏＋；迟钝±；消失－。<strong>护理安全</strong>：①留陪人；②防压疮；③防跌倒；④防坠床；⑤防药物外渗；<br/>
      ⑥防失禁性皮炎；⑦防脱管；⑧防误吸；⑨防窒息；⑩防烫伤。<strong>护理措施</strong>：①绝对卧床休息；②卧床休息；③翻身；④指导下床活动；⑤指导锻炼；⑥指导拐杖使用；⑦患肢外展中立位；⑧患肢丁字鞋；⑨预防足下垂；<br/>⑩其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQt" :data-value="sheetInfo.relObj.hlcsQt"/>。
      <strong>肿胀</strong>：①无；②轻度；③中度；④重度。皮温：①温暖；②偏高；③凉；④冰冷。<strong>皮肤颜色</strong>：①正常；②暗红；③青紫；④淤黑；⑤苍白；⑥浅灰；⑦花斑状。<strong>运动</strong>：①正常；②乏力；<br/>
      <strong>感觉</strong>：①正常；②过敏；③麻木；④减退；⑤消失。<strong>伤口创面/伤口敷料</strong>：①干洁；②渗液；③渗血；④拆除；⑤结痂；⑥愈合。<strong>石膏固定</strong>：①正常；②异常；③拆除。<strong>饮食指导</strong>：①禁食；②低盐饮食；③低脂饮食；<br/>
      ④低盐低脂饮食；⑤糖尿病饮食；⑥流质饮食；⑦半流质饮食；⑧低嘌呤饮食；⑨普食；⑩低蛋白饮食。
      <strong>牵引</strong>：①有效②无效；<strong>颜色性状</strong>：①血性质；②淡红色液；③暗红色液；④黄色液；⑤淡黄色液；⑥深黄色液；⑦澄清；<strong>留置尿管/留置镇痛泵/留置胃管/深静脉管/伤口引流管</strong>：①固定通畅②堵塞③脱出④拔管；<strong>腹部情况</strong>：①平软②膨隆 ③腹肌紧张；<strong>疼痛评分</strong>：用数字式0-10代替文字来表示疼痛程度。<strong>呕吐</strong>：①一般；②喷射性；③无。<br/>
      <strong>肌张力</strong>：①高；②低；③正常。<strong>肌力</strong>：①0级；②1级；③2级；④3级；⑤4级；⑥5级。体位：①平卧；②半坐卧。
    </div> -->
    <!-- 佛山杏坛 护理记录单（颅脑）护理记录单（骨折）护理记录单（通用）护理记录单（脊柱） -->
    <div v-if="sheetInfo.sheetType == 'craniocerebral_xt'||sheetInfo.sheetType == 'fracture_xt'||sheetInfo.sheetType == 'general_xt'||sheetInfo.sheetType == 'spine_xt'">
      注： <strong>意识</strong>：清醒√  嗜睡+  浅昏迷++  深昏迷+++；&nbsp;<strong>瞳孔对光反射</strong>：灵敏+  迟钝±  消失－
    </div>
    <!-- 佛山杏坛 护理记录单(心血管呼吸专科) -->
    <!-- <div v-if="sheetInfo.sheetType == 'cardiovascular_xt'">
      注：<strong>意识</strong>：清醒√；嗜睡－；模糊Δ；昏睡±；浅昏迷＋；中昏迷＋＋；深昏迷＋＋＋；A谵妄；B药眠。
      <strong>瞳孔对光反射</strong>：灵敏＋；迟钝±；消失－。<strong>管道</strong>：A固定通畅；B夹管；C阻塞；D拔除。
      <strong>体位</strong>：A自由体位；B半坐卧；C端坐位。<br/>D其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.twQt" :data-value="sheetInfo.relObj.twQt"/>。<strong>气促</strong>：A持续；B减轻；C活动后；D缓解。
      <strong>咳痰</strong>：A白色稀痰；B白色粘痰；C黄白色稀痰；D黄白色粘痰；E无；F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.ktQt" :data-value="sheetInfo.relObj.ktQt"/>。<strong>口唇/面色/肢端颜色</strong>：A发绀；B微绀；C红润；D苍白；F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.ysQt" :data-value="sheetInfo.relObj.ysQt"/>。
      <strong>咳嗽/心悸/胸闷//眩晕/头晕/恶心/乏力/<input class="bottomInput" type="text" v-model="sheetInfo.relObj.bt1" :data-value="sheetInfo.relObj.bt1"/>/<input class="bottomInput" type="text" v-model="sheetInfo.relObj.bt2" :data-value="sheetInfo.relObj.bt2"/>/<input class="bottomInput" type="text" v-model="sheetInfo.relObj.bt3" :data-value="sheetInfo.relObj.bt3"/>/<input class="bottomInput" type="text" v-model="sheetInfo.relObj.bt4" :data-value="sheetInfo.relObj.bt4"/></strong>：A持续；B减轻；C间；D缓解；E无。
      <strong>疼痛程度</strong>：0无痛，I轻度；II中度；III重度。
      <strong>吞咽困难/饮水呛咳</strong>：A有；B间；C无。
      <strong>呕吐</strong>：A胃内容物；B咖啡渣样物；C暗红色血液；D鲜血；E无；  F其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.otQt" :data-value="sheetInfo.relObj.otQt"/>。
      <strong>水肿部位</strong>：A <input class="bottomInput" type="text" v-model="sheetInfo.relObj.bwA" :data-value="sheetInfo.relObj.bwA"/>；B <input class="bottomInput" type="text" v-model="sheetInfo.relObj.bwB" :data-value="sheetInfo.relObj.bwB"/>；C <input class="bottomInput" type="text" v-model="sheetInfo.relObj.bwC" :data-value="sheetInfo.relObj.bwC"/>D <input class="bottomInput" type="text" v-model="sheetInfo.relObj.bwD" :data-value="sheetInfo.relObj.bwD"/>；E <input class="bottomInput" type="text" v-model="sheetInfo.relObj.bwE" :data-value="sheetInfo.relObj.bwE"/>；
      <strong>水肿程度</strong>：轻度+；中度++；<br/>重度+++；消退－。
      <strong>水肿护理</strong>：A抬高患肢15CM；B保护水肿皮肤；C停抬高患肢15cm，D其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlQt" :data-value="sheetInfo.relObj.hlQt"/>。
      <strong>护理措施</strong>：A绝对卧床休息；B卧床休息；C适时翻身；D防压疮护理；E压疮护理；F指导有效咳嗽；G呼吸肌功能锻炼；H肢体功能训练；I言语功能训练；J膀胱功能训练；K保暖；L腹部环形按摩；M指导保持皮肤清洁；P指导使用降糖药的注意事项；Q告知低血糖的症状及处理措施；R<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsR" :data-value="sheetInfo.relObj.csR"/>使用约束带，约束处皮肤完整，肢端血运良好；T指导办理出院手续，已作出院饮食服药活动随访宣教；N其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.hlcsQT" :data-value="sheetInfo.relObj.csQT"/>。
      <strong>饮食指导</strong>：A禁食； B低盐低脂饮食；C糖尿病饮食；D流质饮食；E半流质饮食；F低嘌呤饮食； G粗纤维饮食；H其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.zdQt" :data-value="sheetInfo.relObj.zdQt"/> 。
      <strong>护理安全</strong>：A留陪人； B防跌倒；C防坠床；D防药物外渗；<br/>E防失禁性皮炎；F防拔管；G防误吸；H防窒息；I防烫伤；J防走失；K其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.aqQt" :data-value="sheetInfo.relObj.aqQt"/>。
      <strong>启用相关护理表格</strong>：A住院患者跌倒/坠床危险因素评估护理单；B基本生活活动能力量表；C吞咽功能障碍评定记录单；D糖尿病足护理单；<br/>E压疮风险护理单；F压疮伤口护理单；H危重症患者转运护理单；I 输血安全护理单；N其他：<input class="bottomInput" type="text" v-model="sheetInfo.relObj.bgQt" :data-value="sheetInfo.relObj.bgQt"/>。
    </div> -->
    <!-- 佛山杏坛 护理记录单（全院通用） -->
    <!-- <div v-if="sheetInfo.sheetType == 'generalnursing_xt'">
      注：<strong>意识</strong>：①清醒；②嗜睡；③模糊；④昏睡；⑤浅昏迷；⑥中昏迷；⑦深昏迷；⑧谵妄；⑨药眠。&nbsp;<strong>瞳孔反射</strong>：灵敏√；迟钝＋；消失－。
    </div> -->
    <!-- 武汉肺科 非手术科室护理记录单,-->
    <div v-if="sheetInfo.sheetType == 'nonsurgicalcare_fk'">
        说明：1、观察内容无异常时，用“N”来表示，异常时如实描述。2、常用护理措施代码：⑴口腔护理 ⑵会阴护理 ⑶清洁面部 ⑷温水擦浴 ⑸气管切开护理 ⑹吸痰 ⑺预防压疮护理 ⑻雾化吸入 ⑼更换引流装置
        ⑽保护性约束 ⑾AV置管护理 ⑿膀胱冲洗 ⒀间断夹闭导管 ⒁气管内滴药。3、意识代码：A清楚 B嗜睡 C模糊 D昏睡 E昏迷 F镇静状态
    </div>
    <!-- 武汉肺科 手术科室记录单,-->
    <div v-if="sheetInfo.sheetType == 'operating_fk'">
        说明：1、观察内容无异常时，用“N”来表示，异常时如实描述。<br/>
        2、常用护理措施代码：⑴口腔护理 ⑵会阴护理 ⑶清洁面部 ⑷温水擦浴 ⑸气管切开护理 ⑹吸痰 ⑺预防压疮护理 ⑻雾化吸入 ⑼更换引流装置 ⑽保护性约束 ⑾AV置管护理 ⑿膀胱冲洗 ⒀间断夹闭导管 ⒁气管内滴药。<br/>
        3、意识代码：A清楚 B嗜睡 C模糊 D昏睡 E昏迷 F镇静状态
    </div>
    <!-- 佛山市一  护理记录单(眼科通用)-->
    <div v-if="sheetInfo.sheetType == 'eyegeneral_fs'">
      注：1、空格栏书写内容为：①专科护理措施②专科评估内容③专科观察内容 ④健康教育内容 ⑤检验危机值，请按各科具体指进行书写<br/>
          2、如专科有神志：清醒√  嗜睡＋ 浅昏迷++、瞳孔观察一瞳孔对光反应：灵敏 迟钝 消失。<br/>
          3、护理措施：吸痰、雾化吸入、口腔护理、床上浴、更换尿袋、会阴冲洗、床上洗头、膀胱冲洗、胃管冲洗、十二指肠冲洗
    </div>
    <!-- 佛山市一  护理记录单(眼科通用)-->
    <div v-if="sheetInfo.sheetType == 'postpartum_fs'">
      注：1.乳房情况：用“硬”、“软”来描述。 2.泌乳情况：用“少”、“中等”、“多”来描述。 3.子宫收缩情况：用“硬”、“软”来描述。<br/>
      4.宫底高度：以横指为单位，平脐：U=0，脐上一横指：U+1,脐下一横指：U-1<br/>
      5.伤口情况：正常体征以“(-)”,异常体征如“红肿”、“渗液”“水肿”等以简单文字描述。
    </div>
    <div v-if="sheetInfo.sheetType == 'orthopaedic_fs'">
    备注：<br/>
     1、神志：清醒√，嗜睡+，昏睡*，昏迷++，深昏迷+++；<br/>
     2、瞳孔：对光反射灵敏√，对光反射迟钝+，对光反射消失++。
    </div>
    <div v-if="sheetInfo.sheetType == 'criticallyill_fs'">
    备注：<br/>
     1、神志：清醒√，嗜睡+，昏睡*，昏迷++，深昏迷+++；<br/>
     2、瞳孔：对光反射灵敏√，对光反射迟钝+，对光反射消失++。
    </div>
    <div v-if="sheetInfo.sheetType == 'prenatal_fs'">
      注：1、胎位写如“LOA”,孕周小不清写“不清”。 2、宫缩：未临产前以“无、偶有、不规则、弱”描述；临产后以“弱、中、强”描述强度的情况；<br/>
      3、阴道流血以“无、少许、5ml”等表示； 4、宫颈以“未开、容一指、1cm、2cm”等描述； 5、先露高低：以“S+1、S=0、S-1”等描述。<br/>
      6、胎膜以“已、未”表示； 7、羊水性状，以“清、、I°浑浊、II°浑浊、III°浑浊”或其他文字如“血性”描述。
    </div>
    <!--  -->
    <div v-if="sheetInfo.sheetType == 'areageneral_fs'">
      注：1、神志：清醒√、嗜睡+、昏睡、浅昏迷++、深昏迷+++、模糊、谵妄、植物状态、睁眼昏迷<br/>2、瞳孔观察—瞳孔对光反应：灵敏√  迟钝+  消失++<br/>
         3、肢体：关节僵硬A、挛缩B、足下垂C、肿胀D肩痛E、肩关节半脱位F <br/> 4、瞳孔形状：不规则、术后改变
    </div>
    <!-- 佛山市一  盐酸利托君(安宝)观察记录单 -->
    <div v-if="sheetInfo.sheetType == 'hydrochloricacid_fs'">
      备注：1、加一瓶液体时（开始使用及更换液体时）填写浓度；<br/>2、每天8:00和停止使用时划双杠红横线，并写清楚起止时间和签名；<br/>
         3、特殊情况如“停止滴注盐酸利托君”或“孕妇心率≥140次/分，调慢滴速至15滴/分，并报告医生；”<br/> 4、开始滴注前测生命体征一次，滴注后每小时测一次，连续测4次，没异常的病人每班测一次，每2小时测滴速一次并记录。
    </div>
    <!-- 佛山市一  硫酸镁注射静脉滴注观察记录 -->
    <div v-if="sheetInfo.sheetType == 'magnesiumsulf_fs'">
      备注：1、硫酸镁静脉滴注时每2h观察一次，有异常情况时随时记录；<br/>2、膝反射：以“存在+”、“减弱”或“消失-”表示；<br/>
         3、宫缩：以“持续时间s/间隔时间min”如“30/3”或“无、偶有、不规则”等表示；<br/> 4、每24h或停止使用时统计尿量一次，统计时划双红横线，并写清楚统计的起止时间和签名。
    </div>
    <!-- 顺德龙江 - 新生儿护理记录单-->
    <div v-if="sheetInfo.sheetType == 'neonate_sdlj'">
      说明：意识判断：①清醒 ②嗜睡 ③昏睡 ④模糊 ⑤昏迷 ⑥谵妄；&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;气道护理：①雾化吸入 ②气道吸痰 ③口鼻腔吸痰；&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;病&nbsp;&nbsp;情：①告病重 ②告病危；<br/>
      &nbsp;&nbsp;&nbsp;清洁护理：①沐浴  ②床上擦浴 ③口腔护理 ④臀部护理 ⑤更衣；&nbsp; &nbsp;专科护理：①脐部护理 ②胃管护理  ③灌肠；&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;脐部情况：①干净 ②渗血 ③红肿 ④脓性分泌物；<br/>
      &nbsp;&nbsp;&nbsp;光疗情况：①安睡 ②哭闹烦燥 ③尖叫 ④体温异常 ⑤皮疹；&nbsp; &nbsp;&nbsp;&nbsp;光疗护理：①戴眼罩，保护外阴，戴手套脚套；&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;对光反射：灵敏(+) 迟钝(±) 消失(-)；<br/>
      &nbsp;&nbsp;&nbsp;瞳孔判断：单位㎜；&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;肤&nbsp;&nbsp;色：①红润 ②黄染 ③苍白 ④苍灰 ⑤干燥 ⑥紫绀；&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;哭&nbsp;&nbsp;声：①响 ②弱 ③呻吟；<br/>
      &nbsp;&nbsp;&nbsp;留 置 针：①正常 ②拔除 ③重置 ④封管；&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 肛周皮肤：①正常 ②皮疹 ③潮红 ④破溃、脱皮 ⑤糜烂；&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;喂养方式：①自吮 ②饲奶 ③禁食；<br/>
      &nbsp;&nbsp;&nbsp;吸氧方式：①鼻导管 ②面罩 ③CPAP ④有创通气
    </div>
    <!-- 顺德龙江 - 护理记录单（颅脑外科）-->
    <div v-if="sheetInfo.sheetType == 'craniocerebral_sdlj'">
      备注：意识：清√，嗜睡+，浅昏迷++，深昏迷+++，药眠。&nbsp; &nbsp;瞳孔对光反射判断：灵敏√，迟钝+，消失－。
    </div>
    <!-- 顺德龙江 - 护理记录单（泌尿外科）-->
    <div v-if="sheetInfo.sheetType == 'urology_sdlj'">
      备注：①意识：清√，嗜睡+，浅昏迷++，深昏迷+++，药眠。
    </div>
    <!-- 顺德龙江 - 儿科护理记录单-->
    <div v-if="sheetInfo.sheetType == 'pediatrics_sdlj'">
      说明：<strong>意识判断</strong>：①清醒 ②嗜睡 ③昏睡 ④模糊 ⑤昏迷 ⑥谵妄&nbsp;&nbsp;&nbsp;&nbsp;<strong>瞳&nbsp;&nbsp;孔</strong>：大小用阿拉伯数字表示，单位mm，&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>对光反射</strong>：灵敏（+） 迟钝（±） 消失（-）<br/>
      &nbsp;&nbsp;&nbsp;<strong>吸氧方式</strong>：①鼻导管 ②面罩 ③CPAP ④有创通气&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>清洁护理</strong>：①沐浴 ②床上擦浴 ③口腔护理 ④臀部护理 ⑤更衣&nbsp; <strong>气道护理</strong>：①雾化吸入  ②气道吸痰 ③口鼻腔吸痰<br/>
      &nbsp;&nbsp;&nbsp;<strong>物理降温</strong>：①温水浴 ②冰敷 ③酒精擦浴 ④退热贴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>饮食护理</strong>：①全流 ②半流 ③普食 ④少量多餐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>咳&nbsp;&nbsp;嗽</strong>：①刺激性干咳 ②咳嗽时闻及痰音 ③犬吠样咳<br/>
      &nbsp;&nbsp;&nbsp;<strong>小&nbsp;&nbsp;便</strong>：①正常 ②尿路刺激症 ③洗肉水样 ④酱油样 ⑤血尿
      &nbsp;<strong>大&nbsp;&nbsp;便</strong>：①成形黄软 ②蛋花汤样 ③果冻样 ④柏油样 ⑤豆腐渣样&nbsp;<br/>
      &nbsp;&nbsp;&nbsp;<strong>痰液性状</strong>：①粘液性 ②白色泡沫 ③脓性 ④血性 ⑤分层痰 ⑥乳白糊状 ⑦其它
    </div>
    <!-- 顺德龙江 - 呼吸专科护理记录单-->
    <div v-if="sheetInfo.sheetType == 'dreathe_sdlj'">
      说明: 1、护理记录单大部分项目可打“√”，表中无涉及的内容或表达不清的问题请在特殊记录栏内用文字说明。&nbsp; &nbsp;2、有呼吸困难者,在相应空格中描述轻度、中度、重度。<br/>
      3、痰液的性质用符号表示:白色稀痰WL/黄白稠痰YWT/黄色稠痰YT/血性痰B。&nbsp; &nbsp;4、痰量：小量+/中量++/大量+++。<br/>
      5、有胸痛者，在特殊记录栏内用文字说明胸痛的部位、性质、程度、持续时间并记录加重、缓解的因素，如“呼吸、咳嗽时加剧”等。<br/>
      6、健康教育：用相应的字母表示。A：检查宣教 B：用药指导 C：饮食指导 D：用氧安全 E：疾病知识 F：康复指导 G：腹式呼吸 H：缩唇呼吸 I：其他。  <br/>
      7、神志：A清 B昏睡 C浅昏迷 D深昏迷 E谵妄   &nbsp; &nbsp;    8、瞳孔  &nbsp; &nbsp;    对光反射：A存在 B迟钝 C无 &nbsp; &nbsp;  直径：A  &lt;2mm  B  2-5mm  C  &gt;5mm

    </div>
    <!-- 顺德龙江 - 护理记录单（骨科）-->
    <div v-if="sheetInfo.sheetType == 'orthopaedic_sdlj'">
      书写说明：
      ⑴ 体位：A=抬高；B=抬高制动；C=外展中立位；D=外展位；
      ⑵ 颜色：A=红润；B=黑色；C=瘀紫色；D=暗红；E=苍白；F=花斑 G=粉红；
      ⑶ 皮温：A=温暖；B=低于健侧；C=稍低于健侧；D=冰凉；E=高于健侧；
      ⑷ 肿胀：A=无；B=I度；C=II度；D=III度；
      ⑸ 感觉：A=正常；B=稍麻；C=麻痹；D=消失；
      ⑹ 活动：A=正常；B=轻度受限；C=中度受限；D=重度受限；E=障碍；
      ⑺ 毛细血管反应：A=偏快＜1秒；B=正常1~2秒；C=偏慢＞2秒；D=消失；
      ⑻ 动脉搏动：A=正常；B=减弱；C=无；
      ⑼ 伤口敷料：A=干洁；B=少量渗血/渗液；C=中量渗血/渗液；
      ⑽ 石膏：A=过紧；B=过松；C=合适；
      ⑾ 牵引：A=过紧；B=过松；C=合适；
      ⑿ 指引功能锻炼：A=趾端伸屈；B=踝泵运动；C=股四头肌等长收缩运动；D=直腿抬高运动；E=膝关节屈曲运动；F=坐位训练；G=站立训练；H=扶拐行走训练；I=扶助；行架行走训练；J=未固定关节运动；K=指端伸屈；L=握拳训练；M=腕关节旋转运动；N=抬臂运动；O=肩关节环形运动；P=扩胸运动；
      ⒀ 皮肤完整性：A=完整；B=发红；C=破损;D=渗液；E=结痂；⒁护理措施：A=防足下垂；B=患肢保暖；C=受压处皮肤垫软垫;D=翻身；E=拍背;F=指导深呼吸及有效咳嗽等预防并发症； G=针眼护理；H=防压疮
    </div>
     <!-- 顺德龙江 - 护理记录单（显微外科））-->
    <div v-if="sheetInfo.sheetType == 'microsurgical_sdlj'">
      <p> <span style="margin-right:91px">书写说明：①伤口敷料：A、干洁　B、少量渗血/渗液　C、中量渗血/渗液　D、大量渗血/渗液</span><span>②石膏固定：A、正常　B、过紧　C、过松</span></p>
      <p style="margin-left:65px">③皮瓣固定带：A、正常　B、过紧　C、过松</p>
      <p style="margin-left:65px">④功能锻炼：A、踝泵运动　B、股四头肌等长收缩运动 C、直腿抬高运动　D、抬臂运动　E、患指关节主动运动　F、患指关节被动运动　G、肩、肘、腕关节锻炼</p>
      <p style="margin-left:65px"><span style="margin-right:211px">⑤颜色：A、红润   B、苍白  C、微紫  D、暗红  E、紫绀  F、花斑</span>⑥皮温：A、正常　B、偏低　 C、偏高</p>
      <p style="margin-left:65px"><span style="margin-right:333px">⑦肿胀：A、无   B、Ⅰ度  C、Ⅱ度  D、Ⅲ度</span>⑧感觉：A、无　　B、麻痹　 C、消失</p>
    </div>
    <!-- 顺德龙江 - 护理记录单（神经内科）-->
    <div v-if="sheetInfo.sheetType == 'neurology_sdlj'">
      备注：意识：清√，嗜睡+，浅昏迷++，深昏迷+++，药眠。&nbsp; &nbsp;瞳孔对光反射判断：灵敏√，迟钝+，消失－。
    </div>
    <!-- 顺德龙江 - 护理记录单（综合介入科）-->
    <div v-if="sheetInfo.sheetType == 'intervent_sdlj'">
      备注：意识：清√，嗜睡+，浅昏迷++，深昏迷+++，药眠。&nbsp; &nbsp;瞳孔对光反射判断：灵敏√，迟钝+，消失－。
    </div>
    <!--武汉亚心 -  新生儿科护理记录单-->
    <div v-if="sheetInfo.sheetType == 'neonatology_yx'">
       备注：N表示正常 管道名称：A-留置针、B-深静脉置管、C-尿管、D-胃管、E-心包纵隔管、F-右胸腔管、G-心包引流管、H-左胸腔管、I-动脉置管、J-气管插管、O-PICCO管、P-腹腔引流管、Q-脑积液引流管、R-PICC管<br/>
       护理措施代码：01-晨间护理、02-晚间护理、03-口腔护理、04-尿道口护理、05-跌倒高危护理、06-管道高危护理、07-预防压疮护理、08-动静脉置管护理、09-肢体按摩、10-物理降温、11-肺部体疗、12-冷热湿敷、13-臀部护理、<br/>14-挤捏引流管、15-脐部护理、16-眼部护理
    </div>
    <!--武汉亚心 -  护理记录单-->
    <div v-if="sheetInfo.sheetType == 'common_yx'">
      <p>
       备注：N表示正常 管道名称：A-留置针、B-深静脉置管、C-尿管、D-胃管、E-心包纵隔管、F-右胸腔管、G-心包引流管、H-左胸腔管、I-动脉置管、J-气管插管、K-气管切开管、L-血滤管、M-主动脉球囊反搏管、N-漂浮导管、<br/>
       <span style="margin-left:38px">O-PICCO管、P-腹腔引流管、Q-脑积液引流管、R-PICC管</span>
      </p>
      <p>
       护理措施代码：01-晨间护理、02-晚间护理、03-口腔护理、04-尿道口护理、05-跌倒高危护理、06-管道高危护理、07-预防压疮护理、08-动静脉置管护理、09-肢体按摩、10-物理降温、11-肺部体疗、12-冷热湿敷、<br/>
       <span style="margin-left:38px">13-臀部护理、14-挤捏引流管、15-保护性约束、16-气垫床充放气、17-预防下肢血栓护理、18-气切护理、19-人工协助排便</span>
      </p>
    </div>
    <!--佛山市一 -  麻醉科IPACU护理记录单-->
    <!-- <div v-if="sheetInfo.sheetType == 'ipacu_fs'">
       注：1.神志：麻醉未醒“①”，清醒“②”，谵妄“③”，嗜睡“④”，昏睡“⑤”，浅昏迷“⑥”，中度昏迷“⑦”，深昏迷“⑧”。镇静状态“⑨”。
    </div> -->
    <!--925医院 -  患者护理记录单-->
    <div v-if="sheetInfo.sheetType == 'nurse_jew'||sheetInfo.sheetType == 'danger_nurse_jew'">
      备注：意识/神志清醒√、嗜睡/意识模糊+、昏睡++、浅昏迷+++、深昏迷++++；瞳孔对光反射：灵敏√、迟钝+、消失++；护理记录单横线上填一般或者危重。
    </div>
    <!-- 广东同江 - 新生儿护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'baby_tj'">
      注：1、意识选择：清醒	嗜睡+ 浅昏迷++ 深昏迷+++；&nbsp;2、体位：左侧：L，右侧：R，平卧：S；&nbsp;3、反应：以“好”、“激惹”、“一般”、“差”表示；&nbsp;4、哭声：以“响亮”、“微弱”表示；<br/>
      5、吸吮力：以“好”、“一般”、“差”表示；&nbsp;6、护理措施项目可填于空白项目栏：如病危、病重、吸痰，吸氧、雾化，膀胱冲洗，臀部护理、口腔护理，兰光治疗、留置针、心电监护、叩背排痰等。
    </div>
    <div v-if="sheetInfo.sheetType == 'babymonitor_linyi'">
      备注：奶种类：①足月配方奶  ②早产儿配方奶  ③母乳  ④无乳糖配方奶    喂入方式：①口入  ②胃管 ③先口入后胃管
      氧疗方式：①鼻导管  ②面罩  ③机械通气    翻身：①左侧卧位  ②右侧卧位  ③平卧位  ④俯卧位
      护理措施：①脐部护理  ②口腔护理  ③臀部护理 ④眼部护理  ⑤擦浴式洗澡  ⑥沐浴 ⑦吸痰 ⑧雾化吸入
    </div>
    <div v-if="sheetInfo.sheetType == 'generalnursing_tj' || sheetInfo.sheetType == 'postpartum2_tj'">
      注：健康宣教填写代码：①检查注意事项指导 ②饮食指导 ③用药指导 ④指导功能锻炼 ⑤指导减轻疼痛的方法  ⑥指导多喝水 ⑦指导有效咳嗽排痰的方法 ⑧告知用氧注意事项 ⑨告知留置针的注意事项 ⑩告知引流管注意事项
    </div>
    <!-- 烟台玲珑 - 病重（病危）患者评估与护理记录单 -->
    <div
      v-if="sheetInfo.sheetType == 'seriousnursing_ytll'"
      style="font-size: 13px; margin-top: -5px"
    >
      备注：意识：1.清醒 2.嗜睡 3.昏睡 4.浅昏迷 5.中昏迷 6.深昏迷 7.意识模糊 8.谵妄；&nbsp;氧疗：1.鼻导管 2.面罩 3.其他；&nbsp;心理状态：1.好 2.差 3无法评估；&nbsp;营养状况：1.良好 2.一般 3.差；&nbsp;家庭支持：1.良好 2.一般 3.差；&nbsp;<br/>治疗依从性：1好 2.差；&nbsp;疼痛：0—10分；&nbsp;教育需求：1. 疾病知识 2.饮食 3.药物 4.检查须知 5.功能锻炼 6.介入手术相关问题 7.术后常见并发症 8.管道护理 9.出院指导 10.其它（根据患者健康需求给予健康教育，落实后在护理措施栏内随时记录）
    </div>
    <div
      v-if="sheetInfo.sheetType == 'premiumcare_ytll'"
      style="font-size: 13px; margin-top: -5px"
    >
      备注：<strong>意识：</strong>1.清醒 2.嗜睡 3.昏睡 4.浅昏迷 5.中昏迷 6.深昏迷 7.意识模糊 8.谵妄 9.镇静；<strong>瞳孔对光反应：</strong>＋灵敏 ±迟钝 －消失；疼痛：0—10分；<strong>氧疗：</strong>1.鼻导管 2.面罩 3.其他 ；<strong>多重耐药：</strong>无，有（直接填写耐药菌代号）；<strong>护理措施：</strong>1.床单位整理 2.口腔护理 3.会阴护理 4.雾化吸入 5.膀胱冲洗6.更换引流袋 7.气管切开护理 8.面部清洁、梳头 9.温水擦浴 10.足部清洁 11.床上洗头 12.指/趾甲护理 13.护理换药 14.翻身、拍背；体位：左侧、右侧、平卧位、半坐卧位、端坐卧位、自主体位等分别记录为“左”、“右”、“平”“半”、“端”、“自”等；
   </div>
    <!-- 广东同江 - 硫酸镁注射液静脉滴注观察记录单 -->
    <div v-if="sheetInfo.sheetType == 'magnesiumsulphate_tj'">
      备注：1、硫酸镁静脉滴注时每 2h 观察记录一次，有异常情况时随时记录；<br/>
      &nbsp;&nbsp;&nbsp;2、每 24h 或停止使用时统计尿量一次，统计时划双红线，并写清楚统计的起止时间和签名。
    </div>

    <!-- 佛一 - 新生儿NICU护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'NICU_fs'">
      注：1 每班至少一次记录“生命体征、专科观察项目和出入量”并用具体数字和文字记录，以后无变化时用“√”表示；2 有变化时随时记录
    </div>
    <!-- 武汉汉口 - 护理记录单（一），护理记录单（二） -->
    <div v-if="sheetInfo.sheetType == 'one_whhk' || sheetInfo.sheetType === 'two_whhk'">
      说明：观察内容无异常时，用“N”来表示，异常时如实描述。健康教育、护理措施项目只需填写数字符号。<br/>
      健康教育：①入院介绍②饮食指导③药物指导④特殊检查指导⑤术前指导⑥术后指导⑦出院指导⑧康复指导<br/>
      护理措施：①口腔护理②会阴护理③清洁面部④温水擦浴⑤气管切开护理⑥吸痰⑦预防压疮护理⑧雾化吸入⑨更换引流装置⑩保护性约束
    </div>
    <!-- 武汉汉口 - 静脉治疗使用维护记录单 -->
    <div v-if="sheetInfo.sheetType == 'intravenous_whhk' || sheetInfo.sheetType == 'insulin_whhk'">
      说明：选择相应的置管内容打“√”，异常时在“其他”栏内如实记录护理措施。
    </div>
    <!-- 武汉汉口 - 新生儿护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'baby_whhk'">
      说明：1.请在相应栏内用“√”表示，如有异常请在其他栏内填写具体情况。<br/>
      2.大便性状使用词汇为“胎便”（墨绿色）、“混合便”（由墨绿色变到黄绿色）、“母乳便”（大便呈糊状或凝乳状，颜色是金黄色或有点儿发绿）、“人工喂养便”（大便颜色会呈土黄色，呈糊状或 ）

    </div>
    <!-- 武汉汉口 - 产科护理记录单 -->
    <div v-if="sheetInfo.sheetType == 'obstetriccare_whhk'">
      说明：观察内容无异常时，用“N”表示，异常时如实描述。健康教育、护理措施项目只需填写数字符号。
      健康教育：①入院介绍②药物知识③乳房护理指导④饮食指导⑤术前指导⑥术后指导⑦新生儿护理指导⑧母乳喂养指导⑨人工喂养指导⑩出院指导○11 分娩相关知识
      护理措施：①吸氧②按摩子宫③伤口压沙袋④温水擦浴⑤会阴擦洗⑥会阴湿敷⑦更换引流袋⑧胎心监护⑨阴道擦洗⑩气压治疗
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
      (this.sheetInfo.sheetType == "critical_lc") &&
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
  .bottomInput {
    border: none;
    outline: none;
    border-bottom: 1px solid #000;
    font-size: 13px;
    width: 100px;
    text-align: left;
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
