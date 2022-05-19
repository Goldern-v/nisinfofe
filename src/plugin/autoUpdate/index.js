// 自动更新模块 2018-09-27
import $ from 'jquery'
async function getHtml() {
  return (new Promise((resolve, reject) => {
    $.get('./').then(res => {
      resolve(res)
    })
  }))
}
export default async function () {
  let currentHtml = await getHtml()
  let recentHtml = ''
  setInterval(async () => {
    recentHtml = await getHtml()
    if (recentHtml != currentHtml) {
      currentHtml = recentHtml
      try {
        if (['huadu'].includes(process.env.HOSPITAL_ID)) {
          window.app.$alert('发现新的版本了，点击立即更新', '更新提示', {
            confirmButtonText: '确定',
            type:"info",
            callback: action => {
              location.reload(true)
            }
          });
        } else {
          window.app.$notify.info({
            title: '更新提示',
            message: '发现新的版本了，点击立即更新',
            duration: 0,
            onClick() {
              location.reload(true)
            }
          });
        }
      }
      catch (e) { }
    }
  }, 1000 * 200)
}