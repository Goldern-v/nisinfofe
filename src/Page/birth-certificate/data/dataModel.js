let tableModel = {
  table: {
    tbody: [
      [
        {
          colspan: 9,
          value: '分娩信息',
          type: 'text',
          class: 'title label',
          style: '',
        }
      ],
      [
        {
          colspan: 2,
          value: '产妇姓名',
          type: 'text',
          class: 'label',
          style: 'width: 100px;',
        },
        {
          colspan: 2,
          getKey: 'female',
          setKey: 'cfxm',
          value: '',
          type: 'input',
          style: 'width: 130px;',
        },
        {
          colspan: 2,
          value: '住院病历号',
          type: 'text',
          class: 'label',
          style: 'width: 100px;'
        },
        {
          colspan: 3,
          getKey: 'hospitalizationNumber',
          setKey: 'zyblh',
          value: '',
          type: 'input',
          style: 'width: 311px',
        },
      ],
      [
        {
          colspan: 2,
          value: '新生儿性别',
          type: 'text',
          class: 'label',
          style: 'width: 100px;'
        },
        {
          colspan: 2,
          getKey: 'newBornSex',
          setKey: 'xsexb',
          value: '',
          type: 'input',
          style: 'width: 130px;',
        },
        {
          colspan: 2,
          value: '出生时间',
          type: 'text',
          class: 'label',
          style: 'width: 100px;'
        },
        {
          colspan: 3,
          getKey: '',
          setKey: 'cssj',
          value: '',
          type: 'inputGroup',
          class: '',
          format: 'YYYY-MM-DD HH:mm',
          children: [
            {
              setKey: 'cssj1',
              value: '',
              type: 'input',
              next: '年',
              style: 'width: 40px;',
            },
            {
              setKey: 'cssj2',
              value: '',
              type: 'input',
              next: '月',
              style: 'width: 30px;',
            },
            {
              setKey: 'cssj3',
              value: '',
              type: 'input',
              next: '日',
              style: 'width: 30px;',
            },
            {
              setKey: 'cssj4',
              value: '',
              type: 'input',
              next: '时',
              style: 'width: 30px;',
            },
            {
              setKey: 'cssj5',
              value: '',
              type: 'input',
              next: '分',
              style: 'width: 30px;',
            },
          ],
          style: 'width: 311px;',
        }
      ],
      [
        {
          colspan: 2,
          value: '出生孕周',
          type: 'text',
          class: 'label',
          style: 'width: 100px;',
        },
        {
          colspan: 7,
          value: '',
          type: 'table',
          class: '',
          style: '',
          table: {
            tbody: [
              [
                {
                  getKey: '',
                  setKey: 'csyz',
                  value: '',
                  type: 'input',
                  next: '周',
                  style: 'width: 100px;',
                  eleStyle: 'width: 60px;',
                },
                {
                  value: '出生体重',
                  type: 'text',
                  class: 'label',
                  style: 'width: 100px;'
                },
                {
                  colspan: 2,
                  getKey: 'newBornWeight',
                  setKey: 'cstz',
                  value: '',
                  type: 'input',
                  next: '克',
                  style: 'width: 120px;',
                  eleStyle: 'width: 70px;',
                },
                {
                  value: '出生身长',
                  type: 'text',
                  class: 'label',
                  style: 'width: 100px;'
                },
                {
                  colspan: 2,
                  getKey: 'newBornHeight',
                  setKey: 'cssc',
                  value: '',
                  type: 'input',
                  next: '厘米',
                  style: 'width: 119px;',
                  eleStyle: 'width: 60px;',
                },
              ]
            ]
          }
        }
      ],
      [
        {
          colspan: 2,
          value: '出生地点',
          type: 'text',
          class: 'label',
          style: 'width: 100px;',
        },
        {
          colspan: 7,
          value: '',
          type: 'table',
          class: '',
          style: '',
          table: {
            tbody: [
              [
                {
                  colspan: 4,
                  getKey: '',
                  setKey: 'csdd',
                  value: '',
                  type: 'inputGroup',
                  class: '',
                  children: [
                    {
                      setKey: 'csdd1',
                      value: '',
                      type: 'input',
                      next: '省（区、市）',
                      style: 'width: 50px;',
                    },
                    {
                      setKey: 'csdd2',
                      value: '',
                      type: 'input',
                      next: '市',
                      style: 'width: 50px;',
                    },
                    {
                      setKey: 'csdd3',
                      value: '',
                      type: 'input',
                      next: '县（区）',
                      style: 'width: 70px;',
                    }
                  ],
                  style: 'width: 323px;',
                },
                {
                  value: '医疗机构名称',
                  type: 'text',
                  class: 'label',
                  style: 'width: 100px;'
                },
                {
                  colspan: 2,
                  getKey: '',
                  setKey: 'yljgmc',
                  value: '',
                  type: 'input',
                  style: 'width: 119px;',
                },
              ],
            ]
          }
        }
      ],
      [
        {
          colspan: 9,
          value: '以上内容由接生人员填写，请核对正确无误后签字确认。',
          type: 'text',
          class: '',
          style: 'padding-left: 13px;',
        }
      ],
      [
        {
          colspan: 6,
          getKey: '',
          setKey: 'jsryqzEmpNo',
          setKey2: 'jsryqzName',
          value: '点击签字',
          type: 'sign',
          class: '',
          prev: '接生人员签字：',
          style: 'border-top: none;border-right: none;padding-left: 13px;',
          eleStyle: 'color: #1284FF;cursor:pointer;',
          sign: true,
        },
        {
          colspan: 3,
          getKey: '',
          setKey: 'jsryqz_tbrq',
          value: '',
          type: 'inputGroup',
          class: '',
          format: 'YYYY-MM-DD',
          children: [
            {
              setKey: 'jsryqz_tbrq1',
              value: '',
              type: 'input',
              prev: '填表日期：',
              next: '年',
              style: 'width: 35px;',
            },
            {
              setKey: 'jsryqz_tbrq2',
              value: '',
              type: 'input',
              next: '月',
              style: 'width: 30px;',
            },
            {
              setKey: 'jsryqz_tbrq3',
              value: '',
              type: 'input',
              next: '日',
              style: 'width: 30px;',
            }
          ],
          style: 'border-top: none;border-left: none;',
        }
      ]
    ]
  },
  table2: {
    tbody: [
      [
        {
          colspan: 9,
          value: '新生儿姓名及其父母相关信息',
          type: 'text',
          class: 'title label',
          style: 'border-top: none;',
        }
      ],
      [
        {
          colspan: 2,
          value: '新生儿姓名',
          type: 'text',
          class: 'label',
          style: 'width: 100px;',
        },
        {
          colspan: 7,
          value: '',
          type: 'text',
          style: '',
        },
      ],
      [
        {
          rowspan: 5,
          value: '母亲信息',
          type: 'text',
          class: 'label',
          style: 'width: 40px;border-bottom: 1px solid #000;line-height:18px;',
        },
        {
          value: '姓名',
          type: 'text',
          class: 'label',
          style: 'width: 70px;',
        },
        {
          colspan: 3,
          getKey: 'female',
          setKey: 'mqxx_xm',
          value: '',
          type: 'input',
        },
        {
          value: '年龄',
          type: 'text',
          class: 'label',
          style: 'width: 70px;',
        },
        {
          colspan: 3,
          getKey: 'femaleAge',
          setKey: 'mqxx_nl',
          value: '',
          type: 'input',
          style: 'width: 250px;',
        },
      ],
      [
        {
          value: '国籍',
          type: 'text',
          class: 'label',
          style: 'width: 70px;',
        },
        {
          colspan: 3,
          getKey: '',
          setKey: 'mqxx_gj',
          value: '',
          type: 'input',
        },
        {
          value: '民族',
          type: 'text',
          class: 'label',
          style: 'width: 70px;',
        },
        {
          colspan: 3,
          getKey: '',
          setKey: 'mqxx_mz',
          value: '',
          type: 'input',
          style: 'width: 250px;',
        },
      ],
      [
        {
          colspan: 2,
          value: '户籍地址',
          type: 'text',
          class: 'label',
          style: 'width: 149px;',
        },
        {
          colspan: 6,
          getKey: 'femaleBirthAddress',
          setKey: 'mqxx_hjdz',
          value: '',
          type: 'input',
          style: 'width: 520px;',
        }
      ],
      [
        {
          colspan: 2,
          value: '有效身份证件类型',
          type: 'text',
          class: 'label',
          style: 'width: 149px;',
        },
        {
          colspan: 6,
          getKey: '',
          setKey: 'mqxx_yxsfzjlb',
          value: '',
          type: 'input',
          style: 'width: 520px;',
        }
      ],
      [
        {
          colspan: 2,
          value: '有效身份证件号码',
          type: 'text',
          class: 'label',
          style: 'width: 149px;',
        },
        {
          colspan: 6,
          getKey: 'femaleId',
          setKey: 'mqxx_yxsfzjhm',
          value: '',
          type: 'input',
          style: 'width: 520px;',
        }
      ],
      [
        {
          rowspan: 5,
          value: '父亲信息',
          type: 'text',
          class: 'label',
          style: 'width: 40px;border-bottom: 1px solid #000;line-height:18px;',
        },
        {
          value: '姓名',
          type: 'text',
          class: 'label',
          style: 'width: 70px;',
        },
        {
          colspan: 3,
          getKey: 'man',
          setKey: 'fqxx_xm',
          value: '',
          type: 'input',
          style: 'width: 250px;',
        },
        {
          value: '年龄',
          type: 'text',
          class: 'label',
          style: 'width: 70px;',
        },
        {
          colspan: 3,
          getKey: 'manAge',
          setKey: 'fqxx_nl',
          value: '',
          type: 'input',
          style: 'width: 250px;',
        },
      ],
      [
        {
          value: '国籍',
          type: 'text',
          class: 'label',
          style: 'width: 70px;',
        },
        {
          colspan: 3,
          getKey: '',
          setKey: 'fqxx_gj',
          value: '',
          type: 'input',
          style: 'width: 250px;',
        },
        {
          value: '民族',
          type: 'text',
          class: 'label',
          style: 'width: 70px;',
        },
        {
          colspan: 3,
          getKey: '',
          setKey: 'fqxx_mz',
          value: '',
          type: 'input',
          style: 'width: 250px;',
        },
      ],
      [
        {
          colspan: 2,
          value: '户籍地址',
          type: 'text',
          class: 'label',
          style: 'width: 149px;',
        },
        {
          colspan: 6,
          getKey: 'manBirthAddress',
          setKey: 'fqxx_hjdz',
          value: '',
          type: 'input',
          style: 'width: 520px;',
        }
      ],
      [
        {
          colspan: 2,
          value: '有效身份证件类型',
          type: 'text',
          class: 'label',
          style: 'width: 149px;',
        },
        {
          colspan: 6,
          getKey: '',
          setKey: 'fqxx_yxsfzjlb',
          value: '',
          type: 'input',
          style: 'width: 520px;',
        }
      ],
      [
        {
          colspan: 2,
          value: '有效身份证件号码',
          type: 'text',
          class: 'label',
          style: 'width: 149px;',
        },
        {
          colspan: 6,
          getKey: 'manId',
          setKey: 'fqxx_yxsfzjhm',
          value: '',
          type: 'input',
          style: 'width: 520px;',
        }
      ],
      [
        {
          rowspan: 3,
          colspan: 1,
          value: '领证人',
          type: 'text',
          class: 'label',
          style: 'width: 40px;border-bottom: 1px solid #000;line-height:18px;',
        },
        {
          colspan: 8,
          value: '',
          type: 'table',
          class: '',
          style: 'width: 70px;',
          table: {
            tbody: [
              [
                {
                  value: '姓名',
                  type: 'text',
                  class: 'label',
                  style: 'width: 70px;',
                },
                {
                  colspan: 2,
                  value: '',
                  type: 'text',
                  style: 'width: 250px;',
                },
                {
                  colspan: 3,
                  value: '与新生儿关系',
                  type: 'text',
                  class: 'label',
                  style: 'width: 200px;',
                },
                {
                  colspan: 2,
                  value: '',
                  type: 'text',
                  style: 'width: 250px;',
                }
              ]
            ]
          }
        }
      ],
      [
        {
          colspan: 2,
          value: '有效身份证件类型',
          type: 'text',
          class: 'label',
          style: 'width: 149px;',
        },
        {
          colspan: 6,
          value: '',
          type: 'text',
          style: 'width: 520px;',
        }
      ],
      [
        {
          colspan: 2,
          value: '有效身份证件号码',
          type: 'text',
          class: 'label',
          style: 'width: 149px;',
        },
        {
          colspan: 6,
          value: '',
          type: 'text',
          style: 'width: 520px;',
        }
      ],
      [
        {
          colspan: 9,
          value: '以上内容由领证人填写，请核对正确无误后签字确认，并承担相应法律责任。《出生医学证明》一经签发，证件上的各项信息原则上不应变更。',
          type: 'text',
          class: '',
          style: 'padding-left: 13px;padding-top: 5px;border-top: none;line-height: 18px;',
        }
      ],
      [
        {
          colspan: 5,
          value: '',
          type: 'text',
          class: '',
          prev: '领证人签字：',
          style: 'border-top: none;border-right: none;padding-left: 13px;',
          eleStyle: 'color: #1284FF;'
        },
        {
          colspan: 4,
          value: '',
          type: 'inputGroup',
          class: '',
          children: [
            {
              value: '',
              type: 'text',
              prev: '填表日期：',
              next: '年',
              style: 'display: inline-block;width: 40px;',
            },
            {
              value: '',
              type: 'text',
              next: '月',
              style: 'display: inline-block;width: 30px;',
            },
            {
              value: '',
              type: 'text',
              next: '日',
              style: 'display: inline-block;width: 30px;',
            }
          ],
          style: 'border-top: none;border-left: none;width: 400px;',
        },
      ],
      [
        {
          colspan: 9,
          value: '<p>注：1.在首次签发登记表背面粘贴《出生医学证明》存根、新生儿父母有效身份证复印件等材料。</p><p style="padding-left:2em;">2.表中的分娩信息和新生儿姓名及其父母相关信息分别由接生人员和领证人填写，所有项目要字迹清楚。若出现涂改，相应内容须有接生人员或领证人签字确认。</p>',
          type: 'html',
          class: '',
          style: 'padding: 12px 0 12px 13px;border-left: none;border-right: none;border-bottom: none;line-height: 18px;',
        }
      ],
      [
        {
          colspan: 9,
          value: '1/2页',
          type: 'text',
          class: '',
          style: 'font-size: 15px;text-align: center;border: none;height: 21px;',
        }
      ],
    ]
  }
}

export default tableModel;