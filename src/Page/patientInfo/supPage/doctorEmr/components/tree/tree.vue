<template>
  <div>
    <el-row class="header" type="flex" justify="space-between" align="middle">
      <span class="title">病历</span>
    </el-row>
    <div class="body" :style="{height: height}" v-loading="treeLoading">
      <el-tree
        v-if="ifTree"
        :regions="regions"
        class="record-tree"
        :data="regions"
        highlight-current
        :render-content="renderContent"
        @node-click="nodeClick"
        node-key="index"
        :default-expanded-keys="expandList"
        @node-expand="node_expand"
        @node-collapse="node_collapse"
      ></el-tree>
    </div>
  </div>
</template>

<script>
import fileicon from "@/common/images/doctorEmr/文件.png";
import filebox from "@/common/images/doctorEmr/文件夹.png";
import BusFactory from "vue-happy-bus";
import {getDoctorEmr2, getDoctorEmr } from "../../api/index";
export default {
  data() {
    return {
      regions: [],
      bus: BusFactory(this),
      treeLoading: true,
      expandList: [],
      expandListCopy: [],
      ifTree: true
    };
  },
  created() {
    this.getTreeData();
  },
  mounted() {
    this.bus.$on("refreshTree", this.refreshTree);
  },
  components: {},
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return this.wih - 180 + "px";
    }
  },
  methods: {
    refreshTree() {
      this.getTreeData();
      this.ifTree = false;
      this.$nextTick(() => {
        this.ifTree = true;
      });
    },
    getTreeData() {
      this.treeLoading = true;
      setTimeout(()=>{
        if(['beihairenyi','nfyksdyy','foshanrenyi'].includes(this.HOSPITAL_ID)) return
        if(this.HOSPITAL_ID == "hj"){
          Promise.all([getDoctorEmr2(this.$route.query.patientId, this.$route.query.visitId)]).then(res2=>{
            let regions = [];
            const data = res2[0].data.data
            console.log("res",data)
            for (let i = 0; i < data.length; i++) {
              regions.push({
                label: data[i].emrName,
                content:data[i].content
              })
            }
            this.regions = regions;
          }).then(res => {
            this.treeLoading = false;
          }).catch((error)=>{
            this.treeLoading = false;
          });
        }else{
          let patientId  = this.$route.query.patientId || this.$route.params.patientId
          let visitId  = this.$route.query.visitId || this.$route.params.visitId
          Promise.all([
          getDoctorEmr(patientId, visitId)]).then(res => {
            let resDataArr = res[0].data.data;
            let keys = Object.keys(resDataArr);
            let regions = [];
            if (this.HOSPITAL_ID == "lingcheng" || this.HOSPITAL_ID == "shannan" || this.HOSPITAL_ID == "quzhou") {
              for (let i = 0; i < keys.length; i++) {
                regions.push({
                  label: keys[i],
                  children: resDataArr[keys[i]].map(item => {
                    return {
                      label: item.topic,
                      fileUrl: item.expand1
                    };
                  })
                });
              }
            } else {
              for (let i = 0; i < keys.length; i++) {
                regions.push({
                  label: keys[i],
                  children: resDataArr[keys[i]].map(item => {
                    return {
                      label: item.topic,
                      fileUrl: item.fileUrl
                    };
                  })
                });
              }
            }
            this.regions = regions;
            this.treeLoading = false;
          }).catch((err)=>{
            this.treeLoading = false;
          });
        }
      },0)

    },
    nodeClick(data, node) {
      console.log(data,node, "node");
      // rgb(228, 241, 240)
      if(this.HOSPITAL_ID == 'hj'){
        let content = data.content
        this.bus.$emit("openContent", content);
      }else if(node.level === 2){
        console.log(node.data.fileUrl, 'node.data.fileUrl' );
        let fileUrl = node.data.fileUrl;
        this.bus.$emit("openDoctorEmr", fileUrl);
      }
    },
    node_expand(curNode) {
      if (this.expandListCopy.indexOf(curNode.index) == -1) {
        this.expandListCopy.push(curNode.index);
      }
    },
    node_collapse(curNode) {
      this.expandListCopy.remove(curNode.index);
    },
    loadNode1(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region" }]);
      }
      if (node.level > 1) return resolve([]);
      setTimeout(() => {
        const data = [
          {
            name: "leaf",
            leaf: true
          },
          {
            name: "zone"
          }
        ];

        resolve(data);
      }, 500);
    },
    renderContent(h, { node, data, store }) {
      // let fileicon = fileicon
      // let filebox = filebox
      // 如果存在保存
      let hasSave =
        node.childNodes.filter(item => {
          return item.data.status == "0";
        }).length > 0;
      let hasSign =
        node.childNodes.filter(item => {
          return item.data.status == "1";
        }).length > 0;

      let fileHasSave = node.data.status == 0;
      let fileHasSign = node.data.status == 1;

      let icon;
      let box;

      if (hasSave) {
        box = fileboxRed;
      } else if (hasSign) {
        box = fileboxGreen;
      } else {
        box = filebox;
      }

      if (fileHasSave) {
        icon = fileiconRed;
      } else if (fileHasSign) {
        icon = fileiconGreen;
      } else {
        icon = fileicon;
      }
      if (node.level !== 2 && this.HOSPITAL_ID != 'hj') {
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
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header {
  height: 37px;
  background: #F7FAFA;
  padding: 0 13px;
  border-bottom: 1px solid #EAEEF1;

  .title {
    font-size: 13px;
    color: #333333;
    font-weight: bold;
  }
}

.body {
  overflow: auto;
}
</style>
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
  width: 92%;
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
  .el-tree {
    border: 0 !important;
  }
}
</style>
</style>
