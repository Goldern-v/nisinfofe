/**
 * label:文本
 * key: 后端需要的枚举值
 * code: 声明值
 *
 */
export const PATIENT_STATUS = [
  {
    label: '全部',
    key: 0,
    code: 'all'
  },
  {
    label:  process.env.HOSPITAL_ID == 'sdlj' ? "入院" :  '在院',
    key: 1,
    code: 'in'
  },
  {
    label: '出院',
    key: 2,
    code: 'out'
  },
]
export const TIME_OUTPUT = [
  {
    label: '全部',
    key: '',
    code: 'all'
  },
  {
    label: '07',
    key: '07',
    code: '07'
  },
  {
    label: '16',
    key: '16',
    code: '16'
  },
]
export const TIME_POINT = [
  {
    label: '全部',
    key: '',
    code: 'all'
  },
  {
    label: '03',
    key: '03',
    code: '03'
  },
  {
    label: '07',
    key: '07',
    code: '07'
  },
  {
    label: '11',
    key: '11',
    code: '11'
  },
  {
    label: '15',
    key: '15',
    code: '15'
  },
  {
    label: '19',
    key: '19',
    code: '19'
  },
  {
    label: '23',
    key: '23',
    code: '23'
  },
]
export const WORKLOAD_BAR1 = [
  {
    label: '按病区统计',
    themeName: '病区工作量统计',
    key: 'dept',
    code: 'dept',
  },
  {
    label: '按护士统计',
    themeName: '护士工作量统计',
    key: 'nurse',
    code: 'nurse',
  },
]
export const WORKLOAD_BAR2 = [
  {
    label: '表格',
    key: 'table',
    code: 'table',
  },
  {
    label: '图表',
    key: 'chart',
    code: 'chart',
  },
]
export const RANK = [
  {
    label: '全部',
    key: '',
    code: 'all',
  },
  {
    label: 'N1',
    key: 'N1',
    code: 'N1',
  },
  {
    label: 'N2',
    key: 'N2',
    code: 'N2',
  },
  {
    label: 'N3',
    key: 'N3',
    code: 'N3',
  },
  {
    label: 'N4',
    key: 'N4',
    code: 'N4',
  },
  {
    label: 'N5',
    key: 'N5',
    code: 'N5',
  },
  {
    label: 'N6',
    key: 'N6',
    code: 'N6',
  },
]
export const NURSING_LEVEL = [
  {
    label: '全部',
    key: '',
    code: 'all',
  },
  {
    label: '特级',
    key: 0,
    code: 'lv0',
  },
  {
    label: '一级',
    key: 1,
    code: 'lv1',
  },
  {
    label: '二级',
    key: 2,
    code: 'lv2',
  },
  {
    label: '三级',
    key: 3,
    code: 'lv3',
  },
]
//顺德人医VTE等级筛选
export const NURSING_LEVEL_SDYY = [
  {
    label: '全部',
    key: '',
    code: 'all',
  },
  {
    label: '外科VTE低危',
    key: 0,
    code: 'lv0',
  },
  {
    label: '外科VTE中危',
    key: 1,
    code: 'lv1',
  },
  {
    label: '外科VTE高危',
    key: 2,
    code: 'lv2',
  },
  {
    label: '内科VTE低危',
    key: 3,
    code: 'lv3',
  },
  {
    label: '内科VTE中危',
    key: 4,
    code: 'lv4',
  },
  {
    label: '内科VTE高危',
    key: 5,
    code: 'lv5',
  },
  {
    label: '极低危',
    key: 6,
    code: 'lv6',
  },
  {
    label: '极高危',
    key: 7,
    code: 'lv7',
  },
]
export const INCREASE_SELECT= [
  {
    label: '医嘱执行统计',
    themeName: '医嘱执行统计',
    key: 'order_execution',
    code: 'order_execution',
  },
  {
    label: '巡视次数统计',
    themeName: '巡视次数统计',
    key: 'patrol',
    code: 'patrol',
  },
  {
    label: '标本采集数量统计',
    themeName: '标本采集数量统计',
    key: 'specimen_collected',
    code: 'specimen_collected',
  },
  {
    label: '护理记录单数量统计',
    themeName: '护理记录单数量统计',
    key: 'record_number',
    code: 'record_number',
  },
  {
    label: '输血工作量统计',
    themeName: '输血工作量统计',
    key: 'blood_workload',
    code: 'blood_workload',
  },
]
