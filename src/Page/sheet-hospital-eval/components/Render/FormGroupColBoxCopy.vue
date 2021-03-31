
<template>
  <div
    v-if="obj.type && obj.type==='formGroupColBox'"
    :style="obj.style"
    :class="obj.class"
    class="group-col-box"
  >
    <table class="Form-Group-Col-Box">
      <colgroup v-if="obj.col">
        <col
          v-if="!obj.colWidth"
          v-for="w in obj.col"
          :width="(100/obj.col)+'%'"
          :key="obj.title+w"
        >
        <col
          v-if="obj.colWidth"
          v-for="(w,wi) in obj.colWidth"
          :width="w||((100/obj.col)+'%')"
          :key="obj.title+wi"
        >
      </colgroup>

      <tr v-if="obj.children" v-for="(c,n) in obj.children" :key="c.title+c.name+n">
        <td
          v-for="col in obj.col"
          :key="'td'+c.title+c.name+col"
          v-if="((n+(col-1))%obj.col)===col-1 && (n+(col-1))<obj.children.length"
        >
          <TipsBox :obj="obj.children[n+(col-1)]" :formObj="formObj">
            <div class="box-td">
              <div class="left-td" :style="obj.children[n+(col-1)].leftTdStyle||obj.titleStyle" v-if="obj.children[n+(col-1)].title">
                <!-- {{n+(col-1)}} -->
                <span v-if="!obj.children[n+(col-1)].dialog"><span v-html="titleFeedSpace(obj.children[n+(col-1)])"></span>{{obj.children[n+(col-1)].labelTitle?obj.children[n+(col-1)].labelTitle+':':''}}</span>
                <span
                  v-if="obj.children[n+(col-1)].dialog"
                  style="cursor:pointer;color:blue"
                  @click="titleClick($event,obj.children[n+(col-1)])"
                >
                  <span v-html="titleFeedSpace(obj.children[n+(col-1)])"></span>
                  <span v-if="obj.children[n+(col-1)].name === 'I100001'" style="margin-left:-5px;">(<span>{{formObj.model[obj.children[n+(col-1)].subTitle]||'  '}}</span>):
                  </span>
                </span>
              </div>
              <div class="right-td" :style="obj.children[n+(col-1)].rightTdStyle||c.rightTdStyle">
                <InputElements :col="obj.children[n+(col-1)].col" :obj="[obj.children[n+(col-1)]]" :formObj="formObj"/>
              </div>
              <div class="right-unit" :style="obj.children[n+(col-1)].unitStyle" v-if="obj.children[n+(col-1)].suffixDesc">
                <span class="post-text">{{obj.children[n+(col-1)].suffixDesc}}</span>
              </div>
            </div>
          </TipsBox>
        </td>

        <!-- <td v-if="(n+1)>obj.children.length">{{n}}</td> -->
        <!-- <td v-if="(n+1)>obj.children.length">{{n}}</td> -->
      </tr>
    </table>
  </div>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

import InputElements from "./InputElements";
import TipsBox from "./TipsBox";

export default {
  name: "FormGroupColBox",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {
    InputElements,
    TipsBox
  },
  data() {
    return {};
  },
  computed: {
    uui() {
      return uuid.v1();
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    titleFeedSpace(item){
      // console.log('--titleFeedSpace:',[str.length],[str])
      //
      let str = item.title
      if(item.hasOwnProperty('noLabelSpace')>-1 &&item.noLabelSpace==true){return `<span style='${item.style}'>${str}:</span>`||''}
      if(!str){return ''}
      if(str == '体温' && !item.spacing){return str+':'}
      let ret = ''
      if(str.length < 5) {
        let space = 1
        for (let index = 0; index < str.length; index++) {
          let char = str[index];
          // let strNum=str.replace( /[^\u4E00-\u9FA5\uF900-\uFA2D]/g,'')
          if(str.length>=4){space=1/3}
          if(str.length==3){space=1}
          if(str.length==2){space=3}
          if(!this.isChineseChar(char)){space*=1.75}
          if(str.length==index+1){space=0}
          ret += `<span style='letter-spacing: ${space}em;display: inline-block;'>${char}</span>`
        }
        return ret+':'
      }else{
        ret = str+':'
      }
      return ret
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
    },
    isChineseChar(str){
      var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      return reg.test(str);
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  table
    width 100%
  table, tr, td
    // border 1px solid red
    vertical-align top

  td:hover
      // outline 1px solid red
      background #eef5f5
  .box-td
    width: 100%
    display inline-flex
    align-items: center;
    max-width: 350px;
    // justify-content: space-between
  .left-td
    // border 1px solid green
    // width: 100%
    max-width: 100px
    min-width: 70px
    // margin: 8px 5px 0 0
    text-align: left
    font-size: 12px;
  .right-td
    width: auto
    width: 100%
    // width: calc(100% - 110px);
  .right-unit
    width: 100px!important
    padding-left: 5px;

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

.post-text
  color: #486a62;
  background: white;
  border-radius: 0;
  border: 0px!important;
  background: transparent;
  font-size: 12px!important;
  display: flex;
  align-items: center;

</style>
