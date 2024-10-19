<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <!-- <el-form label-width="120px">
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form> -->
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=""/>
      </el-form-item>
      <!-- 所属分类 -->
      <el-form-item label="课程分类">
        <!-- 一级分类 -->
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="subjectLevelOneChange"><!-- 不加扩号才可传值 -->
          <el-option v-for="subject in subjectOneList" :key="subject.id" :label="subject.title" :value="subject.id" />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option v-for="subject in subjectTwoList" :key="subject.id" :label="subject.title" :value="subject.id" />
        </el-select>
      </el-form-item>
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name" :value="teacher.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="" />
      </el-form-item>
      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>
      <!-- 课程封面 -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss/updatefile'"
          class="avatar-uploader">
          <img :src="courseInfo.cover" width="200" height="200">
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder=""/>
      </el-form-item>
      <el-form-item>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button></el-form-item>
    </el-form>
  </div>
</template>

<script>
import courseApi from '@/api/edu/course/course'
import subjectApi from '@/api/edu/subject/subject'
import Tinymce from '@/components/Tinymce'

export default {
  // 声明组件
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        title: '',
        subjectId: '',
        subjectParentId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: 'https://edu-1010-tony.oss-cn-beijing.aliyuncs.com/2023/06/01/02de78146ba64f9b8104e904b10601602020070908330717953.jpg',
        price: 0
      },
      teacherList: [],
      subjectOneList: [],
      subjectTwoList: [],
      BASE_API: process.env.BASE_API, // 接口API地址
      courseId: ''
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
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getCourseById()
    }
    this.findTeacher()
    this.getOneSubject()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        // 从路径中获取ID
        const id = this.$route.params.id
        // 调用id查询的方法
        this.getCourseById(id)
      } else {
        this.courseInfo = {}
      }
    },
    getCourseById() {
      courseApi.getCourseById(this.courseId).then((response) => {
        this.courseInfo = response.data.courseInfo
        subjectApi.getSubjectList().then((response) => {
          this.subjectOneList = response.data.list
          for (var i = 0; i < this.subjectOneList.length; i++) {
            var oneSubject = this.subjectOneList[i]
            if (this.courseInfo.subjectParentId === oneSubject.id) {
              this.subjectTwoList = oneSubject.children
            }
          }
        })
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },
    getOneSubject() {
      subjectApi.getSubjectList().then((response) => {
        this.subjectOneList = response.data.list
      })
    },
    subjectLevelOneChange(value) {
      // console.log(value)
      for (var i = 0; i < this.subjectOneList.length; i++) {
        var oneSubject = this.subjectOneList[i]
        if (value === oneSubject.id) {
          this.subjectTwoList = oneSubject.children
          this.courseInfo.subjectId = ''
        }
      }
    },
    updateCourse() {
      courseApi.updateCourseInfo(this.courseInfo).then((response) => {
        this.$message({
          type: 'success',
          message: '修改课程成功'
        })
        this.$router.push({ path: '/course/chapter/' + this.courseId })
      })
    },
    addCourse() {
      courseApi.addCourseInfo(this.courseInfo).then((response) => {
        this.$message({
          type: 'success',
          message: '添加课程成功'
        })
        this.$router.push({ path: '/course/chapter/' + response.data.courseId })
      })
    },
    saveOrUpdate() {
      if (!this.courseInfo.id) {
        this.addCourse()
      } else {
        this.updateCourse()
      }
    },
    findTeacher() {
      courseApi.findAllTeacher().then((response) => {
        this.teacherList = response.data.items
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
