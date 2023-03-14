<template>
  <div>
    <div>
      <a :name="obj.title"></a>
    </div>
    <div v-if="obj.type==='formGroupTitle'"
         :style='obj.style'
         :class='obj.class|| obj.level&&obj.level==="1"?"group-title-box":"group-sub-title-box"'
    >{{ obj.title }}
    <template v-if="obj.title==='9.成人体型'">
      <el-tooltip class="item" effect="light" placement="top">
      <div slot="content">
        <span>
          <span>体型是身体各部发育的外观表现，包括骨骼肌肉的成长与脂肪分布状态等。临床上成人体型有三种：<br/>
　　1.无力型（瘦长型）：体高肌瘦，颈、躯干、四肢细长，肩窄下垂，胸廓扁平，腹上角小于90度；<br/>
　　2.超力型（矮胖型）：体格粗壮，颈、四肢粗短，肌肉发达，肩宽平，胸围大，腹上角大于90度<br/>
　　3.正力型（匀称型）：身高与体重比例适中，躯干、四肢及身体各部分匀称，正常人多为此型。</span>
        </span>
      </div>
      <span :ref="obj.title"
        data-v-99999999
        v-model="checkboxValue"
        @click="radioClicked($event,obj)"
        style="color:red"
        :id="`CR-X-${(obj.title)}-${getUUID()}`">？帮助</span>


    </el-tooltip>

    </template>
    </div>
  </div>
</template>

<script>
import vue from 'vue'
import uuid from 'node-uuid'

export default {
  name: "FormGroupTitle",
  props: {
    obj: Object,
    formObj: Object,
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    uui() {
      return uuid.v1()
    }
  },
  watch: {},
  mounted() {
  },
  created() {
  },
  methods: {
    getUUID() {
      let uuid_ = uuid.v1()
      // console.log(uuid_)
      return uuid_
    }
  },
}
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.group-title-box
  margin 10px 0 10px 0
  font-weight bold
  font-size: 14px;

.group-sub-title-box
  font-size 13px
  text-indent 1.25em
  margin 10px 0 5px 0
</style>
