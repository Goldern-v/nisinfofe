
<template>
  <div>
    <!-- <span>
    --{{obj.parentKey||''}}--{{formObj.model[obj.parentKey]||''}}
    </span>-->
    <!-- && ( !obj.parentKey || (obj.parentKey && formObj.model[obj.parentKey]===obj.title)) -->
    <div
      v-if="obj.type && obj.type==='formGroupColBox'"
      :style="obj.style||obj.boxStyle"
      :class="obj.class"
      class="group-col-box"
      :ref="'formGroupColBox'+obj.title"
    >
      <table class="Form-Group-Col-Box">
        <colgroup v-if="obj.col">
         <template v-if="!obj.colWidth">
          <col
            v-for="w in obj.col"
            :width="(100/obj.col)+'%'"
            :key="obj.title+w"
          />
         </template>
          <template v-if="obj.colWidth">
            <col
              v-for="(w,wi) in obj.colWidth"
              :width="w||((100/obj.col)+'%')"
              :key="obj.title+wi"
            />
          </template>
        </colgroup>
        <template v-if="obj.children">
          <tr v-for="(c,n) in obj.children" :key="(c?c.title+c.name:'')+n">
            <template v-for="(col,cindex) in obj.col">
              <td
              v-if="((n+(col-1))%obj.col)===
              col-1 && (n+(col-1))<obj.children.length
              && showElement(obj.children[n+(col-1)],n+(col-1))"
                :key="'td'+cindex+col"
                v-bind="obj.children[n+(col-1)].tdProps"
              >

                <TipsBox :obj="obj.children[n+(col-1)]" :formObj="formObj">
                  <div
                    class="box-td"
                    :class="c.boxClass"
                    :style="c.boxStyle||obj.boxStyle||obj.children[n+(col-1)].boxStyle"
                  >
                    <div
                      class="left-td"
                      :style="obj.children[n+(col-1)].titleStyle"
                      :class="[obj.children[n+(col-1)].titleClass,{'right':(obj.children[n+(col-1)].hiddenTips&&!obj.children[n+(col-1)].labelLeft)}]"
                      v-if="obj.children[n+(col-1)].title || obj.children[n+(col-1)].labelTitle"
                    >
                      <!-- {{n+(col-1)}} -->
                      <span
                        v-if="!obj.children[n+(col-1)].dialog"
                        class="XRadiobox-items"
                        :style="obj.children[n+(col-1)].titleSpanStyle"
                        :class="obj.children[n+(col-1)].titleSpanClass"
                      >
                        <XRadiobox :obj="obj.children[n+(col-1)]" :formObj="formObj" />
                        <span v-html="titleFeedSpace(obj.children[n+(col-1)].title)"></span>
                        {{obj.children[n+(col-1)].labelTitle?obj.children[n+(col-1)].labelTitle+':':''}}
                      </span>
                      <span
                        v-if="obj.children[n+(col-1)].dialog"
                        style="cursor:pointer;color:blue"
                        @click="titleClick($event,obj.children[n+(col-1)])"
                      >
                        <span v-html="titleFeedSpace(obj.children[n+(col-1)].title)"></span>
                        {{obj.children[n+(col-1)].labelTitle}}
                        <span
                          v-if="obj.children[n+(col-1)].name === 'I100001'"
                        >
                          (
                          <span style="color: transparent">空白</span>）
                        </span>
                      </span>
                    </div>
                    <div class="right-td" :style="obj.children[n+(col-1)].inputStyle">
                      <InputElements
                        :col="obj.col"
                        :obj="[obj.children[n+(col-1)]]"
                        :style="obj.style"
                        :class="obj.class"
                        :formObj="formObj"
                      />
                    </div>
                  </div>
                </TipsBox>
              </td>
            </template>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

import InputElements from "./InputElements";
import TipsBox from "./TipsBox";

import XRadiobox from "./XRadiobox";

export default {
  name: "FormGroupColBox",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {
    InputElements,
    TipsBox,
    XRadiobox
  },
  data() {
    return {};
  },
  computed: {
    uui() {
      return uuid.v1();
    },
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {}
      return "E0001";
    }
  },
  watch: {
  },
  mounted() {
    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = []; //new Array();
    }

    this.$root.$refs[this.formCode][
      "formGroupColBox" + this.obj.title
    ] = this.$refs["formGroupColBox" + this.obj.title];

    this.checkHidden();
  },
  created() {},
  methods: {
    checkHidden() {
      if (this.obj.hidden) {
        this.$root.$refs[this.formCode][
          "formGroupColBox" + this.obj.title
        ].hidden = true;
      }
    },
    titleFeedSpace(str) {
      //
      if (!str) {
        return "";
      }
      if (str.length == 2) {
        return `${
          str[0]
        }<span style='text-indent: 2em;display: inline-block;'>${
          str[1]
        }</span>:`;
      }
      if (str.length == 3) {
        return `<span>${
          str[0]
        }</span><span style='text-indent: 0.5em;display: inline-block;'>${
          str[1]
        }</span><span style='text-indent: 0.5em;display: inline-block;'>${
          str[2]
        }</span>:`;
      }
      return str + ":";
    },
    titleClick(e, child) {
      console.log("titleClick", e, child, this.formObj.model, e.target.tagName);
      if (child.dialog) {
        console.log("child.dialog", child.dialog, this.$refs, this.$root.$refs);
        try {
          child.dialog["callback"] = res => {
            console.log("表单填写结果", res);
          };
          this.$root.$refs.dialogBox.openBox(child.dialog);
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    showElement(obj, index) {
      let oldFormInfo = window.app.$store.getters.getOldFormInfo() || {};
      if (
        obj &&
        obj.hasOwnProperty("showDeptName") > -1 &&
        obj.showDeptName &&
        obj.showDeptName.length > 0
      ) {
        let deptName = "";
        if (oldFormInfo && oldFormInfo.name) {
          deptName = oldFormInfo.name.replace(/[()入院评估表]/g, "");
          if (deptName && obj.showDeptName.indexOf(deptName) > -1) {
            return true;
          } else {
            try {
              this.obj.children.splice(index, 1);
            } catch (error) {}
            return false;
          }
        } else {
          try {
            this.obj.children.splice(index, 1);
          } catch (error) {}
          return false;
        }
      }
      return true;
    },
    getUUID() {
      let uuid_ = uuid.v1();
      return uuid_;
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  table
    width 100%
    table-layout fixed
  table, tr, td
    vertical-align middle

  td:hover
      background #eef5f5
  .box-td
    width: 100%
    display inline-flex
    // height: 28px;
    align-items: stretch;
  .left-td
    width: 7%
    text-align: left
    font-size: 12px;
    margin-top:8px;
    .XRadiobox-items
      line-height: 18px;
      display: inline-flex
    &.left
      text-align: left
    &.right
      text-align: right
  .right-td
    width: 100%

  .left-span
    text-align: left
    display: flex

  .right-span
    text-align: right
    display: flex

  .Form-Group-Col-Box
    font-size 14px
    min-height 28px
    height 28px

  .el-checkbox, .is-bordered, .el-checkbox--medium {
    margin: 5px 0px;
  }


</style>
