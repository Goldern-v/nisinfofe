<template>
<div class="contain">
  <div class="box" flex="" v-for="(item, index)  in list" :key="index">
   <div class="mark-con">
     <div flex="">
       <span class="color-point"></span>
       <span class="date">{{item.day}}</span>
     </div>
     <div class="solid-line"></div>
   </div>
   <div class="text-con" flex-box="1">
     <div class="list-item" flex="" v-for="(option, i) in item.list" :key="i">
       <span class="time">{{option.time}}</span>
       <span class="list-text" flex-box="1">
         {{option.text}}
       </span>
     </div>
   </div>
  </div>
</div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  padding 10px 0
.mark-con
  width 100px
  position relative
  .solid-line
    position absolute
    width 1px
    background rgba(204, 204, 204, 1)
    top 12px
    bottom 0px
    left 26px
.text-con
  width 0
.color-point
  width 12px
  height 12px
  border-radius 50%
  background #4BB08D
  margin-left 20px
.date
  font-size 13px
  color #000
  margin-left 17px
  font-weight bold
  width 50px
.time
  font-size 13px
  color #687179
  width 40px
.list-text
  font-size 13px
  color #000
  width 0
.list-item
  margin-bottom 5px
</style>
<script>
import currDataObj from "../store/index";
import moment from "moment";
export default {
  data() {
    return {
      currDataObj
    };
  },
  computed: {
    list() {
      (this.currDataObj.instanceVitalDtos || []).sort((a, b) => {
        return moment(a.sourceTime).isBefore(b.sourceTime);
      });

      let renderArr = [];

      let timeArr = Array.from(
        new Set(
          (this.currDataObj.instanceVitalDtos || []).map(item =>
            moment(item.sourceTime).format("MM-DD")
          )
        )
      );
      let ObjArr = timeArr.map(item => {
        return {
          day: item,
          list: []
        };
      });

      for (let item of (this.currDataObj.instanceVitalDtos || [])) {
        ObjArr.find(
          option => moment(item.sourceTime).format("MM-DD") == option.day
        ).list.push({
          time: moment(item.sourceTime).format("HH:mm"),
          text: `${item.signName}${item.signValue}`
        });
      }

      return ObjArr;
    }
  },
  components: {}
};
</script>
