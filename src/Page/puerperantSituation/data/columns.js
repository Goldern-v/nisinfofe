export const columns = (vm) => {
  return [
    {
      title: "住院号",
      key: "hospitalizationNumber",
      width: 100,
      fixed: 'left',
      render: (h, record) => vm.defaultRender(h, record)
    },
    {
      title: "ID",
      key: "patientId",
      width: 134,
      fixed: 'left',
      render: (h, record) => vm.defaultRender(h, record)
    },
    {
      title: "姓名",
      fixed: 'left',
      key: "female",
      width: 134,
      render: (h, record) => {
        let row = record.row
        let key = 'female'

        if (record.index % 2 == 0) {
          return vm.defaultEditRender(h, record,key)
        } else {
          key = 'man'
          return h('span', {}, [
            h('span', {}, '丈夫:'),
            h('el-input', {
              props: {
                value: row[key],
                type: 'textarea',
                autosize: {minRows: 1},
                resize: 'none'
              },
              style:{
                width: '80px'
              },
              on: {
                change: (e) => vm.handleChange(record, key, e.target.value)
              }
            })
          ])

        }
      }
    },
    {
      title: "产妇情况",
      align: "center",
      children: [
        {
          title: "身份证号码",
          key: "femaleId",
          width: 160,
          render: (h, record) => {
            let key = 'femaleId'

            if (record.index % 2 !== 0) key = 'manId';

            return vm.defaultEditRender(h, record,key)
          }
        },
        {
          title: "年龄",
          key: "femaleAge",
          width: 60,
          render: (h, record) => {
            let key = 'femaleAge'

            if (record.index % 2 !== 0) key = 'manAge';
            return vm.defaultEditRender(h, record,key)
          }
        },
        {
          title: "籍贯",
          key: "femaleBrithPlace",
          width: 120,
          render: (h, record) => {
            let key = 'femaleBrithPlace'

            if (record.index % 2 !== 0) key = 'manAge';

            return vm.defaultEditRender(h, record,key)
          }
        },
        {
          title: "职业",
          key: "femaleJob",
          width: 100,
          render: (h, record) => {
            let key = 'femaleJob'

            if (record.index % 2 !== 0)  key = 'manJob';

            return vm.defaultEditRender(h, record,key)
          }
        },
        {
          title: "文化程度",
          key: "femaleEdu",
          width: 90,
          render: (h, record) => {
            let key = 'femaleEdu'

            if (record.index % 2 !== 0)  key = 'manEdu'
            return vm.defaultSelectRender(h,record,vm.eduOptions,key)
          }
        },
        {
          title: "户口地址(市、镇、村)",
          key: "femaleBirthAddress",
          width: 210,
          render: (h, record) => {
            let key = 'femaleBirthAddress'

            if (record.index % 2 !== 0) key = 'manBirthAddress';
            return vm.defaultEditRender(h, record,key)
          }
        },
        {
          title: "现住地址",
          key: "nowAddress",
          width: 120,
          render:(h, record)=>vm.defaultEditRender(h, record)
        },
        {
          title: "高危情况",
          key: "dangerousSituation",
          width: 150,
          render:(h, record)=>vm.defaultEditRender(h, record)
        },
        {
          title: "孕周",
          key: "pregnancyWeek",
          width: 60,
          render:(h, record)=>vm.defaultEditRender(h, record)
        },
        {
          title: "孕次",
          key: "pregnancyTimes",
          width: 60,
          render:(h, record)=>vm.defaultEditRender(h, record)
        },
        {
          title: "产次",
          key: "birthTimes",
          width: 60,
          render:(h, record)=>vm.defaultEditRender(h, record)
        },
        {
          title: "破膜时间",
          align: 'center',
          children:[
            {
              title: "人工",
              align: 'center',
              key: "artiBrokenMembraneTime",
              width: 90,
              render:(h, record)=>vm.defaultModalRender(h, record)
            },
            {
              title: "自然",
              align: 'center',
              key: "natureBrokenMenbraneTime",
              width: 90,
              render:(h, record)=>vm.defaultModalRender(h, record)
            },
          ]
        },
        {
          title: "产程时间(小时)",
          align: 'center',
          children:[
            {
              title: "一",
              key: "productionProcess1",
              align: 'center',
              width: 100,
              render:(h, record)=>vm.productEditRender(h, record)
            },
            {
              title: "二",
              key: "productionProcess2",
              align: 'center',
              width: 100,
              render:(h, record)=>vm.productEditRender(h, record)
            },
            {
              title: "三",
              key: "productionProcess3",
              align: 'center',
              width: 100,
              render:(h, record)=>vm.productEditRender(h, record)
            },
            {
              title: "总产程",
              key: "productionProcessCount",
              align: 'center',
              width: 100,
              render:(h, record)=>vm.defaultEditRender(h, record)
            },
          ]
        },
        {
          title: "产前是否点滴催产素",
          key:"hadOxytocin",
          width: 60,
          render:(h,record)=>vm.defaultSelectRender(h,record,vm.hoOptions)
        },
        {
          title: "分娩时间",
          align: "center",
          children:[
            {
              title: '年',
              key: '分娩时间-年',
              align: "center",
              width: 80,
              render:(h,record)=>{
                let row = record.row
                let key = 'childBirthTime'

                let text = row[key]?vm.formatDate(row[key],'YYYY'):""

                return vm.defaultModalRender(h,record,'childBirthTime',text)
              }
              
            },
            {
              title: '月',
              key: '分娩时间-月',
              align: "center",
              width: 60,
              render:(h,record)=>{
                let row = record.row
                let key = 'childBirthTime'
                let text = vm.formatDate(row[key],'MM')

                return vm.defaultModalRender(h,record,'childBirthTime',text)
              }
            },
            {
              title: '日',
              key: '分娩时间-日',
              align: "center",
              width: 60,
              render:(h,record)=>{
                let row = record.row
                let key = 'childBirthTime'
                let text = vm.formatDate(row[key],'DD')

                return vm.defaultModalRender(h,record,'childBirthTime',text)
              }
            },
            {
              title: '时',
              key: '分娩时间-时',
              align: "center",
              width: 60,
              render:(h,record)=>{
                let row = record.row
                let key = 'childBirthTime'
                let text = vm.formatDate(row[key],'HH')

                return vm.defaultModalRender(h,record,'childBirthTime',text)
              }
            },
            {
              title: '分',
              key: '分娩时间-分',
              align: "center",
              width: 60,
              render:(h,record)=>{
                let row = record.row
                let key = 'childBirthTime'
                let text = vm.formatDate(row[key],'mm')

                return vm.defaultModalRender(h,record,'childBirthTime',text)
              }
            }
          ]
        },
        {
          title: '分娩方式',
          key: 'childBirthWay',
          width: 90,
          render: (h,record)=>vm.defaultSelectRender(h,record,vm.cbwOptions)
        },
        {
          title: '手术指征',
          key: 'surgicalIndication',
          width: 120,
          render: (h,record)=>vm.defaultEditRender(h,record)
        },
        {
          title: '会阴情况',
          align: 'center',
          children:[
            {
              title: 'Ⅰ',
              key: 'perineumSituation1',
              align: "center",
              width: 60,
              render: (h,record)=>vm.defaultSelectRender(h,record,vm.otherOptions)
            },
            {
              title: 'Ⅱ',
              key: 'perineumSituation2',
              align: "center",
              width: 60,
              render: (h,record)=>vm.defaultSelectRender(h,record,vm.otherOptions)
            },
            {
              title: 'Ⅲ',
              key: 'perineumSituation3',
              align: "center",
              width: 60,
              render: (h,record)=>vm.defaultSelectRender(h,record,vm.otherOptions)
            },
            {
              title: '切开',
              key: 'perineumSituation',
              align: "center",
              width: 60,
              render: (h,record)=>vm.defaultSelectRender(h,record,vm.otherOptions)
            },
            {
              title: '完整',
              key: 'perineumSituationFull',
              align: "center",
              width: 60,
              render: (h,record)=>vm.defaultSelectRender(h,record,vm.otherOptions)
            }
          ]
        },
        {
          title: '产后2h出血量(ml)',
          key: 'birthBloodVolume',
          width: 100,
          render: (h,record)=>{
            let row = record.row
            let key = record.column.key
            return h('el-input', {
              props: {
                value: row[key],
                type: 'textarea',
                autosize: {minRows: 1},
                resize: 'none'
              },
              on: {
                blur: (e) => {
                  if(e.target.value&&!isNaN(Number(e.target.value))){
                    vm.handleChange(record, key, e.target.value)
                  }else{
                    vm.$message({
                      message: '产后2h出血量 必须为数字',
                      type: 'error'
                    })
                  }
                }
              }
            })
          }
        }
      ]
    },
    {
      title: '新生儿情况',
      align: 'center',
      children: [
        {
          title: '性别',
          key: 'newBornSex',
          align: 'center',
          width: 45,
          render: (h,record)=>vm.defaultSelectRender(h,record,vm.sexOptions)
        },
        {
          title: '身长cm',
          key: 'newBornHeight',
          align: 'center',
          width: 60,
          render: (h,record)=>vm.defaultEditRender(h,record)
        },
        {
          title: '体重kg',
          key: 'newBornWeight',
          align: 'center',
          width: 60,
          render: (h,record)=>vm.defaultEditRender(h,record)
        },
        {
          title: '阿氏评分',
          align: 'center',
          children:[
            {
              title: '一分钟',
              key: 'aShiScore1',
              width: 60,
              align: 'center',
              render: (h,record)=>vm.defaultEditRender(h,record)
            },
            {
              title: '五分钟',
              key: 'aShiScore5',
              width: 60,
              align: 'center',
              render: (h,record)=>vm.defaultEditRender(h,record)
            }
          ]
        },
        {
          title: '早接触',
          key: 'earlyContact',
          align: 'center',
          width: 60,
          render: (h,record)=>vm.defaultSelectRender(h,record,vm.otherOptions)
        },
        {
          title: '早吮吸',
          key: 'earlySucking',
          align: 'center',
          width: 60,
          render: (h,record)=>vm.defaultSelectRender(h,record,vm.otherOptions)
        },
        {
          title: '死胎',
          key: 'deadBirth',
          width: 100,
          render: (h,record)=>vm.defaultEditRender(h,record)
        },
        {
          title: '死产',
          key: 'deadProduce',
          align: 'center',
          width: 100,
          render: (h,record)=>vm.defaultEditRender(h,record)
        },
        {
          title: '畸形',
          key: 'deformity',
          align: 'center',
          width: 100,
          render: (h,record)=>vm.defaultEditRender(h,record)
        },
        {
          title: '新生儿死亡',
          key: 'newBornDead',
          align: 'center',
          width: 100,
          render: (h,record)=>vm.defaultEditRender(h,record)
        },
        {
          title: '死因',
          key: 'deadReason',
          align: 'center',
          width: 100,
          render: (h,record)=>vm.defaultEditRender(h,record)
        }
      ]
    },
    {
      title: '其他',
      align: 'center',
      children:[
        {
          title: '生育证号码',
          key: 'birthCertificateNum',
          align: 'center',
          width: 60,
          render: (h,record)=>vm.defaultSelectRender(h,record,vm.bcnOptions)
        },
        {
          title: '接生者',
          key: 'birthAttendantName1',
          align: 'center',
          width: 160,
          render: (h,record)=>{
            let key1 = 'birthAttendantName1';
            let key2 = 'birthAttendantName2'
            let row = record.row;

            return h('div',{},[
              h(
                'span',
                {
                  class:'sign-name',
                  on:{
                    click:()=>vm.handleSign(row,key1)
                  }
                },
                row[key1]||''
              ),
              h('span',{},'/'),
              h(
                'span',
                {
                  class:'sign-name',
                  on:{
                    click:()=>vm.handleSign(row,key2)
                  }
                },
                row[key2]||''
              )
            ])
          }
        },
        {
          title: '出生医学证明号码',
          key: 'birthCertificateNumber',
          align: 'center',
          width: 160,
          render: (h,record)=>vm.defaultEditRender(h,record)
        },
        {
          title: '备注',
          key: 'remarks',
          align: 'center',
          width: 160,
          render: (h,record)=>vm.defaultEditRender(h,record)
        }
      ]
    },
    {
      title: '操作',
      key: 'operate',
      align: 'center',
      width: 60,
      render:(h,record)=>{
        return h('span',
          {
            class:'operate-span',
            on:{
              click:()=>vm.deleteRecord(record.row)
            }
          },
          '删除')
      }
    }
  ]
}