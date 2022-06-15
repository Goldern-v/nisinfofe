<template>
  <div class="modal-con">
    <sweet-modal ref="newRecord" size="big" title="创建血糖" class="modal-record padding-0">
      <div class="record-con" v-loading="pageLoading">
        <div
          @click="openUrl(item)"
          @dblclick="create(item)"
          class="record-box"
          :class="{active: selectData == item}"
          v-for="item of filterData"
          :key="item.id"
        >
          <el-row type="flex" align="middle">
            <img src="../../../../common/images/record/文件创建.png" alt height="35">
            <span class="name" v-if="item.name">{{item.name}}</span>
            <!-- <span class="name" v-if="item.recordName">{{item.recordName}}</span> -->
          </el-row>
        </div>
      </div>
      <div slot="button" @click="close">
        <el-button class="modal-btn">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="create" :disabled="!selectData">创建</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title-bar {
  height: 45px;
  background: #fff;
  border-bottom: 1px solid #EAEEF1;
  padding: 0 15px;
}

.type-select {
  >>>.el-input {
    width: 180px;
  }

  >>>.el-input__inner {
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
  }
}

.text-con {
  >>>&.el-input {
    width: 138px;
    margin-left: 10px;
  }

  >>>.el-input__inner {
    width: 138px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
  }
}

.record-con {
  margin: 0;
  padding: 10px 10px 10px;
  height: 420px;
  overflow: auto;

  .record-box {
    cursor: pointer;
    float: left;
    box-sizing: border-box;
    padding: 10px 10px 10px;
    width: 33%;
    height: 60px;

    &.active {
      background: #F0F5F3;
      border: 1px solid #C0D4CD;
      border-radius: 4px;
    }

    img {
      height: 35px;
    }

    .name {
      font-size: 13px;
      color: #687179;
      margin-left: 12px;
      height: 40px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}

.type-text {
  font-size: 13px;
  color: #687179;
  margin-right: 10px;
}
</style>

<script>
import commonMixin from "@/common/mixin/common.mixin";
import bus from "vue-happy-bus";

export default {
  mixins: [commonMixin],
  data() {
    return {
      templates: [],
      options: [],
      this_deptCode: "",
      formType: "2",
      pageLoading: false,
      searchWord: "",
      bus: bus(this),
      selectData: "",
      filterData: [
        // {
        //     type: '成人',
        //     name: '成人-血糖监测记录表'
        // },
        {
            type: '儿童',
            name: '血糖监测记录单（通用）'
        }

      ]
    };
  },
  methods: {
    open() {
      // this.templates = [];
      this.$refs.newRecord.open();
      // this.getData();
    },
    openUrl(item) {
      if (item == this.selectData) {
        this.selectData = "";
      } else {
        this.selectData = item;
      }
    },
    create(data) {
      // console.log(this.selectData, 8881);
      this.$emit('onCreate', this.selectData)
      this.close();
    },
    close() {
      this.$refs.newRecord.close();
    },
  },
  computed: {
  },
  created() {
  },
  mounted() {
    // this.bus.$on("openNewSheetModal", this.open);
  },
  components: {}
};
</script>
