<template>
  <div class="app-container">
    评论列表
    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="nickname" label="会员昵称" width="100" />

      <el-table-column :src="imageUrl" label="会员头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="120" height="80">
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" />

      <el-table-column prop="content" label="评论内容" />

      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteComm(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      background
      small
      @current-change="listComm"/>
  </div>
</template>
<script>
import commApi from '@/api/edu/comm/comm'
export default {
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回的集合
      page: 1, // 当前页
      limit: 10, // 每页记录条数
      total: 0, // 总记录条数
      courseId: ''
    }
  },
  created() {
    // 页面渲染之前，必须调用methods定义的方法
    this.listComm()
  },
  methods: {
    // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    listComm(page = 1) {
      this.page = page
      commApi
        .getAllComment(this.page, this.limit, this.courseId)
        .then((response) => {
          this.list = response.data.items
          this.total = response.data.total
        }) // 请求成功
        .catch((error) => {
          console.log(error)
        }) // 请求失败
    },
    deleteComm(id) {
      this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除讲师信息
        commApi.deleteComm(id).then((response) => {
          // 提示已删除
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新页面
          this.getAllComment()
        })
      })
    }
  }
}
</script>

