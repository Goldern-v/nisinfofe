<template>
   <div class="side-bar">
     <div class="side-bar__item" :class="{'side-bar__item--act':actIndex == v.name}" v-for="(v, i) in bars" :key="i" @click="handleSelect(v)">
      <img :src="v.meta.img" alt="">
      <span class="side-bar__item__text">
        {{v.meta.title}}
      </span>
     </div>
   </div>
</template>

<script>
import { hisMatch } from '@/utils/tool'
export default {
  data() {
    return {
      actIndex: '',
      bars: [
        ...hisMatch({
          map: {
            other: [{
              name: "statisticalWorkload",
              meta: {
                title: '工作量统计',
                img: require("../images/workload.png"),
              },
            }]
          }
        }),
        ...hisMatch({
          map: {
            lyxrm: [{
              name:"statisticalIncrease",
              meta: {
                title:'工作量细项统计',
                img: require("../images/workload.png"),
              }
            }],
            other: []
          }
        }),
        ...hisMatch({
          map: {
            wujing: [{
              name: "statisticalReport",
              meta: {
                title: '危重症病例统计表',
                img: require("../images/workload.png"),
              },
            }],
            zhzxy: [
              {
                name: "statisticalConsultation",
                meta: {
                  title: '会诊统计',
                  img: require("../images/exit-adm.png"),
                },
              }
            ],
            other: [
              {
                name: "statisticalExitAdmission",
                meta: {
                  title: '出入院统计',
                  img: require("../images/exit-adm.png"),
                },
              },
              {
                name: "statisticalOperation",
                meta: {
                  title: '手术统计',
                  img: require("../images/operate.png"),
                },
              },
              {
                name: "statisticalNursingLv",
                meta: {
                  title: '护理级别统计',
                  img: require("../images/lv.png"),
                },
              },
            ]
          }
        }),
        ...hisMatch({
          map: {
            ytll: [
              {
                name: 'statisticalUnplanned',
                meta: {
                  title: '非计划性拔管统计',
                  img: require("../images/VTE.png"),
                }
              },
              {
                name: 'statisticalAdultFall',
                meta: {
                  title: '成人跌倒统计',
                  img: require("../images/VTE.png"),
                }
              },
              {
                name: 'statisticalChildrenFall',
                meta: {
                  title: '儿童跌倒统计',
                  img: require("../images/VTE.png"),
                }
              },
               {
                name: 'statisticalEvaluateVTE',
                meta: {
                  title: 'VTE评估率',
                  img: require("../images/VTE.png"),
                }
              },
            ],
            other: []
          }
        }),
        ...hisMatch({
          map: {
            nfyksdyy: [
              {
                name: "statisticalTumble",
                meta: {
                  title: '跌倒风险统计',
                  img: require("../images/VTE.png"),
                },
              },
            ],
            other: []
          }
        }),
        ...hisMatch({
          map: {
            gdtj: [],
            zhzxy: [],
            wujing: [],
            other: [
              {
                name: "statisticalVTE",
                meta: {
                  title: 'VTE统计',
                  img: require("../images/VTE.png"),
                },
              },
              {
                name: "statisticalPressure",
                meta: {
                  title: '压力性损伤统计',
                  img: require("../images/pressure.png"),
                },
              },
              {
                name: "statisticalTemperature",
                meta: {
                  title: '体温统计',
                  img: require("../images/temp.png"),
                },
              },
              {
                name: "statisticalPulseHeartRate",
                meta: {
                  title: '脉搏统计',
                  img: require("../images/pulse.png"),
                },
              },
              {
                name: "statisticalHeartRate",
                meta: {
                  title: '心率统计',
                  img: require("../images/heart-rate.png"),
                },
              },
              {
                name: "statisticalBreath",
                meta: {
                  title: '呼吸统计',
                  img: require("../images/breath.png"),
                },
              },
              {
                name: "statisticalBloodPressure",
                meta: {
                  title: '血压统计',
                  img: require("../images/blood-pressure.png"),
                },
              },
            ]
          }
        }),
        ...hisMatch({
          map: {
            whsl: [
              {
                name: "statisticalBlood",
                meta: {
                  title: '血糖统计',
                  img: require("../images/VTE.png"),
                },
              },
              {
                name: "statisticalUrineVolume",
                meta: {
                  title: '尿量统计',
                  img: require("../images/VTE.png"),
                },
              },
              {
                name: "statisticalTumble",
                meta: {
                  title: '跌倒统计',
                  img: require("../images/VTE.png"),
                },
              },
              {
                name: "statisticalNutritionalRisk",
                meta: {
                  title: '营养风险统计',
                  img: require("../images/VTE.png"),
                },
              },
            ],
            nfyksdyy:[
              {
                name: "statisticalScanCodeDetails",
                meta: {
                  title: '扫码明细统计',
                  img: require("../images/VTE.png"),
                },
              },
              {
                name: "statisticalScanRate",
                meta: {
                  title: '扫码率统计',
                  img: require("../images/VTE.png"),
                },
              },
            ],
            other: []
          }
        }),
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
  overflow-y: auto;
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
