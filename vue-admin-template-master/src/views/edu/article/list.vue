<template>
  <div class="app-container">
    文章列表
    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="100" />

      <el-table-column prop="themeName" label="主题" >

        <!-- <template slot-scope="{ row }"> -->
        <!-- <div>{{ getArticleTheme(row.themeId) }}</div> -->
        <!-- </template> -->
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" />

      <el-table-column prop="gmtModified" label="修改时间" />

      <el-table-column prop="viewCount" label="浏览数" />

      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <router-link :to="'/article/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑信息</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteArticle(scope.row.id)">删除</el-button>
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
      @current-change="getArticle"/>
  </div>
</template>
<script>
import articleApi from '@/api/edu/article/article'

export default {
  data() {
    // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回的集合
      page: 1, // 当前页
      limit: 10, // 每页记录条数
      total: 0, // 总记录条数
      courseId: '',
      tmoption: {} // 主题选项
    }
  },
  created() {
    // 页面渲染之前，必须调用methods定义的方法
    this.getArticle()
    this.getTheme()
  },
  methods: {
    // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    getArticle(page = 1) {
      this.page = page
      articleApi
        .getArticle(this.page, this.limit, this.courseId)
        .then((response) => {
          this.list = response.data.items
          this.total = response.data.total
        }) // 请求成功
        .catch((error) => {
          console.log(error)
        }) // 请求失败
    },
    deleteArticle(id) {
      this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除讲师信息
        articleApi.deleteArticle(id).then((response) => {
          // 提示已删除
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新页面
          this.getArticle()
        })
      })
    }
  }
}
</script>

