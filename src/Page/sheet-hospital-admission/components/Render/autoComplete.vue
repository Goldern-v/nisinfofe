<template>
  <div
    v-show="show && data && data.length>0"
    id="CrAutocomplete"
    class="cr-autocomplete-suggestion-his"
    :style="style"
    ref="autoBox"
  >
    <div class="cr-scrollbar">
      <div
        class="cr-autocomplete-suggestion__wrap cr-scrollbar__wrap cr-scrollbar__wrap--hidden-default"
      >
        <ul class="cr-scrollbar__view cr-autocomplete-suggestion__list" style="position: relative;">
          <li
            class
            sytle="width:100%"
            v-for="(item, index) in data"
            @onblur.stop="close(id)"
            @click="post($event,item)"
            :key="item+index"
            :class="{autoSelected: (index == selectIndex||selectedList.indexOf(item.code)>-1)}"
          >
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.autoSelected {
  background: #EEF6F5 !important;
  // background: #52b08e !important;
  // color: white!important;
}

#CrAutocomplete li:active {
  background: rgb(228, 241, 240);
}

.cr-autocomplete-suggestion-his {
    transform-origin: center top 0px;
    z-index: 1;
    width: 120px;
    position: fixed;
    margin: 5px 0;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, .04), 0 2px 4px 0 rgba(0, 0, 0, .12);
    z-index: 999999


.cr-scrollbar {
    overflow: hidden;
    position: relative;
}

.cr-scrollbar__wrap {
    overflow: scroll;
}

.cr-autocomplete-suggestion__wrap {
    max-height: 280px;
    overflow: auto;
    background-color: #fff;
    padding: 6px 0;
    border-radius: 2px;
}

.cr-autocomplete-suggestion__wrap, .cr-pager li {
    border: 1px solid rgb(209, 229, 224);
    box-sizing: border-box;
}

.cr-autocomplete-suggestion__list {
    margin: 0;
    padding: 0;
    li {
      border: 0px solid rgb(209, 229, 224);
      font-size: 14px;
      padding: 8px 10px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgb(72, 106, 98);
      height: 36px;
      line-height: 1.5;
      box-sizing: border-box;
      &:hover{
        background-color: #4bb08d!important;
        color: white;
        cursor: pointer;
      }
    }
}
}

</style>

<script>
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      show: false,
      style: {},
      data: [],
      callback: null,
      selectedList: [],
      selectIndex: 0,
      parentEl: null,
      multiplechoice: false,
      obj: new Object(),
      id: ""
    };
  },
  methods: {
    open(config) {
      // if (config.data.length > 0) {
      /*重复打开下拉*/
      setTimeout(() => {
        this.show = true;
      }, 100);
      // }
      // if(!this.show){return}
      if (!config.currentValue && config.data && config.data.length > 0) {
        config.currentValue = config.data[0].name;
      }
      this.multiplechoice = config.multiplechoice
        ? config.multiplechoice
        : false;
      this.style = config.style || "";
      this.obj = config.obj;
      this.callback = config.callback || null;
      this.data = config.data || [];
      this.parentEl = config.parentEl || null;
      this.selectedList = config.selectedList ? config.selectedList : [];
      this.selectIndex =
        this.data.map(item => item.name).indexOf(config.currentValue) || 0;
      this.id = config.id;

      (this.selectIndex = this.data.length), (this.id = config.id);

      console.log("open:config", config, this.selectedList, this.getStatus());

      this.$nextTick(() => {
        if (this.$refs.autoBox) {
          let offset = this.$refs.autoBox.getBoundingClientRect();
          let elOffest = this.parentEl.getBoundingClientRect();
          // console.log(
          //   "open:this.$refs",
          //   this.$refs,
          //   this.selectIndex,
          //   offset,
          //   elOffest
          // );

          if (window.innerHeight - offset.bottom < 10) {
            let top =
              Math.abs(elOffest.top - offset.height - elOffest.height / 3) +
              "px";
            this.style = Object.assign({}, this.style, { top });
            // console.log(
            //   "open:this.style",
            //   this.style,
            //   offset,
            //   window.innerHeight
            // );
          }
        }
        let selectTop = document.querySelector(".autoSelected");
        let suggScroll = document.querySelector(
          ".cr-autocomplete-suggestion__wrap"
        );
        if (selectTop && suggScroll) {
          suggScroll.scrollTop = selectTop.offsetTop || 0;
        }
      });
    },
    // close(id = null, time = 0) {
    //   this.show = false;
    // },
    closeBox() {
      this.$nextTick( () => {
        this.show = false;
        // this.parentEl.focus()
      });

      // this.post(this.parentEl,this.data[this.selectIndex])
    },
    close(id) {
      if (this.id == id) {
        this.show = false;
      }
    },
    post(e, item) {
      console.log(
        "!!!post:autoPost",
        e,
        item,
        this.selectedList,
        this.obj[this.id],
      );
      // if (this.callback) {
      this.callback(item);
      // }
      // this.multiplechoice===true &&
      if (this.obj[this.id] && typeof this.obj[this.id] == "string") {
        this.selectedList = this.obj[this.id].split(",");
      }
      // this.show = false;
      if (!this.multiplechoice) {
        this.show = false;
      }
      this.$forceUpdate();
    },
    getInputElement() {
      return this.parentEl;
    },
    getStatus() {
      return this.show;
    },
    switch() {
      this.show = !this.show;
    }
  },
  beforeDestroy() {
    // this.post(this.parentEl,this.data[this.selectIndex])
  },
  mounted() {
    this.$root.$refs.autoBox = this.$refs.autoBox;

    document.addEventListener("click", e => {
      if (e.target.tagName != "LI" && e.target.tagName != "INPUT") {
        this.closeBox();
      }
    });
    window.addEventListener("mousewheel", e => {
      if (e.target.tagName != "LI") {
        this.show = false;
      }
    });
    document.addEventListener("keydown", e => {
      if (!this.show) return;
      let autoSuggestionEl = document.querySelector(
        ".cr-autocomplete-suggestion__wrap"
      );
      let autoSelectEl = document.querySelector(".autoSelected");
      let delta = -32;
      if (e.keyCode == "38") {
        if (this.selectIndex > 0) {
          this.selectIndex--;
        } else {
          this.selectIndex = this.data.length - 1;
          delta = 0;
        }
        setTimeout(() => {
          autoSelectEl = document.querySelector(".autoSelected");
          autoSuggestionEl.scrollTop = autoSelectEl.offsetTop + delta;
        }, 10);
      } else if (e.keyCode == "40") {
        if (this.selectIndex < this.data.length - 1) {
          this.selectIndex++;
        } else {
          this.selectIndex = 0;
          delta = 0;
        }
        setTimeout(() => {
          autoSelectEl = document.querySelector(".autoSelected");
          autoSuggestionEl.scrollTop = autoSelectEl.offsetTop + delta;
        }, 10);
      } else if (e.keyCode == "13") {
        this.post(null, this.data[this.selectIndex]);
      }
    });

    // this.attachWindow();
  },
  components: {}
};
</script>
