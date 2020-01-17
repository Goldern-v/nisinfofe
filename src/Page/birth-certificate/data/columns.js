export const columns = (vm) => {
  return [{
      title: "住院号",
      key: "zyblh",
      width: 80,
      fixed: 'left',
      render: (h, record) => vm.signleRowEditRender(h, record)
    },
    {
      title: "ID",
      key: "patientId",
      width: 100,
      fixed: 'left',
      render: (h, record) => vm.signleRowEditRender(h, record)
    },
    {
      title: "产妇姓名",
      key: "cfxm",
      width: 100,
      fixed: 'left',
      render: (h, record) => vm.signleRowEditRender(h, record)
    },
    {
      title: "接生日期",
      key: "jsryqzTbrq",
      width: 140,
      fixed: 'left',
      render: (h, record) => vm.signleRowEditRender(h, record)
    },
    {
      title: "新生儿情况",
      align: "center",
      children: [{
          title: "新生儿性别",
          key: "xsexb",
          width: 100,
          align: "center",
          render: (h, record) => vm.signleSelectEditRender(h, record, vm.sexOptions)
        },
        {
          title: "出生时间",
          key: "cssj",
          width: 150,
          align: "center",
          render: (h, record) => vm.signleRowEditRender(h, record)
        },
        {
          title: "出生孕周",
          key: "csyz",
          width: 100,
          align: "center",
          render: (h, record) => {
            let row = record.row
            let key = record.column.key
            if (record.index % 2 == 0)
              return h('span', {}, [
                h('el-input', {
                  props: {
                    value: row[key],
                    type: 'textarea',
                    autosize: {
                      minRows: 1
                    },
                    resize: 'none'
                  },
                  style: 'width:55px;margin-right:5px;',
                  on: {
                    blur: (e) => vm.handleEditDone(record, key, e.target.value)
                  }
                }),
                h('span', {}, '周')
              ])
            else
              return ''
          }
        },
        {
          title: "出生体重",
          key: "cstz",
          width: 100,
          align: "center",
          render: (h, record) => {
            let row = record.row
            let key = record.column.key
            if (record.index % 2 == 0)
              return h('span', {}, [
                h('el-input', {
                  props: {
                    value: row[key],
                    type: 'textarea',
                    autosize: {
                      minRows: 1
                    },
                    resize: 'none'
                  },
                  style: 'width:55px;margin-right:5px;',
                  on: {
                    blur: (e) => vm.handleEditDone(record, key, e.target.value)
                  }
                }),
                h('span', {}, '克')
              ])
            else
              return ''
          }
        },
        {
          title: "出生身长",
          key: "cssc",
          width: 120,
          align: "center",
          render: (h, record) => {
            let row = record.row
            let key = record.column.key
            if (record.index % 2 == 0)
              return h('span', {}, [
                h('el-input', {
                  props: {
                    value: row[key],
                    type: 'textarea',
                    autosize: {
                      minRows: 1
                    },
                    resize: 'none'
                  },
                  style: 'width:75px;margin-right:5px;',
                  on: {
                    blur: (e) => vm.handleEditDone(record, key, e.target.value)
                  }
                }),
                h('span', {}, '厘米')
              ])
            else
              return ''
          }
        },
        {
          title: "出生地点",
          key: 'csddOne',
          width: 460,
          align: "center",
          render: (h, record) => {
            let row = record.row
            if (record.index % 2 == 0)
              return h('span', {}, [
                h('el-input', {
                  props: {
                    value: row['csddOne'],
                    type: 'textarea',
                    autosize: {
                      minRows: 1
                    },
                    resize: 'none'
                  },
                  style: 'width:75px;margin-right:5px;',
                  on: {
                    blur: (e) => vm.handleEditDone(record, 'csddOne', e.target.value)
                  }
                }),
                h('span', {}, '省（区、市）'),
                h('el-input', {
                  props: {
                    value: row['csddTwo'],
                    type: 'textarea',
                    autosize: {
                      minRows: 1
                    },
                    resize: 'none'
                  },
                  style: 'width:80px;margin-right:5px;',
                  on: {
                    blur: (e) => vm.handleEditDone(record, 'csddTwo', e.target.value)
                  }
                }),
                h('span', {}, '市'),
                h('el-input', {
                  props: {
                    value: row['csddThree'],
                    type: 'textarea',
                    autosize: {
                      minRows: 1
                    },
                    resize: 'none'
                  },
                  style: 'width:100px;margin-right:5px;margin-left:5px;',
                  on: {
                    blur: (e) => vm.handleEditDone(record, 'csddThree', e.target.value)
                  }
                }),
                h('span', {}, '县（区）'),
              ])
            else
              return ''
          }
        },
        {
          title: "医疗机构名称",
          key: 'yljgmc',
          width: 120,
          align: "center",
          render: (h, record) => vm.signleRowEditRender(h, record)
        },
      ]
    },
    {
      title: "父母相关信息",
      align: "center",
      children: [{
          title: "姓名",
          key: "femaleAge",
          width: 150,
          render: (h, record) => {
            let row = record.row
            let key = 'mqxxXm'
            let title = '母亲：'
            if (record.index % 2 !== 0) {
              key = 'fqxxXm';
              title = '父亲：'
            }
            return h('span', {}, [
              h('span', {}, title),
              h('el-input', {
                props: {
                  value: row[key],
                  type: 'textarea',
                  autosize: {
                    minRows: 1
                  },
                  resize: 'none'
                },
                style: 'width:74px;',
                on: {
                  blur: (e) => vm.handleEditDone(record, key, e.target.value)
                }
              })
            ])
          }
        },
        {
          title: "年龄",
          key: "mqxxNl",
          width: 60,
          render: (h, record) => {
            let key = 'mqxxNl'
            if (record.index % 2 !== 0) key = 'fqxxNl';
            return vm.defaultEditRender(h, record, key)
          }
        },
        {
          title: "国籍",
          key: "mqxxGj",
          width: 80,
          render: (h, record) => {
            let key = 'mqxxGj'
            if (record.index % 2 !== 0) key = 'fqxxGj';
            return vm.defaultEditRender(h, record, key)
          }
        },
        {
          title: "民族",
          key: "mqxxMz",
          width: 80,
          render: (h, record) => {
            let key = 'mqxxMz'
            if (record.index % 2 !== 0) key = 'fqxxMz';
            return vm.defaultEditRender(h, record, key)
          }
        },
        {
          title: "证件类别",
          key: "mqxxYxsfzjlb",
          width: 120,
          render: (h, record) => {
            let key = 'mqxxYxsfzjlb'
            if (record.index % 2 !== 0) key = 'fqxxYxsfzjlb';
            return vm.defaultEditRender(h, record, key)
          }
        },
        {
          title: "身份证件号码",
          key: "mqxxYxsfzjhm",
          width: 160,
          render: (h, record) => {
            let key = 'mqxxYxsfzjhm'
            if (record.index % 2 !== 0) key = 'fqxxYxsfzjhm';
            return vm.defaultEditRender(h, record, key)
          }
        },
        {
          title: "户籍地址",
          key: "mqxxHjdz",
          width: 300,
          render: (h, record) => {
            let key = 'mqxxHjdz'
            if (record.index % 2 !== 0) key = 'fqxxHjdz';
            return vm.defaultEditRender(h, record, key)
          }
        },
      ]
    },
    {
      title: "接生人员签字",
      key: "jsryqzName",
      align: 'center',
      width: 140,
      render: (h, record) => {
        if (record.index % 2 == 0) return vm.defaultEditRender(h, record)
        return ''
      }
    },
    {
      title: "操作",
      key: "operate",
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (h, record) => {
        if (record.index % 2 == 0) return h('span', {}, [
          h('span', {
            class: 'operate-span',
            style: "margin-left:10px;margin-right:5px;",
            on: {
              click: () => vm.seeRecord(record.row)
            }
          }, '查看'),
          h('span', {
            class: 'operate-span',
            style: "margin-left:10px;margin-right:5px;",
            on: {
              click: () => vm.deleteRecord(record.row)
            }
          }, '删除'),
        ])
        return ''
      }
    },
  ]
}
