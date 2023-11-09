<template>
  <div>
    <boxBase
      :title="
        `留言板${isSave ? '' : `<span style='color: red'>（未保存）</span>`}`
      "
      :icon="require('../images/留言板.png')"
    >
      <span slot="head-tool" @click.stop="saveData">保存</span>
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <quill-editor
          v-model="data.message"
          ref="myQuillEditor"
          :options="editorOption"
          v-if="['nfyksdyy', 'sdhpwk'].includes(HOSPITAL_ID)"
        ></quill-editor>
        <el-input type="textarea" autosize v-model="data.message" v-else></el-input>
      </div>
    </boxBase>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con
  padding 17px 22px 22px
  box-sizing border-box
  // min-height 220px
  overflow hidden
  >>>
    textarea, .el-textarea
      height 100%
      width 100%
      min-height 150px !important
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" >
.SizeTiShi{
  font-size: 12px;
  color: #999999;
  text-align: right;
  /* margin-right: 20px; */
  margin-top: 60px;
}

/*加上height和滚动属性就可以，滚动条样式是系统默认样式，可能不同*/
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
  border-color: #ccc;
  height: 125px;
  overflow: auto;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px' !important;
  font-size: 14px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='10px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='10px']::before {
  content: '10px' !important;
  font-size: 10px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='12px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before {
  content: '12px' !important;
  font-size: 12px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='16px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before {
  content: '16px' !important;
  font-size: 16px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='18px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='18px']::before {
  content: '18px' !important;
  font-size: 18px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
  content: '20px' !important;
  font-size: 20px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='30px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='30px']::before {
  content: '30px' !important;
  font-size: 30px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='32px']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='32px']::before {
  content: '32px' !important;
  font-size: 32px;
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6' !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体' !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体' !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体' !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
  content: "宋体" !important;
  font-family: "SimSun";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
  content: "黑体" !important;
  font-family: "SimHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
  content: "微软雅黑" !important;
  font-family: "Microsoft YaHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
  content: "楷体" !important;
  font-family: "KaiTi";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
  content: "仿宋" !important;
  font-family: "FangSong";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
  content: "Arial" !important;
  font-family: "Arial";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
  content: "Times New Roman" !important;
  font-family: "Times New Roman";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
  content: "sans-serif" !important;
  font-family: "sans-serif";
}

.ql-font-SimSun {
  font-family: "SimSun";
}

.ql-font-SimHei {
  font-family: "SimHei";
}

.ql-font-Microsoft-YaHei {
  font-family: "Microsoft YaHei";
}

.ql-font-KaiTi {
  font-family: "KaiTi";
}

.ql-font-FangSong {
  font-family: "FangSong";
}

.ql-font-Arial {
  font-family: "Arial";
}

.ql-font-Times-New-Roman {
  font-family: "Times New Roman";
}

.ql-font-sans-serif {
  font-family: "sans-serif";
}
</style>
<script>
// 工具栏配置
const toolbarOptions = [
  ["bold"], // 加粗 斜体 下划线 删除线
  [{ size: ['10px', '12px', false, '16px', '18px', '20px', '30px', '32px'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }], // 字体颜色、字体背景颜色
];

// 自定义字体大小
  let Size = Quill.import('attributors/style/size')
  Size.whitelist = ['10px', '12px', '16px', '18px', '20px', '30px', '32px']
  Quill.register(Size, true)

import boxBase from "../base/box-base.vue";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import { Quill,quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  mixins: [common],
  props: {
    data: Object
  },
  inject: ["update"],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      isSave: true,
       // 富文本编辑器配置
      editorOption: {
        placeholder: "请编辑内容",
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "snow",
      },
    };
  },
  created() {},
  methods: {
    saveData() {
      this.update().then(res => {
        this.$message.success("保存成功");
        this.isSave = true;
      });
    }
    // blur() {
    //   setTimeout(() => {
    //     this.$message.warning("记事本未保存，注意保存，以免数据丢失");
    //   }, 100);
    // }
  },
  computed: {
    message() {
      return this.data.message;
    }
  },
  watch: {
    message() {
      this.isSave = false;
    },
    "data.message"(newValue){

    }
  },
  components: {
    boxBase,
    quillEditor
  }
};
</script>
