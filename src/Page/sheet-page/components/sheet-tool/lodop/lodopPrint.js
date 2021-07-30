/*
 * @Author: linzhongjie
 * @Date: 2018-12-05 14:17:00
 * @Last Modified by: linzhongjie
 * @Last Modified time: 2018-12-09 21:30:07
 */
import { getLodop } from './LodopFuncs'
import { sheetCss } from './css'
const cheerio = require('cheerio')
// import { Loading, Message } from "element-ui";
export default function (htmlArr) {
  htmlArr = htmlArr.map(html => {
    var reg = /data-value/g;
    var reg1 = /textarea/g;
    let mapHtml = html.replace(reg, "value").replace(reg1, "article");
    let $ = cheerio.load(mapHtml)
    $('[style="display: none;"]').remove()
    $('th span').each((index, item) => {
      if ($(item).html() == ('签名')) {
        $(item).html('')
      }
      // 去掉空自定义标题
      if (($(item).html().indexOf('&#x6807;&#x9898;') > -1)) {
        $(item).html('')
      }
    })
    $('article').each((index, el) => {
      $(el).html($(el).attr('value'))
    })
    $('.sign-img img').each((index, el) => {
      $(el).attr('src', window.location.origin + $(el).attr('src'))
    })
    return $.html()
  })
  // var LODOP = getLodop();
  for (let i = 0; i < htmlArr.length; i++) {
    // LODOP.NewPage();
    // LODOP.SET_PRINT_PAGESIZE(2, '2100mm', '297mm', 'A4')
    // LODOP.SET_PRINT_PAGESIZE(2, '3100mm', '2970mm')
    // LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Auto-Width');
    let html = `
    <!DOCTYPE>
    <html>
    <head>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE11">
    ${sheetCss}
    </head>
    <body>
    ${htmlArr[i]}
    </body>
    </html>
    `
    console.log(html, 'html')
    // LODOP.ADD_PRINT_HTM("20mm", "10mm", "RightMargin:10mm", "BottomMargin:0mm", html)
  }
  // let loadingInstance1 = Loading.service({ fullscreen: true, text: "准备打印中，请耐心等待" });
  // if (LODOP.CVERSION) CLODOP.On_Return = function (TaskID, Value) {
  //   loadingInstance1.close()
  //   if (Value) {
  //     Message.success('打印数据成功传入打印机，请去打印机查看')
  //   } else {
  //     Message.warning('你取消了打印')
  //   }
  // };
  // LODOP.PRINT_DESIGN();
  // LODOP.PREVIEW();
  // LODOP.PRINTA();
}
