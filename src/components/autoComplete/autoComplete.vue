<template>
  <div class="bg" v-show="show" @click.stop="closeSelf">
    <div
      id="CrAutocomplete"
      class="el-autocomplete-suggestion"
      style="transform-origin: center top 0px; z-index: 2045; width: 120px; position: fixed;"
      :style="style"
      ref="autoBox"
      v-if="!multiple"
    >
      <!-- 下拉框显示序号+内容 -->
      <div
        id="scrollbar-width"
        class="el-scrollbar"
        v-if="data[0] && typeof data[0] == 'object'"
      >
        <div
          class="el-autocomplete-suggestion__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
        >
          <ul
            class="el-scrollbar__view el-autocomplete-suggestion__list"
            style="position: relative;"
          >
            <li
              class
              @click.stop="post(item.value, index)"
              v-for="(item, index) in data"
              :key="item.value"
              :class="{ autoSelected: index == selectIndex }"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 下拉框只显示序号 -->
      <div class="el-scrollbar" v-else>
        <div
          class="el-autocomplete-suggestion__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
        >
          <ul
            class="el-scrollbar__view el-autocomplete-suggestion__list"
            style="position: relative;"
          >
            <li
              class
              @click.stop="post(item, index)"
              v-for="(item, index) in data"
              :key="item"
              :class="{ autoSelected: index == selectIndex }"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div
        class="el-scrollbar child-scrollBar"
        v-if="childData && childData.length"
      >
        <div
          class="el-autocomplete-suggestion__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
        >
          <ul
            class="el-scrollbar__view el-autocomplete-suggestion__list"
            style="position: relative;"
          >
            <li
              class
              @click.stop="post(item)"
              v-for="(item, index) in childData"
              :key="item"
              :class="{ autoSelected: index == selectIndex }"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 多选 -->
    <div
      v-else
      v-show="show && data && data.length > 0"
      id="CrAutocomplete"
      class="el-autocomplete-suggestion"
      style="transform-origin: center top 0px; z-index: 2045; width: 120px; position: fixed;"
      :style="style"
      ref="autoBox"
    >
      <div class="el-scrollbar">
        <div
          class="el-autocomplete-suggestion__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
        >
          <ul
            class="el-scrollbar__view el-autocomplete-suggestion__list"
            style="position: relative;"
          >
            <li
              class
              sytle="width:100%"
              v-for="(item, index) in data"
              @mouseleave="handlerLeave(id)"
              @click="post(item)"
              :key="item + index"
              :class="{
                autoSelected:
                  index == selectIndex || selectedList.indexOf(item.code) > -1
              }"
            >
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.bg{
  width 100%;
  height 100%;
  position absolute;
  top 0;
  left 0;
  z-index:99999;
}
.autoSelected {
  background: #EEF6F5 !important;
}

#CrAutocomplete li:active {
  background: rgb(228, 241, 240);
}

#scrollbar-width {
  min-width: 240px;
  max-width: 300px;
}

.child-scrollBar {
  width: 100%;
  position: absolute;
  right: -120px;
  top: 50%;
  -webkit-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	-o-transform: translateY(-50%);
	transform: translateY(-50%);
}
</style>

