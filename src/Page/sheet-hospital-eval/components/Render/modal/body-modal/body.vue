<template>
  <div style="background: #fff;">
    <div class="body-con">
      <img src="./img/人体图.png" alt class="body-bg" />
      <span
        body-label="1"
        class="body-item img-1"
        @click="selectBody(1)"
        :class="{active: hasSelect(1)}"
      >
        <img src="./img/1.png" alt />
      </span>
      <span
        body-label="2"
        class="body-item img-2"
        @click="selectBody(2)"
        :class="{active: hasSelect(2)}"
      >
        <img src="./img/2.png" alt />
      </span>
      <span
        body-label="3"
        class="body-item img-3"
        @click="selectBody(3)"
        :class="{active: hasSelect(3)}"
      >
        <img src="./img/3.png" alt />
      </span>
      <span
        body-label="4"
        class="body-item img-4"
        @click="selectBody(4)"
        :class="{active: hasSelect(4)}"
      >
        <img src="./img/4.png" alt />
      </span>
      <span
        body-label="5"
        class="body-item img-5"
        @click="selectBody(5)"
        :class="{active: hasSelect(5)}"
      >
        <img src="./img/5.png" alt />
      </span>
      <span
        body-label="6"
        class="body-item img-6"
        @click="selectBody(6)"
        :class="{active: hasSelect(6)}"
      >
        <img src="./img/6.png" alt />
      </span>
      <span
        body-label="7"
        class="body-item img-7"
        @click="selectBody(7)"
        :class="{active: hasSelect(7)}"
      >
        <img src="./img/7.png" alt />
      </span>
      <span
        body-label="8"
        class="body-item img-8"
        @click="selectBody(8)"
        :class="{active: hasSelect(8)}"
      >
        <img src="./img/8.png" alt />
      </span>
      <span
        body-label="9"
        class="body-item img-9"
        @click="selectBody(9)"
        :class="{active: hasSelect(9)}"
      >
        <img src="./img/9.png" alt />
      </span>
      <span
        body-label="10"
        class="body-item img-10"
        @click="selectBody(10)"
        :class="{active: hasSelect(10)}"
      >
        <img src="./img/10.png" alt />
      </span>
      <span
        body-label="11"
        class="body-item img-11"
        @click="selectBody(11)"
        :class="{active: hasSelect(11)}"
      >
        <img src="./img/11.png" alt />
      </span>
      <span
        body-label="12"
        class="body-item img-12"
        @click="selectBody(12)"
        :class="{active: hasSelect(12)}"
      >
        <img src="./img/12.png" alt />
      </span>
      <span
        body-label="13"
        class="body-item img-13"
        @click="selectBody(13)"
        :class="{active: hasSelect(13)}"
      >
        <img src="./img/13.png" alt />
      </span>
      <span
        body-label="14"
        class="body-item img-14"
        @click="selectBody(14)"
        :class="{active: hasSelect(14)}"
      >
        <img src="./img/14.png" alt />
      </span>
      <span
        body-label="15"
        class="body-item img-15"
        @click="selectBody(15)"
        :class="{active: hasSelect(15)}"
      >
        <img src="./img/15.png" alt />
      </span>
      <span
        body-label="16"
        class="body-item img-16"
        @click="selectBody(16)"
        :class="{active: hasSelect(16)}"
      >
        <img src="./img/16.png" alt />
      </span>
      <span
        body-label="17"
        class="body-item img-17"
        @click="selectBody(17)"
        :class="{active: hasSelect(17)}"
      >
        <img src="./img/17.png" alt />
      </span>
      <span
        body-label="18"
        class="body-item img-18"
        @click="selectBody(18)"
        :class="{active: hasSelect(18)}"
      >
        <img src="./img/18.png" alt />
      </span>
      <span
        body-label="19"
        class="body-item img-19"
        @click="selectBody(19)"
        :class="{active: hasSelect(19)}"
      >
        <img src="./img/19.png" alt />
      </span>
      <span
        body-label="20"
        class="body-item img-20"
        @click="selectBody(20)"
        :class="{active: hasSelect(20)}"
      >
        <img src="./img/20.png" alt />
      </span>
      <span
        body-label="21"
        class="body-item img-21"
        @click="selectBody(21)"
        :class="{active: hasSelect(21)}"
      >
        <img src="./img/21.png" alt />
      </span>
      <span
        body-label="22"
        class="body-item img-22"
        @click="selectBody(22)"
        :class="{active: hasSelect(22)}"
      >
        <img src="./img/22.png" alt />
      </span>
      <span
        body-label="23"
        class="body-item img-23"
        @click="selectBody(23)"
        :class="{active: hasSelect(23)}"
      >
        <img src="./img/23.png" alt />
      </span>
      <span
        body-label="24"
        class="body-item img-24"
        @click="selectBody(24)"
        :class="{active: hasSelect(24)}"
      >
        <img src="./img/24.png" alt />
      </span>
      <span
        body-label="25"
        class="body-item img-25"
        @click="selectBody(25)"
        :class="{active: hasSelect(25)}"
      >
        <img src="./img/25.png" alt />
      </span>
      <span
        body-label="26"
        class="body-item img-26"
        @click="selectBody(26)"
        :class="{active: hasSelect(26)}"
      >
        <img src="./img/26.png" alt />
      </span>
      <span
        body-label="27"
        class="body-item img-27"
        @click="selectBody(27)"
        :class="{active: hasSelect(27)}"
      >
        <img src="./img/27.png" alt />
      </span>
      <span
        body-label="28"
        class="body-item img-28"
        @click="selectBody(28)"
        :class="{active: hasSelect(28)}"
      >
        <img src="./img/28.png" alt />
      </span>
      <span
        body-label="29"
        class="body-item img-29"
        @click="selectBody(29)"
        :class="{active: hasSelect(29)}"
      >
        <img src="./img/29.png" alt />
      </span>
      <span
        body-label="30"
        class="body-item img-30"
        @click="selectBody(30)"
        :class="{active: hasSelect(30)}"
      >
        <img src="./img/30.png" alt />
      </span>
      <span
        body-label="31"
        class="body-item img-31"
        @click="selectBody(31)"
        :class="{active: hasSelect(31)}"
      >
        <img src="./img/31.png" alt />
      </span>
      <span
        body-label="32"
        class="body-item img-32"
        @click="selectBody(32)"
        :class="{active: hasSelect(32)}"
      >
        <img src="./img/32.png" alt />
      </span>
      <span
        body-label="33"
        class="body-item img-33"
        @click="selectBody(33)"
        :class="{active: hasSelect(33)}"
      >
        <img src="./img/33.png" alt />
      </span>
      <span
        body-label="34"
        class="body-item img-34"
        @click="selectBody(34)"
        :class="{active: hasSelect(34)}"
      >
        <img src="./img/34.png" alt />
      </span>
      <span
        body-label="35"
        class="body-item img-35"
        @click="selectBody(35)"
        :class="{active: hasSelect(35)}"
      >
        <img src="./img/35.png" alt />
      </span>
      <span
        body-label="36"
        class="body-item img-36"
        @click="selectBody(36)"
        :class="{active: hasSelect(36)}"
      >
        <img src="./img/36.png" alt />
      </span>
      <span
        body-label="37"
        class="body-item img-37"
        @click="selectBody(37)"
        :class="{active: hasSelect(37)}"
      >
        <img src="./img/37.png" alt />
      </span>
      <span
        body-label="38"
        class="body-item img-38"
        @click="selectBody(38)"
        :class="{active: hasSelect(38)}"
      >
        <img src="./img/38.png" alt />
      </span>
      <span
        body-label="39"
        class="body-item img-39"
        @click="selectBody(39)"
        :class="{active: hasSelect(39)}"
      >
        <img src="./img/39.png" alt />
      </span>
      <span
        body-label="40"
        class="body-item img-40"
        @click="selectBody(40)"
        :class="{active: hasSelect(40)}"
      >
        <img src="./img/40.png" alt />
      </span>
      <span
        body-label="41"
        class="body-item img-41"
        @click="selectBody(41)"
        :class="{active: hasSelect(41)}"
      >
        <img src="./img/41.png" alt />
      </span>
      <span
        body-label="42"
        class="body-item img-42"
        @click="selectBody(42)"
        :class="{active: hasSelect(42)}"
      >
        <img src="./img/42.png" alt />
      </span>
      <span
        body-label="43"
        class="body-item img-43"
        @click="selectBody(43)"
        :class="{active: hasSelect(43)}"
      >
        <img src="./img/43.png" alt />
      </span>
      <span
        body-label="44"
        class="body-item img-44"
        @click="selectBody(44)"
        :class="{active: hasSelect(44)}"
      >
        <img src="./img/44.png" alt />
      </span>
      <span
        body-label="45"
        class="body-item img-45"
        @click="selectBody(45)"
        :class="{active: hasSelect(45)}"
      >
        <img src="./img/45.png" alt />
      </span>
      <span
        body-label="46"
        class="body-item img-46"
        @click="selectBody(46)"
        :class="{active: hasSelect(46)}"
      >
        <img src="./img/46.png" alt />
      </span>
      <span
        body-label="47"
        class="body-item img-47"
        @click="selectBody(47)"
        :class="{active: hasSelect(47)}"
      >
        <img src="./img/47.png" alt />
      </span>
      <span
        body-label="48"
        class="body-item img-48"
        @click="selectBody(48)"
        :class="{active: hasSelect(48)}"
      >
        <img src="./img/48.png" alt />
      </span>
      <span
        body-label="49"
        class="body-item img-49"
        @click="selectBody(49)"
        :class="{active: hasSelect(49)}"
      >
        <img src="./img/49.png" alt />
      </span>
      <span
        body-label="50"
        class="body-item img-50"
        @click="selectBody(50)"
        :class="{active: hasSelect(50)}"
      >
        <img src="./img/50.png" alt />
      </span>
      <span
        body-label="51"
        class="body-item img-51"
        @click="selectBody(51)"
        :class="{active: hasSelect(51)}"
      >
        <img src="./img/51.png" alt />
      </span>
      <span
        body-label="52"
        class="body-item img-52"
        @click="selectBody(52)"
        :class="{active: hasSelect(52)}"
      >
        <img src="./img/52.png" alt />
      </span>
      <p class="up-text-1">正</p>
      <p class="down-text-1">反</p>
      <p class="up-text-2">正</p>
      <p class="down-text-2">反</p>
    </div>
    <!-- <p class="body-text">选择的疼痛部位：</p>
    <span v-for="item in bodyList" :key="item" class="text-item">{{item}}:{{item | toDetail}}</span>-->
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con
  background #fff
  width 652px;
  height 479px;
  position relative
  .body-item
    position absolute
    cursor pointer
    &::before
      content attr(body-label)
      position absolute
      top 0;
      bottom 0
      left 0;
      right 0
      width 20px;
      height 20px;
      text-align center
      margin auto
      font-size 12px
      color #333
      // font-weight lighter
      // border 1px solid #ccc
      // background #ffffff
      // border-radius 50%
    img
      opacity 0
      &:hover
        opacity .6
    &.active img
      opacity 1
