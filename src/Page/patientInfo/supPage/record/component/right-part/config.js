import { getFormConfig } from '../../config/form-config.js'
/**
 *
 * @param {Vue实例} _this
 */
export function toolBarConfig(
  _this,
  isOutSign,
  isOutAudit,
  hasCheck,
  isAddNewPage,
  isDev = false,
  isPushForward = false) {
  // 全局变量
  // iframe window
  let getWid = () => _this.$refs.assessment.$refs.iframe.contentWindow
  var switchBtn = true
  // console.log("保存错误", switchBtn);

  let config = {
    left: [
      // {
      //   name: "添加新页",
      //   click: () => {}
      // },
      {
        name: "保存",
        disabled: false,
        visible: true,
        click: (e) => {

          let wid = document.querySelector('.assessment-iframe').contentWindow
          try {
            wid.saveForm()
            // this.switchBtn = true
            console.log('click保存', e, e.target.className, this)
          } catch (error) {
            // 保存错误
            wid.messageBox.show('保存异常错误', 'error', 5000);
            console.log("保存错误", error);
          }
        }
      },
      {
        name: "删除整单",
        visible: true,
        disabled: false,
        click: () => {
          let formTitle = getWid().formInfo.title || '单'
          // if(getWid().messageBox && getWid().messageBox.getStatus()!=='close'){return}
          window.openSignModal((password, empNo) => {
            getWid().delForm(password, empNo).then(res => {
              console.log('删除', res)
              let message = '删除成功'
              if (res) { message = res.data.desc; _this.$message.success(message) }
              _this.bus.$emit('closeAssessment')
              _this.bus.$emit('refreshTree')
              window.app.bus.$emit('refreshTree')
            }).catch(err => {
              console.log('删除失败:', err)
              _this.$message.error("删除失败")
              // window.messageBox.close()
            })
          }, '删除整张单确认', false, `请确认是否要删除整张${formTitle}？`)

        }
      },
      {
        name: "责任护士签名",
        visible: isOutSign || false,
        click: () => {
          let wid = document.querySelector('.assessment-iframe').contentWindow
          wid.toSign(true)
        }
      },
      {
        name: "审核签名",
        visible: isOutAudit || false,
        disabled: false,
        click: () => {
          let wid = document.querySelector('.assessment-iframe').contentWindow
          wid.toSign(false)
        }
      },
      {
        name: "填写检查",
        visible: hasCheck || false,
        disabled: false,
        click: () => {
          // let wid = document.querySelector('.assessment-iframe').contentWindow
          getWid().toCheckForm()
        }
      },
      {
        name: "添加新页",
        visible: isAddNewPage || false,
        disabled: false,
        click: () => {
          let wid = document.querySelector('.assessment-iframe').contentWindow
          wid.addNewPage()
          // getWid().toCheckForm()
          // let params = {
          //   title:"测试开发弹框页面"
          // }
          // window.openTestDiagnosisModal(params)
        }
      },
      // {
      //   name: "开发测试按钮",
      //   visible: isDev || false,
      //   disabled: false,
      //   click: () => {
      //     // let wid = document.querySelector('.assessment-iframe').contentWindow
      //     // getWid().toCheckForm()
      //     let params = {
      //       title: "测试开发弹框页面"
      //     }
      //     window.openTestDiagnosisModal(params)
      //   }
      // },
      {
        name: "推送",
        visible: isPushForward || false,
        disabled: false,
        click: () => {
          // let wid = document.querySelector('.assessment-iframe').contentWindow
          // getWid().toCheckForm()
          let params = {
            title: "推送"
          }
          let wid = document.querySelector('.assessment-iframe').contentWindow
          wid.pushMission()
          // window.openTestDiagnosisModal(params)
          // console.log(window.formInfo.status,2222222222222222222)
          // window.formInfo.status = 1
        }
      }
    ],
    right: [
      {
        name: "打印",
        disabled: false,
        visible: true,
        click: () => {
          _this.bus.$emit('printAssessment')
        }
      },
      {
        name: "全屏",
        disabled: false,
        visible: true,
        click: () => {
          let fullPageRecord = _this.$store.state.record.fullPageRecord
          if (fullPageRecord) {
            _this.$store.commit('closeFullPageRecord')
          } else {
            _this.$store.commit('openFullPageRecord')
          }
        }
      }
    ],
    disableAllButtons: function (isDisabled = true) {
      config && config.left.map(btn => {
        btn.disabled = isDisabled
      })
      config && config.right.map(btn => {
        btn.disabled = isDisabled
      })
    }
  };
  // if (isOutSign) {
  //   config.left[2] = {
  //     name: "责任护士签名",
  //     visible: isOutSign || false,
  //     click: () => {
  //       let wid = document.querySelector('.assessment-iframe').contentWindow
  //       wid.toSign(true)
  //     }
  //   }
  // }
  // if (isOutAudit) {
  //   config.left[3] = {
  //     name: "审核签名",
  //     visible: isOutAudit || false,
  //     disabled: false,
  //     click: () => {
  //       let wid = document.querySelector('.assessment-iframe').contentWindow
  //       wid.toSign(false)
  //     }
  //   }
  // }
  // if (hasCheck) {
  //   config.left[4] = {
  //     name: "填写检查",
  //     visible: hasCheck || false,
  //     disabled: false,
  //     click: () => {
  //       // let wid = document.querySelector('.assessment-iframe').contentWindow
  //       getWid().toCheckForm()
  //     }
  //   }
  // }
  // if (isAddNewPage) {
  //   config.left.push({
  //     name: "添加新页",
  //     visible: isAddNewPage||false,
  //     disabled: false,
  //     click: () => {
  //       let wid = document.querySelector('.assessment-iframe').contentWindow
  //       wid.addNewPage()
  //       // getWid().toCheckForm()
  //       // let params = {
  //       //   title:"测试开发弹框页面"
  //       // }
  //       // window.openTestDiagnosisModal(params)
  //     }
  //   })
  // }
  // if (isDev) {
  //   config.left.push({
  //     name: "开发测试按钮",
  //     visible: isDev||false,
  //     disabled: false,
  //     click: () => {
  //       // let wid = document.querySelector('.assessment-iframe').contentWindow
  //       // getWid().toCheckForm()
  //       let params = {
  //         title: "测试开发弹框页面"
  //       }
  //       window.openTestDiagnosisModal(params)
  //     }
  //   })
  // }
  // if (isPushForward) {
  //   config.left.push({
  //     name: "推送",
  //     visible: isPushForward||false,
  //     disabled: false,
  //     click: () => {
  //       // let wid = document.querySelector('.assessment-iframe').contentWindow
  //       // getWid().toCheckForm()
  //       let params = {
  //         title: "推送"
  //       }
  //       let wid = document.querySelector('.assessment-iframe').contentWindow
  //       wid.pushMission()
  //       // window.openTestDiagnosisModal(params)
  //       // console.log(window.formInfo.status,2222222222222222222)
  //       // window.formInfo.status = 1
  //     }
  //   })
  // }
  return config
}
