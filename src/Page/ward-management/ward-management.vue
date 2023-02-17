<template>
  <div class="nursing-rules">
    <div class="search-topbar">
      <!-- <span class="title">护理制度</span> -->
      <div class="float-left">
        <h3>病床管理</h3>
      </div>
      <div class="float-right">
        <span class="type-content">
          <span class="type-label">类型:</span>
          <span class="type-content">
            <el-select v-model="query.fileType"
                       size="small"
                       placeholder="全部"
                       @change="handleFileTypeChange">
              <el-option value="">全部</el-option>
              <el-option :key="idx"
                         v-for="(item,idx) in fileTypeList"
                         :value="item.type">{{item.type}}</el-option>
            </el-select>
          </span>
          <span class="type-label">目录:</span>
          <el-select v-model="query.catalog"
                     size="small"
                     placeholder="全部">
            <el-option value="">全部</el-option>
            <el-option :key="idx"
                       v-for="(item,idx) in catalogList"
                       :value="item.name">{{item.name}}</el-option>
          </el-select>
        </span>
        <span class="search-el">
          <el-input placeholder="输入名称进行检索"
                    v-model="query.name"></el-input>
        </span>
        <el-button @click="handleSearch">查询</el-button>
        <!-- <el-button>添加</el-button> -->
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <el-table :data="data"
                  :height="tableHeight"
                  border
                  v-loading="pageLoadng"
                  stripe>
          <el-table-column prop="index"
                           label="序号"
                           width="50"
                           align="center">
            <template slot-scope="scope">
              <span>{{(query.pageIndex-1)*query.pageSize+scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name"
                           label="制度名称"
                           align="center"
                           class-name="rule-name">
            <template slot-scope="scope">
              <div class="rule-name-content">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="fileType"
                           label="类型"
                           width="150"
                           align="center"></el-table-column>
          <el-table-column prop="catalog"
                           label="目录"
                           width="150"
                           align="center"></el-table-column>
          <!-- <el-table-column prop="sizeFile" label="大小" width="100" align="center"></el-table-column> -->
          <el-table-column prop="type"
                           label="格式"
                           width="80"
                           align="center"></el-table-column>
          <el-table-column prop="empName"
                           label="上传人"
                           width="80"
                           align="center"></el-table-column>
          <el-table-column prop="deptName"
                           label="权限"
                           width="150"
                           align="center"
                           class-name="align-left">
            <template slot-scope="scope">
              <div class="rule-name-content">{{scope.row.deptName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="uploadTime"
                           label="上传时间"
                           width="170"
                           align="center"></el-table-column>
          <el-table-column prop="operation"
                           label="操作"
                           width="80"
                           align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.id||scope.row.id===0">
                <span class="operation-text"
                      @click="previewFile(scope)">预览</span>
                <!-- <span class="operation-text" @click="downloadFile(scope)">下载</span> -->
                <!-- <span @click="deleteFile(scope)">删除</span> -->
              </div>
              <span v-else></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <customPagination :page.sync="query.pageIndex"
                        :size.sync="query.pageSize"
                        :total="fileTotal"
                        @sizeChange="handleSizeChange"
                        @currentChange="handleCurrentChange" />
    </div>
    <sweet-modal ref="preview-modal"
                 class="nursing-rules-preview-modal"
                 :title="preview.title">
      <div v-if="preview.type=='img'">
        <img :src="preview.url"
             alt=""
             style="width:100%">
      </div>
      <div v-else-if="preview.type=='pdf'"
           :style="{height: pdfHeight+'px'}">
        <iframe width="100%"
                height="100%"
                :src="preview.url" />
      </div>
      <div v-else
           style="height: 300px;text-align:center;line-height:300px;">
        该文件格式不支持预览
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import commonMixin from './../../common/mixin/common.mixin'
import customPagination from './components/pagination.vue';
import { getList, getFileContent, getFileTypes, getCatalogByType } from './api/api'
export default {
  components: {
    customPagination
  },
  mixins: [
    commonMixin
  ],
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 20,
        name: '',
        catalog: '',
        fileType: ''
      },
      fileTypeList: [],
      catalogList: [],
      tableHeight: 0,
      fileTotal: 0,
      data: [],
      preview: {
        type: '',
        name: '',
        url: ''
      },
      pdfHeight: window.innerHeight * 0.8,
      pageLoadng: true,
    };
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this);
    this.handelResize();
    window.addEventListener('resize', this.handelResize);
    this.getFileTypes();
    if (this.deptCode) this.setTableData();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handelResize);
  },
  watch: {
    deptCode(val, oldVal) {
      if (val && oldVal) this.query.page = 1;

      if (val) this.setTableData();
    }
  },
  methods: {
    getFileTypes() {
      getFileTypes().then(res => {
        if (res.data.data instanceof Array) this.fileTypeList = res.data.data
      })
    },
    previewType(originType) {
      switch (originType) {
        case 'jpg':
        case 'gif':
        case 'jpeg':
          return 'img'
        case 'pdf':
          return 'pdf'
        default:
          return 'other'
      }
    },
    handelResize() {
      let tableHeight = document.querySelector('.main-contain .table-contain').offsetHeight;
      this.tableHeight = tableHeight;
    },
    previewFile(scope) {
      // getFileContent({id:scope.row.id}).then(res=>{
      let name = scope.row.name || '';
      //   let blob = new Blob([res.data], {
      //     type: res.data.type
      //   });

      this.preview = {
        title: name,
        url: `/crNursing/asset/nursingInstitution${scope.row.path}`,
        type: this.previewType(scope.row.type)
      }

      this.$refs['preview-modal'].open();
      this.pdfHeight = window.innerHeight * 0.8;

      // },err=>{})
    },
    downloadFile(scope) {
      getFileContent({ id: scope.row.id }).then(res => {
        let fileName = scope.row.fileName || '';
        let blob = new Blob([res.data], {
          type: res.data.type
        });
        let a = document.createElement('a')
        let href = window.URL.createObjectURL(blob) // 创建链接对象
        a.href = href
        a.download = fileName // 自定义文件名
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(href)
        document.body.removeChild(a) // 移除a元素
      }, err => { })
    },
    // deleteFile(){},
    handleSizeChange(newSize) {
      this.query.pageIndex = 1;
      this.query.pageSize = newSize;
      this.setTableData();
    },
    handleCurrentChange(newPage) {
      this.setTableData();
    },
    handleSearch() {
      this.query.pageIndex = 1;
      this.setTableData();
    },
    setTableData() {
      this.pageLoadng = true;
      getList(
        {
          ...this.query,
          deptCode: this.deptCode
        }
      )
        .then(res => {
          let data = res.data.data;
          this.fileTotal = data.totalCount || 0;
          this.data = data.list.map((item, idx) => {
            let deptName = item.deptName;
            let sizeFile = this.bytesToSize(item.sizeFile);
            if (item.deptCode == '全院' || item.deptCode == '公共' || item.publicUse == '1')
              deptName = '公共'

            return {
              ...item,
              key: idx,
              deptName,
              sizeFile
            }
          });

          let appendTime = this.query.pageSize - this.data.length;
          if (appendTime > 0) {
            let extraArr = [];
            while (appendTime--) extraArr.push({});
            this.data = this.data.concat(extraArr);
          }

          this.pageLoadng = false;
        }, err => {
          this.pageLoadng = false;
        })
    },
    bytesToSize(bytes) {
      if (bytes === 0) return '0 B';
      var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    handleFileTypeChange(type) {
      this.query.catalog = '';

      getCatalogByType(type).then(res => {
        if (res.data.data instanceof Array) this.catalogList = res.data.data;
      })
    }
  }
};
</script>
<style lang="scss">
.nursing-rules {
  .search-topbar {
    .float-right {
      float: right;
      .type-label {
        font-size: 13px;
        vertical-align: middle;
      }
      .type-content {
        margin-right: 15px;
        input {
          height: 31px;
        }
      }
      .search-el {
        input {
          height: 31px;
        }
      }
    }
  }
  .main-contain {
    div {
      cursor: default;
      .operation-text {
        cursor: pointer;
        color: #4bb08d;
        &:hover {
          font-weight: bold;
        }
      }
    }
    .el-table {
      border: 1px solid #cbd5dd;
      border-bottom: 0;
      td {
        height: 34px;
      }
    }
    .el-table th > div {
      padding: 0;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
}
.nursing-rules-preview-modal {
  .sweet-modal {
    width: 900px;
  }
  .sweet-content {
    max-height: none;
  }
}
</style>


<style lang="scss" scoped>
.nursing-rules {
  position: absolute;
  width: 100%;
  top: 60px;
  bottom: 0;
  .search-topbar {
    height: 41px;
    background-image: linear-gradient(-180deg, #f8f8fa 0%, #ebecf0 100%);
    border-bottom: 1px solid #cbd5dd;
    overflow: hidden;
    .title {
      font-size: 20px;
      display: inline-block;
      margin-left: 30px;
      margin-top: 20px;
    }
    .float-left {
      margin-top: 6px;
      margin-left: 10px;
      display: inline-block;
      h3 {
        font-size: 18px;
        line-height: 31px;
      }
    }
    .float-right {
      margin-top: 5px;
      margin-right: 10px;
      .search-el {
        width: 180px;
        display: inline-block;
      }
    }
  }

  .main-contain {
    position: absolute;
    top: 51px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    .table-contain {
      position: absolute;
      top: 0;
      bottom: 41px;
      left: 0;
      right: 0;
    }
    .pagination {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #eaeaea;
      border: 1px solid #cbd5dd;
      padding: 4px 15px;
      background: rgba(0, 0, 0, 0);
      z-index: 1;
    }
  }

  .el-table {
    th > .cell,
    th > div {
      padding: 0px;
      text-align: center;
    }
    td.rule-name {
      position: relative;
      .rule-name-content {
        position: absolute;
        line-height: 34px;
        left: 15px;
        right: 15px;
        top: 0;
        text-align: left;
        bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    td.align-left div {
      text-align: left;
    }
  }
}
</style>



