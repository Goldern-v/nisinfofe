<template>
  <div class="vaccineManagement">
    <div class="left">
      <span
        @click="toggleContent('inventoryManagement')"
        :class="{active: vaccineContent=='inventoryManagement'}"
      >
        <img src="./images/疫苗库存.png" alt />疫苗库存管理
      </span>
      <span @click="toggleContent()" :class="{active: vaccineContent=='neonatalTreatmentRegister'}">
        <img src="./images/产科新生.png" alt />产科新生儿治疗登记本
      </span>
    </div>
    <div class="content">
      <component :is="vaccineContent"></component>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.vaccineManagement {
  .left {
    float: left;
    width: 200px;
    height: calc(100vh - 60px);
    border-right: 1px solid #bec3c7;
    background: #f2f2f2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    span {
      display: block;
      font-size: 13px;
      color: #687179;
      line-height: 18px;
      font-weight: bold;
      padding: 11px 0 11px 38px;
      border-bottom: 1px solid #e5e5e5;
      background-color: #f9f9f9;
      cursor: pointer;
      position: relative;
      img {
        width: 15px;
        height: 15px;
        position: absolute;
        top: 12px;
        left: 14px;
      }
      &.active {
        color: #333;
        &::after {
          position: absolute;
          content: "";
          width: 4px;
          height: 20px;
          background: #4bb08d;
          left: 0;
          top: 10px;
        }
      }
    }
  }
  .content {
    padding-left: 200px;
  }
}
</style>
<script>
import inventoryManagement from "./components/inventory-management";
import neonatalTreatmentRegister from "./components/neonatal-treatment-register";
export default {
  props: {},
  data() {
    return {
      vaccineContent: "inventoryManagement"
    };
  },
  methods: {
    toggleContent(type) {
      if (type == "inventoryManagement") {
        this.vaccineContent = "inventoryManagement";
      } else {
        this.vaccineContent = "neonatalTreatmentRegister";
      }
    }
  },
  components: {
    inventoryManagement,
    neonatalTreatmentRegister
  }
};
</script>