<script>
import sheetInfo from "@/Page/sheet-page/components/config/sheetInfo/index.js";
export default {
  data() {
    return {
      show: false,
      style: {},
      data: [],
      callback: "",
      selectIndex: 0,
      id: "",
      childData: [], //子下拉组件
      options: "", //父子数据（父子下拉同时显示数据）
      parentVal: "", //当前父下拉
      splice: "",
      config: "",
      selectedList: [],
      multiple: false
    };
  },
  methods: {
    handlerLeave(id){
      document.querySelector('.bg').addEventListener('click', (e)=>{
        if (e.target.tagName != "LI" && e.target.tagName != "SPAN" && e.target.tagName != "UI") {
          this.show = false
        }
      })
    },
    closeSelf() {
      if(this.multiple) return
      this.show = false;
    },
    open(config) {
      this.config = config;
      this.style = config.style;
      this.callback = config.callback;
      this.splice = config.td && config.td.splice;
      this.multiple = config.multiple;
      this.selectedList = config.selectedList;

      this.options = [];
      this.childData = [];
      this.parentVal = "";

      // 下拉选项有子选项/后一个选项依赖于前一个td的选择
      if (
        process.env.HOSPITAL_ID == "weixian" &&
        config &&
        config.data &&
        config.data.constructor == Object
      ) {
        if (config.data["childOptions"]) {
          this.options = config.data["option"];
          let parentArr = [];
          parentArr = this.options.map(item => {
            return item.key;
          });
          this.data = [...parentArr];
        } else {
          // 出量名称和出量性质
          let arr = [];

          // 首次点击出量性质
          if (config.td && config.td.parentKey) {
            let tr = config.tr;
            tr.map(td => {
              if (td.name == config.td.parentKey) {
                arr = config.data[td.value] || [];
              }
            });
          } else {
            for (let key in config.data) {
              arr.push(key);
            }
          }
          this.data = [...arr];
        }
      } else {
        if (
          process.env.HOSPITAL_ID == "sdlj" &&
          sheetInfo.sheetType == "craniocerebral_sdlj"
        ) {
          if (
            ["consciousness", "reflectionLeft", "reflectionRight"].includes(
              config.td.key
            )
          ) {
            this.data = config.data.data || [];
          } else this.data = config.data || [];
        } else this.data = config.data || [];
      }
      if (this.data && this.data.length >= 1) {
        this.show = true;
      } else {
        this.show = false;
      }

      (this.selectIndex = this.data.length), (this.id = config.id);
      this.$nextTick(() => {
        let offset = this.$refs.autoBox.getBoundingClientRect();
        let left;
        if (this.style.addWidth) {
          left =
            Number(this.style.left.split("px")[0]) +
            Number(this.style.addWidth.split("px")[0]) +
            3 +
            "px";
        } else {
          left =
            Number(this.style.left.split("px")[0] - offset.width - 3) + "px";
        }
        if (window.innerHeight - offset.bottom < 10) {
          let top =
            Number(this.style.top.split("px")[0] - offset.height - 40) + "px";
          this.style = Object.assign({}, this.style, { top, left });
        }
        this.style = Object.assign({}, this.style, { left });
      });
      try {
        if (document.querySelector("#CrContextMenu").style.display != "none") {
          return (this.show = false);
        }
      } catch (e) {}
    },
    close(id) {
      if (this.childData && this.childData.length && this.id == id) {
        let timeId = setTimeout(() => {
          clearTimeout(timeId);
          if (this.childData && this.childData.length) {
            this.show = false;
          }
        }, 2000);
      } else if (this.id == id) {
        this.show = false;
      }
    },
    post(item) {
      if (process.env.HOSPITAL_ID == "sdlj") {
        if (sheetInfo.sheetType == "craniocerebral_sdlj") {
          if (
            ["consciousness", "reflectionLeft", "reflectionRight"].includes(
              this.config.td.key
            )
          ) {
            item = this.config.data.dataVal[
              this.config.data.data.indexOf(item)
            ];
          }
        }
      }
      let flag = true;
      if (this.options && this.options.length) {
        this.options.map(opt => {
          if (opt.key == item && opt.children) {
            this.childData = opt.children || [];
            this.parentVal = item;
            this.show = true;
            flag = false;
          }
        });
      }
      if (flag) {
        if(this.multiple){
          // 多选
          this.callback(item.code);
        }else{
          // 单选
          if (
            process.env.HOSPITAL_ID == "sdlj" &&
            sheetInfo.sheetType == "orthopaedic_sdlj" &&
            this.splice == "&"
          ) {
            item = item;
          } else {
            item = this.parentVal ? item + "(" + this.parentVal + ")" : item;
          }
          this.callback(item);
          this.show = this.splice;
        }
      }
    },
    closeBox(){
       this.$nextTick( () => {
        this.show = false;
      });
    },
    attachWindow() {
      window.openAutoComplete = config => {
        this.open(config);
      };
      window.closeAutoCompleteNoId = () => {
        this.show = false;
      };
      window.closeAutoComplete = id => {
        this.close(id);
      };
      window.isShowAutoComplete = () => {
        return this.show;
      };
      window.addEventListener("mousewheel", e => {
        if (e.target.tagName != "LI") {
          this.show = false;
        }
      });
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (!this.show) return;
      if (e.keyCode == "38") {
        if (this.selectIndex > 0) {
          this.selectIndex--;
        } else {
          this.selectIndex = this.data.length - 1;
        }
      } else if (e.keyCode == "40") {
        if (this.selectIndex < this.data.length - 1) {
          this.selectIndex++;
        } else {
          this.selectIndex = 0;
        }
      } else if (e.keyCode == "13") {
        this.post(this.data[this.selectIndex]);
      }
    });
    this.attachWindow();
  },
  components: {}
};
</script>
