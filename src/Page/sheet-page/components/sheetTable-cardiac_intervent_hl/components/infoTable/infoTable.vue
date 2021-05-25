<template>
  <div class="cardiac_intervent-info-contain">
    <!-- {{relObj}} -->
    <div class="row">
      <div style="flex: 1">
        <span>手术名称:</span>
        <input
          type="text"
          class="bottom-line"
          style="width: 500px; text-align: left"
          :data-value="relObj.ssmc"
          v-model="relObj.ssmc"
        />
      </div>
      <div flex="cross:center main:justify">
        <span flex="cross:center">
          <label>
            <input
              type="radio"
              :data-value="relObj.zqss"
              v-model="relObj.zqss"
              value="1"
              :ischecked="relObj.zqss == 1"
              @click="toNull(relObj, 'zqss', '1')"
            />
            <span>择期手术</span>
          </label>
        </span>
        <span flex="cross:center">
          <label>
            <input
              type="radio"
              :data-value="relObj.zqss"
              v-model="relObj.zqss"
              value="2"
              :ischecked="relObj.zqss == 2"
              @click="toNull(relObj, 'zqss', '2')"
            />
            <span>急诊手术</span>
          </label>
        </span>
      </div>
    </div>
    <div class="row">
      <div flex="cross:center main:justify">
        <span>麻醉方式:</span>
        <span flex="cross:center">
          <label>
            <input
              type="radio"
              :data-value="relObj.mzfs"
              v-model="relObj.mzfs"
              value="1"
              :ischecked="relObj.mzfs == 1"
              @click="toNull(relObj, 'mzfs', '1')"
            />
            <span>局麻</span>
          </label>
        </span>
        <span flex="cross:center">
          <label>
            <input
              type="radio"
              :data-value="relObj.mzfs"
              v-model="relObj.mzfs"
              value="2"
              :ischecked="relObj.mzfs == 2"
              @click="toNull(relObj, 'mzfs', '2')"
            />
            <span>静脉全麻</span>
          </label>
        </span>
        <span flex="cross:center">
          <label>
            <input
              type="radio"
              :data-value="relObj.mzfs"
              v-model="relObj.mzfs"
              value="3"
              :ischecked="relObj.mzfs == 3"
              @click="toNull(relObj, 'mzfs', '3')"
            />
            <span>气管内全麻</span>
          </label>
        </span>
        <span flex="cross:center">
          <label>
            <input
              type="radio"
              :data-value="relObj.mzfs"
              v-model="relObj.mzfs"
              value="4"
              :ischecked="relObj.mzfs == 4"
              @click="toNull(relObj, 'mzfs', '4')"
            />
            <span>
              <span style="position: relative;top:1px">其他</span>
              <input
                type="text"
                class="bottom-line"
                style="width: 45px; height: 12px"
                :data-value="relObj.mzfsOther"
                v-model="relObj.mzfsOther"
              />
            </span>
          </label>
        </span>
        <span flex="cross:center">
          <span style="margin-left: 20px">造影剂:</span>
          <label>
            <input
              type="radio"
              :data-value="relObj.zyj"
              v-model="relObj.zyj"
              value="1"
              :ischecked="relObj.zyj == 1"
              @click="toNull(relObj, 'zyj', '1')"
            />
            <span>
              <span style="position: relative;top:1px">优维显</span>
              <input
                type="text"
                class="bottom-line"
                style="width: 40px; height: 12px"
                v-model="relObj.ydx"
                :data-value="relObj.ydx"
              />
              <span>ml</span>
            </span>
          </label>
          <label>
            <input
              type="radio"
              :data-value="relObj.zyj"
              v-model="relObj.zyj"
              value="2"
              :ischecked="relObj.zyj == 2"
              @click="toNull(relObj, 'zyj', '2')"
            />
            <span>
              <span style="position: relative;top:1px">威视派克</span>

              <input
                type="text"
                class="bottom-line"
                style="width: 40px; height: 12px"
                v-model="relObj.wspk"
                :data-value="relObj.wspk"
              />
              <span>ml</span>
            </span>
          </label>
        </span>
      </div>
    </div>
    <div class="row">
      <span style="line-height: 17px;">血管入径:</span>
      <div flex="cross:center main:justify" flex-box="1">
        <span flex="cross:center">
          <span>桡动脉:</span>
          <label>
            <input
              type="radio"
              :data-value="relObj.rdm"
              v-model="relObj.rdm"
              value="1"
              :ischecked="relObj.rdm == 1"
              @click="toNull(relObj, 'rdm', '1')"
            />
            <span>左</span>
          </label>
          <label>
            <input
              type="radio"
              :data-value="relObj.rdm"
              v-model="relObj.rdm"
              value="2"
              :ischecked="relObj.rdm == 2"
              @click="toNull(relObj, 'rdm', '2')"
            />
            <span>右</span>
          </label>
        </span>
        <span flex="cross:center">
          <span>股动脉:</span>
          <label>
            <input
              type="radio"
              :data-value="relObj.gdm"
              v-model="relObj.gdm"
              value="1"
              :ischecked="relObj.gdm == 1"
              @click="toNull(relObj, 'gdm', '1')"
            />
            <span>左</span>
          </label>
          <label>
            <input
              type="radio"
              :data-value="relObj.gdm"
              v-model="relObj.gdm"
              value="2"
              :ischecked="relObj.gdm == 2"
              @click="toNull(relObj, 'gdm', '2')"
            />
            <span>右</span>
          </label>
        </span>
        <span flex="cross:center">
          <span>股静脉:</span>
          <label>
            <input
              type="radio"
              :data-value="relObj.gjm"
              v-model="relObj.gjm"
              value="1"
              :ischecked="relObj.gjm == 1"
              @click="toNull(relObj, 'gjm', '1')"
            />
            <span>左</span>
          </label>
          <label>
            <input
              type="radio"
              :data-value="relObj.gjm"
              v-model="relObj.gjm"
              value="2"
              :ischecked="relObj.gjm == 2"
              @click="toNull(relObj, 'gjm', '2')"
            />
            <span>右</span>
          </label>
        </span>
        <span flex="cross:center">
          <span>颈静脉:</span>
          <label>
            <input
              type="radio"
              :data-value="relObj.jjm"
              v-model="relObj.jjm"
              value="1"
              :ischecked="relObj.jjm == 1"
              @click="toNull(relObj, 'jjm', '1')"
            />
            <span>左</span>
          </label>
          <label>
            <input
              type="radio"
              :data-value="relObj.jjm"
              v-model="relObj.jjm"
              value="2"
              :ischecked="relObj.jjm == 2"
              @click="toNull(relObj, 'jjm', '2')"
            />
            <span>右</span>
          </label>
        </span>
      </div>
    </div>
    <div>
      <span flex="cross:center">
        <span style="margin-left: 61px;">锁骨下静脉:</span>
        <label>
          <input
            type="radio"
            :data-value="relObj.sgxjm"
            v-model="relObj.sgxjm"
            value="1"
            :ischecked="relObj.sgxjm == 1"
            @click="toNull(relObj, 'sgxjm', '1')"
          />
          <span>左</span>
        </label>
        <label>
          <input
            type="radio"
            :data-value="relObj.sgxjm"
            v-model="relObj.sgxjm"
            value="2"
            :ischecked="relObj.sgxjm == 2"
            @click="toNull(relObj, 'sgxjm', '2')"
          />
          <span>右</span>
        </label>
      </span>
    </div>
  </div>
