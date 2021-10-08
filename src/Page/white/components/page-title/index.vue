<template>
  <div class="page-title-wrapper">
    <div class="title">
      <div class="page-title_hospital">{{config.hospital}}</div>
      <div class="page-title_title">{{config.title}}</div>
    </div>
    <div
        v-if="config.baseInfo && config.baseInfo.length>0"
        class="page-title_info-list"
        :class="{'show-border':showBorder}"
    >
      <div
          v-for="item in config.baseInfo"
          :key="item.key"
          class="page-title_info-item"
      >
        <!-- {{item.label}}: -->
        {{item.label}}：{{item.key === 'deptCodeName' ? infoDate[item.key] || deptName : infoDate[item.key]}}
      </div>
    </div>
  </div>
</template>

<script>
import commom from "@/common/mixin/common.mixin";
  export default {
    mixins: [commom],
    props: {
      config: {
        type: Object,
        default: () => {
          return {baseInfo: []}
        }
      },
      infoDate: {
        type: Object,
        default: () => {
          return {}
        }
      },
      showBorder: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .page-title-wrapper {
    .title{
      padding: 30px 50px 0;
      text-align: center;
    }
    .page-title_hospital {
      font-size: 18px;
      letter-spacing: 1em;
      font-weight: 700;
    }

    .page-title_title {
      font-size: 21px;
      padding: 2px 0;
      font-weight: 700;
    }

    .page-title_info-list {
      height: 24px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      .page-title_info-item {
        margin-right: 20px;
      }
      .page-title_info-item:last-child {
        margin-right: 0;
      }
    }
    // .show-border {
    //   border-bottom: 1px solid black;
    // }
  }
</style>