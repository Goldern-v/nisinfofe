<template>
  <div class="nursing-rules">
    <div class="search-topbar">
      <!-- <span class="title">护理制度</span> -->
      <div class="float-left">
        <h3>产科宣教视频设置</h3>
      </div>
      <div class="float-right">
        <el-button @click="openUploadVideoModal">添加</el-button>
        <el-button>返回</el-button>
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <el-table :data="data" :height="wih - 160" border v-loading="pageLoadng" stripe>
          <el-table-column type="index" label="序号" min-width="50px" align="center"></el-table-column>
          <el-table-column prop="videoName" label="视频名称" align="center" min-width="300px"></el-table-column>
          <el-table-column prop="uploaderEmpName" label="上传者" min-width="100px" align="center"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间" min-width="120px" align="center"></el-table-column>
          <el-table-column prop="responsibleEmpName" label="加入播放列表" width="120" align="center">
            <template slot-scope="scope">
              <el-switch
                style="cursor: pointer;"
                v-model="scope.row.inPlayList"
                :on-value="1"
                :off-value="0"
                on-text
                off-text
                @change="joinPlayList(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <span class="operation-text" @click="openPreviewVideoModal(scope.row)">预览</span>
              <span class="operation-text" @click="openUploadVideoModal(scope.row)">修改</span>
              <span class="operation-text" @click="delVideo(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        :pageIndex="query.pageIndex"
        :size="query.pageSize"
        :total="total"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      ></pagination>
    </div>
    <sweet-modal ref="preview-modal" class="nursing-rules-preview-modal" title>
      <div class="modal-content">111</div>
    </sweet-modal>
    <uploadVideoModal ref="uploadVideoModal" @refresh="getPageList"></uploadVideoModal>
    <previewVideoModal ref="previewVideoModal"></previewVideoModal>
  </div>
</template>

<script>
import commonMixin from "./../../common/mixin/common.mixin";
import { getList, getTypeByDeptCode } from "./api/index-xin";
import dayjs from "dayjs";
import uploadVideoModal from "./modal/upload-video-modal";
import { getPageList, joinPlayList, deleteVideo } from "./api/index-xin";
import pagination from "./components/pagination";
import previewVideoModal from "./modal/preview-video-modal";
export default {
  mixins: [commonMixin],
  data() {
    return {
      pageLoadng: false,
      data: [],
      total: 0,
      query: {
        pageIndex: 1, //页码
        pageSize: 20 //每页条数
      }
    };
  },
  mounted() {
    this.getPageList();
  },
  beforeDestroy() {},

  methods: {
    openUploadVideoModal(item) {
      this.$refs.uploadVideoModal.open(item);
    },
    getPageList() {
      this.pageLoadng = true;
      getPageList(this.query).then(res => {
        this.pageLoadng = false;
        this.data = res.data.data.list;
        this.query.pageIndex = res.data.data.pageIndex;
        this.query.pageSize = res.data.data.pageSize;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(newSize) {
      this.query.pageSize = newSize;
      this.getPageList();
    },
    handleCurrentChange(newPage) {
      this.query.pageIndex = newPage;
      this.getPageList();
    },
    joinPlayList(item) {
      joinPlayList(item.id, item.inPlayList).then(res => {
        this.getPageList();
      });
    },
    delVideo(item) {
      this.$confirm("此操作将永久删除该视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        deleteVideo(item.id).then(res => {
          this.$message.success("删除成功");
          this.getPageList();
        });
      });
    },
    openPreviewVideoModal(item) {
      this.$refs.previewVideoModal.open(item);
    }
  },
  components: {
    uploadVideoModal,
    pagination,
    previewVideoModal
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
      .el-button {
        width: 100px;
        margin-left: 1px;
      }
    }
  }
  .main-contain {
    background: #fff;
    div {
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
    width: 500px !important;
  }
  .sweet-content {
    max-height: none;
    padding: 20px;
    line-height: 24px;
  }
  span {
    float: left;
    min-width: 70px;
    font-size: 14px;
  }
  p {
    font-size: 14px;
    text-align: left;
    padding-left: 80px;
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
    td.align-left div {
      text-align: left;
    }
  }
}
</style>
