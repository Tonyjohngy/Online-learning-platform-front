<template>
  <div id="aCoursesList" class="bg-fa of">
    <header class="comm-title">
      <h2 class="tac">
        <span class="c-333">基本信息</span>
      </h2>
    </header>
    <el-divider></el-divider>
    <el-form class="fl tac" label-width="150px">
      <el-form-item label="姓名">
        <el-input v-model="data.nickname" placeholder="请输入您的姓名"></el-input>
      </el-form-item>

      <!-- 头像 -->
      <!--TODO -->
      <el-form-item label="头像" prop="avatar">
        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" 
        :before-upload="beforeAvatarUpload" :action="BASE_API+'/eduoss/fileoss/updatefile'" class="img-container">
          <img height="100" width="100" :src="data.avatar">
        </el-upload>
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="data.sex" clearable placeholder="请选择">
          <el-option :value="1" label="男" />
          <el-option :value="0" label="女" />
        </el-select>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input v-model="data.age" placeholder="请输入您的年龄"></el-input>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input v-model="data.sign" placeholder="个性签名不能多于15个字" maxlength="15" />
      </el-form-item>
      <el-form-item class="input-prepend restyle" :rules="[{validator:checkPhone, trigger: 'blur'}]" label="电话">
        <el-input v-model="data.mobile" placeholder=""></el-input>
      </el-form-item>
      <el-button type="primary" @click="saveUc()">保存</el-button>
    </el-form>
  </div>
</template>



<script>
import ucApi from '@/api/UCenter'
import cookie from 'js-cookie'
import loginApi from '@/api/login'
import request from '~/utils/request.js'

export default {
  data() {
    //定义变量和初始值
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      },
      user: {
        mobile: '',
        password: ''
      },
      saveBtnDisabled: false, //禁用保存按钮，防止多次提交
      data: [],
      artId: '',
      BASE_API: request.defaults.baseURL // 接口API地址
    }
  },
  created() {
    this.artId = this.$route.params.id
    this.getUcMem()
    this.token = this.$route.query.token
  },
  methods: {
    close() {
      //关闭弹窗
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 上传图片
    cropSuccess(data) {
      //上传成功
      this.imagecropperShow = false
      this.teacher.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 获取用户信息
    getUcMem() {
      ucApi.getUcMember(this.artId).then((response) => {
        this.data = response.data.data.member
      })
    },
    // 重置token信息
    resetToken() {
      this.user.mobile = this.data.mobile
      this.user.password = this.data.password
      loginApi.resetToken(this.user).then((response) => {
        cookie.set('token', response.data.data.token, { domain: 'localhost' })
        loginApi.getLoginInfo().then((response) => {
          this.loginInfo = response.data.data.userInfo
          cookie.set('ucenter', JSON.stringify(this.loginInfo), { domain: 'localhost' })
          // 路由跳转页面
          window.location.href = '/'
        })
      })
    },
    // 保存修改的用户信息
    saveUc() {
      ucApi
        .updateUcMember(this.data)
        .then((response) => {
          this.resetToken()
          //提示已添加
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        })
        .catch((error) => {
          type: 'error'
          message: '保存失败'
        })
    },
    checkPhone(rule, value, callback) {
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error('手机号码格式不正确'))
      }
      return callback()
    },
    // 上传图片之前校验图片
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
    // 上传成功后保存图片地址
    handleAvatarSuccess(res, file) {
      this.data.avatar = res.data.url
    }
  }
}
</script>

<style>
.img-container {
  position: relative;
  width: 100px;
  height: 100px;
}

.img-container img {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0px, 0);
}
</style>
