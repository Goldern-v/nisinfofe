// 通过地址 code 查找名字
import allArea from '@/components/area/area.js'

export const getAreaByCode = (code) => {
  if (code && typeof code === "string" && code.length === 9) {
    const areaObj = allArea.find(i => i.areaCode === code)
    const [label] = areaObj ? areaObj.areaName.split('@') : ['']
    return label
  } else {
    return ''
  }
}
