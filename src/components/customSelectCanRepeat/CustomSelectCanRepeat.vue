<template>
  <div>
    <slot></slot>
    <div
      class="options-pannel"
      :style="{
        display: visible ? 'block' : 'none',
        'max-height': maxHeight ? `${maxHeight}px` : 'none',
        top: `${top}px`,
        left: left ? `${left}px` : 'none',
        maxWidth: maxWidth ? `${maxWidth}px` : 'none',
      }"
      @mousedown.prevent
    >
      <div
        v-for="(opt, idx) in options"
        :key="opt.value"
        :class="{
          'option-item': true,
          active: itemActive(opt),
          selected: itemSelected(idx),
        }"
        @mousemove="() => (selectedIdx = idx)"
        :title="opt.name"
        :style="{
          minWidth: minWidth ? `${minWidth}px` : 'none',
          maxWidth: maxWidth ? `${maxWidth}px` : 'none',
        }"
        @click="() => handleSelect(opt)"
      >
        {{ opt.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**是否多选 */
    multiple: {
      type: Boolean,
      default: false,
    },
    /** 选项
     * 格式[{name:'',value:''}]
     */
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    /**显示滚动条的最大高度 */
    maxHeight: {
      type: Number,
      default: 0,
    },
    /**最大宽度 */
    maxWidth: {
      type: Number,
      default: 0,
    },
    // left:{
    //   type:Number,
    //   default:0,
    // },
    /**判断keydown方法内的一个代码执行 */
    keyDownRule1: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      value: '',
      selectedIdx: 0,
      top: 0,
      left: 0,
      minWidth: 0,
    };
  },
  computed: {
    iptNode() {
      if (!this.$slots.default) return null;
      let target = this.$slots.default[0];
      if (target && (target.tag == 'input' || target.tag == 'textarea' || target.tag == 'div')) return target;

      return null;
    },
  },
  mounted() {
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.setValue();

    document.addEventListener('click', this.close);

    let iptNode = this.iptNode;
    if (iptNode) iptNode.elm.addEventListener('click', this.open);
    if (iptNode) iptNode.elm.addEventListener('keydown', this.handleKeydown);
    if (iptNode) iptNode.elm.addEventListener('blur', this.handleBlur);
  },
  updated() {
    this.setValue();
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);

    let iptNode = this.iptNode;
    if (iptNode) iptNode.elm.removeEventListener('click', this.open);
    if (iptNode) iptNode.elm.removeEventListener('keydown', this.handleKeydown);
    if (iptNode) iptNode.elm.removeEventListener('blur', this.handleBlur);
  },
  methods: {
    setValue() {
      if (this.iptNode) this.value = this.iptNode.elm.value || '';
    },
    itemActive(opt) {
      if (this.multiple) {
        // if (this.value.indexOf(opt.value) >= 0) return true;
        if (this.value.split(',').indexOf(opt.value) >= 0) return true
      } else {
        if (this.value == opt.value) return true;
      }

      return false;
    },
    itemSelected(idx) {
      if (this.selectedIdx == idx) return true;

      return false;
    },
    close(e) {
      const removeAttribute = () => {
        setTimeout(() => this.iptNode.elm.removeAttribute('data-keydown-stop'), 100);
      };
      if (!e) {
        this.visible = false;
        removeAttribute();
        return;
      }

      if (e.target !== this.$el && !this.$el.contains(e.target)) {
        removeAttribute();
        this.visible = false;
      }
    },
    open() {
      this.visible = true;
      this.selectedIdx = 0;
      this.iptNode.elm.setAttribute('data-keydown-stop', '');
      this.rePosition();
    },
    rePosition() {
      let iptNode = this.iptNode;
      if (iptNode) {
        let { top, height, left, width } = iptNode.elm.getBoundingClientRect();

        this.top = top + 5 + height;
        this.left = left;
        this.minWidth = width;

        this.$nextTick(() => {
          let pannel = this.$el.querySelector('.options-pannel');
          let newPosition = pannel.getBoundingClientRect();
          let pannelWidth = pannel.offsetWidth;
          let pannelHeight = pannel.offsetHeight;
          let bodyWidth = document.body.offsetWidth;
          let windowHeight = window.innerHeight;

          if (pannelWidth + newPosition.left > bodyWidth) {
            this.left = bodyWidth - pannelWidth - 17;
          }

          if (pannelHeight + newPosition.top > windowHeight) {
            this.top = windowHeight - pannelHeight - (windowHeight - newPosition.top + 28);
          }
        });
      }
    },
    handleSelect(opt) {
      let newVal = '';
      if (this.multiple) {
        let oldVal = this.iptNode.elm.value;
        let oldValArr = oldVal.split(',');
        let idx = oldValArr.indexOf(opt.value);
        // if (idx >= 0) oldValArr.splice(idx, 1);
        // else oldValArr.push(opt.value);
        oldValArr.push(opt.value)

        newVal = oldValArr.filter(str => str).join(',');
      } else {
        if (this.iptNode.elm.value !== opt.value) newVal = opt.value;
        this.close();
      }

      this.$emit('onSelect', newVal);
    },
    handleKeydown(e) {
      if (e.keyCode == 13 && this.visible) {
        let target = this.options[this.selectedIdx];
        if (target) this.handleSelect(target);
      } else if (e.keyCode == 38 && this.visible) {
        if (this.visible) {
          if (this.selectedIdx <= 0) {
            this.selectedIdx = this.options.length - 1;
          } else {
            this.selectedIdx = this.selectedIdx - 1;
          }
        }
      } else if (e.keyCode == 40) {
        if (this.visible) {
          if (this.selectedIdx >= this.options.length) {
            this.selectedIdx = 0;
          } else {
            this.selectedIdx = this.selectedIdx + 1;
          }
        } else {
          if (!this.keyDownRule1) {
            this.open();
          }
        }
      } else if (e.keyCode == 27 && this.visible) {
        this.close();
      }
    },
    handleBlur() {
      this.close();
    },
  },
  watch: {
    options(newVal, oldVal) {
      if (newVal.length !== oldVal.length) {
        this.selectedIdx = 0;
      }
      if (this.visible) this.rePosition();
    },
    top(newVal, oldVal) {
      // console.log('this.topchange', newVal)
    },
  },
};
</script>

<style lang="scss" scoped>
 .options-pannel {
  width: max-content;
  position: fixed;
  border: 1px solid #ddd;
  // box-shadow: rgba(0, 0, 0, 0.2) 0 2px 12px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  z-index: 999;
  max-height: 300px;
  overflow: auto;
}
.options-pannel::-webkit-scrollbar { width:3px; height:2px; background:#ccc; border-radius:10px;/*外层轨道*/}


.options-pannel .option-item {
  font-size: 15px;
  line-height: 26px;
  border-top: 1px solid #eee;
  padding: 0 5px;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.options-pannel::-webkit-scrollbar{//滚动条的宽度
  width:5px;
  background-color: rgba(255, 255, 255, 0.3);
}
.options-pannel::-webkit-scrollbar-thumb {
   width: 5px;
    height: 10px;
    background-color: #999;
    border-radius: 10px;
}
.options-pannel .option-item:first-of-type {
  border-top: none;
}

.options-pannel .option-item.active {
  background: #f8f8fa;
}

.options-pannel .option-item.selected {
  background: #4bb08d;
  color: #fff;
}
</style>
