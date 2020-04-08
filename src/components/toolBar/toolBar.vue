<template>
  <div>
    <div class="tool-contain" flex="cross:center" :style="config.style">
      <div
        flex="cross:center main:center"
        v-if="config.left && item.visible == true"
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
    // this.disableAllButons();
    this.bus.$on("activeAllButons", this.activeAllButons);
    this.bus.$on("activeButton", this.activeButton);
    this.bus.$on("disableButton", this.disableButton);
    this.bus.$on("disableAllButons", this.disableAllButons);
    this.bus.$on("visibleButtons", this.visibleButtons);
    //
    this.activeAllButons();
    this.visibleButtons({ name: "", bool: false });
  },
  methods: {
    emit(todo) {
      this.bus.$emit(todo);
    },
    visibleButtons(e = { name: "", bool: true }) {
      let object = [...this.config.left, ...this.config.right];
      // object.map((element, key) => {
      for (const key in object) {
        if (object.hasOwnProperty(key) > -1) {
          const element = object[key];
          try {
            // console.log("!!!v!!", e.name, e, {
            //   el: object[key],
            //   key,
            //   object,
            //   val: e.bool && true
            // });
            // if (object) {
            // if (
            //   (element.name === e.name && typeof e.name == "string") ||
            //   (typeof e.name == "object" && e.name.indexOf(element.name) > -1)
            // ) {
            //   element.visible = e.bool;
            // } else if (e && !e.name) {
            //   element.visible = e.bool;
            // }
            // }
          } catch (error) {
            console.error("error", error);
          }
        }
      }
      // });
    },
    activeAllButons() {
      let object = [...this.config.left, ...this.config.right];
      for (const key in object) {
        if (object.hasOwnProperty(key) > -1) {
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
        if (object.hasOwnProperty(key) > -1) {
          const element = object[key];
          try {
            if (
              (object[key].name === e.name && typeof e.name == "string") ||
              (typeof e.name == "object" &&
                e.name.indexOf(object[key].name) > -1)
            ) {
              let btn = document.getElementsByName("toolbar" + element.name)[0];
              btn.className = btn.className.replace("disabled", "");
              // object[key].visible = true;
            }
          } catch (error) {
            //
          }
        }
      }
    },
    disableAllButons() {
      console.log("disableAllButons");
      let object = [...this.config.left, ...this.config.right];
      for (const key in object) {
        if (object.hasOwnProperty(key) > -1) {
          const element = object[key];
          try {
            let btn = document.getElementsByName("toolbar" + element.name)[0];
            btn.className = "item-box disabled";
          } catch (error) {
            //
          }
        }
      }
    },
    disableButton(e) {
      let object = [...this.config.left, ...this.config.right];
      for (const key in object) {
        if (object.hasOwnProperty(key) > -1) {
          const element = object[key];
          try {
            if (
              (object[key].name === e.name && typeof e.name == "string") ||
              (typeof e.name == "object" &&
                e.name.indexOf(object[key].name) > -1)
            ) {
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
