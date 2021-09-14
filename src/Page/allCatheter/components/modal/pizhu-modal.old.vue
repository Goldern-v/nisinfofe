<template>
  <div>
    <sweet-modal ref="modal"
                 :modalWidth="400"
                 title="添加批注"
                 :enable-mobile-fullscreen="false">
      <div flex="cross:center"
           style="margin-bottom: 15px">
        <span class="label">
          质控指标：
        </span>
        <el-select v-model="zkValue"
                   flex-box="1"
                   placeholder="请选择质控指标">
          <el-option v-for="item in zkList"
                     :key="item.code"
                     :label="item.name"
                     :value="item.code">
          </el-option>
        </el-select>
      </div>
      <div flex="cross:top"
           style="margin-bottom: 15px">
        <span class="label"
              style="padding-top: 5px">
          批注内容：
        </span>
        <div style=""
             class="textarea-con"
             flex-box="1">
          <el-input type="textarea"
                    :rows="2"
                    placeholder="请输入批注内容"
                    v-model="desc">
          </el-input>
        </div>
      </div>
      <div flex="cross:center"
           style="margin-bottom: 15px">
        <span class="label">
          批注颜色：
        </span>
        <div class="mark-con">
          <div class="color-con"
               flex="cross:center">
            <div class="color-box"
                 v-for="option in colorData"
                 :key="option.name"
                 :style="{background: option.color, 'background-size': 'cover'}"
                 @click="selectColor(option)"
                 :class="{active: selectedColor === option.key}"></div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn"
                   @click="close">取消</el-button>
        <el-button class="modal-btn"
                   type="primary"
                   @click="post">保存</el-button>
      </div>
    </sweet-modal>
    <signModal ref="signModal" title="请输入您的账号密码"></signModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.label
  font-size 14px
  color #333333
  width 75px
.textarea-con
  >>>textarea
    height 80px
.mark-con
  margin-top 5px
  margin-bottom 5px
  .mark-title
    font-size 13px
    color #333333
.color-con
  padding 10px 4px
  overflow visible
  .color-box
    background #B959FF
    width 14px
    height 14px
    border-radius 50%
    margin-right 15px
    cursor pointer
    position relative
    overflow visible
    &.active:after, &:hover:after
      top -4px
      left -4px
      width 20px
      height 20px
      content ''
      border 1px solid #AAAAAA
      position absolute
      border-radius 50%    
</style>
<script>
import cancelBtn from './../../../../components/contextMenu/images/取消颜色标记.png'
import {listItem} from '../../api/recordDesc.js'
import {saveMark} from '../../api/index.js'
import sheetInfo from '../config/sheetInfo/index.js'
import signModal from '@/components/modal/sign.vue'
export default {
  data() {
    return {
      desc: '',
      zkList: [],
      zkValue: '',
      tr: [],
      td: {},
      colorData: [
        {
          name: '黄色',
          color: '#D0C44F',
          key: 4
        },
        {
          name: '紫色',
          color: '#B959FF',
          key: 1
        },
        {
          name: '蓝色',
          color: '#30A3FF',
          key: 2
        },
        {
          name: '棕色',
          color: '#A2835E',
          key: 3
        },
        {
          name: '绿色',
          color: '#50D065',
          key: 5
        },
        // {
        //   name: '删除标记',
        //   color: `url(${cancelBtn})`,
        //   key: 0
        // },
      ],
      selectedColor: 4
    }
  },
  methods: {
    init() {
      listItem('质控指标', sheetInfo.sheetType).then(res => {
        this.zkList = res.data.data
      })
      this.desc = ''
      this.zkValue = ''
    },
    open(tr, td) {
      if(!tr.find((item) => item.key == "id").value) {
        return this.$message.warning('只能对已保存的记录标注')
      }
      this.tr = tr
      this.td = td
      this.init()
      this.$refs.modal.open()
    },
    close() {
      this.$refs.modal.close()
    },
    post() {
      let recordId = this.tr.find((item) => item.key == "id").value
      let fieldEn = this.td.key || this.td
      let signType = this.selectedColor
      let content = this.desc
      let qualityIndex = this.zkValue

        saveMark(recordId, fieldEn, signType, content, qualityIndex).then(res => {
          if(fieldEn == 'all') {
            // 行标注
            this.tr.find(item => {
              return item.key == 'markObj'
            }).value = res.data.data
          } else {
            // 格标注
            this.td.markObj = res.data.data
          }
          this.$message.success('保存成功')
          this.close()
        })
     
    },
    selectColor(item) {
      this.selectedColor = item.key
    },
  },
  components: {
    signModal
  }
}
</script>