.body-bg
  top 0
  left 0
  opacity 1 !important
.img-1
  top 0
  left 66px
.img-2
  top 0
  left 92px
.img-3
  top 66px
  left 73px
.img-4
  top 79px
  left 31px
.img-5
  top 80px
  left 93px
.img-6
  top 119px
  left 25px
.img-7
  top 158px
  left 18px
.img-8
  top 220px
  left 0px
.img-9
  top 127px
  left 134px
.img-10
  top 161px
  left 140px
.img-11
  top 217px
  left 152px
.img-12
  top 142px
  left 51px
.img-13
  top 206px
  left 54px
.img-14
  top 214px
  left 48px
.img-15
  top 319px
  left 58px
.img-16
  top 423px
  left 60px
.img-17
  top 220px
  left 93px
.img-18
  top 317px
  left 95px
.img-19
  top 421px
  left 99px
.img-20
  top 0px
  left 300px
.img-21
  top 0px
  left 326px
.img-22
  top 66px
  left 307px
.img-23
  top 79px
  left 265px
.img-24
  top 80px
  left 327px
.img-25
  top 119px
  left 259px
.img-26
  top 158px
  left 252px
.img-27
  top 220px
  left 235px
.img-28
  top 127px
  left 368px
.img-29
  top 161px
  left 374px
