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
  filters: {
    showfirst(val) {
      for (let i in val) {
        if (val.charCodeAt(i) >= 255) {
          return val[i];
        }
      }
      return "";
    }
  },
  computed: {
    isShared() {
      return this.data && this.data.flagShare + '' === '1'
    }
  },
  methods: {
    inToday(date) {
      return (
        new Date(date).Format("yyyy-MM-dd") == new Date().Format("yyyy-MM-dd")
      );
    },
    FormatData(date) {
      return new Date(date).Format("yyyy-MM-dd");
    },
    toFormPage(data, item) {
      // let query = qs.stringify(data);
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
      return;
      this.$router.push(
        {
          path: "/record",
          query: data
        },
        () => {
          this.$nextTick(() => {
            if (item.id) {
              this.bus.$emit(
                "openAssessmentBox",
                Object.assign({}, getFormConfig(item.formName), {
                  id: item.id,
                  formCode: item.formCode,
                  type: item.formType,
                  showCurve: item.showCurve,
                  creator: item.creator,
                  listPrint: item.listPrint,
                  nooForm: item.nooForm,
                  pageUrl: item.pageUrl
                })
              );
            }
          });
        }
      );
    },
    // 右键菜单
    openContextMenu(e, item) {
      let style = {
        top: `${Math.min(e.clientY - 15, window.innerHeight - 280)}px`,
        left: `${Math.min(e.clientX + 15, window.innerWidth - 180)}px`
      };
      let param = qs.stringify({
                patientId: item.patientId,
                visitId: item.visitId
              });
      let data = [
        {
          name: "记录单",
          iconClass: "el-icon-document",
          click: () => {
            window.open(
              `/crNursing/sheet?${param}`
            );
          }
        },
        {
          name: "血糖",
          iconClass: "el-icon-document",
          click: () => {
            window.open(
              `/crNursing/bloodSugar?${param}`
            );
          }
        },
        {
          name: "医嘱",
          iconClass: "el-icon-document",
          click: () => {
            window.open(
              `/crNursing/advice?${param}`
            );
          }
        },
        {
          name: "体温单",
          iconClass: "el-icon-document",
          click: () => {
            window.open(
              `/crNursing/temperature?${param}`
            );
          }
        }
      ];
      e.preventDefault();
      window.openContextMenu({ style, data });
    },
  },
  components: {}
};
</script>
