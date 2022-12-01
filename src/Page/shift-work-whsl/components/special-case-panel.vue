<template>
  <SidePanel ref="panel">
    <div slot="title">特殊情况模版</div>
    <div class="container">
      <div class="head">
        <div class="search-bar">
          <ElSelect class="select" v-model="type" @change="load()">
            <ElOption label="全部" value="" style="min-width: 100px;"/>
            <ElOption
              v-for="t of types"
              :key="t"
              :label="t"
              :value="t"
            />
          </ElSelect>
          <input class="input" type="text" v-model="title" placeholder="请输入你要查找的模板关键字">
          <WhiteButton class="button" icon="icon-search" @click="load"/>
        </div>
      </div>
      <div class="list">
        <TemplateItem
          v-for="item of filteredlist"
          :key="item.id"
          :listData="item"
          @click="onItemClick"
          @edit="onItemEdit"
          @remove="onItemRemove"
        />
      </div>
    </div>
    <div slot="footer">
      <PrimaryButton @click="onTemplateModalOpen">
        新建模板
      </PrimaryButton>
    </div>
    <TemplateModal
      ref="templateModal"
      @confirm="onTemplateModalConfirm"
    />
  </SidePanel>
</template>

<script>
  import WhiteButton from '@/components/button/white-button'
  import common from '@/common/mixin/common.mixin.js'

  import * as apis from '../apis'
  import SidePanel from './side-panel'
  import PrimaryButton from './primary-button'
  import TemplateModal from './template-modal'
  import TemplateItem from './template-item'

  export default {
    mixins: [common],
    data: () => ({
      types: [],
      type: '',
      title: '',
      list: []
    }),
    computed: {
      filteredlist () {
        const title = this.title.trim()
        return this.list.filter((item) => {
          return item.title.includes(title) || item.content.includes(title)
        })
      }
    },
    methods: {
      async load () {
        const res = await apis.listTemplate(this.deptCode, this.type, '5', '')
        this.list = res.data.data

        const res2 = await apis.listType(this.deptCode)
        this.types = res2.data.data
        this.title = ''
      },
      open () {
        this.$refs.panel.open()

       this.load()
      },
      close () {
        this.$refs.panel.close()
      },
      onTemplateModalOpen () {
        this.$refs.templateModal.open()
      },
      async onTemplateModalConfirm (form) {
        await apis.updateTemplate({...form, templateType: '5'})

        this.$refs.templateModal.close()
        this.load()
      },
      onItemClick (item) {
        this.$emit('apply-template', item)
      },
      onItemEdit (item) {
        this.$refs.templateModal.open({...item})
      },
      async onItemRemove (item) {
        await this.$confirm('确定删除该模板？', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await apis.removeTemplate(item.id)

        this.load()
      }
    },
    components: {
      SidePanel,
      WhiteButton,
      PrimaryButton,
      TemplateModal,
      TemplateItem
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    display flex
    flex-direction column
    height 100%

  .head
    padding 10px 20px

  .search-bar
    display flex
    height 32px
    line-height 32px

    .select
      >>>.el-input__inner
        height 32px
        border-top-right-radius 0
        border-bottom-right-radius 0

    .input
      flex 1
      padding 0 10px
      border 1px solid #c2cbd2
      border-left 0
      border-right 0
      outline none

  .list
    flex 1
    overflow-y auto
</style>
