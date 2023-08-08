<template>
  <div class="diagnosis-modal">
    <sweet-modal ref="newRecord" size="big-650" :title="HOSPITAL_ID == 'huadu'?'添加护理计划': '添加护理诊断'">
      <div class="record-con">
        <div class="search-con">
          <div @keyup.enter.prevent="searchBybtn" style="display:flex;">
            <!-- <el-input placeholder="请输入诊断关键词" v-model="searchWord" class="diagnosis-search">
              <el-button type="primary" slot="append" v-touch-ripple @click="search">搜索</el-button>
            </el-input>-->
            <el-autocomplete
              :placeholder="['guizhou','huadu'].includes(HOSPITAL_ID) ? '请输入护理问题关键词' : '请输入诊断关键词' "
              v-model="searchWord"
              class="diagnosis-search"
              :fetch-suggestions="querySearch"
            >
              <el-button type="primary" slot="append" v-touch-ripple @click="searchBybtn">搜索</el-button>
            </el-autocomplete>
          </div>
          <div class="cache-con">
            <span>历史记录：</span>
            <span
              class="cache-item"
              @click="searchWord = item; search()"
              v-for="item in cacheSearchList"
              :key="item"
            >{{item}}</span>
          </div>
        </div>
        <div class="tip">
          <span v-if="totalCount > -1">为您找到{{totalCount}}条相关诊断，请选择</span>
          <span v-else>请输入搜索关键词</span>
        </div>
        <div class="list-con" v-loading="searchLoading">
          <diagnosisList v-for="item of list" :key="item.id" :data="item" :word="searchWord"></diagnosisList>
        </div>
      </div>
      <div class="page-con">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
        <div style="flex:1;"></div>
        <div class="import-btn">
          <el-button
            type="primary"
            v-if="isImportModuleDevSuccess && hasImport.includes(HOSPITAL_ID)"
            v-touch-ripple
            @click="openImportModal"
          >导入</el-button>
          <el-button
            type="primary"
            v-if="isImportModuleDevSuccess && hasWHzhenduan.includes(HOSPITAL_ID)"
            v-touch-ripple
            @click="openWHzhenduanModal"
          >维护诊断</el-button>
        </div>
      </div>
    </sweet-modal>
    <div v-if="isConfirm" class="confirm-box" @click.stop="isConfirm = false">
      <div class="confirm-content" @click.stop="">
        <div class="confirm-content-title">
          <div class="title-label">导入诊断知识</div>
          <div class="confirm-close-btn" @click.stop="isConfirm = false"><i class="el-icon-close" style="color:#ccc"></i></div>
        </div>
        <div class="confirm-split-line"></div>
        <div class="confirm-text"  @click.stop="">
          说明：上传前请先
          <span style="color:#04a580" @click="downloadTemplete">下载模板</span>
          ，按照模板要求将内容填完后，再点击立即上传按钮进行导入
        </div>
        <div class="confirm-btns">
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="`${apiPath}nursingDiags/importExcel/${wardCode}`"
            :headers="importHeaders"
            multiple
            :show-file-list="false"
            :before-upload='beforeUpload'
            :on-exceed="handleExceed"
            :on-success="upLoadSuccess"
            name="upfile"
            :file-list="fileList"
            >
            <el-button type="primary">立即上传</el-button>
          </el-upload>
        </div>
      </div>
    </div>
    <whzdModal ref="whzdModal" @refresh="search"></whzdModal>
    <whzdSettingModal ref="whzdSettingModal" @refresh="search"></whzdSettingModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.diagnosis-modal
  .sweet-modal .sweet-content
    max-height calc(100vh - 50px)
.diagnosis-search
  flex: 1;
  .el-input-group__append
    background: #4BB08D;
    border: 1px solid #4BB08D;
    color #fff
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-con
  // height 50px
  padding-top 14px
  border-bottom: 1px solid #ECECEC
.tip
  font-size: 12px;
  color: #999999;
  margin 8px 0 0
.page-con
  display:flex;
  text-align left
  margin 18px 0 5px
.list-con
  min-height 366px
.cache-con {
  padding: 5px;
  font-size: 12px;
  color: #999999;
  .cache-item {
    padding-left 5px;
    padding-right 5px;
    cursor pointer
    &:hover {
      color #333
    }
  }
}
.import-btn{
  >>> button{
    height: 37px;
  }
}
.confirm-box{
  position: fixed;
  z-index:100021;
  top:0;
  left: 0;
  width: 100vw;
  height:100vh;
  background rgba(0,0,0,.3)
  .confirm-content{
    width: 600px;
    height: 200px;
    background #fff;
    margin: 45vh auto 0;
    border-radius: 2px;
    .confirm-content-title{
      display: flex;
      height: 40px;
      line-height 40px;
      .title-label{
        flex: 1;
        text-indent 20px;
      }
      .confirm-close-btn{
        cursor: pointer;
        width: 30px;
      }
    }
    .confirm-split-line{
      width: 600px;
      height: 1px;
      border-bottom:1px dashed #ccc;
    }
    .confirm-text{
      height: 108px;
      line-height 108px;
      font-size: 12px;
      text-align center
      span{
        cursor:pointer;
      }
    }
    .confirm-btns{
      line-height 45px;
      height: 45px;
      text-align center;
    }
  }
}
</style>

