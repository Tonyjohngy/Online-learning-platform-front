
import request from '@/utils/request'
export default{
// 图片验证
  getCa() {
    return request({
      url: '/captcha/captchaImage',
      method: 'get'
    })
  },
  // 校验验证码
  checkCa(params) {
    return request({
      url: '/captcha/verifyCode',
      method: 'post',
      data: params
    })
  }
}
