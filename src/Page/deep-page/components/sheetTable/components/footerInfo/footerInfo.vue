<template>
  <div class="footer-con deep-footer-contain">
    <div class="reason" flex>
      <label>
        <span>拔管原因：</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.bgyy"
          @click="toNull(relObj, 'bgyy', '1')"
          value="1"
          :ischecked="relObj.bgyy == 1"
        />
        <span>治疗结束</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.bgyy"
          @click="toNull(relObj, 'bgyy', '2')"
          value="2"
          :ischecked="relObj.bgyy == 2"
        />
        <span>出院</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.bgyy"
          @click="toNull(relObj, 'bgyy', '3')"
          value="3"
          :ischecked="relObj.bgyy == 3"
        />
        <span>感染</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.bgyy"
          @click="toNull(relObj, 'bgyy', '4')"
          value="4"
          :ischecked="relObj.bgyy == 4"
        />
        <span>堵塞</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.bgyy"
          @click="toNull(relObj, 'bgyy', '5')"
          value="5"
          :ischecked="relObj.bgyy == 5"
        />
        <span>脱管</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.bgyy"
          @click="toNull(relObj, 'bgyy', '6')"
          value="6"
          :ischecked="relObj.bgyy == 6"
        />
        <span>渗透</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.bgyy"
          @click="toNull(relObj, 'bgyy', '7')"
          value="7"
          :ischecked="relObj.bgyy == 7"
        />
        <span>断裂</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.bgyy"
          @click="toNull(relObj, 'bgyy', 'other')"
          value="other"
          :ischecked="relObj.bgyy == 'other'"
        />
        <span>其他</span>
        <input
          type="text"
          class="bottom-line"
          style="width: 50px"
          :data-value="relObj.bgyyother"
          v-model="relObj.bgyyother"
          :disabled="(relObj.bgyy !== 'other')"
        />
      </label>
      <div flex-box="1"></div>
      <label style="margin-left: 8px;">
        <span>拔管者：</span>
        <input
          type="text"
          class="bottom-line"
          :class="{printSign:relObj[`signNoPageIndex${pageIndex}`]}"
          style="width: 90px"
          v-model="relObj[`signNamePageIndex${pageIndex}`]"
          :data-value="relObj[`signNamePageIndex${pageIndex}`]"
          @click="toSign"
        />
        <img
          :src="`/crNursing/api/file/signImage/${relObj[`signNoPageIndex${this.pageIndex}`]}?${token}`"
          alt
          class="sign-img"
          v-if="relObj[`signNoPageIndex${pageIndex}`]"
        />
      </label>
    </div>
    <div style="margin-top: 5px" flex>
      <label>
        <span>拔出导管是否完整：</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.dgsfwz"
          @click="toNull(relObj, 'dgsfwz', '1')"
          value="1"
          :ischecked="relObj.dgsfwz == 1"
        />
        <span>是</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.dgsfwz"
          @click="toNull(relObj, 'dgsfwz', 'no')"
          value="no"
          :ischecked="relObj.dgsfwz == 'no'"
        />
        <span>否</span>
      </label>
      （
      <label>
        <input
          type="radio"
          v-model="relObj.dgsfwzno"
          @click="toNull(relObj, 'dgsfwzno', '1')"
          value="1"
          :disabled="relObj.dgsfwz !== 'no'"
          :ischecked="relObj.dgsfwzn == 1"
        />
        <span>断管</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.dgsfwzno"
          @click="toNull(relObj, 'dgsfwzno', '2')"
          value="2"
          :disabled="relObj.dgsfwz !== 'no'"
          :ischecked="relObj.dgsfwzn == 2"
        />
        <span>破损</span>
      </label>
      <label>
        <input
          type="radio"
          v-model="relObj.dgsfwzno"
          @click="toNull(relObj, 'dgsfwzno', 'other')"
          value="other"
          :disabled="relObj.dgsfwz !== 'no'"
          :ischecked="relObj.dgsfwzno == 'other'"
        />
        <span>其他</span>
        <input
          type="text"
          class="bottom-line"
          style="width: 50px"
          v-model="relObj.dgsfwzother"
          :data-value="relObj.dgsfwzother"
          :disabled="(relObj.dgsfwzno !== 'other')"
        />
      </label>
      ）
      <div flex-box="1"></div>
      <label style="margin-left: 8px;">
        <span>拔管时间：</span>
        <!-- <input type="text" class="bottom-line" style="width: 120px" v-model="relObj.bgsj" :data-value="relObj.bgsj"> -->
        <masked-input
          type="text"
          @click="onMaskClick(relObj)"
          class="bottom-line"
          style="width: 90px"
          :showMask="false"
          v-model="relObj.bgsj"
          :data-value="relObj.bgsj"
          :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]"
          :guide="true"
          placeholderChar=" "
        ></masked-input>
      </label>
    </div>
    <div class="bz" v-if="sheetInfo.sheetType == 'picc'">
      <div class="bz-title">备注</div>
      <div class="bz-text">
        1.每班评估，在相应栏目填写序号或数字，"✓", "✕", 空项目划 "/"。
        <br />2.穿刺点及周围皮肤：➀正常 ➁渗血 ➂渗液 ➃脓性分泌物 ➄红肿 ➅硬结 ➆触痛 ➇皮温高 ➈皮疹
        <br />3.敷料固定情况：➀完好 ➁卷边 ➂松脱 ➃潮湿
        <br />4.特殊情况记录：穿刺点及皮肤异常情况或导管移位\破损\堵塞\感染等的处理。
      </div>
    </div>
    <div class="bz" v-if="sheetInfo.sheetType == 'icupicc'">
      <div class="bz-title">说明:</div>
      <div class="bz-text">
        1.每班评估，在相应栏目填写序号或数字，"✓", "✕", 空项目划 "/"。PICC每周测量臂围一次，有特殊情况随时测量。
        <br />2.穿刺点及周围皮肤：➀正常 ➁渗血 ➂渗液 ➃脓性分泌物 ➄红肿 ➅硬结 ➆触痛 ➇皮温高 ➈皮疹
        <br />3.特殊情况记录：穿刺点及皮肤异常时的处理情况、血标本送检、血液透析等。
      </div>
    </div>
    <signModal ref="signModal"></signModal>
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import sheetInfo from "../../../config/sheetInfo";
import moment from "moment";
import { getUser } from "@/api/common.js";
import signModal from "@/components/modal/two-sign.vue";
import common from "@/common/mixin/common.mixin.js";
export default {
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      bgyyotherstore: ""
    };
  },
  mixins: [common],
  props: {
    pageIndex: Number,
    pageNo: Number,
  },
  methods: {
    onMaskClick(item) {
      if (!item.bgsj) {
        item.bgsj = moment().format("YYYY-MM-DD");
      }
    },
    toNull(obj, key, value) {
      if (obj[key] === value) {
        obj[key] = "";
      }
    },
    toSign() {
      this.$refs.signModal.open(
        (password, empNo, signCallback, signType) => {
          if (signType == 2) {
            let tips =
              this.relObj[`signNamePageIndex${this.pageIndex}`] != empNo
                ? "签名成功"
                : "取消签名成功";
            this.$notify.success({
              title: "提示",
              message: tips
            });
            this.relObj[`signNamePageIndex${this.pageIndex}`] =
              this.relObj[`signNamePageIndex${this.pageIndex}`] != empNo
                ? empNo
                : "";
            this.relObj[`signNoPageIndex${this.pageIndex}`] = "";
            this.relObj = Object.assign({}, this.relObj);
            this.bus.$emit("saveSheetPage");
            return;
          }
          getUser(empNo, password).then(res => {
            let empNo = res.data.data.empNo,
              empName = res.data.data.empName;
            if (
              this.relObj[`signNoPageIndex${this.pageIndex}`] == empNo &&
              this.relObj[`signNamePageIndex${this.pageIndex}`] == empName
            ) {
              this.relObj[`signNamePageIndex${this.pageIndex}`] = "";
              this.relObj[`signNoPageIndex${this.pageIndex}`] = "";
              this.$notify.success({
                title: "提示",
                message: "取消签名成功"
              });
            } else {
              this.relObj[`signNamePageIndex${this.pageIndex}`] = empName;
              this.relObj[`signNoPageIndex${this.pageIndex}`] = empNo;
              this.$notify.success({
                title: "提示",
                message: "签名成功"
              });
            }
            this.relObj = Object.assign({}, this.relObj);
            this.bus.$emit("saveSheetPage");
            // 保存用户信息
            if(signCallback && signCallback.constructor == Function){
              signCallback();
            }
          });
        },
        this.relObj[`signNamePageIndex${this.pageIndex}`],
        this.relObj[`signNoPageIndex${this.pageIndex}`]
      );
    }
  },
  computed: {
    relObj(){
      return (this.sheetInfo.relObjs[this.pageNo] && this.sheetInfo.relObjs[this.pageNo].relObj) || {};
    },
    bgyy() {
      return this.relObj.bgyy;
    },
    dgsfwz() {
      return this.relObj.dgsfwz;
    },
    dgsfwzno() {
      return this.relObj.dgsfwzno;
    }
  },
  watch: {
    bgyy() {
      if (this.bgyy !== "other") {
        if (this.relObj.bgyyother) {
          this.bgyyotherstore = this.relObj.bgyyother;
        }
        this.relObj.bgyyother = "";
      } else {
        if (this.relObj.bgyyother === "" && this.bgyyotherstore) {
          this.relObj.bgyyother = this.bgyyotherstore;
        }
      }
    },
    dgsfwz() {
      if (this.dgsfwz !== "no") {
        this.relObj.dgsfwzno = "";
      }
    },
    dgsfwzno() {
      if (this.dgsfwzno !== "other") {
        this.relObj.dgsfwzother = "";
      }
    }
  },
  components: {
    signModal
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.deep-footer-contain {
  font-size: 12px;

  .reason {
    align-items: center;
  }

  .bottom-line {
    border: 0;
    border-bottom: 1px solid #000000;
    width: 30px;
    outline: none;
    text-align: center;
  }

  input[type='radio'] {
    -webkit-appearance: none;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    border: 1px solid #777;
    border-radius: 2px;
  }

  input[type='radio']:checked {
    font-size: 10;
    position: relative;
  }

  input[type='radio']:checked:before {
    content: '';
    width: 8px;
    transform: rotate(45deg);
    position: absolute;
    top: 7px;
    left: -2px;
    border-top: 3px solid #000;
  }

  input[type='radio']:checked:after {
    content: '';
    width: 14px;
    transform: rotate(-50deg) translateY(-50%) translateX(50%);
    position: absolute;
    border-top: 3px solid #000;
    top: 10px;
    left: -2px;
  }

  label {
    cursor: pointer;

    input, span {
      vertical-align: middle !important;
    }

    input {
      position: relative;
      top: -2px;
      margin-right: 0;
      background: #fff;
    }
  }

  .footer-con {
    font-size: 13px;
    margin-top: 15px;
  }

  .bz {
    margin-top: 10px;
    font-size: 12px;
  }

  .bz-title {
    float: left;
    margin-top: 2px;
  }

  .bz-text {
    margin-left: 32px;
    line-height: 18px;
  }

  .sign-img {
    display: none;
  }
}

#sheetPagePrint {
  .deep-footer-contain {
    .printSign {
      display: none !important;
    }
    .sign-img {
      display: inline-block;
      vertical-align: middle;
      height: auto !important;
    }
  }
}
</style>
