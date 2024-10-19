<template>
  <div class="app-container">
    讲师列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.name" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="发布状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="listCourse()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

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

      <el-table-column prop="title" label="课程名称" width="100" />

      <el-table-column label="头衔" width="100">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" />

      <el-table-column prop="gmtCreate" label="添加时间" />

      <el-table-column prop="viewCount" label="浏览数量" />

      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
          </router-link>

          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteCourseById(scope.row.id)">删除</el-button>
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
      @current-change="listCourse"
    />
  </div>
</template>
<script>
import courseApi from '@/api/edu/course/course'
export default {
  // 写核心代码位置
  // data:{

  // }
  data() { // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回的集合
      page: 1, // 当前页
      limit: 10, // 每页记录条数
      total: 0, // 总记录条数
      courseQuery: {}// 条件封装的对象
    }
  },
  created() { // 页面渲染之前，必须调用methods定义的方法
    this.resetData()
    this.listCourse()
  },
  methods: {// 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    listCourse(page = 1) {
      this.page = page
      // getTeacherListPage(current,limit,teacherQuery)
      courseApi.listCourse(this.page, this.limit, this.courseQuery)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
        })// 请求成功
        .catch(error => {
          console.log(error)
        })// 请求失败
    },
    resetData() {
      this.courseQuery = {}
      this.listCourse()
    },
    // TODO
    deleteCourseById(id) {
      this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除讲师信息
        courseApi.deleteCourse(id)
          .then(response => {
            // 提示已删除
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.listCourse()
          })
      })
    }
  }
}
</script>