</template>

<script>
import sheetInfo from "../../../config/sheetInfo";
import moment from "moment";
export default {
  data() {
    let a = Object.assign(
      {
        ssrq: "",
        ssmc: "",
        zqss: "",
        jzss: "",
        mzfs: "",
        mzfsOther: "",
        zyj: "",
        ydx: "",
        wspk: "",
        wspk: "",
        rdm: "",
        gdm: "",
        gjm: "",
        jjm: "",
        sgxjm: ""
      },
      sheetInfo.relObj
    );
    Object.assign(sheetInfo.relObj, a);

    return {
      // relObj: sheetInfo.relObj
    };
  },
  methods: {
    onMaskClick(item) {
      console.log(item);
      if (!item.zgsj) {
        item.zgsj = moment().format("YYYY年MM月DD日HH时");
      }
    },
    toNull(obj, key, value) {
      if (obj[key] === value) {
        obj[key] = "";
      }
    }
  },
  computed: {
    relObj() {
      return sheetInfo.relObj;
    }
  },
  components: {}
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.cardiac_intervent-info-contain {
  font-size: 13px;

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
    margin-right: -3px;
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
      top: -1px;
      margin-right: 0;
    }
  }

  .row {
    display: flex;
    margin-bottom: 10px;
  }
}
</style>
