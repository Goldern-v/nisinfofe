<template>
  <div v-bind:id="id" v-show="dialogVisible" @mousedown="mousedown">
    <div class="header">
      <div>
        <h2>{{ titlex }}</h2>
        <div
          class="flag-con"
          flex="main:center cross:center"
          @click="closeDialog()"
        >
          <i class="iconfont icon-guanbi"></i>
        </div>
      </div>
    </div>
    <main>
      <slot class="main_context">这里是内容</slot>
    </main>
  </div>
</template>

<script>
export default {
  // name: "Window",
  props: {
    titlex: String,
    id: [String, Number],
  },
  data() {
    return {
      title: "标题",
      selectElement: "",
    };
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.$store.state.temperature.dialogVisible;
      },
      set: function (newValue) {
        this.$store.commit("newDialogVisible", newValue);
      },
    },
  },
  watch: {
    dialogVisible(val) {
      // alert(val);
    },
  },
  methods: {
    closeDialog(e) {
      this.dialogVisible = false;
      // alert(this.dialogVisible);
      this.$store.commit("newDialogVisible", false);
    },
    mousedown(event) {
      this.selectElement = document.getElementById(this.id);
      var div1 = this.selectElement;
      this.selectElement.style.cursor = "move";
      this.isDowm = true;
      var distanceX = event.clientX - this.selectElement.offsetLeft;
      var distanceY = event.clientY - this.selectElement.offsetTop;
      document.onmousemove = function (ev) {
        var oevent = ev || event;
        div1.style.left = oevent.clientX - distanceX + "px";
        div1.style.top = oevent.clientY - distanceY + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
        div1.style.cursor = "default";
      };
    },
  },
};
</script>

<style scoped>
.el-container {
  position: absolute;
  height: 500px;
  width: 500px;
  border: 1px;
  top: 20%;
  left: 35%;
  border-radius: 2px;
}

.dialog-footer {
  text-align: right;
}

.header {
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 44px;
  line-height: 44px;
  background: rgb(103, 174, 143);
  border-bottom: 1px solid #eaeef1;
  position: relative;
  cursor: move;
  padding-left: 12px;
  padding-right: 12px;
}
.flag-con {
  position: absolute;
  right: 2%;
  top: 0px;
  transform: scale(1.3);
}
.el-aside {
  color: #333;
}
</style>
