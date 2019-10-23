
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
          <col
            v-if="!obj.colWidth"
            v-for="w in obj.col"
            :width="(100/obj.col)+'%'"
            :key="obj.title+w"
          />
          <col
            v-if="obj.colWidth"
            v-for="(w,wi) in obj.colWidth"
            :width="w||((100/obj.col)+'%')"
            :key="obj.title+wi"
          />
        </colgroup>

        <tr v-if="obj.children" v-for="(c,n) in obj.children" :key="c.title+c.name+n">
          <td
            v-for="col in obj.col"
            :key="'td'+c.title+c.name+col"
            v-if="((n+(col-1))%obj.col)===col-1 && (n+(col-1))<obj.children.length"
            v-bind="obj.children[n+(col-1)].tdProps"
          >
            <TipsBox :obj="obj.children[n+(col-1)]" :formObj="formObj">
              <div class="box-td" :class="c.boxClass" :style="c.boxStyle||obj.boxStyle||obj.children[n+(col-1)].boxStyle">
                <div
                  class="left-td"
                  :style="obj.children[n+(col-1)].titleStyle"
                  :class="obj.children[n+(col-1)].titleClass"
                  v-if="obj.children[n+(col-1)].title || obj.children[n+(col-1)].labelTitle"
                >
                  <!-- {{n+(col-1)}} -->
                  <span
                    v-if="!obj.children[n+(col-1)].dialog"
                    :style="obj.children[n+(col-1)].titleSpanStyle"
                    :class="obj.children[n+(col-1)].titleSpanClass"
                  >
                    <XRadiobox :obj="obj.children[n+(col-1)]" :formObj="formObj" /><span v-html="titleFeedSpace(obj.children[n+(col-1)].title)"></span>{{obj.children[n+(col-1)].labelTitle?obj.children[n+(col-1)].labelTitle+':':''}}</span>
                  <span
                    v-if="obj.children[n+(col-1)].dialog"
                    style="cursor:pointer;color:blue"
                    @click="titleClick($event,obj.children[n+(col-1)])"
                  ><span v-html="titleFeedSpace(obj.children[n+(col-1)].title)"></span>{{obj.children[n+(col-1)].labelTitle}}<span
                      v-if="obj.children[n+(col-1)].name === 'I100001'"
                    >(<span style="color: transparent">空白</span>）
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

          <!-- <td v-if="(n+1)>obj.children.length">{{n}}</td> -->
          <!-- <td v-if="(n+1)>obj.children.length">{{n}}</td> -->
        </tr>
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
    }
  },
  watch: {
    // 动态更新
    // 'formObj.model': {
    //   handler: function(val, oldVal) {
    //     console.log("###ColBox#watch_formObj", val);
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.$root.$refs["formGroupColBox" + this.obj.title] = this.$refs[
      "formGroupColBox" + this.obj.title
    ];

    this.checkHidden();
  },
  created() {},
  methods: {
    checkHidden() {
      if (this.obj.hidden) {
        this.$root.$refs["formGroupColBox" + this.obj.title].hidden = true;
      }
    },
    titleFeedSpace(str){
      //
      if(!str){return ""}
      if(str.length == 2) {
        // for(i of str){ console.log(i)}
        return `${str[0]}<span style='text-indent: 2em;display: inline-block;'>${str[1]}</span>:`
      }
      if(str.length == 3) {
        // for(i of str){ console.log(i)}
        return `<span>${str[0]}</span><span style='text-indent: 0.5em;display: inline-block;'>${str[1]}</span><span style='text-indent: 0.5em;display: inline-block;'>${str[2]}</span>:`
      }
      return str+':'// + str.length
    },
    titleClick(e, child) {
      console.log("titleClick", e, child, this.formObj.model, e.target.tagName);
      if (child.dialog) {
        console.log("child.dialog", child.dialog, this.$refs, this.$root.$refs);
        try {
          // this.$root.$refs.dialogBox.$el.draggable = true
          child.dialog["callback"] = res => {
            console.log("表单填写结果", res);
          };
          this.$root.$refs.dialogBox.openBox(child.dialog); //$el draggable
        } catch (error) {
          console.log("error", error);
        }
      }
    },
    getUUID() {
      let uuid_ = uuid.v1();
      // console.log(uuid_)
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
    // border 1px solid red
    // vertical-align top
    vertical-align middle

  td:hover
      // outline 1px solid red
      background #eef5f5
  .box-td
    width: 100%
    display inline-flex
    height: 28px;
    align-items: center;
    // justify-content: space-between
  .left-td
    // border 1px solid green
    width: 100%
    // max-width: 100px
    // margin: 10px 0px 0 4px
    text-align: left
    font-size: 12px;
  .right-td
    width: 100%

  .Form-Group-Col-Box
    // border 1px dashed red
    font-size 14px
    min-height 28px
    height 28px

  // .group-col-box
  //   border-bottom 1px dashed #eee

  .el-checkbox, .is-bordered, .el-checkbox--medium {
    margin: 5px 0px;
  }


</style>
