<template>
   <div class="side-bar">
     <div class="side-bar__item" :class="{'side-bar__item--act':actIndex == v.name}" v-for="(v, i) in bars" :key="i" @click="handleSelect(v)">
      <span class="side-bar__item__arrow"></span>
      <span class="side-bar__item__text">
        {{v.meta.title}}
      </span>
     </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      actIndex: '',
      bars: [
        {
          name: "statisticalOperation",
          meta: {
            title: '手术统计'
          },
        },
        {
          name: "statisticalPulseHeartRate",
          meta: {
            title: '脉搏统计'
          },
        },
        {
          name: "statisticalHeartRate",
          meta: {
            title: '心率统计'
          },
        },
        {
          name: "statisticalPressure",
          meta: {
            title: '压力性损伤统计'
          },
        },
        {
          name: "statisticalBloodPressure",
          meta: {
            title: '血压统计'
          },
        },
        {
          name: "statisticalTemperature",
          meta: {
            title: '体温统计'
          },
        },
        {
          name: "statisticalNursingLv",
          meta: {
            title: '护理等级统计'
          },
        },
        // {
        //   name: "statisticalWorkload",
        //   meta: {
        //     title: '工作量统计'
        //   },
        // },
        {
          name: "statisticalBreath",
          meta: {
            title: '呼吸统计'
          },
        },
        {
          name: "statisticalExitAdmission",
          meta: {
            title: '出入院统计'
          },
        },
        {
          name: "statisticalVTE",
          meta: {
            title: 'VTE评分统计'
          },
        },
      ]
    }
  },
  watch: {
    '$route.name': {
      handler(v) {
        this.actIndex = v
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
  .side-bar__item {
    position: relative;
    display: flex;
    border-right: 4px solid  $theme-color;
    height: 36px;
    align-items: center;
    cursor: pointer;
    .side-bar__item__arrow {
      width: 70px;
    }
    .side-bar__item__text {
      flex: 1;
      font-size: 14px;
    }
    &.side-bar__item--act {
      color: $theme-color;
      &::after {
        /* position: absolute; */
        content: '';
        /* right: 4px; */
        /* top: 50%; */
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 0px solid transparent;
        border-right: 6px solid $theme-color;
      }
    }
  }
}
</style>
