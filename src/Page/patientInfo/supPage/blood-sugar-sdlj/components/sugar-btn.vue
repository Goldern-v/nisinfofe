<template>
  <div
    class="containBtn"
  >
    <div ref="Contain" @mousewheel="(e) => onScroll(e)">
      <div class="addBtn">
        <whiteButton text="添加血氧记录" @click="onAddTable"/>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.containBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%
}
</style>


<script>
import whiteButton from "@/components/button/white-button.vue";

export default {
  data() {
    return {
      
    };
  },
  methods: {
    onAddTable() {
        this.$emit('onAddTableModal');
    }
  },
  components: {
    whiteButton,
  },
};
</script>
