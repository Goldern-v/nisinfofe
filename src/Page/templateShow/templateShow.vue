<template>
  <div class="content">
    <!-- 左边的树 -->
    <div class="left-part">
      <el-input
        class="filter-input"
        placeholder="输入表单名称查找"
        v-model="filterText"
      >
      </el-input>
      <div
        class="tree-body"
        :style="{ height: height }"
        v-loading="treeLoading"
      >
        <el-tree
          ref="tree"
          class="record-tree"
          :data="templateList"
          :props="defaultProps"
          highlight-current
          :render-content="renderContent"
          @node-click="nodeClick"
          node-key="index"
          :filter-node-method="filterNode"
        ></el-tree>
      </div>
    </div>
    <!-- 右边iframe -->
    <div class="right-part">
      <div class="contantV2" v-loading="pageLoading" ref="iframeLoadingV2">
        <iframe
          :style="{ height: iframeHeight + 'px' }"
          frameborder="0"
          class="assessmentv2-iframe"
          v-if="url"
          :src="url"
          @load="onload"
          ref="iframe"
        ></iframe>
        <div v-else class="null-url">{{ defaultText }}</div>
      </div>
    </div>
  </div>
</template>
<style lang='scss' scoped></style>
<script>
import fileicon from "@/common/images/record/文件.png";
import filebox from "@/common/images/record/文件夹.png";
import { getFormLists } from "./api/index"; // 获取属性列表
import { formTempUrl, devFormUrl } from "@/common/pathConfig/index.js"; // 表单路径前缀和开发模式前缀
import common from "@/common/mixin/common.mixin.js";
/**
 * 目前旧版表单打印有问题
 * 新版表单多列类型的表单因为没有数据无法显示
 */
export default {
  mixins: [common],
  props: {},
  data() {
    return {
      templateList: [], //树形控件绑定的数据列表
      defaultProps: {
        children: "children",
        label: "typeName",
      },
      url: "", //表单地址
      filterText: "", // 过滤input绑定的值
      wid: {},
      iframeHeight: 0,
      treeLoading: false,
      pageLoading: false,
      defaultText: "请选择表单",
    };
  },
  computed: {
    // 获取vuex模块化里面的window.innerHeight的值
    wih() {
      return this.$store.state.common.wih;
    },
    // 绑定可视区域高度
    height() {
      if (this.$route.path == "/templateShow") {
        return `${this.wih - 50}px`;
      } else {
        return `${this.wih - 50}px`;
      }
    },
  },
  mounted() {
    this.getAllForms();
  },
  methods: {
    // 渲染树节点的图标
    renderContent(h, { node, data, store }) {
      let icon;
      let box;

      box = filebox;
      icon = fileicon;
      if (node.level !== 3) {
        return (
          <span class="tree-box-node">
            {" "}
            <img src={box} />
            {node.label}
          </span>
        );
      } else {
        return (
          <span class="tree-node" title={node.label}>
            {" "}
            <img src={icon} />
            {node.label}
          </span>
        );
      }
    },
    // 过滤函数
    filterNode(value, data) {
      console.log(value, data, "filterNode");
      if (!value) return true;
      return data.typeName.indexOf(value) !== -1;
    },
    // 点击节点
    nodeClick(data, node) {
      // 选择表单名称节点
      if (node.level === 3 && data.pageUrl) {
        if (this.isDev) {
          // 判断开发环境
          try {
            this.url = `${devFormUrl}/${data.pageUrl}`;
          } catch (err) {
            console.log("错误", err);
          }
        } else {
          this.url = `${formTempUrl}/${data.pageUrl}`;
        }
        this.pageLoading = true;
        console.log(this.url, "url");
      } else if (node.level === 3) {
        this.pageLoading = true;
        setTimeout(() => {
          this.pageLoading = false;
          this.defaultText = `加载 ${data.typeName} 失败`;
        }, 1000);
      }
      // console.log("nodeClick", { data, node });
    },
    // iframe 加载时调用的方法
    onload() {
      // this.iframeHeight = this.wid.document.body.clientHeight + 50;
      this.iframeHeight = this.wih;
      setTimeout(() => {
        this.pageLoading = false;
      }, 1000);
      this.hideHospital();
    },
    // 获取表单列表
    getAllForms() {
      this.treeLoading = true;
      getFormLists()
        .then((res) => {
          let resData = res.data.data;
          // 把表单名称改成"typeName"才能显示在tree结构中
          const json = JSON.parse(
            JSON.stringify(resData).replace(/formName/g, "typeName")
          );
          console.log("返回的数据", json);

          this.templateList = json;
        })
        .then((res) => {
          this.treeLoading = false;
        });
    },
    //
    hideHospital() {
      let iframe = document.querySelector(".assessmentv2-iframe");
      console.log(iframe.document);
      iframe.document.querySelector(".hospital").style.display = "none";
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  components: {},
};
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.el-tree-node__content {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  // &:hover
  // .tree-node
  // background rgb(228, 241, 240)
}

.tree-node {
  margin-left: -16px;
  position: relative;
  font-size: 12px;
  color: #687179;
  top: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 90%;
  display: inline-block;

  img {
    width: 20px;
    position: relative;
    top: 3px;
    margin-right: 2px;
  }
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background: rgb(228, 241, 240);
}

.tree-box-node {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  color: #687179;
  position: relative;
  top: 3px;

  img {
    width: 20px;
    position: relative;
    top: 3px;
    margin-right: 2px;
  }
}

.el-tree {
  border: 0 !important;
}

.modal-record {
  .record-con {
    background: #ffffff;
    overflow: auto;
    margin: 20px 0 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
  }
}

.record-tree {
  height: 100%;

  .el-tree {
    border: 0 !important;
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contantV2 {
  position: relative;
  background: transparent;
  margin: 0 auto;
  height: 100%;
  width: 100%;

  // border: 1px solid red;
  .assessmentv2-iframe {
    width: 100%;
    min-height: 600px;
    overflow: hidden;
  }

  /deep/ .circular {
    // display: none!important;
    // visibility: hidden!important;
    &.hidden-loading {
      display: none !important;
      visibility: hidden !important;
    }
  }
}

/deep/ .hidden-loading {
  display: none !important;
  visibility: hidden !important;
}

/deep/ .el-loading-mask {
  // background: white !important;
  background-color: rgba(255, 255, 255, 0.98);
}

/deep/ .mask-loading-button {
  font-size: 13px;
  padding: 8px 20px;
  margin-top: 20px;
  color: #55b391;
  outline: 0;
  cursor: pointer;
  border: 1px solid #55b391;
  background: transparent;
}
</style>
<style lang="stylus" scoped>
.content {
  display: flex;
  justify-content: space-between;
}

.left-part {
  flex: 2;
  padding: 0 10px;

  .tree-body {
    height: 100%;
    overflow: auto;
    background: #fff;
  }

  .filter-input {
    margin-top: 10px;
  }
}

.right-part {
  flex: 7;
  background-color: #dfdfdf;
  position: relative;

  .null-url {
    width: 100%;
    margin: auto;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    margin-left: -50%;
  }
}
</style>