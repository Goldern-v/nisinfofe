<template>
   <div class="side-bar">
     <div class="side-bar__item" :class="{'side-bar__item--act':actIndex == v.name}" v-for="(v, i) in bars" :key="i" @click="handleSelect(v)">
      <!-- <img :src="v.meta.img" alt=""> -->
      <span class="side-bar__item__text">
        {{v.meta.title}}
      </span>
     </div>
   </div>
</template>

<script>
// import { hisMatch } from '@/utils/tool'
export default {
  data() {
    return {
      actIndex: '',
      bars: [
        {
          name: "usageRecord",
          meta: {
            title: '设备使用记录',
            // img: require("../images/workload.png"),
          }
        },
        {
          name: "inventory",
          meta: {
            title: '设备清单',
            // img: require("../images/workload.png"),
          },
        }
      ]
    }
  },
  watch: {
    '$route.name': {
      handler(v) {
        if (this.actIndex != v) {
          this.actIndex = v
        }
      },
    },
  },
  mounted() {
    this.actIndex = this.$route.name
    // let details = ['/main', '/statisticalQuery']
    // this.bars = this.getBars(this.$router.options.routes, details)
  },
  methods: {
    handleSelect(v) {
      this.actIndex = v.name
      this.$router.push({ name : v.name})
    },
    getBars(routes, arr) {
      let obj = []
      let fn = (routes, arr) => routes.find((val) => {
        let [i1, ...other] = arr
        if (val.path === i1) {
          if (i1 && other.length === 0) {
            obj = val.children.map(v => {
              const { component, ...other} = v
              return other
            })
            return true
          }
          return fn(val.children, other)
        }
        return false
      },[])
      fn(routes, arr)
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../index.scss';
.side-bar {
  width: 200px;
  height: 100%;
  background: #fff;
  text-align: center;
  .side-bar__item {
    position: relative;
    display: flex;
    height: 44px;
    align-items: center;
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
      object-fit: cover;
      margin: 0 6px 0px 30px;
    }
    .side-bar__item__text {
      flex: 1;
      font-size: 14px;
    }
    &.side-bar__item--act {
      color: $theme-color;
      background: $theme-bg;;
      border-right: 4px solid  $theme-color;
      /* &::after {
        content: '';
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 0px solid transparent;
        border-right: 6px solid $theme-color;
      } */
    }
  }
}
</style>
