<template>
  <div class="doctor-emr-wrapper" v-if="routeQuery.patientId">
    <div
      v-if="show"
      v-loading="pageLoading"
      class="doctor-emr-content dragNode2"
    >
      <div class="content_title" v-drag="{ target: 'dragNode2' }">
        <div class="close-button" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div style="height: 100%">
        <iframe :src="fileUrl"></iframe>
      </div>
      <div class="se-resize" v-seResize="{ target: 'dragNode2' }"></div>
      <div class="e-resize" v-eResize="{ target: 'dragNode2' }"></div>
      <div class="s-resize" v-sResize="{ target: 'dragNode2' }"></div>
    </div>
    <el-tooltip v-if="!show" effect="dark" content="电子病历" placement="left">
      <div @click="onload" class="doctor-emr-icon">
        <img src="./img.png" alt />
      </div>
    </el-tooltip>
    <!-- <div
         v-show="!show"
         @click="show = true"
         v-drag="{ target: 'dragNode2'}"
         class="doctor-emr-icon dragNode2"
     >
       电子病历
     </div>-->
  </div>
</template>

<script>
// import {getDoctorEmr} from "../../../../../doctorEmr/api";

export default {
  directives: {
    // 添加窗口移动指令
    drag: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "move";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拖动目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX - dragNode.offsetLeft;
          const disY = ev.clientY - dragNode.offsetTop;
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const l = ev.clientX - disX;
              const t = ev.clientY - disY;
              dragNode.style.left = l + "px";
              dragNode.style.top = t + "px";
            };
            document.onmouseup = (ev) => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          }
        };
      },
    },
    // 右下方拉伸
    seResize: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "se-resize";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拉伸的目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX;
          const disY = ev.clientY;
          let oWidth = dragNode.offsetWidth;
          let oHeight = dragNode.offsetHeight;
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const w = ev.clientX - disX;
              const h = ev.clientY - disY;
              dragNode.style.width = oWidth + w + "px";
              dragNode.style.height = oHeight + h + "px";
              document.body.style.cursor = "se-resize";
            };
            document.onmouseup = (ev) => {
              document.onmousemove = null;
              document.onmouseup = null;
              document.body.style.cursor = "default";
            };
          }
        };
      },
    },
    // 下方拉伸
    sResize: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "s-resize";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拉伸的目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX;
          const disY = ev.clientY;
          let oWidth = dragNode.offsetWidth;
          let oHeight = dragNode.offsetHeight;
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const w = ev.clientX - disX;
              const h = ev.clientY - disY;
              dragNode.style.height = oHeight + h + "px";
              document.body.style.cursor = "s-resize";
            };
            document.onmouseup = (ev) => {
              document.onmousemove = null;
              document.onmouseup = null;
              document.body.style.cursor = "default";
            };
          }
        };
      },
    },
    // 右方拉伸
    eResize: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "e-resize";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拉伸的目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX;
          const disY = ev.clientY;
          let oWidth = dragNode.offsetWidth;
          let oHeight = dragNode.offsetHeight;
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const w = ev.clientX - disX;
              const h = ev.clientY - disY;
              document.body.style.cursor = "e-resize";
              dragNode.style.width = oWidth + w + "px";
            };
            document.onmouseup = (ev) => {
              document.onmousemove = null;
              document.onmouseup = null;
              document.body.style.cursor = "default";
            };
          }
        };
      },
    },
  },
  data() {
    return {
      fileUrl: "",
      pageLoading: false,
      show: false,
      patientId: "",
      visitId: "",
    };
  },
  computed: {
    routeQuery() {
      return this.$route.query;
    },
  },
  watch: {
    routeQuery() {
      this.close();
    },
  },
  mounted() {
    // this.getTreeData()
  },
  methods: {
    close() {
      this.show = false;
    },
    async onload() {
      this.show = true;
      await this.getTreeData();
    },
    async getTreeData() {
      this.fileUrl = `http://172.16.4.53/EmrView/Index.aspx?hospital_no=45539427X44011411A1001&patient_id=${this.$route.query.inpNo}`;
      // if ((this.patientId === this.routeQuery.patientId) && (this.visitId === this.routeQuery.visitId)) return
      // this.pageLoading = true
      // this.patientId = this.routeQuery.patientId
      // this.visitId = this.routeQuery.visitId
      // const res = await getDoctorEmr(this.patientId, this.visitId)
      // const data = res.data.data
      // const obj = data['其他记录'] && data['其他记录'][0]
      // if (obj) {
      //   this.fileUrl = obj.expand1
      //   // this.fileUrl = obj.fileUrl
      // }
      // this.pageLoading = false
    },
  },
};
</script>

<style lang="stylus" scoped>
.doctor-emr-wrapper {
  .doctor-emr-content {
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 999;
    width: 800px;
    height: 700px;
    background: #ffffff;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);

    .content_title {
      height: 20px;
      position: relative;
      cursor: move;

      .close-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        border: none;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        font-size: 10px;
        cursor: pointer;
      }
    }

    iframe {
      width: 100%;
      height: calc(100% - 20px);
    }
  }

  .doctor-emr-icon {
    position: fixed;
    top: 200px;
    right: 0;
    width: 50px;
    height: 42px;
    z-index: 999;
    background: #ffffff;
    cursor: pointer;
    box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 100px 0 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 18px;
      height: 18px;
    }
  }

  .se-resize {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 8px;
    height: 8px;
  }

  .e-resize {
    position: absolute;
    bottom: 8px;
    top: 20px;
    right: 0;
    width: 10px;
    height: calc(100% - 28px);
  }

  .s-resize {
    position: absolute;
    bottom: 0;
    right: 8px;
    width: calc(100% - 8px);
    height: 10px;
  }
}
</style>
