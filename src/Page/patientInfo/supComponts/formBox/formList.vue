<template>
<div style="height: 100%">
  <div class="contain">

    <!-- <div flex-box="3" style="width:100%" class="record-box" v-loading="modalLoading"> -->

    <el-tabs class="tabspane" type="border-card" v-if="formListData.tabs" v-model="activeTab" @tab-click="handleTabClick" @onload="onload">

      <el-tab-pane v-for="(tab,index) in formListData.tabs" :label="tab.label" :name="tab.label" :key="index" v-model="tab.result">
        <!-- <span slot="label"> {{tab.label}}</span> -->
        <!-- v-model="resultList" -->
        <div class="do-box" v-for="(item, indexs) in tab.items" :key="indexs">


          <span v-if="item.type==='label'">{{item.code}}</span>

          <div v-if="item.type==='labelcheckbox'" style="font-size:14px;margin-top: 0px;">
            <el-checkbox :checked="item.checked" :label="item.code" :name="item.name" v-model='item.result'>{{item.code}}</el-checkbox>
          </div>

          <div class=" zd-li" :key="item.code">
            <el-checkbox-group @change="checkboxChange" v-if="item.group==='checkbox'" v-for="(kid, index) in item.child" :key="index" :name="item.name" size="small" v-model="kid.result">
              <el-checkbox style="font-size:14px!important;" :checked="kid.checked" :label="kid.code" :name="kid.name" >{{kid.label||kid.code}}</el-checkbox>
            </el-checkbox-group>

            <el-radio-group @change="checkboxChange" class=" zd-li" v-if="item.group==='radio'" size="small" :name="item.name" v-model="item.result">
              <el-radio v-for="(kid, index) in item.child" :key="index" :checked="kid.checked" :label="kid.code" :name="kid.name" v-model='kid.result'>{{kid.label||kid.code}}</el-radio>
            </el-radio-group>


            <div class="text-li"  @dblclick="textboxOndbClick" v-if="item.group==='text'" size="small" v-for="(kid, index) in item.child" :key="index" :name="item.name">
              <!--  v-model="item.result" @click="textboxOnClick" -->

                <el-date-picker v-if="kid.type==='datetime'" type="datetime" :name="kid.name" placeholder="日期" v-model="kid.result" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>

                <el-input v-if="kid.type==='text'" :checked="kid.checked" :placeholder="kid.placeholder" :label="kid.code" :name="kid.name" v-model='kid.result'><template slot="prepend" style="color:black">{{kid.value||kid.code}}</template></el-input>


                <div v-if="kid.type==='select'" style="width:100%;" >
                  <!-- <el-tag type='success'>{{kid.value||kid.code}}</el-tag><br/> -->
                  <span>{{kid.value||kid.code}} (左/右)<br/></span>
                  <!-- <el-alert :title="kid.value||kid.code" type="warning" :closable="false"></el-alert> -->
                  <!-- <el-input :placeholder="kid.placeholder" v-model="kid.result" style="width:45%">
                    <template slot="prepend">左</template>
                  </el-input> -->
                  <input type="hidden" v-model="kid.result">

                  <!-- <el-cascader
                    :placeholder="kid.placeholder"
                    :options="kid.options"
                    v-model="kid.result" style="width:45%"
                    change-on-select
                  ><template slot="prepend">左</template></el-cascader> -->

                  <el-autocomplete
                  popper-class="my-autocomplete"
                  v-model="kid.results[0]"
                  :fetch-suggestions="function(queryString, cb){cb(kid.options);}"
                  @select="(kid)=>function(kid){kid.result=kid.results.toString();console.log(kid,kid.result)}" style="width:40%"
                  :placeholder="kid.placeholder">
                  <template style="width: auto;" slot-scope="{ item }">
                    <div class="label">{{ item.label }}</div>
                    <span class="value">{{ item.value }}</span>
                  </template>
                  <!-- <template slot="prepend">左</template> -->
                </el-autocomplete>
                /
                <el-autocomplete
                  popper-class="my-autocomplete"
                  v-model="kid.results[1]"
                  :fetch-suggestions="function(queryString, cb){cb(kid.options);}"
                  @select="(kid)=>function(kid){kid.result=kid.results.toString();console.log(kid,kid.result)}" style="width:40%"
                  :placeholder="kid.placeholder">
                  <template style="width: auto;" slot-scope="{ item }">
                    <div class="label">{{ item.label }}</div>
                    <span class="value">{{ item.value }}</span>
                  </template>
                  <!-- <template slot="prepend">右</template> -->
                </el-autocomplete>

                </div>


            </div>


           <!-- 列表 -->
            <div v-if="item.group==='checkboxList'">
              <div v-for="(kid, index) in item.child" :key="index">
                <el-checkbox size="small" style="font-size:14px!important;" :label="kid.code" :name="kid.name" v-model="kid.result">{{kid.label||kid.code}}</el-checkbox>
              </div>
            </div>


          </div>
          <!-- <div class=" mb-10"> -->
          <el-input v-if="item.type==='text' && item.group===undefined" :name="item.name" v-model="item.result" style="margin:5px 0px" :placeholder="item.placeholder">
            <template slot="prepend" style="color:black">{{item.value||item.code}}</template>
          </el-input>

          <el-checkbox @change="checkboxChange" v-if="item.type==='checkbox' && item.group===undefined" :checked="item.checked" :label="item.code" :name="item.name" v-model='item.result'>{{item.label||item.code}}</el-checkbox>

          <!-- </div> -->



        </div>

      </el-tab-pane>


    </el-tabs>



  </div>
  <Diagnosis></Diagnosis>
  <!-- </div> -->
