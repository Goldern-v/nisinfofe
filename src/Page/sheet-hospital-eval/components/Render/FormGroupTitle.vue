
<template>
  <div>
    <div>
      <a :name="obj.title"></a>
    </div>
    <div
      v-if="obj.type==='formGroupTitle'"
      :ref="obj.ref"
      :style="obj.style"
      :class="obj.class||obj.level?'group-title-level-'+obj.level:''"
      :name="obj.title||obj.name||obj.code||''"
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
    },
    formCode() {
      try {
        return this.formObj.formSetting.formInfo.formCode;
      } catch (error) {
      }
      return "E0001";
    }
  },
  watch: {},
  mounted() {
    if (!this.$root.$refs[this.formCode]) {
      this.$root.$refs[this.formCode] = []; //new Array();
    }

    if (this.obj.ref) {
      this.$root.$refs[this.formCode][this.obj.ref] = this.$refs[this.obj.ref];
      this.checkHidden();
    }
  },
  created() {},
  methods: {
    checkHidden() {
      if (this.obj.hidden) {
        this.$root.$refs[this.formCode][this.obj.ref].hidden = true;
      }
    },
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
    transition: all 0.3s;
  .group-title-level-2
    font-size 14px
    font-weight 600
    // text-indent 1.25em
    transition: all 0.3s;
    margin 10px 0 15px 0
  .group-title-level-3
    font-size 13px
    // text-indent 1.25em
    margin 10px 0 15px 0
    transition: all 0.3s;

  .clicked-point
    background: red!important;
    color: white!important;
    padding: 5px!important;

</style>
