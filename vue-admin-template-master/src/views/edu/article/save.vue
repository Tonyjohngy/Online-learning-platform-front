<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="article.title" />
      </el-form-item>
      <el-form-item label="主题">
        <el-select v-model="article.themeId" clearable placeholder="请选择">
          <el-option v-for="option in tmoption" :key="option.id" :label="option.title" :value="option.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师">
        <el-select v-model="article.teacherId" clearable placeholder="请选择">
          <el-option v-for="option in toption" :key="option.id" :label="option.name" :value="option.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容">
        <tinymce :height="300" v-model="article.content" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import articleApi from '@/api/edu/article/article'
import teacherApi from '@/api/edu/teacher/teacher'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      toption: [], // 教师选项
      tmoption: [], // 主题选项
      article: {},
      BASE_API: process.env.BASE_API, // 接口API地址
      saveBtnDisabled: false // 禁用保存按钮，防止多次提交
    }
  },
  watch: {
    // 监听
    $route(to, from) {
      // 路由的方式变化，方法就会执行
      this.init()
    }
  },
  created() {
    this.init()
    this.getTeacherOp()
    this.getTheme()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        // 从路径中获取ID
        const id = this.$route.params.id
        // 调用id查询的方法
        this.getInfo(id)
      } else {
        this.article = {}
      }
    },
    saveOrUpdate() {
      if (!this.article.id) {
        this.saveArticle()
      } else {
        this.updateArticle()
      }
    },
    saveArticle() {
      articleApi
        .addArticle(this.article)
        .then((response) => {
          // 提示已添加
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 路由跳转页面
          this.$router.push({ path: '/article/list' })
        })
        .catch((error) => {
          'error'
          '保存失败'
        })
    },

    getInfo(id) {
      articleApi.getArticleId(id).then((response) => {
        this.article = response.data.article
      })
    },

    updateArticle(article) {
      articleApi
        .updateArticle(this.article)
        .then((response) => {
          // 提示已添加
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 路由跳转页面
          this.$router.push({ path: '/article/list' })
        })
        .catch((error) => {
          'error'
          '保存失败'
        })
    },
    getTeacherOp() {
      teacherApi.findAllTeacher().then(response => {
        this.toption = response.data.items
      })
    },
    getTheme() {
      articleApi.getTheme().then(response => {
        this.tmoption = response.data.list
      })
    }
  }
}
</script>
  <style scoped>
  .tinymce-container {
    line-height: 29px;
  }
  </style>