.img-30
  top 216px
  left 387px
.img-31
  top 144px
  left 286px
.img-32
  top 140px
  left 328px
.img-33
  top 206px
  left 284px
.img-34
  top 247px
  left 284px
.img-35
  top 319px
  left 293px
.img-36
  top 423px
  left 294px
.img-37
  top 205px
  left 327px
.img-38
  top 236px
  left 328px
.img-39
  top 316px
  left 330px
.img-40
  top 420px
  left 333px
.img-41
  top 261px
  left 511px
.img-42
  top 279px
  left 515px
.img-43
  top 309px
  left 529px
.img-44
  top 120px
  left 511px
.img-45
  top 136px
  left 514px
.img-46
  top 170px
  left 528px
.img-47
  top 262px
  left 578px
.img-48
  top 280px
  left 572px
.img-49
  top 310px
  left 564px
.img-50
  top 122px
  left 582px
.img-51
  top 139px
  left 578px
.img-52
  top 172px
  left 569px
.body-text
  text-align left
  margin-top 20px
  margin-bottom 10px
  font-size 14px;
.text-item
  font-size 13px;
  margin-right 10px;
  border 1px solid #c4c4c4
  padding 3px 15px
  border-radius 2px
  margin-bottom 5px
  float left
.up-text-1
  position absolute
  top 460px
  left 85px
  color #999