</div>
</template>

<style scoped>
/* @import './tabs.css'; */
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>


.contain
  padding 10px;
  background #f8f8f8
  height 100%
  font-size 14px
  overflow-y  auto
  // overflow-x visible
  // overflow: scroll;
  .record-box
    border-right: 1px solid #ddd;
    height auto
  .mb-10
    margin-bottom 10px
  h1
    font-size 14px;
    font-weight bold
  .text-li
    color black
    width 98%
    text-align left
  >>>.el-scrollbar
    min-width fit-content!important
    .el-input
      width 90%
      padding 5px

  .zd-li
    color black
    font-size 14px
    line-height 25px
    color black
    margin-bottom 5px
    .el-checkbox__label
      font-size 14px!important
      color black!important
      display inherit!important
    .el-radio
      margin-right 0px
      margin-left 0px
      width:89%
    .el-input
      padding 5px 0px
      width 85%
    .el-input-group__prepend
      color black
      background-color white

  .list
    li
      height 36px;
      margin 5px 0
      background #fff
      cursor pointer
      position relative
      overflow visible

      &:hover
        .tip-con
          display block
      span
        white-space nowrap
        text-overflow ellipsis
      img
        width 18px
        height 18px
        margin 0 8px
        &.active
          color #4BB08D

.el-tabs__item .is-active
  color #333!important
  font-weight bold!important
.tabspane
  >>>.el-checkbox__label
        color #333!important
        font-size 13px
        line-height 28px
  >>>.el-tabs__nav
        color #333!important
        font-size 13px
  >>>.el-tabs__item.is-active
        color #333!important
        // font-size 13px
        font-weight bold
.tip-con
  position absolute
  width 486px
  left -496px
  top -20px
  padding-right 20px
  padding-top 20px
  // 强行隐藏哈哈
  display none
  z-index 10px
</style>

