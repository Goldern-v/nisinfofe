<template>
  <SweetModal
    ref="modal"
    title="特殊情况交接"
    :modal-width="760"
    @close="onPanelClose"
  >
    <div class="title">
      包括特殊复查的各种结果：如MR、CT、检验异常值等以及当班未完成治疗护理、病房安全等。
      <a class="action" @click="onPanelOpen">+ 模板</a>
    </div>
    <ElInput ref="textarea" type="textarea" :rows="10" v-model="text"/>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" type="primary" @click="onConfirm">确定</ElButton>
  </SweetModal>
</template>

<script>
  import common from '@/common/mixin/common.mixin.js'

  import Button from './button'

  export default {
    mixins: [common],
    data: () => ({
      text: ''
    }),
    methods: {
      open (text) {
        this.text = text
        this.$refs.modal.open()

        this.$nextTick(() => {
          this.$refs.textarea.$refs.textarea.focus()
        })
      },
      close () {
        this.$refs.modal.close()
      },
      applyTemplate (item) {
        this.text = (this.text || '') + item.content
      },
      onClose () {
        this.close()
      },
      onConfirm () {
        this.$emit('confirm', this.text)
      },
      onPanelOpen () {
        this.$emit('panel-open')
      },
      onPanelClose () {
        this.$emit('panel-close')
      }
    },
    components: {
      Button
    }
  }
</script>

<style lang="stylus" scoped>
  .title
    position relative
    margin-bottom 5px
    font-size 12px
    line-height 28px

    .action
      position absolute
      top 0
      right 0
      color rgb(40, 79, 194)
      cursor pointer
</style>
