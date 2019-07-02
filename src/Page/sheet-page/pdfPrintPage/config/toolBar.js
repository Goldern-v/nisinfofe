/**
 * 
 * @param {Vue实例} _this
 */
export function toolBarConfig(_this) {
  let config = {
    style: {
      borderLeft: 0,
      borderRight: 0,
      borderTop: 0
    },
    left: [
      {
        name: "打印",
        click: () => {
          _this.$refs.pdfIframe.contentWindow.print()
        }
      },
      {
        name: "刷新",
        click: () => {
          _this.toPdfPrint()
        }
      },
      {
        name: "清缓存刷新",
        click: () => {
          _this.toPdfPrint(true)
        }
      },

    ],
    right: [

    ]
  };
  return config
}
