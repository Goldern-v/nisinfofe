<template>
  <div class="area-cmp-wrapper">
    <el-select
        v-model="area"
        filterable
        style="width: 260px;"
        :filterMethod="filterMethod"
        @change="handAreaChange"
        popper-class="area-popper-class">
      <el-option
          v-for="item in currentArea"
          :key="item.areaCode"
          :label="item.label"
          :value="item.areaCode">
      </el-option>
    </el-select>
    <el-select v-model="street" filterable @change="handStreetChange" style="width: 150px;">
      <el-option
          v-for="item in currentStreetList"
          v-if="item.streetLabel"
          :key="item.areaCode"
          :label="item.streetLabel"
          :value="item.areaCode">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import allArea from './area.js'

export default {
  model: {
    prop: 'value',
    event: 'updateValue'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      allArea,
      areaList: [],
      streetObj: {},
      area: '',
      street: '',
      currentArea: [],
      currentStreetList: [],
    }
  },
  created() {
    // let areaList = localStorage.getItem('areaList')
    // let streetObj = localStorage.getItem('streetObj')
    // if (!areaList || !streetObj) {
    let areaList = []
    let streetObj = {}
    this.allArea.forEach(item => {
      const area = item.areaCode.slice(0, 6)
      const street = item.areaCode.slice(6, 9)
      if (street === '000') {
        item.label = item.areaName.split('@')[0]
        item.streetLabel = ''
        areaList.push(item)
        streetObj[area] = [item]
      }
    })
    this.allArea.forEach(item => {
      const area = item.areaCode.slice(0, 6)
      const street = item.areaCode.slice(6, 9)
      if (streetObj[area] && street !== '000') {
        let [, streetLabel] = item.areaName.split(streetObj[area][0].label || '')
        streetLabel = streetLabel.split('@')[0]
        item.streetLabel = streetLabel
        streetObj[area].push(item)
      }
    })
    // localStorage.setItem('areaList', JSON.stringify(areaList))
    // localStorage.setItem('streetObj', JSON.stringify(streetObj))
    // } else {
    // areaList = JSON.parse(areaList)
    // streetObj = JSON.parse(streetObj)
    // }
    this.areaList = areaList
    this.streetObj = streetObj
    this.currentArea = this.areaList.slice(0, 50) // 只渲染50条数据 渲染多了页面会卡

    // 赋初始值
    let value = this.value
    if (value && typeof value === "string") {
      if (value.includes('@')) { // 如果是areaName（areaName都有@符号） 则把它转成code
        const obj = this.allArea.find(i => i.areaName === value)
        value = obj ? obj.areaCode : ''
      }
      if (value.length === 9) {
        const area = value.slice(0, 6)
        const street = value.slice(6, 9)
        if (this.streetObj[area]) {
          const code = area + '000'
          this.currentArea = this.areaList.filter(i => i.areaCode === code)
          this.area = code
          this.currentStreetList = this.streetObj[area]
          this.street = street === '000' ? '' : value
          this.$emit('updateValue', this.street ? this.street : this.area)
        }
      }
    }
  },
  methods: {
    filterMethod(queryString) {
      if (queryString) {
        let arr = []
        arr = this.areaList.filter(i => i.areaName.includes(queryString))
        arr = arr.slice(0, 50)
        this.currentArea = arr
      }
    },
    querySearch(queryString, cb) {
      const restaurants = this.areaList
      const results = queryString ? restaurants.filter(i => i.areaName.includes(queryString)) : []
      cb(results)
    },
    handAreaChange(area) {
      this.$emit('updateValue', area)
      const code = area.slice(0, 6)
      this.currentStreetList = this.streetObj[area] ? [] : (this.streetObj[code] || [])
      this.street = ''
    },
    handStreetChange(area) {
      if (area) {
        this.$emit('updateValue', area)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.area-cmp-wrapper {

}
</style>
<style>
.area-popper-class {
  width: 260px;
}
</style>