<script>
import { apiPath } from "@/api/apiConfig";
import { nursingDiagsSearch,getTemplateApi } from "../api/index";
import diagnosisList from "./list/diagnosisList.vue";
import whzdModal from "./slide/slideWhzdModal.vue";
import whzdSettingModal from "./slide/slideWhzdSetting.vue";
export default {
  provide() {
    return {
      openWHSettingModal:this.openWHSettingModal
    };
  },
  data() {
    return {
      searchWord: "",
      pageIndex: 0,
      pageSize: 6,
      totalCount: -1,
      list: [],
      searchLoading: false,
      cacheSearchList: localStorage.diagnosisCacheSearchList
        ? JSON.parse(localStorage.diagnosisCacheSearchList)
        : [],
      hasImport:['liaocheng','guizhou','foshanrenyi','zhzxy',"whsl"],
      hasWHzhenduan:['foshanrenyi'],
      isConfirm:false,
      fileList:[],
      isImportModuleDevSuccess:true,
      apiPath,
    };
  },
  mounted() {},
  methods: {
    init() {
      (this.searchWord = ""),
        (this.pageIndex = 1),
        (this.pageSize = 6),
        (this.totalCount = -1),
        (this.list = []);
    },
    open() {
      this.init()
      this.$refs.newRecord.open();
      this.searchBybtn()
    },
    close() {
      this.$refs.newRecord.close();
    },
    search() {
      // if (!this.searchWord) {
      //   return;
      // }
      let {pageIndex,pageSize,wardCode,searchWord} = this,{patientId,visitId} = this.$route.query
      let params = {
        patientId,
        visitId,
        searchWord,
        pageIndex,
        pageSize,
        wardCode
      }
      this.searchLoading = true;
      nursingDiagsSearch(params).then(res => {
        this.searchLoading = false;
        this.totalCount = res.data.data.totalCount;
        this.list = res.data.data.list;
      });
    },
    searchBybtn() {
      // if (!this.searchWord) {
      //   return this.$message({
      //     showClose: true,
      //     message: "关键词不能为空",
      //     type: "warning"
      //   });
      // }
      this.cacheSearchList = Array.from(
        new Set([...this.cacheSearchList, this.searchWord])
      ).splice(-5);
      localStorage.diagnosisCacheSearchList = JSON.stringify(
        this.cacheSearchList
      );
      this.pageIndex = 0;
      this.search();
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.search();
    },
    querySearch(queryString, cb) {
      cb([]);
      // cb(
      //   this.cacheSearchList.map(value => {
      //     return { value };
      //   })
      // );
    },
    openImportModal(){
      this.isConfirm = true
    },
    openWHzhenduanModal(){
      this.$refs.whzdModal.open()
    },
    openWHSettingModal(config){
      this.$refs.whzdSettingModal.open(config)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeUpload(files){
      this.isConfirm = false
      // element组件抽风，需要用promise才可以正常取消上传，后续版本如果修复了可以改掉
      return new Promise((resolve, reject) => {
        this.$confirm('导入后，将会在知识库中新增诊断知识，可在添加诊断计划时选择使用', '确定要导入新的诊断知识吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(res=>{
          return resolve(true);
        }).catch(err=>{
          this.$message.warning('您已取消导入！')
          return reject(false);
        })
      });
    },
    upLoadSuccess(response, file, fileList){
      if(response.code!=200)return this.$message.error(response.desc)
      this.$message.success('成功导入诊断知识')
    },
    downloadTemplete(){
      getTemplateApi().then(res=>{
          let blob = new Blob([res.data], {
            type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
          });

          let a = document.createElement("a");
          let href = window.URL.createObjectURL(blob); // 创建链接对象
          a.href = href;
          a.download = '模板文件.xlsx'; // 自定义文件名
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(href);
          document.body.removeChild(a); // 移除a元素
      })
    }
  },
  components: {
    diagnosisList,
    whzdModal,
    whzdSettingModal
  },
  computed:{
    wardCode(){
      let code = localStorage.getItem('selectDeptValue')
      return code
    },
    importHeaders(){
      let headers = {}
      headers['App-Token-Nursing'] = '51e827c9-d80e-40a1-a95a-1edc257596e7'
      headers['Auth-Token-Nursing'] = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token
      return headers
    }
  }
};
</script>