.down-text-1
  position absolute
  top 460px
  left 322px
  color #999
.up-text-2
  position absolute
  top 340px
  left 555px
  color #999
.down-text-2
  position absolute
  top 206px
  left 555px
  color #999
</style>

<script>
import _ from "lodash";
import bodyData from "./data/body-data";
export default {
  props: {
    formObj: Object,
    obj: Object
  },
  data() {
    return {
      mode: "1", //'0' 单选， 1 多选
      bodyList: [],
      fun: "",
      callback: null,
      formCode:"E0100"
    };
  },
  filters: {
    toDetail(val) {
      return bodyData[val];
    }
  },
  methods: {
    selectBody(item) {
      if (!item) {
        return;
      }
      if (this.mode == 0) {
        this.bodyList = [item];
      } else {
        let index = _.indexOf(this.bodyList, item);
        if (index > -1) {
          this.bodyList.splice(index, 1);
        } else {
          this.bodyList.push(item);
        }
        //
        let value = this.bodyList.map(item => bodyData[item]).join("，");
        //
        if (this.formObj && this.formObj.model) {
          this.formObj.model[this.obj.name] = value;
        }
        /** 赋值 */
        console.log(value, this.bodyList, this.formObj, this.obj, "人体图赋值");
        // this.$root.$refs[this.obj.name].$parent.inputValue = this.bodyList
        //   .map(item => bodyData[item])
        //   .join("，");

        // Object.keys(this.$root.$refs[this.obj.name]).map(elkey=>{
        //   this.$root.$refs[this.obj.name][elkey].$parent.inputValue = this.bodyList
        //   .map(item => bodyData[item])
        //   .join("，");
        // })
        //
        this.setElementValue(this.obj.name, value);
      }
    },
    hasSelect(item) {
      if (_.indexOf) {
        if (_.indexOf(this.bodyList, item) > -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    setElementValue(key, value) {
      Object.keys(this.$root.$refs[this.formCode][key]).map(elkey => {
        this.$root.$refs[this.formCode][key][elkey].setCurrentValue(value);
      });
    },
    getElementValue(key) {
      let result = "";
      Object.keys(this.$root.$refs[this.formCode][key]).map(elkey => {
        result = this.$root.$refs[this.formCode][key][elkey].currentValue;
      });
      return result;
    },
    getValueRule(key, value) {
      let textResult = "";
      Object.keys(this.$root.$refs[this.formCode][key]).map(elkey => {
        textResult = this.$root.$refs[this.formCode][key][elkey].checkValueRule(
          value
        );
      });
      return textResult;
    }
  },
  mounted() {
    // this.open()
    //赋值
    try {
      let bodyDataReverse = {};
      for (let key in bodyData) {
        if (bodyData.hasOwnProperty(key)) {
          bodyDataReverse[bodyData[key]] = Number(key);
        }
      }
      setTimeout(() => {
        if (this.formObj.model[this.obj.name]) {
          this.bodyList = this.formObj.model[this.obj.name]
            .split("，")
            .map(item => bodyDataReverse[item]);
        }
      }, 100);
    } catch (error) {
      console.log(error, "eeeeeeee");
    }
  },
  components: {}
};
</script>
