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
      v-if="sheetInfo.sheetType == 'neonatology_hd'"
      style="font-size: 13px; margin-top: -5px"
    >
      备注:吸痰性质用符号表示：白色吸痰(WL),黄白稠痰(YWT),黄色稠痰(YT),血性痰(B);痰量：小量(+),中量(++),大量(+++)。
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
    <!-- 围介入期护理观察记录单 -->
    <div v-if="sheetInfo.sheetType == 'peri_intervention_lcey'">
      <p>
        填表说明:术前记录一次，术后记录自拔鞘后8次，前2小时每半小时一次，以后一小时一次，连续2小时动脉搏动，再后每2小时一次，连续2次。
        <br /><b>动脉搏动:</b>①强②弱③无 <b>皮肤温度:</b> ①正常 ②凉 ③湿冷 ④其他
        <b>皮肤颜色 :</b>①正常 ②苍白 ③发绀 ④其他 <b>伤口情况:</b>①
        清洁干燥②少量渗出③渗出较多 <b>疼痛评分:</b> 参照疼痛 <br /><b
          >评分工具</b
        >如Wong-Banker 面部表情量表法 （ FPS -R）即 “笑脸 ”
      </p>
    </div>
     <!-- 陵 城 病重（病危）患者护理记录单 -->
    <div class="bottomTable" v-if="sheetInfo.sheetType == 'critical_lc'">
      <table>
      <colgroup>
        <col width="45px" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td rowspan="9" style="text-align: center;vertical-align: middle;">医<br />嘱<br />内<br />容</td>
          <td>
            <input
            type="text"
            v-model="sheetInfo.relObj[advice[0]]"
            :data-value="sheetInfo.relObj[advice[0]]"
            />
          </td>
        </tr>
        <tr v-for="item in advice.slice(1)" :key="item">
          <td>
            <input
              type="text"
              v-model="sheetInfo.relObj[item]"
              :data-value="sheetInfo.relObj[item]"
            />
          </td>
          </tr>
      </tbody>
      </table>
      <div style="padding-top: 10px;">
          <p>注：瞳孔对光反应：灵敏（+）、迟钝（S）、消失（-）表示。</p>
      </div>
    </div>
  </div>
</template>

<script>
import sheetInfo from "../../../config/sheetInfo";
export default {
  data() {
    return {
      sheetInfo,
      advice: ['advice','advice2','advice3','advice4','advice5','advice6','advice7','advice8','advice9']
    };
  },
  created(){
    if(this.sheetInfo.sheetType == 'critical_lc' && this.sheetInfo.relObj['advice'] == undefined){
      this.sheetInfo.relObj['advice'] = '【1】0.9%NS100ml,奥美拉唑40mg iv 12:00【2】0.9%NS100ml,奥美拉唑40mg iv 12:00';
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
      input {
        width: 100%;
        height: 28px;
        border: none;
        outline: none;
        box-sizing: border-box;
      }
    }
  }

}
</style>
