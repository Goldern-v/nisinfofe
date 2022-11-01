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
    prevent: Function,
    synchronizationPatient:Function,
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
    }
  },
  components: {}
};
</script>
