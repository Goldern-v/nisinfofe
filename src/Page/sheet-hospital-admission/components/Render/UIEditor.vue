
<template>
  <div class="slice">
    <div class="slice-button" @click="isShow=!isShow">
      <el-tooltip content="编辑页面" placement="top" effect="light">
        <i class="iconfont icon-hulijiludan"></i>
      </el-tooltip>
    </div>
    <div class="slice-container">
      <div class="slice-box" :class="isShow?'move-left':'slice-box-hide'">
        <div class="box-header">
          <span>界面编辑</span>
          <span class="close-button" @click="isShow=false">关闭</span>
        </div>
        <div class="content-body">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="工具" name="工具">
              <div class="tool-box">
                <!-- buttonList -->
                <!-- <div v-for="(n) in 16" :key="n" class="tool-button"></div> -->
                <div
                  v-for="(button,b) in buttonList"
                  :key="b"
                  class="tool-button"
                  @click="button.onClick"
                >{{button.label}}</div>
              </div>
            </el-collapse-item>

            <el-collapse-item title="属性" name="属性">
              <div v-for="(p,i) in properties" :key="i">
                <InputBox
                  :obj="p"
                  :property="property"
                  :formObj="formObj"
                  model="development"
                  v-if="p.type==='input'"
                />
                <TableBox
                  :obj="p"
                  :property="property"
                  :formObj="formObj"
                  model="development"
                  v-if="p.type==='select'"
                />
                <!-- <span>{{k}}</span>
                <span>{{property[k]&&property[k].constructor === Array || false}}</span>-->
              </div>
            </el-collapse-item>
            <el-collapse-item title="组件" name="组件">
              <div class="component-box">FormGroupColBox</div>
              <div class="component-box">FormGroupHovrizontalBox</div>
              <div class="component-box">FormGroupVerticalBox</div>
              <div class="component-box">FormGroupHRBox</div>
              <div class="component-box">FormGroupHTMLBox</div>
              <div class="component-box">FormGroupBox</div>
            </el-collapse-item>
            <el-collapse-item title="数据" name="数据">
              <!-- <span>总数:{{Object.keys(this.modelData).length}}</span> -->
              <!-- <div v-for="(k,i,m) in modelData" :key="k+i">
                <span>{{i}},{{k}},{{m[k]}}</span>
              </div>-->
              <el-table show-summary :summary-method="getSummaries" :data="modelDataArray">
                <el-table-column prop="name" label="字段"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column prop="value" label="值"></el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="全局数据" name="全局数据">
              <div v-for="(k,i) in Object.keys(this.formObj)" :key="i">
                <span>{{k}}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import uuid from "node-uuid";

import InputBox from "./InputBox";
import TableBox from "./TableBox";

