<template>
  <div class="app-container">
    广告栏列表
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="图片标题" width="100" />

      <el-table-column :src="imageUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" width="120" height="80">
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" />

      <el-table-column prop="linkUrl" label="链接地址" />
      <el-table-column prop="sort" label="优先级" />

      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑信息</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteBanner(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      background
      small
      @current-change="listBanner"
    />
  </div>
</template>
<script>
import bannerApi from '@/api/edu/banner/banner'
export default {
  data() { // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回的集合
      page: 1, // 当前页
      limit: 10, // 每页记录条数
      total: 0 // 总记录条数
    }
  },
  created() { // 页面渲染之前，必须调用methods定义的方法
    this.listBanner()
  },
  methods: {// 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    listBanner(page = 1) {
      this.page = page
      bannerApi.getBannerPage(this.page, this.limit)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
        })// 请求成功
        .catch(error => {
          console.log(error)
        })// 请求失败
    },
    deleteBanner(id) {
      this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除讲师信息
        bannerApi.removeChapter(id)
          .then(response => {
            // 提示已删除
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.listBanner()
          })
      })
    }
  }
}
</script>

