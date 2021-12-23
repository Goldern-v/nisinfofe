<template>
  <div class="patient-list-part" v-loading="patientListLoading">
    <el-input placeholder="床号/姓名"
              icon="search"
              class="search-box"
              v-model="searchWord">
    </el-input>
    <div class="left-wapper">
        <div class="follow" v-if="HOSPITAL_ID =='liaocheng'">
          <div class="follow-name" @click="openFollow">
            <span
              class="arrow"
              :class="isShowFollow ? 'follow-arrow-open' : 'follow-arrow-close'"
            ></span>
            我的关注
          </div>
          <transition name="fold-height">
            <div v-show="isShowFollow" class="follow-list">
              <template v-if="followList.length">
              <patientItem v-for="(item, index) in followList" :key="item.name" :item="item" :index="index" :type="'follow'"></patientItem>
              </template>
              <div class="empty" v-else>暂无关注数据</div>
            </div>
          </transition>
      </div>
      <!-- @selectPatient="selectPatient" -->
    <div class="patient-list-contain">
     <patientItem v-for="(item, index) in list" :key="item.name" :item="item" :index="index"></patientItem>
    </div>
    <div class="flag-con"
           :style="{top: flagTop}"
           flex="main:center cross:center"
           @click="toOpenLeft">
        <i class="iconfont icon-yincang"
           v-show="openLeft"
           style="margin-left: -1px"></i>
        <i class="iconfont icon-xianshi"
           v-show="!openLeft"
           style="margin-left: -2px"></i>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.patient-list-part
  height 100%
  box-sizing border-box
  padding-top 51px
  position relative
  border-right 1px solid #CBD5DD
.patient-list-contain
  padding 0px 13px 11px
  height 100%
  box-sizing border-box
  overflow auto
  cursor pointer
  position relative
.search-box
  position absolute
  top 12px
  left 15px
  width 168px
  >>>&.el-input
    margin-bottom 5px
  >>>.el-input__inner
    height 28px
    outline none
    padding-left 10px
    background #fff
    border-radius 4px
    font-size 12px !important
    color #333
.flag-con
  width 10px
  height 73px
  position absolute
  right -11px
  top 100px
  z-index 10
  background-image url('../../../../common/images/patient/隐藏框.png')
  cursor pointer
  &:hover
    color #5CC6A1
  i
    font-size 12px
.left-wapper
  position relative
  transition all 0.4s cubic-bezier(0.55, 0, 0.1, 1)
  // height calc(100vh - 114px)
  display: flex;
  flex-direction: column;
  height 100%
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
    width: 100%;
    max-height: 380px;
    overflow: hidden;
    overflow-y: auto;
    background-color: #f1f1f5;

    .follow-list-item {
      display: flex;
      align-items: center;
      padding: 6px 15px;
      font-size: 13px;
      border-radius: 3px;
      margin: 1px 0;
      cursor: pointer;
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
<script>
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import patientItem from "./patient-item.vue";
import currDataObj from "../store/index";
import FollowList from "@/components/follow/index";
export default {
  mixins: [common],
  data() {
    return {
      data: [],
      searchWord: "",
      patientListLoading: false,
      currDataObj,
       isShowFollow: false,
    };
  },
  methods: {
    isActive(item) {
      return item.patientId == this.$store.state.sheet.patientInfo.patientId;
    },
    toOpenLeft() {
      this.$store.commit("upOpenSheetLeft", !this.openLeft);
    },
    getLIstData() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {showFollew:true}).then(res => {
          this.data = res.data.data.filter(item => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    },
    openFollow() {
      if (this.isShowFollow) {
        this.isShowFollow = false;
        return;
      }
      this.isShowFollow = true;
    }
  },
  computed: {
    list() {
      return this.data.filter(item => {
        return (
          item.bedLabel.indexOf(this.searchWord) > -1 ||
          item.name.indexOf(this.searchWord) > -1
        );
      });
    },
    followList() {
      return this.list.filter((item) => {
        return item.isFollow == 1;
      });
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    flagTop() {
      return `${this.wih * 0.4}px`;
    }
  },
  created() {
    this.getLIstData();
  },
  watch: {
    deptCode(val) {
      this.getLIstData();
    }
  },
  components: {
    patientItem,
    FollowList
  }
};
</script>
