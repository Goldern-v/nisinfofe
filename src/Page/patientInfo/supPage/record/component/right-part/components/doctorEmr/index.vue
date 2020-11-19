<template>
  <div class="doctor-emr-wrapper" v-if="routeQuery.patientId">
    <div v-if="show"
         v-loading="pageLoading"
         class="doctor-emr-content"
    >
      <div class="content_title">
        <div class="close-button" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div>
        <iframe :src="fileUrl"></iframe>
      </div>
    </div>
    <el-tooltip v-if="!show" effect="dark" content="电子病历" placement="left">
      <div @click="onload" class="doctor-emr-icon">
        <img src="./img.png" alt/>
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
import {getDoctorEmr} from "../../../../../doctorEmr/api";

export default {
  directives: {
    // 添加窗口移动指令
    drag: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = 'move'
        // 防止选中文字
        el.onselectstart = () => {
          return false
        }
        const oDiv = el
        // 拖动目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target)
        let dragNode = null
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0]
        } else {
          return
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX - dragNode.offsetLeft
          const disY = ev.clientY - dragNode.offsetTop
          // 非“全屏”下才能拖动
          document.onmousemove = (ev) => {
            const l = ev.clientX - disX
            const t = ev.clientY - disY
            dragNode.style.left = l + 'px'
            dragNode.style.top = t + 'px'
          }
          document.onmouseup = (ev) => {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  data() {
    return {
      fileUrl: '',
      pageLoading: false,
      show: false,
      patientId: '',
      visitId: ''
    }
  },
  computed: {
    routeQuery() {
      return this.$route.query
    }
  },
  watch: {
    'routeQuery'() {
      this.close()
    }
  },
  mounted() {
    // this.getTreeData()
  },
  methods: {
    close() {
      this.show = false
    },
    async onload() {
      this.show = true
      await this.getTreeData()
    },
    async getTreeData() {
      if ((this.patientId === this.routeQuery.patientId) && (this.visitId === this.routeQuery.visitId)) return
      this.pageLoading = true
      this.patientId = this.routeQuery.patientId
      this.visitId = this.routeQuery.visitId
      const res = await getDoctorEmr(this.patientId, this.visitId)
      const data = res.data.data
      const obj = data['其他记录'] && data['其他记录'][0]
      if (obj) {
        this.fileUrl = obj.expand1
        // this.fileUrl = obj.fileUrl
      }
      this.pageLoading = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.doctor-emr-wrapper {
  .doctor-emr-content {
    position fixed
    bottom 0
    left 0
    z-index 999
    width 100%
    height 200px
    background #ffffff
    box-shadow 5px 5px 10px rgba(0, 0, 0, 0.5);

    .content_title {
      height 20px
      position relative

      .close-button {
        position absolute
        top 0
        right 0
        width: 20px
        height: 20px
        border none
        border-radius 50%
        text-align center
        line-height 20px
        font-size 10px
        cursor pointer
      }
    }


    iframe {
      width 100%
      height calc(100% - 20px)
    }
  }

  .doctor-emr-icon {
    position fixed
    top 140px
    right 0
    width: 50px;
    height: 42px;
    z-index 999
    background #ffffff
    cursor pointer
    box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.05)
    border-radius: 100px 0 0 100px
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
