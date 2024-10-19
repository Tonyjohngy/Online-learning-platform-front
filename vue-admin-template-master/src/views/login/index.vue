<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <!-- 验证码验证 -->
      <el-form-item>
        <span class="svg-container" style="width:250px;">
          <img :src="'data:image/jpeg;base64,'+captcha.img" style="height: 40px; width:150px; margin-bottom: -16px;" class="captcha-image " @click="getImg()">
          <!-- 显示验证码图片 -->
          <svg-icon />
        </span >
        <el-input v-model="params.code" style="height: 50px; width:100px;" type="text" auto-complete="on" placeholder="验证码"/>
      </el-form-item>
      <!-- 滑动验证码 -->
      <!-- <div ref="dragDiv" class="drag">
        <div class="drag_bg"></div>
        <div class="drag_text">{{ confirmWords }}</div>
        <div ref="moveDiv" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg" style="position: absolute;top: 0px;left: 0px;" @mousedown="mousedownFn($event)"></div>
      </div> -->

      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: 111111</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import { isvalidUsername } from '@/utils/validate'
import captchaApi from '@/api/edu/captcha'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      // beginClientX: 0 /* 距离屏幕左端距离 */,
      // mouseMoveStata: false /* 触发拖动状态  判断 */,
      // maxwidth: '' /* 拖动最大宽度，依据滑块宽度算出来的 */,
      // confirmWords: '拖动滑块验证' /* 滑块文字 */,
      confirmSuccess: false /* 验证成功判断 */,
      captcha: {
        img: '',
        verifyCode: '',
        uuid: ''
      },
      params: {
        code: '',
        uuid: ''
      },
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.getImg()
    window.addEventListener('keydown', this.handleEnter)
    // this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth
    // document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn)
    // document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEnter)
  },
  created() {

  },
  methods: {
    handleEnter() {
      if (event.key === 'Enter') {
        // 执行确定操作的逻辑
        this.handleLogin()
      }
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },

    // 滑块事件
    // mousedownFn: function (e) {
    //   if (!this.confirmSuccess) {
    //     e.preventDefault && e.preventDefault() // 阻止文字选中等 浏览器默认事件
    //     this.mouseMoveStata = true
    //     this.beginClientX = e.clientX
    //   }
    // },
    // mousedoen 事件
    // successFunction() {
    //   this.confirmSuccess = true
    //   this.confirmWords = '验证通过'
    //   if (window.addEventListener) {
    //     document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn)
    //     document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn)
    //   } else {
    //     document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => {})
    //   }
    //   document.getElementsByClassName('drag_text')[0].style.color = '#fff'
    //   document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px'
    //   document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px'
    // },
    // // 验证成功函数
    // mouseMoveFn(e) {
    //   if (this.mouseMoveStata) {
    //     let width = e.clientX - this.beginClientX
    //     if (width > 0 && width <= this.maxwidth) {
    //       document.getElementsByClassName('handler')[0].style.left = width + 'px'
    //       document.getElementsByClassName('drag_bg')[0].style.width = width + 'px'
    //     } else if (width > this.maxwidth) {
    //       this.successFunction()
    //       console.log('验证成功')
    //     }
    //   }
    // },
    // // mousemove事件
    // moseUpFn(e) {
    //   this.mouseMoveStata = false
    //   var width = e.clientX - this.beginClientX
    //   if (width < this.maxwidth) {
    //     document.getElementsByClassName('handler')[0].style.left = 0 + 'px'
    //     document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px'
    //   }
    // },
    getImg() {
      captchaApi.getCa().then((response) => {
        this.captcha = response.data.result
      })
    },
    //     async/await：Vue.js 是基于 MVVM 的响应式组件化框架，支持异步编程模型。通过使用 async/await
    //     可以让 JavaScript 在遇到异步操作时暂停执行，等待异步操作完成，然后继续执行后面的语句。在check
    //     Captcha方法中使用async/await 技术可以使程序能够顺序执行，并且在内部调用异步函数时不会出现回调函数嵌套的情况，从而更加清晰和简洁。
    // Promise 对象：由于异步请求可能需要等待一段时间才能返回结果，因此我们需要使用 Promise 展示异步任务的状态：即进行中、已成功或已失败。
    // Promise 承诺将在异步任务完成时解决（resolve）或拒绝（reject），并且返回一个值，可以利用这些特性来实现流程控制和阻塞等待异步结果。
    // checkCaptcha方法中，我们使用 captchaApi.checkCa(this.params) 返回一个 Promise 对象，通过调用 await 等待其执行结果并返回。
    async  checkCaptcha() {
      this.params.uuid = this.captcha.uuid
      console.log(this.params)
      // 可以将该方法改为对 checkCa 方法的调用使用 await/async 进行异步等待，并将其中含有与页面交互的部分进行移除
      const response = await captchaApi.checkCa(this.params)
      // captchaApi.checkCa(this.params).then((response) => {
      console.log(response.code)
      if (response.code == 20000) {
        this.confirmSuccess = true
      } else {
        this.$message.error('验证码错误')
        // this.params.code == ''
      }
      // })
    },
    async handleLogin() {
      await this.checkCaptcha()
      console.log(this.confirmSuccess)
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.confirmSuccess === true) {
            this.loading = true
            this.$store
              .dispatch('Login', this.loginForm)
              .then(() => {
                this.loading = false
                this.$router.push({ path: this.redirect || '/' })
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            this.$message.error('请输入正确的验证')
            return false
          }
        } else {
          this.$message.error('登录错误')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
<!-- 滑动验证码 -->
<!-- <style scoped>
.drag {
  margin-bottom: 20px;
  /* margin-left: 80px; */
  position: relative;
  background-color: #e8e8e8;
  width: 50%;
  height: 34px;
  line-height: 34px;
  text-align: center;
}
.handler {
  width: 40px;
  height: 32px;
  border: 1px solid #ccc;
  cursor: move;
}
.handler_bg {
  background: #fff
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==')
    no-repeat center;
}
.handler_ok_bg {
  background: #fff
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==')
    no-repeat center;
}
.drag_bg {
  background-color: #7ac23c;
  height: 34px;
  width: 0px;
}
.drag_text {
  position: absolute;
  top: 0px;
  width: 100%;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
</style> -->
