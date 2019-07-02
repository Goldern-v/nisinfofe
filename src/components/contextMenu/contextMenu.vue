<template>
  <div
    v-show="show"
    id="CrContextMenu"
    class="el-autocomplete-suggestion"
    style="transform-origin: center top 0px; z-index: 2045; width: 180px; position: fixed;"
    :style="style"
  >
    <div class="el-scrollbar">
      <div
        class="el-autocomplete-suggestion__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
      >
        <ul class="el-scrollbar__view el-autocomplete-suggestion__list" style="position: relative;">
          <span v-for="item in data" :key="item.name">
            <div class="mark-con" v-if="item.type == 'mark' && initColorValue(item.initValue)">
              <div class="mark-title">添加单元格标记{{cellColorValue}}</div>
              <div class="color-con" flex="cross:center">
                <div
                  class="color-box"
                  v-for="option in colorData"
                  :key="option.name"
                  :style="{background: option.color, 'background-size': 'cover'}"
                  @click="postCellClick(item,option)"
                  @mouseover="colorOnCell(option)"
                  @mouseout="colorOutCell(option)"
                  :class="{active: cellColorValue == option.key}"
                ></div>
              </div>
              <div class="color-desc" :style="!selectedCellColor && {opacity: 0}">
                <span v-if="selectedCellColor == '删除标记'">删除单元格标记</span>
                <span v-else>添加格标记为“{{selectedCellColor}}”</span>
              </div>
            </div>
            <div class="mark-con" v-if="item.type == 'mark'">
              <div class="mark-title">添加单元行标记</div>
              <div class="color-con" flex="cross:center">
                <div
                  class="color-box"
                  v-for="option in colorData"
                  :key="option.name"
                  :style="{background: option.color, 'background-size': 'cover'}"
                  @click="postRowClick(item,option)"
                  @mouseover="colorOnRow(option)"
                  @mouseout="colorOutRow(option)"
                  :class="{active: rowColorValue == option.key}"
                ></div>
              </div>
              <div
                class="color-desc"
                :style="!selectedRowColor && {opacity: 0}"
              >添加行标记为“{{selectedRowColor}}”</div>
            </div>
            <li
              class="row-con"
              v-else
              @click="post($event, item)"
              @mousedown="$event.preventDefault()"
              :class="{disable: item.disable}"
            >
              <i :class="`iconfont icon-${item.icon}`"></i>
              {{item.name}}
            </li>
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
li.disable
  color #999 !important
  cursor not-allowed !important
.row-con
  i
    margin-right 5px
  &:hover
    background #f4f4f4
.mark-con
  border-top 1px solid #EEF6F5
  padding 10px 15px 0
  margin-top 5px
  margin-bottom 0px
  .mark-title
    font-size 13px
    color #333333
.color-con
  padding 10px 4px
  overflow visible
  .color-box
    background #B959FF
    width 11px
    height 11px
    border-radius 50%
    margin-right 9px
    cursor pointer
    position relative
    overflow visible
    &.active:after, &:hover:after
      top -4px
      left -4px
      width 17px
      height 17px
      content ''
      border 1px solid #AAAAAA
      position absolute
      border-radius 50%
.color-desc
  text-align center
  font-size 12px
  color #687179
  margin-top 2px
  margin-bottom 0px
  font-weight lighter
  display none
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
li.disable
  color #999 !important
  cursor not-allowed !important
.row-con
  line-height 30px
  i
    margin-right 5px
  &:hover
    background #f4f4f4
.mark-con
  border-top 1px solid #EEF6F5
  padding 10px 15px
  margin-top 5px
  margin-bottom 5px
  .mark-title
    font-size 13px
    color #333333
.color-con
  padding 10px 4px
  overflow visible
  .color-box
    background #B959FF
    width 11px
    height 11px
    border-radius 50%
    margin-right 9px
    cursor pointer
    position relative
    overflow visible
    &.active:after, &:hover:after
      top -4px
      left -4px
      width 17px
      height 17px
      content ''
      border 1px solid #AAAAAA
      position absolute
      border-radius 50%
.color-desc
  text-align center
  font-size 12px
  color #687179
  margin-top 10px
  font-weight lighter
</style>

<style lang="stylus" scoped>
#CrContextMenu
  >>>.el-autocomplete-suggestion__wrap
    max-height 500px
</style>

<script>
import cancelBtn from "./images/取消颜色标记.png";
import $ from "jquery";
export default {
  data() {
    return {
      show: false,
      style: {},
      data: [],
      selectedCellColor: "",
      selectedRowColor: "",
      rowColorValue: "",
      cellColorValue: "",
      colorData: [
        {
          name: "紫色",
          color: "#B959FF",
          key: 1
        },
        {
          name: "蓝色",
          color: "#30A3FF",
          key: 2
        },
        {
          name: "棕色",
          color: "#A2835E",
          key: 3
        },
        {
          name: "黄色",
          color: "#D0C44F",
          key: 4
        },
        {
          name: "绿色",
          color: "#50D065",
          key: 5
        },
        {
          name: "删除标记",
          color: `url(${cancelBtn})`,
          key: 0
        }
      ]
    };
  },
  methods: {
    open(config) {
      try {
        window.closeAutoCompleteNoId();
      } catch (e) {}
      this.show = true;
      this.style = config.style;
      this.data = config.data;
    },
    close() {
      $(".selectedRow").removeClass("selectedRow");
      this.show = false;
    },
    post(e, item) {
      !item.disable && item.click(e);
    },
    attachWindow() {
      window.openContextMenu = config => {
        this.open(config);
      };
      window.closeContextMenu = () => {
        this.close();
      };
      window.isShowContextMenu = () => {
        return this.show;
      };
      window.addEventListener("mousewheel", () => {
        this.close();
      });
    },
    colorOnRow(item) {
      this.selectedRowColor = item.name;
    },
    colorOutRow() {
      this.selectedRowColor = "";
    },
    colorOnCell(item) {
      this.selectedCellColor = item.name;
    },
    colorOutCell() {
      this.selectedCellColor = "";
    },
    postCellClick(item, option) {
      item.click(option, "cell");
    },
    postRowClick(item, option) {
      item.click(option, "row");
    },
    initColorValue(initValue) {
      this.rowColorValue = initValue.rowValue;
      this.cellColorValue = initValue.cellValue;
      return true;
    }
  },
  mounted() {
    this.attachWindow();
    window.document.addEventListener("click", () => {
      this.close();
    });
  },
  components: {}
};
</script>
