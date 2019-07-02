<template>
  <div class="view-con" :style="{height: maxheight}" v-loading="pageLoading">
    <viewer
      :options="options"
      :images="images"
      v-if="images.length"
      @inited="inited"
      class="viewer"
      ref="viewer"
    >
      <template slot-scope="scope">
        <img v-for="src in scope.images" :src="src" :key="src">
        <!-- {{scope.options}} -->
      </template>
    </viewer>
    <nullBg v-show="!pageLoading && images.length == 0" style="margin-top: 200px"></nullBg>
  </div>
</template>
<style lang="stylus">
.view-con
  width 100%
  img
    width 100%
  .viewer
    display none
</style>

<script>
import { pic } from "@/api/patientInfo";
import Viewer from "v-viewer/src/component.vue";
import nullBg from "../../components/null/null-bg.vue";
export default {
  components: {
    Viewer,
    nullBg
  },
  // props: ['examNo', 'name'],
  data() {
    return {
      maxheight: `${window.innerHeight}px`,
      images: [],
      pageLoading: false,
      options: {
        inline: true,
        button: true,
        navbar: true,
        title: true,
        toolbar: true,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: false,
        fullscreen: true,
        keyboard: true,
        url: "data-source"
      }
    };
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    show() {
      this.$viewer.show();
    },
    getImage() {
      // let examNo = 2625606
      // let name = '陈有梅'
      let examNo = this.$route.query.examNo;
      let name = this.$route.query.name;
      this.pageLoading = true;
      pic(examNo, name)
        .then(res => {
          res.data.data
            .map(item => {
              return item.smallFileName;
            })
            .filter(async item => {
              let res = await new Promise((reslove, reject) => {
                var img = new Image();
                img.src = item;
                img.onload = function() {
                  reslove(true);
                };
                setTimeout(() => {
                  reslove(false);
                }, 1000);
              });
              res && this.images.push(item);
              return res;
            });
          this.pageLoading = false;
        })
        .catch(() => {
          this.pageLoading = false;
        });
    }
  },
  mounted() {
    this.getImage();
  }
};
</script>
