<template>
  <div class="follow">
    <div class="follow-name" @click="openFollow">
      <span
        class="arrow"
        :class="isShowFollow ? 'follow-arrow-open' : 'follow-arrow-close'"
      ></span>
      <span v-if="!['nfyksdyy','qhwy'].includes(HOSPITAL_ID)"> 我的关注</span>
      <span v-else> 我的管床</span>
    </div>
    <transition name="fold-height">
      <ul class="follow-list" v-show="isShowFollow">
        <template v-if="followList.length">
          <li
            v-for="(item, index) in followList"
            :key="index"
            class="follow-list-item"
            :class="{ active: isActive(item) }"
            @click="selectPatient(item)"
          >
            <img
            :src="item.bedLabel.includes('_')?imageBoy:imageMan"
              alt
              class="img"
              v-if="item.sex == '男'"
            />
            <img  :src="item.bedLabel.includes('_')?imageGirl:imageWomen" alt class="img" v-else />
            <div class="name" flex-box="1">{{ item.name }}</div>
            <div class="bed">{{ item.bedLabel }} 床</div>
             <slot :scope="item"></slot>
             <img  src="../../common/images/card/like.png" height="18" width="18" style="margin-left: 3px;"/>
          </li>
        </template>
        <li v-else class="empty">暂无关注数据</li>
      </ul>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    data: Array,
  },
  data() {
    return {
      isShowFollow: false,
      selectPatientId: "",
      imageBoy: require("./images/男婴.png"),
      imageGirl: require("./images/女婴.png"),
      imageMan: require("./images/男.png"),
      imageWomen: require("./images/女.png")
    };
  },
  computed: {
    followList() {
      return this.data.filter((item) => {
        return item.isFollow == 1;
      });
    }
  },
  methods: {
    isActive(item) {
      // return item.patientId == (this.selectPatientId || this.$route.query.patientId);
      return item.patientId == this.$store.state.sheet.patientInfo.patientId;
    },
    selectPatient(item) {
        this.selectPatientId = item.patientId;
        this.$emit('selectPatient',item)
        this.$store.commit("upPatientInfo", item);
    },
    openFollow() {
      if (this.isShowFollow) {
        this.isShowFollow = false;
        return;
      }
      this.isShowFollow = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.follow {
  /* width: 199px; */
  .follow-name {
    position: relative;
    padding: 6px 0px 6px 20px;
    font-size: 16px;
    font-weight: 600;
    background: #4bb08d;
    color: #fff;
    cursor: pointer;
    .arrow {
      border: 8px solid transparent;
      border-left-color: #fff;
    }
    .follow-arrow-open {
      position: absolute;
      top: 40%;
      left: 4px;
      transform: rotate(90deg);
      transition: all 0.3s;
    }
    .follow-arrow-close {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s;
    }
  }

  .follow-list {
    padding-left: 13px;
    width: 100%;
    max-height: 380px;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f1f1f5;
    box-sizing: border-box;
    .follow-list-item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 6px;
      font-size: 13px;
      border-radius: 3px;
      margin: 1px 0;
      cursor: pointer;
      .img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin-right: 11px;
      }

      .name {
        color: #333;
      }

      .bed {
        color: #333;
      }

      .cathter-icon {
        width: 20px;
        height: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        line-height: 20px;
        text-align: center;
        color: #21a0ff;
        margin-left: 5px;
      }

      .has-file {
        position: absolute;
        left: 28px;
        top: 18px;
        width: 20px;
      }

      &:hover {
        background: #fff;
      }

      &.active {
        background: #fff;
        font-weight: bold;

        .name {
          color: #000;
        }
      }
    }

    .empty {
      padding: 10px;
      text-align: center;
    }
  }

  // 子选项内容展开动画，当  v-if/v-show="true" 时候 调用
  .fold-height-enter-active {
    animation-duration: 0.3s;
    animation-name: fold-height-open;
  }

  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }

    100% {
      max-height: 380px;
    }
  }

  // 子选项内容关闭的动画，当 v-if/v-show="false" 时候调用
  .fold-height-leave-active {
    animation-duration: 0.3s;
    animation-name: fold-height-close;
  }

  @keyframes fold-height-close {
    0% {
      max-height: 380px;
    }

    100% {
      max-height: 0;
    }
  }
}
</style>
