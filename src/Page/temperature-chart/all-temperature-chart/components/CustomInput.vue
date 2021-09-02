<template>
  <input
    type="text"
    :class="className"
    @keyup="handleKeyUp"
    @keydown="handleKeyDown"
    :value="value"
  />
</template>

<style lang='scss' scoped>
.all-temperature-chart-input {
  width: 100%;
  padding: 2px 5px;
  margin: 0;
  line-height: 20px;
  border: 1px solid #ccc;
  border-color: #ccc;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #4bb08d;
    background-color: #9adcc5;
  }
}
</style>

<script>
export default {
  model: {
    props: "value",
    event: "change",
  },
  props: ["value", "colClass"],
  computed: {
    className() {
      return ["all-temperature-chart-input", this.colClass].join(" ");
    },
  },
  data() {
    return {
      handleKeyCode: [37, 38, 39, 40],
    };
  },
  methods: {
    handleKeyDown(e) {
      if (this.handleKeyCode.includes(e.keyCode)) {
        if (e.keyCode === 37) {
          //处理左按键
          if (e.target.selectionStart === 0) {
            // 如果光标在开头，跳转前一个输入框
            let inputEls = document.getElementsByClassName(
              "all-temperature-chart-input"
            );
            let currentIdx = 0;
            for (var i = 0; i < inputEls.length; ++i) {
              if (e.target === inputEls[i]) currentIdx = i;
            }
            let prevIdx = currentIdx - 1;
            inputEls[prevIdx] && inputEls[prevIdx].focus();
          }
        } else if (e.keyCode === 39) {
          //处理右按键
          if (e.target.selectionEnd === e.target.value.length) {
            // 如果光标在末尾，跳转后一个输入框
            let inputEls = document.getElementsByClassName(
              "all-temperature-chart-input"
            );
            let currentIdx = 0;
            for (var i = 0; i < inputEls.length; ++i) {
              if (e.target === inputEls[i]) currentIdx = i;
            }
            let nextIdx = currentIdx + 1;
            inputEls[nextIdx] && inputEls[nextIdx].focus();
          }
        } else {
          //处理上下按键，跳转相同类名的输入框
          let inputEls = document.getElementsByClassName(this.colClass);
          let currentIdx = 0;

          for (var i = 0; i < inputEls.length; ++i) {
            if (e.target === inputEls[i]) currentIdx = i;
          }

          if (e.keyCode === 38) {
            currentIdx--;
          } else {
            currentIdx++;
          }

          inputEls[currentIdx] && inputEls[currentIdx].focus();
        }
      }
    },
    handleKeyUp(e) {
      if (!this.handleKeyCode.includes(e.keyCode)) {
        this.$emit("change", e.target.value);
      }
    },
  },
  components: {},
};
</script>
