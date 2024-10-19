import request from '@/utils/request'
export default {
//登录
login(loginVo) {
    return request({
    url: `/ucenterservice/ucenter-member/login`,
    method: 'post',
    data: loginVo
 })
},
//根据token获取用户信息
getLoginInfo() {
    return request({
    url: `/ucenterservice/ucenter-member/getMemberInfo`,
    method: 'get',
    })
  },
// 重置token
resetToken(loginVo) {
    return request({
    url: `/ucenterservice/ucenter-member/resetToken`,
    method: 'post',
    data: loginVo
 })
}
}