<template>
  <div v-if="show">
    <!-- <div class="no-do-bg" v-show="show" @click="close"></div> -->
    <transition name="el-zoom-in-left">
      <div class="slide-con" >
        <div class="head-con" flex="cross:center main:justify">
          <span class="title">特殊情况模版</span>
          <span class="close-btn" @click="close">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <TemplateModal :selectedSheetType="sheetInfo.sheetType"/>
        <div class="footer-con" flex="main:center cross:center" @click="openAddModal">
            <i class="iconfont icon-tianjia"></i> 新建模板
          </div>
      </div>

    </transition>

    <addTemplateModal :selectedSheetType="sheetInfo.sheetType" ref="addTemplateModal"></addTemplateModal>
  </div>
</template>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

</style>

<script>

import addTemplateModal from "./add-template-modal-fsry.vue";
import TemplateModal from './components/template-modal.vue'
import bus from "vue-happy-bus";
import sheetInfo from '@/Page/sheet-page/components/config/sheetInfo'
export default {
  props:{
    selectedSheetType:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      bus: bus(this),
      data: {},
      sheetInfo,
      show: false,
      templateCode:'',//佛一要求筛选表单模板 formCode

    };
  },
  computed: {
    listconHeight(){
      let str=""
      if(this.HOSPITAL_ID==='liaocheng' || this.HOSPITAL_ID==='wujing'||this.HOSPITAL_ID==='huadu'||this.HOSPITAL_ID==='foshanrenyi'){
        str='height: calc(100vh - 191px)'
      }
      return str
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    }

  },
  methods: {
    open() {
      this.show = true;
      this.selectWidth = 100;
      setTimeout(() => {
        this.selectWidth = 101;
      }, 300);
    },
    close() {
      this.show = false;
      if(this.$refs.addTemplateModal){
      this.$refs.addTemplateModal.close()
      }
    },
    openAddModal() {
      if(this.$refs.addTemplateModal){
      this.$refs.addTemplateModal.open();

      }
    },
  },
  created() {
    this.bus.$on("refreshTemplate", ()=>{
      });
  },
  mounted() {
  },
  watch: {
    templateType(){
      this.initialize()
    },
  },
  components: {
    addTemplateModal,
    TemplateModal
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.no-do-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2001;
}


.head-con {
  height: 46px;
  background: #F7FAFA;
  border-bottom: 1px solid #EAEEF1;
  padding: 0 10px 0 20px;

  .title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }

  .close-btn {
    font-size: 12px;
    padding: 10px 10px;
    cursor: pointer;
  }
}

.search-con {
  margin: 10px 20px;
  .search-input {
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 0;
    border-right: 0px;
    border-left: 0px;
    outline: none;
    padding-left: 10px;
    font-size: 12px;
    color: #687179;
  }
}
.slide-con {
  width: 360px;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  z-index: 1000000;
  background: #fff;
  z-index: 2002;
}

.head-con {
  height: 46px;
  background: #F7FAFA;
  border-bottom: 1px solid #EAEEF1;
  padding: 0 10px 0 20px;

  .title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }

  .close-btn {
    font-size: 12px;
    padding: 10px 10px;
    cursor: pointer;
  }

}
.footer-con {
  height: 46px;
  background: #4BB08D;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #5CC6A1;
  }

  i {
    margin-right: 5px;
    font-weight: bold;
    font-size: 12px;
  }
}
</style>
