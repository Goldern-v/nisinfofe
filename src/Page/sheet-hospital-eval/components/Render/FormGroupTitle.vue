
<template>
  <div>
    <div>
      <a :name="obj.title"></a>
    </div>
    <div
      v-if="obj.type==='formGroupTitle'"
      :style="obj.style"
      :class="obj.class||obj.level?'group-title-level-'+obj.level:''"
    >{{obj.title}}</div>
  </div>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

export default {
  name: "FormGroupTitle",
  props: {
    obj: Object,
    formObj: Object
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    uui() {
      return uuid.v1();
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    getUUID() {
      let uuid_ = uuid.v1();
      // console.log(uuid_)
      return uuid_;
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

  .group-title-level-1
    margin 10px 0 10px 0
    font-weight 700
    font-size: 15px;
  .group-title-level-2
    font-size 14px
    font-weight 600
    // text-indent 1.25em
    margin 10px 0 15px 0
  .group-title-level-3
    font-size 13px
    // text-indent 1.25em
    margin 10px 0 15px 0

</style>
