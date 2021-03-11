<template>
  <table class="bottomTable">
    <td>
      <p>
        体温异常措施：①适量饮水②温水/酒精擦浴③冰块冷敷④减少盖被⑤遵医嘱用药
        <input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.yzyy"
          :data-value="sheetInfo.relObj.yzyy"
        />
        <!-- :disabled="disabled" -->
      </p>
      <p>
        血压异常处理：①观察做好宣教 ②遵医嘱应用药物③
        <input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.yzyyyw"
          :data-value="sheetInfo.relObj.yzyyyw"
        />
      </p>
      <p>睡眠状态：①安静休息②间断入眠③入睡困难 措施：①暗化病室②用药</p>
      <p>
        饮食：①普食②软食③流食④半流质⑤禁饮食⑥糖尿病饮食⑦
        <input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.ysqt"
          :data-value="sheetInfo.relObj.ysqt"
        />
      </p>
      <p>
        食欲：a.正常 b.增加 c.减退 d.差 e.无变化f.其他
        <input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.syqt"
          :data-value="sheetInfo.relObj.syqt"
        />
      </p>
      <p>
        临床表现：疼痛：①腹部②胸部③头部④
        <input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.lcbx_tt"
          :data-value="sheetInfo.relObj.lcbx_tt"
        />
      </p>
      <p>
        其他症状：①恶心②呕吐③腹胀④纳差⑤烧心⑥返酸⑦大便失禁⑧大便不成形⑨腹泻⑩便秘⑾黑便⑿血便⒀小便失禁⒁尿频⒂尿色异常
        <input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.nsycs"
          :data-value="sheetInfo.relObj.nsycs"
        />色⒃<input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.lcbx_qtzz"
          :data-valuel="sheetInfo.relObj.lcbx_qtzz"
        />
      </p>
      <p>
        措施：①观察做好宣教 ②遵医嘱用药③<input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.lcbx_cs"
          :data-value="sheetInfo.relObj.lcbx_cs"
        />效果：①未再出现上述症状②减轻③差
      </p>
      <p>VTE措施A:健康宣教 B:基础预防 C:物理预防 D:药物预防 E:放警示标示。</p>
      <p>心理状态：①稳定②紧张③焦虑④抑郁⑤恐惧⑥烦躁</p>
    </td>
    <td>
      <p>营养状况：①良好②一般③差 依从性：①好②一般③差</p>
      <p>教育需求：①饮食②检查化验③药物④活动</p>
      <p>
        主要阳性项目：①血红蛋白②白细胞③血小板④血氨⑤血钾⑥血钠⑦血淀粉酶⑧血凝⑨肝功<input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.zyyxxm_ggn"
          :data-value="sheetInfo.relObj.zyyxxm_ggn"
        />⑩<input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.zyyxxm_qt"
          :data-value="sheetInfo.relObj.zyyxxm_qt"
        />
      </p>
      <p>
        措施：①遵医嘱用药②观察做好宣教③<input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.hy_cs"
          :data-value="sheetInfo.relObj.hy_cs"
        />
      </p>
      <p>
        检查/治疗指导：项目①胃镜②肠镜③胃/肠息肉电切④胃镜下碎石⑤食管扩张术⑥食管静脉曲张套扎术⑦支架植入⑧介入治疗⑨
        <input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.xm_qt"
          :data-value="sheetInfo.relObj.xm_qt"
        />
      </p>
      <p>措施：①检查/治疗前指导②检查/治疗后指导</p>
      <p>效果：①知晓并依从②知晓但依从性差</p>
      <p>
        出院/转科指导：①饮食②休息与活动③药物④复诊⑤转至
        <input
          type="text"
          class="bottom-line"
          v-model="sheetInfo.relObj.zhidao"
          :data-value="sheetInfo.relObj.zhidao"
        />病区
      </p>
    </td>
  </table>
</template>

<script>
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index";
export default {
  data() {
    return {
      bus: bus(this),
      sheetInfo
    };
  }
};
</script>

<style lang="stylus" scoped>
.bottomTable{
  text-align :left;
  font-size:12px;
  td{
    border: 1px solid #000 !important;
    text-align :left;
    p{
      line-height :20px;
    }
  }
  /deep/ .bottom-line {
    display: inline-block;
    border: 0;
    width: 70px;
    border-bottom: 1px solid #000;
    padding: 2px 0 2px 0px;
    height: 12px;
    position: relative;
    outline: none;
    text-align: center;
  }
}
</style>
