<template>
  <div class="app-container">
    支付列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="orderQuery.name" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="orderQuery.status" clearable placeholder="支付状态">
          <el-option value="1" label="已支付"/>
          <el-option value="0" label="未支付"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="listPay()">查询</el-button>
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
      <el-table-column prop="orderNo" label="订单号" width="100" />
      <el-table-column prop="teacherName" label="讲师名称" width="100" />
      <el-table-column prop="nickname" label="会员昵称" width="100" />
      <el-table-column prop="courseTitle" label="课程名称" width="100" />

      <el-table-column prop="totalFee" label="订单金额" width="100" />

      <el-table-column label="支付类型" width="100">
        <template slot-scope="scope">
          {{ scope.row.payType==='1'?'微信':'支付宝' }}
        </template>
      </el-table-column>

      <el-table-column label="支付状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.status==='1'?'已支付':'未支付' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" />

      <el-table-column prop="gmtModified" label="更新时间" />

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deletePayById(scope.row.id)">删除</el-button>
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
import payApi from '@/api/edu/pay/pay'
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
      orderQuery: {}// 条件封装的对象
    }
  },
  created() { // 页面渲染之前，必须调用methods定义的方法
    this.resetData()
    this.listPay()
  },
  methods: {// 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    listPay(page = 1) {
      this.page = page
      // getTeacherListPage(current,limit,teacherQuery)
      payApi.getPayList(this.page, this.limit, this.orderQuery)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
          console.log('===' + this.orderQuery.status)
        })// 请求成功
        .catch(error => {
          console.log(error)
        })// 请求失败
    },
    resetData() {
      this.orderQuery = {}
      this.listPay()
    },
    deletePayById(id) {
      this.$confirm('此操作将永久删除支付记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除讲师信息
        payApi.deleteOrder(id)
          .then(response => {
            // 提示已删除
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.listPay()
          })
      })
    }
  }
}
</script>