<script>
import Diagnosis from './Diagnosis'
import tipCon from './tip-con/tip-con.vue'
import moment from 'moment'
export default {
  name: "formList",
  inject: ['activeTabName'],
  props: {
    formCode: String,
    formListData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      detail: {},
      postData: [],
      activeTab: this.activeTabName,
      // modalLoading: false,
    }
  },
  created() {
    window.getDiagnosis = (key, value) => {}
    // this.modalLoading = true
    // this.modalLoading = false
  },
  mounted() {
    // this.modalLoading = false

  },
  computed: {
    formData() {
      return this.$store.state.form.formData
    },
    hisDiags() {
      return this.$store.state.form.hisDiags
    },
    measureList() {
      return this.$store.state.form.measure
    },
    // selectList() {
    //   return this.$store.state.form.select
    // },
    HJNursingMeasureList() {
      return this.$store.state.form.hjmeasure
    },

  },
  watch: {
    // selectList() {
    //   this.$store.commit('upSelect', this.selectList)
    // }
  },
  methods: {
    onload() {},
    handleTabClick(tab, e) {
      console.log("----handleTabClick", tab, e);
      // this.activeTabName = "护理措施"
    },
    handleSelect(e,key,val) {
      console.log("----handleSelect",e,key,val);
    },
    checkboxChange(e) {
      // let _ = this.$_
      console.log(e, this.formListData, _);
      // this.getDataToPost();
    },
    tipsOnClick(e){
      console.log(e, e.target);
    },
    textboxOndbClick(e){
      try {
        console.log(e, e.target, this.formListData);
        let name = e.target.name
        if (e.target.name === undefined || e.target.name === "") {
          name = e.target.parentNode.attributes.name.value
        }
        let obj = this.findListObjByName(name);
        console.log("==========obj", name, obj);
        if (obj.parentname != undefined) {
          let objparent = this.findListObjByName(obj.parentname);
          objparent.result = true
          objparent.checked = true
        }
        // 插入人体图鼠标事件到疼痛评估表
        if (name.indexOf("form_pain_assessment_ttbw") > -1) {
          window.openBodyModal(1, function(parts) {
            obj.result = parts;
          }, obj.result);

        }
      } catch (e) {
        //
      }
    },
    textboxOnClick(e) {
      try {
        console.log(e, e.target, this.formListData);
        let name = e.target.name
        if (e.target.name === undefined || e.target.name === "") {
          name = e.target.parentNode.attributes.name.value
        }
        let obj = this.findListObjByName(name);
        console.log("==========obj", name, obj);
        if (obj.parentname != undefined) {
          let objparent = this.findListObjByName(obj.parentname);
          objparent.result = true
          objparent.checked = true
        }
        // 插入人体图鼠标事件到疼痛评估表
        if (name.indexOf("form_pain_assessment_ttbw") > -1) {
          //     jQuery("#bodyImageButton",wid.document).on("click",function (e) {
          //   parent.window.openBodyModal(1, function(parts){
          //         jQuery("input[name$='form_pain_assessment_bw']",wid.document).val(parts);
          //       }, jQuery("input[name$='form_pain_assessment_bw']",wid.document).val());
          // });
          // window.openBodyModal(1, function(parts) {
          //   obj.result = parts;
          // }, obj.result);

        }
      } catch (e) {
        //
      }
    },
    // 寻找并返回 匹配字段 的对象
    findListObjByName(name) {
      for (var tab in this.formListData.tabs) {
        if (this.formListData.tabs.hasOwnProperty(tab)) {
          for (var item in this.formListData.tabs[tab].items) {
            if (this.formListData.tabs[tab].items.hasOwnProperty(item)) {
              if (this.formListData.tabs[tab].items[item].name === name) {
                return this.formListData.tabs[tab].items[item]
              }
              for (var kid in this.formListData.tabs[tab].items[item].child) {
                if (this.formListData.tabs[tab].items[item].child[kid].name === name) {
                  return this.formListData.tabs[tab].items[item].child[kid]
                }
              }
            }
          }
        }
      }
      return null
    },
    setDataFormPost(data) {
      this.formListData = data
    },
    getDataToPost() {
      this.postData = []
      let tabs = this.formListData.tabs;
      let formCode = this.formListData.smartForm.formCode;
      tabs.forEach((tab, index) => {
        tab.items.forEach((item, index) => {
          console.log("--getDataToPost", formCode, item.result, item);
          if (item.group != undefined && item.name.indexOf(formCode) > -1) {
            if (item.result.length > 0) {
              this.postData[item.name] = item.result
              return;
            }
          }
          if (item.group === undefined) {
            if (item.result.length > 0) {
              this.postData[item.name] = item.result
              return;
            }
          }
          if (item.child != undefined) {
            item.child.forEach((kid, index) => {
              if (kid.name.indexOf(formCode) > -1) {
                if (kid.type === "datetime") {
                  console.log("--datetime", formCode, kid.name, typeof(kid.result), moment(kid.result), kid);
                  this.postData[kid.name] = moment(kid.result).format("YYYY/MM/DD HH:mm");
                  return;
                }
                this.postData[kid.name] = kid.result
              }
            });
          }
        });
      });
      console.log("getDataToPost", this.postData);
    },
    openSlide(item) {
      window.openSlide(item)
    },
    // select(item) {
    //   let code = item.diagnosisCode
    //   let _ = this.$_
    //   if (this.$_.indexOf(this.selectList, code) > -1) {
    //     this.selectList.splice(this.$_.indexOf(this.selectList, code), 1)
    //   } else {
    //     // if (this.$_.indexOf(_.map(this.measureList, _.property('code')), code) == -1) {
    //     if (this.$_.indexOf(_.map(this.measureList, _.property('diagnosisCode')), code) == -1) {
    //       this.openSlide(item)
    //       return
    //     }
    //     this.selectList.push(code)
    //   }
    // },
    active(code) {
      if (this.$_.indexOf(this.selectList, code) > -1) {
        return true
      } else {
        return false
      }
    },
    has(code) {
      // if (this.$_.indexOf(_.map(this.measureList, _.property('code')), code) > -1) {
      if (this.$_.indexOf(_.map(this.measureList, _.property('diagnosisCode')), code) > -1) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    Diagnosis,
    tipCon
  }
}
</script>
