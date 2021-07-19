<template>
  <div class="manager-modal-wrapper">
    <el-dialog
        width="40%"
        title="温箱号管理"
        :visible.sync="dialogTableVisible"
        :close-on-click-modal="false"
    >
      <!-- 关闭 -->
      <el-table :data="incubatorData" height="250" style="width: 100%">
        <el-table-column property="value" label="温箱号">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit"
                  @dblclick="handleEdit(scope.$index, scope.row, $event)">{{ scope.row.value }}</span>
            <span v-else><el-input v-model="scope.row.value"
                                   @keyup.enter.native="loseFocus(scope.$index, scope.row, $event)"
                                   @blur="loseFocus(scope.$index, scope.row, $event)"></el-input></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row, $event)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row, $event)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-button size="mini" @click="handleAddDetails">添加</el-button>
      <el-button type="primary" size="mini" @click="saveItems()">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {getDictItems, saveDictItems} from "../apis";

export default {
  data() {
    return {
      dialogTableVisible: false,
      incubatorData: []
    }
  },
  methods: {
    open() {
      this.dialogTableVisible = true
      this.getData()
    },
    async getData(dictCode = "public:" + '南医三温箱号') {
      const res = await getDictItems(dictCode)
      if (res && res.data.data) {
        const list = res.data.data
        this.incubatorData = list.map(o => {
          return {name: o.name, value: o.code}
        })
      }
    },
    close() {
      this.dialogTableVisible = false
    },
    handleEdit(index, row, event) {
      row.isEdit  = true
    },
    handleDelete(index) {
      this.incubatorData.splice(index, 1)
    },
    handleAddDetails() {
      const obj = {
        value: '',
        isEdit: true,
      };
      this.incubatorData.push(obj);
    },
    saveItems() {
      let list = this.incubatorData.map(item => {
        return {name: item.value, code: item.value}
      })
      let data = {
        code: "public:" + '南医三温箱号',
        itemList: list
      }
      saveDictItems(data).then(res => {
        // 如果接口res.data返回200关闭对话框
        if (res.data.code === "200") {
          this.dialogTableVisible = false
        }
      })
    },
    loseFocus(index, row, event) {
      row.isEdit = false
      const content = event.target.value.trim() //去除空格
      if (!content) {
        this.handleDelete(index)
        return
      }
      row.value = content
    },
  }
}
</script>

<style lang="scss" scoped>
.manager-modal-wrapper {
  /deep/ .el-dialog--small {
    width: 40%;
  }
}
</style>
