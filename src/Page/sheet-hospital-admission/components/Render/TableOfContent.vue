<template>
  <div class="table-of-content">
    <!-- <div class="table-of-content-button" @click="isShow=!isShow"> -->
    <!-- <el-tooltip content="目录" placement="top" effect="light">
        <img :src="contentImgae" alt>
    </el-tooltip>-->
    <!-- </div> -->
    <div
      v-if="isShow"
      class="table-of-content-box"
      :class="isShow ? '' : 'table-show'"
      ref="tableOfContent"
      :style="{ height: wih - 100 + 'px' }"
    >
      <!-- formGroupTitle -->
      <div class="title-box">目录</div>
      <div class="list-box">
        <ul>
          <template v-for="(t, i) in formObj.body">
            <li
              v-if="t.type === 'formGroupTitle'"
              :key="i"
              :class="t.level === '2' ? 'title-level-two' : ''"
              @click="scrollTo($event, t.title)"
            >
              <el-tooltip
                class="item"
                effect="light"
                placement="left"
                v-if="
                  formatTitle(
                    t.title +
                      (missingItems && missingItems[t.title]
                        ? `(漏${missingItems[t.title].length}项)`
                        : '')
                  ).length > 16
                "
              >
                <div slot="content">
                  <span>
                    <span
                      :class="{
                        'missing-items': missingItems && missingItems[t.title]
                      }"
                      >{{ t.title
                      }}{{
                        missingItems && missingItems[t.title]
                          ? `(漏${missingItems[t.title].length}项)`
                          : ""
                      }}</span
                    >
                  </span>
                </div>
                <span
                  :class="{
                    'missing-items': missingItems && missingItems[t.title]
                  }"
                  >{{
                    formatTitle(
                      t.title +
                        (missingItems && missingItems[t.title]
                          ? `(漏${missingItems[t.title].length}项)`
                          : "")
                    )
                  }}</span
                >
              </el-tooltip>
              <span
                v-if="
                  formatTitle(
                    t.title +
                      (missingItems && missingItems[t.title]
                        ? `(漏${missingItems[t.title].length}项)`
                        : '')
                  ).length <= 16
                "
                :class="{
                  'missing-items': missingItems && missingItems[t.title]
                }"
                >{{
                  formatTitle(
                    t.title +
                      (missingItems && missingItems[t.title]
                        ? `(漏${missingItems[t.title].length}项)`
                        : "")
                  )
                }}</span
              >
            </li>
            <!-- <a :href="'#'+t.title">{{t.title}}</a> -->
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";
import commonMixin from "@/common/mixin/common.mixin";
export default {
  mixins: [commonMixin],
  name: "TableOfContent",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {
    // tooltip
  },
  data() {
    return {
      contentImgae: null,
      isShow: true,
      missingItems: null
    };
  },
  computed: {
    // missingItems(){
    //   return window.formObj&&window.formObj.missingItems?window.formObj.missingItems:null
    // }
  },
  watch: {
    // formObj:{
    //     handler:(val,oldVal)=>{
    //       console.log('watch:missingItems',val,oldVal)
    //       if(val && val.hasOwnProperty('missingItems')){
    //         try {
    //           this.missingItems = JSON.parse(JSON.stringify(val.missingItems)) || null
    //         } catch (error) {
    //           //
    //         }
    //       }
    //       // this.missingItems = window.formObj&&window.formObj.missingItems?window.formObj.missingItems:null
    //     },
    //     deep:true
    // }
  },
  mounted() {
    this.contentImgae = require("./image/锚点定位.png");

    if (this.$root.$refs.tableOfContent) {
      this.$root.$refs.tableOfContent[
        "updateMissingItems"
      ] = this.updateMissingItems;
    }

    // document.querySelector('.sheetTable-contain').scrollTop
    // document.querySelector('a[name="2.3 呼吸系统"]').offsetTop

    // document.querySelector('.sheetTable-contain').scrollTo(0,document.querySelector('a[name="2.3 呼吸系统"]').offsetTop)
  },
  created() {},
  methods: {
    updateMissingItems(missingItems) {
      // console.log("updateMissingItems", missingItems);
      this.missingItems = missingItems;
    },
    scrollTo(e, title) {
      let target = document.querySelector(".sheetTable-contain");
      // let target = document.querySelector(".pages");
      let currentY = target.scrollTop;
      let targetY = document.querySelector(`a[name="${title}"]`).offsetTop;
      this.scrollAnimation(target, currentY, targetY - 20);
    },
    scrollAnimation(element, currentY, targetY) {
      if (!element) {
        return;
      }
      // 计算需要移动的距离
      let needScrollTop = targetY - currentY;
      let _currentY = currentY;
      setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10);
        _currentY += dist;
        try {
          // element.scrollTo(_currentY, currentY);
          element.scrollTop = _currentY;
          // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
          if (needScrollTop > 10 || needScrollTop < -10) {
            this.scrollAnimation(element, _currentY, targetY);
          } else {
            // element.scrollTo(_currentY, targetY);
            element.scrollTop = _currentY;
          }
        } catch (error) {
          console.log(error, element);
        }
      }, 1);
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    formatTitle(title, limt = 16) {
      if (!title) {
        return "";
      }
      let result = title + "";
      if (title && title.length > limt) {
        result = title.substring(0, limt) + "..";
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox, .el-select, .is-bordered, .el-checkbox--small, .el-input, .el-input--small, .el-input-group, .el-input-group--prepend {
  margin: 5px 0px;
  vertical-align: bottom;
  width: 100%;
}

.table-of-content-button {
  background: white;
  width: auto;
  height: auto;
  padding: 10px;
  border: 1px solid rgba(204, 204, 204, 1);

  &:hover {
    border: 1px solid #4baf8d;
    cursor: pointer;
  }
}

.title-box {
  height: 13px;
  background: #F1F1F5;
  padding: 10px;
  font-size: 13px;
}

.list-box {
  margin: 10px 0;
}

// .table-of-content {
//   position: fixed;
//   top: 40%;
//   right: 1%;
//   background: transparent;
//   z-index: 9;
//   transition: all 0.3s ease-out;
// }
.table-of-content {
  width 0
  height 0
  position: fixed;
  top: 100px;
  background: transparent;
  // z-index: 9;
  transition: all 0.3s ease-out;
}

.table-of-content-box {
  background: white;
  border: 1px solid rgba(204, 204, 204, 1);
  width: 220px;
  height: auto;
  // max-height: 480px;
  overflow: auto;
  // position: fixed;
  // right: calc(2% + 40px);
  // top: 18%;
  // padding: 10px;
  background: rgba(255, 255, 255, 1);
  // box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  right: 8px;
}

.title-level-two {
  font-size: 12px;
  text-indent: 1.25em;
}

.table-show {
  width: 0px;
  height: 0px;
  transition: all 0.3s ease-out;
}

ul, li {
  line-height: 2em;
  font-size: 12px;
  list-style-type: none;
  padding-left: 7px;
}

li:hover {
  // outline 1px solid #4baf8d
  color: #4baf8d;
  cursor: pointer;
  transition: color 0.3s;
  background: #eef5f5;
}

a {
  text-decoration-line: none;
  color: black;
  font-size: 12px;

  &:visited {
    color: black;
  }

  &:active {
    color: black;
  }

  &:hover {
    color: #4baf8d;
  }
}

.missing-items {
  color: red;
  // font-size: 11px;
}

>>>.el-input__inner.el-input__inner.el-input__inner {
  width: 100%;
  border-radius: 0px;
}
</style>
