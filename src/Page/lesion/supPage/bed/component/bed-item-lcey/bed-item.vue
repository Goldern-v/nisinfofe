<template src="./bed-item.html"></template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped src="./bed-item.styl"></style>

<script>
import qs from "qs";
import { getFormConfig } from "@/Page/patientInfo/supPage/record/config/form-config.js";
import bus from "vue-happy-bus";
export default {
  props: {
    data: Object,
    toLike: Function,
    toInfo: Function,
    prevent: Function
  },
  data() {
    return {
      bus: bus(this)
    };
  },
  computed: {
    // 右下角的提示
    squareList() {
      if (this.data.conditionIconDtos) {
        return this.data.conditionIconDtos.slice(0,6).filter((v) => {
          if (v.iconText=='病危' && ['lyxrm', 'whhk', 'stmz'].includes(this.HOSPITAL_ID)) return false
          if (['病危', '病重'].includes(v.iconText) && ['whfk'].includes(this.HOSPITAL_ID)) return false
          return true
        })
      }
      return []
    }
  },
  filters: {
    tomenny(val) {
      return val.toFixed(2)
    }
    // showfirst(val) {
    //   for (let i in val) {
    //     if (val.charCodeAt(i) >= 255) {
    //       return val[i];
    //     }
    //   }
    //   return "";
    // }
  },
  methods: {
     // 右键事件
    openContextMenuBed(e,patientId) {
      if(['nfyksdyy','zjhj','sdhpwk'].includes(this.HOSPITAL_ID)){
      let style = {
        top: `${Math.min(e.clientY - 20, window.innerHeight - 180)}px`,
        left: `${Math.min(e.clientX + 20, window.innerWidth - 180)}px`,
      };
      let data = patientId ? [
        {
          name: "批量打印床头卡",
          icon: "xiangxiacharuyihang",
          click: () => {
            this.$emit('openBatchPrints' ,'bedside')
          },
        },
        {
          name: "批量打印手腕带",
          icon: "dongtairizhi",
           click: () => {
            this.$emit('openBatchPrints' ,'wristStrap')
          },
        },
        {
          name: "批量打印床位卡",
          icon: "fuzhizhenghang",
           click: () => {
            this.$emit('openBatchPrints' ,'bedthNull')
          },
        }
      ]: [
        {
          name: "批量打印床位卡",
          icon: "fuzhizhenghang",
          click: () => {
            this.$emit('openBatchPrints' ,'bedthNull')
          },
        }
      ]

      e.preventDefault();
      window.openContextMenu({ style, data });
       }
    },
    inToday(date) {
      return (
        new Date(date).Format("yyyy-MM-dd") == new Date().Format("yyyy-MM-dd")
      );
    },
    FormatData(date) {
      return new Date(date).Format("yyyy-MM-dd");
    },
    toFormPage(data, item) {
      let query = qs.stringify({
        patientId: data.patientId,
        visitId: data.visitId
      });
      let newWid = window.open(`/crNursing/record?${query}`);
      newWid.onload = () => {
        setTimeout(() => {
          newWid.app.bus.$emit(
            "openAssessmentBox",
            Object.assign({}, getFormConfig(item.formName), {
              id: item.dataId,
              formCode: item.formCode,
              type: item.formType,
              showCurve: item.showCurve,
              creator: item.creator,
              listPrint: item.listPrint,
              nooForm: item.nooForm,
              pageUrl: item.pageUrl
            })
          );
        }, 500);
      };
    }
  },
  components: {}
};
</script>
