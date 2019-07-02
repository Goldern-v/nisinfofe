/**
 * 
 * @param {Vue实例} _this
 */
import { model } from '../../../store'
export function toolBarConfig(_this) {
  let config = {
    style: {
      borderLeft: 0,
      borderRight: 0
    },
    left: [
      {
        name: "添加评估",
        click: () => {
          _this.openEvalModal()
        }
      },
      {
        name: "添加引流量",
        click: () => {
          _this.openFluidModal()
        }
      },
      {
        name: "引流量总结",
        click: () => {
          _this.openFluidSumUpModal()
        }
      },
      {
        name: "引流量曲线",
        click: () => {
          _this.openFluidChartModal()
        }
      },
      // {
      //   name: "打印",
      //   click: () => { }
      // },
    ],
    right: [
      {
        name: "拔管",
        style: {
          background: '#4BB08D',
          color: '#fff',
          border: '1px solid #38876C'
        },
        click: () => {
          _this.openEndBlockModal()
        }
      },
    ]
  };
  return config
}
