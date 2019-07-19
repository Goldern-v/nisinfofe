<template>
  <div>
    <div class="tool-contain" flex="cross:center" :style="config.style">
      <div
        flex="cross:center main:center"
        v-if="config.left"
        v-for="(item) in config.left"
        :key="item.name"
        @click.stop="item.click"
        :class="item.disabled?'item-box disabled':'item-box'"
        :name="'toolbar'+item.name"
        :style="item.style"
      >
        <div class="text-con">{{item.name||"错误"}}</div>
      </div>
      <div flex-box="1"></div>
      <div
        flex="cross:center main:center"
        v-if="config.right"
        v-for="(item) in config.right"
        :key="item.name"
        @click.stop="item.click"
        :class="item.disabled?'item-box disabled':'item-box'"
        :name="'toolbar'+item.name"
        :style="item.style"
      >
        <div class="text-con">{{item.name||"错误"}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" src="./tool.styl" scoped></style>

<style lang="stylus" scoped>

</style>

<style lang="stylus">

</style>

<script>
import bus from "vue-happy-bus";
import commom from "@/common/mixin/common.mixin";
export default {
  mixins: [commom],
  props: {
    config: Object
  },
  data() {
    return {
      bus: bus(this)
    };
  },
  mounted() {
    this.activeAllButons();
    this.bus.$on("activeAllButons", this.activeAllButons);
    this.bus.$on("activeButton", this.activeButton);
    this.bus.$on("disableButton", this.disableButton);
  },
  methods: {
    emit(todo) {
      this.bus.$emit(todo);
    },
    activeAllButons() {
      let object = [...this.config.left, ...this.config.right];
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          try {
            let btn = document.getElementsByName("toolbar" + element.name)[0];
            btn.className = btn.className.replace("disabled", "");
          } catch (error) {
            //
          }
        }
      }
    },
    activeButton(e) {
      let object = [...this.config.left, ...this.config.right];
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          try {
            if (element.name === e.name) {
              let btn = document.getElementsByName("toolbar" + element.name)[0];
              btn.className = btn.className.replace("disabled", "");
            }
          } catch (error) {
            //
          }
        }
      }
    },
    disableButton(e) {
      let object = [...this.config.left, ...this.config.right];
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          try {
            if (element.name === e.name) {
              let btn = document.getElementsByName("toolbar" + element.name)[0];
              btn.className = "item-box disabled";
            }
          } catch (error) {
            //
          }
        }
      }
    }
  },
  components: {}
};
</script>