export default {
  name: "UIEditor",
  props: {
    obj: Object,
    formObj: Object,
    source: String
  },
  components: {
    InputBox,
    TableBox
  },
  data() {
    return {
      contentImgae: null,
      isShow: false,
      activeNames: ["属性"],
      property: {},
      properties: [],
      sourceString: "",
      // modelData: {},
      modelDataArray: [],
      buttonList: [
        {
          label: "保存JSON",
          onClick: e => {
            console.log("保存JSON", e, this.formObj);
            const fileName =
              this.formObj.formSetting.formTitle.formName + ".json";
            this.downloadFile(fileName, this.formObj);
          }
        },
        {
          label: "载入JSON",
          onClick: e => {
            console.log("载入JSON", e, this.formObj);
          }
        },
        {
          label: "自动匹配字段",
          onClick: e => {
            console.log("自动匹配字段", e, this.formObj);
            let schemesZH = new Object();
            this.formObj.schemes.map(s => {
              schemesZH[s.title] = s.name;
            });
            console.log("自动匹配字段schemesZH", schemesZH);
            let loopArray = body => {
              if (body.constructor === Array) {
                //
                if (
                  body &&
                  body.name &&
                  ["input", "select", "checkbox", "radio"].indexOf(body.type) >
                    -1
                ) {
                  console.log("--body", body);
                  let key = body.label || body.title;
                  body.name = schemesZH[key] || "none";
                }
                if (body.hasOwnProperty("children")) {
                  return loopArray(body.children);
                }
              }
            };
            let result = loopArray(this.formObj.body);
            console.log("自动匹配字段result", result, this.formObj.body);
          }
        },
        {
          label: "保存Body",
          onClick: e => {
            console.log("保存Body", e, this.formObj);
            const fileName =
              this.formObj.formSetting.formTitle.formName + ".body.json";
            this.downloadFile(fileName, this.formObj.body);
          }
        },
        {
          label: "清空",
          onClick: e => {
            console.log("清空", e, this.formObj, this.$root.$refs);
            let skip = [
              "empNo",
              "evalDate",
              "evalScore",
              "formCode",
              "formType",
              "id",
              "patientId",
              "sign",
              "visitId"
            ];
            this.formObj = window.formObj;
            let object = this.formObj.model;
            for (const key in object) {
              if (object.hasOwnProperty(key)) {
                if (skip.indexOf(key) > -1) {
                  continue;
                }
                object[key] = "";
                // setCurrentValue
                let refObj = this.$root.$refs[key];
                if (refObj && refObj.type === "text") {
                  refObj.setCurrentValue("");
                  refObj.checkValueRule("");
                }
              }
            }
            console.log("清空", e, this.formObj.model);
          }
        }
      ]
    };
  },
  computed: {
    modelData() {
      return window.formObj.model;
    }
  },
  watch: {
    // 动态更新
    formObj: {
      handler: function(val, oldVal) {
        console.log("####watch_formObj", val);
        // this.modelData = JSON.parse(JSON.stringify(val.model));
        try {
          setTimeout(() => {
            this.sourceString = JSON.stringify(val, null, 4);
            // console.log("watch_渲染this.source", this.source);
            this.modelDataArray = [];
            Object.keys(val.model).map(name => {
              this.modelDataArray.push({
                name: name,
                desc: val.schemesObj[name] || "", //"", // schemes, schemesObj
                value: this.modelData[name] + "" || ""
              });
            });
          }, 500);
        } catch (error) {
          console.log("watch_error", error.message, typeof error);
        }
      },
      deep: true
    }
  },
  mounted() {
    this.contentImgae = require("./image/锚点定位.png");
    this.sourceString = this.source;
  },
  created() {},
  methods: {
    open(config, formObj) {
      console.log("uiEditorOpen", config, formObj);
      // this.$refs.uiEditor.open()
      this.isShow = true;
      this.property = config;
      this.formObj = formObj;

      // options
      // if(!this.property.hasOwnProperty('options')){
      //   this.property.options = []
      // }

      this.properties = new Array();

      Object.keys(config).map(k => {
        let obj = {
          name: config["name"],
          title: k,
          prefixDesc: k,
          suffixDesc: "",
          type: this.getDataType(config[k]),
          style: config["style"] || "",
          class: config["class"] || "",
          value: config[k] || ""
        };
        console.log("------obj", k, obj);
        // obj = Object.assign({},config,obj)
        this.properties.push(obj);
      });
    },
    close() {
      // this.$refs.uiEditor.close()
      this.isShow = false;
    },
    onClose() {
      this.close();
    },
    getDataType(d) {
      if (d && d.constructor === Array) {
        return "select";
      } else if (d && d.constructor === Object) {
        return "select";
      } else {
        return "input";
      }
    },
    handleChange(val) {
      console.log("handleChange", val);
    },
    scrollTo(e, title) {
      let target = document.querySelector(".sheetTable-contain");
      let currentY = target.scrollTop;
      let targetY = document.querySelector(`a[name="${title}"]`).offsetTop;
      this.scrollAnimation(target, currentY, targetY - 20);
    },
    scrollAnimation(element, currentY, targetY) {
      // 计算需要移动的距离
      let needScrollTop = targetY - currentY;
      let _currentY = currentY;
      setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10);
        _currentY += dist;
        element.scrollTo(_currentY, currentY);
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollAnimation(element, _currentY, targetY);
        } else {
          element.scrollTo(_currentY, targetY);
        }
      }, 1);
    },
    getUUID(child = null) {
      let uuid_ = uuid.v1();
      return uuid_;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      sums[0] = "总计";
      sums[1] = data.length + "";
      sums[2] = "";
      return sums;
    },
    downloadFile(fileName, content) {
      // this.messageBox("下载");
      let fileblob = new Blob([JSON.stringify(content, null, 4)], {
        type: "application/json"
      });
      // fileblob.size: 55544
      console.log(
        "downloadFile",
        fileName,
        fileblob,
        this.getUnit(fileblob.size)
      );
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(fileblob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(fileblob, fileName);
      }
    },
    getUnit(num) {
      let unit = [
        { value: 1, unit: "B" },
        { value: 1e3, unit: "KB" },
        { value: 1e6, unit: "MB" },
        { value: 1e9, unit: "GB" },
        { value: 1e12, unit: "PB" }
      ];
      let result = unit.filter(r => {
        return num / r.value > 1 && num / r.value < 1000;
      });
      if (result) {
        result = result[0];
        console.log("getUnit", num, result);
        return (num / result.value).toFixed(2) + result.unit;
      }
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox, .el-select, .is-bordered, .el-checkbox--small, .el-input, .el-input--small, .el-input-group, .el-input-group--prepend {
  margin: 5px 0px;
  vertical-align: bottom;
  width: 100%;
}

.slice-button {
  background: white;
  width: auto;
  height: auto;
  padding: 10px 8px 10px 12px;
  border: 1px solid rgba(204, 204, 204, 1);

  &:hover {
    border: 1px solid #4baf8d;
    cursor: pointer;
  }

  &.move-left {
    z-index: 11;
    right: 250px;
    position: fixed;
  }
}

.slice {
  position: fixed;
  top: calc(40% - 55px);
  right: 1%;
  background: transparent;
  z-index: 10;
  transition: all 1s ease-out;
  color: #486a62;
}

.slice-container {
  min-height: auto;
  height: auto;
}

.slice-box {
  background: white;
  border: 1px solid rgba(204, 204, 204, 1);
  width: 320px;
  height: 85vh;
  position: fixed;
  min-height: 85vh;
  right: 0%;
  top: 7%;
  padding: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-out;
  overflow: auto;

  &.slice-box-hide {
    width: 0px;
    height: 0px;
    right: -3%;
    position: fixed;
    z-index: 999999;
  }

  .close-button:hover {
    cursor: pointer;
    background: #fffff0;
  }
}

.box-header {
  font-size: 13px;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0 15px 0px;
}

.content-body {
  border: 0px;

  .el-collapse {
    border: 0px;
  }

  .tool-box {
    display: flex;
    flex-wrap: wrap;

    .tool-button {
      margin: 2px;
      width: auto;
      height: 24px;
      text-align: center;
      border: 1px solid #486a62;
      cursor: pointer;
      padding: 0px 6px;
      &:hover{
        border: 1px solid #4bb08d;
        background: #4bb08d;
        color: white;
      }
    }
  }
}

.title-level-two {
  font-size: 15px;
  text-indent: 1.25em;
}

ul, li {
  line-height: 1.8em;
  font-size: 14px;
  list-style-type: none;
  padding-left: 5px;
}

li:hover {
  // outline 1px solid #4baf8d
  color: #4baf8d;
  cursor: pointer;
  transition: color 0.3s;
  background: #eef5f5;
}

a {
  text-decoration-line: none;
  color: black;
  font-size: 14px;

  &:visited {
    color: black;
  }

  &:active {
    color: black;
  }

  &:hover {
    color: #4baf8d;
  }
}

>>>.el-input__inner.el-input__inner.el-input__inner {
  width: 100%;
  border-radius: 0px;
}

i {
  font-size: 27px;
  width: 27px;
  height: 27px;
  text-align: center;
  display: inline-block;
}

.component-box {
  outline: 1px dashed #cbd3d1;
  padding: 5px 5px;
  margin: 10px 3px;
  cursor: move;
}
</style>
